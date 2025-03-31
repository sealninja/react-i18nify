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
      ar: {
        application: {
          title: 'تطبيق رائع مع ترجمة!',
        },
        price: {
          label: '%{amount} شهرياً',
        },
      },
    });
  });

  describe('<Translate/> component', () => {
    beforeEach(() => {
      setLocale('en');
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
      const component = <Translate value="application.hello" name="Aad" />;
      expect(renderToString(component)).toMatch('Hello, Aad!');
    });

    test('should handle pluralization', () => {
      expect(renderToString(<Translate value="export" count={0} />)).toMatch('Nothing to export');
      expect(renderToString(<Translate value="export" count={1} />)).toMatch('Export 1 item');
      expect(renderToString(<Translate value="export" count={4} />)).toMatch('Export 4 items');
    });

    test('should handle Arabic translation', () => {
      setLocale('ar');
      const component = <Translate value="application.title" />;
      expect(renderToString(component)).toMatch('تطبيق رائع مع ترجمة!');
      const priceComponent = <Translate value="price.label" amount="33 $" />;
      const output = renderToString(priceComponent);
      expect(output).toContain('33 $');
      expect(output).toContain('شهرياً');
      expect(output.indexOf('$')).toBeGreaterThan(output.indexOf('33'));
    });
  });
});
