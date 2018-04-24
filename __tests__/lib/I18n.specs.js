/* global describe, test, expect, beforeAll, */

import { I18n } from '../../src';

describe('I18n.js', () => {
  beforeAll(() => {
    I18n.setTranslations({
      en: {
        application: {
          hello: 'Hello, %{name}!',
        },
        dates: {
          lts: 'LTS',
        },
      },
    });
    I18n.setLocale('en');
  });

  describe('I18n.t', () => {
    test('should handle dynamic placeholder', () => {
      const result1 = I18n.t('application.hello', { name: 'Aad' });
      expect(result1).toEqual('Hello, Aad!');

      const result2 = I18n.t('application.hello', { name: 'Piet' });
      expect(result2).toEqual('Hello, Piet!');
    });

    test('should handle nested dynamic placeholder', () => {
      const result1 = I18n.t('application', { name: 'Aad' });
      expect(result1).toEqual({ hello: 'Hello, Aad!' });

      const result2 = I18n.t('application', { name: 'Piet' });
      expect(result2).toEqual({ hello: 'Hello, Piet!' });
    });
  });

  describe('I18n.l', () => {
    test('should support parseFormat', () => {
      const result1 = I18n.l('2014-30-12', { parseFormat: 'YYYY-DD-MM', dateFormat: 'MM-DD-YYYY' });
      expect(result1).toEqual('12-30-2014');
    });

    test('should support LTS format', () => {
      const result1 = I18n.l(1517774664107, { dateFormat: 'LTS' });
      expect(result1).toEqual('9:04:24 p.m.');

      const result2 = I18n.l(1517774664107, { dateFormat: 'dates.lts' });
      expect(result2).toEqual('9:04:24 p.m.');
    });
  });
});
