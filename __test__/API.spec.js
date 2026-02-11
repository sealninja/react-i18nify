/* global describe, test, expect, beforeEach */

import dayjs from 'dayjs';
import 'dayjs/locale/nl';
import 'dayjs/locale/it';
import 'dayjs/locale/zh';
import 'dayjs/locale/en';
import 'dayjs/locale/en-gb';
import timezonePlugin from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { getLocale, getTranslations, l, localize, setHandleMissingTranslation, setLocale, setLocaleGetter, setTranslations, setTranslationsGetter, t, translate } from '../src';

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

describe('API', () => {
  describe('setLocale', () => {
    setLocale('zh');
    const result = getLocale();
    expect(result).toEqual('zh');
  });

  describe('setTranslations', () => {
    setTranslations({
      en: {
        hello: 'Hello, %{name}!',
      },
    });
    const result = getTranslations();
    expect(result).toEqual({
      en: {
        hello: 'Hello, %{name}!',
      },
    });
  });

  describe('setLocaleGetter', () => {
    setLocaleGetter(() => 'zh');
    const result = getLocale();
    expect(result).toEqual('zh');
  });

  describe('setLocaleGetter', () => {
    setTranslationsGetter(() => ({
      en: {
        hello: 'Hello, %{name}!',
      },
    }));
    const result = getTranslations();
    expect(result).toEqual({
      en: {
        hello: 'Hello, %{name}!',
      },
    });
  });

  describe('setHandleMissingTranslation', () => {
    setHandleMissingTranslation((key) => `Missing translation: ${key}`);
    const result = t('application.unknown_translation');
    expect(result).toEqual('Missing translation: application.unknown_translation');
  });

  describe('translate', () => {
    beforeEach(() => {
      setTranslations({
        en: {
          application: {
            empty: '',
            hello: 'Hello, %{name}!',
          },
        },
        nl: {
          application: {
            empty: '',
            hello: 'Hallo, %{name}!',
          },
        },
      });
      setLocale('en');
    });

    [translate, t].forEach((translateFunction) => {
      test('should support fallback locale', () => {
        setLocale('nl-argh');
        const result1 = translateFunction('application.hello', { name: 'Aad' });
        expect(result1).toEqual('Hallo, Aad!');
      });

      test('should handle dynamic placeholder', () => {
        const result1 = translateFunction('application.hello', { name: 'Aad' });
        expect(result1).toEqual('Hello, Aad!');

        const result2 = translateFunction('application.hello', { name: 'Piet' });
        expect(result2).toEqual('Hello, Piet!');
      });

      test('should handle nested dynamic placeholder', () => {
        const result1 = translateFunction('application', { name: 'Aad' });
        expect(result1).toEqual({ empty: '', hello: 'Hello, Aad!' });

        const result2 = translateFunction('application', { name: 'Piet' });
        expect(result2).toEqual({ empty: '', hello: 'Hello, Piet!' });
      });

      test('should handle empty translation', () => {
        const result1 = translateFunction('application.empty');
        expect(result1).toEqual('');
      });

      test('should support providing locale', () => {
        const result1 = translateFunction('application.hello', { name: 'Aad' }, { locale: 'nl' });
        expect(result1).toEqual('Hallo, Aad!');
      });
    });
  });

  describe('localize', () => {
    beforeEach(() => {
      setTranslations({
        en: {
          dates: {
            long: 'MMMM Do, YYYY',
            short: 'MM-DD-YYYY',
          },
        },
        nl: {
          dates: {
            long: 'D MMMM YYYY',
          },
        },
      });
      setLocale('en');
    });

    [localize, l].forEach((localizeFunction) => {
      test('should return null when locale invalid', () => {
        setLocale('argh');
        const result = localizeFunction(1517774664107, { dateFormat: 'dates.long' });
        expect(result).toEqual(null);
      });

      test('should return null when locale not loaded', () => {
        setLocale('fr');
        const result = localizeFunction('2014-30-12', { dateFormat: 'dates.short', parseFormat: 'YYYY-DD-MM' });
        expect(result).toEqual(null);
      });

      test('should return null when localization failed', () => {
        const result = localizeFunction('huh', { dateFormat: 'dates.short', parseFormat: 'YYYY-DD-MM' });
        expect(result).toEqual(null);
      });

      test('should support parseFormat', () => {
        const result = localizeFunction('2014-30-12', { dateFormat: 'dates.short', parseFormat: 'YYYY-DD-MM' });
        expect(result).toEqual('12-30-2014');
      });

      test('should support providing locale', () => {
        const result = localizeFunction(1517774664107, { dateFormat: 'dates.long', locale: 'nl' });
        expect(result).toEqual('4 februari 2018');
      });

      test('should support distance to now', () => {
        const result = localizeFunction(new Date(new Date().setFullYear(new Date().getFullYear() - 3)).getTime(), { dateFormat: 'distance-to-now', locale: 'nl' });
        expect(result).toEqual('3 jaar geleden');
      });

      test('should support distance to now in days', () => {
        const result = localizeFunction(new Date(new Date().setHours(new Date().getHours() - 30)).getTime(), { dateFormat: 'distance-to-now', locale: 'nl' });
        expect(result).toEqual('een dag geleden');
      });

      test('should support dayjs with custom timezone', () => {
        const result = localizeFunction(dayjs.utc('2022-07-01T03:00:00.000Z').tz('America/Chihuahua'), { dateFormat: 'DD MMM YYYY, HH:mm Z', locale: 'nl' });
        expect(result).toEqual('30 jun 2022, 21:00 -06:00');
      });

      test('should return date when locale can fall back', () => {
        setLocale('nl-be');
        const result = localizeFunction(1517774664107, { dateFormat: 'LL' });
        expect(result).toEqual('4 februari 2018');
      });

      test('should return date when provided locale can fall back', () => {
        const result = localizeFunction(1517774664107, { dateFormat: 'LL', locale: 'zh-tw' });
        expect(result).toEqual('2018年2月4日');
      });

      test('should return date for regional locale with region uppercase', () => {
        setLocale('en-GB');
        const result = localizeFunction(1517774664107, { dateFormat: 'LL' });
        expect(result).toEqual('4 February 2018');
      });

      test('should return date for regional locale with region lowercase', () => {
        setLocale('en-gb');
        const result = localizeFunction(1517774664107, { dateFormat: 'LL' });
        expect(result).toEqual('4 February 2018');
      });
    });
  });
});
