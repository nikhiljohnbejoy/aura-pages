var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  /*!
   * Bootstrap v3.4.1 (https://getbootstrap.com/)
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under the MIT license
   */
  if (typeof jQuery === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery');
  }

  +function ($) {
    'use strict';

    var version = $.fn.jquery.split(' ')[0].split('.');

    if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1 || version[0] > 3) {
      throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4');
    }
  }(jQuery);
  /* ========================================================================
   * Bootstrap: transition.js v3.4.1
   * https://getbootstrap.com/docs/3.4/javascript/#transitions
   * ========================================================================
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */

  +function ($) {
    'use strict'; // CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
    // ============================================================

    function transitionEnd() {
      var el = document.createElement('bootstrap');
      var transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
      };

      for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
          return {
            end: transEndEventNames[name]
          };
        }
      }

      return false; // explicit for ie8 (  ._.)
    } // https://blog.alexmaccaw.com/css-transitions


    $.fn.emulateTransitionEnd = function (duration) {
      var called = false;
      var $el = this || _global;
      $(this || _global).one('bsTransitionEnd', function () {
        called = true;
      });

      var callback = function () {
        if (!called) $($el).trigger($.support.transition.end);
      };

      setTimeout(callback, duration);
      return this || _global;
    };

    $(function () {
      $.support.transition = transitionEnd();
      if (!$.support.transition) return;
      $.event.special.bsTransitionEnd = {
        bindType: $.support.transition.end,
        delegateType: $.support.transition.end,
        handle: function (e) {
          if ($(e.target).is(this || _global)) return e.handleObj.handler.apply(this || _global, arguments);
        }
      };
    });
  }(jQuery);
  /* ========================================================================
   * Bootstrap: alert.js v3.4.1
   * https://getbootstrap.com/docs/3.4/javascript/#alerts
   * ========================================================================
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */

  +function ($) {
    'use strict'; // ALERT CLASS DEFINITION
    // ======================

    var dismiss = '[data-dismiss="alert"]';

    var Alert = function (el) {
      $(el).on('click', dismiss, (this || _global).close);
    };

    Alert.VERSION = '3.4.1';
    Alert.TRANSITION_DURATION = 150;

    Alert.prototype.close = function (e) {
      var $this = $(this || _global);
      var selector = $this.attr('data-target');

      if (!selector) {
        selector = $this.attr('href');
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
      }

      selector = selector === '#' ? [] : selector;
      var $parent = $(document).find(selector);
      if (e) e.preventDefault();

      if (!$parent.length) {
        $parent = $this.closest('.alert');
      }

      $parent.trigger(e = $.Event('close.bs.alert'));
      if (e.isDefaultPrevented()) return;
      $parent.removeClass('in');

      function removeElement() {
        // detach from parent, fire event then clean up data
        $parent.detach().trigger('closed.bs.alert').remove();
      }

      $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
    }; // ALERT PLUGIN DEFINITION
    // =======================


    function Plugin(option) {
      return this.each(function () {
        var $this = $(this || _global);
        var data = $this.data('bs.alert');
        if (!data) $this.data('bs.alert', data = new Alert(this || _global));
        if (typeof option == 'string') data[option].call($this);
      });
    }

    var old = $.fn.alert;
    $.fn.alert = Plugin;
    $.fn.alert.Constructor = Alert; // ALERT NO CONFLICT
    // =================

    $.fn.alert.noConflict = function () {
      $.fn.alert = old;
      return this || _global;
    }; // ALERT DATA-API
    // ==============


    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
  }(jQuery);
  /* ========================================================================
   * Bootstrap: button.js v3.4.1
   * https://getbootstrap.com/docs/3.4/javascript/#buttons
   * ========================================================================
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */

  +function ($) {
    'use strict'; // BUTTON PUBLIC CLASS DEFINITION
    // ==============================

    var Button = function (element, options) {
      (this || _global).$element = $(element);
      (this || _global).options = $.extend({}, Button.DEFAULTS, options);
      (this || _global).isLoading = false;
    };

    Button.VERSION = '3.4.1';
    Button.DEFAULTS = {
      loadingText: 'loading...'
    };

    Button.prototype.setState = function (state) {
      var d = 'disabled';
      var $el = (this || _global).$element;
      var val = $el.is('input') ? 'val' : 'html';
      var data = $el.data();
      state += 'Text';
      if (data.resetText == null) $el.data('resetText', $el[val]()); // push to event loop to allow forms to submit

      setTimeout($.proxy(function () {
        $el[val](data[state] == null ? (this || _global).options[state] : data[state]);

        if (state == 'loadingText') {
          (this || _global).isLoading = true;
          $el.addClass(d).attr(d, d).prop(d, true);
        } else if ((this || _global).isLoading) {
          (this || _global).isLoading = false;
          $el.removeClass(d).removeAttr(d).prop(d, false);
        }
      }, this || _global), 0);
    };

    Button.prototype.toggle = function () {
      var changed = true;

      var $parent = (this || _global).$element.closest('[data-toggle="buttons"]');

      if ($parent.length) {
        var $input = (this || _global).$element.find('input');

        if ($input.prop('type') == 'radio') {
          if ($input.prop('checked')) changed = false;
          $parent.find('.active').removeClass('active');

          (this || _global).$element.addClass('active');
        } else if ($input.prop('type') == 'checkbox') {
          if ($input.prop('checked') !== (this || _global).$element.hasClass('active')) changed = false;

          (this || _global).$element.toggleClass('active');
        }

        $input.prop('checked', (this || _global).$element.hasClass('active'));
        if (changed) $input.trigger('change');
      } else {
        (this || _global).$element.attr('aria-pressed', !(this || _global).$element.hasClass('active'));

        (this || _global).$element.toggleClass('active');
      }
    }; // BUTTON PLUGIN DEFINITION
    // ========================


    function Plugin(option) {
      return this.each(function () {
        var $this = $(this || _global);
        var data = $this.data('bs.button');
        var options = typeof option == 'object' && option;
        if (!data) $this.data('bs.button', data = new Button(this || _global, options));
        if (option == 'toggle') data.toggle();else if (option) data.setState(option);
      });
    }

    var old = $.fn.button;
    $.fn.button = Plugin;
    $.fn.button.Constructor = Button; // BUTTON NO CONFLICT
    // ==================

    $.fn.button.noConflict = function () {
      $.fn.button = old;
      return this || _global;
    }; // BUTTON DATA-API
    // ===============


    $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn');
      Plugin.call($btn, 'toggle');

      if (!$(e.target).is('input[type="radio"], input[type="checkbox"]')) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault(); // The target component still receive the focus

        if ($btn.is('input,button')) $btn.trigger('focus');else $btn.find('input:visible,button:visible').first().trigger('focus');
      }
    }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
    });
  }(jQuery);
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
  /* ========================================================================
   * Bootstrap: collapse.js v3.4.1
   * https://getbootstrap.com/docs/3.4/javascript/#collapse
   * ========================================================================
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */

  /* jshint latedef: false */

  +function ($) {
    'use strict'; // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var Collapse = function (element, options) {
      (this || _global).$element = $(element);
      (this || _global).options = $.extend({}, Collapse.DEFAULTS, options);
      (this || _global).$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
      (this || _global).transitioning = null;

      if ((this || _global).options.parent) {
        (this || _global).$parent = this.getParent();
      } else {
        this.addAriaAndCollapsedClass((this || _global).$element, (this || _global).$trigger);
      }

      if ((this || _global).options.toggle) this.toggle();
    };

    Collapse.VERSION = '3.4.1';
    Collapse.TRANSITION_DURATION = 350;
    Collapse.DEFAULTS = {
      toggle: true
    };

    Collapse.prototype.dimension = function () {
      var hasWidth = (this || _global).$element.hasClass('width');

      return hasWidth ? 'width' : 'height';
    };

    Collapse.prototype.show = function () {
      if ((this || _global).transitioning || (this || _global).$element.hasClass('in')) return;
      var activesData;

      var actives = (this || _global).$parent && (this || _global).$parent.children('.panel').children('.in, .collapsing');

      if (actives && actives.length) {
        activesData = actives.data('bs.collapse');
        if (activesData && activesData.transitioning) return;
      }

      var startEvent = $.Event('show.bs.collapse');

      (this || _global).$element.trigger(startEvent);

      if (startEvent.isDefaultPrevented()) return;

      if (actives && actives.length) {
        Plugin.call(actives, 'hide');
        activesData || actives.data('bs.collapse', null);
      }

      var dimension = this.dimension();

      (this || _global).$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded', true);

      (this || _global).$trigger.removeClass('collapsed').attr('aria-expanded', true);

      (this || _global).transitioning = 1;

      var complete = function () {
        (this || _global).$element.removeClass('collapsing').addClass('collapse in')[dimension]('');

        (this || _global).transitioning = 0;

        (this || _global).$element.trigger('shown.bs.collapse');
      };

      if (!$.support.transition) return complete.call(this || _global);
      var scrollSize = $.camelCase(['scroll', dimension].join('-'));

      (this || _global).$element.one('bsTransitionEnd', $.proxy(complete, this || _global)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension]((this || _global).$element[0][scrollSize]);
    };

    Collapse.prototype.hide = function () {
      if ((this || _global).transitioning || !(this || _global).$element.hasClass('in')) return;
      var startEvent = $.Event('hide.bs.collapse');

      (this || _global).$element.trigger(startEvent);

      if (startEvent.isDefaultPrevented()) return;
      var dimension = this.dimension();
      (this || _global).$element[dimension]((this || _global).$element[dimension]())[0].offsetHeight;

      (this || _global).$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', false);

      (this || _global).$trigger.addClass('collapsed').attr('aria-expanded', false);

      (this || _global).transitioning = 1;

      var complete = function () {
        (this || _global).transitioning = 0;

        (this || _global).$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
      };

      if (!$.support.transition) return complete.call(this || _global);

      (this || _global).$element[dimension](0).one('bsTransitionEnd', $.proxy(complete, this || _global)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
    };

    Collapse.prototype.toggle = function () {
      this[(this || _global).$element.hasClass('in') ? 'hide' : 'show']();
    };

    Collapse.prototype.getParent = function () {
      return $(document).find((this || _global).options.parent).find('[data-toggle="collapse"][data-parent="' + (this || _global).options.parent + '"]').each($.proxy(function (i, element) {
        var $element = $(element);
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
      }, this || _global)).end();
    };

    Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
      var isOpen = $element.hasClass('in');
      $element.attr('aria-expanded', isOpen);
      $trigger.toggleClass('collapsed', !isOpen).attr('aria-expanded', isOpen);
    };

    function getTargetFromTrigger($trigger) {
      var href;
      var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

      return $(document).find(target);
    } // COLLAPSE PLUGIN DEFINITION
    // ==========================


    function Plugin(option) {
      return this.each(function () {
        var $this = $(this || _global);
        var data = $this.data('bs.collapse');
        var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option);
        if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false;
        if (!data) $this.data('bs.collapse', data = new Collapse(this || _global, options));
        if (typeof option == 'string') data[option]();
      });
    }

    var old = $.fn.collapse;
    $.fn.collapse = Plugin;
    $.fn.collapse.Constructor = Collapse; // COLLAPSE NO CONFLICT
    // ====================

    $.fn.collapse.noConflict = function () {
      $.fn.collapse = old;
      return this || _global;
    }; // COLLAPSE DATA-API
    // =================


    $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
      var $this = $(this || _global);
      if (!$this.attr('data-target')) e.preventDefault();
      var $target = getTargetFromTrigger($this);
      var data = $target.data('bs.collapse');
      var option = data ? 'toggle' : $this.data();
      Plugin.call($target, option);
    });
  }(jQuery);
  /* ========================================================================
   * Bootstrap: dropdown.js v3.4.1
   * https://getbootstrap.com/docs/3.4/javascript/#dropdowns
   * ========================================================================
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */

  +function ($) {
    'use strict'; // DROPDOWN CLASS DEFINITION
    // =========================

    var backdrop = '.dropdown-backdrop';
    var toggle = '[data-toggle="dropdown"]';

    var Dropdown = function (element) {
      $(element).on('click.bs.dropdown', (this || _global).toggle);
    };

    Dropdown.VERSION = '3.4.1';

    function getParent($this) {
      var selector = $this.attr('data-target');

      if (!selector) {
        selector = $this.attr('href');
        selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
      }

      var $parent = selector !== '#' ? $(document).find(selector) : null;
      return $parent && $parent.length ? $parent : $this.parent();
    }

    function clearMenus(e) {
      if (e && e.which === 3) return;
      $(backdrop).remove();
      $(toggle).each(function () {
        var $this = $(this || _global);
        var $parent = getParent($this);
        var relatedTarget = {
          relatedTarget: this || _global
        };
        if (!$parent.hasClass('open')) return;
        if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;
        $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
        if (e.isDefaultPrevented()) return;
        $this.attr('aria-expanded', 'false');
        $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget));
      });
    }

    Dropdown.prototype.toggle = function (e) {
      var $this = $(this || _global);
      if ($this.is('.disabled, :disabled')) return;
      var $parent = getParent($this);
      var isActive = $parent.hasClass('open');
      clearMenus();

      if (!isActive) {
        if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
          // if mobile we use a backdrop because click events don't delegate
          $(document.createElement('div')).addClass('dropdown-backdrop').insertAfter($(this || _global)).on('click', clearMenus);
        }

        var relatedTarget = {
          relatedTarget: this || _global
        };
        $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
        if (e.isDefaultPrevented()) return;
        $this.trigger('focus').attr('aria-expanded', 'true');
        $parent.toggleClass('open').trigger($.Event('shown.bs.dropdown', relatedTarget));
      }

      return false;
    };

    Dropdown.prototype.keydown = function (e) {
      if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
      var $this = $(this || _global);
      e.preventDefault();
      e.stopPropagation();
      if ($this.is('.disabled, :disabled')) return;
      var $parent = getParent($this);
      var isActive = $parent.hasClass('open');

      if (!isActive && e.which != 27 || isActive && e.which == 27) {
        if (e.which == 27) $parent.find(toggle).trigger('focus');
        return $this.trigger('click');
      }

      var desc = ' li:not(.disabled):visible a';
      var $items = $parent.find('.dropdown-menu' + desc);
      if (!$items.length) return;
      var index = $items.index(e.target);
      if (e.which == 38 && index > 0) index--; // up

      if (e.which == 40 && index < $items.length - 1) index++; // down

      if (!~index) index = 0;
      $items.eq(index).trigger('focus');
    }; // DROPDOWN PLUGIN DEFINITION
    // ==========================


    function Plugin(option) {
      return this.each(function () {
        var $this = $(this || _global);
        var data = $this.data('bs.dropdown');
        if (!data) $this.data('bs.dropdown', data = new Dropdown(this || _global));
        if (typeof option == 'string') data[option].call($this);
      });
    }

    var old = $.fn.dropdown;
    $.fn.dropdown = Plugin;
    $.fn.dropdown.Constructor = Dropdown; // DROPDOWN NO CONFLICT
    // ====================

    $.fn.dropdown.noConflict = function () {
      $.fn.dropdown = old;
      return this || _global;
    }; // APPLY TO STANDARD DROPDOWN ELEMENTS
    // ===================================


    $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
      e.stopPropagation();
    }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown);
  }(jQuery);
  /* ========================================================================
   * Bootstrap: modal.js v3.4.1
   * https://getbootstrap.com/docs/3.4/javascript/#modals
   * ========================================================================
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */

  +function ($) {
    'use strict'; // MODAL CLASS DEFINITION
    // ======================

    var Modal = function (element, options) {
      (this || _global).options = options;
      (this || _global).$body = $(document.body);
      (this || _global).$element = $(element);
      (this || _global).$dialog = (this || _global).$element.find('.modal-dialog');
      (this || _global).$backdrop = null;
      (this || _global).isShown = null;
      (this || _global).originalBodyPad = null;
      (this || _global).scrollbarWidth = 0;
      (this || _global).ignoreBackdropClick = false;
      (this || _global).fixedContent = '.navbar-fixed-top, .navbar-fixed-bottom';

      if ((this || _global).options.remote) {
        (this || _global).$element.find('.modal-content').load((this || _global).options.remote, $.proxy(function () {
          (this || _global).$element.trigger('loaded.bs.modal');
        }, this || _global));
      }
    };

    Modal.VERSION = '3.4.1';
    Modal.TRANSITION_DURATION = 300;
    Modal.BACKDROP_TRANSITION_DURATION = 150;
    Modal.DEFAULTS = {
      backdrop: true,
      keyboard: true,
      show: true
    };

    Modal.prototype.toggle = function (_relatedTarget) {
      return (this || _global).isShown ? this.hide() : this.show(_relatedTarget);
    };

    Modal.prototype.show = function (_relatedTarget) {
      var that = this || _global;
      var e = $.Event('show.bs.modal', {
        relatedTarget: _relatedTarget
      });

      (this || _global).$element.trigger(e);

      if ((this || _global).isShown || e.isDefaultPrevented()) return;
      (this || _global).isShown = true;
      this.checkScrollbar();
      this.setScrollbar();

      (this || _global).$body.addClass('modal-open');

      this.escape();
      this.resize();

      (this || _global).$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy((this || _global).hide, this || _global));

      (this || _global).$dialog.on('mousedown.dismiss.bs.modal', function () {
        that.$element.one('mouseup.dismiss.bs.modal', function (e) {
          if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
        });
      });

      this.backdrop(function () {
        var transition = $.support.transition && that.$element.hasClass('fade');

        if (!that.$element.parent().length) {
          that.$element.appendTo(that.$body); // don't move modals dom position
        }

        that.$element.show().scrollTop(0);
        that.adjustDialog();

        if (transition) {
          that.$element[0].offsetWidth; // force reflow
        }

        that.$element.addClass('in');
        that.enforceFocus();
        var e = $.Event('shown.bs.modal', {
          relatedTarget: _relatedTarget
        });
        transition ? that.$dialog // wait for modal to slide in
        .one('bsTransitionEnd', function () {
          that.$element.trigger('focus').trigger(e);
        }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
      });
    };

    Modal.prototype.hide = function (e) {
      if (e) e.preventDefault();
      e = $.Event('hide.bs.modal');

      (this || _global).$element.trigger(e);

      if (!(this || _global).isShown || e.isDefaultPrevented()) return;
      (this || _global).isShown = false;
      this.escape();
      this.resize();
      $(document).off('focusin.bs.modal');

      (this || _global).$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');

      (this || _global).$dialog.off('mousedown.dismiss.bs.modal');

      $.support.transition && (this || _global).$element.hasClass('fade') ? (this || _global).$element.one('bsTransitionEnd', $.proxy((this || _global).hideModal, this || _global)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
    };

    Modal.prototype.enforceFocus = function () {
      $(document).off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target && (this || _global).$element[0] !== e.target && !(this || _global).$element.has(e.target).length) {
          (this || _global).$element.trigger('focus');
        }
      }, this || _global));
    };

    Modal.prototype.escape = function () {
      if ((this || _global).isShown && (this || _global).options.keyboard) {
        (this || _global).$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
          e.which == 27 && this.hide();
        }, this || _global));
      } else if (!(this || _global).isShown) {
        (this || _global).$element.off('keydown.dismiss.bs.modal');
      }
    };

    Modal.prototype.resize = function () {
      if ((this || _global).isShown) {
        $(window).on('resize.bs.modal', $.proxy((this || _global).handleUpdate, this || _global));
      } else {
        $(window).off('resize.bs.modal');
      }
    };

    Modal.prototype.hideModal = function () {
      var that = this || _global;

      (this || _global).$element.hide();

      this.backdrop(function () {
        that.$body.removeClass('modal-open');
        that.resetAdjustments();
        that.resetScrollbar();
        that.$element.trigger('hidden.bs.modal');
      });
    };

    Modal.prototype.removeBackdrop = function () {
      (this || _global).$backdrop && (this || _global).$backdrop.remove();
      (this || _global).$backdrop = null;
    };

    Modal.prototype.backdrop = function (callback) {
      var that = this || _global;
      var animate = (this || _global).$element.hasClass('fade') ? 'fade' : '';

      if ((this || _global).isShown && (this || _global).options.backdrop) {
        var doAnimate = $.support.transition && animate;
        (this || _global).$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo((this || _global).$body);

        (this || _global).$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
          if ((this || _global).ignoreBackdropClick) {
            (this || _global).ignoreBackdropClick = false;
            return;
          }

          if (e.target !== e.currentTarget) return;
          (this || _global).options.backdrop == 'static' ? (this || _global).$element[0].focus() : this.hide();
        }, this || _global));

        if (doAnimate) (this || _global).$backdrop[0].offsetWidth; // force reflow

        (this || _global).$backdrop.addClass('in');

        if (!callback) return;
        doAnimate ? (this || _global).$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
      } else if (!(this || _global).isShown && (this || _global).$backdrop) {
        (this || _global).$backdrop.removeClass('in');

        var callbackRemove = function () {
          that.removeBackdrop();
          callback && callback();
        };

        $.support.transition && (this || _global).$element.hasClass('fade') ? (this || _global).$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
      } else if (callback) {
        callback();
      }
    }; // these following methods are used to handle overflowing modals


    Modal.prototype.handleUpdate = function () {
      this.adjustDialog();
    };

    Modal.prototype.adjustDialog = function () {
      var modalIsOverflowing = (this || _global).$element[0].scrollHeight > document.documentElement.clientHeight;

      (this || _global).$element.css({
        paddingLeft: !(this || _global).bodyIsOverflowing && modalIsOverflowing ? (this || _global).scrollbarWidth : '',
        paddingRight: (this || _global).bodyIsOverflowing && !modalIsOverflowing ? (this || _global).scrollbarWidth : ''
      });
    };

    Modal.prototype.resetAdjustments = function () {
      (this || _global).$element.css({
        paddingLeft: '',
        paddingRight: ''
      });
    };

    Modal.prototype.checkScrollbar = function () {
      var fullWindowWidth = window.innerWidth;

      if (!fullWindowWidth) {
        // workaround for missing window.innerWidth in IE8
        var documentElementRect = document.documentElement.getBoundingClientRect();
        fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
      }

      (this || _global).bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
      (this || _global).scrollbarWidth = this.measureScrollbar();
    };

    Modal.prototype.setScrollbar = function () {
      var bodyPad = parseInt((this || _global).$body.css('padding-right') || 0, 10);
      (this || _global).originalBodyPad = document.body.style.paddingRight || '';
      var scrollbarWidth = (this || _global).scrollbarWidth;

      if ((this || _global).bodyIsOverflowing) {
        (this || _global).$body.css('padding-right', bodyPad + scrollbarWidth);

        $((this || _global).fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + scrollbarWidth + 'px');
        });
      }
    };

    Modal.prototype.resetScrollbar = function () {
      (this || _global).$body.css('padding-right', (this || _global).originalBodyPad);

      $((this || _global).fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      });
    };

    Modal.prototype.measureScrollbar = function () {
      // thx walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = 'modal-scrollbar-measure';

      (this || _global).$body.append(scrollDiv);

      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

      (this || _global).$body[0].removeChild(scrollDiv);

      return scrollbarWidth;
    }; // MODAL PLUGIN DEFINITION
    // =======================


    function Plugin(option, _relatedTarget) {
      return this.each(function () {
        var $this = $(this || _global);
        var data = $this.data('bs.modal');
        var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);
        if (!data) $this.data('bs.modal', data = new Modal(this || _global, options));
        if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
      });
    }

    var old = $.fn.modal;
    $.fn.modal = Plugin;
    $.fn.modal.Constructor = Modal; // MODAL NO CONFLICT
    // =================

    $.fn.modal.noConflict = function () {
      $.fn.modal = old;
      return this || _global;
    }; // MODAL DATA-API
    // ==============


    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
      var $this = $(this || _global);
      var href = $this.attr('href');
      var target = $this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

      var $target = $(document).find(target);
      var option = $target.data('bs.modal') ? 'toggle' : $.extend({
        remote: !/#/.test(href) && href
      }, $target.data(), $this.data());
      if ($this.is('a')) e.preventDefault();
      $target.one('show.bs.modal', function (showEvent) {
        if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown

        $target.one('hidden.bs.modal', function () {
          $this.is(':visible') && $this.trigger('focus');
        });
      });
      Plugin.call($target, option, this || _global);
    });
  }(jQuery);
  /* ========================================================================
   * Bootstrap: tooltip.js v3.4.1
   * https://getbootstrap.com/docs/3.4/javascript/#tooltip
   * Inspired by the original jQuery.tipsy by Jason Frame
   * ========================================================================
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */

  +function ($) {
    'use strict';

    var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
    var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
    var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
    var DefaultWhitelist = {
      // Global attributes allowed on any supplied element below.
      '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
      a: ['target', 'href', 'title', 'rel'],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ['src', 'alt', 'title', 'width', 'height'],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: []
    };
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
    /**
     * A pattern that matches safe data URLs. Only matches image, video and audio types.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

    var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

    function allowedAttribute(attr, allowedAttributeList) {
      var attrName = attr.nodeName.toLowerCase();

      if ($.inArray(attrName, allowedAttributeList) !== -1) {
        if ($.inArray(attrName, uriAttrs) !== -1) {
          return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
        }

        return true;
      }

      var regExp = $(allowedAttributeList).filter(function (index, value) {
        return value instanceof RegExp;
      }); // Check if a regular expression validates the attribute.

      for (var i = 0, l = regExp.length; i < l; i++) {
        if (attrName.match(regExp[i])) {
          return true;
        }
      }

      return false;
    }

    function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
      if (unsafeHtml.length === 0) {
        return unsafeHtml;
      }

      if (sanitizeFn && typeof sanitizeFn === 'function') {
        return sanitizeFn(unsafeHtml);
      } // IE 8 and below don't support createHTMLDocument


      if (!document.implementation || !document.implementation.createHTMLDocument) {
        return unsafeHtml;
      }

      var createdDocument = document.implementation.createHTMLDocument('sanitization');
      createdDocument.body.innerHTML = unsafeHtml;
      var whitelistKeys = $.map(whiteList, function (el, i) {
        return i;
      });
      var elements = $(createdDocument.body).find('*');

      for (var i = 0, len = elements.length; i < len; i++) {
        var el = elements[i];
        var elName = el.nodeName.toLowerCase();

        if ($.inArray(elName, whitelistKeys) === -1) {
          el.parentNode.removeChild(el);
          continue;
        }

        var attributeList = $.map(el.attributes, function (el) {
          return el;
        });
        var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);

        for (var j = 0, len2 = attributeList.length; j < len2; j++) {
          if (!allowedAttribute(attributeList[j], whitelistedAttributes)) {
            el.removeAttribute(attributeList[j].nodeName);
          }
        }
      }

      return createdDocument.body.innerHTML;
    } // TOOLTIP PUBLIC CLASS DEFINITION
    // ===============================


    var Tooltip = function (element, options) {
      (this || _global).type = null;
      (this || _global).options = null;
      (this || _global).enabled = null;
      (this || _global).timeout = null;
      (this || _global).hoverState = null;
      (this || _global).$element = null;
      (this || _global).inState = null;
      this.init('tooltip', element, options);
    };

    Tooltip.VERSION = '3.4.1';
    Tooltip.TRANSITION_DURATION = 150;
    Tooltip.DEFAULTS = {
      animation: true,
      placement: 'top',
      selector: false,
      template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      container: false,
      viewport: {
        selector: 'body',
        padding: 0
      },
      sanitize: true,
      sanitizeFn: null,
      whiteList: DefaultWhitelist
    };

    Tooltip.prototype.init = function (type, element, options) {
      (this || _global).enabled = true;
      (this || _global).type = type;
      (this || _global).$element = $(element);
      (this || _global).options = this.getOptions(options);
      (this || _global).$viewport = (this || _global).options.viewport && $(document).find($.isFunction((this || _global).options.viewport) ? (this || _global).options.viewport.call(this || _global, (this || _global).$element) : (this || _global).options.viewport.selector || (this || _global).options.viewport);
      (this || _global).inState = {
        click: false,
        hover: false,
        focus: false
      };

      if ((this || _global).$element[0] instanceof document.constructor && !(this || _global).options.selector) {
        throw new Error('`selector` option must be specified when initializing ' + (this || _global).type + ' on the window.document object!');
      }

      var triggers = (this || _global).options.trigger.split(' ');

      for (var i = triggers.length; i--;) {
        var trigger = triggers[i];

        if (trigger == 'click') {
          (this || _global).$element.on('click.' + (this || _global).type, (this || _global).options.selector, $.proxy((this || _global).toggle, this || _global));
        } else if (trigger != 'manual') {
          var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
          var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

          (this || _global).$element.on(eventIn + '.' + (this || _global).type, (this || _global).options.selector, $.proxy((this || _global).enter, this || _global));

          (this || _global).$element.on(eventOut + '.' + (this || _global).type, (this || _global).options.selector, $.proxy((this || _global).leave, this || _global));
        }
      }

      (this || _global).options.selector ? (this || _global)._options = $.extend({}, (this || _global).options, {
        trigger: 'manual',
        selector: ''
      }) : this.fixTitle();
    };

    Tooltip.prototype.getDefaults = function () {
      return Tooltip.DEFAULTS;
    };

    Tooltip.prototype.getOptions = function (options) {
      var dataAttributes = (this || _global).$element.data();

      for (var dataAttr in dataAttributes) {
        if (dataAttributes.hasOwnProperty(dataAttr) && $.inArray(dataAttr, DISALLOWED_ATTRIBUTES) !== -1) {
          delete dataAttributes[dataAttr];
        }
      }

      options = $.extend({}, this.getDefaults(), dataAttributes, options);

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay,
          hide: options.delay
        };
      }

      if (options.sanitize) {
        options.template = sanitizeHtml(options.template, options.whiteList, options.sanitizeFn);
      }

      return options;
    };

    Tooltip.prototype.getDelegateOptions = function () {
      var options = {};
      var defaults = this.getDefaults();
      (this || _global)._options && $.each((this || _global)._options, function (key, value) {
        if (defaults[key] != value) options[key] = value;
      });
      return options;
    };

    Tooltip.prototype.enter = function (obj) {
      var self = obj instanceof (this || _global).constructor ? obj : $(obj.currentTarget).data('bs.' + (this || _global).type);

      if (!self) {
        self = new (this || _global).constructor(obj.currentTarget, this.getDelegateOptions());
        $(obj.currentTarget).data('bs.' + (this || _global).type, self);
      }

      if (obj instanceof $.Event) {
        self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true;
      }

      if (self.tip().hasClass('in') || self.hoverState == 'in') {
        self.hoverState = 'in';
        return;
      }

      clearTimeout(self.timeout);
      self.hoverState = 'in';
      if (!self.options.delay || !self.options.delay.show) return self.show();
      self.timeout = setTimeout(function () {
        if (self.hoverState == 'in') self.show();
      }, self.options.delay.show);
    };

    Tooltip.prototype.isInStateTrue = function () {
      for (var key in (this || _global).inState) {
        if ((this || _global).inState[key]) return true;
      }

      return false;
    };

    Tooltip.prototype.leave = function (obj) {
      var self = obj instanceof (this || _global).constructor ? obj : $(obj.currentTarget).data('bs.' + (this || _global).type);

      if (!self) {
        self = new (this || _global).constructor(obj.currentTarget, this.getDelegateOptions());
        $(obj.currentTarget).data('bs.' + (this || _global).type, self);
      }

      if (obj instanceof $.Event) {
        self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false;
      }

      if (self.isInStateTrue()) return;
      clearTimeout(self.timeout);
      self.hoverState = 'out';
      if (!self.options.delay || !self.options.delay.hide) return self.hide();
      self.timeout = setTimeout(function () {
        if (self.hoverState == 'out') self.hide();
      }, self.options.delay.hide);
    };

    Tooltip.prototype.show = function () {
      var e = $.Event('show.bs.' + (this || _global).type);

      if (this.hasContent() && (this || _global).enabled) {
        (this || _global).$element.trigger(e);

        var inDom = $.contains((this || _global).$element[0].ownerDocument.documentElement, (this || _global).$element[0]);
        if (e.isDefaultPrevented() || !inDom) return;
        var that = this || _global;
        var $tip = this.tip();
        var tipId = this.getUID((this || _global).type);
        this.setContent();
        $tip.attr('id', tipId);

        (this || _global).$element.attr('aria-describedby', tipId);

        if ((this || _global).options.animation) $tip.addClass('fade');
        var placement = typeof (this || _global).options.placement == 'function' ? (this || _global).options.placement.call(this || _global, $tip[0], (this || _global).$element[0]) : (this || _global).options.placement;
        var autoToken = /\s?auto?\s?/i;
        var autoPlace = autoToken.test(placement);
        if (autoPlace) placement = placement.replace(autoToken, '') || 'top';
        $tip.detach().css({
          top: 0,
          left: 0,
          display: 'block'
        }).addClass(placement).data('bs.' + (this || _global).type, this || _global);
        (this || _global).options.container ? $tip.appendTo($(document).find((this || _global).options.container)) : $tip.insertAfter((this || _global).$element);

        (this || _global).$element.trigger('inserted.bs.' + (this || _global).type);

        var pos = this.getPosition();
        var actualWidth = $tip[0].offsetWidth;
        var actualHeight = $tip[0].offsetHeight;

        if (autoPlace) {
          var orgPlacement = placement;
          var viewportDim = this.getPosition((this || _global).$viewport);
          placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < viewportDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > viewportDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < viewportDim.left ? 'right' : placement;
          $tip.removeClass(orgPlacement).addClass(placement);
        }

        var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
        this.applyPlacement(calculatedOffset, placement);

        var complete = function () {
          var prevHoverState = that.hoverState;
          that.$element.trigger('shown.bs.' + that.type);
          that.hoverState = null;
          if (prevHoverState == 'out') that.leave(that);
        };

        $.support.transition && (this || _global).$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
      }
    };

    Tooltip.prototype.applyPlacement = function (offset, placement) {
      var $tip = this.tip();
      var width = $tip[0].offsetWidth;
      var height = $tip[0].offsetHeight; // manually read margins because getBoundingClientRect includes difference

      var marginTop = parseInt($tip.css('margin-top'), 10);
      var marginLeft = parseInt($tip.css('margin-left'), 10); // we must check for NaN for ie 8/9

      if (isNaN(marginTop)) marginTop = 0;
      if (isNaN(marginLeft)) marginLeft = 0;
      offset.top += marginTop;
      offset.left += marginLeft; // $.fn.offset doesn't round pixel values
      // so we use setOffset directly with our own function B-0

      $.offset.setOffset($tip[0], $.extend({
        using: function (props) {
          $tip.css({
            top: Math.round(props.top),
            left: Math.round(props.left)
          });
        }
      }, offset), 0);
      $tip.addClass('in'); // check to see if placing tip in new offset caused the tip to resize itself

      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight;
      }

      var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
      if (delta.left) offset.left += delta.left;else offset.top += delta.top;
      var isVertical = /top|bottom/.test(placement);
      var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
      var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';
      $tip.offset(offset);
      this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
    };

    Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
      this.arrow().css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isVertical ? 'top' : 'left', '');
    };

    Tooltip.prototype.setContent = function () {
      var $tip = this.tip();
      var title = this.getTitle();

      if ((this || _global).options.html) {
        if ((this || _global).options.sanitize) {
          title = sanitizeHtml(title, (this || _global).options.whiteList, (this || _global).options.sanitizeFn);
        }

        $tip.find('.tooltip-inner').html(title);
      } else {
        $tip.find('.tooltip-inner').text(title);
      }

      $tip.removeClass('fade in top bottom left right');
    };

    Tooltip.prototype.hide = function (callback) {
      var that = this || _global;
      var $tip = $((this || _global).$tip);
      var e = $.Event('hide.bs.' + (this || _global).type);

      function complete() {
        if (that.hoverState != 'in') $tip.detach();

        if (that.$element) {
          // TODO: Check whether guarding this code with this `if` is really necessary.
          that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
        }

        callback && callback();
      }

      (this || _global).$element.trigger(e);

      if (e.isDefaultPrevented()) return;
      $tip.removeClass('in');
      $.support.transition && $tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
      (this || _global).hoverState = null;
      return this || _global;
    };

    Tooltip.prototype.fixTitle = function () {
      var $e = (this || _global).$element;

      if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
      }
    };

    Tooltip.prototype.hasContent = function () {
      return this.getTitle();
    };

    Tooltip.prototype.getPosition = function ($element) {
      $element = $element || (this || _global).$element;
      var el = $element[0];
      var isBody = el.tagName == 'BODY';
      var elRect = el.getBoundingClientRect();

      if (elRect.width == null) {
        // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
        elRect = $.extend({}, elRect, {
          width: elRect.right - elRect.left,
          height: elRect.bottom - elRect.top
        });
      }

      var isSvg = window.SVGElement && el instanceof window.SVGElement; // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
      // See https://github.com/twbs/bootstrap/issues/20280

      var elOffset = isBody ? {
        top: 0,
        left: 0
      } : isSvg ? null : $element.offset();
      var scroll = {
        scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
      };
      var outerDims = isBody ? {
        width: $(window).width(),
        height: $(window).height()
      } : null;
      return $.extend({}, elRect, scroll, outerDims, elOffset);
    };

    Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
      return placement == 'bottom' ? {
        top: pos.top + pos.height,
        left: pos.left + pos.width / 2 - actualWidth / 2
      } : placement == 'top' ? {
        top: pos.top - actualHeight,
        left: pos.left + pos.width / 2 - actualWidth / 2
      } : placement == 'left' ? {
        top: pos.top + pos.height / 2 - actualHeight / 2,
        left: pos.left - actualWidth
      } :
      /* placement == 'right' */
      {
        top: pos.top + pos.height / 2 - actualHeight / 2,
        left: pos.left + pos.width
      };
    };

    Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
      var delta = {
        top: 0,
        left: 0
      };
      if (!(this || _global).$viewport) return delta;
      var viewportPadding = (this || _global).options.viewport && (this || _global).options.viewport.padding || 0;
      var viewportDimensions = this.getPosition((this || _global).$viewport);

      if (/right|left/.test(placement)) {
        var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
        var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;

        if (topEdgeOffset < viewportDimensions.top) {
          // top overflow
          delta.top = viewportDimensions.top - topEdgeOffset;
        } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
          // bottom overflow
          delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
        }
      } else {
        var leftEdgeOffset = pos.left - viewportPadding;
        var rightEdgeOffset = pos.left + viewportPadding + actualWidth;

        if (leftEdgeOffset < viewportDimensions.left) {
          // left overflow
          delta.left = viewportDimensions.left - leftEdgeOffset;
        } else if (rightEdgeOffset > viewportDimensions.right) {
          // right overflow
          delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
        }
      }

      return delta;
    };

    Tooltip.prototype.getTitle = function () {
      var title;
      var $e = (this || _global).$element;
      var o = (this || _global).options;
      title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);
      return title;
    };

    Tooltip.prototype.getUID = function (prefix) {
      do prefix += ~~(Math.random() * 1000000); while (document.getElementById(prefix));

      return prefix;
    };

    Tooltip.prototype.tip = function () {
      if (!(this || _global).$tip) {
        (this || _global).$tip = $((this || _global).options.template);

        if ((this || _global).$tip.length != 1) {
          throw new Error((this || _global).type + ' `template` option must consist of exactly 1 top-level element!');
        }
      }

      return (this || _global).$tip;
    };

    Tooltip.prototype.arrow = function () {
      return (this || _global).$arrow = (this || _global).$arrow || this.tip().find('.tooltip-arrow');
    };

    Tooltip.prototype.enable = function () {
      (this || _global).enabled = true;
    };

    Tooltip.prototype.disable = function () {
      (this || _global).enabled = false;
    };

    Tooltip.prototype.toggleEnabled = function () {
      (this || _global).enabled = !(this || _global).enabled;
    };

    Tooltip.prototype.toggle = function (e) {
      var self = this || _global;

      if (e) {
        self = $(e.currentTarget).data('bs.' + (this || _global).type);

        if (!self) {
          self = new (this || _global).constructor(e.currentTarget, this.getDelegateOptions());
          $(e.currentTarget).data('bs.' + (this || _global).type, self);
        }
      }

      if (e) {
        self.inState.click = !self.inState.click;
        if (self.isInStateTrue()) self.enter(self);else self.leave(self);
      } else {
        self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
      }
    };

    Tooltip.prototype.destroy = function () {
      var that = this || _global;
      clearTimeout((this || _global).timeout);
      this.hide(function () {
        that.$element.off('.' + that.type).removeData('bs.' + that.type);

        if (that.$tip) {
          that.$tip.detach();
        }

        that.$tip = null;
        that.$arrow = null;
        that.$viewport = null;
        that.$element = null;
      });
    };

    Tooltip.prototype.sanitizeHtml = function (unsafeHtml) {
      return sanitizeHtml(unsafeHtml, (this || _global).options.whiteList, (this || _global).options.sanitizeFn);
    }; // TOOLTIP PLUGIN DEFINITION
    // =========================


    function Plugin(option) {
      return this.each(function () {
        var $this = $(this || _global);
        var data = $this.data('bs.tooltip');
        var options = typeof option == 'object' && option;
        if (!data && /destroy|hide/.test(option)) return;
        if (!data) $this.data('bs.tooltip', data = new Tooltip(this || _global, options));
        if (typeof option == 'string') data[option]();
      });
    }

    var old = $.fn.tooltip;
    $.fn.tooltip = Plugin;
    $.fn.tooltip.Constructor = Tooltip; // TOOLTIP NO CONFLICT
    // ===================

    $.fn.tooltip.noConflict = function () {
      $.fn.tooltip = old;
      return this || _global;
    };
  }(jQuery);
  /* ========================================================================
   * Bootstrap: popover.js v3.4.1
   * https://getbootstrap.com/docs/3.4/javascript/#popovers
   * ========================================================================
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */

  +function ($) {
    'use strict'; // POPOVER PUBLIC CLASS DEFINITION
    // ===============================

    var Popover = function (element, options) {
      this.init('popover', element, options);
    };

    if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');
    Popover.VERSION = '3.4.1';
    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }); // NOTE: POPOVER EXTENDS tooltip.js
    // ================================

    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
    Popover.prototype.constructor = Popover;

    Popover.prototype.getDefaults = function () {
      return Popover.DEFAULTS;
    };

    Popover.prototype.setContent = function () {
      var $tip = this.tip();
      var title = this.getTitle();
      var content = this.getContent();

      if ((this || _global).options.html) {
        var typeContent = typeof content;

        if ((this || _global).options.sanitize) {
          title = this.sanitizeHtml(title);

          if (typeContent === 'string') {
            content = this.sanitizeHtml(content);
          }
        }

        $tip.find('.popover-title').html(title);
        $tip.find('.popover-content').children().detach().end()[typeContent === 'string' ? 'html' : 'append'](content);
      } else {
        $tip.find('.popover-title').text(title);
        $tip.find('.popover-content').children().detach().end().text(content);
      }

      $tip.removeClass('fade top bottom left right in'); // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
      // this manually by checking the contents.

      if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
    };

    Popover.prototype.hasContent = function () {
      return this.getTitle() || this.getContent();
    };

    Popover.prototype.getContent = function () {
      var $e = (this || _global).$element;
      var o = (this || _global).options;
      return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
    };

    Popover.prototype.arrow = function () {
      return (this || _global).$arrow = (this || _global).$arrow || this.tip().find('.arrow');
    }; // POPOVER PLUGIN DEFINITION
    // =========================


    function Plugin(option) {
      return this.each(function () {
        var $this = $(this || _global);
        var data = $this.data('bs.popover');
        var options = typeof option == 'object' && option;
        if (!data && /destroy|hide/.test(option)) return;
        if (!data) $this.data('bs.popover', data = new Popover(this || _global, options));
        if (typeof option == 'string') data[option]();
      });
    }

    var old = $.fn.popover;
    $.fn.popover = Plugin;
    $.fn.popover.Constructor = Popover; // POPOVER NO CONFLICT
    // ===================

    $.fn.popover.noConflict = function () {
      $.fn.popover = old;
      return this || _global;
    };
  }(jQuery);
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
  /* ========================================================================
   * Bootstrap: tab.js v3.4.1
   * https://getbootstrap.com/docs/3.4/javascript/#tabs
   * ========================================================================
   * Copyright 2011-2019 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * ======================================================================== */

  +function ($) {
    'use strict'; // TAB CLASS DEFINITION
    // ====================

    var Tab = function (element) {
      // jscs:disable requireDollarBeforejQueryAssignment
      (this || _global).element = $(element); // jscs:enable requireDollarBeforejQueryAssignment
    };

    Tab.VERSION = '3.4.1';
    Tab.TRANSITION_DURATION = 150;

    Tab.prototype.show = function () {
      var $this = (this || _global).element;
      var $ul = $this.closest('ul:not(.dropdown-menu)');
      var selector = $this.data('target');

      if (!selector) {
        selector = $this.attr('href');
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
      }

      if ($this.parent('li').hasClass('active')) return;
      var $previous = $ul.find('.active:last a');
      var hideEvent = $.Event('hide.bs.tab', {
        relatedTarget: $this[0]
      });
      var showEvent = $.Event('show.bs.tab', {
        relatedTarget: $previous[0]
      });
      $previous.trigger(hideEvent);
      $this.trigger(showEvent);
      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;
      var $target = $(document).find(selector);
      this.activate($this.closest('li'), $ul);
      this.activate($target, $target.parent(), function () {
        $previous.trigger({
          type: 'hidden.bs.tab',
          relatedTarget: $this[0]
        });
        $this.trigger({
          type: 'shown.bs.tab',
          relatedTarget: $previous[0]
        });
      });
    };

    Tab.prototype.activate = function (element, container, callback) {
      var $active = container.find('> .active');
      var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);

      function next() {
        $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);
        element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);

        if (transition) {
          element[0].offsetWidth; // reflow for transition

          element.addClass('in');
        } else {
          element.removeClass('fade');
        }

        if (element.parent('.dropdown-menu').length) {
          element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
        }

        callback && callback();
      }

      $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
      $active.removeClass('in');
    }; // TAB PLUGIN DEFINITION
    // =====================


    function Plugin(option) {
      return this.each(function () {
        var $this = $(this || _global);
        var data = $this.data('bs.tab');
        if (!data) $this.data('bs.tab', data = new Tab(this || _global));
        if (typeof option == 'string') data[option]();
      });
    }

    var old = $.fn.tab;
    $.fn.tab = Plugin;
    $.fn.tab.Constructor = Tab; // TAB NO CONFLICT
    // ===============

    $.fn.tab.noConflict = function () {
      $.fn.tab = old;
      return this || _global;
    }; // TAB DATA-API
    // ============


    var clickHandler = function (e) {
      e.preventDefault();
      Plugin.call($(this || _global), 'show');
    };

    $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
  }(jQuery);
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