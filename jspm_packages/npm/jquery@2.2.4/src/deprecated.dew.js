var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["./core"], function (jQuery) {
    jQuery.fn.extend({
      bind: function (types, data, fn) {
        return this.on(types, null, data, fn);
      },
      unbind: function (types, fn) {
        return this.off(types, null, fn);
      },
      delegate: function (selector, types, data, fn) {
        return this.on(types, selector, data, fn);
      },
      undelegate: function (selector, types, fn) {
        // ( namespace ) or ( selector, types [, fn] )
        return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
      },
      size: function () {
        return (this || _global).length;
      }
    });
    jQuery.fn.andSelf = jQuery.fn.addBack;
  });
  return exports;
}