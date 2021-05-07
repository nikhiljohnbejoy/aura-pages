var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(["./core", "./core/init", "./manipulation", // clone
  "./traversing" // parent, contents
  ], function (jQuery) {
    jQuery.fn.extend({
      wrapAll: function (html) {
        var wrap;

        if (jQuery.isFunction(html)) {
          return this.each(function (i) {
            jQuery(this || _global).wrapAll(html.call(this || _global, i));
          });
        }

        if ((this || _global)[0]) {
          // The elements to wrap the target around
          wrap = jQuery(html, (this || _global)[0].ownerDocument).eq(0).clone(true);

          if ((this || _global)[0].parentNode) {
            wrap.insertBefore((this || _global)[0]);
          }

          wrap.map(function () {
            var elem = this || _global;

            while (elem.firstElementChild) {
              elem = elem.firstElementChild;
            }

            return elem;
          }).append(this || _global);
        }

        return this || _global;
      },
      wrapInner: function (html) {
        if (jQuery.isFunction(html)) {
          return this.each(function (i) {
            jQuery(this || _global).wrapInner(html.call(this || _global, i));
          });
        }

        return this.each(function () {
          var self = jQuery(this || _global),
              contents = self.contents();

          if (contents.length) {
            contents.wrapAll(html);
          } else {
            self.append(html);
          }
        });
      },
      wrap: function (html) {
        var isFunction = jQuery.isFunction(html);
        return this.each(function (i) {
          jQuery(this || _global).wrapAll(isFunction ? html.call(this || _global, i) : html);
        });
      },
      unwrap: function () {
        return this.parent().each(function () {
          if (!jQuery.nodeName(this || _global, "body")) {
            jQuery(this || _global).replaceWith((this || _global).childNodes);
          }
        }).end();
      }
    });
    return jQuery;
  });
  return exports;
}