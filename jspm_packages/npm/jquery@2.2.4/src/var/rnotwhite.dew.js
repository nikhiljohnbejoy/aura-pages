var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(function () {
    return /\S+/g;
  });
  return exports;
}