var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["./document"], function (document) {
    return document.documentElement;
  });
  return exports;
}