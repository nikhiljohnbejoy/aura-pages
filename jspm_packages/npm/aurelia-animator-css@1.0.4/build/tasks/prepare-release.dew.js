import { dew as _pathsDewDew } from "../paths.dew.js";
import _fs from "fs";
import { dew as _argsDewDew } from "../args.dew.js";
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

  var gulp = _nodeRequire('gulp');

  var runSequence = _nodeRequire('run-sequence');

  var paths = _pathsDewDew();

  var conventionalChangelog = _nodeRequire('gulp-conventional-changelog');

  var fs = _fs;

  var bump = _nodeRequire('gulp-bump');

  var args = _argsDewDew();

  gulp.task('bump-version', function () {
    return gulp.src(['./package.json', './bower.json']).pipe(bump({
      type: args.bump
    })) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
  });
  gulp.task('changelog', function () {
    return gulp.src(paths.doc + '/CHANGELOG.md', {
      buffer: false
    }).pipe(conventionalChangelog({
      preset: 'angular'
    })).pipe(gulp.dest(paths.doc));
  });
  gulp.task('prepare-release', function (callback) {
    return runSequence('build', 'lint', 'bump-version', 'doc', 'changelog', callback);
  });
  return exports;
}