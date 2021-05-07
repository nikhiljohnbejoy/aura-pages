var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(function () {
    return ["Top", "Right", "Bottom", "Left"];
  });
  return exports;
}