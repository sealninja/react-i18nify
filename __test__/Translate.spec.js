/* global describe, test, expect, beforeAll, beforeEach */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { setLocale, setTranslations, Translate } from '../src';

describe('Translate.jsx', () => {
  beforeAll(() => {
    setTranslations({
      en: {
        application: {
          title: 'Awesome app with i18n!',
          hello: 'Hello, %{name}!',
        },
        export: 'Export %{count} items',
        export_0: 'Nothing to export',
        export_1: 'Export %{count} item',
      },
      nl: {
        application: {
          title: 'Toffe app met i18n!',
        },
      },
    });
  });

  describe('<Translate/> component', () => {
    beforeEach(() => {
      setLocale('en');
    });

    test('should export <Translate/> component', () => {
      expect(Translate).toBeDefined();
    });

    test('should handle translation', () => {
      const component = <Translate value="application.title" />;
      expect(renderToString(component)).toMatch('Awesome app with i18n!');
    });

    test('should handle NL translation', () => {
      setLocale('nl');
      const component = <Translate value="application.title" />;
      expect(renderToString(component)).toMatch('Toffe app met i18n!');
    });

    test('should handle locale switching', () => {
      const component = <Translate value="application.title" />;
      expect(renderToString(component)).toMatch('Awesome app with i18n!');
      setLocale('nl');
      expect(renderToString(component)).toMatch('Toffe app met i18n!');
    });

    test('should handle dynamic placeholder', () => {
      const component = <Translate name="Aad" value="application.hello" />;
      expect(renderToString(component)).toMatch('Hello, Aad!');
    });

    test('should handle pluralization', () => {
      expect(renderToString(<Translate count={0} value="export" />)).toMatch('Nothing to export');
      expect(renderToString(<Translate count={1} value="export" />)).toMatch('Export 1 item');
      expect(renderToString(<Translate count={4} value="export" />)).toMatch('Export 4 items');
    });
  });
});
