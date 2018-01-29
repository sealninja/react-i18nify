/* global describe, test, expect, beforeAll, beforeEach */

import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { I18n } from '../../src';
import Translate from '../../src/lib/Translate';

describe('Translate.jsx', () => {
  test('should export <Translate/> component', () => {
    expect(Translate).toBeDefined();
  });

  beforeAll(() => {
    configure({ adapter: new Adapter() });
    I18n.setTranslations({
      en: {
        application: {
          title: 'Awesome app with i18n!',
          hello: 'Hello, %{name}!',
        },
        export: 'Export %{count} items',
        export_0: 'Nothing to export',
        export_1: 'Export %{count} item',
        two_lines: 'Line 1<br />Line 2',
      },
    });

    I18n.setLocale('en');
  });

  describe('<Translate/> component', () => {
    const attrs = { value: 'application.title' };
    let wrapper = null;

    beforeEach(() => {
      wrapper = mount(<Translate {...attrs} />);
    });

    test('should render a <span/> with style attribute', () => {
      const style = { fontWeight: 'bold', fontSize: '14px' };
      wrapper.setProps({ style });
      const span = wrapper.find('span');

      expect(span.type()).toBe('span');
      expect(span.props().style).toBe(style);
      expect(span.html().match(/style="([^"]*)"/i)[1]).toBe('font-weight: bold; font-size: 14px;');
    });

    test('should render a <span/> with class attribute', () => {
      const className = 'nice';
      wrapper.setProps({ className });
      const span = wrapper.find('span');

      expect(span.type()).toBe('span');
      expect(span.hasClass(className)).toBeTruthy();
    });

    test('should handle translation', () => {
      const span = wrapper.find('span');

      expect(span.type()).toBe('span');
      expect(span.text()).toBe('Awesome app with i18n!');
    });

    test('should handle dynamic placeholder', () => {
      wrapper.setProps({ value: 'application.hello', name: 'Aad' });
      const span = wrapper.find('span');

      expect(span.type()).toBe('span');
      expect(span.text()).toBe('Hello, Aad!');
    });

    test('should handle pluralization', () => {
      const span = wrapper.find('span');
      wrapper.setProps({ value: 'export', count: 0 });

      expect(span.type()).toBe('span');
      expect(span.text()).toBe('Nothing to export');

      wrapper.setProps({ value: 'export', count: 1 });

      expect(span.type()).toBe('span');
      expect(span.text()).toBe('Export 1 item');

      wrapper.setProps({ value: 'export', count: 4 });

      expect(span.type()).toBe('span');
      expect(span.text()).toBe('Export 4 items');
    });

    test('should handle dangerousHTML', () => {
      const span = wrapper.find('span');
      wrapper.setProps({ value: 'two_lines' });

      expect(span.type()).toBe('span');
      expect(span.text()).toBe('Line 1<br />Line 2');
    });
  });
});
