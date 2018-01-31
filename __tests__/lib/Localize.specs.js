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
    });

    I18n.setLocale('en');
  });

  describe('<Localize/> component', () => {
    const attrs = { value: '2016-07-04', dateFormat: 'date' };
    let wrapper = null;

    beforeEach(() => {
      wrapper = mount(<Localize {...attrs} />);
    });

    test('should render a <span/> with style attribute', () => {
      const style = { fontWeight: 'bold', fontSize: '14px' };
      wrapper.setProps({ style });
      const span = wrapper.find('span');

      expect(span.type()).toBe('span');
      expect(span.props().style).toBe(style);
      expect(span.html().match(/style="([^"]*)"/i)[1]).toBe('font-weight: bold; font-size: 14px;');
    });

    test('should render a <div/>', () => {
      wrapper.setProps({ tag: 'div' });
      const span = wrapper.find('div');

      expect(span.type()).toBe('div');
    });

    test('should render a <span/> with class attribute', () => {
      const className = 'nice';
      wrapper.setProps({ className });
      const span = wrapper.find('span');

      expect(span.type()).toBe('span');
      expect(span.hasClass(className)).toBeTruthy();
    });

    test('should handle localization', () => {
      const span = wrapper.find('span');

      expect(span.type()).toBe('span');
      expect(span.text()).toBe('July 4th, 2016');
    });

    test('should handle localization options', () => {
      const props = {
        value: 10 / 3,
        options: {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      };

      const span = mount(<Localize {...props} />).find('span');

      expect(span.type()).toBe('span');
      expect(span.text()).toBe('$3.33');
    });
  });
});
