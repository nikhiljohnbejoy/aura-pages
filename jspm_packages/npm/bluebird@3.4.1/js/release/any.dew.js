var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  exports = function (Promise) {
    var SomePromiseArray = Promise._SomePromiseArray;

    function any(promises) {
      var ret = new SomePromiseArray(promises);
      var promise = ret.promise();
      ret.setHowMany(1);
      ret.setUnwrap();
      ret.init();
      return promise;
    }

    Promise.any = function (promises) {
      return any(promises);
    };

    Promise.prototype.any = function () {
      return any(this);
    };
  };

  return exports;
}