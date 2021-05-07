var exports = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  define(['exports', 'aurelia-history', 'aurelia-pal'], function (exports, aureliaHistory, aureliaPal) {
    'use strict';
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
      See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */

    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    function __extends(d, b) {
      extendStatics(d, b);

      function __() {
        (this || _global).constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var LinkHandler = function () {
      function LinkHandler() {}

      LinkHandler.prototype.activate = function (history) {};

      LinkHandler.prototype.deactivate = function () {};

      return LinkHandler;
    }();

    var DefaultLinkHandler = function (_super) {
      __extends(DefaultLinkHandler, _super);

      function DefaultLinkHandler() {
        var _this = _super.call(this || _global) || this || _global;

        _this.handler = function (e) {
          var _a = DefaultLinkHandler.getEventInfo(e),
              shouldHandleEvent = _a.shouldHandleEvent,
              href = _a.href;

          if (shouldHandleEvent) {
            e.preventDefault();

            _this.history.navigate(href);
          }
        };

        return _this;
      }

      DefaultLinkHandler.prototype.activate = function (history) {
        if (history._hasPushState) {
          (this || _global).history = history;
          aureliaPal.DOM.addEventListener('click', (this || _global).handler, true);
        }
      };

      DefaultLinkHandler.prototype.deactivate = function () {
        aureliaPal.DOM.removeEventListener('click', (this || _global).handler, true);
      };

      DefaultLinkHandler.getEventInfo = function (event) {
        var $event = event;
        var info = {
          shouldHandleEvent: false,
          href: null,
          anchor: null
        };
        var target = DefaultLinkHandler.findClosestAnchor($event.target);

        if (!target || !DefaultLinkHandler.targetIsThisWindow(target)) {
          return info;
        }

        if (hasAttribute(target, 'download') || hasAttribute(target, 'router-ignore') || hasAttribute(target, 'data-router-ignore')) {
          return info;
        }

        if ($event.altKey || $event.ctrlKey || $event.metaKey || $event.shiftKey) {
          return info;
        }

        var href = target.getAttribute('href');
        info.anchor = target;
        info.href = href;
        var leftButtonClicked = $event.which === 1;
        var isRelative = href && !(href.charAt(0) === '#' || /^[a-z]+:/i.test(href));
        info.shouldHandleEvent = leftButtonClicked && isRelative;
        return info;
      };

      DefaultLinkHandler.findClosestAnchor = function (el) {
        while (el) {
          if (el.tagName === 'A') {
            return el;
          }

          el = el.parentNode;
        }
      };

      DefaultLinkHandler.targetIsThisWindow = function (target) {
        var targetWindow = target.getAttribute('target');
        var win = aureliaPal.PLATFORM.global;
        return !targetWindow || targetWindow === win.name || targetWindow === '_self';
      };

      return DefaultLinkHandler;
    }(LinkHandler);

    var hasAttribute = function (el, attr) {
      return el.hasAttribute(attr);
    };

    var BrowserHistory = function (_super) {
      __extends(BrowserHistory, _super);

      function BrowserHistory(linkHandler) {
        var _this = _super.call(this || _global) || this || _global;

        _this._isActive = false;
        _this._checkUrlCallback = _this._checkUrl.bind(_this);
        _this.location = aureliaPal.PLATFORM.location;
        _this.history = aureliaPal.PLATFORM.history;
        _this.linkHandler = linkHandler;
        return _this;
      }

      BrowserHistory.prototype.activate = function (options) {
        if ((this || _global)._isActive) {
          throw new Error('History has already been activated.');
        }

        var $history = (this || _global).history;
        var wantsPushState = !!options.pushState;
        (this || _global)._isActive = true;
        var normalizedOptions = (this || _global).options = Object.assign({}, {
          root: '/'
        }, (this || _global).options, options);
        var rootUrl = (this || _global).root = ('/' + normalizedOptions.root + '/').replace(rootStripper, '/');
        var wantsHashChange = (this || _global)._wantsHashChange = normalizedOptions.hashChange !== false;
        var hasPushState = (this || _global)._hasPushState = !!(normalizedOptions.pushState && $history && $history.pushState);
        var eventName;

        if (hasPushState) {
          eventName = 'popstate';
        } else if (wantsHashChange) {
          eventName = 'hashchange';
        }

        aureliaPal.PLATFORM.addEventListener(eventName, (this || _global)._checkUrlCallback);

        if (wantsHashChange && wantsPushState) {
          var $location = (this || _global).location;
          var atRoot = $location.pathname.replace(/[^\/]$/, '$&/') === rootUrl;

          if (!hasPushState && !atRoot) {
            var fragment = (this || _global).fragment = this._getFragment(null, true);

            $location.replace(rootUrl + $location.search + '#' + fragment);
            return true;
          } else if (hasPushState && atRoot && $location.hash) {
            var fragment = (this || _global).fragment = this._getHash().replace(routeStripper, '');

            $history.replaceState({}, aureliaPal.DOM.title, rootUrl + fragment + $location.search);
          }
        }

        if (!(this || _global).fragment) {
          (this || _global).fragment = this._getFragment('');
        }

        (this || _global).linkHandler.activate(this || _global);

        if (!normalizedOptions.silent) {
          return this._loadUrl('');
        }
      };

      BrowserHistory.prototype.deactivate = function () {
        var handler = (this || _global)._checkUrlCallback;
        aureliaPal.PLATFORM.removeEventListener('popstate', handler);
        aureliaPal.PLATFORM.removeEventListener('hashchange', handler);
        (this || _global)._isActive = false;

        (this || _global).linkHandler.deactivate();
      };

      BrowserHistory.prototype.getAbsoluteRoot = function () {
        var $location = (this || _global).location;
        var origin = createOrigin($location.protocol, $location.hostname, $location.port);
        return "" + origin + (this || _global).root;
      };

      BrowserHistory.prototype.navigate = function (fragment, _a) {
        var _b = _a === void 0 ? {} : _a,
            _c = _b.trigger,
            trigger = _c === void 0 ? true : _c,
            _d = _b.replace,
            replace = _d === void 0 ? false : _d;

        var location = (this || _global).location;

        if (fragment && absoluteUrl.test(fragment)) {
          location.href = fragment;
          return true;
        }

        if (!(this || _global)._isActive) {
          return false;
        }

        fragment = this._getFragment(fragment || '');

        if ((this || _global).fragment === fragment && !replace) {
          return false;
        }

        (this || _global).fragment = fragment;
        var url = (this || _global).root + fragment;

        if (fragment === '' && url !== '/') {
          url = url.slice(0, -1);
        }

        if ((this || _global)._hasPushState) {
          url = url.replace('//', '/');

          (this || _global).history[replace ? 'replaceState' : 'pushState']({}, aureliaPal.DOM.title, url);
        } else if ((this || _global)._wantsHashChange) {
          updateHash(location, fragment, replace);
        } else {
          location.assign(url);
        }

        if (trigger) {
          return this._loadUrl(fragment);
        }

        return true;
      };

      BrowserHistory.prototype.navigateBack = function () {
        (this || _global).history.back();
      };

      BrowserHistory.prototype.setTitle = function (title) {
        aureliaPal.DOM.title = title;
      };

      BrowserHistory.prototype.setState = function (key, value) {
        var $history = (this || _global).history;
        var state = Object.assign({}, $history.state);
        var _a = (this || _global).location,
            pathname = _a.pathname,
            search = _a.search,
            hash = _a.hash;
        state[key] = value;
        $history.replaceState(state, null, "" + pathname + search + hash);
      };

      BrowserHistory.prototype.getState = function (key) {
        var state = Object.assign({}, (this || _global).history.state);
        return state[key];
      };

      BrowserHistory.prototype.getHistoryIndex = function () {
        var historyIndex = this.getState('HistoryIndex');

        if (historyIndex === undefined) {
          historyIndex = (this || _global).history.length - 1;
          this.setState('HistoryIndex', historyIndex);
        }

        return historyIndex;
      };

      BrowserHistory.prototype.go = function (movement) {
        (this || _global).history.go(movement);
      };

      BrowserHistory.prototype._getHash = function () {
        return (this || _global).location.hash.substr(1);
      };

      BrowserHistory.prototype._getFragment = function (fragment, forcePushState) {
        var rootUrl;

        if (!fragment) {
          if ((this || _global)._hasPushState || !(this || _global)._wantsHashChange || forcePushState) {
            var location_1 = (this || _global).location;
            fragment = location_1.pathname + location_1.search;
            rootUrl = (this || _global).root.replace(trailingSlash, '');

            if (!fragment.indexOf(rootUrl)) {
              fragment = fragment.substr(rootUrl.length);
            }
          } else {
            fragment = this._getHash();
          }
        }

        return '/' + fragment.replace(routeStripper, '');
      };

      BrowserHistory.prototype._checkUrl = function () {
        var current = this._getFragment('');

        if (current !== (this || _global).fragment) {
          this._loadUrl('');
        }
      };

      BrowserHistory.prototype._loadUrl = function (fragmentOverride) {
        var fragment = (this || _global).fragment = this._getFragment(fragmentOverride);

        return (this || _global).options.routeHandler ? (this || _global).options.routeHandler(fragment) : false;
      };

      BrowserHistory.inject = [LinkHandler];
      return BrowserHistory;
    }(aureliaHistory.History);

    var routeStripper = /^#?\/*|\s+$/g;
    var rootStripper = /^\/+|\/+$/g;
    var trailingSlash = /\/$/;
    var absoluteUrl = /^([a-z][a-z0-9+\-.]*:)?\/\//i;

    function updateHash($location, fragment, replace) {
      if (replace) {
        var href = $location.href.replace(/(javascript:|#).*$/, '');
        $location.replace(href + '#' + fragment);
      } else {
        $location.hash = '#' + fragment;
      }
    }

    function createOrigin(protocol, hostname, port) {
      return protocol + "//" + hostname + (port ? ':' + port : '');
    }

    function configure(config) {
      var $config = config;
      $config.singleton(aureliaHistory.History, BrowserHistory);
      $config.transient(LinkHandler, DefaultLinkHandler);
    }

    exports.BrowserHistory = BrowserHistory;
    exports.DefaultLinkHandler = DefaultLinkHandler;
    exports.LinkHandler = LinkHandler;
    exports.configure = configure;
    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  });
  return exports;
}