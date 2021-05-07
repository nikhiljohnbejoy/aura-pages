import { dew as _aureliaTaskQueueDewDew } from "./aurelia-task-queue.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _aureliaTaskQueue = _aureliaTaskQueueDewDew();

  Object.keys(_aureliaTaskQueue).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _aureliaTaskQueue[key];
      }
    });
  });
  return exports;
}