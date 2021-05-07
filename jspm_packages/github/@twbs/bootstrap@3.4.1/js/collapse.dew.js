var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

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
  return exports;
}