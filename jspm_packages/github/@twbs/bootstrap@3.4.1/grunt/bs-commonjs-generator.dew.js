import _fs from "fs";
import _path from "path";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  var fs = _fs;
  var path = _path;
  var COMMONJS_BANNER = '// This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.\n';

  exports = function generateCommonJSModule(grunt, srcFiles, destFilepath) {
    var destDir = path.dirname(destFilepath);

    function srcPathToDestRequire(srcFilepath) {
      var requirePath = path.posix.relative(destDir, srcFilepath);
      return 'require(\'' + requirePath + '\')';
    }

    var moduleOutputJs = COMMONJS_BANNER + srcFiles.map(srcPathToDestRequire).join('\n');

    try {
      fs.writeFileSync(destFilepath, moduleOutputJs);
    } catch (err) {
      grunt.fail.warn(err);
    }

    grunt.log.writeln('File ' + destFilepath.cyan + ' created.');
  };

  return exports;
}