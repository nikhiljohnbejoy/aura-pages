var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

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
  return exports;
}