var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["../../core", "../../selector"], function (jQuery) {
    return jQuery.expr.match.needsContext;
  });
  return exports;
}