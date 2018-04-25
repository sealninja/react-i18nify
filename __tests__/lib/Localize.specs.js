/* global describe, test, expect, beforeAll, beforeEach */

import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { I18n } from '../../src';
import Localize from '../../src/lib/Localize';

describe('Localize.jsx', () => {
  test('should export <Localize/> component', () => {
    expect(Localize).toBeDefined();
  });

  beforeAll(() => {
    configure({ adapter: new Adapter() });
    I18n.setTranslations({
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
      I18n.setLocale('en');
    });
    test('should handle date localization', () => {
      const component = mount(<Localize
        value="2016-07-04"
        dateFormat="date"
      />);
      expect(component.type()).toBe(Localize);
      expect(component.text()).toBe('July 4th, 2016');
    });

    test('should handle NL date localization', () => {
      I18n.setLocale('nl');
      const component = mount(<Localize
        value="2016-07-04"
        dateFormat="date"
      />);
      expect(component.type()).toBe(Localize);
      expect(component.text()).toBe('4 juli 2016');
    });

    test('should handle date localization with parseFormat', () => {
      const component = mount(<Localize
        value="2016-04-07"
        parseFormat="YYYY-DD-MM"
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
