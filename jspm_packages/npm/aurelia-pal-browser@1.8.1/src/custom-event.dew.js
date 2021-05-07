var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  if (typeof FEATURE_NO_IE === 'undefined') {
    if (!window.CustomEvent || typeof window.CustomEvent !== 'function') {
      let CustomEvent = function (event, params) {
        params = params || {
          bubbles: false,
          cancelable: false,
          detail: undefined
        };
        let evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      };

      CustomEvent.prototype = window.Event.prototype;
      window.CustomEvent = CustomEvent;
    }
  }

  return exports;
}