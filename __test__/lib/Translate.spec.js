/* global describe, test, expect, beforeAll, beforeEach */

import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { setLocale, setTranslations, Translate } from '../../src';

describe('Translate.jsx', () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
    setTranslations({
      en: {
        application: {
          title: 'Awesome app with i18n!',
          hello: 'Hello, %{name}!',
        },
        export: 'Export %{count} items',
        export_0: 'Nothing to export',
        export_1: 'Export %{count} item',
        two_lines: (
          <div>
            Line 1
            <br />
            Line 2
          </div>
        ),
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

    test('should handle translation', () => {
      const component = mount(<Translate
        value="application.title"
      />);

      expect(component.type()).toBe(Translate);
      expect(component.text()).toBe('Awesome app with i18n!');
    });

    test('should handle NL translation', () => {
      setLocale('nl');
      const component = mount(<Translate
        value="application.title"
      />);

      expect(component.type()).toBe(Translate);
      expect(component.text()).toBe('Toffe app met i18n!');
    });

    test('should handle locale switching', () => {
      const component = mount(<Translate
        value="application.title"
      />);

      expect(component.text()).toBe('Awesome app with i18n!');
      setLocale('nl');
      expect(component.text()).toBe('Toffe app met i18n!');
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
