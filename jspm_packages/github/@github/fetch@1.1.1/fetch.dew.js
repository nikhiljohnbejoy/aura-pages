var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  (function (self) {
    'use strict';

    if (self.fetch) {
      return;
    }

    var support = {
      searchParams: 'URLSearchParams' in self,
      iterable: 'Symbol' in self && 'iterator' in Symbol,
      blob: 'FileReader' in self && 'Blob' in self && function () {
        try {
          new Blob();
          return true;
        } catch (e) {
          return false;
        }
      }(),
      formData: 'FormData' in self,
      arrayBuffer: 'ArrayBuffer' in self
    };

    if (support.arrayBuffer) {
      var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

      var isDataView = function (obj) {
        return obj && DataView.prototype.isPrototypeOf(obj);
      };

      var isArrayBufferView = ArrayBuffer.isView || function (obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
      };
    }

    function normalizeName(name) {
      if (typeof name !== 'string') {
        name = String(name);
      }

      if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
      }

      return name.toLowerCase();
    }

    function normalizeValue(value) {
      if (typeof value !== 'string') {
        value = String(value);
      }

      return value;
    } // Build a destructive iterator for the value list


    function iteratorFor(items) {
      var iterator = {
        next: function () {
          var value = items.shift();
          return {
            done: value === undefined,
            value: value
          };
        }
      };

      if (support.iterable) {
        iterator[Symbol.iterator] = function () {
          return iterator;
        };
      }

      return iterator;
    }

    function Headers(headers) {
      (this || _global).map = {};

      if (headers instanceof Headers) {
        headers.forEach(function (value, name) {
          this.append(name, value);
        }, this || _global);
      } else if (headers) {
        Object.getOwnPropertyNames(headers).forEach(function (name) {
          this.append(name, headers[name]);
        }, this || _global);
      }
    }

    Headers.prototype.append = function (name, value) {
      name = normalizeName(name);
      value = normalizeValue(value);
      var list = (this || _global).map[name];

      if (!list) {
        list = [];
        (this || _global).map[name] = list;
      }

      list.push(value);
    };

    Headers.prototype['delete'] = function (name) {
      delete (this || _global).map[normalizeName(name)];
    };

    Headers.prototype.get = function (name) {
      var values = (this || _global).map[normalizeName(name)];

      return values ? values[0] : null;
    };

    Headers.prototype.getAll = function (name) {
      return (this || _global).map[normalizeName(name)] || [];
    };

    Headers.prototype.has = function (name) {
      return (this || _global).map.hasOwnProperty(normalizeName(name));
    };

    Headers.prototype.set = function (name, value) {
      (this || _global).map[normalizeName(name)] = [normalizeValue(value)];
    };

    Headers.prototype.forEach = function (callback, thisArg) {
      Object.getOwnPropertyNames((this || _global).map).forEach(function (name) {
        (this || _global).map[name].forEach(function (value) {
          callback.call(thisArg, value, name, this || _global);
        }, this || _global);
      }, this || _global);
    };

    Headers.prototype.keys = function () {
      var items = [];
      this.forEach(function (value, name) {
        items.push(name);
      });
      return iteratorFor(items);
    };

    Headers.prototype.values = function () {
      var items = [];
      this.forEach(function (value) {
        items.push(value);
      });
      return iteratorFor(items);
    };

    Headers.prototype.entries = function () {
      var items = [];
      this.forEach(function (value, name) {
        items.push([name, value]);
      });
      return iteratorFor(items);
    };

    if (support.iterable) {
      Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
    }

    function consumed(body) {
      if (body.bodyUsed) {
        return Promise.reject(new TypeError('Already read'));
      }

      body.bodyUsed = true;
    }

    function fileReaderReady(reader) {
      return new Promise(function (resolve, reject) {
        reader.onload = function () {
          resolve(reader.result);
        };

        reader.onerror = function () {
          reject(reader.error);
        };
      });
    }

    function readBlobAsArrayBuffer(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsArrayBuffer(blob);
      return promise;
    }

    function readBlobAsText(blob) {
      var reader = new FileReader();
      var promise = fileReaderReady(reader);
      reader.readAsText(blob);
      return promise;
    }

    function readArrayBufferAsText(buf) {
      var view = new Uint8Array(buf);
      var chars = new Array(view.length);

      for (var i = 0; i < view.length; i++) {
        chars[i] = String.fromCharCode(view[i]);
      }

      return chars.join('');
    }

    function bufferClone(buf) {
      if (buf.slice) {
        return buf.slice(0);
      } else {
        var view = new Uint8Array(buf.byteLength);
        view.set(new Uint8Array(buf));
        return view.buffer;
      }
    }

    function Body() {
      (this || _global).bodyUsed = false;

      (this || _global)._initBody = function (body) {
        (this || _global)._bodyInit = body;

        if (!body) {
          (this || _global)._bodyText = '';
        } else if (typeof body === 'string') {
          (this || _global)._bodyText = body;
        } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
          (this || _global)._bodyBlob = body;
        } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
          (this || _global)._bodyFormData = body;
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          (this || _global)._bodyText = body.toString();
        } else if (support.arrayBuffer && support.blob && isDataView(body)) {
          (this || _global)._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

          (this || _global)._bodyInit = new Blob([(this || _global)._bodyArrayBuffer]);
        } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
          (this || _global)._bodyArrayBuffer = bufferClone(body);
        } else {
          throw new Error('unsupported BodyInit type');
        }

        if (!(this || _global).headers.get('content-type')) {
          if (typeof body === 'string') {
            (this || _global).headers.set('content-type', 'text/plain;charset=UTF-8');
          } else if ((this || _global)._bodyBlob && (this || _global)._bodyBlob.type) {
            (this || _global).headers.set('content-type', (this || _global)._bodyBlob.type);
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            (this || _global).headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
          }
        }
      };

      if (support.blob) {
        (this || _global).blob = function () {
          var rejected = consumed(this || _global);

          if (rejected) {
            return rejected;
          }

          if ((this || _global)._bodyBlob) {
            return Promise.resolve((this || _global)._bodyBlob);
          } else if ((this || _global)._bodyArrayBuffer) {
            return Promise.resolve(new Blob([(this || _global)._bodyArrayBuffer]));
          } else if ((this || _global)._bodyFormData) {
            throw new Error('could not read FormData body as blob');
          } else {
            return Promise.resolve(new Blob([(this || _global)._bodyText]));
          }
        };

        (this || _global).arrayBuffer = function () {
          if ((this || _global)._bodyArrayBuffer) {
            return consumed(this || _global) || Promise.resolve((this || _global)._bodyArrayBuffer);
          } else {
            return this.blob().then(readBlobAsArrayBuffer);
          }
        };
      }

      (this || _global).text = function () {
        var rejected = consumed(this || _global);

        if (rejected) {
          return rejected;
        }

        if ((this || _global)._bodyBlob) {
          return readBlobAsText((this || _global)._bodyBlob);
        } else if ((this || _global)._bodyArrayBuffer) {
          return Promise.resolve(readArrayBufferAsText((this || _global)._bodyArrayBuffer));
        } else if ((this || _global)._bodyFormData) {
          throw new Error('could not read FormData body as text');
        } else {
          return Promise.resolve((this || _global)._bodyText);
        }
      };

      if (support.formData) {
        (this || _global).formData = function () {
          return this.text().then(decode);
        };
      }

      (this || _global).json = function () {
        return this.text().then(JSON.parse);
      };

      return this || _global;
    } // HTTP methods whose capitalization should be normalized


    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
      var upcased = method.toUpperCase();
      return methods.indexOf(upcased) > -1 ? upcased : method;
    }

    function Request(input, options) {
      options = options || {};
      var body = options.body;

      if (typeof input === 'string') {
        (this || _global).url = input;
      } else {
        if (input.bodyUsed) {
          throw new TypeError('Already read');
        }

        (this || _global).url = input.url;
        (this || _global).credentials = input.credentials;

        if (!options.headers) {
          (this || _global).headers = new Headers(input.headers);
        }

        (this || _global).method = input.method;
        (this || _global).mode = input.mode;

        if (!body && input._bodyInit != null) {
          body = input._bodyInit;
          input.bodyUsed = true;
        }
      }

      (this || _global).credentials = options.credentials || (this || _global).credentials || 'omit';

      if (options.headers || !(this || _global).headers) {
        (this || _global).headers = new Headers(options.headers);
      }

      (this || _global).method = normalizeMethod(options.method || (this || _global).method || 'GET');
      (this || _global).mode = options.mode || (this || _global).mode || null;
      (this || _global).referrer = null;

      if (((this || _global).method === 'GET' || (this || _global).method === 'HEAD') && body) {
        throw new TypeError('Body not allowed for GET or HEAD requests');
      }

      this._initBody(body);
    }

    Request.prototype.clone = function () {
      return new Request(this || _global, {
        body: (this || _global)._bodyInit
      });
    };

    function decode(body) {
      var form = new FormData();
      body.trim().split('&').forEach(function (bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
      return form;
    }

    function parseHeaders(rawHeaders) {
      var headers = new Headers();
      rawHeaders.split('\r\n').forEach(function (line) {
        var parts = line.split(':');
        var key = parts.shift().trim();

        if (key) {
          var value = parts.join(':').trim();
          headers.append(key, value);
        }
      });
      return headers;
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
      if (!options) {
        options = {};
      }

      (this || _global).type = 'default';
      (this || _global).status = 'status' in options ? options.status : 200;
      (this || _global).ok = (this || _global).status >= 200 && (this || _global).status < 300;
      (this || _global).statusText = 'statusText' in options ? options.statusText : 'OK';
      (this || _global).headers = new Headers(options.headers);
      (this || _global).url = options.url || '';

      this._initBody(bodyInit);
    }

    Body.call(Response.prototype);

    Response.prototype.clone = function () {
      return new Response((this || _global)._bodyInit, {
        status: (this || _global).status,
        statusText: (this || _global).statusText,
        headers: new Headers((this || _global).headers),
        url: (this || _global).url
      });
    };

    Response.error = function () {
      var response = new Response(null, {
        status: 0,
        statusText: ''
      });
      response.type = 'error';
      return response;
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    Response.redirect = function (url, status) {
      if (redirectStatuses.indexOf(status) === -1) {
        throw new RangeError('Invalid status code');
      }

      return new Response(null, {
        status: status,
        headers: {
          location: url
        }
      });
    };

    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;

    self.fetch = function (input, init) {
      return new Promise(function (resolve, reject) {
        var request = new Request(input, init);
        var xhr = new XMLHttpRequest();

        xhr.onload = function () {
          var options = {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: parseHeaders(xhr.getAllResponseHeaders() || '')
          };
          options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
          var body = 'response' in xhr ? xhr.response : xhr.responseText;
          resolve(new Response(body, options));
        };

        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.ontimeout = function () {
          reject(new TypeError('Network request failed'));
        };

        xhr.open(request.method, request.url, true);

        if (request.credentials === 'include') {
          xhr.withCredentials = true;
        }

        if ('responseType' in xhr && support.blob) {
          xhr.responseType = 'blob';
        }

        request.headers.forEach(function (value, name) {
          xhr.setRequestHeader(name, value);
        });
        xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
      });
    };

    self.fetch.polyfill = true;
  })(typeof self !== 'undefined' ? self : exports);

  return exports;
}