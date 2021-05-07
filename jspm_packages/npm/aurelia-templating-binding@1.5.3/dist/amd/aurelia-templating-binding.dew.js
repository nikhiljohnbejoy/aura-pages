var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(['exports', 'aurelia-logging', 'aurelia-binding', 'aurelia-templating'], function (exports, _aureliaLogging, _aureliaBinding, _aureliaTemplating) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TemplatingBindingLanguage = exports.SyntaxInterpreter = exports.LetInterpolationBinding = exports.LetInterpolationBindingExpression = exports.LetBinding = exports.LetExpression = exports.ChildInterpolationBinding = exports.InterpolationBinding = exports.InterpolationBindingExpression = exports.AttributeMap = undefined;
    exports.configure = configure;

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

    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _class, _temp, _dec, _class2, _dec2, _class3, _class4, _temp2, _class5, _temp3;

    var AttributeMap = exports.AttributeMap = (_temp = _class = function () {
      function AttributeMap(svg) {
        (this || _global).elements = Object.create(null);
        (this || _global).allElements = Object.create(null);
        (this || _global).svg = svg;
        this.registerUniversal('accesskey', 'accessKey');
        this.registerUniversal('contenteditable', 'contentEditable');
        this.registerUniversal('tabindex', 'tabIndex');
        this.registerUniversal('textcontent', 'textContent');
        this.registerUniversal('innerhtml', 'innerHTML');
        this.registerUniversal('scrolltop', 'scrollTop');
        this.registerUniversal('scrollleft', 'scrollLeft');
        this.registerUniversal('readonly', 'readOnly');
        this.register('label', 'for', 'htmlFor');
        this.register('img', 'usemap', 'useMap');
        this.register('input', 'maxlength', 'maxLength');
        this.register('input', 'minlength', 'minLength');
        this.register('input', 'formaction', 'formAction');
        this.register('input', 'formenctype', 'formEncType');
        this.register('input', 'formmethod', 'formMethod');
        this.register('input', 'formnovalidate', 'formNoValidate');
        this.register('input', 'formtarget', 'formTarget');
        this.register('textarea', 'maxlength', 'maxLength');
        this.register('td', 'rowspan', 'rowSpan');
        this.register('td', 'colspan', 'colSpan');
        this.register('th', 'rowspan', 'rowSpan');
        this.register('th', 'colspan', 'colSpan');
      }

      AttributeMap.prototype.register = function register(elementName, attributeName, propertyName) {
        elementName = elementName.toLowerCase();
        attributeName = attributeName.toLowerCase();
        var element = (this || _global).elements[elementName] = (this || _global).elements[elementName] || Object.create(null);
        element[attributeName] = propertyName;
      };

      AttributeMap.prototype.registerUniversal = function registerUniversal(attributeName, propertyName) {
        attributeName = attributeName.toLowerCase();
        (this || _global).allElements[attributeName] = propertyName;
      };

      AttributeMap.prototype.map = function map(elementName, attributeName) {
        if ((this || _global).svg.isStandardSvgAttribute(elementName, attributeName)) {
          return attributeName;
        }

        elementName = elementName.toLowerCase();
        attributeName = attributeName.toLowerCase();
        var element = (this || _global).elements[elementName];

        if (element !== undefined && attributeName in element) {
          return element[attributeName];
        }

        if (attributeName in (this || _global).allElements) {
          return (this || _global).allElements[attributeName];
        }

        if (/(?:^data-)|(?:^aria-)|:/.test(attributeName)) {
          return attributeName;
        }

        return (0, _aureliaBinding.camelCase)(attributeName);
      };

      return AttributeMap;
    }(), _class.inject = [_aureliaBinding.SVGAnalyzer], _temp);

    var InterpolationBindingExpression = exports.InterpolationBindingExpression = function () {
      function InterpolationBindingExpression(observerLocator, targetProperty, parts, mode, lookupFunctions, attribute) {
        (this || _global).observerLocator = observerLocator;
        (this || _global).targetProperty = targetProperty;
        (this || _global).parts = parts;
        (this || _global).mode = mode;
        (this || _global).lookupFunctions = lookupFunctions;
        (this || _global).attribute = (this || _global).attrToRemove = attribute;
        (this || _global).discrete = false;
      }

      InterpolationBindingExpression.prototype.createBinding = function createBinding(target) {
        if ((this || _global).parts.length === 3) {
          return new ChildInterpolationBinding(target, (this || _global).observerLocator, (this || _global).parts[1], (this || _global).mode, (this || _global).lookupFunctions, (this || _global).targetProperty, (this || _global).parts[0], (this || _global).parts[2]);
        }

        return new InterpolationBinding((this || _global).observerLocator, (this || _global).parts, target, (this || _global).targetProperty, (this || _global).mode, (this || _global).lookupFunctions);
      };

      return InterpolationBindingExpression;
    }();

    function validateTarget(target, propertyName) {
      if (propertyName === 'style') {
        LogManager.getLogger('templating-binding').info('Internet Explorer does not support interpolation in "style" attributes.  Use the style attribute\'s alias, "css" instead.');
      } else if (target.parentElement && target.parentElement.nodeName === 'TEXTAREA' && propertyName === 'textContent') {
        throw new Error('Interpolation binding cannot be used in the content of a textarea element.  Use <textarea value.bind="expression"></textarea> instead.');
      }
    }

    var InterpolationBinding = exports.InterpolationBinding = function () {
      function InterpolationBinding(observerLocator, parts, target, targetProperty, mode, lookupFunctions) {
        validateTarget(target, targetProperty);
        (this || _global).observerLocator = observerLocator;
        (this || _global).parts = parts;
        (this || _global).target = target;
        (this || _global).targetProperty = targetProperty;
        (this || _global).targetAccessor = observerLocator.getAccessor(target, targetProperty);
        (this || _global).mode = mode;
        (this || _global).lookupFunctions = lookupFunctions;
      }

      InterpolationBinding.prototype.interpolate = function interpolate() {
        if ((this || _global).isBound) {
          var value = '';
          var parts = (this || _global).parts;

          for (var i = 0, ii = parts.length; i < ii; i++) {
            value += i % 2 === 0 ? parts[i] : (this || _global)['childBinding' + i].value;
          }

          (this || _global).targetAccessor.setValue(value, (this || _global).target, (this || _global).targetProperty);
        }
      };

      InterpolationBinding.prototype.updateOneTimeBindings = function updateOneTimeBindings() {
        for (var i = 1, ii = (this || _global).parts.length; i < ii; i += 2) {
          var child = (this || _global)['childBinding' + i];

          if (child.mode === _aureliaBinding.bindingMode.oneTime) {
            child.call();
          }
        }
      };

      InterpolationBinding.prototype.bind = function bind(source) {
        if ((this || _global).isBound) {
          if ((this || _global).source === source) {
            return;
          }

          this.unbind();
        }

        (this || _global).source = source;
        var parts = (this || _global).parts;

        for (var i = 1, ii = parts.length; i < ii; i += 2) {
          var binding = new ChildInterpolationBinding(this || _global, (this || _global).observerLocator, parts[i], (this || _global).mode, (this || _global).lookupFunctions);
          binding.bind(source);
          (this || _global)['childBinding' + i] = binding;
        }

        (this || _global).isBound = true;
        this.interpolate();
      };

      InterpolationBinding.prototype.unbind = function unbind() {
        if (!(this || _global).isBound) {
          return;
        }

        (this || _global).isBound = false;
        (this || _global).source = null;
        var parts = (this || _global).parts;

        for (var i = 1, ii = parts.length; i < ii; i += 2) {
          var name = 'childBinding' + i;

          (this || _global)[name].unbind();
        }
      };

      return InterpolationBinding;
    }();

    var ChildInterpolationBinding = exports.ChildInterpolationBinding = (_dec = (0, _aureliaBinding.connectable)(), _dec(_class2 = function () {
      function ChildInterpolationBinding(target, observerLocator, sourceExpression, mode, lookupFunctions, targetProperty, left, right) {
        if (target instanceof InterpolationBinding) {
          (this || _global).parent = target;
        } else {
          validateTarget(target, targetProperty);
          (this || _global).target = target;
          (this || _global).targetProperty = targetProperty;
          (this || _global).targetAccessor = observerLocator.getAccessor(target, targetProperty);
        }

        (this || _global).observerLocator = observerLocator;
        (this || _global).sourceExpression = sourceExpression;
        (this || _global).mode = mode;
        (this || _global).lookupFunctions = lookupFunctions;
        (this || _global).left = left;
        (this || _global).right = right;
      }

      ChildInterpolationBinding.prototype.updateTarget = function updateTarget(value) {
        value = value === null || value === undefined ? '' : value.toString();

        if (value !== (this || _global).value) {
          (this || _global).value = value;

          if ((this || _global).parent) {
            (this || _global).parent.interpolate();
          } else {
            (this || _global).targetAccessor.setValue((this || _global).left + value + (this || _global).right, (this || _global).target, (this || _global).targetProperty);
          }
        }
      };

      ChildInterpolationBinding.prototype.call = function call() {
        if (!(this || _global).isBound) {
          return;
        }

        (this || _global).rawValue = (this || _global).sourceExpression.evaluate((this || _global).source, (this || _global).lookupFunctions);
        this.updateTarget((this || _global).rawValue);

        if ((this || _global).mode !== _aureliaBinding.bindingMode.oneTime) {
          (this || _global)._version++;

          (this || _global).sourceExpression.connect(this || _global, (this || _global).source);

          if ((this || _global).rawValue instanceof Array) {
            this.observeArray((this || _global).rawValue);
          }

          this.unobserve(false);
        }
      };

      ChildInterpolationBinding.prototype.bind = function bind(source) {
        if ((this || _global).isBound) {
          if ((this || _global).source === source) {
            return;
          }

          this.unbind();
        }

        (this || _global).isBound = true;
        (this || _global).source = source;
        var sourceExpression = (this || _global).sourceExpression;

        if (sourceExpression.bind) {
          sourceExpression.bind(this || _global, source, (this || _global).lookupFunctions);
        }

        (this || _global).rawValue = sourceExpression.evaluate(source, (this || _global).lookupFunctions);
        this.updateTarget((this || _global).rawValue);

        if ((this || _global).mode === _aureliaBinding.bindingMode.oneWay) {
          (0, _aureliaBinding.enqueueBindingConnect)(this || _global);
        }
      };

      ChildInterpolationBinding.prototype.unbind = function unbind() {
        if (!(this || _global).isBound) {
          return;
        }

        (this || _global).isBound = false;
        var sourceExpression = (this || _global).sourceExpression;

        if (sourceExpression.unbind) {
          sourceExpression.unbind(this || _global, (this || _global).source);
        }

        (this || _global).source = null;
        (this || _global).value = null;
        (this || _global).rawValue = null;
        this.unobserve(true);
      };

      ChildInterpolationBinding.prototype.connect = function connect(evaluate) {
        if (!(this || _global).isBound) {
          return;
        }

        if (evaluate) {
          (this || _global).rawValue = (this || _global).sourceExpression.evaluate((this || _global).source, (this || _global).lookupFunctions);
          this.updateTarget((this || _global).rawValue);
        }

        (this || _global).sourceExpression.connect(this || _global, (this || _global).source);

        if ((this || _global).rawValue instanceof Array) {
          this.observeArray((this || _global).rawValue);
        }
      };

      return ChildInterpolationBinding;
    }()) || _class2);

    var LetExpression = exports.LetExpression = function () {
      function LetExpression(observerLocator, targetProperty, sourceExpression, lookupFunctions, toBindingContext) {
        (this || _global).observerLocator = observerLocator;
        (this || _global).sourceExpression = sourceExpression;
        (this || _global).targetProperty = targetProperty;
        (this || _global).lookupFunctions = lookupFunctions;
        (this || _global).toBindingContext = toBindingContext;
      }

      LetExpression.prototype.createBinding = function createBinding() {
        return new LetBinding((this || _global).observerLocator, (this || _global).sourceExpression, (this || _global).targetProperty, (this || _global).lookupFunctions, (this || _global).toBindingContext);
      };

      return LetExpression;
    }();

    var LetBinding = exports.LetBinding = (_dec2 = (0, _aureliaBinding.connectable)(), _dec2(_class3 = function () {
      function LetBinding(observerLocator, sourceExpression, targetProperty, lookupFunctions, toBindingContext) {
        (this || _global).observerLocator = observerLocator;
        (this || _global).sourceExpression = sourceExpression;
        (this || _global).targetProperty = targetProperty;
        (this || _global).lookupFunctions = lookupFunctions;
        (this || _global).source = null;
        (this || _global).target = null;
        (this || _global).toBindingContext = toBindingContext;
      }

      LetBinding.prototype.updateTarget = function updateTarget() {
        var value = (this || _global).sourceExpression.evaluate((this || _global).source, (this || _global).lookupFunctions);

        (this || _global).target[(this || _global).targetProperty] = value;
      };

      LetBinding.prototype.call = function call(context) {
        if (!(this || _global).isBound) {
          return;
        }

        if (context === _aureliaBinding.sourceContext) {
          this.updateTarget();
          return;
        }

        throw new Error('Unexpected call context ' + context);
      };

      LetBinding.prototype.bind = function bind(source) {
        if ((this || _global).isBound) {
          if ((this || _global).source === source) {
            return;
          }

          this.unbind();
        }

        (this || _global).isBound = true;
        (this || _global).source = source;
        (this || _global).target = (this || _global).toBindingContext ? source.bindingContext : source.overrideContext;

        if ((this || _global).sourceExpression.bind) {
          (this || _global).sourceExpression.bind(this || _global, source, (this || _global).lookupFunctions);
        }

        (0, _aureliaBinding.enqueueBindingConnect)(this || _global);
      };

      LetBinding.prototype.unbind = function unbind() {
        if (!(this || _global).isBound) {
          return;
        }

        (this || _global).isBound = false;

        if ((this || _global).sourceExpression.unbind) {
          (this || _global).sourceExpression.unbind(this || _global, (this || _global).source);
        }

        (this || _global).source = null;
        (this || _global).target = null;
        this.unobserve(true);
      };

      LetBinding.prototype.connect = function connect() {
        if (!(this || _global).isBound) {
          return;
        }

        this.updateTarget();

        (this || _global).sourceExpression.connect(this || _global, (this || _global).source);
      };

      return LetBinding;
    }()) || _class3);

    var LetInterpolationBindingExpression = exports.LetInterpolationBindingExpression = function () {
      function LetInterpolationBindingExpression(observerLocator, targetProperty, parts, lookupFunctions, toBindingContext) {
        (this || _global).observerLocator = observerLocator;
        (this || _global).targetProperty = targetProperty;
        (this || _global).parts = parts;
        (this || _global).lookupFunctions = lookupFunctions;
        (this || _global).toBindingContext = toBindingContext;
      }

      LetInterpolationBindingExpression.prototype.createBinding = function createBinding() {
        return new LetInterpolationBinding((this || _global).observerLocator, (this || _global).targetProperty, (this || _global).parts, (this || _global).lookupFunctions, (this || _global).toBindingContext);
      };

      return LetInterpolationBindingExpression;
    }();

    var LetInterpolationBinding = exports.LetInterpolationBinding = function () {
      function LetInterpolationBinding(observerLocator, targetProperty, parts, lookupFunctions, toBindingContext) {
        (this || _global).observerLocator = observerLocator;
        (this || _global).parts = parts;
        (this || _global).targetProperty = targetProperty;
        (this || _global).lookupFunctions = lookupFunctions;
        (this || _global).toBindingContext = toBindingContext;
        (this || _global).target = null;
      }

      LetInterpolationBinding.prototype.bind = function bind(source) {
        if ((this || _global).isBound) {
          if ((this || _global).source === source) {
            return;
          }

          this.unbind();
        }

        (this || _global).isBound = true;
        (this || _global).source = source;
        (this || _global).target = (this || _global).toBindingContext ? source.bindingContext : source.overrideContext;
        (this || _global).interpolationBinding = this.createInterpolationBinding();

        (this || _global).interpolationBinding.bind(source);
      };

      LetInterpolationBinding.prototype.unbind = function unbind() {
        if (!(this || _global).isBound) {
          return;
        }

        (this || _global).isBound = false;
        (this || _global).source = null;
        (this || _global).target = null;

        (this || _global).interpolationBinding.unbind();

        (this || _global).interpolationBinding = null;
      };

      LetInterpolationBinding.prototype.createInterpolationBinding = function createInterpolationBinding() {
        if ((this || _global).parts.length === 3) {
          return new ChildInterpolationBinding((this || _global).target, (this || _global).observerLocator, (this || _global).parts[1], _aureliaBinding.bindingMode.oneWay, (this || _global).lookupFunctions, (this || _global).targetProperty, (this || _global).parts[0], (this || _global).parts[2]);
        }

        return new InterpolationBinding((this || _global).observerLocator, (this || _global).parts, (this || _global).target, (this || _global).targetProperty, _aureliaBinding.bindingMode.oneWay, (this || _global).lookupFunctions);
      };

      return LetInterpolationBinding;
    }();

    var SyntaxInterpreter = exports.SyntaxInterpreter = (_temp2 = _class4 = function () {
      function SyntaxInterpreter(parser, observerLocator, eventManager, attributeMap) {
        (this || _global).parser = parser;
        (this || _global).observerLocator = observerLocator;
        (this || _global).eventManager = eventManager;
        (this || _global).attributeMap = attributeMap;
      }

      SyntaxInterpreter.prototype.interpret = function interpret(resources, element, info, existingInstruction, context) {
        if (info.command in (this || _global)) {
          return this[info.command](resources, element, info, existingInstruction, context);
        }

        return this.handleUnknownCommand(resources, element, info, existingInstruction, context);
      };

      SyntaxInterpreter.prototype.handleUnknownCommand = function handleUnknownCommand(resources, element, info, existingInstruction, context) {
        LogManager.getLogger('templating-binding').warn('Unknown binding command.', info);
        return existingInstruction;
      };

      SyntaxInterpreter.prototype.determineDefaultBindingMode = function determineDefaultBindingMode(element, attrName, context) {
        var tagName = element.tagName.toLowerCase();

        if (tagName === 'input' && (attrName === 'value' || attrName === 'files') && element.type !== 'checkbox' && element.type !== 'radio' || tagName === 'input' && attrName === 'checked' && (element.type === 'checkbox' || element.type === 'radio') || (tagName === 'textarea' || tagName === 'select') && attrName === 'value' || (attrName === 'textcontent' || attrName === 'innerhtml') && element.contentEditable === 'true' || attrName === 'scrolltop' || attrName === 'scrollleft') {
          return _aureliaBinding.bindingMode.twoWay;
        }

        if (context && attrName in context.attributes && context.attributes[attrName] && context.attributes[attrName].defaultBindingMode >= _aureliaBinding.bindingMode.oneTime) {
          return context.attributes[attrName].defaultBindingMode;
        }

        return _aureliaBinding.bindingMode.oneWay;
      };

      SyntaxInterpreter.prototype.bind = function bind(resources, element, info, existingInstruction, context) {
        var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);

        instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression((this || _global).observerLocator, (this || _global).attributeMap.map(element.tagName, info.attrName), (this || _global).parser.parse(info.attrValue), info.defaultBindingMode === undefined || info.defaultBindingMode === null ? this.determineDefaultBindingMode(element, info.attrName, context) : info.defaultBindingMode, resources.lookupFunctions);
        return instruction;
      };

      SyntaxInterpreter.prototype.trigger = function trigger(resources, element, info) {
        return new _aureliaBinding.ListenerExpression((this || _global).eventManager, info.attrName, (this || _global).parser.parse(info.attrValue), _aureliaBinding.delegationStrategy.none, true, resources.lookupFunctions);
      };

      SyntaxInterpreter.prototype.capture = function capture(resources, element, info) {
        return new _aureliaBinding.ListenerExpression((this || _global).eventManager, info.attrName, (this || _global).parser.parse(info.attrValue), _aureliaBinding.delegationStrategy.capturing, true, resources.lookupFunctions);
      };

      SyntaxInterpreter.prototype.delegate = function delegate(resources, element, info) {
        return new _aureliaBinding.ListenerExpression((this || _global).eventManager, info.attrName, (this || _global).parser.parse(info.attrValue), _aureliaBinding.delegationStrategy.bubbling, true, resources.lookupFunctions);
      };

      SyntaxInterpreter.prototype.call = function call(resources, element, info, existingInstruction) {
        var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);

        instruction.attributes[info.attrName] = new _aureliaBinding.CallExpression((this || _global).observerLocator, info.attrName, (this || _global).parser.parse(info.attrValue), resources.lookupFunctions);
        return instruction;
      };

      SyntaxInterpreter.prototype.options = function options(resources, element, info, existingInstruction, context) {
        var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);

        var attrValue = info.attrValue;
        var language = (this || _global).language;
        var name = null;
        var target = '';
        var current = void 0;
        var i = void 0;
        var ii = void 0;
        var inString = false;
        var inEscape = false;
        var foundName = false;

        for (i = 0, ii = attrValue.length; i < ii; ++i) {
          current = attrValue[i];

          if (current === ';' && !inString) {
            if (!foundName) {
              name = this._getPrimaryPropertyName(resources, context);
            }

            info = language.inspectAttribute(resources, '?', name, target.trim());
            language.createAttributeInstruction(resources, element, info, instruction, context);

            if (!instruction.attributes[info.attrName]) {
              instruction.attributes[info.attrName] = info.attrValue;
            }

            target = '';
            name = null;
          } else if (current === ':' && name === null) {
            foundName = true;
            name = target.trim();
            target = '';
          } else if (current === '\\') {
            target += current;
            inEscape = true;
            continue;
          } else {
            target += current;

            if (name !== null && inEscape === false && current === '\'') {
              inString = !inString;
            }
          }

          inEscape = false;
        }

        if (!foundName) {
          name = this._getPrimaryPropertyName(resources, context);
        }

        if (name !== null) {
          info = language.inspectAttribute(resources, '?', name, target.trim());
          language.createAttributeInstruction(resources, element, info, instruction, context);

          if (!instruction.attributes[info.attrName]) {
            instruction.attributes[info.attrName] = info.attrValue;
          }
        }

        return instruction;
      };

      SyntaxInterpreter.prototype._getPrimaryPropertyName = function _getPrimaryPropertyName(resources, context) {
        var type = resources.getAttribute(context.attributeName);

        if (type && type.primaryProperty) {
          return type.primaryProperty.attribute;
        }

        return null;
      };

      SyntaxInterpreter.prototype['for'] = function _for(resources, element, info, existingInstruction) {
        var parts = void 0;
        var keyValue = void 0;
        var instruction = void 0;
        var attrValue = void 0;
        var isDestructuring = void 0;
        attrValue = info.attrValue;
        isDestructuring = attrValue.match(/^ *[[].+[\]]/);
        parts = isDestructuring ? attrValue.split('of ') : attrValue.split(' of ');

        if (parts.length !== 2) {
          throw new Error('Incorrect syntax for "for". The form is: "$local of $items" or "[$key, $value] of $items".');
        }

        instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);

        if (isDestructuring) {
          keyValue = parts[0].replace(/[[\]]/g, '').replace(/,/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
          instruction.attributes.key = keyValue[0];
          instruction.attributes.value = keyValue[1];
        } else {
          instruction.attributes.local = parts[0];
        }

        instruction.attributes.items = new _aureliaBinding.BindingExpression((this || _global).observerLocator, 'items', (this || _global).parser.parse(parts[1]), _aureliaBinding.bindingMode.oneWay, resources.lookupFunctions);
        return instruction;
      };

      SyntaxInterpreter.prototype['two-way'] = function twoWay(resources, element, info, existingInstruction) {
        var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);

        instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression((this || _global).observerLocator, (this || _global).attributeMap.map(element.tagName, info.attrName), (this || _global).parser.parse(info.attrValue), _aureliaBinding.bindingMode.twoWay, resources.lookupFunctions);
        return instruction;
      };

      SyntaxInterpreter.prototype['to-view'] = function toView(resources, element, info, existingInstruction) {
        var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);

        instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression((this || _global).observerLocator, (this || _global).attributeMap.map(element.tagName, info.attrName), (this || _global).parser.parse(info.attrValue), _aureliaBinding.bindingMode.toView, resources.lookupFunctions);
        return instruction;
      };

      SyntaxInterpreter.prototype['from-view'] = function fromView(resources, element, info, existingInstruction) {
        var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);

        instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression((this || _global).observerLocator, (this || _global).attributeMap.map(element.tagName, info.attrName), (this || _global).parser.parse(info.attrValue), _aureliaBinding.bindingMode.fromView, resources.lookupFunctions);
        return instruction;
      };

      SyntaxInterpreter.prototype['one-time'] = function oneTime(resources, element, info, existingInstruction) {
        var instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(info.attrName);

        instruction.attributes[info.attrName] = new _aureliaBinding.BindingExpression((this || _global).observerLocator, (this || _global).attributeMap.map(element.tagName, info.attrName), (this || _global).parser.parse(info.attrValue), _aureliaBinding.bindingMode.oneTime, resources.lookupFunctions);
        return instruction;
      };

      return SyntaxInterpreter;
    }(), _class4.inject = [_aureliaBinding.Parser, _aureliaBinding.ObserverLocator, _aureliaBinding.EventManager, AttributeMap], _temp2);
    SyntaxInterpreter.prototype['one-way'] = SyntaxInterpreter.prototype['to-view'];
    var info = {};
    var TemplatingBindingLanguage = exports.TemplatingBindingLanguage = (_temp3 = _class5 = function (_BindingLanguage) {
      _inherits(TemplatingBindingLanguage, _BindingLanguage);

      function TemplatingBindingLanguage(parser, observerLocator, syntaxInterpreter, attributeMap) {
        var _this = _possibleConstructorReturn(this || _global, _BindingLanguage.call(this || _global));

        _this.parser = parser;
        _this.observerLocator = observerLocator;
        _this.syntaxInterpreter = syntaxInterpreter;
        _this.emptyStringExpression = _this.parser.parse('\'\'');
        syntaxInterpreter.language = _this;
        _this.attributeMap = attributeMap;
        _this.toBindingContextAttr = 'to-binding-context';
        return _this;
      }

      TemplatingBindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, elementName, attrName, attrValue) {
        var parts = attrName.split('.');
        info.defaultBindingMode = null;

        if (parts.length === 2) {
          info.attrName = parts[0].trim();
          info.attrValue = attrValue;
          info.command = parts[1].trim();

          if (info.command === 'ref') {
            info.expression = new _aureliaBinding.NameExpression((this || _global).parser.parse(attrValue), info.attrName, resources.lookupFunctions);
            info.command = null;
            info.attrName = 'ref';
          } else {
            info.expression = null;
          }
        } else if (attrName === 'ref') {
          info.attrName = attrName;
          info.attrValue = attrValue;
          info.command = null;
          info.expression = new _aureliaBinding.NameExpression((this || _global).parser.parse(attrValue), 'element', resources.lookupFunctions);
        } else {
          info.attrName = attrName;
          info.attrValue = attrValue;
          info.command = null;
          var interpolationParts = this.parseInterpolation(resources, attrValue);

          if (interpolationParts === null) {
            info.expression = null;
          } else {
            info.expression = new InterpolationBindingExpression((this || _global).observerLocator, (this || _global).attributeMap.map(elementName, attrName), interpolationParts, _aureliaBinding.bindingMode.oneWay, resources.lookupFunctions, attrName);
          }
        }

        return info;
      };

      TemplatingBindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, theInfo, existingInstruction, context) {
        var instruction = void 0;

        if (theInfo.expression) {
          if (theInfo.attrName === 'ref') {
            return theInfo.expression;
          }

          instruction = existingInstruction || _aureliaTemplating.BehaviorInstruction.attribute(theInfo.attrName);
          instruction.attributes[theInfo.attrName] = theInfo.expression;
        } else if (theInfo.command) {
          instruction = (this || _global).syntaxInterpreter.interpret(resources, element, theInfo, existingInstruction, context);
        }

        return instruction;
      };

      TemplatingBindingLanguage.prototype.createLetExpressions = function createLetExpressions(resources, letElement) {
        var expressions = [];
        var attributes = letElement.attributes;
        var attr = void 0;
        var parts = void 0;
        var attrName = void 0;
        var attrValue = void 0;
        var command = void 0;
        var toBindingContextAttr = (this || _global).toBindingContextAttr;
        var toBindingContext = letElement.hasAttribute(toBindingContextAttr);

        for (var i = 0, ii = attributes.length; ii > i; ++i) {
          attr = attributes[i];
          attrName = attr.name;
          attrValue = attr.nodeValue;
          parts = attrName.split('.');

          if (attrName === toBindingContextAttr) {
            continue;
          }

          if (parts.length === 2) {
            command = parts[1];

            if (command !== 'bind') {
              LogManager.getLogger('templating-binding-language').warn('Detected invalid let command. Expected "' + parts[0] + '.bind", given "' + attrName + '"');
              continue;
            }

            expressions.push(new LetExpression((this || _global).observerLocator, (0, _aureliaBinding.camelCase)(parts[0]), (this || _global).parser.parse(attrValue), resources.lookupFunctions, toBindingContext));
          } else {
            attrName = (0, _aureliaBinding.camelCase)(attrName);
            parts = this.parseInterpolation(resources, attrValue);

            if (parts === null) {
              LogManager.getLogger('templating-binding-language').warn('Detected string literal in let bindings. Did you mean "' + attrName + '.bind=' + attrValue + '" or "' + attrName + '=${' + attrValue + '}" ?');
            }

            if (parts) {
              expressions.push(new LetInterpolationBindingExpression((this || _global).observerLocator, attrName, parts, resources.lookupFunctions, toBindingContext));
            } else {
              expressions.push(new LetExpression((this || _global).observerLocator, attrName, new _aureliaBinding.LiteralString(attrValue), resources.lookupFunctions, toBindingContext));
            }
          }
        }

        return expressions;
      };

      TemplatingBindingLanguage.prototype.inspectTextContent = function inspectTextContent(resources, value) {
        var parts = this.parseInterpolation(resources, value);

        if (parts === null) {
          return null;
        }

        return new InterpolationBindingExpression((this || _global).observerLocator, 'textContent', parts, _aureliaBinding.bindingMode.oneWay, resources.lookupFunctions, 'textContent');
      };

      TemplatingBindingLanguage.prototype.parseInterpolation = function parseInterpolation(resources, value) {
        var i = value.indexOf('${', 0);
        var ii = value.length;
        var char = void 0;
        var pos = 0;
        var open = 0;
        var quote = null;
        var interpolationStart = void 0;
        var parts = void 0;
        var partIndex = 0;

        while (i >= 0 && i < ii - 2) {
          open = 1;
          interpolationStart = i;
          i += 2;

          do {
            char = value[i];
            i++;

            if (char === "'" || char === '"') {
              if (quote === null) {
                quote = char;
              } else if (quote === char) {
                quote = null;
              }

              continue;
            }

            if (char === '\\') {
              i++;
              continue;
            }

            if (quote !== null) {
              continue;
            }

            if (char === '{') {
              open++;
            } else if (char === '}') {
              open--;
            }
          } while (open > 0 && i < ii);

          if (open === 0) {
            parts = parts || [];

            if (value[interpolationStart - 1] === '\\' && value[interpolationStart - 2] !== '\\') {
              parts[partIndex] = value.substring(pos, interpolationStart - 1) + value.substring(interpolationStart, i);
              partIndex++;
              parts[partIndex] = (this || _global).emptyStringExpression;
              partIndex++;
            } else {
              parts[partIndex] = value.substring(pos, interpolationStart);
              partIndex++;
              parts[partIndex] = (this || _global).parser.parse(value.substring(interpolationStart + 2, i - 1));
              partIndex++;
            }

            pos = i;
            i = value.indexOf('${', i);
          } else {
            break;
          }
        }

        if (partIndex === 0) {
          return null;
        }

        parts[partIndex] = value.substr(pos);
        return parts;
      };

      return TemplatingBindingLanguage;
    }(_aureliaTemplating.BindingLanguage), _class5.inject = [_aureliaBinding.Parser, _aureliaBinding.ObserverLocator, SyntaxInterpreter, AttributeMap], _temp3);

    function configure(config) {
      config.container.registerSingleton(_aureliaTemplating.BindingLanguage, TemplatingBindingLanguage);
      config.container.registerAlias(_aureliaTemplating.BindingLanguage, TemplatingBindingLanguage);
    }
  });
  return exports;
}