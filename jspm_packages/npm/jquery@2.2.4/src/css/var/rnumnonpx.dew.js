var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["../../var/pnum"], function (pnum) {
    return new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  });
  return exports;
}