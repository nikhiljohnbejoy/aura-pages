var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  System.register(['./aurelia-pal-browser'], function (_export, _context) {
    "use strict";

    return {
      setters: [function (_aureliaPalBrowser) {
        var _exportObj = {};

        for (var _key in _aureliaPalBrowser) {
          if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _aureliaPalBrowser[_key];
        }

        _export(_exportObj);
      }],
      execute: function () {}
    };
  });
  return exports;
}