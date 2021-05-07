import { dew as _utilDewDew } from "./util.dew.js";
import { dew as _errorsDewDew } from "./errors.dew.js";
import { dew as _es5DewDew } from "./es5.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var util = _utilDewDew();

  var maybeWrapAsError = util.maybeWrapAsError;

  var errors = _errorsDewDew();

  var OperationalError = errors.OperationalError;

  var es5 = _es5DewDew();

  function isUntypedError(obj) {
    return obj instanceof Error && es5.getPrototypeOf(obj) === Error.prototype;
  }

  var rErrorKey = /^(?:name|message|stack|cause)$/;

  function wrapAsOperationalError(obj) {
    var ret;

    if (isUntypedError(obj)) {
      ret = new OperationalError(obj);
      ret.name = obj.name;
      ret.message = obj.message;
      ret.stack = obj.stack;
      var keys = es5.keys(obj);

      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];

        if (!rErrorKey.test(key)) {
          ret[key] = obj[key];
        }
      }

      return ret;
    }

    util.markAsOriginatingFromRejection(obj);
    return obj;
  }

  function nodebackForPromise(promise, multiArgs) {
    return function (err, value) {
      if (promise === null) return;

      if (err) {
        var wrapped = wrapAsOperationalError(maybeWrapAsError(err));

        promise._attachExtraTrace(wrapped);

        promise._reject(wrapped);
      } else if (!multiArgs) {
        promise._fulfill(value);
      } else {
        var $_len = arguments.length;
        var args = new Array(Math.max($_len - 1, 0));

        for (var $_i = 1; $_i < $_len; ++$_i) {
          args[$_i - 1] = arguments[$_i];
        }

        ;

        promise._fulfill(args);
      }

      promise = null;
    };
  }

  exports = nodebackForPromise;
  return exports;
}