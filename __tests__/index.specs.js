/* global describe, test, expect */

import { I18n, Translate, Localize } from '../src';

describe('index.js', () => {
  test('should export I18n object', () => {
    expect(I18n).toBeDefined();
  });
  test('should export <Translate/> component', () => {
    expect(Translate).toBeDefined();
  });
  test('should export <Localize/> component', () => {
    expect(Localize).toBeDefined();
  });
});
