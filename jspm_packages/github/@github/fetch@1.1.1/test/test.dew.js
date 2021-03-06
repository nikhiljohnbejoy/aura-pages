var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  var support = {
    searchParams: 'URLSearchParams' in self,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self,
    patch: !/PhantomJS/.test(navigator.userAgent),
    permanentRedirect: !/PhantomJS|Trident/.test(navigator.userAgent)
  };

  function readBlobAsText(blob) {
    if ('FileReader' in self) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();

        reader.onload = function () {
          resolve(reader.result);
        };

        reader.onerror = function () {
          reject(reader.error);
        };

        reader.readAsText(blob);
      });
    } else if ('FileReaderSync' in self) {
      return new FileReaderSync().readAsText(blob);
    } else {
      throw new ReferenceError('FileReader is not defined');
    }
  }

  function readBlobAsBytes(blob) {
    if ('FileReader' in self) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();

        reader.onload = function () {
          var view = new Uint8Array(reader.result);
          resolve(Array.prototype.slice.call(view));
        };

        reader.onerror = function () {
          reject(reader.error);
        };

        reader.readAsArrayBuffer(blob);
      });
    } else if ('FileReaderSync' in self) {
      return new FileReaderSync().readAsArrayBuffer(blob);
    } else {
      throw new ReferenceError('FileReader is not defined');
    }
  }

  function arrayBufferFromText(text) {
    var buf = new ArrayBuffer(text.length);
    var view = new Uint8Array(buf);

    for (var i = 0; i < text.length; i++) {
      view[i] = text.charCodeAt(i);
    }

    return buf;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }

    return chars.join('');
  }

  var native = {};
  var keepGlobals = ['fetch', 'Headers', 'Request', 'Response'];
  var exercise = ['polyfill']; // If native fetch implementation exists, save it and allow it to be replaced
  // by the polyfill. Native implementation will be exercised additionally.

  if (self.fetch) {
    keepGlobals.forEach(function (name) {
      native[name] = self[name];
    });
    self.fetch = undefined;
    exercise.push('native');
  }

  var slice = Array.prototype.slice;

  function featureDependent(testOrSuite, condition) {
    (condition ? testOrSuite : testOrSuite.skip).apply(this || _global, slice.call(arguments, 2));
  }

  exercise.forEach(function (exerciseMode) {
    suite(exerciseMode, function () {
      if (exerciseMode === 'native') {
        suiteSetup(function () {
          keepGlobals.forEach(function (name) {
            self[name] = native[name];
          });
        });
      }

      var nativeChrome = /Chrome\//.test(navigator.userAgent) && exerciseMode === 'native';
      var nativeFirefox = /Firefox\//.test(navigator.userAgent) && exerciseMode === 'native';
      var polyfillFirefox = /Firefox\//.test(navigator.userAgent) && exerciseMode === 'polyfill'; // https://fetch.spec.whatwg.org/#concept-bodyinit-extract

      function testBodyExtract(factory) {
        suite('body extract', function () {
          var expected = 'Hello World!';
          var inputs = [['type USVString', expected]];

          if (support.blob) {
            inputs.push(['type Blob', new Blob([expected])]);
          }

          if (support.arrayBuffer) {
            inputs = inputs.concat([['type ArrayBuffer', arrayBufferFromText(expected)], ['type TypedArray', new Uint8Array(arrayBufferFromText(expected))], ['type DataView', new DataView(arrayBufferFromText(expected))]]);
          }

          inputs.forEach(function (input) {
            var typeLabel = input[0],
                body = input[1];
            suite(typeLabel, function () {
              featureDependent(test, support.blob, 'consume as blob', function () {
                var r = factory(body);
                return r.blob().then(readBlobAsText).then(function (text) {
                  assert.equal(text, expected);
                });
              });
              test('consume as text', function () {
                var r = factory(body);
                return r.text().then(function (text) {
                  assert.equal(text, expected);
                });
              });
              featureDependent(test, support.arrayBuffer, 'consume as array buffer', function () {
                var r = factory(body);
                return r.arrayBuffer().then(readArrayBufferAsText).then(function (text) {
                  assert.equal(text, expected);
                });
              });
            });
          });
        });
      } // https://fetch.spec.whatwg.org/#headers-class


      suite('Headers', function () {
        test('constructor copies headers', function () {
          var original = new Headers();
          original.append('Accept', 'application/json');
          original.append('Accept', 'text/plain');
          original.append('Content-Type', 'text/html');
          var headers = new Headers(original);
          assert.deepEqual(['application/json', 'text/plain'], headers.getAll('Accept'));
          assert.deepEqual(['text/html'], headers.getAll('Content-Type'));
        });
        test('headers are case insensitive', function () {
          var headers = new Headers({
            'Accept': 'application/json'
          });
          assert.equal(headers.get('ACCEPT'), 'application/json');
          assert.equal(headers.get('Accept'), 'application/json');
          assert.equal(headers.get('accept'), 'application/json');
        });
        test('appends to existing', function () {
          var headers = new Headers({
            'Accept': 'application/json'
          });
          assert.isFalse(headers.has('Content-Type'));
          headers.append('Content-Type', 'application/json');
          assert.isTrue(headers.has('Content-Type'));
          assert.equal(headers.get('Content-Type'), 'application/json');
        });
        test('appends values to existing header name', function () {
          var headers = new Headers({
            'Accept': 'application/json'
          });
          headers.append('Accept', 'text/plain');
          assert.equal(headers.getAll('Accept').length, 2);
          assert.equal(headers.getAll('Accept')[0], 'application/json');
          assert.equal(headers.getAll('Accept')[1], 'text/plain');
        });
        test('sets header name and value', function () {
          var headers = new Headers();
          headers.set('Content-Type', 'application/json');
          assert.equal(headers.get('Content-Type'), 'application/json');
        });
        test('returns null on no header found', function () {
          var headers = new Headers();
          assert.isNull(headers.get('Content-Type'));
        });
        test('has headers that are set', function () {
          var headers = new Headers();
          headers.set('Content-Type', 'application/json');
          assert.isTrue(headers.has('Content-Type'));
        });
        test('deletes headers', function () {
          var headers = new Headers();
          headers.set('Content-Type', 'application/json');
          assert.isTrue(headers.has('Content-Type'));
          headers.delete('Content-Type');
          assert.isFalse(headers.has('Content-Type'));
          assert.isNull(headers.get('Content-Type'));
        });
        test('returns list on getAll when header found', function () {
          var headers = new Headers({
            'Content-Type': 'application/json'
          });
          assert.isArray(headers.getAll('Content-Type'));
          assert.equal(headers.getAll('Content-Type').length, 1);
          assert.equal(headers.getAll('Content-Type')[0], 'application/json');
        });
        test('returns empty list on getAll when no header found', function () {
          var headers = new Headers();
          assert.isArray(headers.getAll('Content-Type'));
          assert.equal(headers.getAll('Content-Type').length, 0);
        });
        test('converts field name to string on set and get', function () {
          var headers = new Headers();
          headers.set(1, 'application/json');
          assert.equal(headers.get(1), 'application/json');
        });
        test('converts field value to string on set and get', function () {
          var headers = new Headers();
          headers.set('Content-Type', 1);
          headers.set('X-CSRF-Token', undefined);
          assert.equal(headers.get('Content-Type'), '1');
          assert.equal(headers.get('X-CSRF-Token'), 'undefined');
        });
        test('throws TypeError on invalid character in field name', function () {
          assert.throws(function () {
            new Headers({
              '<Accept>': ['application/json']
            });
          }, TypeError);
          assert.throws(function () {
            new Headers({
              'Accept:': ['application/json']
            });
          }, TypeError);
          assert.throws(function () {
            var headers = new Headers();
            headers.set({
              field: 'value'
            }, 'application/json');
          }, TypeError);
        });
        featureDependent(test, !nativeFirefox, 'is iterable with forEach', function () {
          var headers = new Headers();
          headers.append('Accept', 'application/json');
          headers.append('Accept', 'text/plain');
          headers.append('Content-Type', 'text/html');
          var results = [];
          headers.forEach(function (value, key, object) {
            results.push({
              value: value,
              key: key,
              object: object
            });
          });
          assert.equal(results.length, 3);
          assert.deepEqual({
            key: 'accept',
            value: 'application/json',
            object: headers
          }, results[0]);
          assert.deepEqual({
            key: 'accept',
            value: 'text/plain',
            object: headers
          }, results[1]);
          assert.deepEqual({
            key: 'content-type',
            value: 'text/html',
            object: headers
          }, results[2]);
        });
        featureDependent(test, !nativeFirefox, 'forEach accepts second thisArg argument', function () {
          var headers = new Headers({
            'Accept': 'application/json'
          });
          var thisArg = 42;
          headers.forEach(function () {
            assert.equal(this || _global, thisArg);
          }, thisArg);
        });
        test('is iterable with keys', function () {
          var headers = new Headers();
          headers.append('Accept', 'application/json');
          headers.append('Accept', 'text/plain');
          headers.append('Content-Type', 'text/html');
          var iterator = headers.keys();
          assert.deepEqual({
            done: false,
            value: 'accept'
          }, iterator.next());
          assert.deepEqual({
            done: false,
            value: 'accept'
          }, iterator.next());
          assert.deepEqual({
            done: false,
            value: 'content-type'
          }, iterator.next());
          assert.deepEqual({
            done: true,
            value: undefined
          }, iterator.next());
        });
        test('is iterable with values', function () {
          var headers = new Headers();
          headers.append('Accept', 'application/json');
          headers.append('Accept', 'text/plain');
          headers.append('Content-Type', 'text/html');
          var iterator = headers.values();
          assert.deepEqual({
            done: false,
            value: 'application/json'
          }, iterator.next());
          assert.deepEqual({
            done: false,
            value: 'text/plain'
          }, iterator.next());
          assert.deepEqual({
            done: false,
            value: 'text/html'
          }, iterator.next());
          assert.deepEqual({
            done: true,
            value: undefined
          }, iterator.next());
        });
        test('is iterable with entries', function () {
          var headers = new Headers();
          headers.append('Accept', 'application/json');
          headers.append('Accept', 'text/plain');
          headers.append('Content-Type', 'text/html');
          var iterator = headers.entries();
          assert.deepEqual({
            done: false,
            value: ['accept', 'application/json']
          }, iterator.next());
          assert.deepEqual({
            done: false,
            value: ['accept', 'text/plain']
          }, iterator.next());
          assert.deepEqual({
            done: false,
            value: ['content-type', 'text/html']
          }, iterator.next());
          assert.deepEqual({
            done: true,
            value: undefined
          }, iterator.next());
        });
      }); // https://fetch.spec.whatwg.org/#request-class

      suite('Request', function () {
        test('construct with url', function () {
          var request = new Request('https://fetch.spec.whatwg.org/');
          assert.equal(request.url, 'https://fetch.spec.whatwg.org/');
        });
        test('construct with Request', function () {
          var request1 = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post',
            body: 'I work out',
            headers: {
              accept: 'application/json',
              'Content-Type': 'text/plain'
            }
          });
          var request2 = new Request(request1);
          return request2.text().then(function (body2) {
            assert.equal(body2, 'I work out');
            assert.equal(request2.method, 'POST');
            assert.equal(request2.url, 'https://fetch.spec.whatwg.org/');
            assert.equal(request2.headers.get('accept'), 'application/json');
            assert.equal(request2.headers.get('content-type'), 'text/plain');
            return request1.text().then(function () {
              assert(false, 'original request body should have been consumed');
            }, function (error) {
              assert(error instanceof TypeError, 'expected TypeError for already read body');
            });
          });
        });
        test('construct with Request and override headers', function () {
          var request1 = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post',
            body: 'I work out',
            headers: {
              accept: 'application/json',
              'X-Request-ID': '123'
            }
          });
          var request2 = new Request(request1, {
            headers: {
              'x-test': '42'
            }
          });
          assert.equal(request2.headers.get('accept'), undefined);
          assert.equal(request2.headers.get('x-request-id'), undefined);
          assert.equal(request2.headers.get('x-test'), '42');
        });
        test('construct with Request and override body', function () {
          var request1 = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post',
            body: 'I work out',
            headers: {
              'Content-Type': 'text/plain'
            }
          });
          var request2 = new Request(request1, {
            body: '{"wiggles": 5}',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          return request2.json().then(function (data) {
            assert.equal(data.wiggles, 5);
            assert.equal(request2.headers.get('content-type'), 'application/json');
          });
        });
        featureDependent(test, !nativeChrome, 'construct with used Request body', function () {
          var request1 = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post',
            body: 'I work out'
          });
          return request1.text().then(function () {
            assert.throws(function () {
              new Request(request1);
            }, TypeError);
          });
        });
        test('GET should not have implicit Content-Type', function () {
          var req = new Request('https://fetch.spec.whatwg.org/');
          assert.equal(req.headers.get('content-type'), undefined);
        });
        test('POST with blank body should not have implicit Content-Type', function () {
          var req = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post'
          });
          assert.equal(req.headers.get('content-type'), undefined);
        });
        test('construct with string body sets Content-Type header', function () {
          var req = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post',
            body: 'I work out'
          });
          assert.equal(req.headers.get('content-type'), 'text/plain;charset=UTF-8');
        });
        featureDependent(test, support.blob, 'construct with Blob body and type sets Content-Type header', function () {
          var req = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post',
            body: new Blob(['test'], {
              type: 'image/png'
            })
          });
          assert.equal(req.headers.get('content-type'), 'image/png');
        });
        test('construct with body and explicit header uses header', function () {
          var req = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post',
            headers: {
              'Content-Type': 'image/png'
            },
            body: 'I work out'
          });
          assert.equal(req.headers.get('content-type'), 'image/png');
        });
        featureDependent(test, support.blob, 'construct with Blob body and explicit Content-Type header', function () {
          var req = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post',
            headers: {
              'Content-Type': 'image/png'
            },
            body: new Blob(['test'], {
              type: 'text/plain'
            })
          });
          assert.equal(req.headers.get('content-type'), 'image/png');
        });
        featureDependent(test, support.searchParams, 'construct with URLSearchParams body sets Content-Type header', function () {
          var req = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post',
            body: new URLSearchParams('a=1&b=2')
          });
          assert.equal(req.headers.get('content-type'), 'application/x-www-form-urlencoded;charset=UTF-8');
        });
        featureDependent(test, support.searchParams, 'construct with URLSearchParams body and explicit Content-Type header', function () {
          var req = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post',
            headers: {
              'Content-Type': 'image/png'
            },
            body: new URLSearchParams('a=1&b=2')
          });
          assert.equal(req.headers.get('content-type'), 'image/png');
        });
        test('clone request', function () {
          var req = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post',
            headers: {
              'content-type': 'text/plain'
            },
            body: 'I work out'
          });
          var clone = req.clone();
          assert.equal(clone.method, 'POST');
          assert.equal(clone.headers.get('content-type'), 'text/plain');
          assert.notEqual(clone.headers, req.headers);
          assert.equal(req.bodyUsed, false);
          return Promise.all([clone.text(), req.clone().text()]).then(function (bodies) {
            assert.deepEqual(bodies, ['I work out', 'I work out']);
          });
        });
        featureDependent(test, !nativeChrome, 'clone with used Request body', function () {
          var req = new Request('https://fetch.spec.whatwg.org/', {
            method: 'post',
            body: 'I work out'
          });
          return req.text().then(function () {
            assert.throws(function () {
              req.clone();
            }, TypeError);
          });
        });
        testBodyExtract(function (body) {
          return new Request('', {
            method: 'POST',
            body: body
          });
        });
      }); // https://fetch.spec.whatwg.org/#response-class

      suite('Response', function () {
        test('default status is 200 OK', function () {
          var res = new Response();
          assert.equal(res.status, 200);
          assert.equal(res.statusText, 'OK');
          assert.isTrue(res.ok);
        });
        testBodyExtract(function (body) {
          return new Response(body);
        });
        test('creates Headers object from raw headers', function () {
          var r = new Response('{"foo":"bar"}', {
            headers: {
              'content-type': 'application/json'
            }
          });
          assert.equal(r.headers instanceof Headers, true);
          return r.json().then(function (json) {
            assert.equal(json.foo, 'bar');
            return json;
          });
        });
        test('always creates a new Headers instance', function () {
          var headers = new Headers({
            'x-hello': 'world'
          });
          var res = new Response('', {
            headers: headers
          });
          assert.equal(res.headers.get('x-hello'), 'world');
          assert.notEqual(res.headers, headers);
        });
        test('clone text response', function () {
          var res = new Response('{"foo":"bar"}', {
            headers: {
              'content-type': 'application/json'
            }
          });
          var clone = res.clone();
          assert.notEqual(clone.headers, res.headers, 'headers were cloned');
          assert.equal(clone.headers.get('content-type'), 'application/json');
          return Promise.all([clone.json(), res.json()]).then(function (jsons) {
            assert.deepEqual(jsons[0], jsons[1], 'json of cloned object is the same as original');
          });
        });
        featureDependent(test, support.blob, 'clone blob response', function () {
          var req = new Request(new Blob(['test']));
          req.clone();
          assert.equal(req.bodyUsed, false);
        });
        test('error creates error Response', function () {
          var r = Response.error();
          assert(r instanceof Response);
          assert.equal(r.status, 0);
          assert.equal(r.statusText, '');
          assert.equal(r.type, 'error');
        });
        test('redirect creates redirect Response', function () {
          var r = Response.redirect('https://fetch.spec.whatwg.org/', 301);
          assert(r instanceof Response);
          assert.equal(r.status, 301);
          assert.equal(r.headers.get('Location'), 'https://fetch.spec.whatwg.org/');
        });
        test('construct with string body sets Content-Type header', function () {
          var r = new Response('I work out');
          assert.equal(r.headers.get('content-type'), 'text/plain;charset=UTF-8');
        });
        featureDependent(test, support.blob, 'construct with Blob body and type sets Content-Type header', function () {
          var r = new Response(new Blob(['test'], {
            type: 'text/plain'
          }));
          assert.equal(r.headers.get('content-type'), 'text/plain');
        });
        test('construct with body and explicit header uses header', function () {
          var r = new Response('I work out', {
            headers: {
              'Content-Type': 'text/plain'
            }
          });
          assert.equal(r.headers.get('content-type'), 'text/plain');
        });
      }); // https://fetch.spec.whatwg.org/#body-mixin

      suite('Body mixin', function () {
        featureDependent(suite, support.blob, 'arrayBuffer', function () {
          test('resolves arrayBuffer promise', function () {
            return fetch('/hello').then(function (response) {
              return response.arrayBuffer();
            }).then(function (buf) {
              assert(buf instanceof ArrayBuffer, 'buf is an ArrayBuffer instance');
              assert.equal(buf.byteLength, 2);
            });
          });
          test('arrayBuffer handles binary data', function () {
            return fetch('/binary').then(function (response) {
              return response.arrayBuffer();
            }).then(function (buf) {
              assert(buf instanceof ArrayBuffer, 'buf is an ArrayBuffer instance');
              assert.equal(buf.byteLength, 256, 'buf.byteLength is correct');
              var view = new Uint8Array(buf);

              for (var i = 0; i < 256; i++) {
                assert.equal(view[i], i);
              }
            });
          });
          test('arrayBuffer handles utf-8 data', function () {
            return fetch('/hello/utf8').then(function (response) {
              return response.arrayBuffer();
            }).then(function (buf) {
              assert(buf instanceof ArrayBuffer, 'buf is an ArrayBuffer instance');
              assert.equal(buf.byteLength, 5, 'buf.byteLength is correct');
              var octets = Array.prototype.slice.call(new Uint8Array(buf));
              assert.deepEqual(octets, [104, 101, 108, 108, 111]);
            });
          });
          test('arrayBuffer handles utf-16le data', function () {
            return fetch('/hello/utf16le').then(function (response) {
              return response.arrayBuffer();
            }).then(function (buf) {
              assert(buf instanceof ArrayBuffer, 'buf is an ArrayBuffer instance');
              assert.equal(buf.byteLength, 10, 'buf.byteLength is correct');
              var octets = Array.prototype.slice.call(new Uint8Array(buf));
              assert.deepEqual(octets, [104, 0, 101, 0, 108, 0, 108, 0, 111, 0]);
            });
          });
          test('rejects arrayBuffer promise after body is consumed', function () {
            return fetch('/hello').then(function (response) {
              assert.equal(response.bodyUsed, false);
              response.blob();
              assert.equal(response.bodyUsed, true);
              return response.arrayBuffer();
            }).catch(function (error) {
              assert(error instanceof TypeError, 'Promise rejected after body consumed');
            });
          });
        });
        featureDependent(suite, support.blob, 'blob', function () {
          test('resolves blob promise', function () {
            return fetch('/hello').then(function (response) {
              return response.blob();
            }).then(function (blob) {
              assert(blob instanceof Blob, 'blob is a Blob instance');
              assert.equal(blob.size, 2);
            });
          });
          test('blob handles binary data', function () {
            return fetch('/binary').then(function (response) {
              return response.blob();
            }).then(function (blob) {
              assert(blob instanceof Blob, 'blob is a Blob instance');
              assert.equal(blob.size, 256, 'blob.size is correct');
            });
          });
          test('blob handles utf-8 data', function () {
            return fetch('/hello/utf8').then(function (response) {
              return response.blob();
            }).then(readBlobAsBytes).then(function (octets) {
              assert.equal(octets.length, 5, 'blob.size is correct');
              assert.deepEqual(octets, [104, 101, 108, 108, 111]);
            });
          });
          test('blob handles utf-16le data', function () {
            return fetch('/hello/utf16le').then(function (response) {
              return response.blob();
            }).then(readBlobAsBytes).then(function (octets) {
              assert.equal(octets.length, 10, 'blob.size is correct');
              assert.deepEqual(octets, [104, 0, 101, 0, 108, 0, 108, 0, 111, 0]);
            });
          });
          test('rejects blob promise after body is consumed', function () {
            return fetch('/hello').then(function (response) {
              assert(response.blob, 'Body does not implement blob');
              assert.equal(response.bodyUsed, false);
              response.text();
              assert.equal(response.bodyUsed, true);
              return response.blob();
            }).catch(function (error) {
              assert(error instanceof TypeError, 'Promise rejected after body consumed');
            });
          });
        });
        featureDependent(suite, support.formData, 'formData', function () {
          test('post sets content-type header', function () {
            return fetch('/request', {
              method: 'post',
              body: new FormData()
            }).then(function (response) {
              return response.json();
            }).then(function (json) {
              assert.equal(json.method, 'POST');
              assert(/^multipart\/form-data;/.test(json.headers['content-type']));
            });
          });
          featureDependent(test, !nativeChrome, 'rejects formData promise after body is consumed', function () {
            return fetch('/json').then(function (response) {
              assert(response.formData, 'Body does not implement formData');
              response.formData();
              return response.formData();
            }).catch(function (error) {
              if (error instanceof chai.AssertionError) {
                throw error;
              } else {
                assert(error instanceof TypeError, 'Promise rejected after body consumed');
              }
            });
          });
          featureDependent(test, !nativeChrome, 'parses form encoded response', function () {
            return fetch('/form').then(function (response) {
              return response.formData();
            }).then(function (form) {
              assert(form instanceof FormData, 'Parsed a FormData object');
            });
          });
        });
        suite('json', function () {
          test('parses json response', function () {
            return fetch('/json').then(function (response) {
              return response.json();
            }).then(function (json) {
              assert.equal(json.name, 'Hubot');
              assert.equal(json.login, 'hubot');
            });
          });
          test('rejects json promise after body is consumed', function () {
            return fetch('/json').then(function (response) {
              assert(response.json, 'Body does not implement json');
              assert.equal(response.bodyUsed, false);
              response.text();
              assert.equal(response.bodyUsed, true);
              return response.json();
            }).catch(function (error) {
              assert(error instanceof TypeError, 'Promise rejected after body consumed');
            });
          });
          featureDependent(test, !polyfillFirefox, 'handles json parse error', function () {
            return fetch('/json-error').then(function (response) {
              return response.json();
            }).catch(function (error) {
              assert(error instanceof Error, 'JSON exception is an Error instance');
              assert(error.message, 'JSON exception has an error message');
            });
          });
        });
        suite('text', function () {
          test('handles 204 No Content response', function () {
            return fetch('/empty').then(function (response) {
              assert.equal(response.status, 204);
              return response.text();
            }).then(function (body) {
              assert.equal(body, '');
            });
          });
          test('resolves text promise', function () {
            return fetch('/hello').then(function (response) {
              return response.text();
            }).then(function (text) {
              assert.equal(text, 'hi');
            });
          });
          test('rejects text promise after body is consumed', function () {
            return fetch('/hello').then(function (response) {
              assert(response.text, 'Body does not implement text');
              assert.equal(response.bodyUsed, false);
              response.text();
              assert.equal(response.bodyUsed, true);
              return response.text();
            }).catch(function (error) {
              assert(error instanceof TypeError, 'Promise rejected after body consumed');
            });
          });
        });
      });
      suite('fetch method', function () {
        suite('promise resolution', function () {
          test('resolves promise on 500 error', function () {
            return fetch('/boom').then(function (response) {
              assert.equal(response.status, 500);
              assert.equal(response.ok, false);
              return response.text();
            }).then(function (body) {
              assert.equal(body, 'boom');
            });
          });
          test.skip('rejects promise for network error', function () {
            return fetch('/error').then(function (response) {
              assert(false, 'HTTP status ' + response.status + ' was treated as success');
            }).catch(function (error) {
              assert(error instanceof TypeError, 'Rejected with Error');
            });
          });
          test('rejects when Request constructor throws', function () {
            return fetch('/request', {
              method: 'GET',
              body: 'invalid'
            }).then(function () {
              assert(false, 'Invalid Request init was accepted');
            }).catch(function (error) {
              assert(error instanceof TypeError, 'Rejected with Error');
            });
          });
        });
        suite('request', function () {
          test('sends headers', function () {
            return fetch('/request', {
              headers: {
                'Accept': 'application/json',
                'X-Test': '42'
              }
            }).then(function (response) {
              return response.json();
            }).then(function (json) {
              assert.equal(json.headers['accept'], 'application/json');
              assert.equal(json.headers['x-test'], '42');
            });
          });
          test('with Request as argument', function () {
            var request = new Request('/request', {
              headers: {
                'Accept': 'application/json',
                'X-Test': '42'
              }
            });
            return fetch(request).then(function (response) {
              return response.json();
            }).then(function (json) {
              assert.equal(json.headers['accept'], 'application/json');
              assert.equal(json.headers['x-test'], '42');
            });
          });
          test('reusing same Request multiple times', function () {
            var request = new Request('/request', {
              headers: {
                'Accept': 'application/json',
                'X-Test': '42'
              }
            });
            var responses = [];
            return fetch(request).then(function (response) {
              responses.push(response);
              return fetch(request);
            }).then(function (response) {
              responses.push(response);
              return fetch(request);
            }).then(function (response) {
              responses.push(response);
              return Promise.all(responses.map(function (r) {
                return r.json();
              }));
            }).then(function (jsons) {
              jsons.forEach(function (json) {
                assert.equal(json.headers['accept'], 'application/json');
                assert.equal(json.headers['x-test'], '42');
              });
            });
          });
          featureDependent(suite, support.arrayBuffer, 'ArrayBuffer', function () {
            test('ArrayBuffer body', function () {
              return fetch('/request', {
                method: 'post',
                body: arrayBufferFromText('name=Hubot')
              }).then(function (response) {
                return response.json();
              }).then(function (request) {
                assert.equal(request.method, 'POST');
                assert.equal(request.data, 'name=Hubot');
              });
            });
            test('DataView body', function () {
              return fetch('/request', {
                method: 'post',
                body: new DataView(arrayBufferFromText('name=Hubot'))
              }).then(function (response) {
                return response.json();
              }).then(function (request) {
                assert.equal(request.method, 'POST');
                assert.equal(request.data, 'name=Hubot');
              });
            });
            test('TypedArray body', function () {
              return fetch('/request', {
                method: 'post',
                body: new Uint8Array(arrayBufferFromText('name=Hubot'))
              }).then(function (response) {
                return response.json();
              }).then(function (request) {
                assert.equal(request.method, 'POST');
                assert.equal(request.data, 'name=Hubot');
              });
            });
          });
          featureDependent(test, support.searchParams, 'sends URLSearchParams body', function () {
            return fetch('/request', {
              method: 'post',
              body: new URLSearchParams('a=1&b=2')
            }).then(function (response) {
              return response.json();
            }).then(function (request) {
              assert.equal(request.method, 'POST');
              assert.equal(request.data, 'a=1&b=2');
            });
          });
        });
        suite('response', function () {
          test('populates body', function () {
            return fetch('/hello').then(function (response) {
              assert.equal(response.status, 200);
              assert.equal(response.ok, true);
              return response.text();
            }).then(function (body) {
              assert.equal(body, 'hi');
            });
          });
          test('parses headers', function () {
            return fetch('/headers?' + new Date().getTime()).then(function (response) {
              assert.equal(response.headers.get('Date'), 'Mon, 13 Oct 2014 21:02:27 GMT');
              assert.equal(response.headers.get('Content-Type'), 'text/html; charset=utf-8');
            });
          });
        }); // https://fetch.spec.whatwg.org/#methods

        suite('HTTP methods', function () {
          test('supports HTTP GET', function () {
            return fetch('/request', {
              method: 'get'
            }).then(function (response) {
              return response.json();
            }).then(function (request) {
              assert.equal(request.method, 'GET');
              assert.equal(request.data, '');
            });
          });
          test('GET with body throws TypeError', function () {
            assert.throw(function () {
              new Request('', {
                method: 'get',
                body: 'invalid'
              });
            }, TypeError);
          });
          test('HEAD with body throws TypeError', function () {
            assert.throw(function () {
              new Request('', {
                method: 'head',
                body: 'invalid'
              });
            }, TypeError);
          });
          test('supports HTTP POST', function () {
            return fetch('/request', {
              method: 'post',
              body: 'name=Hubot'
            }).then(function (response) {
              return response.json();
            }).then(function (request) {
              assert.equal(request.method, 'POST');
              assert.equal(request.data, 'name=Hubot');
            });
          });
          test('supports HTTP PUT', function () {
            return fetch('/request', {
              method: 'put',
              body: 'name=Hubot'
            }).then(function (response) {
              return response.json();
            }).then(function (request) {
              assert.equal(request.method, 'PUT');
              assert.equal(request.data, 'name=Hubot');
            });
          });
          featureDependent(test, support.patch, 'supports HTTP PATCH', function () {
            return fetch('/request', {
              method: 'PATCH',
              body: 'name=Hubot'
            }).then(function (response) {
              return response.json();
            }).then(function (request) {
              assert.equal(request.method, 'PATCH');
              assert.equal(request.data, 'name=Hubot');
            });
          });
          test('supports HTTP DELETE', function () {
            return fetch('/request', {
              method: 'delete'
            }).then(function (response) {
              return response.json();
            }).then(function (request) {
              assert.equal(request.method, 'DELETE');
              assert.equal(request.data, '');
            });
          });
        }); // https://fetch.spec.whatwg.org/#atomic-http-redirect-handling

        suite('Atomic HTTP redirect handling', function () {
          test('handles 301 redirect response', function () {
            return fetch('/redirect/301').then(function (response) {
              assert.equal(response.status, 200);
              assert.equal(response.ok, true);
              assert.match(response.url, /\/hello/);
              return response.text();
            }).then(function (body) {
              assert.equal(body, 'hi');
            });
          });
          test('handles 302 redirect response', function () {
            return fetch('/redirect/302').then(function (response) {
              assert.equal(response.status, 200);
              assert.equal(response.ok, true);
              assert.match(response.url, /\/hello/);
              return response.text();
            }).then(function (body) {
              assert.equal(body, 'hi');
            });
          });
          test('handles 303 redirect response', function () {
            return fetch('/redirect/303').then(function (response) {
              assert.equal(response.status, 200);
              assert.equal(response.ok, true);
              assert.match(response.url, /\/hello/);
              return response.text();
            }).then(function (body) {
              assert.equal(body, 'hi');
            });
          });
          test('handles 307 redirect response', function () {
            return fetch('/redirect/307').then(function (response) {
              assert.equal(response.status, 200);
              assert.equal(response.ok, true);
              assert.match(response.url, /\/hello/);
              return response.text();
            }).then(function (body) {
              assert.equal(body, 'hi');
            });
          });
          featureDependent(test, support.permanentRedirect, 'handles 308 redirect response', function () {
            return fetch('/redirect/308').then(function (response) {
              assert.equal(response.status, 200);
              assert.equal(response.ok, true);
              assert.match(response.url, /\/hello/);
              return response.text();
            }).then(function (body) {
              assert.equal(body, 'hi');
            });
          });
        }); // https://fetch.spec.whatwg.org/#concept-request-credentials-mode

        suite('credentials mode', function () {
          setup(function () {
            return fetch('/cookie?name=foo&value=reset', {
              credentials: 'same-origin'
            });
          });
          featureDependent(suite, exerciseMode === 'native', 'omit', function () {
            test('request credentials defaults to omit', function () {
              var request = new Request('');
              assert.equal(request.credentials, 'omit');
            });
            test('does not accept cookies with implicit omit credentials', function () {
              return fetch('/cookie?name=foo&value=bar').then(function () {
                return fetch('/cookie?name=foo', {
                  credentials: 'same-origin'
                });
              }).then(function (response) {
                return response.text();
              }).then(function (data) {
                assert.equal(data, 'reset');
              });
            });
            test('does not accept cookies with omit credentials', function () {
              return fetch('/cookie?name=foo&value=bar', {
                credentials: 'omit'
              }).then(function () {
                return fetch('/cookie?name=foo', {
                  credentials: 'same-origin'
                });
              }).then(function (response) {
                return response.text();
              }).then(function (data) {
                assert.equal(data, 'reset');
              });
            });
            test('does not send cookies with implicit omit credentials', function () {
              return fetch('/cookie?name=foo&value=bar', {
                credentials: 'same-origin'
              }).then(function () {
                return fetch('/cookie?name=foo');
              }).then(function (response) {
                return response.text();
              }).then(function (data) {
                assert.equal(data, '');
              });
            });
            test('does not send cookies with omit credentials', function () {
              return fetch('/cookie?name=foo&value=bar').then(function () {
                return fetch('/cookie?name=foo', {
                  credentials: 'omit'
                });
              }).then(function (response) {
                return response.text();
              }).then(function (data) {
                assert.equal(data, '');
              });
            });
          });
          suite('same-origin', function () {
            test('request credentials uses inits member', function () {
              var request = new Request('', {
                credentials: 'same-origin'
              });
              assert.equal(request.credentials, 'same-origin');
            });
            test('send cookies with same-origin credentials', function () {
              return fetch('/cookie?name=foo&value=bar', {
                credentials: 'same-origin'
              }).then(function () {
                return fetch('/cookie?name=foo', {
                  credentials: 'same-origin'
                });
              }).then(function (response) {
                return response.text();
              }).then(function (data) {
                assert.equal(data, 'bar');
              });
            });
          });
          suite('include', function () {
            test('send cookies with include credentials', function () {
              return fetch('/cookie?name=foo&value=bar', {
                credentials: 'include'
              }).then(function () {
                return fetch('/cookie?name=foo', {
                  credentials: 'include'
                });
              }).then(function (response) {
                return response.text();
              }).then(function (data) {
                assert.equal(data, 'bar');
              });
            });
          });
        });
      });
    });
  });
  return exports;
}