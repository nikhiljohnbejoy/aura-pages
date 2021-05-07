import _crypto from "crypto";
import _fs from "fs";
import _path from "path";
import _process from "process";
import _module from "module";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var _nodeRequire = function () {
    var Module = _module.Module;

    if (Module) {
      var m = new Module("");
      m.filename = import.meta.url.substr(7 + (Module._nodeModulePaths("/")[0].length > 13));
      m.paths = Module._nodeModulePaths(m.filename.substr(0, m.filename.lastIndexOf("/")));
      return m.require.bind(m);
    } else {
      return function _nodeRequire(id) {
        var e = new Error("Cannot find module '" + id + "'");
        e.code = "MODULE_NOT_FOUND";
        throw e;
      };
    }
  }();

  var process = _process;

  /*!
   * Script to generate SRI hashes for use in our docs.
   * Remember to use the same vendor files as the CDN ones,
   * otherwise the hashes won't match!
   *
   * Copyright 2017-2019 The Bootstrap Authors
   * Copyright 2017-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   */
  var crypto = _crypto;
  var fs = _fs;
  var path = _path;

  var replace = _nodeRequire('replace-in-file');

  var configFile = path.join(import.meta.url.startsWith('file:') ? decodeURI(import.meta.url.slice(0, import.meta.url.lastIndexOf('/')).slice(7 + (typeof process !== 'undefined' && process.platform === 'win32'))) : new URL(import.meta.url.slice(0, import.meta.url.lastIndexOf('/'))).pathname, '../_config.yml'); // Array of objects which holds the files to generate SRI hashes for.
  // `file` is the path from the root folder
  // `configPropertyName` is the _config.yml variable's name of the file

  var files = [{
    file: 'dist/css/bootstrap.min.css',
    configPropertyName: 'css_hash'
  }, {
    file: 'dist/css/bootstrap-theme.min.css',
    configPropertyName: 'css_theme_hash'
  }, {
    file: 'dist/js/bootstrap.min.js',
    configPropertyName: 'js_hash'
  }];
  files.forEach(function (file) {
    fs.readFile(file.file, 'utf8', function (err, data) {
      if (err) {
        throw err;
      }

      var algo = 'sha384';
      var hash = crypto.createHash(algo).update(data, 'utf8').digest('base64');
      var integrity = algo + '-' + hash;
      console.log(file.configPropertyName + ': ' + integrity);

      try {
        replace.sync({
          files: configFile,
          from: new RegExp('(\\s' + file.configPropertyName + ':\\s+"|\')(\\S+)("|\')'),
          to: '$1' + integrity + '$3'
        });
      } catch (error) {
        console.error('Error occurred:', error);
      }
    });
  });
  return exports;
}