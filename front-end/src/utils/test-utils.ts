function getTestIdSelectorString(val: string): string {
  return `[data-testid="${val}"]`;
}

export const testUtils = {
  getTestIdSelectorString,
};
