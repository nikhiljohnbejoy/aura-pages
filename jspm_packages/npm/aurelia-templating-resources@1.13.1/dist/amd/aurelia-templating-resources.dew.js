var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(['exports', 'aurelia-dependency-injection', 'aurelia-pal', 'aurelia-task-queue', 'aurelia-templating', 'aurelia-binding', 'aurelia-logging', 'aurelia-loader', 'aurelia-path', 'aurelia-metadata'], function (exports, aureliaDependencyInjection, aureliaPal, aureliaTaskQueue, aureliaTemplating, aureliaBinding, aureliaLogging, aureliaLoader, aureliaPath, aureliaMetadata) {
    'use strict';
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

    /* global Reflect, Promise */

    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    function __extends(d, b) {
      extendStatics(d, b);

      function __() {
        (this || _global).constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    var ActivationStrategy;

    (function (ActivationStrategy) {
      ActivationStrategy["InvokeLifecycle"] = "invoke-lifecycle";
      ActivationStrategy["Replace"] = "replace";
    })(ActivationStrategy || (ActivationStrategy = {}));

    var Compose = function () {
      function Compose(element, container, compositionEngine, viewSlot, viewResources, taskQueue) {
        (this || _global).activationStrategy = ActivationStrategy.InvokeLifecycle;
        (this || _global).element = element;
        (this || _global).container = container;
        (this || _global).compositionEngine = compositionEngine;
        (this || _global).viewSlot = viewSlot;
        (this || _global).viewResources = viewResources;
        (this || _global).taskQueue = taskQueue;
        (this || _global).currentController = null;
        (this || _global).currentViewModel = null;
        (this || _global).changes = Object.create(null);
      }

      Compose.inject = function () {
        return [aureliaPal.DOM.Element, aureliaDependencyInjection.Container, aureliaTemplating.CompositionEngine, aureliaTemplating.ViewSlot, aureliaTemplating.ViewResources, aureliaTaskQueue.TaskQueue];
      };

      Compose.prototype.created = function (owningView) {
        (this || _global).owningView = owningView;
      };

      Compose.prototype.bind = function (bindingContext, overrideContext) {
        (this || _global).bindingContext = bindingContext;
        (this || _global).overrideContext = overrideContext;
        var changes = (this || _global).changes;
        changes.view = (this || _global).view;
        changes.viewModel = (this || _global).viewModel;
        changes.model = (this || _global).model;

        if (!(this || _global).pendingTask) {
          processChanges(this || _global);
        }
      };

      Compose.prototype.unbind = function () {
        (this || _global).changes = Object.create(null);
        (this || _global).bindingContext = null;
        (this || _global).overrideContext = null;
        var returnToCache = true;
        var skipAnimation = true;

        (this || _global).viewSlot.removeAll(returnToCache, skipAnimation);
      };

      Compose.prototype.modelChanged = function (newValue, oldValue) {
        (this || _global).changes.model = newValue;
        requestUpdate(this || _global);
      };

      Compose.prototype.viewChanged = function (newValue, oldValue) {
        (this || _global).changes.view = newValue;
        requestUpdate(this || _global);
      };

      Compose.prototype.viewModelChanged = function (newValue, oldValue) {
        (this || _global).changes.viewModel = newValue;
        requestUpdate(this || _global);
      };

      __decorate([aureliaTemplating.bindable], Compose.prototype, "model", void 0);

      __decorate([aureliaTemplating.bindable], Compose.prototype, "view", void 0);

      __decorate([aureliaTemplating.bindable], Compose.prototype, "viewModel", void 0);

      __decorate([aureliaTemplating.bindable], Compose.prototype, "activationStrategy", void 0);

      __decorate([aureliaTemplating.bindable], Compose.prototype, "swapOrder", void 0);

      Compose = __decorate([aureliaTemplating.noView, aureliaTemplating.customElement('compose')], Compose);
      return Compose;
    }();

    function isEmpty(obj) {
      for (var _ in obj) {
        return false;
      }

      return true;
    }

    function tryActivateViewModel(vm, model) {
      if (vm && typeof vm.activate === 'function') {
        return Promise.resolve(vm.activate(model));
      }
    }

    function createInstruction(composer, instruction) {
      return Object.assign(instruction, {
        bindingContext: composer.bindingContext,
        overrideContext: composer.overrideContext,
        owningView: composer.owningView,
        container: composer.container,
        viewSlot: composer.viewSlot,
        viewResources: composer.viewResources,
        currentController: composer.currentController,
        host: composer.element,
        swapOrder: composer.swapOrder
      });
    }

    function processChanges(composer) {
      var changes = composer.changes;
      composer.changes = Object.create(null);

      if (needsReInitialization(composer, changes)) {
        var instruction = {
          view: composer.view,
          viewModel: composer.currentViewModel || composer.viewModel,
          model: composer.model
        };
        instruction = Object.assign(instruction, changes);
        instruction = createInstruction(composer, instruction);
        composer.pendingTask = composer.compositionEngine.compose(instruction).then(function (controller) {
          composer.currentController = controller;
          composer.currentViewModel = controller ? controller.viewModel : null;
        });
      } else {
        composer.pendingTask = tryActivateViewModel(composer.currentViewModel, changes.model);

        if (!composer.pendingTask) {
          return;
        }
      }

      composer.pendingTask = composer.pendingTask.then(function () {
        completeCompositionTask(composer);
      }, function (reason) {
        completeCompositionTask(composer);
        throw reason;
      });
    }

    function completeCompositionTask(composer) {
      composer.pendingTask = null;

      if (!isEmpty(composer.changes)) {
        processChanges(composer);
      }
    }

    function requestUpdate(composer) {
      if (composer.pendingTask || composer.updateRequested) {
        return;
      }

      composer.updateRequested = true;
      composer.taskQueue.queueMicroTask(function () {
        composer.updateRequested = false;
        processChanges(composer);
      });
    }

    function needsReInitialization(composer, changes) {
      var activationStrategy = composer.activationStrategy;
      var vm = composer.currentViewModel;

      if (vm && typeof vm.determineActivationStrategy === 'function') {
        activationStrategy = vm.determineActivationStrategy();
      }

      return 'view' in changes || 'viewModel' in changes || activationStrategy === ActivationStrategy.Replace;
    }

    var IfCore = function () {
      function IfCore(viewFactory, viewSlot) {
        (this || _global).viewFactory = viewFactory;
        (this || _global).viewSlot = viewSlot;
        (this || _global).view = null;
        (this || _global).bindingContext = null;
        (this || _global).overrideContext = null;
        (this || _global).showing = false;
        (this || _global).cache = true;
      }

      IfCore.prototype.bind = function (bindingContext, overrideContext) {
        (this || _global).bindingContext = bindingContext;
        (this || _global).overrideContext = overrideContext;
      };

      IfCore.prototype.unbind = function () {
        if ((this || _global).view === null) {
          return;
        }

        (this || _global).view.unbind();

        if (!(this || _global).viewFactory.isCaching) {
          return;
        }

        if ((this || _global).showing) {
          (this || _global).showing = false;

          (this || _global).viewSlot.remove((this || _global).view, true, true);
        } else {
          (this || _global).view.returnToCache();
        }

        (this || _global).view = null;
      };

      IfCore.prototype._show = function () {
        if ((this || _global).showing) {
          if (!(this || _global).view.isBound) {
            (this || _global).view.bind((this || _global).bindingContext, (this || _global).overrideContext);
          }

          return;
        }

        if ((this || _global).view === null) {
          (this || _global).view = (this || _global).viewFactory.create();
        }

        if (!(this || _global).view.isBound) {
          (this || _global).view.bind((this || _global).bindingContext, (this || _global).overrideContext);
        }

        (this || _global).showing = true;
        return (this || _global).viewSlot.add((this || _global).view);
      };

      IfCore.prototype._hide = function () {
        var _this = this || _global;

        if (!(this || _global).showing) {
          return;
        }

        (this || _global).showing = false;

        var removed = (this || _global).viewSlot.remove((this || _global).view);

        if (removed instanceof Promise) {
          return removed.then(function () {
            _this._unbindView();
          });
        }

        this._unbindView();
      };

      IfCore.prototype._unbindView = function () {
        var cache = (this || _global).cache === 'false' ? false : !!(this || _global).cache;

        (this || _global).view.unbind();

        if (!cache) {
          (this || _global).view = null;
        }
      };

      return IfCore;
    }();

    var If = function (_super) {
      __extends(If, _super);

      function If() {
        var _this = _super !== null && _super.apply(this || _global, arguments) || this || _global;

        _this.cache = true;
        return _this;
      }

      If.prototype.bind = function (bindingContext, overrideContext) {
        _super.prototype.bind.call(this || _global, bindingContext, overrideContext);

        if ((this || _global).condition) {
          this._show();
        } else {
          this._hide();
        }
      };

      If.prototype.conditionChanged = function (newValue) {
        this._update(newValue);
      };

      If.prototype._update = function (show) {
        var _this = this || _global;

        if ((this || _global).animating) {
          return;
        }

        var promise;

        if ((this || _global).elseVm) {
          promise = show ? this._swap((this || _global).elseVm, this || _global) : this._swap(this || _global, (this || _global).elseVm);
        } else {
          promise = show ? this._show() : this._hide();
        }

        if (promise) {
          (this || _global).animating = true;
          promise.then(function () {
            _this.animating = false;

            if (_this.condition !== _this.showing) {
              _this._update(_this.condition);
            }
          });
        }
      };

      If.prototype._swap = function (remove, add) {
        switch ((this || _global).swapOrder) {
          case 'before':
            return Promise.resolve(add._show()).then(function () {
              return remove._hide();
            });

          case 'with':
            return Promise.all([remove._hide(), add._show()]);

          default:
            var promise = remove._hide();

            return promise ? promise.then(function () {
              return add._show();
            }) : add._show();
        }
      };

      __decorate([aureliaTemplating.bindable({
        primaryProperty: true
      })], If.prototype, "condition", void 0);

      __decorate([aureliaTemplating.bindable], If.prototype, "swapOrder", void 0);

      __decorate([aureliaTemplating.bindable], If.prototype, "cache", void 0);

      If = __decorate([aureliaTemplating.customAttribute('if'), aureliaTemplating.templateController, aureliaDependencyInjection.inject(aureliaTemplating.BoundViewFactory, aureliaTemplating.ViewSlot)], If);
      return If;
    }(IfCore);

    var Else = function (_super) {
      __extends(Else, _super);

      function Else(viewFactory, viewSlot) {
        var _this = _super.call(this || _global, viewFactory, viewSlot) || this || _global;

        _this._registerInIf();

        return _this;
      }

      Else.prototype.bind = function (bindingContext, overrideContext) {
        _super.prototype.bind.call(this || _global, bindingContext, overrideContext);

        if ((this || _global).ifVm.condition) {
          this._hide();
        } else {
          this._show();
        }
      };

      Else.prototype._registerInIf = function () {
        var previous = (this || _global).viewSlot.anchor.previousSibling;

        while (previous && !previous.au) {
          previous = previous.previousSibling;
        }

        if (!previous || !previous.au.if) {
          throw new Error("Can't find matching If for Else custom attribute.");
        }

        (this || _global).ifVm = previous.au.if.viewModel;
        (this || _global).ifVm.elseVm = this || _global;
      };

      Else = __decorate([aureliaTemplating.customAttribute('else'), aureliaTemplating.templateController, aureliaDependencyInjection.inject(aureliaTemplating.BoundViewFactory, aureliaTemplating.ViewSlot)], Else);
      return Else;
    }(IfCore);

    var With = function () {
      function With(viewFactory, viewSlot) {
        (this || _global).viewFactory = viewFactory;
        (this || _global).viewSlot = viewSlot;
        (this || _global).parentOverrideContext = null;
        (this || _global).view = null;
      }

      With.prototype.bind = function (bindingContext, overrideContext) {
        (this || _global).parentOverrideContext = overrideContext;
        this.valueChanged((this || _global).value);
      };

      With.prototype.valueChanged = function (newValue) {
        var overrideContext = aureliaBinding.createOverrideContext(newValue, (this || _global).parentOverrideContext);
        var view = (this || _global).view;

        if (!view) {
          view = (this || _global).view = (this || _global).viewFactory.create();
          view.bind(newValue, overrideContext);

          (this || _global).viewSlot.add(view);
        } else {
          view.bind(newValue, overrideContext);
        }
      };

      With.prototype.unbind = function () {
        var view = (this || _global).view;
        (this || _global).parentOverrideContext = null;

        if (view) {
          view.unbind();
        }
      };

      With = __decorate([aureliaTemplating.customAttribute('with'), aureliaTemplating.templateController, aureliaDependencyInjection.inject(aureliaTemplating.BoundViewFactory, aureliaTemplating.ViewSlot)], With);
      return With;
    }();

    var oneTime = aureliaBinding.bindingMode.oneTime;

    function updateOverrideContexts(views, startIndex) {
      var length = views.length;

      if (startIndex > 0) {
        startIndex = startIndex - 1;
      }

      for (; startIndex < length; ++startIndex) {
        updateOverrideContext(views[startIndex].overrideContext, startIndex, length);
      }
    }

    function createFullOverrideContext(repeat, data, index, length, key) {
      var bindingContext = {};
      var overrideContext = aureliaBinding.createOverrideContext(bindingContext, repeat.scope.overrideContext);

      if (typeof key !== 'undefined') {
        bindingContext[repeat.key] = key;
        bindingContext[repeat.value] = data;
      } else {
        bindingContext[repeat.local] = data;
      }

      updateOverrideContext(overrideContext, index, length);
      return overrideContext;
    }

    function updateOverrideContext(overrideContext, index, length) {
      var first = index === 0;
      var last = index === length - 1;
      var even = index % 2 === 0;
      overrideContext.$index = index;
      overrideContext.$first = first;
      overrideContext.$last = last;
      overrideContext.$middle = !(first || last);
      overrideContext.$odd = !even;
      overrideContext.$even = even;
    }

    function getItemsSourceExpression(instruction, attrName) {
      return instruction.behaviorInstructions.filter(function (bi) {
        return bi.originalAttrName === attrName;
      })[0].attributes.items.sourceExpression;
    }

    function unwrapExpression(expression) {
      var unwrapped = false;

      while (expression instanceof aureliaBinding.BindingBehavior) {
        expression = expression.expression;
      }

      while (expression instanceof aureliaBinding.ValueConverter) {
        expression = expression.expression;
        unwrapped = true;
      }

      return unwrapped ? expression : null;
    }

    function isOneTime(expression) {
      while (expression instanceof aureliaBinding.BindingBehavior) {
        if (expression.name === 'oneTime') {
          return true;
        }

        expression = expression.expression;
      }

      return false;
    }

    function updateOneTimeBinding(binding) {
      if (binding.call && binding.mode === oneTime) {
        binding.call(aureliaBinding.sourceContext);
      } else if (binding.updateOneTimeBindings) {
        binding.updateOneTimeBindings();
      }
    }

    function indexOf(array, item, matcher, startIndex) {
      if (!matcher) {
        return array.indexOf(item);
      }

      var length = array.length;

      for (var index = startIndex || 0; index < length; index++) {
        if (matcher(array[index], item)) {
          return index;
        }
      }

      return -1;
    }

    var ArrayRepeatStrategy = function () {
      function ArrayRepeatStrategy() {}

      ArrayRepeatStrategy.prototype.getCollectionObserver = function (observerLocator, items) {
        return observerLocator.getArrayObserver(items);
      };

      ArrayRepeatStrategy.prototype.instanceChanged = function (repeat, items) {
        var _this = this || _global;

        var $repeat = repeat;
        var itemsLength = items.length;

        if (!items || itemsLength === 0) {
          $repeat.removeAllViews(true, !$repeat.viewsRequireLifecycle);
          return;
        }

        var children = $repeat.views();
        var viewsLength = children.length;

        if (viewsLength === 0) {
          this._standardProcessInstanceChanged($repeat, items);

          return;
        }

        if ($repeat.viewsRequireLifecycle) {
          var childrenSnapshot = children.slice(0);
          var itemNameInBindingContext = $repeat.local;
          var matcher_1 = $repeat.matcher();
          var itemsPreviouslyInViews_1 = [];
          var viewsToRemove = [];

          for (var index = 0; index < viewsLength; index++) {
            var view = childrenSnapshot[index];
            var oldItem = view.bindingContext[itemNameInBindingContext];

            if (indexOf(items, oldItem, matcher_1) === -1) {
              viewsToRemove.push(view);
            } else {
              itemsPreviouslyInViews_1.push(oldItem);
            }
          }

          var updateViews = void 0;
          var removePromise = void 0;

          if (itemsPreviouslyInViews_1.length > 0) {
            removePromise = $repeat.removeViews(viewsToRemove, true, !$repeat.viewsRequireLifecycle);

            updateViews = function () {
              for (var index = 0; index < itemsLength; index++) {
                var item = items[index];
                var indexOfView = indexOf(itemsPreviouslyInViews_1, item, matcher_1, index);
                var view = void 0;

                if (indexOfView === -1) {
                  var overrideContext = createFullOverrideContext($repeat, items[index], index, itemsLength);
                  $repeat.insertView(index, overrideContext.bindingContext, overrideContext);
                  itemsPreviouslyInViews_1.splice(index, 0, undefined);
                } else if (indexOfView === index) {
                  view = children[indexOfView];
                  itemsPreviouslyInViews_1[indexOfView] = undefined;
                } else {
                  view = children[indexOfView];
                  $repeat.moveView(indexOfView, index);
                  itemsPreviouslyInViews_1.splice(indexOfView, 1);
                  itemsPreviouslyInViews_1.splice(index, 0, undefined);
                }

                if (view) {
                  updateOverrideContext(view.overrideContext, index, itemsLength);
                }
              }

              _this._inPlaceProcessItems($repeat, items);
            };
          } else {
            removePromise = $repeat.removeAllViews(true, !$repeat.viewsRequireLifecycle);

            updateViews = function () {
              return _this._standardProcessInstanceChanged($repeat, items);
            };
          }

          if (removePromise instanceof Promise) {
            removePromise.then(updateViews);
          } else {
            updateViews();
          }
        } else {
          this._inPlaceProcessItems($repeat, items);
        }
      };

      ArrayRepeatStrategy.prototype._standardProcessInstanceChanged = function (repeat, items) {
        for (var i = 0, ii = items.length; i < ii; i++) {
          var overrideContext = createFullOverrideContext(repeat, items[i], i, ii);
          repeat.addView(overrideContext.bindingContext, overrideContext);
        }
      };

      ArrayRepeatStrategy.prototype._inPlaceProcessItems = function (repeat, items) {
        var itemsLength = items.length;
        var viewsLength = repeat.viewCount();

        while (viewsLength > itemsLength) {
          viewsLength--;
          repeat.removeView(viewsLength, true, !repeat.viewsRequireLifecycle);
        }

        var local = repeat.local;

        for (var i = 0; i < viewsLength; i++) {
          var view = repeat.view(i);
          var last = i === itemsLength - 1;
          var middle = i !== 0 && !last;
          var bindingContext = view.bindingContext;
          var overrideContext = view.overrideContext;

          if (bindingContext[local] === items[i] && overrideContext.$middle === middle && overrideContext.$last === last) {
            continue;
          }

          bindingContext[local] = items[i];
          overrideContext.$middle = middle;
          overrideContext.$last = last;
          repeat.updateBindings(view);
        }

        for (var i = viewsLength; i < itemsLength; i++) {
          var overrideContext = createFullOverrideContext(repeat, items[i], i, itemsLength);
          repeat.addView(overrideContext.bindingContext, overrideContext);
        }
      };

      ArrayRepeatStrategy.prototype.instanceMutated = function (repeat, array, splices) {
        var _this = this || _global;

        if (repeat.__queuedSplices) {
          for (var i = 0, ii = splices.length; i < ii; ++i) {
            var _a = splices[i],
                index = _a.index,
                removed = _a.removed,
                addedCount = _a.addedCount;
            aureliaBinding.mergeSplice(repeat.__queuedSplices, index, removed, addedCount);
          }

          repeat.__array = array.slice(0);
          return;
        }

        var maybePromise = this._runSplices(repeat, array.slice(0), splices);

        if (maybePromise instanceof Promise) {
          var queuedSplices_1 = repeat.__queuedSplices = [];

          var runQueuedSplices_1 = function () {
            if (!queuedSplices_1.length) {
              repeat.__queuedSplices = undefined;
              repeat.__array = undefined;
              return;
            }

            var nextPromise = _this._runSplices(repeat, repeat.__array, queuedSplices_1) || Promise.resolve();
            queuedSplices_1 = repeat.__queuedSplices = [];
            nextPromise.then(runQueuedSplices_1);
          };

          maybePromise.then(runQueuedSplices_1);
        }
      };

      ArrayRepeatStrategy.prototype._runSplices = function (repeat, array, splices) {
        var _this = this || _global;

        var removeDelta = 0;
        var rmPromises = [];

        for (var i = 0, ii = splices.length; i < ii; ++i) {
          var splice = splices[i];
          var removed = splice.removed;

          for (var j = 0, jj = removed.length; j < jj; ++j) {
            var viewOrPromise = repeat.removeView(splice.index + removeDelta + rmPromises.length, true);

            if (viewOrPromise instanceof Promise) {
              rmPromises.push(viewOrPromise);
            }
          }

          removeDelta -= splice.addedCount;
        }

        if (rmPromises.length > 0) {
          return Promise.all(rmPromises).then(function () {
            var spliceIndexLow = _this._handleAddedSplices(repeat, array, splices);

            updateOverrideContexts(repeat.views(), spliceIndexLow);
          });
        }

        var spliceIndexLow = this._handleAddedSplices(repeat, array, splices);

        updateOverrideContexts(repeat.views(), spliceIndexLow);
        return undefined;
      };

      ArrayRepeatStrategy.prototype._handleAddedSplices = function (repeat, array, splices) {
        var spliceIndex;
        var spliceIndexLow;
        var arrayLength = array.length;

        for (var i = 0, ii = splices.length; i < ii; ++i) {
          var splice = splices[i];
          var addIndex = spliceIndex = splice.index;
          var end = splice.index + splice.addedCount;

          if (typeof spliceIndexLow === 'undefined' || spliceIndexLow === null || spliceIndexLow > splice.index) {
            spliceIndexLow = spliceIndex;
          }

          for (; addIndex < end; ++addIndex) {
            var overrideContext = createFullOverrideContext(repeat, array[addIndex], addIndex, arrayLength);
            repeat.insertView(addIndex, overrideContext.bindingContext, overrideContext);
          }
        }

        return spliceIndexLow;
      };

      return ArrayRepeatStrategy;
    }();

    var MapRepeatStrategy = function () {
      function MapRepeatStrategy() {}

      MapRepeatStrategy.prototype.getCollectionObserver = function (observerLocator, items) {
        return observerLocator.getMapObserver(items);
      };

      MapRepeatStrategy.prototype.instanceChanged = function (repeat, items) {
        var _this = this || _global;

        var removePromise = repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);

        if (removePromise instanceof Promise) {
          removePromise.then(function () {
            return _this._standardProcessItems(repeat, items);
          });
          return;
        }

        this._standardProcessItems(repeat, items);
      };

      MapRepeatStrategy.prototype._standardProcessItems = function (repeat, items) {
        var index = 0;
        var overrideContext;
        items.forEach(function (value, key) {
          overrideContext = createFullOverrideContext(repeat, value, index, items.size, key);
          repeat.addView(overrideContext.bindingContext, overrideContext);
          ++index;
        });
      };

      MapRepeatStrategy.prototype.instanceMutated = function (repeat, map, records) {
        var key;
        var i;
        var ii;
        var overrideContext;
        var removeIndex;
        var addIndex;
        var record;
        var rmPromises = [];
        var viewOrPromise;

        for (i = 0, ii = records.length; i < ii; ++i) {
          record = records[i];
          key = record.key;

          switch (record.type) {
            case 'update':
              removeIndex = this._getViewIndexByKey(repeat, key);
              viewOrPromise = repeat.removeView(removeIndex, true, !repeat.viewsRequireLifecycle);

              if (viewOrPromise instanceof Promise) {
                rmPromises.push(viewOrPromise);
              }

              overrideContext = createFullOverrideContext(repeat, map.get(key), removeIndex, map.size, key);
              repeat.insertView(removeIndex, overrideContext.bindingContext, overrideContext);
              break;

            case 'add':
              addIndex = repeat.viewCount() <= map.size - 1 ? repeat.viewCount() : map.size - 1;
              overrideContext = createFullOverrideContext(repeat, map.get(key), addIndex, map.size, key);
              repeat.insertView(map.size - 1, overrideContext.bindingContext, overrideContext);
              break;

            case 'delete':
              if (record.oldValue === undefined) {
                return;
              }

              removeIndex = this._getViewIndexByKey(repeat, key);
              viewOrPromise = repeat.removeView(removeIndex, true, !repeat.viewsRequireLifecycle);

              if (viewOrPromise instanceof Promise) {
                rmPromises.push(viewOrPromise);
              }

              break;

            case 'clear':
              repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
              break;

            default:
              continue;
          }
        }

        if (rmPromises.length > 0) {
          Promise.all(rmPromises).then(function () {
            updateOverrideContexts(repeat.views(), 0);
          });
        } else {
          updateOverrideContexts(repeat.views(), 0);
        }
      };

      MapRepeatStrategy.prototype._getViewIndexByKey = function (repeat, key) {
        var i;
        var ii;
        var child;

        for (i = 0, ii = repeat.viewCount(); i < ii; ++i) {
          child = repeat.view(i);

          if (child.bindingContext[repeat.key] === key) {
            return i;
          }
        }

        return undefined;
      };

      return MapRepeatStrategy;
    }();

    var NullRepeatStrategy = function () {
      function NullRepeatStrategy() {}

      NullRepeatStrategy.prototype.instanceChanged = function (repeat, items) {
        repeat.removeAllViews(true);
      };

      NullRepeatStrategy.prototype.getCollectionObserver = function (observerLocator, items) {};

      return NullRepeatStrategy;
    }();

    var NumberRepeatStrategy = function () {
      function NumberRepeatStrategy() {}

      NumberRepeatStrategy.prototype.getCollectionObserver = function () {
        return null;
      };

      NumberRepeatStrategy.prototype.instanceChanged = function (repeat, value) {
        var _this = this || _global;

        var removePromise = repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);

        if (removePromise instanceof Promise) {
          removePromise.then(function () {
            return _this._standardProcessItems(repeat, value);
          });
          return;
        }

        this._standardProcessItems(repeat, value);
      };

      NumberRepeatStrategy.prototype._standardProcessItems = function (repeat, value) {
        var childrenLength = repeat.viewCount();
        var i;
        var ii;
        var overrideContext;
        var viewsToRemove;
        value = Math.floor(value);
        viewsToRemove = childrenLength - value;

        if (viewsToRemove > 0) {
          if (viewsToRemove > childrenLength) {
            viewsToRemove = childrenLength;
          }

          for (i = 0, ii = viewsToRemove; i < ii; ++i) {
            repeat.removeView(childrenLength - (i + 1), true, !repeat.viewsRequireLifecycle);
          }

          return;
        }

        for (i = childrenLength, ii = value; i < ii; ++i) {
          overrideContext = createFullOverrideContext(repeat, i, i, ii);
          repeat.addView(overrideContext.bindingContext, overrideContext);
        }

        updateOverrideContexts(repeat.views(), 0);
      };

      return NumberRepeatStrategy;
    }();

    var SetRepeatStrategy = function () {
      function SetRepeatStrategy() {}

      SetRepeatStrategy.prototype.getCollectionObserver = function (observerLocator, items) {
        return observerLocator.getSetObserver(items);
      };

      SetRepeatStrategy.prototype.instanceChanged = function (repeat, items) {
        var _this = this || _global;

        var removePromise = repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);

        if (removePromise instanceof Promise) {
          removePromise.then(function () {
            return _this._standardProcessItems(repeat, items);
          });
          return;
        }

        this._standardProcessItems(repeat, items);
      };

      SetRepeatStrategy.prototype._standardProcessItems = function (repeat, items) {
        var index = 0;
        var overrideContext;
        items.forEach(function (value) {
          overrideContext = createFullOverrideContext(repeat, value, index, items.size);
          repeat.addView(overrideContext.bindingContext, overrideContext);
          ++index;
        });
      };

      SetRepeatStrategy.prototype.instanceMutated = function (repeat, set, records) {
        var value;
        var i;
        var ii;
        var overrideContext;
        var removeIndex;
        var record;
        var rmPromises = [];
        var viewOrPromise;

        for (i = 0, ii = records.length; i < ii; ++i) {
          record = records[i];
          value = record.value;

          switch (record.type) {
            case 'add':
              var size = Math.max(set.size - 1, 0);
              overrideContext = createFullOverrideContext(repeat, value, size, set.size);
              repeat.insertView(size, overrideContext.bindingContext, overrideContext);
              break;

            case 'delete':
              removeIndex = this._getViewIndexByValue(repeat, value);
              viewOrPromise = repeat.removeView(removeIndex, true, !repeat.viewsRequireLifecycle);

              if (viewOrPromise instanceof Promise) {
                rmPromises.push(viewOrPromise);
              }

              break;

            case 'clear':
              repeat.removeAllViews(true, !repeat.viewsRequireLifecycle);
              break;

            default:
              continue;
          }
        }

        if (rmPromises.length > 0) {
          Promise.all(rmPromises).then(function () {
            updateOverrideContexts(repeat.views(), 0);
          });
        } else {
          updateOverrideContexts(repeat.views(), 0);
        }
      };

      SetRepeatStrategy.prototype._getViewIndexByValue = function (repeat, value) {
        var i;
        var ii;
        var child;

        for (i = 0, ii = repeat.viewCount(); i < ii; ++i) {
          child = repeat.view(i);

          if (child.bindingContext[repeat.local] === value) {
            return i;
          }
        }

        return undefined;
      };

      return SetRepeatStrategy;
    }();

    var RepeatStrategyLocator = function () {
      function RepeatStrategyLocator() {
        (this || _global).matchers = [];
        (this || _global).strategies = [];
        this.addStrategy(function (items) {
          return items === null || items === undefined;
        }, new NullRepeatStrategy());
        this.addStrategy(function (items) {
          return items instanceof Array;
        }, new ArrayRepeatStrategy());
        this.addStrategy(function (items) {
          return items instanceof Map;
        }, new MapRepeatStrategy());
        this.addStrategy(function (items) {
          return items instanceof Set;
        }, new SetRepeatStrategy());
        this.addStrategy(function (items) {
          return typeof items === 'number';
        }, new NumberRepeatStrategy());
      }

      RepeatStrategyLocator.prototype.addStrategy = function (matcher, strategy) {
        (this || _global).matchers.push(matcher);

        (this || _global).strategies.push(strategy);
      };

      RepeatStrategyLocator.prototype.getStrategy = function (items) {
        var matchers = (this || _global).matchers;

        for (var i = 0, ii = matchers.length; i < ii; ++i) {
          if (matchers[i](items)) {
            return (this || _global).strategies[i];
          }
        }

        return null;
      };

      return RepeatStrategyLocator;
    }();

    var lifecycleOptionalBehaviors = ['focus', 'if', 'else', 'repeat', 'show', 'hide', 'with'];

    function behaviorRequiresLifecycle(instruction) {
      var t = instruction.type;
      var name = t.elementName !== null ? t.elementName : t.attributeName;
      return lifecycleOptionalBehaviors.indexOf(name) === -1 && (t.handlesAttached || t.handlesBind || t.handlesCreated || t.handlesDetached || t.handlesUnbind) || t.viewFactory && viewsRequireLifecycle(t.viewFactory) || instruction.viewFactory && viewsRequireLifecycle(instruction.viewFactory);
    }

    function targetRequiresLifecycle(instruction) {
      var behaviors = instruction.behaviorInstructions;

      if (behaviors) {
        var i = behaviors.length;

        while (i--) {
          if (behaviorRequiresLifecycle(behaviors[i])) {
            return true;
          }
        }
      }

      return instruction.viewFactory && viewsRequireLifecycle(instruction.viewFactory);
    }

    function viewsRequireLifecycle(viewFactory) {
      if ('_viewsRequireLifecycle' in viewFactory) {
        return viewFactory._viewsRequireLifecycle;
      }

      viewFactory._viewsRequireLifecycle = false;

      if (viewFactory.viewFactory) {
        viewFactory._viewsRequireLifecycle = viewsRequireLifecycle(viewFactory.viewFactory);
        return viewFactory._viewsRequireLifecycle;
      }

      if (viewFactory.template.querySelector('.au-animate')) {
        viewFactory._viewsRequireLifecycle = true;
        return true;
      }

      for (var id in viewFactory.instructions) {
        if (targetRequiresLifecycle(viewFactory.instructions[id])) {
          viewFactory._viewsRequireLifecycle = true;
          return true;
        }
      }

      viewFactory._viewsRequireLifecycle = false;
      return false;
    }

    var AbstractRepeater = function () {
      function AbstractRepeater(options) {
        Object.assign(this || _global, {
          local: 'items',
          viewsRequireLifecycle: true
        }, options);
      }

      AbstractRepeater.prototype.viewCount = function () {
        throw new Error('subclass must implement `viewCount`');
      };

      AbstractRepeater.prototype.views = function () {
        throw new Error('subclass must implement `views`');
      };

      AbstractRepeater.prototype.view = function (index) {
        throw new Error('subclass must implement `view`');
      };

      AbstractRepeater.prototype.matcher = function () {
        throw new Error('subclass must implement `matcher`');
      };

      AbstractRepeater.prototype.addView = function (bindingContext, overrideContext) {
        throw new Error('subclass must implement `addView`');
      };

      AbstractRepeater.prototype.insertView = function (index, bindingContext, overrideContext) {
        throw new Error('subclass must implement `insertView`');
      };

      AbstractRepeater.prototype.moveView = function (sourceIndex, targetIndex) {
        throw new Error('subclass must implement `moveView`');
      };

      AbstractRepeater.prototype.removeAllViews = function (returnToCache, skipAnimation) {
        throw new Error('subclass must implement `removeAllViews`');
      };

      AbstractRepeater.prototype.removeViews = function (viewsToRemove, returnToCache, skipAnimation) {
        throw new Error('subclass must implement `removeView`');
      };

      AbstractRepeater.prototype.removeView = function (index, returnToCache, skipAnimation) {
        throw new Error('subclass must implement `removeView`');
      };

      AbstractRepeater.prototype.updateBindings = function (view) {
        throw new Error('subclass must implement `updateBindings`');
      };

      return AbstractRepeater;
    }();

    var matcherExtractionMarker = '__marker_extracted__';

    var Repeat = function (_super) {
      __extends(Repeat, _super);

      function Repeat(viewFactory, instruction, viewSlot, viewResources, observerLocator, strategyLocator) {
        var _this = _super.call(this || _global, {
          local: 'item',
          viewsRequireLifecycle: viewsRequireLifecycle(viewFactory)
        }) || this || _global;

        _this.viewFactory = viewFactory;
        _this.instruction = instruction;
        _this.viewSlot = viewSlot;
        _this.lookupFunctions = viewResources.lookupFunctions;
        _this.observerLocator = observerLocator;
        _this.key = 'key';
        _this.value = 'value';
        _this.strategyLocator = strategyLocator;
        _this.ignoreMutation = false;
        _this.sourceExpression = getItemsSourceExpression(_this.instruction, 'repeat.for');
        _this.isOneTime = isOneTime(_this.sourceExpression);
        _this.viewsRequireLifecycle = viewsRequireLifecycle(viewFactory);
        return _this;
      }

      Repeat_1 = Repeat;

      Repeat.prototype.call = function (context, changes) {
        this[context]((this || _global).items, changes);
      };

      Repeat.prototype.bind = function (bindingContext, overrideContext) {
        (this || _global).scope = {
          bindingContext: bindingContext,
          overrideContext: overrideContext
        };
        var instruction = (this || _global).instruction;

        if (!(matcherExtractionMarker in instruction)) {
          instruction[matcherExtractionMarker] = this._captureAndRemoveMatcherBinding();
        }

        (this || _global).matcherBinding = instruction[matcherExtractionMarker];
        this.itemsChanged();
      };

      Repeat.prototype.unbind = function () {
        (this || _global).scope = null;
        (this || _global).items = null;
        (this || _global).matcherBinding = null;

        (this || _global).viewSlot.removeAll(true, true);

        this._unsubscribeCollection();
      };

      Repeat.prototype._unsubscribeCollection = function () {
        if ((this || _global).collectionObserver) {
          (this || _global).collectionObserver.unsubscribe((this || _global).callContext, this || _global);

          (this || _global).collectionObserver = null;
          (this || _global).callContext = null;
        }
      };

      Repeat.prototype.itemsChanged = function () {
        var _this = this || _global;

        this._unsubscribeCollection();

        if (!(this || _global).scope) {
          return;
        }

        var items = (this || _global).items;
        (this || _global).strategy = (this || _global).strategyLocator.getStrategy(items);

        if (!(this || _global).strategy) {
          throw new Error("Value for '" + (this || _global).sourceExpression + "' is non-repeatable");
        }

        if (!(this || _global).isOneTime && !this._observeInnerCollection()) {
          this._observeCollection();
        }

        (this || _global).ignoreMutation = true;

        (this || _global).strategy.instanceChanged(this || _global, items);

        (this || _global).observerLocator.taskQueue.queueMicroTask(function () {
          _this.ignoreMutation = false;
        });
      };

      Repeat.prototype._getInnerCollection = function () {
        var expression = unwrapExpression((this || _global).sourceExpression);

        if (!expression) {
          return null;
        }

        return expression.evaluate((this || _global).scope, null);
      };

      Repeat.prototype.handleCollectionMutated = function (collection, changes) {
        if (!(this || _global).collectionObserver) {
          return;
        }

        if ((this || _global).ignoreMutation) {
          return;
        }

        (this || _global).strategy.instanceMutated(this || _global, collection, changes);
      };

      Repeat.prototype.handleInnerCollectionMutated = function (collection, changes) {
        var _this = this || _global;

        if (!(this || _global).collectionObserver) {
          return;
        }

        if ((this || _global).ignoreMutation) {
          return;
        }

        (this || _global).ignoreMutation = true;

        var newItems = (this || _global).sourceExpression.evaluate((this || _global).scope, (this || _global).lookupFunctions);

        (this || _global).observerLocator.taskQueue.queueMicroTask(function () {
          return _this.ignoreMutation = false;
        });

        if (newItems === (this || _global).items) {
          this.itemsChanged();
        } else {
          (this || _global).items = newItems;
        }
      };

      Repeat.prototype._observeInnerCollection = function () {
        var items = this._getInnerCollection();

        var strategy = (this || _global).strategyLocator.getStrategy(items);

        if (!strategy) {
          return false;
        }

        (this || _global).collectionObserver = strategy.getCollectionObserver((this || _global).observerLocator, items);

        if (!(this || _global).collectionObserver) {
          return false;
        }

        (this || _global).callContext = 'handleInnerCollectionMutated';

        (this || _global).collectionObserver.subscribe((this || _global).callContext, this || _global);

        return true;
      };

      Repeat.prototype._observeCollection = function () {
        var items = (this || _global).items;
        (this || _global).collectionObserver = (this || _global).strategy.getCollectionObserver((this || _global).observerLocator, items);

        if ((this || _global).collectionObserver) {
          (this || _global).callContext = 'handleCollectionMutated';

          (this || _global).collectionObserver.subscribe((this || _global).callContext, this || _global);
        }
      };

      Repeat.prototype._captureAndRemoveMatcherBinding = function () {
        var viewFactory = (this || _global).viewFactory.viewFactory;

        if (viewFactory) {
          var template = viewFactory.template;
          var instructions = viewFactory.instructions;

          if (Repeat_1.useInnerMatcher) {
            return extractMatcherBindingExpression(instructions);
          }

          if (getChildrenCount(template) > 1) {
            return undefined;
          }

          var repeatedElement = getFirstElementChild(template);

          if (!repeatedElement.hasAttribute('au-target-id')) {
            return undefined;
          }

          var repeatedElementTargetId = repeatedElement.getAttribute('au-target-id');
          return extractMatcherBindingExpression(instructions, repeatedElementTargetId);
        }

        return undefined;
      };

      Repeat.prototype.viewCount = function () {
        return (this || _global).viewSlot.children.length;
      };

      Repeat.prototype.views = function () {
        return (this || _global).viewSlot.children;
      };

      Repeat.prototype.view = function (index) {
        return (this || _global).viewSlot.children[index];
      };

      Repeat.prototype.matcher = function () {
        var matcherBinding = (this || _global).matcherBinding;
        return matcherBinding ? matcherBinding.sourceExpression.evaluate((this || _global).scope, matcherBinding.lookupFunctions) : null;
      };

      Repeat.prototype.addView = function (bindingContext, overrideContext) {
        var view = (this || _global).viewFactory.create();

        view.bind(bindingContext, overrideContext);

        (this || _global).viewSlot.add(view);
      };

      Repeat.prototype.insertView = function (index, bindingContext, overrideContext) {
        var view = (this || _global).viewFactory.create();

        view.bind(bindingContext, overrideContext);

        (this || _global).viewSlot.insert(index, view);
      };

      Repeat.prototype.moveView = function (sourceIndex, targetIndex) {
        (this || _global).viewSlot.move(sourceIndex, targetIndex);
      };

      Repeat.prototype.removeAllViews = function (returnToCache, skipAnimation) {
        return (this || _global).viewSlot.removeAll(returnToCache, skipAnimation);
      };

      Repeat.prototype.removeViews = function (viewsToRemove, returnToCache, skipAnimation) {
        return (this || _global).viewSlot.removeMany(viewsToRemove, returnToCache, skipAnimation);
      };

      Repeat.prototype.removeView = function (index, returnToCache, skipAnimation) {
        return (this || _global).viewSlot.removeAt(index, returnToCache, skipAnimation);
      };

      Repeat.prototype.updateBindings = function (view) {
        var $view = view;
        var j = $view.bindings.length;

        while (j--) {
          updateOneTimeBinding($view.bindings[j]);
        }

        j = $view.controllers.length;

        while (j--) {
          var k = $view.controllers[j].boundProperties.length;

          while (k--) {
            var binding = $view.controllers[j].boundProperties[k].binding;
            updateOneTimeBinding(binding);
          }
        }
      };

      var Repeat_1;
      Repeat.useInnerMatcher = true;

      __decorate([aureliaTemplating.bindable], Repeat.prototype, "items", void 0);

      __decorate([aureliaTemplating.bindable], Repeat.prototype, "local", void 0);

      __decorate([aureliaTemplating.bindable], Repeat.prototype, "key", void 0);

      __decorate([aureliaTemplating.bindable], Repeat.prototype, "value", void 0);

      Repeat = Repeat_1 = __decorate([aureliaTemplating.customAttribute('repeat'), aureliaTemplating.templateController, aureliaDependencyInjection.inject(aureliaTemplating.BoundViewFactory, aureliaTemplating.TargetInstruction, aureliaTemplating.ViewSlot, aureliaTemplating.ViewResources, aureliaBinding.ObserverLocator, RepeatStrategyLocator)], Repeat);
      return Repeat;
    }(AbstractRepeater);

    var extractMatcherBindingExpression = function (instructions, targetedElementId) {
      var instructionIds = Object.keys(instructions);

      for (var i = 0; i < instructionIds.length; i++) {
        var instructionId = instructionIds[i];

        if (targetedElementId !== undefined && instructionId !== targetedElementId) {
          continue;
        }

        var expressions = instructions[instructionId].expressions;

        if (expressions) {
          for (var ii = 0; ii < expressions.length; ii++) {
            if (expressions[ii].targetProperty === 'matcher') {
              var matcherBindingExpression = expressions[ii];
              expressions.splice(ii, 1);
              return matcherBindingExpression;
            }
          }
        }
      }
    };

    var getChildrenCount = function (el) {
      var childNodes = el.childNodes;
      var count = 0;

      for (var i = 0, ii = childNodes.length; ii > i; ++i) {
        if (childNodes[i].nodeType === 1) {
          ++count;
        }
      }

      return count;
    };

    var getFirstElementChild = function (el) {
      var firstChild = el.firstChild;

      while (firstChild !== null) {
        if (firstChild.nodeType === 1) {
          return firstChild;
        }

        firstChild = firstChild.nextSibling;
      }

      return null;
    };

    var aureliaHideClassName = 'aurelia-hide';
    var aureliaHideClass = "." + aureliaHideClassName + " { display:none !important; }";

    function injectAureliaHideStyleAtHead() {
      aureliaPal.DOM.injectStyles(aureliaHideClass);
    }

    function injectAureliaHideStyleAtBoundary(domBoundary) {
      if (aureliaPal.FEATURE.shadowDOM && domBoundary && !domBoundary.hasAureliaHideStyle) {
        domBoundary.hasAureliaHideStyle = true;
        aureliaPal.DOM.injectStyles(aureliaHideClass, domBoundary);
      }
    }

    var Show = function () {
      function Show(element, animator, domBoundary) {
        (this || _global).element = element;
        (this || _global).animator = animator;
        (this || _global).domBoundary = domBoundary;
      }

      Show.inject = function () {
        return [aureliaPal.DOM.Element, aureliaTemplating.Animator, aureliaDependencyInjection.Optional.of(aureliaPal.DOM.boundary, true)];
      };

      Show.prototype.created = function () {
        injectAureliaHideStyleAtBoundary((this || _global).domBoundary);
      };

      Show.prototype.valueChanged = function (newValue) {
        var element = (this || _global).element;
        var animator = (this || _global).animator;

        if (newValue) {
          animator.removeClass(element, aureliaHideClassName);
        } else {
          animator.addClass(element, aureliaHideClassName);
        }
      };

      Show.prototype.bind = function (bindingContext) {
        this.valueChanged((this || _global).value);
      };

      Show = __decorate([aureliaTemplating.customAttribute('show')], Show);
      return Show;
    }();

    var Hide = function () {
      function Hide(element, animator, domBoundary) {
        (this || _global).element = element;
        (this || _global).animator = animator;
        (this || _global).domBoundary = domBoundary;
      }

      Hide.inject = function () {
        return [aureliaPal.DOM.Element, aureliaTemplating.Animator, aureliaDependencyInjection.Optional.of(aureliaPal.DOM.boundary, true)];
      };

      Hide.prototype.created = function () {
        injectAureliaHideStyleAtBoundary((this || _global).domBoundary);
      };

      Hide.prototype.valueChanged = function (newValue) {
        if (newValue) {
          (this || _global).animator.addClass((this || _global).element, aureliaHideClassName);
        } else {
          (this || _global).animator.removeClass((this || _global).element, aureliaHideClassName);
        }
      };

      Hide.prototype.bind = function (bindingContext) {
        this.valueChanged((this || _global).value);
      };

      Hide.prototype.value = function (value) {
        throw new Error('Method not implemented.');
      };

      Hide = __decorate([aureliaTemplating.customAttribute('hide')], Hide);
      return Hide;
    }();

    var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    var needsToWarn = true;

    var HTMLSanitizer = function () {
      function HTMLSanitizer() {}

      HTMLSanitizer.prototype.sanitize = function (input) {
        if (needsToWarn) {
          needsToWarn = false;
          aureliaLogging.getLogger('html-sanitizer').warn("CAUTION: The default HTMLSanitizer does NOT provide security against a wide variety of sophisticated XSS attacks,\nand should not be relied on for sanitizing input from unknown sources.\nPlease see https://aurelia.io/docs/binding/basics#element-content for instructions on how to use a secure solution like DOMPurify or sanitize-html.");
        }

        return input.replace(SCRIPT_REGEX, '');
      };

      return HTMLSanitizer;
    }();

    var SanitizeHTMLValueConverter = function () {
      function SanitizeHTMLValueConverter(sanitizer) {
        (this || _global).sanitizer = sanitizer;
      }

      SanitizeHTMLValueConverter.prototype.toView = function (untrustedMarkup) {
        if (untrustedMarkup === null || untrustedMarkup === undefined) {
          return null;
        }

        return (this || _global).sanitizer.sanitize(untrustedMarkup);
      };

      SanitizeHTMLValueConverter = __decorate([aureliaBinding.valueConverter('sanitizeHTML'), aureliaDependencyInjection.inject(HTMLSanitizer)], SanitizeHTMLValueConverter);
      return SanitizeHTMLValueConverter;
    }();

    var Replaceable = function () {
      function Replaceable(viewFactory, viewSlot) {
        (this || _global).viewFactory = viewFactory;
        (this || _global).viewSlot = viewSlot;
        (this || _global).view = null;
      }

      Replaceable.prototype.bind = function (bindingContext, overrideContext) {
        if ((this || _global).view === null) {
          (this || _global).view = (this || _global).viewFactory.create();

          (this || _global).viewSlot.add((this || _global).view);
        }

        (this || _global).view.bind(bindingContext, overrideContext);
      };

      Replaceable.prototype.unbind = function () {
        (this || _global).view.unbind();
      };

      Replaceable = __decorate([aureliaTemplating.customAttribute('replaceable'), aureliaTemplating.templateController, aureliaDependencyInjection.inject(aureliaTemplating.BoundViewFactory, aureliaTemplating.ViewSlot)], Replaceable);
      return Replaceable;
    }();

    var Focus = function () {
      function Focus(element, taskQueue) {
        (this || _global).element = element;
        (this || _global).taskQueue = taskQueue;
        (this || _global).isAttached = false;
        (this || _global).needsApply = false;
      }

      Focus.inject = function () {
        return [aureliaPal.DOM.Element, aureliaTaskQueue.TaskQueue];
      };

      Focus.prototype.valueChanged = function (newValue) {
        if ((this || _global).isAttached) {
          this._apply();
        } else {
          (this || _global).needsApply = true;
        }
      };

      Focus.prototype._apply = function () {
        var _this = this || _global;

        if ((this || _global).value) {
          (this || _global).taskQueue.queueMicroTask(function () {
            if (_this.value) {
              _this.element.focus();
            }
          });
        } else {
          (this || _global).element.blur();
        }
      };

      Focus.prototype.attached = function () {
        (this || _global).isAttached = true;

        if ((this || _global).needsApply) {
          (this || _global).needsApply = false;

          this._apply();
        }

        (this || _global).element.addEventListener('focus', this || _global);

        (this || _global).element.addEventListener('blur', this || _global);
      };

      Focus.prototype.detached = function () {
        (this || _global).isAttached = false;

        (this || _global).element.removeEventListener('focus', this || _global);

        (this || _global).element.removeEventListener('blur', this || _global);
      };

      Focus.prototype.handleEvent = function (e) {
        if (e.type === 'focus') {
          (this || _global).value = true;
        } else if (aureliaPal.DOM.activeElement !== (this || _global).element) {
          (this || _global).value = false;
        }
      };

      Focus = __decorate([aureliaTemplating.customAttribute('focus', aureliaBinding.bindingMode.twoWay)], Focus);
      return Focus;
    }();

    var cssUrlMatcher = /url\((?!['"]data)([^)]+)\)/gi;

    function fixupCSSUrls(address, css) {
      if (typeof css !== 'string') {
        throw new Error("Failed loading required CSS file: " + address);
      }

      return css.replace(cssUrlMatcher, function (match, p1) {
        var quote = p1.charAt(0);

        if (quote === '\'' || quote === '"') {
          p1 = p1.substr(1, p1.length - 2);
        }

        return 'url(\'' + aureliaPath.relativeToFile(p1, address) + '\')';
      });
    }

    var CSSResource = function () {
      function CSSResource(address) {
        (this || _global).address = address;
        (this || _global)._scoped = null;
        (this || _global)._global = false;
        (this || _global)._alreadyGloballyInjected = false;
      }

      CSSResource.prototype.initialize = function (container, Target) {
        (this || _global)._scoped = new Target(this || _global);
      };

      CSSResource.prototype.register = function (registry, name) {
        if (name === 'scoped') {
          registry.registerViewEngineHooks((this || _global)._scoped);
        } else {
          (this || _global)._global = true;
        }
      };

      CSSResource.prototype.load = function (container) {
        var _this = this || _global;

        return container.get(aureliaLoader.Loader).loadText((this || _global).address).catch(function (err) {
          return null;
        }).then(function (text) {
          text = fixupCSSUrls(_this.address, text);
          _this._scoped.css = text;

          if (_this._global) {
            _this._alreadyGloballyInjected = true;
            aureliaPal.DOM.injectStyles(text);
          }
        });
      };

      return CSSResource;
    }();

    var CSSViewEngineHooks = function () {
      function CSSViewEngineHooks(owner) {
        (this || _global).owner = owner;
        (this || _global).css = null;
      }

      CSSViewEngineHooks.prototype.beforeCompile = function (content, resources, instruction) {
        if (instruction.targetShadowDOM) {
          aureliaPal.DOM.injectStyles((this || _global).css, content, true);
        } else if (aureliaPal.FEATURE.scopedCSS) {
          var styleNode = aureliaPal.DOM.injectStyles((this || _global).css, content, true);
          styleNode.setAttribute('scoped', 'scoped');
        } else if ((this || _global)._global && !(this || _global).owner._alreadyGloballyInjected) {
          aureliaPal.DOM.injectStyles((this || _global).css);
          (this || _global).owner._alreadyGloballyInjected = true;
        }
      };

      return CSSViewEngineHooks;
    }();

    function _createCSSResource(address) {
      var ViewCSS = function (_super) {
        __extends(ViewCSS, _super);

        function ViewCSS() {
          return _super !== null && _super.apply(this || _global, arguments) || this || _global;
        }

        ViewCSS = __decorate([aureliaTemplating.resource(new CSSResource(address))], ViewCSS);
        return ViewCSS;
      }(CSSViewEngineHooks);

      return ViewCSS;
    }

    var AttrBindingBehavior = function () {
      function AttrBindingBehavior() {}

      AttrBindingBehavior.prototype.bind = function (binding, source) {
        binding.targetObserver = new aureliaBinding.DataAttributeObserver(binding.target, binding.targetProperty);
      };

      AttrBindingBehavior.prototype.unbind = function (binding, source) {};

      AttrBindingBehavior = __decorate([aureliaBinding.bindingBehavior('attr')], AttrBindingBehavior);
      return AttrBindingBehavior;
    }();

    var modeBindingBehavior = {
      bind: function (binding, source, lookupFunctions) {
        binding.originalMode = binding.mode;
        binding.mode = (this || _global).mode;
      },
      unbind: function (binding, source) {
        binding.mode = binding.originalMode;
        binding.originalMode = null;
      }
    };

    var OneTimeBindingBehavior = function () {
      function OneTimeBindingBehavior() {
        (this || _global).mode = aureliaBinding.bindingMode.oneTime;
      }

      OneTimeBindingBehavior = __decorate([aureliaMetadata.mixin(modeBindingBehavior), aureliaBinding.bindingBehavior('oneTime')], OneTimeBindingBehavior);
      return OneTimeBindingBehavior;
    }();

    var OneWayBindingBehavior = function () {
      function OneWayBindingBehavior() {
        (this || _global).mode = aureliaBinding.bindingMode.toView;
      }

      OneWayBindingBehavior = __decorate([aureliaMetadata.mixin(modeBindingBehavior), aureliaBinding.bindingBehavior('oneWay')], OneWayBindingBehavior);
      return OneWayBindingBehavior;
    }();

    var ToViewBindingBehavior = function () {
      function ToViewBindingBehavior() {
        (this || _global).mode = aureliaBinding.bindingMode.toView;
      }

      ToViewBindingBehavior = __decorate([aureliaMetadata.mixin(modeBindingBehavior), aureliaBinding.bindingBehavior('toView')], ToViewBindingBehavior);
      return ToViewBindingBehavior;
    }();

    var FromViewBindingBehavior = function () {
      function FromViewBindingBehavior() {
        (this || _global).mode = aureliaBinding.bindingMode.fromView;
      }

      FromViewBindingBehavior = __decorate([aureliaMetadata.mixin(modeBindingBehavior), aureliaBinding.bindingBehavior('fromView')], FromViewBindingBehavior);
      return FromViewBindingBehavior;
    }();

    var TwoWayBindingBehavior = function () {
      function TwoWayBindingBehavior() {
        (this || _global).mode = aureliaBinding.bindingMode.twoWay;
      }

      TwoWayBindingBehavior = __decorate([aureliaMetadata.mixin(modeBindingBehavior), aureliaBinding.bindingBehavior('twoWay')], TwoWayBindingBehavior);
      return TwoWayBindingBehavior;
    }();

    function throttle(newValue) {
      var _this = this || _global;

      var state = (this || _global).throttleState;
      var elapsed = +new Date() - state.last;

      if (elapsed >= state.delay) {
        clearTimeout(state.timeoutId);
        state.timeoutId = null;
        state.last = +new Date();
        this.throttledMethod(newValue);
        return;
      }

      state.newValue = newValue;

      if (state.timeoutId === null) {
        state.timeoutId = setTimeout(function () {
          state.timeoutId = null;
          state.last = +new Date();

          _this.throttledMethod(state.newValue);
        }, state.delay - elapsed);
      }
    }

    var ThrottleBindingBehavior = function () {
      function ThrottleBindingBehavior() {}

      ThrottleBindingBehavior.prototype.bind = function (binding, source, delay) {
        if (delay === void 0) {
          delay = 200;
        }

        var methodToThrottle = 'updateTarget';

        if (binding.callSource) {
          methodToThrottle = 'callSource';
        } else if (binding.updateSource && binding.mode === aureliaBinding.bindingMode.twoWay) {
          methodToThrottle = 'updateSource';
        }

        binding.throttledMethod = binding[methodToThrottle];
        binding.throttledMethod.originalName = methodToThrottle;
        binding[methodToThrottle] = throttle;
        binding.throttleState = {
          delay: delay,
          last: 0,
          timeoutId: null
        };
      };

      ThrottleBindingBehavior.prototype.unbind = function (binding, source) {
        var methodToRestore = binding.throttledMethod.originalName;
        binding[methodToRestore] = binding.throttledMethod;
        binding.throttledMethod = null;
        clearTimeout(binding.throttleState.timeoutId);
        binding.throttleState = null;
      };

      ThrottleBindingBehavior = __decorate([aureliaBinding.bindingBehavior('throttle')], ThrottleBindingBehavior);
      return ThrottleBindingBehavior;
    }();

    var unset = {};

    function debounceCallSource(event) {
      var _this = this || _global;

      var state = (this || _global).debounceState;
      clearTimeout(state.timeoutId);
      state.timeoutId = setTimeout(function () {
        return _this.debouncedMethod(event);
      }, state.delay);
    }

    function debounceCall(context, newValue, oldValue) {
      var _this = this || _global;

      var state = (this || _global).debounceState;
      clearTimeout(state.timeoutId);

      if (context !== state.callContextToDebounce) {
        state.oldValue = unset;
        this.debouncedMethod(context, newValue, oldValue);
        return;
      }

      if (state.oldValue === unset) {
        state.oldValue = oldValue;
      }

      state.timeoutId = setTimeout(function () {
        var _oldValue = state.oldValue;
        state.oldValue = unset;

        _this.debouncedMethod(context, newValue, _oldValue);
      }, state.delay);
    }

    var DebounceBindingBehavior = function () {
      function DebounceBindingBehavior() {}

      DebounceBindingBehavior.prototype.bind = function (binding, source, delay) {
        if (delay === void 0) {
          delay = 200;
        }

        var isCallSource = binding.callSource !== undefined;
        var methodToDebounce = isCallSource ? 'callSource' : 'call';
        var debouncer = isCallSource ? debounceCallSource : debounceCall;
        var mode = binding.mode;
        var callContextToDebounce = mode === aureliaBinding.bindingMode.twoWay || mode === aureliaBinding.bindingMode.fromView ? aureliaBinding.targetContext : aureliaBinding.sourceContext;
        binding.debouncedMethod = binding[methodToDebounce];
        binding.debouncedMethod.originalName = methodToDebounce;
        binding[methodToDebounce] = debouncer;
        binding.debounceState = {
          callContextToDebounce: callContextToDebounce,
          delay: delay,
          timeoutId: 0,
          oldValue: unset
        };
      };

      DebounceBindingBehavior.prototype.unbind = function (binding, source) {
        var methodToRestore = binding.debouncedMethod.originalName;
        binding[methodToRestore] = binding.debouncedMethod;
        binding.debouncedMethod = null;
        clearTimeout(binding.debounceState.timeoutId);
        binding.debounceState = null;
      };

      DebounceBindingBehavior = __decorate([aureliaBinding.bindingBehavior('debounce')], DebounceBindingBehavior);
      return DebounceBindingBehavior;
    }();

    function findOriginalEventTarget(event) {
      return event.path && event.path[0] || event.deepPath && event.deepPath[0] || event.target;
    }

    function handleSelfEvent(event) {
      var target = findOriginalEventTarget(event);

      if ((this || _global).target !== target) {
        return;
      }

      this.selfEventCallSource(event);
    }

    var SelfBindingBehavior = function () {
      function SelfBindingBehavior() {}

      SelfBindingBehavior.prototype.bind = function (binding, source) {
        if (!binding.callSource || !binding.targetEvent) {
          throw new Error('Self binding behavior only supports event.');
        }

        binding.selfEventCallSource = binding.callSource;
        binding.callSource = handleSelfEvent;
      };

      SelfBindingBehavior.prototype.unbind = function (binding, source) {
        binding.callSource = binding.selfEventCallSource;
        binding.selfEventCallSource = null;
      };

      SelfBindingBehavior = __decorate([aureliaBinding.bindingBehavior('self')], SelfBindingBehavior);
      return SelfBindingBehavior;
    }();

    var BindingSignaler = function () {
      function BindingSignaler() {
        (this || _global).signals = {};
      }

      BindingSignaler.prototype.signal = function (name) {
        var bindings = (this || _global).signals[name];

        if (!bindings) {
          return;
        }

        var i = bindings.length;

        while (i--) {
          bindings[i].call(aureliaBinding.sourceContext);
        }
      };

      return BindingSignaler;
    }();

    var SignalBindingBehavior = function () {
      function SignalBindingBehavior(bindingSignaler) {
        (this || _global).signals = bindingSignaler.signals;
      }

      SignalBindingBehavior.inject = function () {
        return [BindingSignaler];
      };

      SignalBindingBehavior.prototype.bind = function (binding, source) {
        var names = [];

        for (var _i = 2; _i < arguments.length; _i++) {
          names[_i - 2] = arguments[_i];
        }

        if (!binding.updateTarget) {
          throw new Error('Only property bindings and string interpolation bindings can be signaled.  Trigger, delegate and call bindings cannot be signaled.');
        }

        var signals = (this || _global).signals;

        if (names.length === 1) {
          var name_1 = names[0];
          var bindings = signals[name_1] || (signals[name_1] = []);
          bindings.push(binding);
          binding.signalName = name_1;
        } else if (names.length > 1) {
          var i = names.length;

          while (i--) {
            var name_2 = names[i];
            var bindings = signals[name_2] || (signals[name_2] = []);
            bindings.push(binding);
          }

          binding.signalName = names;
        } else {
          throw new Error('Signal name is required.');
        }
      };

      SignalBindingBehavior.prototype.unbind = function (binding, source) {
        var signals = (this || _global).signals;
        var name = binding.signalName;
        binding.signalName = null;

        if (Array.isArray(name)) {
          var names = name;
          var i = names.length;

          while (i--) {
            var n = names[i];
            var bindings = signals[n];
            bindings.splice(bindings.indexOf(binding), 1);
          }
        } else {
          var bindings = signals[name];
          bindings.splice(bindings.indexOf(binding), 1);
        }
      };

      SignalBindingBehavior = __decorate([aureliaBinding.bindingBehavior('signal')], SignalBindingBehavior);
      return SignalBindingBehavior;
    }();

    var eventNamesRequired = 'The updateTrigger binding behavior requires at least one event name argument: eg <input value.bind="firstName & updateTrigger:\'blur\'">';
    var notApplicableMessage = 'The updateTrigger binding behavior can only be applied to two-way/ from-view bindings on input/select elements.';

    var UpdateTriggerBindingBehavior = function () {
      function UpdateTriggerBindingBehavior() {}

      UpdateTriggerBindingBehavior.prototype.bind = function (binding, source) {
        var events = [];

        for (var _i = 2; _i < arguments.length; _i++) {
          events[_i - 2] = arguments[_i];
        }

        if (events.length === 0) {
          throw new Error(eventNamesRequired);
        }

        if (binding.mode !== aureliaBinding.bindingMode.twoWay && binding.mode !== aureliaBinding.bindingMode.fromView) {
          throw new Error(notApplicableMessage);
        }

        var targetObserver = binding.observerLocator.getObserver(binding.target, binding.targetProperty);

        if (!targetObserver.handler) {
          throw new Error(notApplicableMessage);
        }

        binding.targetObserver = targetObserver;
        targetObserver.originalHandler = binding.targetObserver.handler;
        var handler = new aureliaBinding.EventSubscriber(events);
        targetObserver.handler = handler;
      };

      UpdateTriggerBindingBehavior.prototype.unbind = function (binding, source) {
        var targetObserver = binding.targetObserver;
        targetObserver.handler.dispose();
        targetObserver.handler = targetObserver.originalHandler;
        targetObserver.originalHandler = null;
      };

      UpdateTriggerBindingBehavior = __decorate([aureliaBinding.bindingBehavior('updateTrigger')], UpdateTriggerBindingBehavior);
      return UpdateTriggerBindingBehavior;
    }();

    function _createDynamicElement(_a) {
      var name = _a.name,
          viewUrl = _a.viewUrl,
          bindableNames = _a.bindableNames,
          useShadowDOMmode = _a.useShadowDOMmode;

      var DynamicElement = function () {
        function DynamicElement() {}

        DynamicElement.prototype.bind = function (bindingContext) {
          (this || _global).$parent = bindingContext;
        };

        DynamicElement = __decorate([aureliaTemplating.customElement(name), aureliaTemplating.useView(viewUrl)], DynamicElement);
        return DynamicElement;
      }();

      for (var i = 0, ii = bindableNames.length; i < ii; ++i) {
        aureliaTemplating.bindable(bindableNames[i])(DynamicElement);
      }

      switch (useShadowDOMmode) {
        case 'open':
          aureliaTemplating.useShadowDOM({
            mode: 'open'
          })(DynamicElement);
          break;

        case 'closed':
          aureliaTemplating.useShadowDOM({
            mode: 'closed'
          })(DynamicElement);
          break;

        case '':
          aureliaTemplating.useShadowDOM(DynamicElement);
          break;

        case null:
          break;

        default:
          aureliaLogging.getLogger('aurelia-html-only-element').warn("Expected 'use-shadow-dom' value to be \"close\", \"open\" or \"\", received " + useShadowDOMmode);
          break;
      }

      return DynamicElement;
    }

    function getElementName(address) {
      return /([^\/^\?]+)\.html/i.exec(address)[1].toLowerCase();
    }

    function configure(config) {
      var viewEngine = config.container.get(aureliaTemplating.ViewEngine);
      var loader = config.aurelia.loader;
      viewEngine.addResourcePlugin('.html', {
        'fetch': function (viewUrl) {
          return loader.loadTemplate(viewUrl).then(function (registryEntry) {
            var _a;

            var bindableNames = registryEntry.template.getAttribute('bindable');
            var useShadowDOMmode = registryEntry.template.getAttribute('use-shadow-dom');
            var name = getElementName(viewUrl);

            if (bindableNames) {
              bindableNames = bindableNames.split(',').map(function (x) {
                return x.trim();
              });
              registryEntry.template.removeAttribute('bindable');
            } else {
              bindableNames = [];
            }

            return _a = {}, _a[name] = _createDynamicElement({
              name: name,
              viewUrl: viewUrl,
              bindableNames: bindableNames,
              useShadowDOMmode: useShadowDOMmode
            }), _a;
          });
        }
      });
    }

    function configure$1(config) {
      injectAureliaHideStyleAtHead();
      config.globalResources(Compose, If, Else, With, Repeat, Show, Hide, Replaceable, Focus, SanitizeHTMLValueConverter, OneTimeBindingBehavior, OneWayBindingBehavior, ToViewBindingBehavior, FromViewBindingBehavior, TwoWayBindingBehavior, ThrottleBindingBehavior, DebounceBindingBehavior, SelfBindingBehavior, SignalBindingBehavior, UpdateTriggerBindingBehavior, AttrBindingBehavior);
      configure(config);
      var viewEngine = config.container.get(aureliaTemplating.ViewEngine);
      var styleResourcePlugin = {
        fetch: function (address) {
          var _a;

          return _a = {}, _a[address] = _createCSSResource(address), _a;
        }
      };
      ['.css', '.less', '.sass', '.scss', '.styl'].forEach(function (ext) {
        return viewEngine.addResourcePlugin(ext, styleResourcePlugin);
      });
    }

    exports.AbstractRepeater = AbstractRepeater;
    exports.ArrayRepeatStrategy = ArrayRepeatStrategy;
    exports.AttrBindingBehavior = AttrBindingBehavior;
    exports.BindingSignaler = BindingSignaler;
    exports.Compose = Compose;
    exports.DebounceBindingBehavior = DebounceBindingBehavior;
    exports.Else = Else;
    exports.Focus = Focus;
    exports.FromViewBindingBehavior = FromViewBindingBehavior;
    exports.HTMLSanitizer = HTMLSanitizer;
    exports.Hide = Hide;
    exports.If = If;
    exports.MapRepeatStrategy = MapRepeatStrategy;
    exports.NullRepeatStrategy = NullRepeatStrategy;
    exports.NumberRepeatStrategy = NumberRepeatStrategy;
    exports.OneTimeBindingBehavior = OneTimeBindingBehavior;
    exports.OneWayBindingBehavior = OneWayBindingBehavior;
    exports.Repeat = Repeat;
    exports.RepeatStrategyLocator = RepeatStrategyLocator;
    exports.Replaceable = Replaceable;
    exports.SanitizeHTMLValueConverter = SanitizeHTMLValueConverter;
    exports.SelfBindingBehavior = SelfBindingBehavior;
    exports.SetRepeatStrategy = SetRepeatStrategy;
    exports.Show = Show;
    exports.SignalBindingBehavior = SignalBindingBehavior;
    exports.ThrottleBindingBehavior = ThrottleBindingBehavior;
    exports.ToViewBindingBehavior = ToViewBindingBehavior;
    exports.TwoWayBindingBehavior = TwoWayBindingBehavior;
    exports.UpdateTriggerBindingBehavior = UpdateTriggerBindingBehavior;
    exports.With = With;
    exports.configure = configure$1;
    exports.createFullOverrideContext = createFullOverrideContext;
    exports.getItemsSourceExpression = getItemsSourceExpression;
    exports.isOneTime = isOneTime;
    exports.unwrapExpression = unwrapExpression;
    exports.updateOneTimeBinding = updateOneTimeBinding;
    exports.updateOverrideContext = updateOverrideContext;
    exports.viewsRequireLifecycle = viewsRequireLifecycle;
    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  });
  return exports;
}