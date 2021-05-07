import { dew as _aureliaBootstrapperDewDew } from "./aurelia-bootstrapper.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aureliaBootstrapper = _aureliaBootstrapperDewDew();

  Object.keys(_aureliaBootstrapper).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _aureliaBootstrapper[key];
      }
    });
  });
  return exports;
}