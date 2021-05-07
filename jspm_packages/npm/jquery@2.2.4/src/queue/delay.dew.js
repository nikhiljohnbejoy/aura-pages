var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["../core", "../queue", "../effects" // Delay is optional because of this dependency
  ], function (jQuery) {
    // Based off of the plugin by Clint Helfers, with permission.
    // http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function (time, type) {
      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
      type = type || "fx";
      return this.queue(type, function (next, hooks) {
        var timeout = window.setTimeout(next, time);

        hooks.stop = function () {
          window.clearTimeout(timeout);
        };
      });
    };

    return jQuery.fn.delay;
  });
  return exports;
}