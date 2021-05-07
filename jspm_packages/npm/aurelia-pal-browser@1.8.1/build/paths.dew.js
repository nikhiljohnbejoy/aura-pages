import _path from "path";
import _fs from "fs";
import _events from "events";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  var path = _path;
  var fs = _fs; // hide warning //

  var emitter = _events;
  emitter.defaultMaxListeners = 20;
  var appRoot = 'src/';
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  var paths = {
    root: appRoot,
    source: appRoot + '**/*.js',
    html: appRoot + '**/*.html',
    style: 'styles/**/*.css',
    output: 'dist/',
    doc: './doc',
    e2eSpecsSrc: 'test/e2e/src/*.js',
    e2eSpecsDist: 'test/e2e/dist/',
    packageName: pkg.name,
    ignore: [],
    useTypeScriptForDTS: false,
    importsToAdd: [],
    sort: false
  };
  paths.files = ['platform.js', 'function-name.js', 'class-list.js', 'performance.js', 'console.js', 'custom-event.js', 'element-matches.js', 'feature.js', 'html-template-element.js', 'dom.js', 'index.js'].map(function (file) {
    return paths.root + file;
  });
  exports = paths;
  return exports;
}