/* eslint global-require: "off" */
/* eslint no-console: "off" */

import IntlPolyfill from 'intl';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import locales from 'date-fns/locale';
import BaseComponent from './Base';
import { fetchTranslation, replace } from './utils';

const settings = {
  _localeKey: 'en',
  _localeObject: locales.enUS,
  _translationsObject: {},
  _getTranslations: null,
  _getLocale: null,
  _handleMissingTranslation: text => text.split('.').pop(),

  get _translations() {
    return this._getTranslations ? this._getTranslations() : this._translationsObject;
  },

  set _translations(translations) {
    this._translationsObject = translations;
  },

  get _locale() {
    return this._getLocale ? this._getLocale() : this._localeKey;
  },

  set _locale(locale) {
    this._localeKey = locale;
    this._localeObject = locales[locale] || locales.enUS;
  },
};

export const getLocale = () => settings._locale;

export const setLocale = (locale, rerenderComponents = true) => {
  settings._locale = locale;
  settings._getLocale = null;
  if (rerenderComponents) {
    BaseComponent.rerenderAll();
  }
};

export const setTranslations = (translations, rerenderComponents = true) => {
  settings._translations = translations;
  settings._getTranslations = null;
  if (rerenderComponents) {
    BaseComponent.rerenderAll();
  }
};

export const setLocaleGetter = (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('Locale getter must be a function');
  }
  settings._getLocale = fn;
};

export const setTranslationsGetter = (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('Translations getter must be a function');
  }
  settings._getTranslations = fn;
};

export const setHandleMissingTranslation = (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('Handle missing translation must be a function');
  }
  settings._handleMissingTranslation = fn;
};

export const t = (key, replacements = {}) => {
  let translation = '';
  try {
    const translationLocale = settings._translations[settings._locale] ?
      settings._locale :
      settings._locale.split('-')[0];
    translation = fetchTranslation(
      settings._translations,
      `${translationLocale}.${key}`,
      replacements.count,
    );
  } catch (err) {
    return settings._handleMissingTranslation(key, replacements);
  }
  return replace(translation, replacements);
};

export const l = (value, options) => {
  if (options.dateFormat) {
    const parsedDate = options.parseFormat
      ? parse(value, options.parseFormat, new Date(), { locale: settings._localeObject })
      : value;
    return format(parsedDate, t(options.dateFormat), { locale: settings._localeObject });
  }
  if (typeof value === 'number') {
    if (global.Intl) {
      if (!(Intl.NumberFormat &&
        Intl.NumberFormat.supportedLocalesOf(settings._locale).length === 1)) {
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
      }
    } else {
      global.Intl = IntlPolyfill;
    }
    return new Intl.NumberFormat(settings._locale, options).format(value);
  }
  return value;
};

export const forceComponentsUpdate = () => {
  BaseComponent.rerenderAll();
};
