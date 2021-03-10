/* eslint global-require: "off" */
/* eslint no-console: "off" */

import parse from 'date-fns/parse';
import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import BaseComponent from './Base';
import { fetchTranslation, replace } from './utils';

export const settings = {
  availableLocales: {},
  localeKey: 'en',
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

  getLocaleObject(locale) {
    const l = locale || this.locale;
    return this.availableLocales[l] || this.availableLocales[l.split('-')[0]];
  },

  set locale(locale) {
    this.localeKey = locale;
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

export const translate = (key, replacements = {}, options = {}) => {
  const locale = options.locale || settings.locale;
  let translation = '';
  try {
    const translationLocale = settings.translations[locale]
      ? locale
      : locale.split('-')[0];
    translation = fetchTranslation(settings.translations, `${translationLocale}.${key}`, replacements.count);
  } catch (err) {
    if (options.returnNullOnError) return null;
    if (options.returnKeyOnError) return key;
    return settings.handleMissingTranslation(key, replacements);
  }
  return replace(translation, replacements);
};

export const localize = (value, options = {}) => {
  const locale = options.locale || settings.locale;
  if (options.dateFormat) {
    try {
      const localeObject = settings.getLocaleObject(locale);
      if (!localeObject) throw new Error(`Locale ${locale} not added`);
      const parsedDate = options.parseFormat
        ? parse(
          value,
          translate(options.parseFormat, {}, { locale, returnKeyOnError: true }),
          new Date(), { locale: localeObject },
        )
        : new Date(value);
      if (options.dateFormat === 'distance-to-now') {
        return formatDistanceToNow(
          parsedDate,
          { addSuffix: true, locale: localeObject },
        );
      }
      return format(
        parsedDate,
        translate(options.dateFormat, {}, { locale, returnKeyOnError: true }),
        { locale: localeObject },
      );
    } catch (e) {
      return e.message;
    }
  }
  if (typeof value === 'number') {
    try {
      return new Intl.NumberFormat(locale, options).format(value);
    } catch (e) {
      return e.message;
    }
  }
  return value;
};

export const forceComponentsUpdate = () => {
  BaseComponent.rerenderAll();
};
