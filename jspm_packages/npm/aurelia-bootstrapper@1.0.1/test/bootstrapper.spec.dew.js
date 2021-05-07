var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;
  describe('bootstrapper', () => {
    it('should exist', () => {
      expect(true).toBe(true);
    });
  });
  return exports;
}