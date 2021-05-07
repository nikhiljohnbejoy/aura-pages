import { dew as _aureliaLoggingConsoleDewDew } from "./aurelia-logging-console.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aureliaLoggingConsole = _aureliaLoggingConsoleDewDew();

  Object.keys(_aureliaLoggingConsole).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _aureliaLoggingConsole[key];
      }
    });
  });
  return exports;
}