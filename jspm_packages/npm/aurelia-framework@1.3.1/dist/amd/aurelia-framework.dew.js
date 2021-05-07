var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(['exports', 'aurelia-dependency-injection', 'aurelia-binding', 'aurelia-metadata', 'aurelia-templating', 'aurelia-loader', 'aurelia-task-queue', 'aurelia-path', 'aurelia-pal', 'aurelia-logging'], function (exports, _aureliaDependencyInjection, _aureliaBinding, _aureliaMetadata, _aureliaTemplating, _aureliaLoader, _aureliaTaskQueue, _aureliaPath, _aureliaPal, _aureliaLogging) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.LogManager = exports.FrameworkConfiguration = exports.Aurelia = undefined;
    Object.keys(_aureliaDependencyInjection).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _aureliaDependencyInjection[key];
        }
      });
    });
    Object.keys(_aureliaBinding).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _aureliaBinding[key];
        }
      });
    });
    Object.keys(_aureliaMetadata).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _aureliaMetadata[key];
        }
      });
    });
    Object.keys(_aureliaTemplating).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _aureliaTemplating[key];
        }
      });
    });
    Object.keys(_aureliaLoader).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _aureliaLoader[key];
        }
      });
    });
    Object.keys(_aureliaTaskQueue).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _aureliaTaskQueue[key];
        }
      });
    });
    Object.keys(_aureliaPath).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _aureliaPath[key];
        }
      });
    });
    Object.keys(_aureliaPal).forEach(function (key) {
      if (key === "default" || key === "__esModule") return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function () {
          return _aureliaPal[key];
        }
      });
    });

    var TheLogManager = _interopRequireWildcard(_aureliaLogging);

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};

        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }

        newObj.default = obj;
        return newObj;
      }
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function preventActionlessFormSubmit() {
      _aureliaPal.DOM.addEventListener('submit', function (evt) {
        var target = evt.target;
        var action = target.action;

        if (target.tagName.toLowerCase() === 'form' && !action) {
          evt.preventDefault();
        }
      });
    }

    var Aurelia = exports.Aurelia = function () {
      function Aurelia(loader, container, resources) {
        (this || _global).loader = loader || new _aureliaPal.PLATFORM.Loader();
        (this || _global).container = container || new _aureliaDependencyInjection.Container().makeGlobal();
        (this || _global).resources = resources || new _aureliaTemplating.ViewResources();
        (this || _global).use = new FrameworkConfiguration(this || _global);
        (this || _global).logger = TheLogManager.getLogger('aurelia');
        (this || _global).hostConfigured = false;
        (this || _global).host = null;

        (this || _global).use.instance(Aurelia, this || _global);

        (this || _global).use.instance(_aureliaLoader.Loader, (this || _global).loader);

        (this || _global).use.instance(_aureliaTemplating.ViewResources, (this || _global).resources);
      }

      Aurelia.prototype.start = function start() {
        var _this = this || _global;

        if ((this || _global)._started) {
          return (this || _global)._started;
        }

        (this || _global).logger.info('Aurelia Starting');

        return (this || _global)._started = (this || _global).use.apply().then(function () {
          preventActionlessFormSubmit();

          if (!_this.container.hasResolver(_aureliaTemplating.BindingLanguage)) {
            var message = 'You must configure Aurelia with a BindingLanguage implementation.';

            _this.logger.error(message);

            throw new Error(message);
          }

          _this.logger.info('Aurelia Started');

          var evt = _aureliaPal.DOM.createCustomEvent('aurelia-started', {
            bubbles: true,
            cancelable: true
          });

          _aureliaPal.DOM.dispatchEvent(evt);

          return _this;
        });
      };

      Aurelia.prototype.enhance = function enhance() {
        var _this2 = this || _global;

        var bindingContext = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var applicationHost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        this._configureHost(applicationHost || _aureliaPal.DOM.querySelectorAll('body')[0]);

        return new Promise(function (resolve) {
          var engine = _this2.container.get(_aureliaTemplating.TemplatingEngine);

          _this2.root = engine.enhance({
            container: _this2.container,
            element: _this2.host,
            resources: _this2.resources,
            bindingContext: bindingContext
          });

          _this2.root.attached();

          _this2._onAureliaComposed();

          resolve(_this2);
        });
      };

      Aurelia.prototype.setRoot = function setRoot() {
        var _this3 = this || _global;

        var root = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var applicationHost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var instruction = {};

        if ((this || _global).root && (this || _global).root.viewModel && (this || _global).root.viewModel.router) {
          (this || _global).root.viewModel.router.deactivate();

          (this || _global).root.viewModel.router.reset();
        }

        this._configureHost(applicationHost);

        var engine = (this || _global).container.get(_aureliaTemplating.TemplatingEngine);

        var transaction = (this || _global).container.get(_aureliaTemplating.CompositionTransaction);

        delete transaction.initialComposition;

        if (!root) {
          if ((this || _global).configModuleId) {
            root = (0, _aureliaPath.relativeToFile)('./app', (this || _global).configModuleId);
          } else {
            root = 'app';
          }
        }

        instruction.viewModel = root;
        instruction.container = instruction.childContainer = (this || _global).container;
        instruction.viewSlot = (this || _global).hostSlot;
        instruction.host = (this || _global).host;
        return engine.compose(instruction).then(function (r) {
          _this3.root = r;
          instruction.viewSlot.attached();

          _this3._onAureliaComposed();

          return _this3;
        });
      };

      Aurelia.prototype._configureHost = function _configureHost(applicationHost) {
        if ((this || _global).hostConfigured) {
          return;
        }

        applicationHost = applicationHost || (this || _global).host;

        if (!applicationHost || typeof applicationHost === 'string') {
          (this || _global).host = _aureliaPal.DOM.getElementById(applicationHost || 'applicationHost');
        } else {
          (this || _global).host = applicationHost;
        }

        if (!(this || _global).host) {
          throw new Error('No applicationHost was specified.');
        }

        (this || _global).hostConfigured = true;
        (this || _global).host.aurelia = this || _global;
        (this || _global).hostSlot = new _aureliaTemplating.ViewSlot((this || _global).host, true);

        (this || _global).hostSlot.transformChildNodesIntoView();

        (this || _global).container.registerInstance(_aureliaPal.DOM.boundary, (this || _global).host);
      };

      Aurelia.prototype._onAureliaComposed = function _onAureliaComposed() {
        var evt = _aureliaPal.DOM.createCustomEvent('aurelia-composed', {
          bubbles: true,
          cancelable: true
        });

        setTimeout(function () {
          return _aureliaPal.DOM.dispatchEvent(evt);
        }, 1);
      };

      return Aurelia;
    }();

    var logger = TheLogManager.getLogger('aurelia');
    var extPattern = /\.[^/.]+$/;

    function runTasks(config, tasks) {
      var current = void 0;

      var next = function next() {
        current = tasks.shift();

        if (current) {
          return Promise.resolve(current(config)).then(next);
        }

        return Promise.resolve();
      };

      return next();
    }

    function loadPlugin(fwConfig, loader, info) {
      logger.debug('Loading plugin ' + info.moduleId + '.');

      if (typeof info.moduleId === 'string') {
        fwConfig.resourcesRelativeTo = info.resourcesRelativeTo;
        var id = info.moduleId;

        if (info.resourcesRelativeTo.length > 1) {
          return loader.normalize(info.moduleId, info.resourcesRelativeTo[1]).then(function (normalizedId) {
            return _loadPlugin(normalizedId);
          });
        }

        return _loadPlugin(id);
      } else if (typeof info.configure === 'function') {
        if (fwConfig.configuredPlugins.indexOf(info.configure) !== -1) {
          return Promise.resolve();
        }

        fwConfig.configuredPlugins.push(info.configure);
        return Promise.resolve(info.configure.call(null, fwConfig, info.config || {}));
      }

      throw new Error(invalidConfigMsg(info.moduleId || info.configure, 'plugin'));

      function _loadPlugin(moduleId) {
        return loader.loadModule(moduleId).then(function (m) {
          if ('configure' in m) {
            if (fwConfig.configuredPlugins.indexOf(m.configure) !== -1) {
              return Promise.resolve();
            }

            return Promise.resolve(m.configure(fwConfig, info.config || {})).then(function () {
              fwConfig.configuredPlugins.push(m.configure);
              fwConfig.resourcesRelativeTo = null;
              logger.debug('Configured plugin ' + info.moduleId + '.');
            });
          }

          fwConfig.resourcesRelativeTo = null;
          logger.debug('Loaded plugin ' + info.moduleId + '.');
        });
      }
    }

    function loadResources(aurelia, resourcesToLoad, appResources) {
      if (Object.keys(resourcesToLoad).length === 0) {
        return Promise.resolve();
      }

      var viewEngine = aurelia.container.get(_aureliaTemplating.ViewEngine);
      return Promise.all(Object.keys(resourcesToLoad).map(function (n) {
        return _normalize(resourcesToLoad[n]);
      })).then(function (loads) {
        var names = [];
        var importIds = [];
        loads.forEach(function (l) {
          names.push(undefined);
          importIds.push(l.importId);
        });
        return viewEngine.importViewResources(importIds, names, appResources);
      });

      function _normalize(load) {
        var moduleId = load.moduleId;
        var ext = getExt(moduleId);

        if (isOtherResource(moduleId)) {
          moduleId = removeExt(moduleId);
        }

        return aurelia.loader.normalize(moduleId, load.relativeTo).then(function (normalized) {
          return {
            name: load.moduleId,
            importId: isOtherResource(load.moduleId) ? addOriginalExt(normalized, ext) : normalized
          };
        });
      }

      function isOtherResource(name) {
        var ext = getExt(name);
        if (!ext) return false;
        if (ext === '') return false;
        if (ext === '.js' || ext === '.ts') return false;
        return true;
      }

      function removeExt(name) {
        return name.replace(extPattern, '');
      }

      function addOriginalExt(normalized, ext) {
        return removeExt(normalized) + '.' + ext;
      }
    }

    function getExt(name) {
      var match = name.match(extPattern);

      if (match && match.length > 0) {
        return match[0].split('.')[1];
      }
    }

    function loadBehaviors(config) {
      return Promise.all(config.behaviorsToLoad.map(function (m) {
        return m.load(config.container, m.target);
      })).then(function () {
        config.behaviorsToLoad = null;
      });
    }

    function assertProcessed(plugins) {
      if (plugins.processed) {
        throw new Error('This config instance has already been applied. To load more plugins or global resources, create a new FrameworkConfiguration instance.');
      }
    }

    function invalidConfigMsg(cfg, type) {
      return 'Invalid ' + type + ' [' + cfg + '], ' + type + ' must be specified as functions or relative module IDs.';
    }

    var FrameworkConfiguration = function () {
      function FrameworkConfiguration(aurelia) {
        var _this4 = this || _global;

        (this || _global).aurelia = aurelia;
        (this || _global).container = aurelia.container;
        (this || _global).info = [];
        (this || _global).processed = false;
        (this || _global).preTasks = [];
        (this || _global).postTasks = [];
        (this || _global).behaviorsToLoad = [];
        (this || _global).configuredPlugins = [];
        (this || _global).resourcesToLoad = {};
        this.preTask(function () {
          return aurelia.loader.normalize('aurelia-bootstrapper').then(function (name) {
            return _this4.bootstrapperName = name;
          });
        });
        this.postTask(function () {
          return loadResources(aurelia, _this4.resourcesToLoad, aurelia.resources);
        });
      }

      FrameworkConfiguration.prototype.instance = function instance(type, _instance) {
        (this || _global).container.registerInstance(type, _instance);

        return this || _global;
      };

      FrameworkConfiguration.prototype.singleton = function singleton(type, implementation) {
        (this || _global).container.registerSingleton(type, implementation);

        return this || _global;
      };

      FrameworkConfiguration.prototype.transient = function transient(type, implementation) {
        (this || _global).container.registerTransient(type, implementation);

        return this || _global;
      };

      FrameworkConfiguration.prototype.preTask = function preTask(task) {
        assertProcessed(this || _global);

        (this || _global).preTasks.push(task);

        return this || _global;
      };

      FrameworkConfiguration.prototype.postTask = function postTask(task) {
        assertProcessed(this || _global);

        (this || _global).postTasks.push(task);

        return this || _global;
      };

      FrameworkConfiguration.prototype.feature = function feature(plugin) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        switch (typeof plugin === 'undefined' ? 'undefined' : _typeof(plugin)) {
          case 'string':
            var hasIndex = /\/index$/i.test(plugin);

            var _moduleId = hasIndex || getExt(plugin) ? plugin : plugin + '/index';

            var root = hasIndex ? plugin.substr(0, plugin.length - 6) : plugin;

            (this || _global).info.push({
              moduleId: _moduleId,
              resourcesRelativeTo: [root, ''],
              config: config
            });

            break;

          case 'function':
            (this || _global).info.push({
              configure: plugin,
              config: config || {}
            });

            break;

          default:
            throw new Error(invalidConfigMsg(plugin, 'feature'));
        }

        return this || _global;
      };

      FrameworkConfiguration.prototype.globalResources = function globalResources(resources) {
        var _this5 = this || _global;

        assertProcessed(this || _global);
        var toAdd = Array.isArray(resources) ? resources : arguments;
        var resource = void 0;
        var resourcesRelativeTo = (this || _global).resourcesRelativeTo || ['', ''];

        for (var i = 0, ii = toAdd.length; i < ii; ++i) {
          resource = toAdd[i];

          switch (typeof resource === 'undefined' ? 'undefined' : _typeof(resource)) {
            case 'string':
              var parent = resourcesRelativeTo[0];
              var grandParent = resourcesRelativeTo[1];
              var name = resource;

              if ((resource.startsWith('./') || resource.startsWith('../')) && parent !== '') {
                name = (0, _aureliaPath.join)(parent, resource);
              }

              (this || _global).resourcesToLoad[name] = {
                moduleId: name,
                relativeTo: grandParent
              };
              break;

            case 'function':
              var meta = (this || _global).aurelia.resources.autoRegister((this || _global).container, resource);

              if (meta instanceof _aureliaTemplating.HtmlBehaviorResource && meta.elementName !== null) {
                if ((this || _global).behaviorsToLoad.push(meta) === 1) {
                  this.postTask(function () {
                    return loadBehaviors(_this5);
                  });
                }
              }

              break;

            default:
              throw new Error(invalidConfigMsg(resource, 'resource'));
          }
        }

        return this || _global;
      };

      FrameworkConfiguration.prototype.globalName = function globalName(resourcePath, newName) {
        assertProcessed(this || _global);
        (this || _global).resourcesToLoad[resourcePath] = {
          moduleId: newName,
          relativeTo: ''
        };
        return this || _global;
      };

      FrameworkConfiguration.prototype.plugin = function plugin(_plugin, pluginConfig) {
        assertProcessed(this || _global);
        var info = void 0;

        switch (typeof _plugin === 'undefined' ? 'undefined' : _typeof(_plugin)) {
          case 'string':
            info = {
              moduleId: _plugin,
              resourcesRelativeTo: [_plugin, ''],
              config: pluginConfig || {}
            };
            break;

          case 'function':
            info = {
              configure: _plugin,
              config: pluginConfig || {}
            };
            break;

          default:
            throw new Error(invalidConfigMsg(_plugin, 'plugin'));
        }

        (this || _global).info.push(info);

        return this || _global;
      };

      FrameworkConfiguration.prototype._addNormalizedPlugin = function _addNormalizedPlugin(name, config) {
        var _this6 = this || _global;

        var plugin = {
          moduleId: name,
          resourcesRelativeTo: [name, ''],
          config: config || {}
        };

        (this || _global).info.push(plugin);

        this.preTask(function () {
          var relativeTo = [name, _this6.bootstrapperName];
          plugin.moduleId = name;
          plugin.resourcesRelativeTo = relativeTo;
          return Promise.resolve();
        });
        return this || _global;
      };

      FrameworkConfiguration.prototype.defaultBindingLanguage = function defaultBindingLanguage() {
        return this._addNormalizedPlugin('aurelia-templating-binding');
      };

      FrameworkConfiguration.prototype.router = function router() {
        return this._addNormalizedPlugin('aurelia-templating-router');
      };

      FrameworkConfiguration.prototype.history = function history() {
        return this._addNormalizedPlugin('aurelia-history-browser');
      };

      FrameworkConfiguration.prototype.defaultResources = function defaultResources() {
        return this._addNormalizedPlugin('aurelia-templating-resources');
      };

      FrameworkConfiguration.prototype.eventAggregator = function eventAggregator() {
        return this._addNormalizedPlugin('aurelia-event-aggregator');
      };

      FrameworkConfiguration.prototype.basicConfiguration = function basicConfiguration() {
        return this.defaultBindingLanguage().defaultResources().eventAggregator();
      };

      FrameworkConfiguration.prototype.standardConfiguration = function standardConfiguration() {
        return this.basicConfiguration().history().router();
      };

      FrameworkConfiguration.prototype.developmentLogging = function developmentLogging(level) {
        var _this7 = this || _global;

        var logLevel = level ? TheLogManager.logLevel[level] : undefined;

        if (logLevel === undefined) {
          logLevel = TheLogManager.logLevel.debug;
        }

        this.preTask(function () {
          return _this7.aurelia.loader.normalize('aurelia-logging-console', _this7.bootstrapperName).then(function (name) {
            return _this7.aurelia.loader.loadModule(name).then(function (m) {
              TheLogManager.addAppender(new m.ConsoleAppender());
              TheLogManager.setLevel(logLevel);
            });
          });
        });
        return this || _global;
      };

      FrameworkConfiguration.prototype.apply = function apply() {
        var _this8 = this || _global;

        if ((this || _global).processed) {
          return Promise.resolve();
        }

        return runTasks(this || _global, (this || _global).preTasks).then(function () {
          var loader = _this8.aurelia.loader;
          var info = _this8.info;
          var current = void 0;

          var next = function next() {
            current = info.shift();

            if (current) {
              return loadPlugin(_this8, loader, current).then(next);
            }

            _this8.processed = true;
            _this8.configuredPlugins = null;
            return Promise.resolve();
          };

          return next().then(function () {
            return runTasks(_this8, _this8.postTasks);
          });
        });
      };

      return FrameworkConfiguration;
    }();

    exports.FrameworkConfiguration = FrameworkConfiguration;
    var LogManager = exports.LogManager = TheLogManager;
  });
  return exports;
}