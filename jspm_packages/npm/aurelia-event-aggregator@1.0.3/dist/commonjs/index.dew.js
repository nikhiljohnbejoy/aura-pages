import { dew as _aureliaEventAggregatorDewDew } from "./aurelia-event-aggregator.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aureliaEventAggregator = _aureliaEventAggregatorDewDew();

  Object.keys(_aureliaEventAggregator).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _aureliaEventAggregator[key];
      }
    });
  });
  return exports;
}