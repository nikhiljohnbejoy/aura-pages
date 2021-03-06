import _fs from "fs";
import _http from "http";
import _url from "url";
import _querystring from "querystring";
import _process from "process";
import _buffer from "buffer";
var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  var server;
  if (_dewExec) return exports;
  _dewExec = true;
  var Buffer = _buffer.Buffer;
  var process = _process;
  var port = Number(process.argv[2] || 3000);
  var fs = _fs;
  var http = _http;
  var url = _url;
  var querystring = _querystring;
  var routes = {
    '/request': function (res, req) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      var data = '';
      req.on('data', function (c) {
        data += c;
      });
      req.on('end', function () {
        res.end(JSON.stringify({
          method: req.method,
          url: req.url,
          headers: req.headers,
          data: data
        }));
      });
    },
    '/hello': function (res, req) {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'X-Request-URL': 'http://' + req.headers.host + req.url
      });
      res.end('hi');
    },
    '/hello/utf8': function (res) {
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
      }); // "hello"

      var buf = new Buffer([104, 101, 108, 108, 111]);
      res.end(buf);
    },
    '/hello/utf16le': function (res) {
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-16le'
      }); // "hello"

      var buf = new Buffer([104, 0, 101, 0, 108, 0, 108, 0, 111, 0]);
      res.end(buf);
    },
    '/binary': function (res) {
      res.writeHead(200, {
        'Content-Type': 'application/octet-stream'
      });
      var buf = new Buffer(256);

      for (var i = 0; i < 256; i++) {
        buf[i] = i;
      }

      res.end(buf);
    },
    '/redirect/301': function (res) {
      res.writeHead(301, {
        'Location': '/hello'
      });
      res.end();
    },
    '/redirect/302': function (res) {
      res.writeHead(302, {
        'Location': '/hello'
      });
      res.end();
    },
    '/redirect/303': function (res) {
      res.writeHead(303, {
        'Location': '/hello'
      });
      res.end();
    },
    '/redirect/307': function (res) {
      res.writeHead(307, {
        'Location': '/hello'
      });
      res.end();
    },
    '/redirect/308': function (res) {
      res.writeHead(308, {
        'Location': '/hello'
      });
      res.end();
    },
    '/boom': function (res) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.end('boom');
    },
    '/empty': function (res) {
      res.writeHead(204);
      res.end();
    },
    '/error': function (res) {
      res.destroy();
    },
    '/form': function (res) {
      res.writeHead(200, {
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      res.end('number=1&space=one+two&empty=&encoded=a%2Bb&');
    },
    '/json': function (res) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify({
        name: 'Hubot',
        login: 'hubot'
      }));
    },
    '/json-error': function (res) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end('not json {');
    },
    '/cookie': function (res, req) {
      var setCookie, cookie;
      var params = querystring.parse(url.parse(req.url).query);

      if (params.name && params.value) {
        setCookie = [params.name, params.value].join('=');
      }

      if (params.name) {
        cookie = querystring.parse(req.headers['cookie'], '; ')[params.name];
      }

      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Set-Cookie': setCookie
      });
      res.end(cookie);
    },
    '/headers': function (res) {
      res.writeHead(200, {
        'Date': 'Mon, 13 Oct 2014 21:02:27 GMT',
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end();
    }
  };
  var types = {
    js: 'application/javascript',
    css: 'text/css',
    html: 'text/html',
    txt: 'text/plain'
  };
  _global.server = server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var route = routes[pathname];

    if (route) {
      route(res, req);
    } else {
      if (pathname == '/') pathname = '/test/test.html';
      fs.readFile((import.meta.url.startsWith('file:') ? decodeURI(import.meta.url.slice(0, import.meta.url.lastIndexOf('/')).slice(7 + (typeof process !== 'undefined' && process.platform === 'win32'))) : new URL(import.meta.url.slice(0, import.meta.url.lastIndexOf('/'))).pathname) + '/..' + pathname, function (err, data) {
        if (err) {
          res.writeHead(404, {
            'Content-Type': types.txt
          });
          res.end('Not Found');
        } else {
          var ext = (pathname.match(/\.([^\/]+)$/) || [])[1];
          res.writeHead(200, {
            'Content-Type': types[ext] || types.txt
          });
          res.end(data);
        }
      });
    }
  });
  console.warn("Started test server on localhost:" + port);
  server.listen(port);
  return exports;
}