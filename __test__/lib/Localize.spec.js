/* global describe, test, expect, beforeAll, beforeEach */

import React from 'react';
import nl from 'date-fns/locale/nl';
import en from 'date-fns/locale/en-US';
import { renderToString } from 'react-dom/server';
import {
  addLocales,
  setLocale,
  setTranslations,
  Localize,
} from '../../src';

describe('Localize.jsx', () => {
  beforeAll(() => {
    setTranslations({
      en: {
        date: 'MMMM do, yyyy',
      },
      nl: {
        date: 'd MMMM yyyy',
      },
    });
    addLocales({ nl, en });
  });

  describe('<Localize/> component', () => {
    beforeEach(() => {
      setLocale('en');
    });
    test('should handle date localization', () => {
      const component = <Localize value="2016-07-04" parseFormat="yyyy-MM-dd" dateFormat="date" />;
      expect(renderToString(component)).toMatch('July 4th, 2016');
    });

    test('should handle NL date localization', () => {
      setLocale('nl');
      const component = <Localize value="2016-07-04" parseFormat="yyyy-MM-dd" dateFormat="date" />;
      expect(renderToString(component)).toMatch('4 juli 2016');
    });

    test('should handle locale switching', () => {
      const component = <Localize value="2016-07-04" parseFormat="yyyy-MM-dd" dateFormat="date" />;
      expect(renderToString(component)).toMatch('July 4th, 2016');
      setLocale('nl');
      expect(renderToString(component)).toMatch('4 juli 2016');
    });

    test('should handle date localization with parseFormat', () => {
      const component = <Localize value="2016-04-07" parseFormat="yyyy-dd-MM" dateFormat="date" />;
      expect(renderToString(component)).toMatch('July 4th, 2016');
    });

    test('should handle number localization', () => {
      const component = (
        <Localize
          value={10 / 3}
          options={{
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }}
        />
      );
      expect(renderToString(component)).toMatch('$3.33');
    });
  });
});
