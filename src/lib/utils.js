import React from 'react';

const RTL_CHAR_RANGES = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0590-\u05FF\u0660-\u0669]/;
const isRTL = (text) => RTL_CHAR_RANGES.test(text);

const reorderForRTL = (value) => {
  if (typeof value !== 'string') return value;

  // Handle common patterns
  if (value.endsWith('%')) {
    return '%' + value.slice(0, -1);
  }

  const currencyMatch = value.match(/^([^\d\s]+)\s?([\d.,٠-٩٫]+)/); // support Arabic numbers
  if (currencyMatch) {
    return `${currencyMatch[2]} ${currencyMatch[1]}`; // "٣٣٠٫٠٠ $"
  }

  return value;
};

export const replace = (translation, replacements) => {
  if (typeof translation === 'string') {
    let result = translation;

    // Determine if translation contains RTL text
    const translationIsRTL = isRTL(translation);

    Object.keys(replacements).forEach((key) => {
      let value = replacements[key] ?? '';

      // Reorder the value if in RTL context
      if (translationIsRTL) {
        value = reorderForRTL(value.toString());
      }
      result = result.split(`%{${key}}`).join(value);
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
