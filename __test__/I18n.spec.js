/* global describe, test, expect, beforeAll, beforeEach */

import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  setLocale, setTranslations, t, I18n,
} from '../src';

describe('I18n.jsx', () => {
  beforeAll(() => {
    setTranslations({
      en: {
        application: {
          title: 'Awesome app with i18n!',
        },
      },
      nl: {
        application: {
          title: 'Toffe app met i18n!',
        },
      },
    });
  });

  describe('<I18n/> component', () => {
    beforeEach(() => {
      setLocale('en');
    });

    test('should handle locale switching for attributes', () => {
      const component = <I18n render={() => <input placeholder={t('application.title')} />} />;

      expect(renderToString(component)).toEqual('<input placeholder="Awesome app with i18n!"/>');
      setLocale('nl');
      expect(renderToString(component)).toEqual('<input placeholder="Toffe app met i18n!"/>');
    });

    test('should handle locale switching for children', () => {
      const component = <I18n render={() => (<span>{t('application.title')}</span>)} />;

      expect(renderToString(component)).toEqual('<span>Awesome app with i18n!</span>');
      setLocale('nl');
      expect(renderToString(component)).toEqual('<span>Toffe app met i18n!</span>');
    });
  });
});
