/* eslint no-console: "off" */

import BaseComponent from '../components/Base';

const settings = {
  availableLocales: {},
  localeKey: 'en',
  translationsObject: {},
  getTranslations: null,
  getLocale: null,
  handleMissingTranslation: (text) => text.split('.').pop(),
  handleFailedLocalization: () => null,
};

export const getLocale = () => (settings.getLocale ? settings.getLocale() : settings.localeKey);

export const setLocale = (locale, rerenderComponents = true) => {
  settings.localeKey = locale;
  settings.getLocale = null;
  if (rerenderComponents) {
    BaseComponent.rerenderAll();
  }
};

export const getLocaleObject = (locale) => {
  const l = locale || settings.locale;
  return settings.availableLocales[l] || settings.availableLocales[l.split('-')[0]];
};

export const handleMissingTranslation = (...args) => settings.handleMissingTranslation(...args);
export const handleFailedLocalization = (...args) => settings.handleFailedLocalization(...args);

export const addLocale = (name, locale) => {
  settings.availableLocales[name] = locale;
};

export const addLocales = (locales) => {
  settings.availableLocales = {
    ...settings.availableLocales,
    ...locales,
  };
};

export const getTranslations = () => (settings.getTranslations
  ? settings.getTranslations() : settings.translationsObject);

export const setTranslations = (translations, rerenderComponents = true) => {
  settings.translationsObject = translations;
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

export const setHandleFailedLocalization = (fn) => {
  if (typeof fn !== 'function') {
    throw new Error('Handle failed localization must be a function');
  }
  settings.handleFailedLocalization = fn;
};
