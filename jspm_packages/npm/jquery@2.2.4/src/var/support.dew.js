var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(function () {
    // All support tests are defined in their respective modules.
    return {};
  });
  return exports;
}