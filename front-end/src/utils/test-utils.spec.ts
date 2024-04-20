import { testUtils } from './test-utils';
const { getTestIdSelectorString } = testUtils;

describe('testUtils', () => {
  describe('getTestIdSelectorString', () => {
    it('should return the expected value', () => {
      const result = getTestIdSelectorString('random-selector');
      expect(result).toBe('[data-testid="random-selector"]');
    });
  });
});
