/* global describe, test, expect */

import { setLocale, setTranslations, Translate, Localize } from '../src';

describe('index.js', () => {
  test('should export setLocale function', () => {
    expect(setLocale).toBeDefined();
  });
  test('should export setTranslations function', () => {
    expect(setTranslations).toBeDefined();
  });
  test('should export <Translate/> component', () => {
    expect(Translate).toBeDefined();
  });
  test('should export <Localize/> component', () => {
    expect(Localize).toBeDefined();
  });
});
