var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["../Data"], function (Data) {
    return new Data();
  });
  return exports;
}