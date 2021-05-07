import { dew as _utilDewDew } from "./util.dew.js";
import _process from "process";
var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  var process = _process;

  var util = _utilDewDew();

  var schedule;

  var noAsyncScheduler = function () {
    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
  };

  var NativePromise = util.getNativePromise();

  if (util.isNode && typeof MutationObserver === "undefined") {
    var GlobalSetImmediate = _global.setImmediate;
    var ProcessNextTick = process.nextTick;
    schedule = util.isRecentNode ? function (fn) {
      GlobalSetImmediate.call(_global, fn);
    } : function (fn) {
      ProcessNextTick.call(process, fn);
    };
  } else if (typeof NativePromise === "function") {
    var nativePromise = NativePromise.resolve();

    schedule = function (fn) {
      nativePromise.then(fn);
    };
  } else if (typeof MutationObserver !== "undefined" && !(typeof window !== "undefined" && window.navigator && window.navigator.standalone)) {
    schedule = function () {
      var div = document.createElement("div");
      var opts = {
        attributes: true
      };
      var toggleScheduled = false;
      var div2 = document.createElement("div");
      var o2 = new MutationObserver(function () {
        div.classList.toggle("foo");
        toggleScheduled = false;
      });
      o2.observe(div2, opts);

      var scheduleToggle = function () {
        if (toggleScheduled) return;
        toggleScheduled = true;
        div2.classList.toggle("foo");
      };

      return function schedule(fn) {
        var o = new MutationObserver(function () {
          o.disconnect();
          fn();
        });
        o.observe(div, opts);
        scheduleToggle();
      };
    }();
  } else if (typeof setImmediate !== "undefined") {
    schedule = function (fn) {
      setImmediate(fn);
    };
  } else if (typeof setTimeout !== "undefined") {
    schedule = function (fn) {
      setTimeout(fn, 0);
    };
  } else {
    schedule = noAsyncScheduler;
  }

  exports = schedule;
  return exports;
}