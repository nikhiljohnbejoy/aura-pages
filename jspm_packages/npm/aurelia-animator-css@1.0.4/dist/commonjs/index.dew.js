import { dew as _aureliaAnimatorCssDewDew } from "./aurelia-animator-css.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aureliaAnimatorCss = _aureliaAnimatorCssDewDew();

  Object.keys(_aureliaAnimatorCss).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _aureliaAnimatorCss[key];
      }
    });
  });
  return exports;
}