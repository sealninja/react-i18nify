export { forceComponentsUpdate } from './components/Base';
export { default as Translate } from './components/Translate';
export { default as Localize } from './components/Localize';
export { default as I18n } from './components/I18n';
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
  setHandleFailedLocalization,
} from './lib/settings';
export { default as translate } from './lib/translate';
export { default as t } from './lib/translate';
export { default as localize } from './lib/localize';
export { default as l } from './lib/localize';
export { replace as translateReplace } from './lib/utils';
