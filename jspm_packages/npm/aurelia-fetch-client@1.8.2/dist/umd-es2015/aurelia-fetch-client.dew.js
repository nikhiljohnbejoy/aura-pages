import { dew as _indexDewDew } from "aurelia-pal/index.dew.js";
var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  (function (global, factory) {
    typeof exports === 'object' && true ? factory(exports, _indexDewDew()) : typeof define === 'function' && define.amd ? define(['exports', 'aurelia-pal'], factory) : (global = global || self, factory((global.au = global.au || {}, global.au.fetchClient = {}), global.au));
  })(exports, function (exports, aureliaPal) {
    'use strict';

    function json(body, replacer) {
      return JSON.stringify(body !== undefined ? body : {}, replacer);
    }

    const retryStrategy = {
      fixed: 0,
      incremental: 1,
      exponential: 2,
      random: 3
    };
    const defaultRetryConfig = {
      maxRetries: 3,
      interval: 1000,
      strategy: retryStrategy.fixed
    };

    class RetryInterceptor {
      constructor(retryConfig) {
        (this || _global).retryConfig = Object.assign({}, defaultRetryConfig, retryConfig || {});

        if ((this || _global).retryConfig.strategy === retryStrategy.exponential && (this || _global).retryConfig.interval <= 1000) {
          throw new Error('An interval less than or equal to 1 second is not allowed when using the exponential retry strategy');
        }
      }

      request(request) {
        let $r = request;

        if (!$r.retryConfig) {
          $r.retryConfig = Object.assign({}, (this || _global).retryConfig);
          $r.retryConfig.counter = 0;
        }

        $r.retryConfig.requestClone = request.clone();
        return request;
      }

      response(response, request) {
        delete request.retryConfig;
        return response;
      }

      responseError(error, request, httpClient) {
        const {
          retryConfig
        } = request;
        const {
          requestClone
        } = retryConfig;
        return Promise.resolve().then(() => {
          if (retryConfig.counter < retryConfig.maxRetries) {
            const result = retryConfig.doRetry ? retryConfig.doRetry(error, request) : true;
            return Promise.resolve(result).then(doRetry => {
              if (doRetry) {
                retryConfig.counter++;
                return new Promise(resolve => aureliaPal.PLATFORM.global.setTimeout(resolve, calculateDelay(retryConfig) || 0)).then(() => {
                  let newRequest = requestClone.clone();

                  if (typeof retryConfig.beforeRetry === 'function') {
                    return retryConfig.beforeRetry(newRequest, httpClient);
                  }

                  return newRequest;
                }).then(newRequest => {
                  return httpClient.fetch(Object.assign(newRequest, {
                    retryConfig
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
      }

    }

    function calculateDelay(retryConfig) {
      const {
        interval,
        strategy,
        minRandomInterval,
        maxRandomInterval,
        counter
      } = retryConfig;

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

    const retryStrategies = [interval => interval, (retryCount, interval) => interval * retryCount, (retryCount, interval) => retryCount === 1 ? interval : Math.pow(interval, retryCount) / 1000, (retryCount, interval, minRandomInterval = 0, maxRandomInterval = 60000) => {
      return Math.random() * (maxRandomInterval - minRandomInterval) + minRandomInterval;
    }];

    class HttpClientConfiguration {
      constructor() {
        (this || _global).baseUrl = '';
        (this || _global).defaults = {};
        (this || _global).interceptors = [];
      }

      withBaseUrl(baseUrl) {
        (this || _global).baseUrl = baseUrl;
        return this || _global;
      }

      withDefaults(defaults) {
        (this || _global).defaults = defaults;
        return this || _global;
      }

      withInterceptor(interceptor) {
        (this || _global).interceptors.push(interceptor);

        return this || _global;
      }

      useStandardConfiguration() {
        let standardConfig = {
          credentials: 'same-origin'
        };
        Object.assign((this || _global).defaults, standardConfig, (this || _global).defaults);
        return this.rejectErrorResponses();
      }

      rejectErrorResponses() {
        return this.withInterceptor({
          response: rejectOnError
        });
      }

      withRetry(config) {
        const interceptor = new RetryInterceptor(config);
        return this.withInterceptor(interceptor);
      }

    }

    function rejectOnError(response) {
      if (!response.ok) {
        throw response;
      }

      return response;
    }

    class HttpClient {
      constructor() {
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

      configure(config) {
        let normalizedConfig;

        if (typeof config === 'object') {
          normalizedConfig = {
            defaults: config
          };
        } else if (typeof config === 'function') {
          normalizedConfig = new HttpClientConfiguration();
          normalizedConfig.baseUrl = (this || _global).baseUrl;
          normalizedConfig.defaults = Object.assign({}, (this || _global).defaults);
          normalizedConfig.interceptors = (this || _global).interceptors;
          let c = config(normalizedConfig);

          if (HttpClientConfiguration.prototype.isPrototypeOf(c)) {
            normalizedConfig = c;
          }
        } else {
          throw new Error('invalid config');
        }

        let defaults = normalizedConfig.defaults;

        if (defaults && Headers.prototype.isPrototypeOf(defaults.headers)) {
          throw new Error('Default headers must be a plain object.');
        }

        let interceptors = normalizedConfig.interceptors;

        if (interceptors && interceptors.length) {
          if (interceptors.filter(x => RetryInterceptor.prototype.isPrototypeOf(x)).length > 1) {
            throw new Error('Only one RetryInterceptor is allowed.');
          }

          const retryInterceptorIndex = interceptors.findIndex(x => RetryInterceptor.prototype.isPrototypeOf(x));

          if (retryInterceptorIndex >= 0 && retryInterceptorIndex !== interceptors.length - 1) {
            throw new Error('The retry interceptor must be the last interceptor defined.');
          }
        }

        (this || _global).baseUrl = normalizedConfig.baseUrl;
        (this || _global).defaults = defaults;
        (this || _global).interceptors = normalizedConfig.interceptors || [];
        (this || _global).isConfigured = true;
        return this || _global;
      }

      fetch(input, init) {
        trackRequestStart(this || _global);
        let request = this.buildRequest(input, init);
        return processRequest(request, (this || _global).interceptors, this || _global).then(result => {
          let response = null;

          if (Response.prototype.isPrototypeOf(result)) {
            response = Promise.resolve(result);
          } else if (Request.prototype.isPrototypeOf(result)) {
            request = result;
            response = fetch(result);
          } else {
            throw new Error(`An invalid result was returned by the interceptor chain. Expected a Request or Response instance, but got [${result}]`);
          }

          return processResponse(response, (this || _global).interceptors, request, this || _global);
        }).then(result => {
          if (Request.prototype.isPrototypeOf(result)) {
            return this.fetch(result);
          }

          return result;
        }).then(result => {
          trackRequestEnd(this || _global);
          return result;
        }, error => {
          trackRequestEnd(this || _global);
          throw error;
        });
      }

      buildRequest(input, init) {
        let defaults = (this || _global).defaults || {};
        let request;
        let body;
        let requestContentType;
        let parsedDefaultHeaders = parseHeaderValues(defaults.headers);

        if (Request.prototype.isPrototypeOf(input)) {
          request = input;
          requestContentType = new Headers(request.headers).get('Content-Type');
        } else {
          if (!init) {
            init = {};
          }

          body = init.body;
          let bodyObj = body ? {
            body
          } : null;
          let requestInit = Object.assign({}, defaults, {
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
      }

      get(input, init) {
        return this.fetch(input, init);
      }

      post(input, body, init) {
        return callFetch(this || _global, input, body, init, 'POST');
      }

      put(input, body, init) {
        return callFetch(this || _global, input, body, init, 'PUT');
      }

      patch(input, body, init) {
        return callFetch(this || _global, input, body, init, 'PATCH');
      }

      delete(input, body, init) {
        return callFetch(this || _global, input, body, init, 'DELETE');
      }

    }

    const absoluteUrlRegexp = /^([a-z][a-z0-9+\-.]*:)?\/\//i;

    function trackRequestStart(client) {
      client.isRequesting = !!++client.activeRequestCount;

      if (client.isRequesting) {
        let evt = aureliaPal.DOM.createCustomEvent('aurelia-fetch-client-request-started', {
          bubbles: true,
          cancelable: true
        });
        setTimeout(() => aureliaPal.DOM.dispatchEvent(evt), 1);
      }
    }

    function trackRequestEnd(client) {
      client.isRequesting = !! --client.activeRequestCount;

      if (!client.isRequesting) {
        let evt = aureliaPal.DOM.createCustomEvent('aurelia-fetch-client-requests-drained', {
          bubbles: true,
          cancelable: true
        });
        setTimeout(() => aureliaPal.DOM.dispatchEvent(evt), 1);
      }
    }

    function parseHeaderValues(headers) {
      let parsedHeaders = {};

      for (let name in headers || {}) {
        if (headers.hasOwnProperty(name)) {
          parsedHeaders[name] = typeof headers[name] === 'function' ? headers[name]() : headers[name];
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
      for (let name in defaultHeaders || {}) {
        if (defaultHeaders.hasOwnProperty(name) && !headers.has(name)) {
          headers.set(name, defaultHeaders[name]);
        }
      }
    }

    function processRequest(request, interceptors, http) {
      return applyInterceptors(request, interceptors, 'request', 'requestError', http);
    }

    function processResponse(response, interceptors, request, http) {
      return applyInterceptors(response, interceptors, 'response', 'responseError', request, http);
    }

    function applyInterceptors(input, interceptors, successName, errorName, ...interceptorArgs) {
      return (interceptors || []).reduce((chain, interceptor) => {
        let successHandler = interceptor[successName];
        let errorHandler = interceptor[errorName];
        return chain.then(successHandler && (value => successHandler.call(interceptor, value, ...interceptorArgs)) || identity, errorHandler && (reason => errorHandler.call(interceptor, reason, ...interceptorArgs)) || thrower);
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

    exports.json = json;
    exports.retryStrategy = retryStrategy;
    exports.RetryInterceptor = RetryInterceptor;
    exports.HttpClientConfiguration = HttpClientConfiguration;
    exports.HttpClient = HttpClient;
    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  });

  return exports;
}