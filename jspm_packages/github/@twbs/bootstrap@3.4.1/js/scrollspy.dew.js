var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  /* ========================================================================
   * Bootstrap: scrollspy.js v3.4.1
   * https://getbootstrap.com/docs/3.4/javascript/#scrollspy
   * ========================================================================
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */
  +function ($) {
    'use strict'; // SCROLLSPY CLASS DEFINITION
    // ==========================

    function ScrollSpy(element, options) {
      (this || _global).$body = $(document.body);
      (this || _global).$scrollElement = $(element).is(document.body) ? $(window) : $(element);
      (this || _global).options = $.extend({}, ScrollSpy.DEFAULTS, options);
      (this || _global).selector = ((this || _global).options.target || '') + ' .nav li > a';
      (this || _global).offsets = [];
      (this || _global).targets = [];
      (this || _global).activeTarget = null;
      (this || _global).scrollHeight = 0;

      (this || _global).$scrollElement.on('scroll.bs.scrollspy', $.proxy((this || _global).process, this || _global));

      this.refresh();
      this.process();
    }

    ScrollSpy.VERSION = '3.4.1';
    ScrollSpy.DEFAULTS = {
      offset: 10
    };

    ScrollSpy.prototype.getScrollHeight = function () {
      return (this || _global).$scrollElement[0].scrollHeight || Math.max((this || _global).$body[0].scrollHeight, document.documentElement.scrollHeight);
    };

    ScrollSpy.prototype.refresh = function () {
      var that = this || _global;
      var offsetMethod = 'offset';
      var offsetBase = 0;
      (this || _global).offsets = [];
      (this || _global).targets = [];
      (this || _global).scrollHeight = this.getScrollHeight();

      if (!$.isWindow((this || _global).$scrollElement[0])) {
        offsetMethod = 'position';
        offsetBase = (this || _global).$scrollElement.scrollTop();
      }

      (this || _global).$body.find((this || _global).selector).map(function () {
        var $el = $(this || _global);
        var href = $el.data('target') || $el.attr('href');
        var $href = /^#./.test(href) && $(href);
        return $href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]] || null;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).each(function () {
        that.offsets.push((this || _global)[0]);
        that.targets.push((this || _global)[1]);
      });
    };

    ScrollSpy.prototype.process = function () {
      var scrollTop = (this || _global).$scrollElement.scrollTop() + (this || _global).options.offset;

      var scrollHeight = this.getScrollHeight();

      var maxScroll = (this || _global).options.offset + scrollHeight - (this || _global).$scrollElement.height();

      var offsets = (this || _global).offsets;
      var targets = (this || _global).targets;
      var activeTarget = (this || _global).activeTarget;
      var i;

      if ((this || _global).scrollHeight != scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
      }

      if (activeTarget && scrollTop < offsets[0]) {
        (this || _global).activeTarget = null;
        return this.clear();
      }

      for (i = offsets.length; i--;) {
        activeTarget != targets[i] && scrollTop >= offsets[i] && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1]) && this.activate(targets[i]);
      }
    };

    ScrollSpy.prototype.activate = function (target) {
      (this || _global).activeTarget = target;
      this.clear();
      var selector = (this || _global).selector + '[data-target="' + target + '"],' + (this || _global).selector + '[href="' + target + '"]';
      var active = $(selector).parents('li').addClass('active');

      if (active.parent('.dropdown-menu').length) {
        active = active.closest('li.dropdown').addClass('active');
      }

      active.trigger('activate.bs.scrollspy');
    };

    ScrollSpy.prototype.clear = function () {
      $((this || _global).selector).parentsUntil((this || _global).options.target, '.active').removeClass('active');
    }; // SCROLLSPY PLUGIN DEFINITION
    // ===========================


    function Plugin(option) {
      return this.each(function () {
        var $this = $(this || _global);
        var data = $this.data('bs.scrollspy');
        var options = typeof option == 'object' && option;
        if (!data) $this.data('bs.scrollspy', data = new ScrollSpy(this || _global, options));
        if (typeof option == 'string') data[option]();
      });
    }

    var old = $.fn.scrollspy;
    $.fn.scrollspy = Plugin;
    $.fn.scrollspy.Constructor = ScrollSpy; // SCROLLSPY NO CONFLICT
    // =====================

    $.fn.scrollspy.noConflict = function () {
      $.fn.scrollspy = old;
      return this || _global;
    }; // SCROLLSPY DATA-API
    // ==================


    $(window).on('load.bs.scrollspy.data-api', function () {
      $('[data-spy="scroll"]').each(function () {
        var $spy = $(this || _global);
        Plugin.call($spy, $spy.data());
      });
    });
  }(jQuery);
  return exports;
}