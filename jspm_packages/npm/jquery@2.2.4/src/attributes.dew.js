var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["./core", "./attributes/attr", "./attributes/prop", "./attributes/classes", "./attributes/val"], function (jQuery) {
    // Return jQuery for attributes-only inclusion
    return jQuery;
  });
  return exports;
}