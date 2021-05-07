var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(['exports', 'aurelia-logging', 'aurelia-metadata', 'aurelia-pal', 'aurelia-loader', 'aurelia-path', 'aurelia-binding', 'aurelia-dependency-injection', 'aurelia-task-queue'], function (exports, _aureliaLogging, _aureliaMetadata, _aureliaPal, _aureliaLoader, _aureliaPath, _aureliaBinding, _aureliaDependencyInjection, _aureliaTaskQueue) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TemplatingEngine = exports.ElementConfigResource = exports.CompositionEngine = exports.SwapStrategies = exports.HtmlBehaviorResource = exports.BindableProperty = exports.BehaviorPropertyObserver = exports.Controller = exports.ViewEngine = exports.ModuleAnalyzer = exports.ResourceDescription = exports.ResourceModule = exports.ViewCompiler = exports.ViewFactory = exports.BoundViewFactory = exports.ViewSlot = exports.View = exports.ViewResources = exports.ShadowDOM = exports.ShadowSlot = exports.PassThroughSlot = exports.SlotCustomAttribute = exports.BindingLanguage = exports.ViewLocator = exports.StaticViewStrategy = exports.InlineViewStrategy = exports.TemplateRegistryViewStrategy = exports.NoViewStrategy = exports.ConventionalViewStrategy = exports.RelativeViewStrategy = exports.viewStrategy = exports.TargetInstruction = exports.BehaviorInstruction = exports.ViewCompileInstruction = exports.ResourceLoadContext = exports.ElementEvents = exports.ViewEngineHooksResource = exports.CompositionTransaction = exports.CompositionTransactionOwnershipToken = exports.CompositionTransactionNotifier = exports.Animator = exports.animationEvent = undefined;
    exports._hyphenate = _hyphenate;
    exports._isAllWhitespace = _isAllWhitespace;
    exports.viewEngineHooks = viewEngineHooks;
    exports.validateBehaviorName = validateBehaviorName;
    exports.children = children;
    exports.child = child;
    exports.resource = resource;
    exports.behavior = behavior;
    exports.customElement = customElement;
    exports.customAttribute = customAttribute;
    exports.templateController = templateController;
    exports.bindable = bindable;
    exports.dynamicOptions = dynamicOptions;
    exports.useShadowDOM = useShadowDOM;
    exports.processAttributes = processAttributes;
    exports.processContent = processContent;
    exports.containerless = containerless;
    exports.useViewStrategy = useViewStrategy;
    exports.useView = useView;
    exports.inlineView = inlineView;
    exports.noView = noView;
    exports.view = view;
    exports.elementConfig = elementConfig;
    exports.viewResources = viewResources;

    var LogManager = _interopRequireWildcard(_aureliaLogging);

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

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var _class, _temp, _class2, _temp2, _dec, _class3, _dec2, _class4, _dec3, _class5, _dec4, _class6, _dec5, _class7, _dec6, _class8, _class9, _temp3, _class10, _temp4, _class12, _class14, _temp5, _dec7, _class15, _dec8, _class16, _dec9, _class17;

    var animationEvent = exports.animationEvent = {
      enterBegin: 'animation:enter:begin',
      enterActive: 'animation:enter:active',
      enterDone: 'animation:enter:done',
      enterTimeout: 'animation:enter:timeout',
      leaveBegin: 'animation:leave:begin',
      leaveActive: 'animation:leave:active',
      leaveDone: 'animation:leave:done',
      leaveTimeout: 'animation:leave:timeout',
      staggerNext: 'animation:stagger:next',
      removeClassBegin: 'animation:remove-class:begin',
      removeClassActive: 'animation:remove-class:active',
      removeClassDone: 'animation:remove-class:done',
      removeClassTimeout: 'animation:remove-class:timeout',
      addClassBegin: 'animation:add-class:begin',
      addClassActive: 'animation:add-class:active',
      addClassDone: 'animation:add-class:done',
      addClassTimeout: 'animation:add-class:timeout',
      animateBegin: 'animation:animate:begin',
      animateActive: 'animation:animate:active',
      animateDone: 'animation:animate:done',
      animateTimeout: 'animation:animate:timeout',
      sequenceBegin: 'animation:sequence:begin',
      sequenceDone: 'animation:sequence:done'
    };

    var Animator = exports.Animator = function () {
      function Animator() {}

      Animator.prototype.enter = function enter(element) {
        return Promise.resolve(false);
      };

      Animator.prototype.leave = function leave(element) {
        return Promise.resolve(false);
      };

      Animator.prototype.removeClass = function removeClass(element, className) {
        element.classList.remove(className);
        return Promise.resolve(false);
      };

      Animator.prototype.addClass = function addClass(element, className) {
        element.classList.add(className);
        return Promise.resolve(false);
      };

      Animator.prototype.animate = function animate(element, className) {
        return Promise.resolve(false);
      };

      Animator.prototype.runSequence = function runSequence(animations) {};

      Animator.prototype.registerEffect = function registerEffect(effectName, properties) {};

      Animator.prototype.unregisterEffect = function unregisterEffect(effectName) {};

      return Animator;
    }();

    var CompositionTransactionNotifier = exports.CompositionTransactionNotifier = function () {
      function CompositionTransactionNotifier(owner) {
        (this || _global).owner = owner;
        (this || _global).owner._compositionCount++;
      }

      CompositionTransactionNotifier.prototype.done = function done() {
        (this || _global).owner._compositionCount--;

        (this || _global).owner._tryCompleteTransaction();
      };

      return CompositionTransactionNotifier;
    }();

    var CompositionTransactionOwnershipToken = exports.CompositionTransactionOwnershipToken = function () {
      function CompositionTransactionOwnershipToken(owner) {
        (this || _global).owner = owner;
        (this || _global).owner._ownershipToken = this || _global;
        (this || _global).thenable = this._createThenable();
      }

      CompositionTransactionOwnershipToken.prototype.waitForCompositionComplete = function waitForCompositionComplete() {
        (this || _global).owner._tryCompleteTransaction();

        return (this || _global).thenable;
      };

      CompositionTransactionOwnershipToken.prototype.resolve = function resolve() {
        this._resolveCallback();
      };

      CompositionTransactionOwnershipToken.prototype._createThenable = function _createThenable() {
        var _this = this || _global;

        return new Promise(function (resolve, reject) {
          _this._resolveCallback = resolve;
        });
      };

      return CompositionTransactionOwnershipToken;
    }();

    var CompositionTransaction = exports.CompositionTransaction = function () {
      function CompositionTransaction() {
        (this || _global)._ownershipToken = null;
        (this || _global)._compositionCount = 0;
      }

      CompositionTransaction.prototype.tryCapture = function tryCapture() {
        return (this || _global)._ownershipToken === null ? new CompositionTransactionOwnershipToken(this || _global) : null;
      };

      CompositionTransaction.prototype.enlist = function enlist() {
        return new CompositionTransactionNotifier(this || _global);
      };

      CompositionTransaction.prototype._tryCompleteTransaction = function _tryCompleteTransaction() {
        if ((this || _global)._compositionCount <= 0) {
          (this || _global)._compositionCount = 0;

          if ((this || _global)._ownershipToken !== null) {
            var token = (this || _global)._ownershipToken;
            (this || _global)._ownershipToken = null;
            token.resolve();
          }
        }
      };

      return CompositionTransaction;
    }();

    var capitalMatcher = /([A-Z])/g;

    function addHyphenAndLower(char) {
      return '-' + char.toLowerCase();
    }

    function _hyphenate(name) {
      return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
    }

    function _isAllWhitespace(node) {
      return !(node.auInterpolationTarget || /[^\t\n\r ]/.test(node.textContent));
    }

    var ViewEngineHooksResource = exports.ViewEngineHooksResource = function () {
      function ViewEngineHooksResource() {}

      ViewEngineHooksResource.prototype.initialize = function initialize(container, target) {
        (this || _global).instance = container.get(target);
      };

      ViewEngineHooksResource.prototype.register = function register(registry, name) {
        registry.registerViewEngineHooks((this || _global).instance);
      };

      ViewEngineHooksResource.prototype.load = function load(container, target) {};

      ViewEngineHooksResource.convention = function convention(name) {
        if (name.endsWith('ViewEngineHooks')) {
          return new ViewEngineHooksResource();
        }
      };

      return ViewEngineHooksResource;
    }();

    function viewEngineHooks(target) {
      var deco = function deco(t) {
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ViewEngineHooksResource(), t);
      };

      return target ? deco(target) : deco;
    }

    var ElementEvents = exports.ElementEvents = (_temp = _class = function () {
      function ElementEvents(element) {
        (this || _global).element = element;
        (this || _global).subscriptions = {};
      }

      ElementEvents.prototype._enqueueHandler = function _enqueueHandler(handler) {
        (this || _global).subscriptions[handler.eventName] = (this || _global).subscriptions[handler.eventName] || [];

        (this || _global).subscriptions[handler.eventName].push(handler);
      };

      ElementEvents.prototype._dequeueHandler = function _dequeueHandler(handler) {
        var index = void 0;
        var subscriptions = (this || _global).subscriptions[handler.eventName];

        if (subscriptions) {
          index = subscriptions.indexOf(handler);

          if (index > -1) {
            subscriptions.splice(index, 1);
          }
        }

        return handler;
      };

      ElementEvents.prototype.publish = function publish(eventName) {
        var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        var event = _aureliaPal.DOM.createCustomEvent(eventName, {
          cancelable: cancelable,
          bubbles: bubbles,
          detail: detail
        });

        (this || _global).element.dispatchEvent(event);
      };

      ElementEvents.prototype.subscribe = function subscribe(eventName, handler, captureOrOptions) {
        if (typeof handler === 'function') {
          if (captureOrOptions === undefined) {
            captureOrOptions = ElementEvents.defaultListenerOptions;
          }

          var eventHandler = new EventHandlerImpl(this || _global, eventName, handler, captureOrOptions, false);
          return eventHandler;
        }

        return undefined;
      };

      ElementEvents.prototype.subscribeOnce = function subscribeOnce(eventName, handler, captureOrOptions) {
        if (typeof handler === 'function') {
          if (captureOrOptions === undefined) {
            captureOrOptions = ElementEvents.defaultListenerOptions;
          }

          var eventHandler = new EventHandlerImpl(this || _global, eventName, handler, captureOrOptions, true);
          return eventHandler;
        }

        return undefined;
      };

      ElementEvents.prototype.dispose = function dispose(eventName) {
        if (eventName && typeof eventName === 'string') {
          var subscriptions = (this || _global).subscriptions[eventName];

          if (subscriptions) {
            while (subscriptions.length) {
              var subscription = subscriptions.pop();

              if (subscription) {
                subscription.dispose();
              }
            }
          }
        } else {
          this.disposeAll();
        }
      };

      ElementEvents.prototype.disposeAll = function disposeAll() {
        for (var _key in (this || _global).subscriptions) {
          this.dispose(_key);
        }
      };

      return ElementEvents;
    }(), _class.defaultListenerOptions = true, _temp);

    var EventHandlerImpl = function () {
      function EventHandlerImpl(owner, eventName, handler, captureOrOptions, once) {
        (this || _global).owner = owner;
        (this || _global).eventName = eventName;
        (this || _global).handler = handler;
        (this || _global).capture = typeof captureOrOptions === 'boolean' ? captureOrOptions : captureOrOptions.capture;
        (this || _global).bubbles = !(this || _global).capture;
        (this || _global).captureOrOptions = captureOrOptions;
        (this || _global).once = once;
        owner.element.addEventListener(eventName, this || _global, captureOrOptions);

        owner._enqueueHandler(this || _global);
      }

      EventHandlerImpl.prototype.handleEvent = function handleEvent(e) {
        var fn = (this || _global).handler;
        fn(e);

        if ((this || _global).once) {
          this.dispose();
        }
      };

      EventHandlerImpl.prototype.dispose = function dispose() {
        (this || _global).owner.element.removeEventListener((this || _global).eventName, this || _global, (this || _global).captureOrOptions);

        (this || _global).owner._dequeueHandler(this || _global);

        (this || _global).owner = (this || _global).handler = null;
      };

      return EventHandlerImpl;
    }();

    var ResourceLoadContext = exports.ResourceLoadContext = function () {
      function ResourceLoadContext() {
        (this || _global).dependencies = {};
      }

      ResourceLoadContext.prototype.addDependency = function addDependency(url) {
        (this || _global).dependencies[url] = true;
      };

      ResourceLoadContext.prototype.hasDependency = function hasDependency(url) {
        return url in (this || _global).dependencies;
      };

      return ResourceLoadContext;
    }();

    var ViewCompileInstruction = exports.ViewCompileInstruction = function ViewCompileInstruction() {
      var targetShadowDOM = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var compileSurrogate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      (this || _global).targetShadowDOM = targetShadowDOM;
      (this || _global).compileSurrogate = compileSurrogate;
      (this || _global).associatedModuleId = null;
    };

    ViewCompileInstruction.normal = new ViewCompileInstruction();

    var BehaviorInstruction = exports.BehaviorInstruction = function () {
      function BehaviorInstruction() {}

      BehaviorInstruction.enhance = function enhance() {
        var instruction = new BehaviorInstruction();
        instruction.enhance = true;
        return instruction;
      };

      BehaviorInstruction.unitTest = function unitTest(type, attributes) {
        var instruction = new BehaviorInstruction();
        instruction.type = type;
        instruction.attributes = attributes || {};
        return instruction;
      };

      BehaviorInstruction.element = function element(node, type) {
        var instruction = new BehaviorInstruction();
        instruction.type = type;
        instruction.attributes = {};
        instruction.anchorIsContainer = !(node.hasAttribute('containerless') || type.containerless);
        instruction.initiatedByBehavior = true;
        return instruction;
      };

      BehaviorInstruction.attribute = function attribute(attrName, type) {
        var instruction = new BehaviorInstruction();
        instruction.attrName = attrName;
        instruction.type = type || null;
        instruction.attributes = {};
        return instruction;
      };

      BehaviorInstruction.dynamic = function dynamic(host, viewModel, viewFactory) {
        var instruction = new BehaviorInstruction();
        instruction.host = host;
        instruction.viewModel = viewModel;
        instruction.viewFactory = viewFactory;
        instruction.inheritBindingContext = true;
        return instruction;
      };

      return BehaviorInstruction;
    }();

    var biProto = BehaviorInstruction.prototype;
    biProto.initiatedByBehavior = false;
    biProto.enhance = false;
    biProto.partReplacements = null;
    biProto.viewFactory = null;
    biProto.originalAttrName = null;
    biProto.skipContentProcessing = false;
    biProto.contentFactory = null;
    biProto.viewModel = null;
    biProto.anchorIsContainer = false;
    biProto.host = null;
    biProto.attributes = null;
    biProto.type = null;
    biProto.attrName = null;
    biProto.inheritBindingContext = false;
    BehaviorInstruction.normal = new BehaviorInstruction();
    var TargetInstruction = exports.TargetInstruction = (_temp2 = _class2 = function () {
      function TargetInstruction() {}

      TargetInstruction.shadowSlot = function shadowSlot(parentInjectorId) {
        var instruction = new TargetInstruction();
        instruction.parentInjectorId = parentInjectorId;
        instruction.shadowSlot = true;
        return instruction;
      };

      TargetInstruction.contentExpression = function contentExpression(expression) {
        var instruction = new TargetInstruction();
        instruction.contentExpression = expression;
        return instruction;
      };

      TargetInstruction.letElement = function letElement(expressions) {
        var instruction = new TargetInstruction();
        instruction.expressions = expressions;
        instruction.letElement = true;
        return instruction;
      };

      TargetInstruction.lifting = function lifting(parentInjectorId, liftingInstruction) {
        var instruction = new TargetInstruction();
        instruction.parentInjectorId = parentInjectorId;
        instruction.expressions = TargetInstruction.noExpressions;
        instruction.behaviorInstructions = [liftingInstruction];
        instruction.viewFactory = liftingInstruction.viewFactory;
        instruction.providers = [liftingInstruction.type.target];
        instruction.lifting = true;
        return instruction;
      };

      TargetInstruction.normal = function normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction) {
        var instruction = new TargetInstruction();
        instruction.injectorId = injectorId;
        instruction.parentInjectorId = parentInjectorId;
        instruction.providers = providers;
        instruction.behaviorInstructions = behaviorInstructions;
        instruction.expressions = expressions;
        instruction.anchorIsContainer = elementInstruction ? elementInstruction.anchorIsContainer : true;
        instruction.elementInstruction = elementInstruction;
        return instruction;
      };

      TargetInstruction.surrogate = function surrogate(providers, behaviorInstructions, expressions, values) {
        var instruction = new TargetInstruction();
        instruction.expressions = expressions;
        instruction.behaviorInstructions = behaviorInstructions;
        instruction.providers = providers;
        instruction.values = values;
        return instruction;
      };

      return TargetInstruction;
    }(), _class2.noExpressions = Object.freeze([]), _temp2);
    var tiProto = TargetInstruction.prototype;
    tiProto.injectorId = null;
    tiProto.parentInjectorId = null;
    tiProto.shadowSlot = false;
    tiProto.slotName = null;
    tiProto.slotFallbackFactory = null;
    tiProto.contentExpression = null;
    tiProto.letElement = false;
    tiProto.expressions = null;
    tiProto.expressions = null;
    tiProto.providers = null;
    tiProto.viewFactory = null;
    tiProto.anchorIsContainer = false;
    tiProto.elementInstruction = null;
    tiProto.lifting = false;
    tiProto.values = null;

    var viewStrategy = exports.viewStrategy = _aureliaMetadata.protocol.create('aurelia:view-strategy', {
      validate: function validate(target) {
        if (!(typeof target.loadViewFactory === 'function')) {
          return 'View strategies must implement: loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext): Promise<ViewFactory>';
        }

        return true;
      },
      compose: function compose(target) {
        if (!(typeof target.makeRelativeTo === 'function')) {
          target.makeRelativeTo = _aureliaPal.PLATFORM.noop;
        }
      }
    });

    var RelativeViewStrategy = exports.RelativeViewStrategy = (_dec = viewStrategy(), _dec(_class3 = function () {
      function RelativeViewStrategy(path) {
        (this || _global).path = path;
        (this || _global).absolutePath = null;
      }

      RelativeViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
        if ((this || _global).absolutePath === null && (this || _global).moduleId) {
          (this || _global).absolutePath = (0, _aureliaPath.relativeToFile)((this || _global).path, (this || _global).moduleId);
        }

        compileInstruction.associatedModuleId = (this || _global).moduleId;
        return viewEngine.loadViewFactory((this || _global).absolutePath || (this || _global).path, compileInstruction, loadContext, target);
      };

      RelativeViewStrategy.prototype.makeRelativeTo = function makeRelativeTo(file) {
        if ((this || _global).absolutePath === null) {
          (this || _global).absolutePath = (0, _aureliaPath.relativeToFile)((this || _global).path, file);
        }
      };

      return RelativeViewStrategy;
    }()) || _class3);
    var ConventionalViewStrategy = exports.ConventionalViewStrategy = (_dec2 = viewStrategy(), _dec2(_class4 = function () {
      function ConventionalViewStrategy(viewLocator, origin) {
        (this || _global).moduleId = origin.moduleId;
        (this || _global).viewUrl = viewLocator.convertOriginToViewUrl(origin);
      }

      ConventionalViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
        compileInstruction.associatedModuleId = (this || _global).moduleId;
        return viewEngine.loadViewFactory((this || _global).viewUrl, compileInstruction, loadContext, target);
      };

      return ConventionalViewStrategy;
    }()) || _class4);
    var NoViewStrategy = exports.NoViewStrategy = (_dec3 = viewStrategy(), _dec3(_class5 = function () {
      function NoViewStrategy(dependencies, dependencyBaseUrl) {
        (this || _global).dependencies = dependencies || null;
        (this || _global).dependencyBaseUrl = dependencyBaseUrl || '';
      }

      NoViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
        var entry = (this || _global).entry;
        var dependencies = (this || _global).dependencies;

        if (entry && entry.factoryIsReady) {
          return Promise.resolve(null);
        }

        (this || _global).entry = entry = new _aureliaLoader.TemplateRegistryEntry((this || _global).moduleId || (this || _global).dependencyBaseUrl);
        entry.dependencies = [];
        entry.templateIsLoaded = true;

        if (dependencies !== null) {
          for (var i = 0, ii = dependencies.length; i < ii; ++i) {
            var current = dependencies[i];

            if (typeof current === 'string' || typeof current === 'function') {
              entry.addDependency(current);
            } else {
              entry.addDependency(current.from, current.as);
            }
          }
        }

        compileInstruction.associatedModuleId = (this || _global).moduleId;
        return viewEngine.loadViewFactory(entry, compileInstruction, loadContext, target);
      };

      return NoViewStrategy;
    }()) || _class5);
    var TemplateRegistryViewStrategy = exports.TemplateRegistryViewStrategy = (_dec4 = viewStrategy(), _dec4(_class6 = function () {
      function TemplateRegistryViewStrategy(moduleId, entry) {
        (this || _global).moduleId = moduleId;
        (this || _global).entry = entry;
      }

      TemplateRegistryViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
        var entry = (this || _global).entry;

        if (entry.factoryIsReady) {
          return Promise.resolve(entry.factory);
        }

        compileInstruction.associatedModuleId = (this || _global).moduleId;
        return viewEngine.loadViewFactory(entry, compileInstruction, loadContext, target);
      };

      return TemplateRegistryViewStrategy;
    }()) || _class6);
    var InlineViewStrategy = exports.InlineViewStrategy = (_dec5 = viewStrategy(), _dec5(_class7 = function () {
      function InlineViewStrategy(markup, dependencies, dependencyBaseUrl) {
        (this || _global).markup = markup;
        (this || _global).dependencies = dependencies || null;
        (this || _global).dependencyBaseUrl = dependencyBaseUrl || '';
      }

      InlineViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
        var entry = (this || _global).entry;
        var dependencies = (this || _global).dependencies;

        if (entry && entry.factoryIsReady) {
          return Promise.resolve(entry.factory);
        }

        (this || _global).entry = entry = new _aureliaLoader.TemplateRegistryEntry((this || _global).moduleId || (this || _global).dependencyBaseUrl);
        entry.template = _aureliaPal.DOM.createTemplateFromMarkup((this || _global).markup);

        if (dependencies !== null) {
          for (var i = 0, ii = dependencies.length; i < ii; ++i) {
            var current = dependencies[i];

            if (typeof current === 'string' || typeof current === 'function') {
              entry.addDependency(current);
            } else {
              entry.addDependency(current.from, current.as);
            }
          }
        }

        compileInstruction.associatedModuleId = (this || _global).moduleId;
        return viewEngine.loadViewFactory(entry, compileInstruction, loadContext, target);
      };

      return InlineViewStrategy;
    }()) || _class7);
    var StaticViewStrategy = exports.StaticViewStrategy = (_dec6 = viewStrategy(), _dec6(_class8 = function () {
      function StaticViewStrategy(config) {
        if (typeof config === 'string' || config instanceof _aureliaPal.DOM.Element && config.tagName === 'TEMPLATE') {
          config = {
            template: config
          };
        }

        (this || _global).template = config.template;
        (this || _global).dependencies = config.dependencies || [];
        (this || _global).factoryIsReady = false;
        (this || _global).onReady = null;
        (this || _global).moduleId = 'undefined';
      }

      StaticViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
        var _this2 = this || _global;

        if ((this || _global).factoryIsReady) {
          return Promise.resolve((this || _global).factory);
        }

        var deps = (this || _global).dependencies;
        deps = typeof deps === 'function' ? deps() : deps;
        deps = deps ? deps : [];
        deps = Array.isArray(deps) ? deps : [deps];
        return Promise.all(deps).then(function (dependencies) {
          var container = viewEngine.container;
          var appResources = viewEngine.appResources;
          var viewCompiler = viewEngine.viewCompiler;
          var viewResources = new ViewResources(appResources);
          var resource = void 0;
          var elDeps = [];

          if (target) {
            viewResources.autoRegister(container, target);
          }

          for (var _iterator = dependencies, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var dep = _ref;

            if (typeof dep === 'function') {
              resource = viewResources.autoRegister(container, dep);

              if (resource.elementName !== null) {
                elDeps.push(resource);
              }
            } else if (dep && (typeof dep === 'undefined' ? 'undefined' : _typeof(dep)) === 'object') {
              for (var _key2 in dep) {
                var exported = dep[_key2];

                if (typeof exported === 'function') {
                  resource = viewResources.autoRegister(container, exported);

                  if (resource.elementName !== null) {
                    elDeps.push(resource);
                  }
                }
              }
            } else {
              throw new Error('dependency neither function nor object. Received: "' + (typeof dep === 'undefined' ? 'undefined' : _typeof(dep)) + '"');
            }
          }

          return Promise.all(elDeps.map(function (el) {
            return el.load(container, el.target);
          })).then(function () {
            var factory = _this2.template !== null ? viewCompiler.compile(_this2.template, viewResources, compileInstruction) : null;
            _this2.factoryIsReady = true;
            _this2.factory = factory;
            return factory;
          });
        });
      };

      return StaticViewStrategy;
    }()) || _class8);
    var ViewLocator = exports.ViewLocator = (_temp3 = _class9 = function () {
      function ViewLocator() {}

      ViewLocator.prototype.getViewStrategy = function getViewStrategy(value) {
        if (!value) {
          return null;
        }

        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && 'getViewStrategy' in value) {
          var _origin = _aureliaMetadata.Origin.get(value.constructor);

          value = value.getViewStrategy();

          if (typeof value === 'string') {
            value = new RelativeViewStrategy(value);
          }

          viewStrategy.assert(value);

          if (_origin.moduleId) {
            value.makeRelativeTo(_origin.moduleId);
          }

          return value;
        }

        if (typeof value === 'string') {
          value = new RelativeViewStrategy(value);
        }

        if (viewStrategy.validate(value)) {
          return value;
        }

        if (typeof value !== 'function') {
          value = value.constructor;
        }

        if ('$view' in value) {
          var c = value.$view;

          var _view = void 0;

          c = typeof c === 'function' ? c.call(value) : c;

          if (c === null) {
            _view = new NoViewStrategy();
          } else {
            _view = c instanceof StaticViewStrategy ? c : new StaticViewStrategy(c);
          }

          _aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, _view, value);

          return _view;
        }

        var origin = _aureliaMetadata.Origin.get(value);

        var strategy = _aureliaMetadata.metadata.get(ViewLocator.viewStrategyMetadataKey, value);

        if (!strategy) {
          if (!origin.moduleId) {
            throw new Error('Cannot determine default view strategy for object.', value);
          }

          strategy = this.createFallbackViewStrategy(origin);
        } else if (origin.moduleId) {
          strategy.moduleId = origin.moduleId;
        }

        return strategy;
      };

      ViewLocator.prototype.createFallbackViewStrategy = function createFallbackViewStrategy(origin) {
        return new ConventionalViewStrategy(this || _global, origin);
      };

      ViewLocator.prototype.convertOriginToViewUrl = function convertOriginToViewUrl(origin) {
        var moduleId = origin.moduleId;
        var id = moduleId.endsWith('.js') || moduleId.endsWith('.ts') ? moduleId.substring(0, moduleId.length - 3) : moduleId;
        return id + '.html';
      };

      return ViewLocator;
    }(), _class9.viewStrategyMetadataKey = 'aurelia:view-strategy', _temp3);

    function mi(name) {
      throw new Error('BindingLanguage must implement ' + name + '().');
    }

    var BindingLanguage = exports.BindingLanguage = function () {
      function BindingLanguage() {}

      BindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, elementName, attrName, attrValue) {
        mi('inspectAttribute');
      };

      BindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, info, existingInstruction) {
        mi('createAttributeInstruction');
      };

      BindingLanguage.prototype.createLetExpressions = function createLetExpressions(resources, element) {
        mi('createLetExpressions');
      };

      BindingLanguage.prototype.inspectTextContent = function inspectTextContent(resources, value) {
        mi('inspectTextContent');
      };

      return BindingLanguage;
    }();

    var noNodes = Object.freeze([]);

    var SlotCustomAttribute = exports.SlotCustomAttribute = function () {
      SlotCustomAttribute.inject = function inject() {
        return [_aureliaPal.DOM.Element];
      };

      function SlotCustomAttribute(element) {
        (this || _global).element = element;
        (this || _global).element.auSlotAttribute = this || _global;
      }

      SlotCustomAttribute.prototype.valueChanged = function valueChanged(newValue, oldValue) {};

      return SlotCustomAttribute;
    }();

    var PassThroughSlot = exports.PassThroughSlot = function () {
      function PassThroughSlot(anchor, name, destinationName, fallbackFactory) {
        (this || _global).anchor = anchor;
        (this || _global).anchor.viewSlot = this || _global;
        (this || _global).name = name;
        (this || _global).destinationName = destinationName;
        (this || _global).fallbackFactory = fallbackFactory;
        (this || _global).destinationSlot = null;
        (this || _global).projections = 0;
        (this || _global).contentView = null;
        var attr = new SlotCustomAttribute((this || _global).anchor);
        attr.value = (this || _global).destinationName;
      }

      PassThroughSlot.prototype.renderFallbackContent = function renderFallbackContent(view, nodes, projectionSource, index) {
        if ((this || _global).contentView === null) {
          (this || _global).contentView = (this || _global).fallbackFactory.create((this || _global).ownerView.container);

          (this || _global).contentView.bind((this || _global).ownerView.bindingContext, (this || _global).ownerView.overrideContext);

          var slots = Object.create(null);
          slots[(this || _global).destinationSlot.name] = (this || _global).destinationSlot;
          ShadowDOM.distributeView((this || _global).contentView, slots, projectionSource, index, (this || _global).destinationSlot.name);
        }
      };

      PassThroughSlot.prototype.passThroughTo = function passThroughTo(destinationSlot) {
        (this || _global).destinationSlot = destinationSlot;
      };

      PassThroughSlot.prototype.addNode = function addNode(view, node, projectionSource, index) {
        if ((this || _global).contentView !== null) {
          (this || _global).contentView.removeNodes();

          (this || _global).contentView.detached();

          (this || _global).contentView.unbind();

          (this || _global).contentView = null;
        }

        if (node.viewSlot instanceof PassThroughSlot) {
          node.viewSlot.passThroughTo(this || _global);
          return;
        }

        (this || _global).projections++;

        (this || _global).destinationSlot.addNode(view, node, projectionSource, index);
      };

      PassThroughSlot.prototype.removeView = function removeView(view, projectionSource) {
        (this || _global).projections--;

        (this || _global).destinationSlot.removeView(view, projectionSource);

        if ((this || _global).needsFallbackRendering) {
          this.renderFallbackContent(null, noNodes, projectionSource);
        }
      };

      PassThroughSlot.prototype.removeAll = function removeAll(projectionSource) {
        (this || _global).projections = 0;

        (this || _global).destinationSlot.removeAll(projectionSource);

        if ((this || _global).needsFallbackRendering) {
          this.renderFallbackContent(null, noNodes, projectionSource);
        }
      };

      PassThroughSlot.prototype.projectFrom = function projectFrom(view, projectionSource) {
        (this || _global).destinationSlot.projectFrom(view, projectionSource);
      };

      PassThroughSlot.prototype.created = function created(ownerView) {
        (this || _global).ownerView = ownerView;
      };

      PassThroughSlot.prototype.bind = function bind(view) {
        if ((this || _global).contentView) {
          (this || _global).contentView.bind(view.bindingContext, view.overrideContext);
        }
      };

      PassThroughSlot.prototype.attached = function attached() {
        if ((this || _global).contentView) {
          (this || _global).contentView.attached();
        }
      };

      PassThroughSlot.prototype.detached = function detached() {
        if ((this || _global).contentView) {
          (this || _global).contentView.detached();
        }
      };

      PassThroughSlot.prototype.unbind = function unbind() {
        if ((this || _global).contentView) {
          (this || _global).contentView.unbind();
        }
      };

      _createClass(PassThroughSlot, [{
        key: 'needsFallbackRendering',
        get: function get() {
          return (this || _global).fallbackFactory && (this || _global).projections === 0;
        }
      }]);

      return PassThroughSlot;
    }();

    var ShadowSlot = exports.ShadowSlot = function () {
      function ShadowSlot(anchor, name, fallbackFactory) {
        (this || _global).anchor = anchor;
        (this || _global).anchor.isContentProjectionSource = true;
        (this || _global).anchor.viewSlot = this || _global;
        (this || _global).name = name;
        (this || _global).fallbackFactory = fallbackFactory;
        (this || _global).contentView = null;
        (this || _global).projections = 0;
        (this || _global).children = [];
        (this || _global).projectFromAnchors = null;
        (this || _global).destinationSlots = null;
      }

      ShadowSlot.prototype.addNode = function addNode(view, node, projectionSource, index, destination) {
        if ((this || _global).contentView !== null) {
          (this || _global).contentView.removeNodes();

          (this || _global).contentView.detached();

          (this || _global).contentView.unbind();

          (this || _global).contentView = null;
        }

        if (node.viewSlot instanceof PassThroughSlot) {
          node.viewSlot.passThroughTo(this || _global);
          return;
        }

        if ((this || _global).destinationSlots !== null) {
          ShadowDOM.distributeNodes(view, [node], (this || _global).destinationSlots, this || _global, index);
        } else {
          node.auOwnerView = view;
          node.auProjectionSource = projectionSource;
          node.auAssignedSlot = this || _global;

          var anchor = this._findAnchor(view, node, projectionSource, index);

          var parent = anchor.parentNode;
          parent.insertBefore(node, anchor);

          (this || _global).children.push(node);

          (this || _global).projections++;
        }
      };

      ShadowSlot.prototype.removeView = function removeView(view, projectionSource) {
        if ((this || _global).destinationSlots !== null) {
          ShadowDOM.undistributeView(view, (this || _global).destinationSlots, this || _global);
        } else if ((this || _global).contentView && (this || _global).contentView.hasSlots) {
          ShadowDOM.undistributeView(view, (this || _global).contentView.slots, projectionSource);
        } else {
          var found = (this || _global).children.find(function (x) {
            return x.auSlotProjectFrom === projectionSource;
          });

          if (found) {
            var _children = found.auProjectionChildren;
            var ownChildren = (this || _global).children;

            for (var i = 0, ii = _children.length; i < ii; ++i) {
              var _child = _children[i];

              if (_child.auOwnerView === view) {
                _children.splice(i, 1);

                view.fragment.appendChild(_child);
                i--;
                ii--;
                (this || _global).projections--;
                var idx = ownChildren.indexOf(_child);

                if (idx > -1) {
                  ownChildren.splice(idx, 1);
                }
              }
            }

            if ((this || _global).needsFallbackRendering) {
              this.renderFallbackContent(view, noNodes, projectionSource);
            }
          }
        }
      };

      ShadowSlot.prototype.removeAll = function removeAll(projectionSource) {
        if ((this || _global).destinationSlots !== null) {
          ShadowDOM.undistributeAll((this || _global).destinationSlots, this || _global);
        } else if ((this || _global).contentView && (this || _global).contentView.hasSlots) {
          ShadowDOM.undistributeAll((this || _global).contentView.slots, projectionSource);
        } else {
          var found = (this || _global).children.find(function (x) {
            return x.auSlotProjectFrom === projectionSource;
          });

          if (found) {
            var _children2 = found.auProjectionChildren;
            var ownChildren = (this || _global).children;

            for (var i = 0, ii = _children2.length; i < ii; ++i) {
              var _child2 = _children2[i];

              _child2.auOwnerView.fragment.appendChild(_child2);

              (this || _global).projections--;
              var idx = ownChildren.indexOf(_child2);

              if (idx > -1) {
                ownChildren.splice(idx, 1);
              }
            }

            found.auProjectionChildren = [];

            if ((this || _global).needsFallbackRendering) {
              this.renderFallbackContent(null, noNodes, projectionSource);
            }
          }
        }
      };

      ShadowSlot.prototype._findAnchor = function _findAnchor(view, node, projectionSource, index) {
        if (projectionSource) {
          var found = (this || _global).children.find(function (x) {
            return x.auSlotProjectFrom === projectionSource;
          });

          if (found) {
            if (index !== undefined) {
              var _children3 = found.auProjectionChildren;
              var viewIndex = -1;
              var lastView = void 0;

              for (var i = 0, ii = _children3.length; i < ii; ++i) {
                var current = _children3[i];

                if (current.auOwnerView !== lastView) {
                  viewIndex++;
                  lastView = current.auOwnerView;

                  if (viewIndex >= index && lastView !== view) {
                    _children3.splice(i, 0, node);

                    return current;
                  }
                }
              }
            }

            found.auProjectionChildren.push(node);
            return found;
          }
        }

        return (this || _global).anchor;
      };

      ShadowSlot.prototype.projectTo = function projectTo(slots) {
        (this || _global).destinationSlots = slots;
      };

      ShadowSlot.prototype.projectFrom = function projectFrom(view, projectionSource) {
        var anchor = _aureliaPal.DOM.createComment('anchor');

        var parent = (this || _global).anchor.parentNode;
        anchor.auSlotProjectFrom = projectionSource;
        anchor.auOwnerView = view;
        anchor.auProjectionChildren = [];
        parent.insertBefore(anchor, (this || _global).anchor);

        (this || _global).children.push(anchor);

        if ((this || _global).projectFromAnchors === null) {
          (this || _global).projectFromAnchors = [];
        }

        (this || _global).projectFromAnchors.push(anchor);
      };

      ShadowSlot.prototype.renderFallbackContent = function renderFallbackContent(view, nodes, projectionSource, index) {
        if ((this || _global).contentView === null) {
          (this || _global).contentView = (this || _global).fallbackFactory.create((this || _global).ownerView.container);

          (this || _global).contentView.bind((this || _global).ownerView.bindingContext, (this || _global).ownerView.overrideContext);

          (this || _global).contentView.insertNodesBefore((this || _global).anchor);
        }

        if ((this || _global).contentView.hasSlots) {
          var slots = (this || _global).contentView.slots;
          var projectFromAnchors = (this || _global).projectFromAnchors;

          if (projectFromAnchors !== null) {
            for (var slotName in slots) {
              var slot = slots[slotName];

              for (var i = 0, ii = projectFromAnchors.length; i < ii; ++i) {
                var anchor = projectFromAnchors[i];
                slot.projectFrom(anchor.auOwnerView, anchor.auSlotProjectFrom);
              }
            }
          }

          (this || _global).fallbackSlots = slots;
          ShadowDOM.distributeNodes(view, nodes, slots, projectionSource, index);
        }
      };

      ShadowSlot.prototype.created = function created(ownerView) {
        (this || _global).ownerView = ownerView;
      };

      ShadowSlot.prototype.bind = function bind(view) {
        if ((this || _global).contentView) {
          (this || _global).contentView.bind(view.bindingContext, view.overrideContext);
        }
      };

      ShadowSlot.prototype.attached = function attached() {
        if ((this || _global).contentView) {
          (this || _global).contentView.attached();
        }
      };

      ShadowSlot.prototype.detached = function detached() {
        if ((this || _global).contentView) {
          (this || _global).contentView.detached();
        }
      };

      ShadowSlot.prototype.unbind = function unbind() {
        if ((this || _global).contentView) {
          (this || _global).contentView.unbind();
        }
      };

      _createClass(ShadowSlot, [{
        key: 'needsFallbackRendering',
        get: function get() {
          return (this || _global).fallbackFactory && (this || _global).projections === 0;
        }
      }]);

      return ShadowSlot;
    }();

    var ShadowDOM = exports.ShadowDOM = (_temp4 = _class10 = function () {
      function ShadowDOM() {}

      ShadowDOM.getSlotName = function getSlotName(node) {
        if (node.auSlotAttribute === undefined) {
          return ShadowDOM.defaultSlotKey;
        }

        return node.auSlotAttribute.value;
      };

      ShadowDOM.distributeView = function distributeView(view, slots, projectionSource, index, destinationOverride) {
        var nodes = void 0;

        if (view === null) {
          nodes = noNodes;
        } else {
          var childNodes = view.fragment.childNodes;
          var ii = childNodes.length;
          nodes = new Array(ii);

          for (var i = 0; i < ii; ++i) {
            nodes[i] = childNodes[i];
          }
        }

        ShadowDOM.distributeNodes(view, nodes, slots, projectionSource, index, destinationOverride);
      };

      ShadowDOM.undistributeView = function undistributeView(view, slots, projectionSource) {
        for (var slotName in slots) {
          slots[slotName].removeView(view, projectionSource);
        }
      };

      ShadowDOM.undistributeAll = function undistributeAll(slots, projectionSource) {
        for (var slotName in slots) {
          slots[slotName].removeAll(projectionSource);
        }
      };

      ShadowDOM.distributeNodes = function distributeNodes(view, nodes, slots, projectionSource, index, destinationOverride) {
        for (var i = 0, ii = nodes.length; i < ii; ++i) {
          var currentNode = nodes[i];
          var nodeType = currentNode.nodeType;

          if (currentNode.isContentProjectionSource) {
            currentNode.viewSlot.projectTo(slots);

            for (var slotName in slots) {
              slots[slotName].projectFrom(view, currentNode.viewSlot);
            }

            nodes.splice(i, 1);
            ii--;
            i--;
          } else if (nodeType === 1 || nodeType === 3 || currentNode.viewSlot instanceof PassThroughSlot) {
            if (nodeType === 3 && _isAllWhitespace(currentNode)) {
              nodes.splice(i, 1);
              ii--;
              i--;
            } else {
              var found = slots[destinationOverride || ShadowDOM.getSlotName(currentNode)];

              if (found) {
                found.addNode(view, currentNode, projectionSource, index);
                nodes.splice(i, 1);
                ii--;
                i--;
              }
            }
          } else {
            nodes.splice(i, 1);
            ii--;
            i--;
          }
        }

        for (var _slotName in slots) {
          var slot = slots[_slotName];

          if (slot.needsFallbackRendering) {
            slot.renderFallbackContent(view, nodes, projectionSource, index);
          }
        }
      };

      return ShadowDOM;
    }(), _class10.defaultSlotKey = '__au-default-slot-key__', _temp4);

    function register(lookup, name, resource, type) {
      if (!name) {
        return;
      }

      var existing = lookup[name];

      if (existing) {
        if (existing !== resource) {
          throw new Error('Attempted to register ' + type + ' when one with the same name already exists. Name: ' + name + '.');
        }

        return;
      }

      lookup[name] = resource;
    }

    function validateBehaviorName(name, type) {
      if (/[A-Z]/.test(name)) {
        var newName = _hyphenate(name);

        LogManager.getLogger('templating').warn('\'' + name + '\' is not a valid ' + type + ' name and has been converted to \'' + newName + '\'. Upper-case letters are not allowed because the DOM is not case-sensitive.');
        return newName;
      }

      return name;
    }

    var conventionMark = '__au_resource__';

    var ViewResources = exports.ViewResources = function () {
      ViewResources.convention = function convention(target, existing) {
        var resource = void 0;

        if (existing && conventionMark in existing) {
          return existing;
        }

        if ('$resource' in target) {
          var config = target.$resource;

          if (typeof config === 'string') {
            resource = existing || new HtmlBehaviorResource();
            resource[conventionMark] = true;

            if (!resource.elementName) {
              resource.elementName = validateBehaviorName(config, 'custom element');
            }
          } else {
            if (typeof config === 'function') {
              config = config.call(target);
            }

            if (typeof config === 'string') {
              config = {
                name: config
              };
            }

            config = Object.assign({}, config);
            var resourceType = config.type || 'element';
            var _name = config.name;

            switch (resourceType) {
              case 'element':
              case 'attribute':
                resource = existing || new HtmlBehaviorResource();
                resource[conventionMark] = true;

                if (resourceType === 'element') {
                  if (!resource.elementName) {
                    resource.elementName = _name ? validateBehaviorName(_name, 'custom element') : _hyphenate(target.name);
                  }
                } else {
                  if (!resource.attributeName) {
                    resource.attributeName = _name ? validateBehaviorName(_name, 'custom attribute') : _hyphenate(target.name);
                  }
                }

                if ('templateController' in config) {
                  config.liftsContent = config.templateController;
                  delete config.templateController;
                }

                if ('defaultBindingMode' in config && resource.attributeDefaultBindingMode !== undefined) {
                  config.attributeDefaultBindingMode = config.defaultBindingMode;
                  delete config.defaultBindingMode;
                }

                delete config.name;
                Object.assign(resource, config);
                break;

              case 'valueConverter':
                resource = new _aureliaBinding.ValueConverterResource((0, _aureliaBinding.camelCase)(_name || target.name));
                break;

              case 'bindingBehavior':
                resource = new _aureliaBinding.BindingBehaviorResource((0, _aureliaBinding.camelCase)(_name || target.name));
                break;

              case 'viewEngineHooks':
                resource = new ViewEngineHooksResource();
                break;
            }
          }

          if (resource instanceof HtmlBehaviorResource) {
            var _bindables = typeof config === 'string' ? undefined : config.bindables;

            var currentProps = resource.properties;

            if (Array.isArray(_bindables)) {
              for (var i = 0, ii = _bindables.length; ii > i; ++i) {
                var prop = _bindables[i];

                if (!prop || typeof prop !== 'string' && !prop.name) {
                  throw new Error('Invalid bindable property at "' + i + '" for class "' + target.name + '". Expected either a string or an object with "name" property.');
                }

                var newProp = new BindableProperty(prop);
                var existed = false;

                for (var j = 0, jj = currentProps.length; jj > j; ++j) {
                  if (currentProps[j].name === newProp.name) {
                    existed = true;
                    break;
                  }
                }

                if (existed) {
                  continue;
                }

                newProp.registerWith(target, resource);
              }
            }
          }
        }

        return resource;
      };

      function ViewResources(parent, viewUrl) {
        (this || _global).bindingLanguage = null;
        (this || _global).parent = parent || null;
        (this || _global).hasParent = (this || _global).parent !== null;
        (this || _global).viewUrl = viewUrl || '';
        (this || _global).lookupFunctions = {
          valueConverters: (this || _global).getValueConverter.bind(this || _global),
          bindingBehaviors: (this || _global).getBindingBehavior.bind(this || _global)
        };
        (this || _global).attributes = Object.create(null);
        (this || _global).elements = Object.create(null);
        (this || _global).valueConverters = Object.create(null);
        (this || _global).bindingBehaviors = Object.create(null);
        (this || _global).attributeMap = Object.create(null);
        (this || _global).values = Object.create(null);
        (this || _global).beforeCompile = (this || _global).afterCompile = (this || _global).beforeCreate = (this || _global).afterCreate = (this || _global).beforeBind = (this || _global).beforeUnbind = false;
      }

      ViewResources.prototype._tryAddHook = function _tryAddHook(obj, name) {
        if (typeof obj[name] === 'function') {
          var func = obj[name].bind(obj);
          var counter = 1;
          var callbackName = void 0;

          while ((this || _global)[callbackName = name + counter.toString()] !== undefined) {
            counter++;
          }

          (this || _global)[name] = true;
          (this || _global)[callbackName] = func;
        }
      };

      ViewResources.prototype._invokeHook = function _invokeHook(name, one, two, three, four) {
        if ((this || _global).hasParent) {
          (this || _global).parent._invokeHook(name, one, two, three, four);
        }

        if ((this || _global)[name]) {
          this[name + '1'](one, two, three, four);
          var callbackName = name + '2';

          if ((this || _global)[callbackName]) {
            this[callbackName](one, two, three, four);
            callbackName = name + '3';

            if ((this || _global)[callbackName]) {
              this[callbackName](one, two, three, four);
              var counter = 4;

              while ((this || _global)[callbackName = name + counter.toString()] !== undefined) {
                this[callbackName](one, two, three, four);
                counter++;
              }
            }
          }
        }
      };

      ViewResources.prototype.registerViewEngineHooks = function registerViewEngineHooks(hooks) {
        this._tryAddHook(hooks, 'beforeCompile');

        this._tryAddHook(hooks, 'afterCompile');

        this._tryAddHook(hooks, 'beforeCreate');

        this._tryAddHook(hooks, 'afterCreate');

        this._tryAddHook(hooks, 'beforeBind');

        this._tryAddHook(hooks, 'beforeUnbind');
      };

      ViewResources.prototype.getBindingLanguage = function getBindingLanguage(bindingLanguageFallback) {
        return (this || _global).bindingLanguage || ((this || _global).bindingLanguage = bindingLanguageFallback);
      };

      ViewResources.prototype.patchInParent = function patchInParent(newParent) {
        var originalParent = (this || _global).parent;
        (this || _global).parent = newParent || null;
        (this || _global).hasParent = (this || _global).parent !== null;

        if (newParent.parent === null) {
          newParent.parent = originalParent;
          newParent.hasParent = originalParent !== null;
        }
      };

      ViewResources.prototype.relativeToView = function relativeToView(path) {
        return (0, _aureliaPath.relativeToFile)(path, (this || _global).viewUrl);
      };

      ViewResources.prototype.registerElement = function registerElement(tagName, behavior) {
        register((this || _global).elements, tagName, behavior, 'an Element');
      };

      ViewResources.prototype.getElement = function getElement(tagName) {
        return (this || _global).elements[tagName] || ((this || _global).hasParent ? (this || _global).parent.getElement(tagName) : null);
      };

      ViewResources.prototype.mapAttribute = function mapAttribute(attribute) {
        return (this || _global).attributeMap[attribute] || ((this || _global).hasParent ? (this || _global).parent.mapAttribute(attribute) : null);
      };

      ViewResources.prototype.registerAttribute = function registerAttribute(attribute, behavior, knownAttribute) {
        (this || _global).attributeMap[attribute] = knownAttribute;
        register((this || _global).attributes, attribute, behavior, 'an Attribute');
      };

      ViewResources.prototype.getAttribute = function getAttribute(attribute) {
        return (this || _global).attributes[attribute] || ((this || _global).hasParent ? (this || _global).parent.getAttribute(attribute) : null);
      };

      ViewResources.prototype.registerValueConverter = function registerValueConverter(name, valueConverter) {
        register((this || _global).valueConverters, name, valueConverter, 'a ValueConverter');
      };

      ViewResources.prototype.getValueConverter = function getValueConverter(name) {
        return (this || _global).valueConverters[name] || ((this || _global).hasParent ? (this || _global).parent.getValueConverter(name) : null);
      };

      ViewResources.prototype.registerBindingBehavior = function registerBindingBehavior(name, bindingBehavior) {
        register((this || _global).bindingBehaviors, name, bindingBehavior, 'a BindingBehavior');
      };

      ViewResources.prototype.getBindingBehavior = function getBindingBehavior(name) {
        return (this || _global).bindingBehaviors[name] || ((this || _global).hasParent ? (this || _global).parent.getBindingBehavior(name) : null);
      };

      ViewResources.prototype.registerValue = function registerValue(name, value) {
        register((this || _global).values, name, value, 'a value');
      };

      ViewResources.prototype.getValue = function getValue(name) {
        return (this || _global).values[name] || ((this || _global).hasParent ? (this || _global).parent.getValue(name) : null);
      };

      ViewResources.prototype.autoRegister = function autoRegister(container, impl) {
        var resourceTypeMeta = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.resource, impl);

        if (resourceTypeMeta) {
          if (resourceTypeMeta instanceof HtmlBehaviorResource) {
            ViewResources.convention(impl, resourceTypeMeta);

            if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
              HtmlBehaviorResource.convention(impl.name, resourceTypeMeta);
            }

            if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
              resourceTypeMeta.elementName = _hyphenate(impl.name);
            }
          }
        } else {
          resourceTypeMeta = ViewResources.convention(impl) || HtmlBehaviorResource.convention(impl.name) || _aureliaBinding.ValueConverterResource.convention(impl.name) || _aureliaBinding.BindingBehaviorResource.convention(impl.name) || ViewEngineHooksResource.convention(impl.name);

          if (!resourceTypeMeta) {
            resourceTypeMeta = new HtmlBehaviorResource();
            resourceTypeMeta.elementName = _hyphenate(impl.name);
          }

          _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, resourceTypeMeta, impl);
        }

        resourceTypeMeta.initialize(container, impl);
        resourceTypeMeta.register(this || _global);
        return resourceTypeMeta;
      };

      return ViewResources;
    }();

    var View = exports.View = function () {
      function View(container, viewFactory, fragment, controllers, bindings, children, slots) {
        (this || _global).container = container;
        (this || _global).viewFactory = viewFactory;
        (this || _global).resources = viewFactory.resources;
        (this || _global).fragment = fragment;
        (this || _global).firstChild = fragment.firstChild;
        (this || _global).lastChild = fragment.lastChild;
        (this || _global).controllers = controllers;
        (this || _global).bindings = bindings;
        (this || _global).children = children;
        (this || _global).slots = slots;
        (this || _global).hasSlots = false;
        (this || _global).fromCache = false;
        (this || _global).isBound = false;
        (this || _global).isAttached = false;
        (this || _global).bindingContext = null;
        (this || _global).overrideContext = null;
        (this || _global).controller = null;
        (this || _global).viewModelScope = null;
        (this || _global).animatableElement = undefined;
        (this || _global)._isUserControlled = false;
        (this || _global).contentView = null;

        for (var _key3 in slots) {
          (this || _global).hasSlots = true;
          break;
        }
      }

      View.prototype.returnToCache = function returnToCache() {
        (this || _global).viewFactory.returnViewToCache(this || _global);
      };

      View.prototype.created = function created() {
        var i = void 0;
        var ii = void 0;
        var controllers = (this || _global).controllers;

        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].created(this || _global);
        }
      };

      View.prototype.bind = function bind(bindingContext, overrideContext, _systemUpdate) {
        var controllers = void 0;
        var bindings = void 0;
        var children = void 0;
        var i = void 0;
        var ii = void 0;

        if (_systemUpdate && (this || _global)._isUserControlled) {
          return;
        }

        if ((this || _global).isBound) {
          if ((this || _global).bindingContext === bindingContext) {
            return;
          }

          this.unbind();
        }

        (this || _global).isBound = true;
        (this || _global).bindingContext = bindingContext;
        (this || _global).overrideContext = overrideContext || (0, _aureliaBinding.createOverrideContext)(bindingContext);

        (this || _global).resources._invokeHook('beforeBind', this || _global);

        bindings = (this || _global).bindings;

        for (i = 0, ii = bindings.length; i < ii; ++i) {
          bindings[i].bind(this || _global);
        }

        if ((this || _global).viewModelScope !== null) {
          bindingContext.bind((this || _global).viewModelScope.bindingContext, (this || _global).viewModelScope.overrideContext);
          (this || _global).viewModelScope = null;
        }

        controllers = (this || _global).controllers;

        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].bind(this || _global);
        }

        children = (this || _global).children;

        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].bind(bindingContext, overrideContext, true);
        }

        if ((this || _global).hasSlots) {
          ShadowDOM.distributeView((this || _global).contentView, (this || _global).slots);
        }
      };

      View.prototype.addBinding = function addBinding(binding) {
        (this || _global).bindings.push(binding);

        if ((this || _global).isBound) {
          binding.bind(this || _global);
        }
      };

      View.prototype.unbind = function unbind() {
        var controllers = void 0;
        var bindings = void 0;
        var children = void 0;
        var i = void 0;
        var ii = void 0;

        if ((this || _global).isBound) {
          (this || _global).isBound = false;

          (this || _global).resources._invokeHook('beforeUnbind', this || _global);

          if ((this || _global).controller !== null) {
            (this || _global).controller.unbind();
          }

          bindings = (this || _global).bindings;

          for (i = 0, ii = bindings.length; i < ii; ++i) {
            bindings[i].unbind();
          }

          controllers = (this || _global).controllers;

          for (i = 0, ii = controllers.length; i < ii; ++i) {
            controllers[i].unbind();
          }

          children = (this || _global).children;

          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].unbind();
          }

          (this || _global).bindingContext = null;
          (this || _global).overrideContext = null;
        }
      };

      View.prototype.insertNodesBefore = function insertNodesBefore(refNode) {
        refNode.parentNode.insertBefore((this || _global).fragment, refNode);
      };

      View.prototype.appendNodesTo = function appendNodesTo(parent) {
        parent.appendChild((this || _global).fragment);
      };

      View.prototype.removeNodes = function removeNodes() {
        var fragment = (this || _global).fragment;
        var current = (this || _global).firstChild;
        var end = (this || _global).lastChild;
        var next = void 0;

        while (current) {
          next = current.nextSibling;
          fragment.appendChild(current);

          if (current === end) {
            break;
          }

          current = next;
        }
      };

      View.prototype.attached = function attached() {
        var controllers = void 0;
        var children = void 0;
        var i = void 0;
        var ii = void 0;

        if ((this || _global).isAttached) {
          return;
        }

        (this || _global).isAttached = true;

        if ((this || _global).controller !== null) {
          (this || _global).controller.attached();
        }

        controllers = (this || _global).controllers;

        for (i = 0, ii = controllers.length; i < ii; ++i) {
          controllers[i].attached();
        }

        children = (this || _global).children;

        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].attached();
        }
      };

      View.prototype.detached = function detached() {
        var controllers = void 0;
        var children = void 0;
        var i = void 0;
        var ii = void 0;

        if ((this || _global).isAttached) {
          (this || _global).isAttached = false;

          if ((this || _global).controller !== null) {
            (this || _global).controller.detached();
          }

          controllers = (this || _global).controllers;

          for (i = 0, ii = controllers.length; i < ii; ++i) {
            controllers[i].detached();
          }

          children = (this || _global).children;

          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].detached();
          }
        }
      };

      return View;
    }();

    function getAnimatableElement(view) {
      if (view.animatableElement !== undefined) {
        return view.animatableElement;
      }

      var current = view.firstChild;

      while (current && current.nodeType !== 1) {
        current = current.nextSibling;
      }

      if (current && current.nodeType === 1) {
        return view.animatableElement = current.classList.contains('au-animate') ? current : null;
      }

      return view.animatableElement = null;
    }

    var ViewSlot = exports.ViewSlot = function () {
      function ViewSlot(anchor, anchorIsContainer) {
        var animator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Animator.instance;
        (this || _global).anchor = anchor;
        (this || _global).anchorIsContainer = anchorIsContainer;
        (this || _global).bindingContext = null;
        (this || _global).overrideContext = null;
        (this || _global).animator = animator;
        (this || _global).children = [];
        (this || _global).isBound = false;
        (this || _global).isAttached = false;
        (this || _global).contentSelectors = null;
        anchor.viewSlot = this || _global;
        anchor.isContentProjectionSource = false;
      }

      ViewSlot.prototype.animateView = function animateView(view) {
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'enter';
        var animatableElement = getAnimatableElement(view);

        if (animatableElement !== null) {
          switch (direction) {
            case 'enter':
              return (this || _global).animator.enter(animatableElement);

            case 'leave':
              return (this || _global).animator.leave(animatableElement);

            default:
              throw new Error('Invalid animation direction: ' + direction);
          }
        }
      };

      ViewSlot.prototype.transformChildNodesIntoView = function transformChildNodesIntoView() {
        var parent = (this || _global).anchor;

        (this || _global).children.push({
          fragment: parent,
          firstChild: parent.firstChild,
          lastChild: parent.lastChild,
          returnToCache: function returnToCache() {},
          removeNodes: function removeNodes() {
            var last = void 0;

            while (last = parent.lastChild) {
              parent.removeChild(last);
            }
          },
          created: function created() {},
          bind: function bind() {},
          unbind: function unbind() {},
          attached: function attached() {},
          detached: function detached() {}
        });
      };

      ViewSlot.prototype.bind = function bind(bindingContext, overrideContext) {
        var i = void 0;
        var ii = void 0;
        var children = void 0;

        if ((this || _global).isBound) {
          if ((this || _global).bindingContext === bindingContext) {
            return;
          }

          this.unbind();
        }

        (this || _global).isBound = true;
        (this || _global).bindingContext = bindingContext = bindingContext || (this || _global).bindingContext;
        (this || _global).overrideContext = overrideContext = overrideContext || (this || _global).overrideContext;
        children = (this || _global).children;

        for (i = 0, ii = children.length; i < ii; ++i) {
          children[i].bind(bindingContext, overrideContext, true);
        }
      };

      ViewSlot.prototype.unbind = function unbind() {
        if ((this || _global).isBound) {
          var i = void 0;
          var ii = void 0;
          var _children4 = (this || _global).children;
          (this || _global).isBound = false;
          (this || _global).bindingContext = null;
          (this || _global).overrideContext = null;

          for (i = 0, ii = _children4.length; i < ii; ++i) {
            _children4[i].unbind();
          }
        }
      };

      ViewSlot.prototype.add = function add(view) {
        if ((this || _global).anchorIsContainer) {
          view.appendNodesTo((this || _global).anchor);
        } else {
          view.insertNodesBefore((this || _global).anchor);
        }

        (this || _global).children.push(view);

        if ((this || _global).isAttached) {
          view.attached();
          return this.animateView(view, 'enter');
        }
      };

      ViewSlot.prototype.insert = function insert(index, view) {
        var children = (this || _global).children;
        var length = children.length;

        if (index === 0 && length === 0 || index >= length) {
          return this.add(view);
        }

        view.insertNodesBefore(children[index].firstChild);
        children.splice(index, 0, view);

        if ((this || _global).isAttached) {
          view.attached();
          return this.animateView(view, 'enter');
        }
      };

      ViewSlot.prototype.move = function move(sourceIndex, targetIndex) {
        if (sourceIndex === targetIndex) {
          return;
        }

        var children = (this || _global).children;
        var view = children[sourceIndex];
        view.removeNodes();
        view.insertNodesBefore(children[targetIndex].firstChild);
        children.splice(sourceIndex, 1);
        children.splice(targetIndex, 0, view);
      };

      ViewSlot.prototype.remove = function remove(view, returnToCache, skipAnimation) {
        return this.removeAt((this || _global).children.indexOf(view), returnToCache, skipAnimation);
      };

      ViewSlot.prototype.removeMany = function removeMany(viewsToRemove, returnToCache, skipAnimation) {
        var _this3 = this || _global;

        var children = (this || _global).children;
        var ii = viewsToRemove.length;
        var i = void 0;
        var rmPromises = [];
        viewsToRemove.forEach(function (child) {
          if (skipAnimation) {
            child.removeNodes();
            return;
          }

          var animation = _this3.animateView(child, 'leave');

          if (animation) {
            rmPromises.push(animation.then(function () {
              return child.removeNodes();
            }));
          } else {
            child.removeNodes();
          }
        });

        var removeAction = function removeAction() {
          if (_this3.isAttached) {
            for (i = 0; i < ii; ++i) {
              viewsToRemove[i].detached();
            }
          }

          if (returnToCache) {
            for (i = 0; i < ii; ++i) {
              viewsToRemove[i].returnToCache();
            }
          }

          for (i = 0; i < ii; ++i) {
            var index = children.indexOf(viewsToRemove[i]);

            if (index >= 0) {
              children.splice(index, 1);
            }
          }
        };

        if (rmPromises.length > 0) {
          return Promise.all(rmPromises).then(function () {
            return removeAction();
          });
        }

        return removeAction();
      };

      ViewSlot.prototype.removeAt = function removeAt(index, returnToCache, skipAnimation) {
        var _this4 = this || _global;

        var view = (this || _global).children[index];

        var removeAction = function removeAction() {
          index = _this4.children.indexOf(view);
          view.removeNodes();

          _this4.children.splice(index, 1);

          if (_this4.isAttached) {
            view.detached();
          }

          if (returnToCache) {
            view.returnToCache();
          }

          return view;
        };

        if (!skipAnimation) {
          var animation = this.animateView(view, 'leave');

          if (animation) {
            return animation.then(function () {
              return removeAction();
            });
          }
        }

        return removeAction();
      };

      ViewSlot.prototype.removeAll = function removeAll(returnToCache, skipAnimation) {
        var _this5 = this || _global;

        var children = (this || _global).children;
        var ii = children.length;
        var i = void 0;
        var rmPromises = [];
        children.forEach(function (child) {
          if (skipAnimation) {
            child.removeNodes();
            return;
          }

          var animation = _this5.animateView(child, 'leave');

          if (animation) {
            rmPromises.push(animation.then(function () {
              return child.removeNodes();
            }));
          } else {
            child.removeNodes();
          }
        });

        var removeAction = function removeAction() {
          if (_this5.isAttached) {
            for (i = 0; i < ii; ++i) {
              children[i].detached();
            }
          }

          if (returnToCache) {
            for (i = 0; i < ii; ++i) {
              var _child3 = children[i];

              if (_child3) {
                _child3.returnToCache();
              }
            }
          }

          _this5.children = [];
        };

        if (rmPromises.length > 0) {
          return Promise.all(rmPromises).then(function () {
            return removeAction();
          });
        }

        return removeAction();
      };

      ViewSlot.prototype.attached = function attached() {
        var i = void 0;
        var ii = void 0;
        var children = void 0;
        var child = void 0;

        if ((this || _global).isAttached) {
          return;
        }

        (this || _global).isAttached = true;
        children = (this || _global).children;

        for (i = 0, ii = children.length; i < ii; ++i) {
          child = children[i];
          child.attached();
          this.animateView(child, 'enter');
        }
      };

      ViewSlot.prototype.detached = function detached() {
        var i = void 0;
        var ii = void 0;
        var children = void 0;

        if ((this || _global).isAttached) {
          (this || _global).isAttached = false;
          children = (this || _global).children;

          for (i = 0, ii = children.length; i < ii; ++i) {
            children[i].detached();
          }
        }
      };

      ViewSlot.prototype.projectTo = function projectTo(slots) {
        var _this6 = this || _global;

        (this || _global).projectToSlots = slots;
        (this || _global).add = (this || _global)._projectionAdd;
        (this || _global).insert = (this || _global)._projectionInsert;
        (this || _global).move = (this || _global)._projectionMove;
        (this || _global).remove = (this || _global)._projectionRemove;
        (this || _global).removeAt = (this || _global)._projectionRemoveAt;
        (this || _global).removeMany = (this || _global)._projectionRemoveMany;
        (this || _global).removeAll = (this || _global)._projectionRemoveAll;

        (this || _global).children.forEach(function (view) {
          return ShadowDOM.distributeView(view, slots, _this6);
        });
      };

      ViewSlot.prototype._projectionAdd = function _projectionAdd(view) {
        ShadowDOM.distributeView(view, (this || _global).projectToSlots, this || _global);

        (this || _global).children.push(view);

        if ((this || _global).isAttached) {
          view.attached();
        }
      };

      ViewSlot.prototype._projectionInsert = function _projectionInsert(index, view) {
        if (index === 0 && !(this || _global).children.length || index >= (this || _global).children.length) {
          this.add(view);
        } else {
          ShadowDOM.distributeView(view, (this || _global).projectToSlots, this || _global, index);

          (this || _global).children.splice(index, 0, view);

          if ((this || _global).isAttached) {
            view.attached();
          }
        }
      };

      ViewSlot.prototype._projectionMove = function _projectionMove(sourceIndex, targetIndex) {
        if (sourceIndex === targetIndex) {
          return;
        }

        var children = (this || _global).children;
        var view = children[sourceIndex];
        ShadowDOM.undistributeView(view, (this || _global).projectToSlots, this || _global);
        ShadowDOM.distributeView(view, (this || _global).projectToSlots, this || _global, targetIndex);
        children.splice(sourceIndex, 1);
        children.splice(targetIndex, 0, view);
      };

      ViewSlot.prototype._projectionRemove = function _projectionRemove(view, returnToCache) {
        ShadowDOM.undistributeView(view, (this || _global).projectToSlots, this || _global);

        (this || _global).children.splice((this || _global).children.indexOf(view), 1);

        if ((this || _global).isAttached) {
          view.detached();
        }

        if (returnToCache) {
          view.returnToCache();
        }
      };

      ViewSlot.prototype._projectionRemoveAt = function _projectionRemoveAt(index, returnToCache) {
        var view = (this || _global).children[index];
        ShadowDOM.undistributeView(view, (this || _global).projectToSlots, this || _global);

        (this || _global).children.splice(index, 1);

        if ((this || _global).isAttached) {
          view.detached();
        }

        if (returnToCache) {
          view.returnToCache();
        }
      };

      ViewSlot.prototype._projectionRemoveMany = function _projectionRemoveMany(viewsToRemove, returnToCache) {
        var _this7 = this || _global;

        viewsToRemove.forEach(function (view) {
          return _this7.remove(view, returnToCache);
        });
      };

      ViewSlot.prototype._projectionRemoveAll = function _projectionRemoveAll(returnToCache) {
        ShadowDOM.undistributeAll((this || _global).projectToSlots, this || _global);
        var children = (this || _global).children;
        var ii = children.length;

        for (var i = 0; i < ii; ++i) {
          if (returnToCache) {
            children[i].returnToCache();
          } else if ((this || _global).isAttached) {
            children[i].detached();
          }
        }

        (this || _global).children = [];
      };

      return ViewSlot;
    }();

    var ProviderResolver = (0, _aureliaDependencyInjection.resolver)(_class12 = function () {
      function ProviderResolver() {}

      ProviderResolver.prototype.get = function get(container, key) {
        var id = key.__providerId__;
        return id in container ? container[id] : container[id] = container.invoke(key);
      };

      return ProviderResolver;
    }()) || _class12;

    var providerResolverInstance = new ProviderResolver();

    function elementContainerGet(key) {
      if (key === _aureliaPal.DOM.Element) {
        return (this || _global).element;
      }

      if (key === BoundViewFactory) {
        if ((this || _global).boundViewFactory) {
          return (this || _global).boundViewFactory;
        }

        var factory = (this || _global).instruction.viewFactory;
        var _partReplacements = (this || _global).partReplacements;

        if (_partReplacements) {
          factory = _partReplacements[factory.part] || factory;
        }

        (this || _global).boundViewFactory = new BoundViewFactory(this || _global, factory, _partReplacements);
        return (this || _global).boundViewFactory;
      }

      if (key === ViewSlot) {
        if ((this || _global).viewSlot === undefined) {
          (this || _global).viewSlot = new ViewSlot((this || _global).element, (this || _global).instruction.anchorIsContainer);
          (this || _global).element.isContentProjectionSource = (this || _global).instruction.lifting;

          (this || _global).children.push((this || _global).viewSlot);
        }

        return (this || _global).viewSlot;
      }

      if (key === ElementEvents) {
        return (this || _global).elementEvents || ((this || _global).elementEvents = new ElementEvents((this || _global).element));
      }

      if (key === CompositionTransaction) {
        return (this || _global).compositionTransaction || ((this || _global).compositionTransaction = (this || _global).parent.get(key));
      }

      if (key === ViewResources) {
        return (this || _global).viewResources;
      }

      if (key === TargetInstruction) {
        return (this || _global).instruction;
      }

      return this.superGet(key);
    }

    function createElementContainer(parent, element, instruction, children, partReplacements, resources) {
      var container = parent.createChild();
      var providers = void 0;
      var i = void 0;
      container.element = element;
      container.instruction = instruction;
      container.children = children;
      container.viewResources = resources;
      container.partReplacements = partReplacements;
      providers = instruction.providers;
      i = providers.length;

      while (i--) {
        container._resolvers.set(providers[i], providerResolverInstance);
      }

      container.superGet = container.get;
      container.get = elementContainerGet;
      return container;
    }

    function hasAttribute(name) {
      return (this || _global)._element.hasAttribute(name);
    }

    function getAttribute(name) {
      return (this || _global)._element.getAttribute(name);
    }

    function setAttribute(name, value) {
      (this || _global)._element.setAttribute(name, value);
    }

    function makeElementIntoAnchor(element, elementInstruction) {
      var anchor = _aureliaPal.DOM.createComment('anchor');

      if (elementInstruction) {
        var firstChild = element.firstChild;

        if (firstChild && firstChild.tagName === 'AU-CONTENT') {
          anchor.contentElement = firstChild;
        }

        anchor._element = element;
        anchor.hasAttribute = hasAttribute;
        anchor.getAttribute = getAttribute;
        anchor.setAttribute = setAttribute;
      }

      _aureliaPal.DOM.replaceNode(anchor, element);

      return anchor;
    }

    function applyInstructions(containers, element, instruction, controllers, bindings, children, shadowSlots, partReplacements, resources) {
      var behaviorInstructions = instruction.behaviorInstructions;
      var expressions = instruction.expressions;
      var elementContainer = void 0;
      var i = void 0;
      var ii = void 0;
      var current = void 0;
      var instance = void 0;

      if (instruction.contentExpression) {
        bindings.push(instruction.contentExpression.createBinding(element.nextSibling));
        element.nextSibling.auInterpolationTarget = true;
        element.parentNode.removeChild(element);
        return;
      }

      if (instruction.shadowSlot) {
        var commentAnchor = _aureliaPal.DOM.createComment('slot');

        var slot = void 0;

        if (instruction.slotDestination) {
          slot = new PassThroughSlot(commentAnchor, instruction.slotName, instruction.slotDestination, instruction.slotFallbackFactory);
        } else {
          slot = new ShadowSlot(commentAnchor, instruction.slotName, instruction.slotFallbackFactory);
        }

        _aureliaPal.DOM.replaceNode(commentAnchor, element);

        shadowSlots[instruction.slotName] = slot;
        controllers.push(slot);
        return;
      }

      if (instruction.letElement) {
        for (i = 0, ii = expressions.length; i < ii; ++i) {
          bindings.push(expressions[i].createBinding());
        }

        element.parentNode.removeChild(element);
        return;
      }

      if (behaviorInstructions.length) {
        if (!instruction.anchorIsContainer) {
          element = makeElementIntoAnchor(element, instruction.elementInstruction);
        }

        containers[instruction.injectorId] = elementContainer = createElementContainer(containers[instruction.parentInjectorId], element, instruction, children, partReplacements, resources);

        for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
          current = behaviorInstructions[i];
          instance = current.type.create(elementContainer, current, element, bindings);
          controllers.push(instance);
        }
      }

      for (i = 0, ii = expressions.length; i < ii; ++i) {
        bindings.push(expressions[i].createBinding(element));
      }
    }

    function styleStringToObject(style, target) {
      var attributes = style.split(';');
      var firstIndexOfColon = void 0;
      var i = void 0;
      var current = void 0;
      var key = void 0;
      var value = void 0;
      target = target || {};

      for (i = 0; i < attributes.length; i++) {
        current = attributes[i];
        firstIndexOfColon = current.indexOf(':');
        key = current.substring(0, firstIndexOfColon).trim();
        value = current.substring(firstIndexOfColon + 1).trim();
        target[key] = value;
      }

      return target;
    }

    function styleObjectToString(obj) {
      var result = '';

      for (var _key4 in obj) {
        result += _key4 + ':' + obj[_key4] + ';';
      }

      return result;
    }

    function applySurrogateInstruction(container, element, instruction, controllers, bindings, children) {
      var behaviorInstructions = instruction.behaviorInstructions;
      var expressions = instruction.expressions;
      var providers = instruction.providers;
      var values = instruction.values;
      var i = void 0;
      var ii = void 0;
      var current = void 0;
      var instance = void 0;
      var currentAttributeValue = void 0;
      i = providers.length;

      while (i--) {
        container._resolvers.set(providers[i], providerResolverInstance);
      }

      for (var _key5 in values) {
        currentAttributeValue = element.getAttribute(_key5);

        if (currentAttributeValue) {
          if (_key5 === 'class') {
            element.setAttribute('class', currentAttributeValue + ' ' + values[_key5]);
          } else if (_key5 === 'style') {
            var styleObject = styleStringToObject(values[_key5]);
            styleStringToObject(currentAttributeValue, styleObject);
            element.setAttribute('style', styleObjectToString(styleObject));
          }
        } else {
          element.setAttribute(_key5, values[_key5]);
        }
      }

      if (behaviorInstructions.length) {
        for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
          current = behaviorInstructions[i];
          instance = current.type.create(container, current, element, bindings);

          if (instance.contentView) {
            children.push(instance.contentView);
          }

          controllers.push(instance);
        }
      }

      for (i = 0, ii = expressions.length; i < ii; ++i) {
        bindings.push(expressions[i].createBinding(element));
      }
    }

    var BoundViewFactory = exports.BoundViewFactory = function () {
      function BoundViewFactory(parentContainer, viewFactory, partReplacements) {
        (this || _global).parentContainer = parentContainer;
        (this || _global).viewFactory = viewFactory;
        (this || _global).factoryCreateInstruction = {
          partReplacements: partReplacements
        };
      }

      BoundViewFactory.prototype.create = function create() {
        var view = (this || _global).viewFactory.create((this || _global).parentContainer.createChild(), (this || _global).factoryCreateInstruction);

        view._isUserControlled = true;
        return view;
      };

      BoundViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
        (this || _global).viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
      };

      BoundViewFactory.prototype.getCachedView = function getCachedView() {
        return (this || _global).viewFactory.getCachedView();
      };

      BoundViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
        (this || _global).viewFactory.returnViewToCache(view);
      };

      _createClass(BoundViewFactory, [{
        key: 'isCaching',
        get: function get() {
          return (this || _global).viewFactory.isCaching;
        }
      }]);

      return BoundViewFactory;
    }();

    var ViewFactory = exports.ViewFactory = function () {
      function ViewFactory(template, instructions, resources) {
        (this || _global).isCaching = false;
        (this || _global).template = template;
        (this || _global).instructions = instructions;
        (this || _global).resources = resources;
        (this || _global).cacheSize = -1;
        (this || _global).cache = null;
      }

      ViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
        if (size) {
          if (size === '*') {
            size = Number.MAX_VALUE;
          } else if (typeof size === 'string') {
            size = parseInt(size, 10);
          }
        }

        if ((this || _global).cacheSize === -1 || !doNotOverrideIfAlreadySet) {
          (this || _global).cacheSize = size;
        }

        if ((this || _global).cacheSize > 0) {
          (this || _global).cache = [];
        } else {
          (this || _global).cache = null;
        }

        (this || _global).isCaching = (this || _global).cacheSize > 0;
      };

      ViewFactory.prototype.getCachedView = function getCachedView() {
        return (this || _global).cache !== null ? (this || _global).cache.pop() || null : null;
      };

      ViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
        if (view.isAttached) {
          view.detached();
        }

        if (view.isBound) {
          view.unbind();
        }

        if ((this || _global).cache !== null && (this || _global).cache.length < (this || _global).cacheSize) {
          view.fromCache = true;

          (this || _global).cache.push(view);
        }
      };

      ViewFactory.prototype.create = function create(container, createInstruction, element) {
        createInstruction = createInstruction || BehaviorInstruction.normal;
        var cachedView = this.getCachedView();

        if (cachedView !== null) {
          return cachedView;
        }

        var fragment = createInstruction.enhance ? (this || _global).template : (this || _global).template.cloneNode(true);
        var instructables = fragment.querySelectorAll('.au-target');
        var instructions = (this || _global).instructions;
        var resources = (this || _global).resources;
        var controllers = [];
        var bindings = [];
        var children = [];
        var shadowSlots = Object.create(null);
        var containers = {
          root: container
        };
        var partReplacements = createInstruction.partReplacements;
        var i = void 0;
        var ii = void 0;
        var view = void 0;
        var instructable = void 0;
        var instruction = void 0;

        (this || _global).resources._invokeHook('beforeCreate', this || _global, container, fragment, createInstruction);

        if (element && (this || _global).surrogateInstruction !== null) {
          applySurrogateInstruction(container, element, (this || _global).surrogateInstruction, controllers, bindings, children);
        }

        if (createInstruction.enhance && fragment.hasAttribute('au-target-id')) {
          instructable = fragment;
          instruction = instructions[instructable.getAttribute('au-target-id')];
          applyInstructions(containers, instructable, instruction, controllers, bindings, children, shadowSlots, partReplacements, resources);
        }

        for (i = 0, ii = instructables.length; i < ii; ++i) {
          instructable = instructables[i];
          instruction = instructions[instructable.getAttribute('au-target-id')];
          applyInstructions(containers, instructable, instruction, controllers, bindings, children, shadowSlots, partReplacements, resources);
        }

        view = new View(container, this || _global, fragment, controllers, bindings, children, shadowSlots);

        if (!createInstruction.initiatedByBehavior) {
          view.created();
        }

        (this || _global).resources._invokeHook('afterCreate', view);

        return view;
      };

      return ViewFactory;
    }();

    var nextInjectorId = 0;

    function getNextInjectorId() {
      return ++nextInjectorId;
    }

    var lastAUTargetID = 0;

    function getNextAUTargetID() {
      return (++lastAUTargetID).toString();
    }

    function makeIntoInstructionTarget(element) {
      var value = element.getAttribute('class');
      var auTargetID = getNextAUTargetID();
      element.setAttribute('class', value ? value + ' au-target' : 'au-target');
      element.setAttribute('au-target-id', auTargetID);
      return auTargetID;
    }

    function makeShadowSlot(compiler, resources, node, instructions, parentInjectorId) {
      var auShadowSlot = _aureliaPal.DOM.createElement('au-shadow-slot');

      _aureliaPal.DOM.replaceNode(auShadowSlot, node);

      var auTargetID = makeIntoInstructionTarget(auShadowSlot);
      var instruction = TargetInstruction.shadowSlot(parentInjectorId);
      instruction.slotName = node.getAttribute('name') || ShadowDOM.defaultSlotKey;
      instruction.slotDestination = node.getAttribute('slot');

      if (node.innerHTML.trim()) {
        var fragment = _aureliaPal.DOM.createDocumentFragment();

        var _child4 = void 0;

        while (_child4 = node.firstChild) {
          fragment.appendChild(_child4);
        }

        instruction.slotFallbackFactory = compiler.compile(fragment, resources);
      }

      instructions[auTargetID] = instruction;
      return auShadowSlot;
    }

    var defaultLetHandler = BindingLanguage.prototype.createLetExpressions;

    var ViewCompiler = exports.ViewCompiler = function () {
      ViewCompiler.inject = function inject() {
        return [BindingLanguage, ViewResources];
      };

      function ViewCompiler(bindingLanguage, resources) {
        (this || _global).bindingLanguage = bindingLanguage;
        (this || _global).resources = resources;
      }

      ViewCompiler.prototype.compile = function compile(source, resources, compileInstruction) {
        resources = resources || (this || _global).resources;
        compileInstruction = compileInstruction || ViewCompileInstruction.normal;
        source = typeof source === 'string' ? _aureliaPal.DOM.createTemplateFromMarkup(source) : source;
        var content = void 0;
        var part = void 0;
        var cacheSize = void 0;

        if (source.content) {
          part = source.getAttribute('part');
          cacheSize = source.getAttribute('view-cache');
          content = _aureliaPal.DOM.adoptNode(source.content);
        } else {
          content = source;
        }

        compileInstruction.targetShadowDOM = compileInstruction.targetShadowDOM && _aureliaPal.FEATURE.shadowDOM;

        resources._invokeHook('beforeCompile', content, resources, compileInstruction);

        var instructions = {};

        this._compileNode(content, resources, instructions, source, 'root', !compileInstruction.targetShadowDOM);

        var firstChild = content.firstChild;

        if (firstChild && firstChild.nodeType === 1) {
          var targetId = firstChild.getAttribute('au-target-id');

          if (targetId) {
            var ins = instructions[targetId];

            if (ins.shadowSlot || ins.lifting || ins.elementInstruction && !ins.elementInstruction.anchorIsContainer) {
              content.insertBefore(_aureliaPal.DOM.createComment('view'), firstChild);
            }
          }
        }

        var factory = new ViewFactory(content, instructions, resources);
        factory.surrogateInstruction = compileInstruction.compileSurrogate ? this._compileSurrogate(source, resources) : null;
        factory.part = part;

        if (cacheSize) {
          factory.setCacheSize(cacheSize);
        }

        resources._invokeHook('afterCompile', factory);

        return factory;
      };

      ViewCompiler.prototype._compileNode = function _compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
        switch (node.nodeType) {
          case 1:
            return this._compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);

          case 3:
            var expression = resources.getBindingLanguage((this || _global).bindingLanguage).inspectTextContent(resources, node.wholeText);

            if (expression) {
              var marker = _aureliaPal.DOM.createElement('au-marker');

              var auTargetID = makeIntoInstructionTarget(marker);
              (node.parentNode || parentNode).insertBefore(marker, node);
              node.textContent = ' ';
              instructions[auTargetID] = TargetInstruction.contentExpression(expression);

              while (node.nextSibling && node.nextSibling.nodeType === 3) {
                (node.parentNode || parentNode).removeChild(node.nextSibling);
              }
            } else {
              while (node.nextSibling && node.nextSibling.nodeType === 3) {
                node = node.nextSibling;
              }
            }

            return node.nextSibling;

          case 11:
            var currentChild = node.firstChild;

            while (currentChild) {
              currentChild = this._compileNode(currentChild, resources, instructions, node, parentInjectorId, targetLightDOM);
            }

            break;

          default:
            break;
        }

        return node.nextSibling;
      };

      ViewCompiler.prototype._compileSurrogate = function _compileSurrogate(node, resources) {
        var tagName = node.tagName.toLowerCase();
        var attributes = node.attributes;
        var bindingLanguage = resources.getBindingLanguage((this || _global).bindingLanguage);
        var knownAttribute = void 0;
        var property = void 0;
        var instruction = void 0;
        var i = void 0;
        var ii = void 0;
        var attr = void 0;
        var attrName = void 0;
        var attrValue = void 0;
        var info = void 0;
        var type = void 0;
        var expressions = [];
        var expression = void 0;
        var behaviorInstructions = [];
        var values = {};
        var hasValues = false;
        var providers = [];

        for (i = 0, ii = attributes.length; i < ii; ++i) {
          attr = attributes[i];
          attrName = attr.name;
          attrValue = attr.value;
          info = bindingLanguage.inspectAttribute(resources, tagName, attrName, attrValue);
          type = resources.getAttribute(info.attrName);

          if (type) {
            knownAttribute = resources.mapAttribute(info.attrName);

            if (knownAttribute) {
              property = type.attributes[knownAttribute];

              if (property) {
                info.defaultBindingMode = property.defaultBindingMode;

                if (!info.command && !info.expression) {
                  info.command = property.hasOptions ? 'options' : null;
                }

                if (info.command && info.command !== 'options' && type.primaryProperty) {
                  var _primaryProperty = type.primaryProperty;
                  attrName = info.attrName = _primaryProperty.attribute;
                  info.defaultBindingMode = _primaryProperty.defaultBindingMode;
                }
              }
            }
          }

          instruction = bindingLanguage.createAttributeInstruction(resources, node, info, undefined, type);

          if (instruction) {
            if (instruction.alteredAttr) {
              type = resources.getAttribute(instruction.attrName);
            }

            if (instruction.discrete) {
              expressions.push(instruction);
            } else {
              if (type) {
                instruction.type = type;

                this._configureProperties(instruction, resources);

                if (type.liftsContent) {
                  throw new Error('You cannot place a template controller on a surrogate element.');
                } else {
                  behaviorInstructions.push(instruction);
                }
              } else {
                expressions.push(instruction.attributes[instruction.attrName]);
              }
            }
          } else {
            if (type) {
              instruction = BehaviorInstruction.attribute(attrName, type);
              instruction.attributes[resources.mapAttribute(attrName)] = attrValue;

              if (type.liftsContent) {
                throw new Error('You cannot place a template controller on a surrogate element.');
              } else {
                behaviorInstructions.push(instruction);
              }
            } else if (attrName !== 'id' && attrName !== 'part' && attrName !== 'replace-part') {
              hasValues = true;
              values[attrName] = attrValue;
            }
          }
        }

        if (expressions.length || behaviorInstructions.length || hasValues) {
          for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
            instruction = behaviorInstructions[i];
            instruction.type.compile(this || _global, resources, node, instruction);
            providers.push(instruction.type.target);
          }

          for (i = 0, ii = expressions.length; i < ii; ++i) {
            expression = expressions[i];

            if (expression.attrToRemove !== undefined) {
              node.removeAttribute(expression.attrToRemove);
            }
          }

          return TargetInstruction.surrogate(providers, behaviorInstructions, expressions, values);
        }

        return null;
      };

      ViewCompiler.prototype._compileElement = function _compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
        var tagName = node.tagName.toLowerCase();
        var attributes = node.attributes;
        var expressions = [];
        var expression = void 0;
        var behaviorInstructions = [];
        var providers = [];
        var bindingLanguage = resources.getBindingLanguage((this || _global).bindingLanguage);
        var liftingInstruction = void 0;
        var viewFactory = void 0;
        var type = void 0;
        var elementInstruction = void 0;
        var elementProperty = void 0;
        var i = void 0;
        var ii = void 0;
        var attr = void 0;
        var attrName = void 0;
        var attrValue = void 0;
        var originalAttrName = void 0;
        var instruction = void 0;
        var info = void 0;
        var property = void 0;
        var knownAttribute = void 0;
        var auTargetID = void 0;
        var injectorId = void 0;

        if (tagName === 'slot') {
          if (targetLightDOM) {
            node = makeShadowSlot(this || _global, resources, node, instructions, parentInjectorId);
          }

          return node.nextSibling;
        } else if (tagName === 'template') {
          if (!('content' in node)) {
            throw new Error('You cannot place a template element within ' + node.namespaceURI + ' namespace');
          }

          viewFactory = this.compile(node, resources);
          viewFactory.part = node.getAttribute('part');
        } else {
          type = resources.getElement(node.getAttribute('as-element') || tagName);

          if (tagName === 'let' && !type && bindingLanguage.createLetExpressions !== defaultLetHandler) {
            expressions = bindingLanguage.createLetExpressions(resources, node);
            auTargetID = makeIntoInstructionTarget(node);
            instructions[auTargetID] = TargetInstruction.letElement(expressions);
            return node.nextSibling;
          }

          if (type) {
            elementInstruction = BehaviorInstruction.element(node, type);
            type.processAttributes(this || _global, resources, node, attributes, elementInstruction);
            behaviorInstructions.push(elementInstruction);
          }
        }

        for (i = 0, ii = attributes.length; i < ii; ++i) {
          attr = attributes[i];
          originalAttrName = attrName = attr.name;
          attrValue = attr.value;
          info = bindingLanguage.inspectAttribute(resources, tagName, attrName, attrValue);

          if (targetLightDOM && info.attrName === 'slot') {
            info.attrName = attrName = 'au-slot';
          }

          type = resources.getAttribute(info.attrName);
          elementProperty = null;

          if (type) {
            knownAttribute = resources.mapAttribute(info.attrName);

            if (knownAttribute) {
              property = type.attributes[knownAttribute];

              if (property) {
                info.defaultBindingMode = property.defaultBindingMode;

                if (!info.command && !info.expression) {
                  info.command = property.hasOptions ? 'options' : null;
                }

                if (info.command && info.command !== 'options' && type.primaryProperty) {
                  var _primaryProperty2 = type.primaryProperty;
                  attrName = info.attrName = _primaryProperty2.attribute;
                  info.defaultBindingMode = _primaryProperty2.defaultBindingMode;
                }
              }
            }
          } else if (elementInstruction) {
            elementProperty = elementInstruction.type.attributes[info.attrName];

            if (elementProperty) {
              info.defaultBindingMode = elementProperty.defaultBindingMode;
            }
          }

          if (elementProperty) {
            instruction = bindingLanguage.createAttributeInstruction(resources, node, info, elementInstruction);
          } else {
            instruction = bindingLanguage.createAttributeInstruction(resources, node, info, undefined, type);
          }

          if (instruction) {
            if (instruction.alteredAttr) {
              type = resources.getAttribute(instruction.attrName);
            }

            if (instruction.discrete) {
              expressions.push(instruction);
            } else {
              if (type) {
                instruction.type = type;

                this._configureProperties(instruction, resources);

                if (type.liftsContent) {
                  instruction.originalAttrName = originalAttrName;
                  liftingInstruction = instruction;
                  break;
                } else {
                  behaviorInstructions.push(instruction);
                }
              } else if (elementProperty) {
                elementInstruction.attributes[info.attrName].targetProperty = elementProperty.name;
              } else {
                expressions.push(instruction.attributes[instruction.attrName]);
              }
            }
          } else {
            if (type) {
              instruction = BehaviorInstruction.attribute(attrName, type);
              instruction.attributes[resources.mapAttribute(attrName)] = attrValue;

              if (type.liftsContent) {
                instruction.originalAttrName = originalAttrName;
                liftingInstruction = instruction;
                break;
              } else {
                behaviorInstructions.push(instruction);
              }
            } else if (elementProperty) {
              elementInstruction.attributes[attrName] = attrValue;
            }
          }
        }

        if (liftingInstruction) {
          liftingInstruction.viewFactory = viewFactory;
          node = liftingInstruction.type.compile(this || _global, resources, node, liftingInstruction, parentNode);
          auTargetID = makeIntoInstructionTarget(node);
          instructions[auTargetID] = TargetInstruction.lifting(parentInjectorId, liftingInstruction);
        } else {
          var skipContentProcessing = false;

          if (expressions.length || behaviorInstructions.length) {
            injectorId = behaviorInstructions.length ? getNextInjectorId() : false;

            for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
              instruction = behaviorInstructions[i];
              instruction.type.compile(this || _global, resources, node, instruction, parentNode);
              providers.push(instruction.type.target);
              skipContentProcessing = skipContentProcessing || instruction.skipContentProcessing;
            }

            for (i = 0, ii = expressions.length; i < ii; ++i) {
              expression = expressions[i];

              if (expression.attrToRemove !== undefined) {
                node.removeAttribute(expression.attrToRemove);
              }
            }

            auTargetID = makeIntoInstructionTarget(node);
            instructions[auTargetID] = TargetInstruction.normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction);
          }

          if (skipContentProcessing) {
            return node.nextSibling;
          }

          var currentChild = node.firstChild;

          while (currentChild) {
            currentChild = this._compileNode(currentChild, resources, instructions, node, injectorId || parentInjectorId, targetLightDOM);
          }
        }

        return node.nextSibling;
      };

      ViewCompiler.prototype._configureProperties = function _configureProperties(instruction, resources) {
        var type = instruction.type;
        var attrName = instruction.attrName;
        var attributes = instruction.attributes;
        var property = void 0;
        var key = void 0;
        var value = void 0;
        var knownAttribute = resources.mapAttribute(attrName);

        if (knownAttribute && attrName in attributes && knownAttribute !== attrName) {
          attributes[knownAttribute] = attributes[attrName];
          delete attributes[attrName];
        }

        for (key in attributes) {
          value = attributes[key];

          if (value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            property = type.attributes[key];

            if (property !== undefined) {
              value.targetProperty = property.name;
            } else {
              value.targetProperty = key;
            }
          }
        }
      };

      return ViewCompiler;
    }();

    var ResourceModule = exports.ResourceModule = function () {
      function ResourceModule(moduleId) {
        (this || _global).id = moduleId;
        (this || _global).moduleInstance = null;
        (this || _global).mainResource = null;
        (this || _global).resources = null;
        (this || _global).viewStrategy = null;
        (this || _global).isInitialized = false;
        (this || _global).onLoaded = null;
        (this || _global).loadContext = null;
      }

      ResourceModule.prototype.initialize = function initialize(container) {
        var current = (this || _global).mainResource;
        var resources = (this || _global).resources;
        var vs = (this || _global).viewStrategy;

        if ((this || _global).isInitialized) {
          return;
        }

        (this || _global).isInitialized = true;

        if (current !== undefined) {
          current.metadata.viewStrategy = vs;
          current.initialize(container);
        }

        for (var i = 0, ii = resources.length; i < ii; ++i) {
          current = resources[i];
          current.metadata.viewStrategy = vs;
          current.initialize(container);
        }
      };

      ResourceModule.prototype.register = function register(registry, name) {
        var main = (this || _global).mainResource;
        var resources = (this || _global).resources;

        if (main !== undefined) {
          main.register(registry, name);
          name = null;
        }

        for (var i = 0, ii = resources.length; i < ii; ++i) {
          resources[i].register(registry, name);
          name = null;
        }
      };

      ResourceModule.prototype.load = function load(container, loadContext) {
        if ((this || _global).onLoaded !== null) {
          return (this || _global).loadContext === loadContext ? Promise.resolve() : (this || _global).onLoaded;
        }

        var main = (this || _global).mainResource;
        var resources = (this || _global).resources;
        var loads = void 0;

        if (main !== undefined) {
          loads = new Array(resources.length + 1);
          loads[0] = main.load(container, loadContext);

          for (var i = 0, ii = resources.length; i < ii; ++i) {
            loads[i + 1] = resources[i].load(container, loadContext);
          }
        } else {
          loads = new Array(resources.length);

          for (var _i2 = 0, _ii = resources.length; _i2 < _ii; ++_i2) {
            loads[_i2] = resources[_i2].load(container, loadContext);
          }
        }

        (this || _global).loadContext = loadContext;
        (this || _global).onLoaded = Promise.all(loads);
        return (this || _global).onLoaded;
      };

      return ResourceModule;
    }();

    var ResourceDescription = exports.ResourceDescription = function () {
      function ResourceDescription(key, exportedValue, resourceTypeMeta) {
        if (!resourceTypeMeta) {
          resourceTypeMeta = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.resource, exportedValue);

          if (!resourceTypeMeta) {
            resourceTypeMeta = new HtmlBehaviorResource();
            resourceTypeMeta.elementName = _hyphenate(key);

            _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, resourceTypeMeta, exportedValue);
          }
        }

        if (resourceTypeMeta instanceof HtmlBehaviorResource) {
          if (resourceTypeMeta.elementName === undefined) {
            resourceTypeMeta.elementName = _hyphenate(key);
          } else if (resourceTypeMeta.attributeName === undefined) {
            resourceTypeMeta.attributeName = _hyphenate(key);
          } else if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
            HtmlBehaviorResource.convention(key, resourceTypeMeta);
          }
        } else if (!resourceTypeMeta.name) {
          resourceTypeMeta.name = _hyphenate(key);
        }

        (this || _global).metadata = resourceTypeMeta;
        (this || _global).value = exportedValue;
      }

      ResourceDescription.prototype.initialize = function initialize(container) {
        (this || _global).metadata.initialize(container, (this || _global).value);
      };

      ResourceDescription.prototype.register = function register(registry, name) {
        (this || _global).metadata.register(registry, name);
      };

      ResourceDescription.prototype.load = function load(container, loadContext) {
        return (this || _global).metadata.load(container, (this || _global).value, loadContext);
      };

      return ResourceDescription;
    }();

    var ModuleAnalyzer = exports.ModuleAnalyzer = function () {
      function ModuleAnalyzer() {
        (this || _global).cache = Object.create(null);
      }

      ModuleAnalyzer.prototype.getAnalysis = function getAnalysis(moduleId) {
        return (this || _global).cache[moduleId];
      };

      ModuleAnalyzer.prototype.analyze = function analyze(moduleId, moduleInstance, mainResourceKey) {
        var mainResource = void 0;
        var fallbackValue = void 0;
        var fallbackKey = void 0;
        var resourceTypeMeta = void 0;
        var key = void 0;
        var exportedValue = void 0;
        var resources = [];
        var conventional = void 0;
        var vs = void 0;
        var resourceModule = void 0;
        resourceModule = (this || _global).cache[moduleId];

        if (resourceModule) {
          return resourceModule;
        }

        resourceModule = new ResourceModule(moduleId);
        (this || _global).cache[moduleId] = resourceModule;

        if (typeof moduleInstance === 'function') {
          moduleInstance = {
            'default': moduleInstance
          };
        }

        if (mainResourceKey) {
          mainResource = new ResourceDescription(mainResourceKey, moduleInstance[mainResourceKey]);
        }

        for (key in moduleInstance) {
          exportedValue = moduleInstance[key];

          if (key === mainResourceKey || typeof exportedValue !== 'function') {
            continue;
          }

          resourceTypeMeta = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.resource, exportedValue);

          if (resourceTypeMeta) {
            if (resourceTypeMeta instanceof HtmlBehaviorResource) {
              ViewResources.convention(exportedValue, resourceTypeMeta);

              if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
                HtmlBehaviorResource.convention(key, resourceTypeMeta);
              }

              if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
                resourceTypeMeta.elementName = _hyphenate(key);
              }
            }

            if (!mainResource && resourceTypeMeta instanceof HtmlBehaviorResource && resourceTypeMeta.elementName !== null) {
              mainResource = new ResourceDescription(key, exportedValue, resourceTypeMeta);
            } else {
              resources.push(new ResourceDescription(key, exportedValue, resourceTypeMeta));
            }
          } else if (viewStrategy.decorates(exportedValue)) {
            vs = exportedValue;
          } else if (exportedValue instanceof _aureliaLoader.TemplateRegistryEntry) {
            vs = new TemplateRegistryViewStrategy(moduleId, exportedValue);
          } else {
            if (conventional = ViewResources.convention(exportedValue)) {
              if (conventional.elementName !== null && !mainResource) {
                mainResource = new ResourceDescription(key, exportedValue, conventional);
              } else {
                resources.push(new ResourceDescription(key, exportedValue, conventional));
              }

              _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
            } else if (conventional = HtmlBehaviorResource.convention(key)) {
              if (conventional.elementName !== null && !mainResource) {
                mainResource = new ResourceDescription(key, exportedValue, conventional);
              } else {
                resources.push(new ResourceDescription(key, exportedValue, conventional));
              }

              _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
            } else if (conventional = _aureliaBinding.ValueConverterResource.convention(key) || _aureliaBinding.BindingBehaviorResource.convention(key) || ViewEngineHooksResource.convention(key)) {
              resources.push(new ResourceDescription(key, exportedValue, conventional));

              _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
            } else if (!fallbackValue) {
              fallbackValue = exportedValue;
              fallbackKey = key;
            }
          }
        }

        if (!mainResource && fallbackValue) {
          mainResource = new ResourceDescription(fallbackKey, fallbackValue);
        }

        resourceModule.moduleInstance = moduleInstance;
        resourceModule.mainResource = mainResource;
        resourceModule.resources = resources;
        resourceModule.viewStrategy = vs;
        return resourceModule;
      };

      return ModuleAnalyzer;
    }();

    var logger = LogManager.getLogger('templating');

    function ensureRegistryEntry(loader, urlOrRegistryEntry) {
      if (urlOrRegistryEntry instanceof _aureliaLoader.TemplateRegistryEntry) {
        return Promise.resolve(urlOrRegistryEntry);
      }

      return loader.loadTemplate(urlOrRegistryEntry);
    }

    var ProxyViewFactory = function () {
      function ProxyViewFactory(promise) {
        var _this8 = this || _global;

        promise.then(function (x) {
          return _this8.viewFactory = x;
        });
      }

      ProxyViewFactory.prototype.create = function create(container, bindingContext, createInstruction, element) {
        return (this || _global).viewFactory.create(container, bindingContext, createInstruction, element);
      };

      ProxyViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
        (this || _global).viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
      };

      ProxyViewFactory.prototype.getCachedView = function getCachedView() {
        return (this || _global).viewFactory.getCachedView();
      };

      ProxyViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
        (this || _global).viewFactory.returnViewToCache(view);
      };

      _createClass(ProxyViewFactory, [{
        key: 'isCaching',
        get: function get() {
          return (this || _global).viewFactory.isCaching;
        }
      }]);

      return ProxyViewFactory;
    }();

    var auSlotBehavior = null;
    var ViewEngine = exports.ViewEngine = (_temp5 = _class14 = function () {
      ViewEngine.inject = function inject() {
        return [_aureliaLoader.Loader, _aureliaDependencyInjection.Container, ViewCompiler, ModuleAnalyzer, ViewResources];
      };

      function ViewEngine(loader, container, viewCompiler, moduleAnalyzer, appResources) {
        (this || _global).loader = loader;
        (this || _global).container = container;
        (this || _global).viewCompiler = viewCompiler;
        (this || _global).moduleAnalyzer = moduleAnalyzer;
        (this || _global).appResources = appResources;
        (this || _global)._pluginMap = {};

        if (auSlotBehavior === null) {
          auSlotBehavior = new HtmlBehaviorResource();
          auSlotBehavior.attributeName = 'au-slot';

          _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, auSlotBehavior, SlotCustomAttribute);
        }

        auSlotBehavior.initialize(container, SlotCustomAttribute);
        auSlotBehavior.register(appResources);
      }

      ViewEngine.prototype.addResourcePlugin = function addResourcePlugin(extension, implementation) {
        var name = extension.replace('.', '') + '-resource-plugin';
        (this || _global)._pluginMap[extension] = name;

        (this || _global).loader.addPlugin(name, implementation);
      };

      ViewEngine.prototype.loadViewFactory = function loadViewFactory(urlOrRegistryEntry, compileInstruction, loadContext, target) {
        var _this9 = this || _global;

        loadContext = loadContext || new ResourceLoadContext();
        return ensureRegistryEntry((this || _global).loader, urlOrRegistryEntry).then(function (registryEntry) {
          var url = registryEntry.address;

          if (registryEntry.onReady) {
            if (!loadContext.hasDependency(url)) {
              loadContext.addDependency(url);
              return registryEntry.onReady;
            }

            if (registryEntry.template === null) {
              return registryEntry.onReady;
            }

            return Promise.resolve(new ProxyViewFactory(registryEntry.onReady));
          }

          loadContext.addDependency(url);
          registryEntry.onReady = _this9.loadTemplateResources(registryEntry, compileInstruction, loadContext, target).then(function (resources) {
            registryEntry.resources = resources;

            if (registryEntry.template === null) {
              return registryEntry.factory = null;
            }

            var viewFactory = _this9.viewCompiler.compile(registryEntry.template, resources, compileInstruction);

            return registryEntry.factory = viewFactory;
          });
          return registryEntry.onReady;
        });
      };

      ViewEngine.prototype.loadTemplateResources = function loadTemplateResources(registryEntry, compileInstruction, loadContext, target) {
        var resources = new ViewResources((this || _global).appResources, registryEntry.address);
        var dependencies = registryEntry.dependencies;
        var importIds = void 0;
        var names = void 0;
        compileInstruction = compileInstruction || ViewCompileInstruction.normal;

        if (dependencies.length === 0 && !compileInstruction.associatedModuleId) {
          return Promise.resolve(resources);
        }

        importIds = dependencies.map(function (x) {
          return x.src;
        });
        names = dependencies.map(function (x) {
          return x.name;
        });
        logger.debug('importing resources for ' + registryEntry.address, importIds);

        if (target) {
          var viewModelRequires = _aureliaMetadata.metadata.get(ViewEngine.viewModelRequireMetadataKey, target);

          if (viewModelRequires) {
            var templateImportCount = importIds.length;

            for (var i = 0, ii = viewModelRequires.length; i < ii; ++i) {
              var req = viewModelRequires[i];
              var importId = typeof req === 'function' ? _aureliaMetadata.Origin.get(req).moduleId : (0, _aureliaPath.relativeToFile)(req.src || req, registryEntry.address);

              if (importIds.indexOf(importId) === -1) {
                importIds.push(importId);
                names.push(req.as);
              }
            }

            logger.debug('importing ViewModel resources for ' + compileInstruction.associatedModuleId, importIds.slice(templateImportCount));
          }
        }

        return this.importViewResources(importIds, names, resources, compileInstruction, loadContext);
      };

      ViewEngine.prototype.importViewModelResource = function importViewModelResource(moduleImport, moduleMember) {
        var _this10 = this || _global;

        return (this || _global).loader.loadModule(moduleImport).then(function (viewModelModule) {
          var normalizedId = _aureliaMetadata.Origin.get(viewModelModule).moduleId;

          var resourceModule = _this10.moduleAnalyzer.analyze(normalizedId, viewModelModule, moduleMember);

          if (!resourceModule.mainResource) {
            throw new Error('No view model found in module "' + moduleImport + '".');
          }

          resourceModule.initialize(_this10.container);
          return resourceModule.mainResource;
        });
      };

      ViewEngine.prototype.importViewResources = function importViewResources(moduleIds, names, resources, compileInstruction, loadContext) {
        var _this11 = this || _global;

        loadContext = loadContext || new ResourceLoadContext();
        compileInstruction = compileInstruction || ViewCompileInstruction.normal;
        moduleIds = moduleIds.map(function (x) {
          return _this11._applyLoaderPlugin(x);
        });
        return (this || _global).loader.loadAllModules(moduleIds).then(function (imports) {
          var i = void 0;
          var ii = void 0;
          var analysis = void 0;
          var normalizedId = void 0;
          var current = void 0;
          var associatedModule = void 0;
          var container = _this11.container;
          var moduleAnalyzer = _this11.moduleAnalyzer;
          var allAnalysis = new Array(imports.length);

          for (i = 0, ii = imports.length; i < ii; ++i) {
            current = imports[i];
            normalizedId = _aureliaMetadata.Origin.get(current).moduleId;
            analysis = moduleAnalyzer.analyze(normalizedId, current);
            analysis.initialize(container);
            analysis.register(resources, names[i]);
            allAnalysis[i] = analysis;
          }

          if (compileInstruction.associatedModuleId) {
            associatedModule = moduleAnalyzer.getAnalysis(compileInstruction.associatedModuleId);

            if (associatedModule) {
              associatedModule.register(resources);
            }
          }

          for (i = 0, ii = allAnalysis.length; i < ii; ++i) {
            allAnalysis[i] = allAnalysis[i].load(container, loadContext);
          }

          return Promise.all(allAnalysis).then(function () {
            return resources;
          });
        });
      };

      ViewEngine.prototype._applyLoaderPlugin = function _applyLoaderPlugin(id) {
        var index = id.lastIndexOf('.');

        if (index !== -1) {
          var ext = id.substring(index);
          var pluginName = (this || _global)._pluginMap[ext];

          if (pluginName === undefined) {
            return id;
          }

          return (this || _global).loader.applyPluginToUrl(id, pluginName);
        }

        return id;
      };

      return ViewEngine;
    }(), _class14.viewModelRequireMetadataKey = 'aurelia:view-model-require', _temp5);

    var Controller = exports.Controller = function () {
      function Controller(behavior, instruction, viewModel, container) {
        (this || _global).behavior = behavior;
        (this || _global).instruction = instruction;
        (this || _global).viewModel = viewModel;
        (this || _global).isAttached = false;
        (this || _global).view = null;
        (this || _global).isBound = false;
        (this || _global).scope = null;
        (this || _global).container = container;
        (this || _global).elementEvents = container.elementEvents || null;
        var observerLookup = behavior.observerLocator.getOrCreateObserversLookup(viewModel);
        var handlesBind = behavior.handlesBind;
        var attributes = instruction.attributes;
        var boundProperties = (this || _global).boundProperties = [];
        var properties = behavior.properties;
        var i = void 0;
        var ii = void 0;

        behavior._ensurePropertiesDefined(viewModel, observerLookup);

        for (i = 0, ii = properties.length; i < ii; ++i) {
          properties[i]._initialize(viewModel, observerLookup, attributes, handlesBind, boundProperties);
        }
      }

      Controller.prototype.created = function created(owningView) {
        if ((this || _global).behavior.handlesCreated) {
          (this || _global).viewModel.created(owningView, (this || _global).view);
        }
      };

      Controller.prototype.automate = function automate(overrideContext, owningView) {
        (this || _global).view.bindingContext = (this || _global).viewModel;
        (this || _global).view.overrideContext = overrideContext || (0, _aureliaBinding.createOverrideContext)((this || _global).viewModel);
        (this || _global).view._isUserControlled = true;

        if ((this || _global).behavior.handlesCreated) {
          (this || _global).viewModel.created(owningView || null, (this || _global).view);
        }

        this.bind((this || _global).view);
      };

      Controller.prototype.bind = function bind(scope) {
        var skipSelfSubscriber = (this || _global).behavior.handlesBind;
        var boundProperties = (this || _global).boundProperties;
        var i = void 0;
        var ii = void 0;
        var x = void 0;
        var observer = void 0;
        var selfSubscriber = void 0;

        if ((this || _global).isBound) {
          if ((this || _global).scope === scope) {
            return;
          }

          this.unbind();
        }

        (this || _global).isBound = true;
        (this || _global).scope = scope;

        for (i = 0, ii = boundProperties.length; i < ii; ++i) {
          x = boundProperties[i];
          observer = x.observer;
          selfSubscriber = observer.selfSubscriber;
          observer.publishing = false;

          if (skipSelfSubscriber) {
            observer.selfSubscriber = null;
          }

          x.binding.bind(scope);
          observer.call();
          observer.publishing = true;
          observer.selfSubscriber = selfSubscriber;
        }

        var overrideContext = void 0;

        if ((this || _global).view !== null) {
          if (skipSelfSubscriber) {
            (this || _global).view.viewModelScope = scope;
          }

          if ((this || _global).viewModel === scope.overrideContext.bindingContext) {
            overrideContext = scope.overrideContext;
          } else if ((this || _global).instruction.inheritBindingContext) {
            overrideContext = (0, _aureliaBinding.createOverrideContext)((this || _global).viewModel, scope.overrideContext);
          } else {
            overrideContext = (0, _aureliaBinding.createOverrideContext)((this || _global).viewModel);
            overrideContext.__parentOverrideContext = scope.overrideContext;
          }

          (this || _global).view.bind((this || _global).viewModel, overrideContext);
        } else if (skipSelfSubscriber) {
          overrideContext = scope.overrideContext;

          if (scope.overrideContext.__parentOverrideContext !== undefined && (this || _global).viewModel.viewFactory && (this || _global).viewModel.viewFactory.factoryCreateInstruction.partReplacements) {
            overrideContext = Object.assign({}, scope.overrideContext);
            overrideContext.parentOverrideContext = scope.overrideContext.__parentOverrideContext;
          }

          (this || _global).viewModel.bind(scope.bindingContext, overrideContext);
        }
      };

      Controller.prototype.unbind = function unbind() {
        if ((this || _global).isBound) {
          var _boundProperties = (this || _global).boundProperties;

          var _i3 = void 0;

          var _ii2 = void 0;

          (this || _global).isBound = false;
          (this || _global).scope = null;

          if ((this || _global).view !== null) {
            (this || _global).view.unbind();
          }

          if ((this || _global).behavior.handlesUnbind) {
            (this || _global).viewModel.unbind();
          }

          if ((this || _global).elementEvents !== null) {
            (this || _global).elementEvents.disposeAll();
          }

          for (_i3 = 0, _ii2 = _boundProperties.length; _i3 < _ii2; ++_i3) {
            _boundProperties[_i3].binding.unbind();
          }
        }
      };

      Controller.prototype.attached = function attached() {
        if ((this || _global).isAttached) {
          return;
        }

        (this || _global).isAttached = true;

        if ((this || _global).behavior.handlesAttached) {
          (this || _global).viewModel.attached();
        }

        if ((this || _global).view !== null) {
          (this || _global).view.attached();
        }
      };

      Controller.prototype.detached = function detached() {
        if ((this || _global).isAttached) {
          (this || _global).isAttached = false;

          if ((this || _global).view !== null) {
            (this || _global).view.detached();
          }

          if ((this || _global).behavior.handlesDetached) {
            (this || _global).viewModel.detached();
          }
        }
      };

      return Controller;
    }();

    var BehaviorPropertyObserver = exports.BehaviorPropertyObserver = (_dec7 = (0, _aureliaBinding.subscriberCollection)(), _dec7(_class15 = function () {
      function BehaviorPropertyObserver(taskQueue, obj, propertyName, selfSubscriber, initialValue) {
        (this || _global).taskQueue = taskQueue;
        (this || _global).obj = obj;
        (this || _global).propertyName = propertyName;
        (this || _global).notqueued = true;
        (this || _global).publishing = false;
        (this || _global).selfSubscriber = selfSubscriber;
        (this || _global).currentValue = (this || _global).oldValue = initialValue;
      }

      BehaviorPropertyObserver.prototype.getValue = function getValue() {
        return (this || _global).currentValue;
      };

      BehaviorPropertyObserver.prototype.setValue = function setValue(newValue) {
        var oldValue = (this || _global).currentValue;

        if (!Object.is(newValue, oldValue)) {
          (this || _global).oldValue = oldValue;
          (this || _global).currentValue = newValue;

          if ((this || _global).publishing && (this || _global).notqueued) {
            if ((this || _global).taskQueue.flushing) {
              this.call();
            } else {
              (this || _global).notqueued = false;

              (this || _global).taskQueue.queueMicroTask(this || _global);
            }
          }
        }
      };

      BehaviorPropertyObserver.prototype.call = function call() {
        var oldValue = (this || _global).oldValue;
        var newValue = (this || _global).currentValue;
        (this || _global).notqueued = true;

        if (Object.is(newValue, oldValue)) {
          return;
        }

        if ((this || _global).selfSubscriber) {
          this.selfSubscriber(newValue, oldValue);
        }

        this.callSubscribers(newValue, oldValue);
        (this || _global).oldValue = newValue;
      };

      BehaviorPropertyObserver.prototype.subscribe = function subscribe(context, callable) {
        this.addSubscriber(context, callable);
      };

      BehaviorPropertyObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
        this.removeSubscriber(context, callable);
      };

      return BehaviorPropertyObserver;
    }()) || _class15);

    function getObserver(instance, name) {
      var lookup = instance.__observers__;

      if (lookup === undefined) {
        var ctor = Object.getPrototypeOf(instance).constructor;

        var _behavior = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.resource, ctor);

        if (!_behavior.isInitialized) {
          _behavior.initialize(_aureliaDependencyInjection.Container.instance || new _aureliaDependencyInjection.Container(), instance.constructor);
        }

        lookup = _behavior.observerLocator.getOrCreateObserversLookup(instance);

        _behavior._ensurePropertiesDefined(instance, lookup);
      }

      return lookup[name];
    }

    var BindableProperty = exports.BindableProperty = function () {
      function BindableProperty(nameOrConfig) {
        if (typeof nameOrConfig === 'string') {
          (this || _global).name = nameOrConfig;
        } else {
          Object.assign(this || _global, nameOrConfig);
        }

        (this || _global).attribute = (this || _global).attribute || _hyphenate((this || _global).name);
        var defaultBindingMode = (this || _global).defaultBindingMode;

        if (defaultBindingMode === null || defaultBindingMode === undefined) {
          (this || _global).defaultBindingMode = _aureliaBinding.bindingMode.oneWay;
        } else if (typeof defaultBindingMode === 'string') {
          (this || _global).defaultBindingMode = _aureliaBinding.bindingMode[defaultBindingMode] || _aureliaBinding.bindingMode.oneWay;
        }

        (this || _global).changeHandler = (this || _global).changeHandler || null;
        (this || _global).owner = null;
        (this || _global).descriptor = null;
      }

      BindableProperty.prototype.registerWith = function registerWith(target, behavior, descriptor) {
        behavior.properties.push(this || _global);
        behavior.attributes[(this || _global).attribute] = this || _global;
        (this || _global).owner = behavior;

        if (descriptor) {
          (this || _global).descriptor = descriptor;
          return this._configureDescriptor(descriptor);
        }

        return undefined;
      };

      BindableProperty.prototype._configureDescriptor = function _configureDescriptor(descriptor) {
        var name = (this || _global).name;
        descriptor.configurable = true;
        descriptor.enumerable = true;

        if ('initializer' in descriptor) {
          (this || _global).defaultValue = descriptor.initializer;
          delete descriptor.initializer;
          delete descriptor.writable;
        }

        if ('value' in descriptor) {
          (this || _global).defaultValue = descriptor.value;
          delete descriptor.value;
          delete descriptor.writable;
        }

        descriptor.get = function () {
          return getObserver(this || _global, name).getValue();
        };

        descriptor.set = function (value) {
          getObserver(this || _global, name).setValue(value);
        };

        descriptor.get.getObserver = function (obj) {
          return getObserver(obj, name);
        };

        return descriptor;
      };

      BindableProperty.prototype.defineOn = function defineOn(target, behavior) {
        var name = (this || _global).name;
        var handlerName = void 0;

        if ((this || _global).changeHandler === null) {
          handlerName = name + 'Changed';

          if (handlerName in target.prototype) {
            (this || _global).changeHandler = handlerName;
          }
        }

        if ((this || _global).descriptor === null) {
          Object.defineProperty(target.prototype, name, this._configureDescriptor(behavior, {}));
        }
      };

      BindableProperty.prototype.createObserver = function createObserver(viewModel) {
        var selfSubscriber = null;
        var defaultValue = (this || _global).defaultValue;
        var changeHandlerName = (this || _global).changeHandler;
        var name = (this || _global).name;
        var initialValue = void 0;

        if ((this || _global).hasOptions) {
          return undefined;
        }

        if (changeHandlerName in viewModel) {
          if ('propertyChanged' in viewModel) {
            selfSubscriber = function selfSubscriber(newValue, oldValue) {
              viewModel[changeHandlerName](newValue, oldValue);
              viewModel.propertyChanged(name, newValue, oldValue);
            };
          } else {
            selfSubscriber = function selfSubscriber(newValue, oldValue) {
              return viewModel[changeHandlerName](newValue, oldValue);
            };
          }
        } else if ('propertyChanged' in viewModel) {
          selfSubscriber = function selfSubscriber(newValue, oldValue) {
            return viewModel.propertyChanged(name, newValue, oldValue);
          };
        } else if (changeHandlerName !== null) {
          throw new Error('Change handler ' + changeHandlerName + ' was specified but not declared on the class.');
        }

        if (defaultValue !== undefined) {
          initialValue = typeof defaultValue === 'function' ? defaultValue.call(viewModel) : defaultValue;
        }

        return new BehaviorPropertyObserver((this || _global).owner.taskQueue, viewModel, (this || _global).name, selfSubscriber, initialValue);
      };

      BindableProperty.prototype._initialize = function _initialize(viewModel, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
        var selfSubscriber = void 0;
        var observer = void 0;
        var attribute = void 0;
        var defaultValue = (this || _global).defaultValue;

        if ((this || _global).isDynamic) {
          for (var _key6 in attributes) {
            this._createDynamicProperty(viewModel, observerLookup, behaviorHandlesBind, _key6, attributes[_key6], boundProperties);
          }
        } else if (!(this || _global).hasOptions) {
          observer = observerLookup[(this || _global).name];

          if (attributes !== null) {
            selfSubscriber = observer.selfSubscriber;
            attribute = attributes[(this || _global).attribute];

            if (behaviorHandlesBind) {
              observer.selfSubscriber = null;
            }

            if (typeof attribute === 'string') {
              viewModel[(this || _global).name] = attribute;
              observer.call();
            } else if (attribute) {
              boundProperties.push({
                observer: observer,
                binding: attribute.createBinding(viewModel)
              });
            } else if (defaultValue !== undefined) {
              observer.call();
            }

            observer.selfSubscriber = selfSubscriber;
          }

          observer.publishing = true;
        }
      };

      BindableProperty.prototype._createDynamicProperty = function _createDynamicProperty(viewModel, observerLookup, behaviorHandlesBind, name, attribute, boundProperties) {
        var changeHandlerName = name + 'Changed';
        var selfSubscriber = null;
        var observer = void 0;
        var info = void 0;

        if (changeHandlerName in viewModel) {
          if ('propertyChanged' in viewModel) {
            selfSubscriber = function selfSubscriber(newValue, oldValue) {
              viewModel[changeHandlerName](newValue, oldValue);
              viewModel.propertyChanged(name, newValue, oldValue);
            };
          } else {
            selfSubscriber = function selfSubscriber(newValue, oldValue) {
              return viewModel[changeHandlerName](newValue, oldValue);
            };
          }
        } else if ('propertyChanged' in viewModel) {
          selfSubscriber = function selfSubscriber(newValue, oldValue) {
            return viewModel.propertyChanged(name, newValue, oldValue);
          };
        }

        observer = observerLookup[name] = new BehaviorPropertyObserver((this || _global).owner.taskQueue, viewModel, name, selfSubscriber);
        Object.defineProperty(viewModel, name, {
          configurable: true,
          enumerable: true,
          get: observer.getValue.bind(observer),
          set: observer.setValue.bind(observer)
        });

        if (behaviorHandlesBind) {
          observer.selfSubscriber = null;
        }

        if (typeof attribute === 'string') {
          viewModel[name] = attribute;
          observer.call();
        } else if (attribute) {
          info = {
            observer: observer,
            binding: attribute.createBinding(viewModel)
          };
          boundProperties.push(info);
        }

        observer.publishing = true;
        observer.selfSubscriber = selfSubscriber;
      };

      return BindableProperty;
    }();

    var lastProviderId = 0;

    function nextProviderId() {
      return ++lastProviderId;
    }

    function doProcessContent() {
      return true;
    }

    function doProcessAttributes() {}

    var HtmlBehaviorResource = exports.HtmlBehaviorResource = function () {
      function HtmlBehaviorResource() {
        (this || _global).elementName = null;
        (this || _global).attributeName = null;
        (this || _global).attributeDefaultBindingMode = undefined;
        (this || _global).liftsContent = false;
        (this || _global).targetShadowDOM = false;
        (this || _global).shadowDOMOptions = null;
        (this || _global).processAttributes = doProcessAttributes;
        (this || _global).processContent = doProcessContent;
        (this || _global).usesShadowDOM = false;
        (this || _global).childBindings = null;
        (this || _global).hasDynamicOptions = false;
        (this || _global).containerless = false;
        (this || _global).properties = [];
        (this || _global).attributes = {};
        (this || _global).isInitialized = false;
        (this || _global).primaryProperty = null;
      }

      HtmlBehaviorResource.convention = function convention(name, existing) {
        var behavior = void 0;

        if (name.endsWith('CustomAttribute')) {
          behavior = existing || new HtmlBehaviorResource();
          behavior.attributeName = _hyphenate(name.substring(0, name.length - 15));
        }

        if (name.endsWith('CustomElement')) {
          behavior = existing || new HtmlBehaviorResource();
          behavior.elementName = _hyphenate(name.substring(0, name.length - 13));
        }

        return behavior;
      };

      HtmlBehaviorResource.prototype.addChildBinding = function addChildBinding(behavior) {
        if ((this || _global).childBindings === null) {
          (this || _global).childBindings = [];
        }

        (this || _global).childBindings.push(behavior);
      };

      HtmlBehaviorResource.prototype.initialize = function initialize(container, target) {
        var proto = target.prototype;
        var properties = (this || _global).properties;
        var attributeName = (this || _global).attributeName;
        var attributeDefaultBindingMode = (this || _global).attributeDefaultBindingMode;
        var i = void 0;
        var ii = void 0;
        var current = void 0;

        if ((this || _global).isInitialized) {
          return;
        }

        (this || _global).isInitialized = true;
        target.__providerId__ = nextProviderId();
        (this || _global).observerLocator = container.get(_aureliaBinding.ObserverLocator);
        (this || _global).taskQueue = container.get(_aureliaTaskQueue.TaskQueue);
        (this || _global).target = target;
        (this || _global).usesShadowDOM = (this || _global).targetShadowDOM && _aureliaPal.FEATURE.shadowDOM;
        (this || _global).handlesCreated = 'created' in proto;
        (this || _global).handlesBind = 'bind' in proto;
        (this || _global).handlesUnbind = 'unbind' in proto;
        (this || _global).handlesAttached = 'attached' in proto;
        (this || _global).handlesDetached = 'detached' in proto;
        (this || _global).htmlName = (this || _global).elementName || (this || _global).attributeName;

        if (attributeName !== null) {
          if (properties.length === 0) {
            new BindableProperty({
              name: 'value',
              changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
              attribute: attributeName,
              defaultBindingMode: attributeDefaultBindingMode
            }).registerWith(target, this || _global);
          }

          current = properties[0];

          if (properties.length === 1 && current.name === 'value') {
            current.isDynamic = current.hasOptions = (this || _global).hasDynamicOptions;
            current.defineOn(target, this || _global);
          } else {
            for (i = 0, ii = properties.length; i < ii; ++i) {
              properties[i].defineOn(target, this || _global);

              if (properties[i].primaryProperty) {
                if ((this || _global).primaryProperty) {
                  throw new Error('Only one bindable property on a custom element can be defined as the default');
                }

                (this || _global).primaryProperty = properties[i];
              }
            }

            current = new BindableProperty({
              name: 'value',
              changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
              attribute: attributeName,
              defaultBindingMode: attributeDefaultBindingMode
            });
            current.hasOptions = true;
            current.registerWith(target, this || _global);
          }
        } else {
          for (i = 0, ii = properties.length; i < ii; ++i) {
            properties[i].defineOn(target, this || _global);
          }

          this._copyInheritedProperties(container, target);
        }
      };

      HtmlBehaviorResource.prototype.register = function register(registry, name) {
        var _this12 = this || _global;

        if ((this || _global).attributeName !== null) {
          registry.registerAttribute(name || (this || _global).attributeName, this || _global, (this || _global).attributeName);

          if (Array.isArray((this || _global).aliases)) {
            (this || _global).aliases.forEach(function (alias) {
              registry.registerAttribute(alias, _this12, _this12.attributeName);
            });
          }
        }

        if ((this || _global).elementName !== null) {
          registry.registerElement(name || (this || _global).elementName, this || _global);
        }
      };

      HtmlBehaviorResource.prototype.load = function load(container, target, loadContext, viewStrategy, transientView) {
        var _this13 = this || _global;

        var options = void 0;

        if ((this || _global).elementName !== null) {
          viewStrategy = container.get(ViewLocator).getViewStrategy(viewStrategy || (this || _global).viewStrategy || target);
          options = new ViewCompileInstruction((this || _global).targetShadowDOM, true);

          if (!viewStrategy.moduleId) {
            viewStrategy.moduleId = _aureliaMetadata.Origin.get(target).moduleId;
          }

          return viewStrategy.loadViewFactory(container.get(ViewEngine), options, loadContext, target).then(function (viewFactory) {
            if (!transientView || !_this13.viewFactory) {
              _this13.viewFactory = viewFactory;
            }

            return viewFactory;
          });
        }

        return Promise.resolve(this || _global);
      };

      HtmlBehaviorResource.prototype.compile = function compile(compiler, resources, node, instruction, parentNode) {
        if ((this || _global).liftsContent) {
          if (!instruction.viewFactory) {
            var _template = _aureliaPal.DOM.createElement('template');

            var fragment = _aureliaPal.DOM.createDocumentFragment();

            var cacheSize = node.getAttribute('view-cache');
            var part = node.getAttribute('part');
            node.removeAttribute(instruction.originalAttrName);

            _aureliaPal.DOM.replaceNode(_template, node, parentNode);

            fragment.appendChild(node);
            instruction.viewFactory = compiler.compile(fragment, resources);

            if (part) {
              instruction.viewFactory.part = part;
              node.removeAttribute('part');
            }

            if (cacheSize) {
              instruction.viewFactory.setCacheSize(cacheSize);
              node.removeAttribute('view-cache');
            }

            node = _template;
          }
        } else if ((this || _global).elementName !== null) {
          var _partReplacements2 = {};

          if (this.processContent(compiler, resources, node, instruction) && node.hasChildNodes()) {
            var currentChild = node.firstChild;
            var contentElement = (this || _global).usesShadowDOM ? null : _aureliaPal.DOM.createElement('au-content');
            var nextSibling = void 0;
            var toReplace = void 0;

            while (currentChild) {
              nextSibling = currentChild.nextSibling;

              if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
                _partReplacements2[toReplace] = compiler.compile(currentChild, resources);

                _aureliaPal.DOM.removeNode(currentChild, parentNode);

                instruction.partReplacements = _partReplacements2;
              } else if (contentElement !== null) {
                if (currentChild.nodeType === 3 && _isAllWhitespace(currentChild)) {
                  _aureliaPal.DOM.removeNode(currentChild, parentNode);
                } else {
                  contentElement.appendChild(currentChild);
                }
              }

              currentChild = nextSibling;
            }

            if (contentElement !== null && contentElement.hasChildNodes()) {
              node.appendChild(contentElement);
            }

            instruction.skipContentProcessing = false;
          } else {
            instruction.skipContentProcessing = true;
          }
        } else if (!this.processContent(compiler, resources, node, instruction)) {
          instruction.skipContentProcessing = true;
        }

        return node;
      };

      HtmlBehaviorResource.prototype.create = function create(container, instruction, element, bindings) {
        var viewHost = void 0;
        var au = null;
        instruction = instruction || BehaviorInstruction.normal;
        element = element || null;
        bindings = bindings || null;

        if ((this || _global).elementName !== null && element) {
          if ((this || _global).usesShadowDOM) {
            viewHost = element.attachShadow((this || _global).shadowDOMOptions);
            container.registerInstance(_aureliaPal.DOM.boundary, viewHost);
          } else {
            viewHost = element;

            if ((this || _global).targetShadowDOM) {
              container.registerInstance(_aureliaPal.DOM.boundary, viewHost);
            }
          }
        }

        if (element !== null) {
          element.au = au = element.au || {};
        }

        var viewModel = instruction.viewModel || container.get((this || _global).target);
        var controller = new Controller(this || _global, instruction, viewModel, container);
        var childBindings = (this || _global).childBindings;
        var viewFactory = void 0;

        if ((this || _global).liftsContent) {
          au.controller = controller;
        } else if ((this || _global).elementName !== null) {
          viewFactory = instruction.viewFactory || (this || _global).viewFactory;
          container.viewModel = viewModel;

          if (viewFactory) {
            controller.view = viewFactory.create(container, instruction, element);
          }

          if (element !== null) {
            au.controller = controller;

            if (controller.view) {
              if (!(this || _global).usesShadowDOM && (element.childNodes.length === 1 || element.contentElement)) {
                var contentElement = element.childNodes[0] || element.contentElement;
                controller.view.contentView = {
                  fragment: contentElement
                };
                contentElement.parentNode && _aureliaPal.DOM.removeNode(contentElement);
              }

              if (instruction.anchorIsContainer) {
                if (childBindings !== null) {
                  for (var _i4 = 0, _ii3 = childBindings.length; _i4 < _ii3; ++_i4) {
                    controller.view.addBinding(childBindings[_i4].create(element, viewModel, controller));
                  }
                }

                controller.view.appendNodesTo(viewHost);
              } else {
                controller.view.insertNodesBefore(viewHost);
              }
            } else if (childBindings !== null) {
              for (var _i5 = 0, _ii4 = childBindings.length; _i5 < _ii4; ++_i5) {
                bindings.push(childBindings[_i5].create(element, viewModel, controller));
              }
            }
          } else if (controller.view) {
            controller.view.controller = controller;

            if (childBindings !== null) {
              for (var _i6 = 0, _ii5 = childBindings.length; _i6 < _ii5; ++_i6) {
                controller.view.addBinding(childBindings[_i6].create(instruction.host, viewModel, controller));
              }
            }
          } else if (childBindings !== null) {
            for (var _i7 = 0, _ii6 = childBindings.length; _i7 < _ii6; ++_i7) {
              bindings.push(childBindings[_i7].create(instruction.host, viewModel, controller));
            }
          }
        } else if (childBindings !== null) {
          for (var _i8 = 0, _ii7 = childBindings.length; _i8 < _ii7; ++_i8) {
            bindings.push(childBindings[_i8].create(element, viewModel, controller));
          }
        }

        if (au !== null) {
          au[(this || _global).htmlName] = controller;
        }

        if (instruction.initiatedByBehavior && viewFactory) {
          controller.view.created();
        }

        return controller;
      };

      HtmlBehaviorResource.prototype._ensurePropertiesDefined = function _ensurePropertiesDefined(instance, lookup) {
        var properties = void 0;
        var i = void 0;
        var ii = void 0;
        var observer = void 0;

        if ('__propertiesDefined__' in lookup) {
          return;
        }

        lookup.__propertiesDefined__ = true;
        properties = (this || _global).properties;

        for (i = 0, ii = properties.length; i < ii; ++i) {
          observer = properties[i].createObserver(instance);

          if (observer !== undefined) {
            lookup[observer.propertyName] = observer;
          }
        }
      };

      HtmlBehaviorResource.prototype._copyInheritedProperties = function _copyInheritedProperties(container, target) {
        var _this14 = this || _global;

        var behavior = void 0;
        var derived = target;

        while (true) {
          var proto = Object.getPrototypeOf(target.prototype);
          target = proto && proto.constructor;

          if (!target) {
            return;
          }

          behavior = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.resource, target);

          if (behavior) {
            break;
          }
        }

        behavior.initialize(container, target);

        var _loop = function _loop(_i9, _ii8) {
          var prop = behavior.properties[_i9];

          if (_this14.properties.some(function (p) {
            return p.name === prop.name;
          })) {
            return 'continue';
          }

          new BindableProperty(prop).registerWith(derived, _this14);
        };

        for (var _i9 = 0, _ii8 = behavior.properties.length; _i9 < _ii8; ++_i9) {
          var _ret = _loop(_i9, _ii8);

          if (_ret === 'continue') continue;
        }
      };

      return HtmlBehaviorResource;
    }();

    function createChildObserverDecorator(selectorOrConfig, all) {
      return function (target, key, descriptor) {
        var actualTarget = typeof key === 'string' ? target.constructor : target;

        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);

        if (typeof selectorOrConfig === 'string') {
          selectorOrConfig = {
            selector: selectorOrConfig,
            name: key
          };
        }

        if (descriptor) {
          descriptor.writable = true;
          descriptor.configurable = true;
        }

        selectorOrConfig.all = all;
        r.addChildBinding(new ChildObserver(selectorOrConfig));
      };
    }

    function children(selectorOrConfig) {
      return createChildObserverDecorator(selectorOrConfig, true);
    }

    function child(selectorOrConfig) {
      return createChildObserverDecorator(selectorOrConfig, false);
    }

    var ChildObserver = function () {
      function ChildObserver(config) {
        (this || _global).name = config.name;
        (this || _global).changeHandler = config.changeHandler || (this || _global).name + 'Changed';
        (this || _global).selector = config.selector;
        (this || _global).all = config.all;
      }

      ChildObserver.prototype.create = function create(viewHost, viewModel, controller) {
        return new ChildObserverBinder((this || _global).selector, viewHost, (this || _global).name, viewModel, controller, (this || _global).changeHandler, (this || _global).all);
      };

      return ChildObserver;
    }();

    var noMutations = [];

    function trackMutation(groupedMutations, binder, record) {
      var mutations = groupedMutations.get(binder);

      if (!mutations) {
        mutations = [];
        groupedMutations.set(binder, mutations);
      }

      mutations.push(record);
    }

    function onChildChange(mutations, observer) {
      var binders = observer.binders;
      var bindersLength = binders.length;
      var groupedMutations = new Map();

      for (var _i10 = 0, _ii9 = mutations.length; _i10 < _ii9; ++_i10) {
        var record = mutations[_i10];
        var added = record.addedNodes;
        var removed = record.removedNodes;

        for (var j = 0, jj = removed.length; j < jj; ++j) {
          var _node = removed[j];

          if (_node.nodeType === 1) {
            for (var k = 0; k < bindersLength; ++k) {
              var binder = binders[k];

              if (binder.onRemove(_node)) {
                trackMutation(groupedMutations, binder, record);
              }
            }
          }
        }

        for (var _j = 0, _jj = added.length; _j < _jj; ++_j) {
          var _node2 = added[_j];

          if (_node2.nodeType === 1) {
            for (var _k = 0; _k < bindersLength; ++_k) {
              var _binder = binders[_k];

              if (_binder.onAdd(_node2)) {
                trackMutation(groupedMutations, _binder, record);
              }
            }
          }
        }
      }

      groupedMutations.forEach(function (mutationRecords, binder) {
        if (binder.isBound && binder.changeHandler !== null) {
          binder.viewModel[binder.changeHandler](mutationRecords);
        }
      });
    }

    var ChildObserverBinder = function () {
      function ChildObserverBinder(selector, viewHost, property, viewModel, controller, changeHandler, all) {
        (this || _global).selector = selector;
        (this || _global).viewHost = viewHost;
        (this || _global).property = property;
        (this || _global).viewModel = viewModel;
        (this || _global).controller = controller;
        (this || _global).changeHandler = changeHandler in viewModel ? changeHandler : null;
        (this || _global).usesShadowDOM = controller.behavior.usesShadowDOM;
        (this || _global).all = all;

        if (!(this || _global).usesShadowDOM && controller.view && controller.view.contentView) {
          (this || _global).contentView = controller.view.contentView;
        } else {
          (this || _global).contentView = null;
        }

        (this || _global).source = null;
        (this || _global).isBound = false;
      }

      ChildObserverBinder.prototype.matches = function matches(element) {
        if (element.matches((this || _global).selector)) {
          if ((this || _global).contentView === null) {
            return true;
          }

          var contentView = (this || _global).contentView;
          var assignedSlot = element.auAssignedSlot;

          if (assignedSlot && assignedSlot.projectFromAnchors) {
            var anchors = assignedSlot.projectFromAnchors;

            for (var _i11 = 0, _ii10 = anchors.length; _i11 < _ii10; ++_i11) {
              if (anchors[_i11].auOwnerView === contentView) {
                return true;
              }
            }

            return false;
          }

          return element.auOwnerView === contentView;
        }

        return false;
      };

      ChildObserverBinder.prototype.bind = function bind(source) {
        if ((this || _global).isBound) {
          if ((this || _global).source === source) {
            return;
          }

          (this || _global).source = source;
        }

        (this || _global).isBound = true;
        var viewHost = (this || _global).viewHost;
        var viewModel = (this || _global).viewModel;
        var observer = viewHost.__childObserver__;

        if (!observer) {
          observer = viewHost.__childObserver__ = _aureliaPal.DOM.createMutationObserver(onChildChange);
          var options = {
            childList: true,
            subtree: !(this || _global).usesShadowDOM
          };
          observer.observe(viewHost, options);
          observer.binders = [];
        }

        observer.binders.push(this || _global);

        if ((this || _global).usesShadowDOM) {
          var current = viewHost.firstElementChild;

          if ((this || _global).all) {
            var items = viewModel[(this || _global).property];

            if (!items) {
              items = viewModel[(this || _global).property] = [];
            } else {
              items.splice(0);
            }

            while (current) {
              if (this.matches(current)) {
                items.push(current.au && current.au.controller ? current.au.controller.viewModel : current);
              }

              current = current.nextElementSibling;
            }

            if ((this || _global).changeHandler !== null) {
              (this || _global).viewModel[(this || _global).changeHandler](noMutations);
            }
          } else {
            while (current) {
              if (this.matches(current)) {
                var _value = current.au && current.au.controller ? current.au.controller.viewModel : current;

                (this || _global).viewModel[(this || _global).property] = _value;

                if ((this || _global).changeHandler !== null) {
                  (this || _global).viewModel[(this || _global).changeHandler](_value);
                }

                break;
              }

              current = current.nextElementSibling;
            }
          }
        }
      };

      ChildObserverBinder.prototype.onRemove = function onRemove(element) {
        if (this.matches(element)) {
          var _value2 = element.au && element.au.controller ? element.au.controller.viewModel : element;

          if ((this || _global).all) {
            var items = (this || _global).viewModel[(this || _global).property] || ((this || _global).viewModel[(this || _global).property] = []);
            var index = items.indexOf(_value2);

            if (index !== -1) {
              items.splice(index, 1);
            }

            return true;
          }

          var currentValue = (this || _global).viewModel[(this || _global).property];

          if (currentValue === _value2) {
            (this || _global).viewModel[(this || _global).property] = null;

            if ((this || _global).isBound && (this || _global).changeHandler !== null) {
              (this || _global).viewModel[(this || _global).changeHandler](_value2);
            }
          }
        }

        return false;
      };

      ChildObserverBinder.prototype.onAdd = function onAdd(element) {
        if (this.matches(element)) {
          var _value3 = element.au && element.au.controller ? element.au.controller.viewModel : element;

          if ((this || _global).all) {
            var items = (this || _global).viewModel[(this || _global).property] || ((this || _global).viewModel[(this || _global).property] = []);

            if ((this || _global).selector === '*') {
              items.push(_value3);
              return true;
            }

            var index = 0;
            var prev = element.previousElementSibling;

            while (prev) {
              if (this.matches(prev)) {
                index++;
              }

              prev = prev.previousElementSibling;
            }

            items.splice(index, 0, _value3);
            return true;
          }

          (this || _global).viewModel[(this || _global).property] = _value3;

          if ((this || _global).isBound && (this || _global).changeHandler !== null) {
            (this || _global).viewModel[(this || _global).changeHandler](_value3);
          }
        }

        return false;
      };

      ChildObserverBinder.prototype.unbind = function unbind() {
        if (!(this || _global).isBound) {
          return;
        }

        (this || _global).isBound = false;
        (this || _global).source = null;
        var childObserver = (this || _global).viewHost.__childObserver__;

        if (childObserver) {
          var binders = childObserver.binders;

          if (binders && binders.length) {
            var idx = binders.indexOf(this || _global);

            if (idx !== -1) {
              binders.splice(idx, 1);
            }

            if (binders.length === 0) {
              childObserver.disconnect();
              (this || _global).viewHost.__childObserver__ = null;
            }
          }

          if ((this || _global).usesShadowDOM) {
            (this || _global).viewModel[(this || _global).property] = null;
          }
        }
      };

      return ChildObserverBinder;
    }();

    function remove(viewSlot, previous) {
      return Array.isArray(previous) ? viewSlot.removeMany(previous, true) : viewSlot.remove(previous, true);
    }

    var SwapStrategies = exports.SwapStrategies = {
      before: function before(viewSlot, previous, callback) {
        return previous === undefined ? callback() : callback().then(function () {
          return remove(viewSlot, previous);
        });
      },
      with: function _with(viewSlot, previous, callback) {
        return previous === undefined ? callback() : Promise.all([remove(viewSlot, previous), callback()]);
      },
      after: function after(viewSlot, previous, callback) {
        return Promise.resolve(viewSlot.removeAll(true)).then(callback);
      }
    };

    function tryActivateViewModel(context) {
      if (context.skipActivation || typeof context.viewModel.activate !== 'function') {
        return Promise.resolve();
      }

      return context.viewModel.activate(context.model) || Promise.resolve();
    }

    var CompositionEngine = exports.CompositionEngine = (_dec8 = (0, _aureliaDependencyInjection.inject)(ViewEngine, ViewLocator), _dec8(_class16 = function () {
      function CompositionEngine(viewEngine, viewLocator) {
        (this || _global).viewEngine = viewEngine;
        (this || _global).viewLocator = viewLocator;
      }

      CompositionEngine.prototype._swap = function _swap(context, view) {
        var swapStrategy = SwapStrategies[context.swapOrder] || SwapStrategies.after;
        var previousViews = context.viewSlot.children.slice();
        return swapStrategy(context.viewSlot, previousViews, function () {
          return Promise.resolve(context.viewSlot.add(view)).then(function () {
            if (context.currentController) {
              context.currentController.unbind();
            }
          });
        }).then(function () {
          if (context.compositionTransactionNotifier) {
            context.compositionTransactionNotifier.done();
          }
        });
      };

      CompositionEngine.prototype._createControllerAndSwap = function _createControllerAndSwap(context) {
        var _this15 = this || _global;

        return this.createController(context).then(function (controller) {
          if (context.compositionTransactionOwnershipToken) {
            return context.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function () {
              controller.automate(context.overrideContext, context.owningView);
              return _this15._swap(context, controller.view);
            }).then(function () {
              return controller;
            });
          }

          controller.automate(context.overrideContext, context.owningView);
          return _this15._swap(context, controller.view).then(function () {
            return controller;
          });
        });
      };

      CompositionEngine.prototype.createController = function createController(context) {
        var _this16 = this || _global;

        var childContainer = void 0;
        var viewModel = void 0;
        var viewModelResource = void 0;
        var m = void 0;
        return this.ensureViewModel(context).then(tryActivateViewModel).then(function () {
          childContainer = context.childContainer;
          viewModel = context.viewModel;
          viewModelResource = context.viewModelResource;
          m = viewModelResource.metadata;

          var viewStrategy = _this16.viewLocator.getViewStrategy(context.view || viewModel);

          if (context.viewResources) {
            viewStrategy.makeRelativeTo(context.viewResources.viewUrl);
          }

          return m.load(childContainer, viewModelResource.value, null, viewStrategy, true);
        }).then(function (viewFactory) {
          return m.create(childContainer, BehaviorInstruction.dynamic(context.host, viewModel, viewFactory));
        });
      };

      CompositionEngine.prototype.ensureViewModel = function ensureViewModel(context) {
        var childContainer = context.childContainer = context.childContainer || context.container.createChild();

        if (typeof context.viewModel === 'string') {
          context.viewModel = context.viewResources ? context.viewResources.relativeToView(context.viewModel) : context.viewModel;
          return (this || _global).viewEngine.importViewModelResource(context.viewModel).then(function (viewModelResource) {
            childContainer.autoRegister(viewModelResource.value);

            if (context.host) {
              childContainer.registerInstance(_aureliaPal.DOM.Element, context.host);
            }

            context.viewModel = childContainer.viewModel = childContainer.get(viewModelResource.value);
            context.viewModelResource = viewModelResource;
            return context;
          });
        }

        var ctor = context.viewModel.constructor;
        var isClass = typeof context.viewModel === 'function';

        if (isClass) {
          ctor = context.viewModel;
          childContainer.autoRegister(ctor);
        }

        var m = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, ctor);

        m.elementName = m.elementName || 'dynamic-element';
        m.initialize(isClass ? childContainer : context.container || childContainer, ctor);
        context.viewModelResource = {
          metadata: m,
          value: ctor
        };

        if (context.host) {
          childContainer.registerInstance(_aureliaPal.DOM.Element, context.host);
        }

        childContainer.viewModel = context.viewModel = isClass ? childContainer.get(ctor) : context.viewModel;
        return Promise.resolve(context);
      };

      CompositionEngine.prototype.compose = function compose(context) {
        var _this17 = this || _global;

        context.childContainer = context.childContainer || context.container.createChild();
        context.view = (this || _global).viewLocator.getViewStrategy(context.view);
        var transaction = context.childContainer.get(CompositionTransaction);
        var compositionTransactionOwnershipToken = transaction.tryCapture();

        if (compositionTransactionOwnershipToken) {
          context.compositionTransactionOwnershipToken = compositionTransactionOwnershipToken;
        } else {
          context.compositionTransactionNotifier = transaction.enlist();
        }

        if (context.viewModel) {
          return this._createControllerAndSwap(context);
        } else if (context.view) {
          if (context.viewResources) {
            context.view.makeRelativeTo(context.viewResources.viewUrl);
          }

          return context.view.loadViewFactory((this || _global).viewEngine, new ViewCompileInstruction()).then(function (viewFactory) {
            var result = viewFactory.create(context.childContainer);
            result.bind(context.bindingContext, context.overrideContext);

            if (context.compositionTransactionOwnershipToken) {
              return context.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function () {
                return _this17._swap(context, result);
              }).then(function () {
                return result;
              });
            }

            return _this17._swap(context, result).then(function () {
              return result;
            });
          });
        } else if (context.viewSlot) {
          context.viewSlot.removeAll();

          if (context.compositionTransactionNotifier) {
            context.compositionTransactionNotifier.done();
          }

          return Promise.resolve(null);
        }

        return Promise.resolve(null);
      };

      return CompositionEngine;
    }()) || _class16);

    var ElementConfigResource = exports.ElementConfigResource = function () {
      function ElementConfigResource() {}

      ElementConfigResource.prototype.initialize = function initialize(container, target) {};

      ElementConfigResource.prototype.register = function register(registry, name) {};

      ElementConfigResource.prototype.load = function load(container, target) {
        var config = new target();
        var eventManager = container.get(_aureliaBinding.EventManager);
        eventManager.registerElementConfig(config);
      };

      return ElementConfigResource;
    }();

    function resource(instanceOrConfig) {
      return function (target) {
        var isConfig = typeof instanceOrConfig === 'string' || Object.getPrototypeOf(instanceOrConfig) === Object.prototype;

        if (isConfig) {
          target.$resource = instanceOrConfig;
        } else {
          _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, instanceOrConfig, target);
        }
      };
    }

    function behavior(override) {
      return function (target) {
        if (override instanceof HtmlBehaviorResource) {
          _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, override, target);
        } else {
          var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);

          Object.assign(r, override);
        }
      };
    }

    function customElement(name) {
      return function (target) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);

        r.elementName = validateBehaviorName(name, 'custom element');
      };
    }

    function customAttribute(name, defaultBindingMode, aliases) {
      return function (target) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);

        r.attributeName = validateBehaviorName(name, 'custom attribute');
        r.attributeDefaultBindingMode = defaultBindingMode;
        r.aliases = aliases;
      };
    }

    function templateController(target) {
      var deco = function deco(t) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);

        r.liftsContent = true;
      };

      return target ? deco(target) : deco;
    }

    function bindable(nameOrConfigOrTarget, key, descriptor) {
      var deco = function deco(target, key2, descriptor2) {
        var actualTarget = key2 ? target.constructor : target;

        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);

        var prop = void 0;

        if (key2) {
          nameOrConfigOrTarget = nameOrConfigOrTarget || {};
          nameOrConfigOrTarget.name = key2;
        }

        prop = new BindableProperty(nameOrConfigOrTarget);
        return prop.registerWith(actualTarget, r, descriptor2);
      };

      if (!nameOrConfigOrTarget) {
        return deco;
      }

      if (key) {
        var _target = nameOrConfigOrTarget;
        nameOrConfigOrTarget = null;
        return deco(_target, key, descriptor);
      }

      return deco;
    }

    function dynamicOptions(target) {
      var deco = function deco(t) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);

        r.hasDynamicOptions = true;
      };

      return target ? deco(target) : deco;
    }

    var defaultShadowDOMOptions = {
      mode: 'open'
    };

    function useShadowDOM(targetOrOptions) {
      var options = typeof targetOrOptions === 'function' || !targetOrOptions ? defaultShadowDOMOptions : targetOrOptions;

      var deco = function deco(t) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);

        r.targetShadowDOM = true;
        r.shadowDOMOptions = options;
      };

      return typeof targetOrOptions === 'function' ? deco(targetOrOptions) : deco;
    }

    function processAttributes(processor) {
      return function (t) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);

        r.processAttributes = function (compiler, resources, node, attributes, elementInstruction) {
          try {
            processor(compiler, resources, node, attributes, elementInstruction);
          } catch (error) {
            LogManager.getLogger('templating').error(error);
          }
        };
      };
    }

    function doNotProcessContent() {
      return false;
    }

    function processContent(processor) {
      return function (t) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);

        r.processContent = processor ? function (compiler, resources, node, instruction) {
          try {
            return processor(compiler, resources, node, instruction);
          } catch (error) {
            LogManager.getLogger('templating').error(error);
            return false;
          }
        } : doNotProcessContent;
      };
    }

    function containerless(target) {
      var deco = function deco(t) {
        var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);

        r.containerless = true;
      };

      return target ? deco(target) : deco;
    }

    function useViewStrategy(strategy) {
      return function (target) {
        _aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, strategy, target);
      };
    }

    function useView(path) {
      return useViewStrategy(new RelativeViewStrategy(path));
    }

    function inlineView(markup, dependencies, dependencyBaseUrl) {
      return useViewStrategy(new InlineViewStrategy(markup, dependencies, dependencyBaseUrl));
    }

    function noView(targetOrDependencies, dependencyBaseUrl) {
      var target = void 0;
      var dependencies = void 0;

      if (typeof targetOrDependencies === 'function') {
        target = targetOrDependencies;
      } else {
        dependencies = targetOrDependencies;
        target = undefined;
      }

      var deco = function deco(t) {
        _aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, new NoViewStrategy(dependencies, dependencyBaseUrl), t);
      };

      return target ? deco(target) : deco;
    }

    function view(templateOrConfig) {
      return function (target) {
        target.$view = templateOrConfig;
      };
    }

    function elementConfig(target) {
      var deco = function deco(t) {
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ElementConfigResource(), t);
      };

      return target ? deco(target) : deco;
    }

    function viewResources() {
      for (var _len = arguments.length, resources = Array(_len), _key7 = 0; _key7 < _len; _key7++) {
        resources[_key7] = arguments[_key7];
      }

      return function (target) {
        _aureliaMetadata.metadata.define(ViewEngine.viewModelRequireMetadataKey, resources, target);
      };
    }

    var TemplatingEngine = exports.TemplatingEngine = (_dec9 = (0, _aureliaDependencyInjection.inject)(_aureliaDependencyInjection.Container, ModuleAnalyzer, ViewCompiler, CompositionEngine), _dec9(_class17 = function () {
      function TemplatingEngine(container, moduleAnalyzer, viewCompiler, compositionEngine) {
        (this || _global)._container = container;
        (this || _global)._moduleAnalyzer = moduleAnalyzer;
        (this || _global)._viewCompiler = viewCompiler;
        (this || _global)._compositionEngine = compositionEngine;
        container.registerInstance(Animator, Animator.instance = new Animator());
      }

      TemplatingEngine.prototype.configureAnimator = function configureAnimator(animator) {
        (this || _global)._container.unregister(Animator);

        (this || _global)._container.registerInstance(Animator, Animator.instance = animator);
      };

      TemplatingEngine.prototype.compose = function compose(context) {
        return (this || _global)._compositionEngine.compose(context);
      };

      TemplatingEngine.prototype.enhance = function enhance(instruction) {
        if (instruction instanceof _aureliaPal.DOM.Element) {
          instruction = {
            element: instruction
          };
        }

        var compilerInstructions = {
          letExpressions: []
        };

        var resources = instruction.resources || (this || _global)._container.get(ViewResources);

        (this || _global)._viewCompiler._compileNode(instruction.element, resources, compilerInstructions, instruction.element.parentNode, 'root', true);

        var factory = new ViewFactory(instruction.element, compilerInstructions, resources);

        var container = instruction.container || (this || _global)._container.createChild();

        var view = factory.create(container, BehaviorInstruction.enhance());
        view.bind(instruction.bindingContext || {}, instruction.overrideContext);
        view.firstChild = view.lastChild = view.fragment;
        view.fragment = _aureliaPal.DOM.createDocumentFragment();
        view.attached();
        return view;
      };

      return TemplatingEngine;
    }()) || _class17);
  });
  return exports;
}