var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(['exports', './aurelia-event-aggregator'], function (exports, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.keys(_aureliaEventAggregator).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _aureliaEventAggregator[key];
        }
      });
    });
  });
  return exports;
}