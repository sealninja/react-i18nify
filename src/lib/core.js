/* eslint global-require: "off" */
/* eslint no-console: "off" */

import IntlPolyfill from 'intl';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import enUS from 'date-fns/locale/en-US';
import BaseComponent from './Base';
import { fetchTranslation, replace } from './utils';

export const settings = {
  availableLocales: { 'en-US': enUS },
  localeKey: 'en',
  localeObject: enUS,
  translationsObject: {},
  getTranslations: null,
  getLocale: null,
  handleMissingTranslation: (text) => text.split('.').pop(),

  get translations() {
    return this.getTranslations ? this.getTranslations() : this.translationsObject;
  },

  set translations(translations) {
    this.translationsObject = translations;
  },

  get locale() {
    return this.getLocale ? this.getLocale() : this.localeKey;
  },

  set locale(locale) {
    this.localeKey = locale;
    this.localeObject = this.availableLocales[locale] || this.availableLocales[locale.split('-')[0]] || enUS;
  },
};

export const getLocale = () => settings.locale;

export const setLocale = (locale, rerenderComponents = true) => {
  settings.locale = locale;
  settings.getLocale = null;
  if (rerenderComponents) {
    BaseComponent.rerenderAll();
  }
};

export const addLocale = (name, locale) => {
  settings.availableLocales[name] = locale;
};

export const addLocales = (locales) => {
  settings.availableLocales = {
    ...settings.availableLocales,
    ...locales,
  };
};

export const getTranslations = () => settings.translations;

export const setTranslations = (translations, rerenderComponents = true) => {
  settings.translations = translations;
  settings.getTranslations = null;
  if (rerenderComponents) {
    BaseComponent.rerenderAll();
  }
};

export const setLocaleGetter = (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('Locale getter must be a function');
  }
  settings.getLocale = fn;
};

export const setTranslationsGetter = (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('Translations getter must be a function');
  }
  settings.getTranslations = fn;
};

export const setHandleMissingTranslation = (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('Handle missing translation must be a function');
  }
  settings.handleMissingTranslation = fn;
};

export const t = (key, replacements = {}) => {
  let translation = '';
  try {
    const translationLocale = settings.translations[settings.locale]
      ? settings.locale
      : settings.locale.split('-')[0];
    translation = fetchTranslation(settings.translations, `${translationLocale}.${key}`, replacements.count);
  } catch (err) {
    return settings.handleMissingTranslation(key, replacements);
  }
  return replace(translation, replacements);
};

export const l = (value, options) => {
  if (options.dateFormat) {
    const parsedDate = options.parseFormat
      ? parse(value, options.parseFormat, new Date(), { locale: settings.localeObject })
      : new Date(value);
    return format(parsedDate, t(options.dateFormat), { locale: settings.localeObject });
  }
  if (typeof value === 'number') {
    if (global.Intl) {
      if (!(Intl.NumberFormat
        && Intl.NumberFormat.supportedLocalesOf(settings.locale).length === 1)) {
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
      }
    } else {
      global.Intl = IntlPolyfill;
    }
    return new Intl.NumberFormat(settings.locale, options).format(value);
  }
  return value;
};

export const forceComponentsUpdate = () => {
  BaseComponent.rerenderAll();
};
