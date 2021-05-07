var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["../core", "../css"], function (jQuery) {
    function Tween(elem, options, prop, end, easing) {
      return new Tween.prototype.init(elem, options, prop, end, easing);
    }

    jQuery.Tween = Tween;
    Tween.prototype = {
      constructor: Tween,
      init: function (elem, options, prop, end, easing, unit) {
        (this || _global).elem = elem;
        (this || _global).prop = prop;
        (this || _global).easing = easing || jQuery.easing._default;
        (this || _global).options = options;
        (this || _global).start = (this || _global).now = this.cur();
        (this || _global).end = end;
        (this || _global).unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
      },
      cur: function () {
        var hooks = Tween.propHooks[(this || _global).prop];
        return hooks && hooks.get ? hooks.get(this || _global) : Tween.propHooks._default.get(this || _global);
      },
      run: function (percent) {
        var eased,
            hooks = Tween.propHooks[(this || _global).prop];

        if ((this || _global).options.duration) {
          (this || _global).pos = eased = jQuery.easing[(this || _global).easing](percent, (this || _global).options.duration * percent, 0, 1, (this || _global).options.duration);
        } else {
          (this || _global).pos = eased = percent;
        }

        (this || _global).now = ((this || _global).end - (this || _global).start) * eased + (this || _global).start;

        if ((this || _global).options.step) {
          (this || _global).options.step.call((this || _global).elem, (this || _global).now, this || _global);
        }

        if (hooks && hooks.set) {
          hooks.set(this || _global);
        } else {
          Tween.propHooks._default.set(this || _global);
        }

        return this || _global;
      }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
      _default: {
        get: function (tween) {
          var result; // Use a property on the element directly when it is not a DOM element,
          // or when there is no matching style property that exists.

          if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
            return tween.elem[tween.prop];
          } // Passing an empty string as a 3rd parameter to .css will automatically
          // attempt a parseFloat and fallback to a string if the parse fails.
          // Simple values such as "10px" are parsed to Float;
          // complex values such as "rotate(1rad)" are returned as-is.


          result = jQuery.css(tween.elem, tween.prop, ""); // Empty strings, null, undefined and "auto" are converted to 0.

          return !result || result === "auto" ? 0 : result;
        },
        set: function (tween) {
          // Use step hook for back compat.
          // Use cssHook if its there.
          // Use .style if available and use plain properties where available.
          if (jQuery.fx.step[tween.prop]) {
            jQuery.fx.step[tween.prop](tween);
          } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
          } else {
            tween.elem[tween.prop] = tween.now;
          }
        }
      }
    }; // Support: IE9
    // Panic based approach to setting things on disconnected nodes

    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
      set: function (tween) {
        if (tween.elem.nodeType && tween.elem.parentNode) {
          tween.elem[tween.prop] = tween.now;
        }
      }
    };
    jQuery.easing = {
      linear: function (p) {
        return p;
      },
      swing: function (p) {
        return 0.5 - Math.cos(p * Math.PI) / 2;
      },
      _default: "swing"
    };
    jQuery.fx = Tween.prototype.init; // Back Compat <1.8 extension point

    jQuery.fx.step = {};
  });
  return exports;
}