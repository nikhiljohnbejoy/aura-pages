import { dew as _promiseDewDew } from "./promise.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  var old;
  if (typeof Promise !== "undefined") old = Promise;

  function noConflict() {
    try {
      if (Promise === bluebird) Promise = old;
    } catch (e) {}

    return bluebird;
  }

  var bluebird = _promiseDewDew()();

  bluebird.noConflict = noConflict;
  exports = bluebird;
  return exports;
}