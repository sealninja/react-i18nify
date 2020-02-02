/* global describe, test, expect */

import {
  addLocale,
  addLocales,
  getLocale,
  setLocale,
  setLocaleGetter,
  getTranslations,
  setTranslations,
  setTranslationsGetter,
  setHandleMissingTranslation,
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
    addLocale,
    addLocales,
    getLocale,
    setLocale,
    setLocaleGetter,
    getTranslations,
    setTranslations,
    setTranslationsGetter,
    setHandleMissingTranslation,
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
