import { dew as _tsconfigJsonDewDew } from "../tsconfig.json.dew.js";
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

  var tsconfig = _tsconfigJsonDewDew();

  var assign = Object.assign || _nodeRequire('object.assign');

  exports = function (override) {
    return assign(tsconfig.compilerOptions, {
      "target": override && override.target || "es5",
      "typescript": _nodeRequire('typescript')
    }, override || {});
  };

  return exports;
}