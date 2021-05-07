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
    exampleSource: 'doc/example/',
    exampleOutput: 'doc/example-dist/',
    packageName: pkg.name,
    ignore: [],
    useTypeScriptForDTS: false,
    importsToAdd: [],
    sort: false
  };
  paths.files = ['index.js'].map(function (file) {
    return paths.root + file;
  });
  exports = paths;
  return exports;
}