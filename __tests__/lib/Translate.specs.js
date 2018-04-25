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
        two_lines: <div>Line 1<br />Line 2</div>,
      },
    });
  });

  describe('<Translate/> component', () => {
    beforeEach(() => {
      I18n.setLocale('en');
    });

    test('should handle translation', () => {
      const component = mount(<Translate
        value="application.title"
      />);

      expect(component.type()).toBe(Translate);
      expect(component.text()).toBe('Awesome app with i18n!');
    });

    test('should handle dynamic placeholder', () => {
      const component = mount(<Translate
        value="application.hello"
        name="Aad"
      />);

      expect(component.type()).toBe(Translate);
      expect(component.text()).toBe('Hello, Aad!');
    });

    test('should handle pluralization', () => {
      const component = mount(<Translate
        value="export"
        count={0}
      />);

      expect(component.type()).toBe(Translate);
      expect(component.text()).toBe('Nothing to export');

      component.setProps({ count: 1 });

      expect(component.type()).toBe(Translate);
      expect(component.text()).toBe('Export 1 item');

      component.setProps({ count: 4 });

      expect(component.type()).toBe(Translate);
      expect(component.text()).toBe('Export 4 items');
    });

    test('should handle react element', () => {
      const component = mount(<Translate
        value="two_lines"
      />);

      expect(component.type()).toBe(Translate);
      expect(component.text()).toBe('Line 1Line 2');
      expect(component.html()).toBe('<div>Line 1<br>Line 2</div>');
    });
  });
});
