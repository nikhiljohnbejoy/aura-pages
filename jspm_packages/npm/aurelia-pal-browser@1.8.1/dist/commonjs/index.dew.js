import { dew as _aureliaPalBrowserDewDew } from "./aurelia-pal-browser.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aureliaPalBrowser = _aureliaPalBrowserDewDew();

  Object.keys(_aureliaPalBrowser).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _aureliaPalBrowser[key];
      }
    });
  });
  return exports;
}