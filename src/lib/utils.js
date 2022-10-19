import React from 'react';

export const replace = (translation, replacements) => {
  if (typeof translation === 'string') {
    let result = translation;
    Object.keys(replacements).forEach((replacement) => {
      result = result.split(`%{${replacement}}`).join(replacements[replacement] ?? '');
    });
    return result;
  }
  if (React.isValidElement(translation)) {
    return translation;
  }
  if (typeof translation === 'object') {
    const result = {};
    Object.keys(translation).forEach((translationKey) => {
      result[translationKey] = replace(translation[translationKey], replacements);
    });
    return result;
  }
  return null;
};

export const fetchTranslation = (translations, key, count = null) => {
  const _index = key.indexOf('.');
  if (typeof translations === 'undefined') {
    throw new Error('not found');
  }
  if (_index > -1) {
    return fetchTranslation(translations[key.substring(0, _index)], key.substr(_index + 1), count);
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
  if (translations[key] != null) {
    return translations[key];
  }
  throw new Error('not found');
};
