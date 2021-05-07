import { dew as _aureliaHistoryDewDew } from "./aurelia-history.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aureliaHistory = _aureliaHistoryDewDew();

  Object.keys(_aureliaHistory).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _aureliaHistory[key];
      }
    });
  });
  return exports;
}