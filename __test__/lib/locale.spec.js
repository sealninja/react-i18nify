/* global describe, test, expect, beforeEach */

import nlLocale from 'date-fns/locale/nl';
import itLocale from 'date-fns/locale/it';
import { addLocale, addLocales, setLocale } from '../../src';
import { settings } from '../../src/lib/core';

describe('addLocale', () => {
  beforeEach(() => {
    settings.availableLocales = {};
    addLocale('nl', nlLocale);
  });

  test('adds the nl locale', () => {
    setLocale('nl');
    expect(settings.localeObject).toEqual(nlLocale);
  });
});

describe('addLocales', () => {
  beforeEach(() => {
    settings.availableLocales = {};
    addLocales({ nl: nlLocale, it: itLocale });
  });

  test('can set the nl locale', () => {
    setLocale('nl');
    expect(settings.localeObject).toEqual(nlLocale);
  });

  test('can set the it locale', () => {
    setLocale('it');
    expect(settings.localeObject).toEqual(itLocale);
  });
});
