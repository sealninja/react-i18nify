/**
 * @jest-environment jsdom
 */

/* global describe, test, expect, beforeAll, beforeEach */

import React from 'react';
import nl from 'date-fns/locale/nl';
import en from 'date-fns/locale/en-US';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {
  addLocales,
  setLocale,
  setTranslations,
  Localize,
} from '../../src';

describe('Localize.jsx', () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
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
      const component = mount(<Localize
        value="2016-07-04"
        parseFormat="yyyy-MM-dd"
        dateFormat="date"
      />);
      expect(component.type()).toBe(Localize);
      expect(component.text()).toBe('July 4th, 2016');
    });

    test('should handle NL date localization', () => {
      setLocale('nl');
      const component = mount(<Localize
        value="2016-07-04"
        parseFormat="yyyy-MM-dd"
        dateFormat="date"
      />);
      expect(component.type()).toBe(Localize);
      expect(component.text()).toBe('4 juli 2016');
    });

    test('should handle locale switching', () => {
      const component = mount(<Localize
        value="2016-07-04"
        parseFormat="yyyy-MM-dd"
        dateFormat="date"
      />);
      expect(component.text()).toBe('July 4th, 2016');
      setLocale('nl');
      component.update();
      expect(component.text()).toBe('4 juli 2016');
    });

    test('should handle date localization with parseFormat', () => {
      const component = mount(<Localize
        value="2016-04-07"
        parseFormat="yyyy-dd-MM"
        dateFormat="date"
      />);
      expect(component.type()).toBe(Localize);
      expect(component.text()).toBe('July 4th, 2016');
    });

    test('should handle number localization', () => {
      const component = mount(<Localize
        value={10 / 3}
        options={{
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }}
      />);
      expect(component.type()).toBe(Localize);
      expect(component.text()).toBe('$3.33');
    });
  });
});
