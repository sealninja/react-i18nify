/**
 * @jest-environment jsdom
 */

/* global describe, test, expect, beforeAll, beforeEach */

import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {
  setLocale, setTranslations, t, I18n,
} from '../../src';

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

    test('should handle locale switching for attributes', () => {
      const component = mount(<I18n render={() => <input placeholder={t('application.title')} />} />);

      expect(component.html()).toBe('<input placeholder="Awesome app with i18n!">');
      setLocale('nl');
      expect(component.html()).toBe('<input placeholder="Toffe app met i18n!">');
    });

    test('should handle locale switching for children', () => {
      const component = mount(<I18n render={() => (
        <span>
          {t('application.title')}
        </span>
      )}
      />);

      expect(component.html()).toBe('<span>Awesome app with i18n!</span>');
      setLocale('nl');
      expect(component.html()).toBe('<span>Toffe app met i18n!</span>');
    });
  });
});
