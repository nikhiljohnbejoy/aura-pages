import { dew as _pathsDewDew } from "../paths.dew.js";
import { dew as _babelOptionsDewDew } from "../babel-options.dew.js";
import { dew as _typescriptOptionsDewDew } from "../typescript-options.dew.js";
import _stream from "stream";
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

  var runSequence = _nodeRequire('run-sequence');

  var to5 = _nodeRequire('gulp-babel');

  var paths = _pathsDewDew();

  var compilerOptions = _babelOptionsDewDew();

  var compilerTsOptions = _typescriptOptionsDewDew();

  var assign = Object.assign || _nodeRequire('object.assign');

  var through2 = _nodeRequire('through2');

  var concat = _nodeRequire('gulp-concat');

  var insert = _nodeRequire('gulp-insert');

  var rename = _nodeRequire('gulp-rename');

  var tools = _nodeRequire('aurelia-tools');

  var ts = _nodeRequire('gulp-typescript');

  var gutil = _nodeRequire('gulp-util');

  var gulpIgnore = _nodeRequire('gulp-ignore');

  var merge = _nodeRequire('merge2');

  var jsName = paths.packageName + '.js';
  var compileToModules = ['es2015', 'commonjs', 'amd', 'system', 'native-modules'];

  function cleanGeneratedCode() {
    return through2.obj(function (file, enc, callback) {
      file.contents = new Buffer(tools.cleanGeneratedCode(file.contents.toString('utf8')));
      this.push(file);
      return callback();
    });
  }

  gulp.task('build-index', function () {
    var importsToAdd = paths.importsToAdd.slice();
    var src = gulp.src(paths.files);

    if (paths.sort) {
      src = src.pipe(tools.sortFiles());
    }

    if (paths.ignore) {
      paths.ignore.forEach(function (filename) {
        src = src.pipe(gulpIgnore.exclude(filename));
      });
    }

    return src.pipe(through2.obj(function (file, enc, callback) {
      file.contents = new Buffer(tools.extractImports(file.contents.toString('utf8'), importsToAdd));
      this.push(file);
      return callback();
    })).pipe(concat(jsName)).pipe(insert.transform(function (contents) {
      return tools.createImportBlock(importsToAdd) + contents;
    })).pipe(gulp.dest(paths.output));
  });

  function gulpFileFromString(filename, string) {
    var src = _stream.Readable({
      objectMode: true
    });

    src._read = function () {
      this.push(new gutil.File({
        cwd: paths.appRoot,
        base: paths.output,
        path: filename,
        contents: new Buffer(string)
      }));
      this.push(null);
    };

    return src;
  }

  function srcForBabel() {
    return merge(gulp.src(paths.output + jsName), gulpFileFromString(paths.output + 'index.js', "export * from './" + paths.packageName + "';"));
  }

  function srcForTypeScript() {
    return gulp.src(paths.output + paths.packageName + '.js').pipe(rename(function (path) {
      if (path.extname == '.js') {
        path.extname = '.ts';
      }
    }));
  }

  compileToModules.forEach(function (moduleType) {
    gulp.task('build-babel-' + moduleType, function () {
      return srcForBabel().pipe(to5(assign({}, compilerOptions[moduleType]()))).pipe(cleanGeneratedCode()).pipe(gulp.dest(paths.output + moduleType));
    });
    if (moduleType === 'native-modules') return; // typescript doesn't support the combination of: es5 + native modules

    gulp.task('build-ts-' + moduleType, function () {
      var tsProject = ts.createProject(compilerTsOptions({
        module: moduleType,
        target: moduleType == 'es2015' ? 'es2015' : 'es5'
      }), ts.reporter.defaultReporter());
      var tsResult = srcForTypeScript().pipe(ts(tsProject));
      return tsResult.js.pipe(gulp.dest(paths.output + moduleType));
    });
  });
  gulp.task('build-dts', function () {
    var tsProject = ts.createProject(compilerTsOptions({
      removeComments: false,
      target: "es2015",
      module: "es2015"
    }), ts.reporter.defaultReporter());
    var tsResult = srcForTypeScript().pipe(ts(tsProject));
    return tsResult.dts.pipe(gulp.dest(paths.output));
  });
  gulp.task('build', function (callback) {
    return runSequence('clean', 'build-index', compileToModules.map(function (moduleType) {
      return 'build-babel-' + moduleType;
    }).concat(paths.useTypeScriptForDTS ? ['build-dts'] : []), callback);
  });
  gulp.task('build-ts', function (callback) {
    return runSequence('clean', 'build-index', 'build-babel-native-modules', compileToModules.filter(function (moduleType) {
      return moduleType !== 'native-modules';
    }).map(function (moduleType) {
      return 'build-ts-' + moduleType;
    }).concat(paths.useTypeScriptForDTS ? ['build-dts'] : []), callback);
  });
  return exports;
}