import { dew as _aureliaFrameworkDewDew } from "./aurelia-framework.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aureliaFramework = _aureliaFrameworkDewDew();

  Object.keys(_aureliaFramework).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _aureliaFramework[key];
      }
    });
  });
  return exports;
}