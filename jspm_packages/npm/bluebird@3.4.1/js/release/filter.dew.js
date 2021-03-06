var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports = function (Promise, INTERNAL) {
    var PromiseMap = Promise.map;

    Promise.prototype.filter = function (fn, options) {
      return PromiseMap(this, fn, options, INTERNAL);
    };

    Promise.filter = function (promises, fn, options) {
      return PromiseMap(promises, fn, options, INTERNAL);
    };
  };

  return exports;
}