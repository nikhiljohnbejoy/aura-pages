var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["./class2type"], function (class2type) {
    return class2type.toString;
  });
  return exports;
}