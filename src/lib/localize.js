import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

import { getLocale, handleFailedLocalization } from './settings';
import translate from './translate';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default (value, options = {}) => {
  const locale = options.locale || getLocale();

  if (options.dateFormat) {
    try {
      let dayJsLocale = locale.toLowerCase();
      if (dayJsLocale === 'no') dayJsLocale = 'nb'; // Bokmål as default Norwegian

      const parsedDate = (options.parseFormat ? dayjs(value, translate(options.parseFormat, {}, { locale, returnKeyOnError: true }), dayJsLocale) : dayjs(value)).locale(dayJsLocale);
      if (!dayJsLocale.startsWith(parsedDate.locale())) throw new Error('Invalid locale');

      if (!parsedDate.isValid()) throw new Error('Invalid date');

      if (options.dateFormat === 'distance-to-now') {
        return parsedDate.fromNow();
      }
      return parsedDate.format(translate(options.dateFormat, {}, { locale, returnKeyOnError: true }));
    } catch (err) {
      return handleFailedLocalization(value, options, err);
    }
  }
  if (typeof value === 'number') {
    try {
      let intlLocale = locale;
      if (intlLocale.toLowerCase() === 'ar') intlLocale = 'ar-EG'; // work-around for Chrome
      return new Intl.NumberFormat(intlLocale, options).format(value);
    } catch (err) {
      return handleFailedLocalization(value, options, err);
    }
  }
  return value;
};
