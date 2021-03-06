var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["../core", "../var/indexOf", "./var/rneedsContext", "../selector"], function (jQuery, indexOf, rneedsContext) {
    var risSimple = /^.[^:#\[\.,]*$/; // Implement the identical functionality for filter and not

    function winnow(elements, qualifier, not) {
      if (jQuery.isFunction(qualifier)) {
        return jQuery.grep(elements, function (elem, i) {
          /* jshint -W018 */
          return !!qualifier.call(elem, i, elem) !== not;
        });
      }

      if (qualifier.nodeType) {
        return jQuery.grep(elements, function (elem) {
          return elem === qualifier !== not;
        });
      }

      if (typeof qualifier === "string") {
        if (risSimple.test(qualifier)) {
          return jQuery.filter(qualifier, elements, not);
        }

        qualifier = jQuery.filter(qualifier, elements);
      }

      return jQuery.grep(elements, function (elem) {
        return indexOf.call(qualifier, elem) > -1 !== not;
      });
    }

    jQuery.filter = function (expr, elems, not) {
      var elem = elems[0];

      if (not) {
        expr = ":not(" + expr + ")";
      }

      return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
        return elem.nodeType === 1;
      }));
    };

    jQuery.fn.extend({
      find: function (selector) {
        var i,
            len = (this || _global).length,
            ret = [],
            self = this || _global;

        if (typeof selector !== "string") {
          return this.pushStack(jQuery(selector).filter(function () {
            for (i = 0; i < len; i++) {
              if (jQuery.contains(self[i], this || _global)) {
                return true;
              }
            }
          }));
        }

        for (i = 0; i < len; i++) {
          jQuery.find(selector, self[i], ret);
        } // Needed because $( selector, context ) becomes $( context ).find( selector )


        ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
        ret.selector = (this || _global).selector ? (this || _global).selector + " " + selector : selector;
        return ret;
      },
      filter: function (selector) {
        return this.pushStack(winnow(this || _global, selector || [], false));
      },
      not: function (selector) {
        return this.pushStack(winnow(this || _global, selector || [], true));
      },
      is: function (selector) {
        return !!winnow(this || _global, // If this is a positional/relative selector, check membership in the returned set
        // so $("p:first").is("p:last") won't return true for a doc with two "p".
        typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
      }
    });
  });
  return exports;
}