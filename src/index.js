export { default as Translate } from './lib/Translate';
export { default as Localize } from './lib/Localize';
export { default as I18n } from './lib/I18n';
export {
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
  translate as t,
  localize as l,
  forceComponentsUpdate,
} from './lib/core';
