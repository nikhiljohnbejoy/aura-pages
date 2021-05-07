var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(function () {
    // [[Class]] -> type pairs
    return {};
  });
  return exports;
}