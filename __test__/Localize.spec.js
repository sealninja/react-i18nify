/* global describe, test, expect, beforeAll, beforeEach */

import React from 'react';
import 'dayjs/locale/nl';
import 'dayjs/locale/en';
import { renderToString } from 'react-dom/server';
import { setLocale, setTranslations, Localize } from '../src';

describe('Localize.jsx', () => {
  beforeAll(() => {
    setTranslations({
      en: {
        date: 'MMMM Do, YYYY',
      },
      nl: {
        date: 'D MMMM YYYY',
      },
    });
  });

  describe('<Localize/> component', () => {
    beforeEach(() => {
      setLocale('en');
    });

    test('should export <Localize/> component', () => {
      expect(Localize).toBeDefined();
    });

    test('should handle date localization', () => {
      const component = <Localize dateFormat="date" parseFormat="YYYY-MM-DD" value="2016-07-04" />;
      expect(renderToString(component)).toMatch('July 4th, 2016');
    });

    test('should handle NL date localization', () => {
      setLocale('nl');
      const component = <Localize dateFormat="date" parseFormat="YYYY-MM-DD" value="2016-07-04" />;
      expect(renderToString(component)).toMatch('4 juli 2016');
    });

    test('should handle locale switching', () => {
      const component = <Localize dateFormat="date" parseFormat="YYYY-MM-DD" value="2016-07-04" />;
      expect(renderToString(component)).toMatch('July 4th, 2016');
      setLocale('nl');
      expect(renderToString(component)).toMatch('4 juli 2016');
    });

    test('should handle date localization with parseFormat', () => {
      const component = <Localize dateFormat="date" parseFormat="YYYY-DD-MM" value="2016-04-07" />;
      expect(renderToString(component)).toMatch('July 4th, 2016');
    });

    test('should handle number localization', () => {
      const component = (
        <Localize
          options={{
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }}
          value={10 / 3}
        />
      );
      expect(renderToString(component)).toMatch('$3.33');
    });
  });
});
