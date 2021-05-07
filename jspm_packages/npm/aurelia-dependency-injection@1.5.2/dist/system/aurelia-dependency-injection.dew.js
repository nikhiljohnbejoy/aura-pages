var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  System.register(['aurelia-metadata', 'aurelia-pal'], function (exports, module) {
    'use strict';

    var metadata, protocol, AggregateError;
    return {
      setters: [function (module) {
        metadata = module.metadata;
        protocol = module.protocol;
      }, function (module) {
        AggregateError = module.AggregateError;
      }],
      execute: function () {
        exports({
          autoinject: autoinject,
          inject: inject,
          invoker: invoker,
          invokeAsFactory: invokeAsFactory,
          registration: registration,
          transient: transient,
          singleton: singleton,
          Strategy: void 0,
          getDecoratorDependencies: getDecoratorDependencies,
          lazy: lazy,
          all: all,
          optional: optional,
          parent: parent,
          factory: factory,
          newInstance: newInstance
        });
        /*! *****************************************************************************
        Copyright (c) Microsoft Corporation. All rights reserved.
        Licensed under the Apache License, Version 2.0 (the "License"); you may not use
        this file except in compliance with the License. You may obtain a copy of the
        License at http://www.apache.org/licenses/LICENSE-2.0
          THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
        KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
        WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
        MERCHANTABLITY OR NON-INFRINGEMENT.
          See the Apache Version 2.0 License for specific language governing permissions
        and limitations under the License.
        ***************************************************************************** */

        function __decorate(decorators, target, key, desc) {
          var c = arguments.length,
              r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
              d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        }

        function __metadata(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
        }

        function isInjectable(potentialTarget) {
          return !!potentialTarget;
        }

        function autoinject(potentialTarget) {
          var deco = function (target) {
            if (!target.hasOwnProperty('inject')) {
              target.inject = (metadata.getOwn(metadata.paramTypes, target) || _emptyParameters).slice();

              if (target.inject && target.inject.length > 0) {
                if (target.inject[target.inject.length - 1] === Object) {
                  target.inject.splice(-1, 1);
                }
              }
            }
          };

          if (isInjectable(potentialTarget)) {
            return deco(potentialTarget);
          }

          return deco;
        }

        function inject() {
          var rest = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
          }

          return function (target, _key, descriptor) {
            if (typeof descriptor === 'number') {
              autoinject(target);

              if (rest.length === 1) {
                target.inject[descriptor] = rest[0];
              }

              return;
            }

            if (descriptor) {
              var fn = descriptor.value;
              fn.inject = rest;
            } else {
              target.inject = rest;
            }
          };
        }

        var resolver = exports('resolver', protocol.create('aurelia:resolver', function (target) {
          if (!(typeof target.get === 'function')) {
            return 'Resolvers must implement: get(container: Container, key: any): any';
          }

          return true;
        }));
        var Strategy;

        (function (Strategy) {
          Strategy[Strategy["instance"] = 0] = "instance";
          Strategy[Strategy["singleton"] = 1] = "singleton";
          Strategy[Strategy["transient"] = 2] = "transient";
          Strategy[Strategy["function"] = 3] = "function";
          Strategy[Strategy["array"] = 4] = "array";
          Strategy[Strategy["alias"] = 5] = "alias";
        })(Strategy || (Strategy = exports('Strategy', {})));

        function isStrategy(actual, expected, state) {
          return actual === expected;
        }

        var StrategyResolver = exports('StrategyResolver', function () {
          function StrategyResolver(strategy, state) {
            (this || _global).strategy = strategy;
            (this || _global).state = state;
          }

          StrategyResolver.prototype.get = function (container, key) {
            if (isStrategy((this || _global).strategy, Strategy.instance, (this || _global).state)) {
              return (this || _global).state;
            }

            if (isStrategy((this || _global).strategy, Strategy.singleton, (this || _global).state)) {
              var singleton = container.invoke((this || _global).state);
              (this || _global).state = singleton;
              (this || _global).strategy = 0;
              return singleton;
            }

            if (isStrategy((this || _global).strategy, Strategy.transient, (this || _global).state)) {
              return container.invoke((this || _global).state);
            }

            if (isStrategy((this || _global).strategy, Strategy.function, (this || _global).state)) {
              return this.state(container, key, this || _global);
            }

            if (isStrategy((this || _global).strategy, Strategy.array, (this || _global).state)) {
              return (this || _global).state[0].get(container, key);
            }

            if (isStrategy((this || _global).strategy, Strategy.alias, (this || _global).state)) {
              return container.get((this || _global).state);
            }

            throw new Error('Invalid strategy: ' + (this || _global).strategy);
          };

          StrategyResolver = __decorate([resolver(), __metadata("design:paramtypes", [Number, Object])], StrategyResolver);
          return StrategyResolver;
        }());
        var Lazy = exports('Lazy', function () {
          function Lazy(key) {
            (this || _global)._key = key;
          }

          Lazy_1 = Lazy;

          Lazy.prototype.get = function (container) {
            var _this = this || _global;

            return function () {
              return container.get(_this._key);
            };
          };

          Lazy.of = function (key) {
            return new Lazy_1(key);
          };

          var Lazy_1;
          Lazy = Lazy_1 = __decorate([resolver(), __metadata("design:paramtypes", [Object])], Lazy);
          return Lazy;
        }());
        var All = exports('All', function () {
          function All(key) {
            (this || _global)._key = key;
          }

          All_1 = All;

          All.prototype.get = function (container) {
            return container.getAll((this || _global)._key);
          };

          All.of = function (key) {
            return new All_1(key);
          };

          var All_1;
          All = All_1 = __decorate([resolver(), __metadata("design:paramtypes", [Object])], All);
          return All;
        }());
        var Optional = exports('Optional', function () {
          function Optional(key, checkParent) {
            if (checkParent === void 0) {
              checkParent = true;
            }

            (this || _global)._key = key;
            (this || _global)._checkParent = checkParent;
          }

          Optional_1 = Optional;

          Optional.prototype.get = function (container) {
            if (container.hasResolver((this || _global)._key, (this || _global)._checkParent)) {
              return container.get((this || _global)._key);
            }

            return null;
          };

          Optional.of = function (key, checkParent) {
            if (checkParent === void 0) {
              checkParent = true;
            }

            return new Optional_1(key, checkParent);
          };

          var Optional_1;
          Optional = Optional_1 = __decorate([resolver(), __metadata("design:paramtypes", [Object, Boolean])], Optional);
          return Optional;
        }());
        var Parent = exports('Parent', function () {
          function Parent(key) {
            (this || _global)._key = key;
          }

          Parent_1 = Parent;

          Parent.prototype.get = function (container) {
            return container.parent ? container.parent.get((this || _global)._key) : null;
          };

          Parent.of = function (key) {
            return new Parent_1(key);
          };

          var Parent_1;
          Parent = Parent_1 = __decorate([resolver(), __metadata("design:paramtypes", [Object])], Parent);
          return Parent;
        }());
        var Factory = exports('Factory', function () {
          function Factory(key) {
            (this || _global)._key = key;
          }

          Factory_1 = Factory;

          Factory.prototype.get = function (container) {
            var fn = (this || _global)._key;
            var resolver = container.getResolver(fn);

            if (resolver && resolver.strategy === Strategy.function) {
              fn = resolver.state;
            }

            return function () {
              var rest = [];

              for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i] = arguments[_i];
              }

              return container.invoke(fn, rest);
            };
          };

          Factory.of = function (key) {
            return new Factory_1(key);
          };

          var Factory_1;
          Factory = Factory_1 = __decorate([resolver(), __metadata("design:paramtypes", [Object])], Factory);
          return Factory;
        }());
        var NewInstance = exports('NewInstance', function () {
          function NewInstance(key) {
            var dynamicDependencies = [];

            for (var _i = 1; _i < arguments.length; _i++) {
              dynamicDependencies[_i - 1] = arguments[_i];
            }

            (this || _global).key = key;
            (this || _global).asKey = key;
            (this || _global).dynamicDependencies = dynamicDependencies;
          }

          NewInstance_1 = NewInstance;

          NewInstance.prototype.get = function (container) {
            var dynamicDependencies = (this || _global).dynamicDependencies.length > 0 ? (this || _global).dynamicDependencies.map(function (dependency) {
              return dependency['protocol:aurelia:resolver'] ? dependency.get(container) : container.get(dependency);
            }) : undefined;
            var fn = (this || _global).key;
            var resolver = container.getResolver(fn);

            if (resolver && resolver.strategy === 3) {
              fn = resolver.state;
            }

            var instance = container.invoke(fn, dynamicDependencies);
            container.registerInstance((this || _global).asKey, instance);
            return instance;
          };

          NewInstance.prototype.as = function (key) {
            (this || _global).asKey = key;
            return this || _global;
          };

          NewInstance.of = function (key) {
            var dynamicDependencies = [];

            for (var _i = 1; _i < arguments.length; _i++) {
              dynamicDependencies[_i - 1] = arguments[_i];
            }

            return new (NewInstance_1.bind.apply(NewInstance_1, [void 0, key].concat(dynamicDependencies)))();
          };

          var NewInstance_1;
          NewInstance = NewInstance_1 = __decorate([resolver(), __metadata("design:paramtypes", [Object, Object])], NewInstance);
          return NewInstance;
        }());

        function getDecoratorDependencies(target) {
          autoinject(target);
          return target.inject;
        }

        function lazy(keyValue) {
          return function (target, _key, index) {
            var inject$$1 = getDecoratorDependencies(target);
            inject$$1[index] = Lazy.of(keyValue);
          };
        }

        function all(keyValue) {
          return function (target, _key, index) {
            var inject$$1 = getDecoratorDependencies(target);
            inject$$1[index] = All.of(keyValue);
          };
        }

        function optional(checkParentOrTarget) {
          if (checkParentOrTarget === void 0) {
            checkParentOrTarget = true;
          }

          var deco = function (checkParent) {
            return function (target, _key, index) {
              var inject$$1 = getDecoratorDependencies(target);
              inject$$1[index] = Optional.of(inject$$1[index], checkParent);
            };
          };

          if (typeof checkParentOrTarget === 'boolean') {
            return deco(checkParentOrTarget);
          }

          return deco(true);
        }

        function parent(target, _key, index) {
          var inject$$1 = getDecoratorDependencies(target);
          inject$$1[index] = Parent.of(inject$$1[index]);
        }

        function factory(keyValue) {
          return function (target, _key, index) {
            var inject$$1 = getDecoratorDependencies(target);
            inject$$1[index] = Factory.of(keyValue);
          };
        }

        function newInstance(asKeyOrTarget) {
          var dynamicDependencies = [];

          for (var _i = 1; _i < arguments.length; _i++) {
            dynamicDependencies[_i - 1] = arguments[_i];
          }

          var deco = function (asKey) {
            return function (target, _key, index) {
              var inject$$1 = getDecoratorDependencies(target);
              inject$$1[index] = NewInstance.of.apply(NewInstance, [inject$$1[index]].concat(dynamicDependencies));

              if (!!asKey) {
                inject$$1[index].as(asKey);
              }
            };
          };

          if (arguments.length >= 1) {
            return deco(asKeyOrTarget);
          }

          return deco();
        }

        function validateKey(key) {
          if (key === null || key === undefined) {
            throw new Error('key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
          }
        }

        var _emptyParameters = exports('_emptyParameters', Object.freeze([]));

        metadata.registration = 'aurelia:registration';
        metadata.invoker = 'aurelia:invoker';
        var resolverDecorates = resolver.decorates;
        var InvocationHandler = exports('InvocationHandler', function () {
          function InvocationHandler(fn, invoker, dependencies) {
            (this || _global).fn = fn;
            (this || _global).invoker = invoker;
            (this || _global).dependencies = dependencies;
          }

          InvocationHandler.prototype.invoke = function (container, dynamicDependencies) {
            return dynamicDependencies !== undefined ? (this || _global).invoker.invokeWithDynamicDependencies(container, (this || _global).fn, (this || _global).dependencies, dynamicDependencies) : (this || _global).invoker.invoke(container, (this || _global).fn, (this || _global).dependencies);
          };

          return InvocationHandler;
        }());

        function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
          var i = staticDependencies.length;
          var args = new Array(i);
          var lookup;

          while (i--) {
            lookup = staticDependencies[i];

            if (lookup === null || lookup === undefined) {
              throw new Error('Constructor Parameter with index ' + i + ' cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
            } else {
              args[i] = container.get(lookup);
            }
          }

          if (dynamicDependencies !== undefined) {
            args = args.concat(dynamicDependencies);
          }

          return Reflect.construct(fn, args);
        }

        var classInvoker = {
          invoke: function (container, Type, deps) {
            var instances = deps.map(function (dep) {
              return container.get(dep);
            });
            return Reflect.construct(Type, instances);
          },
          invokeWithDynamicDependencies: invokeWithDynamicDependencies
        };

        function getDependencies(f) {
          if (!f.hasOwnProperty('inject')) {
            return [];
          }

          if (typeof f.inject === 'function') {
            return f.inject();
          }

          return f.inject;
        }

        var Container = exports('Container', function () {
          function Container(configuration) {
            if (configuration === undefined) {
              configuration = {};
            }

            (this || _global)._configuration = configuration;
            (this || _global)._onHandlerCreated = configuration.onHandlerCreated;
            (this || _global)._handlers = configuration.handlers || (configuration.handlers = new Map());
            (this || _global)._resolvers = new Map();
            (this || _global).root = this || _global;
            (this || _global).parent = null;
          }

          Container.prototype.makeGlobal = function () {
            Container.instance = this || _global;
            return this || _global;
          };

          Container.prototype.setHandlerCreatedCallback = function (onHandlerCreated) {
            (this || _global)._onHandlerCreated = onHandlerCreated;
            (this || _global)._configuration.onHandlerCreated = onHandlerCreated;
          };

          Container.prototype.registerInstance = function (key, instance) {
            return this.registerResolver(key, new StrategyResolver(0, instance === undefined ? key : instance));
          };

          Container.prototype.registerSingleton = function (key, fn) {
            return this.registerResolver(key, new StrategyResolver(1, fn === undefined ? key : fn));
          };

          Container.prototype.registerTransient = function (key, fn) {
            return this.registerResolver(key, new StrategyResolver(2, fn === undefined ? key : fn));
          };

          Container.prototype.registerHandler = function (key, handler) {
            return this.registerResolver(key, new StrategyResolver(3, handler));
          };

          Container.prototype.registerAlias = function (originalKey, aliasKey) {
            return this.registerResolver(aliasKey, new StrategyResolver(5, originalKey));
          };

          Container.prototype.registerResolver = function (key, resolver$$1) {
            validateKey(key);
            var allResolvers = (this || _global)._resolvers;
            var result = allResolvers.get(key);

            if (result === undefined) {
              allResolvers.set(key, resolver$$1);
            } else if (result.strategy === 4) {
              result.state.push(resolver$$1);
            } else {
              allResolvers.set(key, new StrategyResolver(4, [result, resolver$$1]));
            }

            return resolver$$1;
          };

          Container.prototype.autoRegister = function (key, fn) {
            fn = fn === undefined ? key : fn;

            if (typeof fn === 'function') {
              var registration = metadata.get(metadata.registration, fn);

              if (registration === undefined) {
                return this.registerResolver(key, new StrategyResolver(1, fn));
              }

              return registration.registerResolver(this || _global, key, fn);
            }

            return this.registerResolver(key, new StrategyResolver(0, fn));
          };

          Container.prototype.autoRegisterAll = function (fns) {
            var i = fns.length;

            while (i--) {
              this.autoRegister(fns[i]);
            }
          };

          Container.prototype.unregister = function (key) {
            (this || _global)._resolvers.delete(key);
          };

          Container.prototype.hasResolver = function (key, checkParent) {
            if (checkParent === void 0) {
              checkParent = false;
            }

            validateKey(key);
            return (this || _global)._resolvers.has(key) || checkParent && (this || _global).parent !== null && (this || _global).parent.hasResolver(key, checkParent);
          };

          Container.prototype.getResolver = function (key) {
            return (this || _global)._resolvers.get(key);
          };

          Container.prototype.get = function (key) {
            validateKey(key);

            if (key === Container) {
              return this || _global;
            }

            if (resolverDecorates(key)) {
              return key.get(this || _global, key);
            }

            var resolver$$1 = (this || _global)._resolvers.get(key);

            if (resolver$$1 === undefined) {
              if ((this || _global).parent === null) {
                return this.autoRegister(key).get(this || _global, key);
              }

              var registration = metadata.get(metadata.registration, key);

              if (registration === undefined) {
                return (this || _global).parent._get(key);
              }

              return registration.registerResolver(this || _global, key, key).get(this || _global, key);
            }

            return resolver$$1.get(this || _global, key);
          };

          Container.prototype._get = function (key) {
            var resolver$$1 = (this || _global)._resolvers.get(key);

            if (resolver$$1 === undefined) {
              if ((this || _global).parent === null) {
                return this.autoRegister(key).get(this || _global, key);
              }

              return (this || _global).parent._get(key);
            }

            return resolver$$1.get(this || _global, key);
          };

          Container.prototype.getAll = function (key) {
            validateKey(key);

            var resolver$$1 = (this || _global)._resolvers.get(key);

            if (resolver$$1 === undefined) {
              if ((this || _global).parent === null) {
                return _emptyParameters;
              }

              return (this || _global).parent.getAll(key);
            }

            if (resolver$$1.strategy === 4) {
              var state = resolver$$1.state;
              var i = state.length;
              var results = new Array(i);

              while (i--) {
                results[i] = state[i].get(this || _global, key);
              }

              return results;
            }

            return [resolver$$1.get(this || _global, key)];
          };

          Container.prototype.createChild = function () {
            var child = new Container((this || _global)._configuration);
            child.root = (this || _global).root;
            child.parent = this || _global;
            return child;
          };

          Container.prototype.invoke = function (fn, dynamicDependencies) {
            try {
              var handler = (this || _global)._handlers.get(fn);

              if (handler === undefined) {
                handler = this._createInvocationHandler(fn);

                (this || _global)._handlers.set(fn, handler);
              }

              return handler.invoke(this || _global, dynamicDependencies);
            } catch (e) {
              throw new AggregateError("Error invoking " + fn.name + ". Check the inner error for details.", e, true);
            }
          };

          Container.prototype._createInvocationHandler = function (fn) {
            var dependencies;

            if (fn.inject === undefined) {
              dependencies = metadata.getOwn(metadata.paramTypes, fn) || _emptyParameters;
            } else {
              dependencies = [];
              var ctor = fn;

              while (typeof ctor === 'function') {
                dependencies.push.apply(dependencies, getDependencies(ctor));
                ctor = Object.getPrototypeOf(ctor);
              }
            }

            var invoker = metadata.getOwn(metadata.invoker, fn) || classInvoker;
            var handler = new InvocationHandler(fn, invoker, dependencies);
            return (this || _global)._onHandlerCreated !== undefined ? this._onHandlerCreated(handler) : handler;
          };

          return Container;
        }());

        function invoker(value) {
          return function (target) {
            metadata.define(metadata.invoker, value, target);
          };
        }

        function invokeAsFactory(potentialTarget) {
          var deco = function (target) {
            metadata.define(metadata.invoker, FactoryInvoker.instance, target);
          };

          return potentialTarget ? deco(potentialTarget) : deco;
        }

        var FactoryInvoker = exports('FactoryInvoker', function () {
          function FactoryInvoker() {}

          FactoryInvoker.prototype.invoke = function (container, fn, dependencies) {
            var i = dependencies.length;
            var args = new Array(i);

            while (i--) {
              args[i] = container.get(dependencies[i]);
            }

            return fn.apply(undefined, args);
          };

          FactoryInvoker.prototype.invokeWithDynamicDependencies = function (container, fn, staticDependencies, dynamicDependencies) {
            var i = staticDependencies.length;
            var args = new Array(i);

            while (i--) {
              args[i] = container.get(staticDependencies[i]);
            }

            if (dynamicDependencies !== undefined) {
              args = args.concat(dynamicDependencies);
            }

            return fn.apply(undefined, args);
          };

          return FactoryInvoker;
        }());
        FactoryInvoker.instance = new FactoryInvoker();

        function registration(value) {
          return function (target) {
            metadata.define(metadata.registration, value, target);
          };
        }

        function transient(key) {
          return registration(new TransientRegistration(key));
        }

        function singleton(keyOrRegisterInChild, registerInChild) {
          if (registerInChild === void 0) {
            registerInChild = false;
          }

          return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
        }

        var TransientRegistration = exports('TransientRegistration', function () {
          function TransientRegistration(key) {
            (this || _global)._key = key;
          }

          TransientRegistration.prototype.registerResolver = function (container, key, fn) {
            var existingResolver = container.getResolver((this || _global)._key || key);
            return existingResolver === undefined ? container.registerTransient((this || _global)._key || key, fn) : existingResolver;
          };

          return TransientRegistration;
        }());
        var SingletonRegistration = exports('SingletonRegistration', function () {
          function SingletonRegistration(keyOrRegisterInChild, registerInChild) {
            if (registerInChild === void 0) {
              registerInChild = false;
            }

            if (typeof keyOrRegisterInChild === 'boolean') {
              (this || _global)._registerInChild = keyOrRegisterInChild;
            } else {
              (this || _global)._key = keyOrRegisterInChild;
              (this || _global)._registerInChild = registerInChild;
            }
          }

          SingletonRegistration.prototype.registerResolver = function (container, key, fn) {
            var targetContainer = (this || _global)._registerInChild ? container : container.root;
            var existingResolver = targetContainer.getResolver((this || _global)._key || key);
            return existingResolver === undefined ? targetContainer.registerSingleton((this || _global)._key || key, fn) : existingResolver;
          };

          return SingletonRegistration;
        }());
      }
    };
  });
  return exports;
}