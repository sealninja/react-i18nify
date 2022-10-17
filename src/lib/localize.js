import parse from 'date-fns/parse';
import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { getLocale, getLocaleObject, handleFailedLocalization } from './settings';
import translate from './translate';

export default (value, options = {}) => {
  const locale = options.locale || getLocale();
  if (options.dateFormat) {
    try {
      const localeObject = getLocaleObject(locale);
      if (!localeObject) throw new Error(`Locale ${locale} not added`);
      const parsedDate = options.parseFormat
        ? parse(
          value,
          translate(options.parseFormat, {}, { locale, returnKeyOnError: true }),
          new Date(),
          { locale: localeObject },
        )
        : new Date(value);
      if (options.dateFormat === 'distance-to-now') {
        return formatDistanceToNowStrict(
          parsedDate,
          { addSuffix: true, locale: localeObject },
        );
      }
      if (options.dateFormat === 'distance-to-now-hours') {
        return formatDistanceToNowStrict(
          parsedDate,
          { addSuffix: true, unit: 'hour', locale: localeObject },
        );
      }
      if (options.dateFormat === 'distance-to-now-days') {
        return formatDistanceToNowStrict(
          parsedDate,
          { addSuffix: true, unit: 'day', locale: localeObject },
        );
      }
      return format(
        parsedDate,
        translate(options.dateFormat, {}, { locale, returnKeyOnError: true }),
        { locale: localeObject },
      );
    } catch (err) {
      return handleFailedLocalization(value, options, err);
    }
  }
  if (typeof value === 'number') {
    try {
      return new Intl.NumberFormat(locale, options).format(value);
    } catch (err) {
      return handleFailedLocalization(value, options, err);
    }
  }
  return value;
};
