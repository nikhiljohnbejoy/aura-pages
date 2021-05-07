import { dew as _pathsDewDew } from "../paths.dew.js";
import _buffer from "buffer";
import _module from "module";
var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

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

  var Buffer = _buffer.Buffer;

  var gulp = _nodeRequire('gulp');

  var paths = _pathsDewDew();

  var typedoc = _nodeRequire('gulp-typedoc');

  var runSequence = _nodeRequire('run-sequence');

  var through2 = _nodeRequire('through2');

  gulp.task('doc-generate', function () {
    return gulp.src([paths.output + paths.packageName + '.d.ts']).pipe(typedoc({
      target: 'es6',
      includeDeclarations: true,
      moduleResolution: 'node',
      json: paths.doc + '/api.json',
      name: paths.packageName + '-docs',
      mode: 'modules',
      excludeExternals: true,
      ignoreCompilerErrors: false,
      version: true
    }));
  });
  gulp.task('doc-shape', function () {
    return gulp.src([paths.doc + '/api.json']).pipe(through2.obj(function (file, enc, callback) {
      var json = JSON.parse(file.contents.toString('utf8')).children[0];
      json = {
        name: paths.packageName,
        children: json.children,
        groups: json.groups
      };
      file.contents = new Buffer(JSON.stringify(json));
      this.push(file);
      return callback();
    })).pipe(gulp.dest(paths.doc));
  });
  gulp.task('doc', function (callback) {
    return runSequence('doc-generate', 'doc-shape', callback);
  });
  return exports;
}