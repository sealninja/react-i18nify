import { fetchTranslation, replace } from './utils';
import { getLocale, getTranslations, handleMissingTranslation } from './settings';

export default (key, replacements = {}, options = {}) => {
  const locale = options.locale || getLocale();
  let translation = '';
  try {
    const translationLocale = getTranslations()[locale] ? locale : locale.split('-')[0];
    translation = fetchTranslation(getTranslations(), `${translationLocale}.${key}`, replacements.count);
  } catch (err) {
    if (options.returnNullOnError) return null;
    if (options.returnKeyOnError) return key;
    return handleMissingTranslation(key, replacements, options, err);
  }
  return replace(translation, replacements);
};
