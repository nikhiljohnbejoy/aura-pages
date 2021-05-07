var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  $(document).ready(function () {
    $('.tooltip-right').tooltip({
      placement: 'right',
      viewport: {
        selector: 'body',
        padding: 2
      }
    });
    $('.tooltip-bottom').tooltip({
      placement: 'bottom',
      viewport: {
        selector: 'body',
        padding: 2
      }
    });
    $('.tooltip-viewport-right').tooltip({
      placement: 'right',
      viewport: {
        selector: '.container-viewport',
        padding: 2
      }
    });
    $('.tooltip-viewport-bottom').tooltip({
      placement: 'bottom',
      viewport: {
        selector: '.container-viewport',
        padding: 2
      }
    });
  });
  return exports;
}