import { dew as _aureliaLoaderDefaultDewDew } from "./aurelia-loader-default.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aureliaLoaderDefault = _aureliaLoaderDefaultDewDew();

  Object.keys(_aureliaLoaderDefault).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _aureliaLoaderDefault[key];
      }
    });
  });
  return exports;
}