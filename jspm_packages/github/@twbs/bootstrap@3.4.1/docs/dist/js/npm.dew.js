import _module from "module";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var _nodeRequire = function () {
    var Module = _module.Module;

    if (Module) {
      var m = new Module("");
      m.filename = import.meta.url.substr(7 + (Module._nodeModulePaths("/")[0].length > 13));
      m.paths = Module._nodeModulePaths(m.filename.substr(0, m.filename.lastIndexOf("/")));
      return m.require.bind(m);
    } else {
      return function _nodeRequire(id) {
        var e = new Error("Cannot find module '" + id + "'");
        e.code = "MODULE_NOT_FOUND";
        throw e;
      };
    }
  }();

  // This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.
  _nodeRequire('../../js/transition.js');

  _nodeRequire('../../js/alert.js');

  _nodeRequire('../../js/button.js');

  _nodeRequire('../../js/carousel.js');

  _nodeRequire('../../js/collapse.js');

  _nodeRequire('../../js/dropdown.js');

  _nodeRequire('../../js/modal.js');

  _nodeRequire('../../js/tooltip.js');

  _nodeRequire('../../js/popover.js');

  _nodeRequire('../../js/scrollspy.js');

  _nodeRequire('../../js/tab.js');

  _nodeRequire('../../js/affix.js');

  return exports;
}