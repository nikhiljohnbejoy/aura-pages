var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  // Initialize a jQuery object
  define(["../core", "../var/document", "./var/rsingleTag", "../traversing/findFilter"], function (jQuery, document, rsingleTag) {
    // A central reference to the root jQuery(document)
    var rootjQuery,
        // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    // Strict HTML recognition (#11290: must start with <)
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        init = jQuery.fn.init = function (selector, context, root) {
      var match, elem; // HANDLE: $(""), $(null), $(undefined), $(false)

      if (!selector) {
        return this || _global;
      } // Method init() accepts an alternate rootjQuery
      // so migrate can support jQuery.sub (gh-2101)


      root = root || rootjQuery; // Handle HTML strings

      if (typeof selector === "string") {
        if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
          // Assume that strings that start and end with <> are HTML and skip the regex check
          match = [null, selector, null];
        } else {
          match = rquickExpr.exec(selector);
        } // Match html or make sure no context is specified for #id


        if (match && (match[1] || !context)) {
          // HANDLE: $(html) -> $(array)
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context; // Option to run scripts is true for back-compat
            // Intentionally let the error be thrown if parseHTML is not present

            jQuery.merge(this || _global, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true)); // HANDLE: $(html, props)

            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                // Properties of context are called as methods if possible
                if (jQuery.isFunction((this || _global)[match])) {
                  this[match](context[match]); // ...and otherwise set as attributes
                } else {
                  this.attr(match, context[match]);
                }
              }
            }

            return this || _global; // HANDLE: $(#id)
          } else {
            elem = document.getElementById(match[2]); // Support: Blackberry 4.6
            // gEBID returns nodes no longer in the document (#6963)

            if (elem && elem.parentNode) {
              // Inject the element directly into the jQuery object
              (this || _global).length = 1;
              (this || _global)[0] = elem;
            }

            (this || _global).context = document;
            (this || _global).selector = selector;
            return this || _global;
          } // HANDLE: $(expr, $(...))

        } else if (!context || context.jquery) {
          return (context || root).find(selector); // HANDLE: $(expr, context)
          // (which is just equivalent to: $(context).find(expr)
        } else {
          return this.constructor(context).find(selector);
        } // HANDLE: $(DOMElement)

      } else if (selector.nodeType) {
        (this || _global).context = (this || _global)[0] = selector;
        (this || _global).length = 1;
        return this || _global; // HANDLE: $(function)
        // Shortcut for document ready
      } else if (jQuery.isFunction(selector)) {
        return root.ready !== undefined ? root.ready(selector) : // Execute immediately if ready is not present
        selector(jQuery);
      }

      if (selector.selector !== undefined) {
        (this || _global).selector = selector.selector;
        (this || _global).context = selector.context;
      }

      return jQuery.makeArray(selector, this || _global);
    }; // Give the init function the jQuery prototype for later instantiation


    init.prototype = jQuery.fn; // Initialize central reference

    rootjQuery = jQuery(document);
    return init;
  });
  return exports;
}