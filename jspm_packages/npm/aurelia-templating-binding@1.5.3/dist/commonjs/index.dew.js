import { dew as _aureliaTemplatingBindingDewDew } from "./aurelia-templating-binding.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aureliaTemplatingBinding = _aureliaTemplatingBindingDewDew();

  Object.keys(_aureliaTemplatingBinding).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _aureliaTemplatingBinding[key];
      }
    });
  });
  return exports;
}