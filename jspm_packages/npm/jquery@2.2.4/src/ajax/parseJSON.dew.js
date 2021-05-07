var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["../core"], function (jQuery) {
    // Support: Android 2.3
    // Workaround failure to string-cast null input
    jQuery.parseJSON = function (data) {
      return JSON.parse(data + "");
    };

    return jQuery.parseJSON;
  });
  return exports;
}