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

  System.register(['aurelia-polyfills', 'aurelia-pal', 'aurelia-pal-browser'], function (_export, _context) {
    "use strict";

    var PLATFORM, initialize, bootstrapQueue, sharedLoader, Aurelia;

    function onBootstrap(callback) {
      return new Promise(function (resolve, reject) {
        if (sharedLoader) {
          resolve(callback(sharedLoader));
        } else {
          bootstrapQueue.push(function () {
            try {
              resolve(callback(sharedLoader));
            } catch (e) {
              reject(e);
            }
          });
        }
      });
    }

    function ready(global) {
      return new Promise(function (resolve, reject) {
        if (global.document.readyState === 'complete') {
          resolve(global.document);
        } else {
          global.document.addEventListener('DOMContentLoaded', completed);
          global.addEventListener('load', completed);
        }

        function completed() {
          global.document.removeEventListener('DOMContentLoaded', completed);
          global.removeEventListener('load', completed);
          resolve(global.document);
        }
      });
    }

    function createLoader() {
      if (PLATFORM.Loader) {
        return Promise.resolve(new PLATFORM.Loader());
      }

      if (window.System && typeof window.System.import === 'function') {
        return System.normalize('aurelia-bootstrapper').then(function (bootstrapperName) {
          return System.normalize('aurelia-loader-default', bootstrapperName);
        }).then(function (loaderName) {
          return System.import(loaderName).then(function (m) {
            return new m.DefaultLoader();
          });
        });
      }

      if (typeof window.require === 'function') {
        return new Promise(function (resolve, reject) {
          return _nodeRequire(['aurelia-loader-default']);
        });
      }

      return Promise.reject('No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.');
    }

    function preparePlatform(loader) {
      return loader.normalize('aurelia-bootstrapper').then(function (bootstrapperName) {
        return loader.normalize('aurelia-framework', bootstrapperName).then(function (frameworkName) {
          loader.map('aurelia-framework', frameworkName);
          return Promise.all([loader.normalize('aurelia-dependency-injection', frameworkName).then(function (diName) {
            return loader.map('aurelia-dependency-injection', diName);
          }), loader.normalize('aurelia-router', bootstrapperName).then(function (routerName) {
            return loader.map('aurelia-router', routerName);
          }), loader.normalize('aurelia-logging-console', bootstrapperName).then(function (loggingConsoleName) {
            return loader.map('aurelia-logging-console', loggingConsoleName);
          })]).then(function () {
            return loader.loadModule(frameworkName).then(function (m) {
              return Aurelia = m.Aurelia;
            });
          });
        });
      });
    }

    function handleApp(loader, appHost) {
      var moduleId = appHost.getAttribute('aurelia-app') || appHost.getAttribute('data-aurelia-app');
      return config(loader, appHost, moduleId);
    }

    function config(loader, appHost, configModuleId) {
      var aurelia = new Aurelia(loader);
      aurelia.host = appHost;
      aurelia.configModuleId = configModuleId || null;

      if (configModuleId) {
        return loader.loadModule(configModuleId).then(function (customConfig) {
          if (!customConfig.configure) {
            throw new Error("Cannot initialize module '" + configModuleId + "' without a configure function.");
          }

          customConfig.configure(aurelia);
        });
      }

      aurelia.use.standardConfiguration().developmentLogging();
      return aurelia.start().then(function () {
        return aurelia.setRoot();
      });
    }

    function run() {
      return ready(window).then(function (doc) {
        initialize();
        var appHost = doc.querySelectorAll('[aurelia-app],[data-aurelia-app]');
        return createLoader().then(function (loader) {
          return preparePlatform(loader).then(function () {
            for (var i = 0, ii = appHost.length; i < ii; ++i) {
              handleApp(loader, appHost[i]).catch(console.error.bind(console));
            }

            sharedLoader = loader;

            for (var _i = 0, _ii = bootstrapQueue.length; _i < _ii; ++_i) {
              bootstrapQueue[_i]();
            }

            bootstrapQueue = null;
          });
        });
      });
    }

    function bootstrap(configure) {
      return onBootstrap(function (loader) {
        var aurelia = new Aurelia(loader);
        return configure(aurelia);
      });
    }

    _export('bootstrap', bootstrap);

    return {
      setters: [function (_aureliaPolyfills) {}, function (_aureliaPal) {
        PLATFORM = _aureliaPal.PLATFORM;
      }, function (_aureliaPalBrowser) {
        initialize = _aureliaPalBrowser.initialize;
      }],
      execute: function () {
        bootstrapQueue = [];
        sharedLoader = null;
        Aurelia = null;
        run();
      }
    };
  });
  return exports;
}