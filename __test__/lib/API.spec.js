/* global describe, test, expect, beforeAll, */

import { setLocale, setTranslations, t, l } from '../../src';

describe('API', () => {
  beforeAll(() => {
    setTranslations({
      en: {
        application: {
          hello: 'Hello, %{name}!',
        },
        dates: {
          lts: 'LTS',
        },
      },
    });
    setLocale('en');
  });

  describe('t', () => {
    test('should handle dynamic placeholder', () => {
      const result1 = t('application.hello', { name: 'Aad' });
      expect(result1).toEqual('Hello, Aad!');

      const result2 = t('application.hello', { name: 'Piet' });
      expect(result2).toEqual('Hello, Piet!');
    });

    test('should handle nested dynamic placeholder', () => {
      const result1 = t('application', { name: 'Aad' });
      expect(result1).toEqual({ hello: 'Hello, Aad!' });

      const result2 = t('application', { name: 'Piet' });
      expect(result2).toEqual({ hello: 'Hello, Piet!' });
    });
  });

  describe('l', () => {
    test('should support parseFormat', () => {
      const result1 = l('2014-30-12', { parseFormat: 'YYYY-DD-MM', dateFormat: 'MM-DD-YYYY' });
      expect(result1).toEqual('12-30-2014');
    });

    test('should support LTS format', () => {
      const result1 = l(1517774664107, { dateFormat: 'LTS' });
      expect(result1).toEqual('9:04:24 p.m.');

      const result2 = l(1517774664107, { dateFormat: 'dates.lts' });
      expect(result2).toEqual('9:04:24 p.m.');
    });
  });
});
