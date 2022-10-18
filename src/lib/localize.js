import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

import { getLocale, handleFailedLocalization } from './settings';
import translate from './translate';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export default (value, options = {}) => {
  const locale = options.locale || getLocale();

  if (options.dateFormat) {
    try {
      if (dayjs.locale() !== locale) dayjs.locale(locale);
      if (dayjs.locale() !== locale) throw new Error('Invalid locale');

      const parsedDate = options.parseFormat
        ? dayjs(
          value,
          translate(options.parseFormat, {}, { locale, returnKeyOnError: true }),
          locale,
        )
        : dayjs(value);

      if (!parsedDate.isValid()) throw new Error('Invalid date');

      if (options.dateFormat === 'distance-to-now') {
        return parsedDate.fromNow();
      }
      return parsedDate.format(
        translate(options.dateFormat, {}, { locale, returnKeyOnError: true }),
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
