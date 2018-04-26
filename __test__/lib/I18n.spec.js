/* global describe, test, expect, beforeAll, beforeEach */

import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { setLocale, setTranslations, t, I18n } from '../../src';


describe('I18n.jsx', () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() });
    setTranslations({
      en: {
        application: {
          title: 'Awesome app with i18n!',
        },
      },
      nl: {
        application: {
          title: 'Toffe app met i18n!',
        },
      },
    });
  });

  describe('<I18n/> component', () => {
    beforeEach(() => {
      setLocale('en');
    });

    test('should handle locale switching for attributes', async () => {
      const Input = () => <input placeholder={t('application.title')} />;
      const component = mount(<I18n><Input /></I18n>);

      expect(component.html()).toBe('<input placeholder="Awesome app with i18n!">');
      setLocale('nl');
      expect(component.html()).toBe('<input placeholder="Toffe app met i18n!">');
    });

    test('should handle locale switching for children', async () => {
      const Span = () => <span>{t('application.title')}</span>;
      const component = mount(<I18n><Span /></I18n>);

      expect(component.html()).toBe('<span>Awesome app with i18n!</span>');
      setLocale('nl');
      expect(component.html()).toBe('<span>Toffe app met i18n!</span>');
    });
  });
});
