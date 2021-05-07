import _fs from "fs";
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

  var fs = _fs;

  var btoa = _nodeRequire('btoa');

  var glob = _nodeRequire('glob');

  function getFiles(type) {
    var files = {};
    var recursive = type === 'less';
    var globExpr = recursive ? '/**/*' : '/*';
    glob.sync(type + globExpr).filter(function (path) {
      return type === 'fonts' ? true : new RegExp('\\.' + type + '$').test(path);
    }).forEach(function (fullPath) {
      var relativePath = fullPath.replace(/^[^/]+\//, '');
      files[relativePath] = type === 'fonts' ? btoa(fs.readFileSync(fullPath)) : fs.readFileSync(fullPath, 'utf8');
    });
    return 'var __' + type + ' = ' + JSON.stringify(files) + '\n';
  }

  exports = function generateRawFilesJs(grunt, banner) {
    if (!banner) {
      banner = '';
    }

    var dirs = ['js', 'less', 'fonts'];
    var files = banner + dirs.map(getFiles).reduce(function (combined, file) {
      return combined + file;
    }, '');
    var rawFilesJs = 'docs/assets/js/raw-files.min.js';

    try {
      fs.writeFileSync(rawFilesJs, files);
    } catch (err) {
      grunt.fail.warn(err);
    }

    grunt.log.writeln('File ' + rawFilesJs.cyan + ' created.');
  };

  return exports;
}