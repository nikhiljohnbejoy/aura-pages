var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  System.register(['aurelia-pal'], function (exports, module) {
    'use strict';

    var PLATFORM, DOM;
    return {
      setters: [function (module) {
        PLATFORM = module.PLATFORM;
        DOM = module.DOM;
      }],
      execute: function () {
        exports('json', json);

        function json(body, replacer) {
          return JSON.stringify(body !== undefined ? body : {}, replacer);
        }

        var retryStrategy = exports('retryStrategy', {
          fixed: 0,
          incremental: 1,
          exponential: 2,
          random: 3
        });
        var defaultRetryConfig = {
          maxRetries: 3,
          interval: 1000,
          strategy: retryStrategy.fixed
        };
        var RetryInterceptor = exports('RetryInterceptor', function () {
          function RetryInterceptor(retryConfig) {
            (this || _global).retryConfig = Object.assign({}, defaultRetryConfig, retryConfig || {});

            if ((this || _global).retryConfig.strategy === retryStrategy.exponential && (this || _global).retryConfig.interval <= 1000) {
              throw new Error('An interval less than or equal to 1 second is not allowed when using the exponential retry strategy');
            }
          }

          RetryInterceptor.prototype.request = function (request) {
            var $r = request;

            if (!$r.retryConfig) {
              $r.retryConfig = Object.assign({}, (this || _global).retryConfig);
              $r.retryConfig.counter = 0;
            }

            $r.retryConfig.requestClone = request.clone();
            return request;
          };

          RetryInterceptor.prototype.response = function (response, request) {
            delete request.retryConfig;
            return response;
          };

          RetryInterceptor.prototype.responseError = function (error, request, httpClient) {
            var retryConfig = request.retryConfig;
            var requestClone = retryConfig.requestClone;
            return Promise.resolve().then(function () {
              if (retryConfig.counter < retryConfig.maxRetries) {
                var result = retryConfig.doRetry ? retryConfig.doRetry(error, request) : true;
                return Promise.resolve(result).then(function (doRetry) {
                  if (doRetry) {
                    retryConfig.counter++;
                    return new Promise(function (resolve) {
                      return PLATFORM.global.setTimeout(resolve, calculateDelay(retryConfig) || 0);
                    }).then(function () {
                      var newRequest = requestClone.clone();

                      if (typeof retryConfig.beforeRetry === 'function') {
                        return retryConfig.beforeRetry(newRequest, httpClient);
                      }

                      return newRequest;
                    }).then(function (newRequest) {
                      return httpClient.fetch(Object.assign(newRequest, {
                        retryConfig: retryConfig
                      }));
                    });
                  }

                  delete request.retryConfig;
                  throw error;
                });
              }

              delete request.retryConfig;
              throw error;
            });
          };

          return RetryInterceptor;
        }());

        function calculateDelay(retryConfig) {
          var interval = retryConfig.interval,
              strategy = retryConfig.strategy,
              minRandomInterval = retryConfig.minRandomInterval,
              maxRandomInterval = retryConfig.maxRandomInterval,
              counter = retryConfig.counter;

          if (typeof strategy === 'function') {
            return retryConfig.strategy(counter);
          }

          switch (strategy) {
            case retryStrategy.fixed:
              return retryStrategies[retryStrategy.fixed](interval);

            case retryStrategy.incremental:
              return retryStrategies[retryStrategy.incremental](counter, interval);

            case retryStrategy.exponential:
              return retryStrategies[retryStrategy.exponential](counter, interval);

            case retryStrategy.random:
              return retryStrategies[retryStrategy.random](counter, interval, minRandomInterval, maxRandomInterval);

            default:
              throw new Error('Unrecognized retry strategy');
          }
        }

        var retryStrategies = [function (interval) {
          return interval;
        }, function (retryCount, interval) {
          return interval * retryCount;
        }, function (retryCount, interval) {
          return retryCount === 1 ? interval : Math.pow(interval, retryCount) / 1000;
        }, function (retryCount, interval, minRandomInterval, maxRandomInterval) {
          if (minRandomInterval === void 0) {
            minRandomInterval = 0;
          }

          if (maxRandomInterval === void 0) {
            maxRandomInterval = 60000;
          }

          return Math.random() * (maxRandomInterval - minRandomInterval) + minRandomInterval;
        }];
        var HttpClientConfiguration = exports('HttpClientConfiguration', function () {
          function HttpClientConfiguration() {
            (this || _global).baseUrl = '';
            (this || _global).defaults = {};
            (this || _global).interceptors = [];
          }

          HttpClientConfiguration.prototype.withBaseUrl = function (baseUrl) {
            (this || _global).baseUrl = baseUrl;
            return this || _global;
          };

          HttpClientConfiguration.prototype.withDefaults = function (defaults) {
            (this || _global).defaults = defaults;
            return this || _global;
          };

          HttpClientConfiguration.prototype.withInterceptor = function (interceptor) {
            (this || _global).interceptors.push(interceptor);

            return this || _global;
          };

          HttpClientConfiguration.prototype.useStandardConfiguration = function () {
            var standardConfig = {
              credentials: 'same-origin'
            };
            Object.assign((this || _global).defaults, standardConfig, (this || _global).defaults);
            return this.rejectErrorResponses();
          };

          HttpClientConfiguration.prototype.rejectErrorResponses = function () {
            return this.withInterceptor({
              response: rejectOnError
            });
          };

          HttpClientConfiguration.prototype.withRetry = function (config) {
            var interceptor = new RetryInterceptor(config);
            return this.withInterceptor(interceptor);
          };

          return HttpClientConfiguration;
        }());

        function rejectOnError(response) {
          if (!response.ok) {
            throw response;
          }

          return response;
        }

        var HttpClient = exports('HttpClient', function () {
          function HttpClient() {
            (this || _global).activeRequestCount = 0;
            (this || _global).isRequesting = false;
            (this || _global).isConfigured = false;
            (this || _global).baseUrl = '';
            (this || _global).defaults = null;
            (this || _global).interceptors = [];

            if (typeof fetch === 'undefined') {
              throw new Error('HttpClient requires a Fetch API implementation, but the current environment doesn\'t support it. You may need to load a polyfill such as https://github.com/github/fetch');
            }
          }

          HttpClient.prototype.configure = function (config) {
            var normalizedConfig;

            if (typeof config === 'object') {
              normalizedConfig = {
                defaults: config
              };
            } else if (typeof config === 'function') {
              normalizedConfig = new HttpClientConfiguration();
              normalizedConfig.baseUrl = (this || _global).baseUrl;
              normalizedConfig.defaults = Object.assign({}, (this || _global).defaults);
              normalizedConfig.interceptors = (this || _global).interceptors;
              var c = config(normalizedConfig);

              if (HttpClientConfiguration.prototype.isPrototypeOf(c)) {
                normalizedConfig = c;
              }
            } else {
              throw new Error('invalid config');
            }

            var defaults = normalizedConfig.defaults;

            if (defaults && Headers.prototype.isPrototypeOf(defaults.headers)) {
              throw new Error('Default headers must be a plain object.');
            }

            var interceptors = normalizedConfig.interceptors;

            if (interceptors && interceptors.length) {
              if (interceptors.filter(function (x) {
                return RetryInterceptor.prototype.isPrototypeOf(x);
              }).length > 1) {
                throw new Error('Only one RetryInterceptor is allowed.');
              }

              var retryInterceptorIndex = interceptors.findIndex(function (x) {
                return RetryInterceptor.prototype.isPrototypeOf(x);
              });

              if (retryInterceptorIndex >= 0 && retryInterceptorIndex !== interceptors.length - 1) {
                throw new Error('The retry interceptor must be the last interceptor defined.');
              }
            }

            (this || _global).baseUrl = normalizedConfig.baseUrl;
            (this || _global).defaults = defaults;
            (this || _global).interceptors = normalizedConfig.interceptors || [];
            (this || _global).isConfigured = true;
            return this || _global;
          };

          HttpClient.prototype.fetch = function (input, init) {
            var _this = this || _global;

            trackRequestStart(this || _global);
            var request = this.buildRequest(input, init);
            return processRequest(request, (this || _global).interceptors, this || _global).then(function (result) {
              var response = null;

              if (Response.prototype.isPrototypeOf(result)) {
                response = Promise.resolve(result);
              } else if (Request.prototype.isPrototypeOf(result)) {
                request = result;
                response = fetch(result);
              } else {
                throw new Error("An invalid result was returned by the interceptor chain. Expected a Request or Response instance, but got [" + result + "]");
              }

              return processResponse(response, _this.interceptors, request, _this);
            }).then(function (result) {
              if (Request.prototype.isPrototypeOf(result)) {
                return _this.fetch(result);
              }

              return result;
            }).then(function (result) {
              trackRequestEnd(_this);
              return result;
            }, function (error) {
              trackRequestEnd(_this);
              throw error;
            });
          };

          HttpClient.prototype.buildRequest = function (input, init) {
            var defaults = (this || _global).defaults || {};
            var request;
            var body;
            var requestContentType;
            var parsedDefaultHeaders = parseHeaderValues(defaults.headers);

            if (Request.prototype.isPrototypeOf(input)) {
              request = input;
              requestContentType = new Headers(request.headers).get('Content-Type');
            } else {
              if (!init) {
                init = {};
              }

              body = init.body;
              var bodyObj = body ? {
                body: body
              } : null;
              var requestInit = Object.assign({}, defaults, {
                headers: {}
              }, init, bodyObj);
              requestContentType = new Headers(requestInit.headers).get('Content-Type');
              request = new Request(getRequestUrl((this || _global).baseUrl, input), requestInit);
            }

            if (!requestContentType) {
              if (new Headers(parsedDefaultHeaders).has('content-type')) {
                request.headers.set('Content-Type', new Headers(parsedDefaultHeaders).get('content-type'));
              } else if (body && isJSON(body)) {
                request.headers.set('Content-Type', 'application/json');
              }
            }

            setDefaultHeaders(request.headers, parsedDefaultHeaders);

            if (body && Blob.prototype.isPrototypeOf(body) && body.type) {
              request.headers.set('Content-Type', body.type);
            }

            return request;
          };

          HttpClient.prototype.get = function (input, init) {
            return this.fetch(input, init);
          };

          HttpClient.prototype.post = function (input, body, init) {
            return callFetch(this || _global, input, body, init, 'POST');
          };

          HttpClient.prototype.put = function (input, body, init) {
            return callFetch(this || _global, input, body, init, 'PUT');
          };

          HttpClient.prototype.patch = function (input, body, init) {
            return callFetch(this || _global, input, body, init, 'PATCH');
          };

          HttpClient.prototype.delete = function (input, body, init) {
            return callFetch(this || _global, input, body, init, 'DELETE');
          };

          return HttpClient;
        }());
        var absoluteUrlRegexp = /^([a-z][a-z0-9+\-.]*:)?\/\//i;

        function trackRequestStart(client) {
          client.isRequesting = !!++client.activeRequestCount;

          if (client.isRequesting) {
            var evt_1 = DOM.createCustomEvent('aurelia-fetch-client-request-started', {
              bubbles: true,
              cancelable: true
            });
            setTimeout(function () {
              return DOM.dispatchEvent(evt_1);
            }, 1);
          }
        }

        function trackRequestEnd(client) {
          client.isRequesting = !! --client.activeRequestCount;

          if (!client.isRequesting) {
            var evt_2 = DOM.createCustomEvent('aurelia-fetch-client-requests-drained', {
              bubbles: true,
              cancelable: true
            });
            setTimeout(function () {
              return DOM.dispatchEvent(evt_2);
            }, 1);
          }
        }

        function parseHeaderValues(headers) {
          var parsedHeaders = {};

          for (var name_1 in headers || {}) {
            if (headers.hasOwnProperty(name_1)) {
              parsedHeaders[name_1] = typeof headers[name_1] === 'function' ? headers[name_1]() : headers[name_1];
            }
          }

          return parsedHeaders;
        }

        function getRequestUrl(baseUrl, url) {
          if (absoluteUrlRegexp.test(url)) {
            return url;
          }

          return (baseUrl || '') + url;
        }

        function setDefaultHeaders(headers, defaultHeaders) {
          for (var name_2 in defaultHeaders || {}) {
            if (defaultHeaders.hasOwnProperty(name_2) && !headers.has(name_2)) {
              headers.set(name_2, defaultHeaders[name_2]);
            }
          }
        }

        function processRequest(request, interceptors, http) {
          return applyInterceptors(request, interceptors, 'request', 'requestError', http);
        }

        function processResponse(response, interceptors, request, http) {
          return applyInterceptors(response, interceptors, 'response', 'responseError', request, http);
        }

        function applyInterceptors(input, interceptors, successName, errorName) {
          var interceptorArgs = [];

          for (var _i = 4; _i < arguments.length; _i++) {
            interceptorArgs[_i - 4] = arguments[_i];
          }

          return (interceptors || []).reduce(function (chain, interceptor) {
            var successHandler = interceptor[successName];
            var errorHandler = interceptor[errorName];
            return chain.then(successHandler && function (value) {
              return successHandler.call.apply(successHandler, [interceptor, value].concat(interceptorArgs));
            } || identity, errorHandler && function (reason) {
              return errorHandler.call.apply(errorHandler, [interceptor, reason].concat(interceptorArgs));
            } || thrower);
          }, Promise.resolve(input));
        }

        function isJSON(str) {
          try {
            JSON.parse(str);
          } catch (err) {
            return false;
          }

          return true;
        }

        function identity(x) {
          return x;
        }

        function thrower(x) {
          throw x;
        }

        function callFetch(client, input, body, init, method) {
          if (!init) {
            init = {};
          }

          init.method = method;

          if (body) {
            init.body = body;
          }

          return client.fetch(input, init);
        }
      }
    };
  });
  return exports;
}