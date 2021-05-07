var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  /* ========================================================================
   * Bootstrap: affix.js v3.4.1
   * https://getbootstrap.com/docs/3.4/javascript/#affix
   * ========================================================================
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */
  +function ($) {
    'use strict'; // AFFIX CLASS DEFINITION
    // ======================

    var Affix = function (element, options) {
      (this || _global).options = $.extend({}, Affix.DEFAULTS, options);
      var target = (this || _global).options.target === Affix.DEFAULTS.target ? $((this || _global).options.target) : $(document).find((this || _global).options.target);
      (this || _global).$target = target.on('scroll.bs.affix.data-api', $.proxy((this || _global).checkPosition, this || _global)).on('click.bs.affix.data-api', $.proxy((this || _global).checkPositionWithEventLoop, this || _global));
      (this || _global).$element = $(element);
      (this || _global).affixed = null;
      (this || _global).unpin = null;
      (this || _global).pinnedOffset = null;
      this.checkPosition();
    };

    Affix.VERSION = '3.4.1';
    Affix.RESET = 'affix affix-top affix-bottom';
    Affix.DEFAULTS = {
      offset: 0,
      target: window
    };

    Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
      var scrollTop = (this || _global).$target.scrollTop();

      var position = (this || _global).$element.offset();

      var targetHeight = (this || _global).$target.height();

      if (offsetTop != null && (this || _global).affixed == 'top') return scrollTop < offsetTop ? 'top' : false;

      if ((this || _global).affixed == 'bottom') {
        if (offsetTop != null) return scrollTop + (this || _global).unpin <= position.top ? false : 'bottom';
        return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : 'bottom';
      }

      var initializing = (this || _global).affixed == null;
      var colliderTop = initializing ? scrollTop : position.top;
      var colliderHeight = initializing ? targetHeight : height;
      if (offsetTop != null && scrollTop <= offsetTop) return 'top';
      if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom) return 'bottom';
      return false;
    };

    Affix.prototype.getPinnedOffset = function () {
      if ((this || _global).pinnedOffset) return (this || _global).pinnedOffset;

      (this || _global).$element.removeClass(Affix.RESET).addClass('affix');

      var scrollTop = (this || _global).$target.scrollTop();

      var position = (this || _global).$element.offset();

      return (this || _global).pinnedOffset = position.top - scrollTop;
    };

    Affix.prototype.checkPositionWithEventLoop = function () {
      setTimeout($.proxy((this || _global).checkPosition, this || _global), 1);
    };

    Affix.prototype.checkPosition = function () {
      if (!(this || _global).$element.is(':visible')) return;

      var height = (this || _global).$element.height();

      var offset = (this || _global).options.offset;
      var offsetTop = offset.top;
      var offsetBottom = offset.bottom;
      var scrollHeight = Math.max($(document).height(), $(document.body).height());
      if (typeof offset != 'object') offsetBottom = offsetTop = offset;
      if (typeof offsetTop == 'function') offsetTop = offset.top((this || _global).$element);
      if (typeof offsetBottom == 'function') offsetBottom = offset.bottom((this || _global).$element);
      var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);

      if ((this || _global).affixed != affix) {
        if ((this || _global).unpin != null) (this || _global).$element.css('top', '');
        var affixType = 'affix' + (affix ? '-' + affix : '');
        var e = $.Event(affixType + '.bs.affix');

        (this || _global).$element.trigger(e);

        if (e.isDefaultPrevented()) return;
        (this || _global).affixed = affix;
        (this || _global).unpin = affix == 'bottom' ? this.getPinnedOffset() : null;

        (this || _global).$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
      }

      if (affix == 'bottom') {
        (this || _global).$element.offset({
          top: scrollHeight - height - offsetBottom
        });
      }
    }; // AFFIX PLUGIN DEFINITION
    // =======================


    function Plugin(option) {
      return this.each(function () {
        var $this = $(this || _global);
        var data = $this.data('bs.affix');
        var options = typeof option == 'object' && option;
        if (!data) $this.data('bs.affix', data = new Affix(this || _global, options));
        if (typeof option == 'string') data[option]();
      });
    }

    var old = $.fn.affix;
    $.fn.affix = Plugin;
    $.fn.affix.Constructor = Affix; // AFFIX NO CONFLICT
    // =================

    $.fn.affix.noConflict = function () {
      $.fn.affix = old;
      return this || _global;
    }; // AFFIX DATA-API
    // ==============


    $(window).on('load', function () {
      $('[data-spy="affix"]').each(function () {
        var $spy = $(this || _global);
        var data = $spy.data();
        data.offset = data.offset || {};
        if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
        if (data.offsetTop != null) data.offset.top = data.offsetTop;
        Plugin.call($spy, data);
      });
    });
  }(jQuery);
  return exports;
}