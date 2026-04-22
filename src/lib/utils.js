import React from 'react';

const WRAPPER_REPLACEMENT_REGEX = /%{([^/}]+)}(?=[\s\S]*%{\/\1})/g;

export const replace = (translation, replacements) => {
  if (typeof translation === 'string') {
    const wrapperReplacementKeys = new Set([...translation.matchAll(WRAPPER_REPLACEMENT_REGEX)].map(([, key]) => key));

    let result = translation;
    Object.keys(replacements).forEach((replacement) => {
      if (wrapperReplacementKeys.has(replacement)) {
        if (typeof replacements[replacement] !== 'function') {
          throw new Error(`The replacement value for "${replacement}" should be a function that receives children.`);
        }

        while (result.includes(`%{${replacement}}`)) {
          const startIndex = result.indexOf(`%{${replacement}}`);
          const endIndex = result.indexOf(`%{/${replacement}}`, startIndex);

          if (startIndex === -1 || endIndex === -1) {
            break;
          }

          const before = result.substring(0, startIndex);
          const middle = result.substring(startIndex + replacement.length + 3, endIndex);
          const after = result.substring(endIndex + replacement.length + 4);

          result = `${before}${replacements[replacement](middle)}${after}`;
        }

        return;
      }

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
