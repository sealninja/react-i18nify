/* global describe, test, expect */

import {
  getLocale,
  setLocale,
  setLocaleGetter,
  getTranslations,
  setTranslations,
  setTranslationsGetter,
  setHandleMissingTranslation,
  setHandleFailedLocalization,
  translate,
  localize,
  t,
  l,
  forceComponentsUpdate,
  Translate,
  Localize,
  I18n,
} from '../src';

describe('index.js', () => {
  const exportedFunctions = [
    getLocale,
    setLocale,
    setLocaleGetter,
    getTranslations,
    setTranslations,
    setTranslationsGetter,
    setHandleMissingTranslation,
    setHandleMissingTranslation,
    setHandleFailedLocalization,
    translate,
    localize,
    t,
    l,
    forceComponentsUpdate,
    Translate,
    Localize,
    I18n,
  ];

  exportedFunctions.forEach((exportedFunction) => {
    test(`should export ${exportedFunction.name} function`, () => {
      expect(exportedFunction).toBeDefined();
    });
  });
});
