import { dew as _aureliaLoggingDewDew } from "./aurelia-logging.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aureliaLogging = _aureliaLoggingDewDew();

  Object.keys(_aureliaLogging).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _aureliaLogging[key];
      }
    });
  });
  return exports;
}