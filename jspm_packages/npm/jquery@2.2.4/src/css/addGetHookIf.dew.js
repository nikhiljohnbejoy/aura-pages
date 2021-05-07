var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(function () {
    function addGetHookIf(conditionFn, hookFn) {
      // Define the hook, we'll check on the first run if it's really needed.
      return {
        get: function () {
          if (conditionFn()) {
            // Hook not needed (or it's not possible to use it due
            // to missing dependency), remove it.
            delete (this || _global).get;
            return;
          } // Hook needed; redefine it so that the support test is not executed again.


          return ((this || _global).get = hookFn).apply(this || _global, arguments);
        }
      };
    }

    return addGetHookIf;
  });
  return exports;
}