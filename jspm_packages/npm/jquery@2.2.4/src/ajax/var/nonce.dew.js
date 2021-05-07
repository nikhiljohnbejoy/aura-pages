var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["../../core"], function (jQuery) {
    return jQuery.now();
  });
  return exports;
}