var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["../var/support"], function (support) {
    support.focusin = "onfocusin" in window;
    return support;
  });
  return exports;
}