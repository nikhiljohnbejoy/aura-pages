var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  /* globals exports */
  exports.beforeStart = function (context) {
    var originalResourceError = context.page.onResourceError;

    context.page.onResourceError = function (resErr) {
      if (!/\/boom$/.test(resErr.url)) {
        originalResourceError(resErr);
      }
    };
  };

  return exports;
}