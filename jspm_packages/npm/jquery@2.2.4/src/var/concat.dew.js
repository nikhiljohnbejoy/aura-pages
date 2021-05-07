var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["./arr"], function (arr) {
    return arr.concat;
  });
  return exports;
}