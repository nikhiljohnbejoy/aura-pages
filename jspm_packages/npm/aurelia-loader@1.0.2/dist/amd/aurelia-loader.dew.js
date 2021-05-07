var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(['exports', 'aurelia-path', 'aurelia-metadata'], function (exports, _aureliaPath, _aureliaMetadata) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Loader = exports.TemplateRegistryEntry = exports.TemplateDependency = undefined;

    var _createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var TemplateDependency = exports.TemplateDependency = function TemplateDependency(src, name) {
      (this || _global).src = src;
      (this || _global).name = name;
    };

    var TemplateRegistryEntry = exports.TemplateRegistryEntry = function () {
      function TemplateRegistryEntry(address) {
        (this || _global).templateIsLoaded = false;
        (this || _global).factoryIsReady = false;
        (this || _global).resources = null;
        (this || _global).dependencies = null;
        (this || _global).address = address;
        (this || _global).onReady = null;
        (this || _global)._template = null;
        (this || _global)._factory = null;
      }

      TemplateRegistryEntry.prototype.addDependency = function addDependency(src, name) {
        var finalSrc = typeof src === 'string' ? (0, _aureliaPath.relativeToFile)(src, (this || _global).address) : _aureliaMetadata.Origin.get(src).moduleId;

        (this || _global).dependencies.push(new TemplateDependency(finalSrc, name));
      };

      _createClass(TemplateRegistryEntry, [{
        key: 'template',
        get: function get() {
          return (this || _global)._template;
        },
        set: function set(value) {
          var address = (this || _global).address;
          var requires = void 0;
          var current = void 0;
          var src = void 0;
          var dependencies = void 0;
          (this || _global)._template = value;
          (this || _global).templateIsLoaded = true;
          requires = value.content.querySelectorAll('require');
          dependencies = (this || _global).dependencies = new Array(requires.length);

          for (var i = 0, ii = requires.length; i < ii; ++i) {
            current = requires[i];
            src = current.getAttribute('from');

            if (!src) {
              throw new Error('<require> element in ' + address + ' has no "from" attribute.');
            }

            dependencies[i] = new TemplateDependency((0, _aureliaPath.relativeToFile)(src, address), current.getAttribute('as'));

            if (current.parentNode) {
              current.parentNode.removeChild(current);
            }
          }
        }
      }, {
        key: 'factory',
        get: function get() {
          return (this || _global)._factory;
        },
        set: function set(value) {
          (this || _global)._factory = value;
          (this || _global).factoryIsReady = true;
        }
      }]);

      return TemplateRegistryEntry;
    }();

    var Loader = exports.Loader = function () {
      function Loader() {
        (this || _global).templateRegistry = {};
      }

      Loader.prototype.map = function map(id, source) {
        throw new Error('Loaders must implement map(id, source).');
      };

      Loader.prototype.normalizeSync = function normalizeSync(moduleId, relativeTo) {
        throw new Error('Loaders must implement normalizeSync(moduleId, relativeTo).');
      };

      Loader.prototype.normalize = function normalize(moduleId, relativeTo) {
        throw new Error('Loaders must implement normalize(moduleId: string, relativeTo: string): Promise<string>.');
      };

      Loader.prototype.loadModule = function loadModule(id) {
        throw new Error('Loaders must implement loadModule(id).');
      };

      Loader.prototype.loadAllModules = function loadAllModules(ids) {
        throw new Error('Loader must implement loadAllModules(ids).');
      };

      Loader.prototype.loadTemplate = function loadTemplate(url) {
        throw new Error('Loader must implement loadTemplate(url).');
      };

      Loader.prototype.loadText = function loadText(url) {
        throw new Error('Loader must implement loadText(url).');
      };

      Loader.prototype.applyPluginToUrl = function applyPluginToUrl(url, pluginName) {
        throw new Error('Loader must implement applyPluginToUrl(url, pluginName).');
      };

      Loader.prototype.addPlugin = function addPlugin(pluginName, implementation) {
        throw new Error('Loader must implement addPlugin(pluginName, implementation).');
      };

      Loader.prototype.getOrCreateTemplateRegistryEntry = function getOrCreateTemplateRegistryEntry(address) {
        return (this || _global).templateRegistry[address] || ((this || _global).templateRegistry[address] = new TemplateRegistryEntry(address));
      };

      return Loader;
    }();
  });
  return exports;
}