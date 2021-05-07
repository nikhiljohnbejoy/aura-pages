var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  /* ========================================================================
   * Bootstrap: carousel.js v3.4.1
   * https://getbootstrap.com/docs/3.4/javascript/#carousel
   * ========================================================================
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */
  +function ($) {
    'use strict'; // CAROUSEL CLASS DEFINITION
    // =========================

    var Carousel = function (element, options) {
      (this || _global).$element = $(element);
      (this || _global).$indicators = (this || _global).$element.find('.carousel-indicators');
      (this || _global).options = options;
      (this || _global).paused = null;
      (this || _global).sliding = null;
      (this || _global).interval = null;
      (this || _global).$active = null;
      (this || _global).$items = null;
      (this || _global).options.keyboard && (this || _global).$element.on('keydown.bs.carousel', $.proxy((this || _global).keydown, this || _global));
      (this || _global).options.pause == 'hover' && !('ontouchstart' in document.documentElement) && (this || _global).$element.on('mouseenter.bs.carousel', $.proxy((this || _global).pause, this || _global)).on('mouseleave.bs.carousel', $.proxy((this || _global).cycle, this || _global));
    };

    Carousel.VERSION = '3.4.1';
    Carousel.TRANSITION_DURATION = 600;
    Carousel.DEFAULTS = {
      interval: 5000,
      pause: 'hover',
      wrap: true,
      keyboard: true
    };

    Carousel.prototype.keydown = function (e) {
      if (/input|textarea/i.test(e.target.tagName)) return;

      switch (e.which) {
        case 37:
          this.prev();
          break;

        case 39:
          this.next();
          break;

        default:
          return;
      }

      e.preventDefault();
    };

    Carousel.prototype.cycle = function (e) {
      e || ((this || _global).paused = false);
      (this || _global).interval && clearInterval((this || _global).interval);
      (this || _global).options.interval && !(this || _global).paused && ((this || _global).interval = setInterval($.proxy((this || _global).next, this || _global), (this || _global).options.interval));
      return this || _global;
    };

    Carousel.prototype.getItemIndex = function (item) {
      (this || _global).$items = item.parent().children('.item');
      return (this || _global).$items.index(item || (this || _global).$active);
    };

    Carousel.prototype.getItemForDirection = function (direction, active) {
      var activeIndex = this.getItemIndex(active);
      var willWrap = direction == 'prev' && activeIndex === 0 || direction == 'next' && activeIndex == (this || _global).$items.length - 1;
      if (willWrap && !(this || _global).options.wrap) return active;
      var delta = direction == 'prev' ? -1 : 1;
      var itemIndex = (activeIndex + delta) % (this || _global).$items.length;
      return (this || _global).$items.eq(itemIndex);
    };

    Carousel.prototype.to = function (pos) {
      var that = this || _global;
      var activeIndex = this.getItemIndex((this || _global).$active = (this || _global).$element.find('.item.active'));
      if (pos > (this || _global).$items.length - 1 || pos < 0) return;
      if ((this || _global).sliding) return (this || _global).$element.one('slid.bs.carousel', function () {
        that.to(pos);
      }); // yes, "slid"

      if (activeIndex == pos) return this.pause().cycle();
      return this.slide(pos > activeIndex ? 'next' : 'prev', (this || _global).$items.eq(pos));
    };

    Carousel.prototype.pause = function (e) {
      e || ((this || _global).paused = true);

      if ((this || _global).$element.find('.next, .prev').length && $.support.transition) {
        (this || _global).$element.trigger($.support.transition.end);

        this.cycle(true);
      }

      (this || _global).interval = clearInterval((this || _global).interval);
      return this || _global;
    };

    Carousel.prototype.next = function () {
      if ((this || _global).sliding) return;
      return this.slide('next');
    };

    Carousel.prototype.prev = function () {
      if ((this || _global).sliding) return;
      return this.slide('prev');
    };

    Carousel.prototype.slide = function (type, next) {
      var $active = (this || _global).$element.find('.item.active');

      var $next = next || this.getItemForDirection(type, $active);
      var isCycling = (this || _global).interval;
      var direction = type == 'next' ? 'left' : 'right';
      var that = this || _global;
      if ($next.hasClass('active')) return (this || _global).sliding = false;
      var relatedTarget = $next[0];
      var slideEvent = $.Event('slide.bs.carousel', {
        relatedTarget: relatedTarget,
        direction: direction
      });

      (this || _global).$element.trigger(slideEvent);

      if (slideEvent.isDefaultPrevented()) return;
      (this || _global).sliding = true;
      isCycling && this.pause();

      if ((this || _global).$indicators.length) {
        (this || _global).$indicators.find('.active').removeClass('active');

        var $nextIndicator = $((this || _global).$indicators.children()[this.getItemIndex($next)]);
        $nextIndicator && $nextIndicator.addClass('active');
      }

      var slidEvent = $.Event('slid.bs.carousel', {
        relatedTarget: relatedTarget,
        direction: direction
      }); // yes, "slid"

      if ($.support.transition && (this || _global).$element.hasClass('slide')) {
        $next.addClass(type);

        if (typeof $next === 'object' && $next.length) {
          $next[0].offsetWidth; // force reflow
        }

        $active.addClass(direction);
        $next.addClass(direction);
        $active.one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active');
          $active.removeClass(['active', direction].join(' '));
          that.sliding = false;
          setTimeout(function () {
            that.$element.trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
      } else {
        $active.removeClass('active');
        $next.addClass('active');
        (this || _global).sliding = false;

        (this || _global).$element.trigger(slidEvent);
      }

      isCycling && this.cycle();
      return this || _global;
    }; // CAROUSEL PLUGIN DEFINITION
    // ==========================


    function Plugin(option) {
      return this.each(function () {
        var $this = $(this || _global);
        var data = $this.data('bs.carousel');
        var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option);
        var action = typeof option == 'string' ? option : options.slide;
        if (!data) $this.data('bs.carousel', data = new Carousel(this || _global, options));
        if (typeof option == 'number') data.to(option);else if (action) data[action]();else if (options.interval) data.pause().cycle();
      });
    }

    var old = $.fn.carousel;
    $.fn.carousel = Plugin;
    $.fn.carousel.Constructor = Carousel; // CAROUSEL NO CONFLICT
    // ====================

    $.fn.carousel.noConflict = function () {
      $.fn.carousel = old;
      return this || _global;
    }; // CAROUSEL DATA-API
    // =================


    var clickHandler = function (e) {
      var $this = $(this || _global);
      var href = $this.attr('href');

      if (href) {
        href = href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7
      }

      var target = $this.attr('data-target') || href;
      var $target = $(document).find(target);
      if (!$target.hasClass('carousel')) return;
      var options = $.extend({}, $target.data(), $this.data());
      var slideIndex = $this.attr('data-slide-to');
      if (slideIndex) options.interval = false;
      Plugin.call($target, options);

      if (slideIndex) {
        $target.data('bs.carousel').to(slideIndex);
      }

      e.preventDefault();
    };

    $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);
    $(window).on('load', function () {
      $('[data-ride="carousel"]').each(function () {
        var $carousel = $(this || _global);
        Plugin.call($carousel, $carousel.data());
      });
    });
  }(jQuery);
  return exports;
}