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

  var gulp = _nodeRequire('gulp');

  var Karma = _nodeRequire('karma').Server;
  /**
   * Run test once and exit
   */


  gulp.task('test', function (done) {
    new Karma({
      configFile: (import.meta.url.startsWith('file:') ? decodeURI(import.meta.url.slice(0, import.meta.url.lastIndexOf('/')).slice(7 + (typeof process !== 'undefined' && process.platform === 'win32'))) : new URL(import.meta.url.slice(0, import.meta.url.lastIndexOf('/'))).pathname) + '/../../karma.conf.js',
      singleRun: true
    }, done).start();
  });
  /**
   * Watch for file changes and re-run tests on each change
   */

  gulp.task('tdd', function (done) {
    new Karma({
      configFile: (import.meta.url.startsWith('file:') ? decodeURI(import.meta.url.slice(0, import.meta.url.lastIndexOf('/')).slice(7 + (typeof process !== 'undefined' && process.platform === 'win32'))) : new URL(import.meta.url.slice(0, import.meta.url.lastIndexOf('/'))).pathname) + '/../../karma.conf.js'
    }, done).start();
  });
  /**
   * Run test once with code coverage and exit
   */

  gulp.task('cover', function (done) {
    new Karma({
      configFile: (import.meta.url.startsWith('file:') ? decodeURI(import.meta.url.slice(0, import.meta.url.lastIndexOf('/')).slice(7 + (typeof process !== 'undefined' && process.platform === 'win32'))) : new URL(import.meta.url.slice(0, import.meta.url.lastIndexOf('/'))).pathname) + '/../../karma.conf.js',
      singleRun: true,
      reporters: ['coverage'],
      preprocessors: {
        'test/**/*.js': ['babel'],
        'src/**/*.js': ['babel', 'coverage']
      },
      coverageReporter: {
        type: 'html',
        dir: 'build/reports/coverage'
      }
    }, done).start();
  });
  return exports;
}