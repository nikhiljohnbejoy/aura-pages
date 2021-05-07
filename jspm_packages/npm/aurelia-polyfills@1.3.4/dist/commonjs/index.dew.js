import { dew as _aureliaPolyfillsDewDew } from "./aurelia-polyfills.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aureliaPolyfills = _aureliaPolyfillsDewDew();

  Object.keys(_aureliaPolyfills).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _aureliaPolyfills[key];
      }
    });
  });
  return exports;
}