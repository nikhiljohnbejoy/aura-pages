var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  System.register(['./aurelia-animator-css'], function (_export, _context) {
    "use strict";

    return {
      setters: [function (_aureliaAnimatorCss) {
        var _exportObj = {};

        for (var _key in _aureliaAnimatorCss) {
          if (_key !== "default" && key !== "__esModule") _exportObj[_key] = _aureliaAnimatorCss[_key];
        }

        _export(_exportObj);
      }],
      execute: function () {}
    };
  });
  return exports;
}