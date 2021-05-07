var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["./core", "./selector", "./traversing", "./callbacks", "./deferred", "./core/ready", "./data", "./queue", "./queue/delay", "./attributes", "./event", "./event/alias", "./event/focusin", "./manipulation", "./manipulation/_evalUrl", "./wrap", "./css", "./css/hiddenVisibleSelectors", "./serialize", "./ajax", "./ajax/xhr", "./ajax/script", "./ajax/jsonp", "./ajax/load", "./event/ajax", "./effects", "./effects/animatedSelector", "./offset", "./dimensions", "./deprecated", "./exports/amd"], function (jQuery) {
    return window.jQuery = window.$ = jQuery;
  });
  return exports;
}