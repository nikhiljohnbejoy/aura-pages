var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  /*
    Text plugin
  */
  exports.translate = function (load) {
    if ((this || _global).builder && (this || _global).transpiler) {
      load.metadata.format = 'esm';
      return 'export default ' + JSON.stringify(load.source) + ';';
    }

    load.metadata.format = 'amd';
    return 'def' + 'ine(function() {\nreturn ' + JSON.stringify(load.source) + ';\n});';
  };

  return exports;
}