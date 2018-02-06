/* eslint global-require: "off" */
/* eslint no-console: "off" */

import IntlPolyfill from 'intl';
import moment from 'moment';
import 'moment/min/locales';
import BaseComponent from './Base';

export default {
  _localeKey: 'en',
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
  },

  setLocale(locale, rerenderComponents = true) {
    this._locale = locale;
    if (rerenderComponents) {
      this.forceComponentsUpdate();
    }
  },

  setTranslations(translations, rerenderComponents = true) {
    this._translations = translations;
    if (rerenderComponents) {
      this.forceComponentsUpdate();
    }
  },

  loadTranslations(translations) {
    console.error('I18n.loadTranslations is deprecated, please use I18n.setTranslations instead');
    this.setTranslations(translations);
  },

  setTranslationsGetter(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Translations getter must be a function');
    }
    this._getTranslations = fn;
  },

  setLocaleGetter(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Locale getter must be a function');
    }
    this._getLocale = fn;
  },
  setHandleMissingTranslation(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Handle missing translation must be a function');
    }
    this._handleMissingTranslation = fn;
  },

  t(key, replacements = {}) {
    return this._translate(key, replacements);
  },

  l(value, options) {
    return this._localize(value, options);
  },

  _replace(translation, replacements) {
    if (typeof translation === 'string') {
      let result = translation;
      Object.keys(replacements).forEach((replacement) => {
        result = result.split(`%{${replacement}}`).join(replacements[replacement]);
      });
      return result;
    }
    if (typeof translation === 'object') {
      const result = {};
      Object.keys(translation).forEach((translationKey) => {
        result[translationKey] = this._replace(translation[translationKey], replacements);
      });
      return result;
    }
    return null;
  },

  _translate(key, replacements = {}) {
    let translation = '';
    try {
      const translationLocale = this._translations[this._locale] ?
        this._locale :
        this._locale.split('-')[0];
      translation = this._fetchTranslation(
        this._translations,
        `${translationLocale}.${key}`,
        replacements.count,
      );
    } catch (err) {
      return this._handleMissingTranslation(key, replacements);
    }
    return this._replace(translation, replacements);
  },

  _localize(value, options = {}) {
    if (options.dateFormat) {
      return moment(
        value,
        options.parseFormat,
        this._locale,
        Boolean(options.strictParse),
      ).format(this.t(options.dateFormat));
    }
    if (typeof value === 'number') {
      if (global.Intl) {
        if (!(Intl.NumberFormat &&
          Intl.NumberFormat.supportedLocalesOf(this._locale).length === 1)) {
          Intl.NumberFormat = IntlPolyfill.NumberFormat;
        }
      } else {
        global.Intl = IntlPolyfill;
      }
      return new Intl.NumberFormat(this._locale, options).format(value);
    }
    return value;
  },

  _fetchTranslation(translations, key, count = null) {
    const _index = key.indexOf('.');
    if (typeof translations === 'undefined') {
      throw new Error('not found');
    }
    if (_index > -1) {
      return this._fetchTranslation(
        translations[key.substring(0, _index)],
        key.substr(_index + 1),
        count,
      );
    }
    if (count !== null) {
      if (translations[`${key}_${count}`]) {
        // when key = 'items_3' if count is 3
        return translations[`${key}_${count}`];
      }
      if (count !== 1 && translations[`${key}_plural`]) {
        // when count is not simply singular, return _plural
        return translations[`${key}_plural`];
      }
    }
    if (translations[key]) {
      return translations[key];
    }
    throw new Error('not found');
  },

  forceComponentsUpdate() {
    BaseComponent.rerenderAll();
  },
};
