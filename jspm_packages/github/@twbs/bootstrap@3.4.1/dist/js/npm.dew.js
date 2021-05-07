import { dew as _transitionDewDew } from "../../js/transition.dew.js";
import { dew as _alertDewDew } from "../../js/alert.dew.js";
import { dew as _buttonDewDew } from "../../js/button.dew.js";
import { dew as _carouselDewDew } from "../../js/carousel.dew.js";
import { dew as _collapseDewDew } from "../../js/collapse.dew.js";
import { dew as _dropdownDewDew } from "../../js/dropdown.dew.js";
import { dew as _modalDewDew } from "../../js/modal.dew.js";
import { dew as _tooltipDewDew } from "../../js/tooltip.dew.js";
import { dew as _popoverDewDew } from "../../js/popover.dew.js";
import { dew as _scrollspyDewDew } from "../../js/scrollspy.dew.js";
import { dew as _tabDewDew } from "../../js/tab.dew.js";
import { dew as _affixDewDew } from "../../js/affix.dew.js";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  // This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.
  _transitionDewDew();

  _alertDewDew();

  _buttonDewDew();

  _carouselDewDew();

  _collapseDewDew();

  _dropdownDewDew();

  _modalDewDew();

  _tooltipDewDew();

  _popoverDewDew();

  _scrollspyDewDew();

  _tabDewDew();

  _affixDewDew();

  return exports;
}