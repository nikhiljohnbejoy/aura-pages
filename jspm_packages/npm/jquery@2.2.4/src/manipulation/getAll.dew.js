var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["../core"], function (jQuery) {
    function getAll(context, tag) {
      // Support: IE9-11+
      // Use typeof to avoid zero-argument method invocation on host objects (#15151)
      var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];
      return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
    }

    return getAll;
  });
  return exports;
}