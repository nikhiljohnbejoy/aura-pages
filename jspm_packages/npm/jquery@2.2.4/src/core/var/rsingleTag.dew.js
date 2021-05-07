var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(function () {
    // Match a standalone tag
    return /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
  });
  return exports;
}