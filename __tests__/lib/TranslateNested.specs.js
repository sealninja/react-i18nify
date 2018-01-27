import React      from 'react';
import { mount }  from 'enzyme';
import { I18n }   from '../../src';
import TranslateNested from '../../src/lib/TranslateNested';

describe('TranslateNested.jsx', () => {
  test('should export <TranslateNested/> component', () => {
    expect(TranslateNested).toBeDefined();
  });

  beforeAll(() => {
    I18n.setTranslations({
      en : {
        really: {
          deeply: {
            nested: {
              name1: 'You are %{age} years old',
            },
          }
        }
      }
    });
    I18n.setLocale('en');
  });

  describe('<TranslateNested/> component', () => {
    let attrs = { value: 'name1', count: 40 }, wrapper = null;

    beforeEach(() => {
      wrapper = mount(<TranslateNested {...attrs} />);
    });

    test('should handle nested dynamic placeholder', (next) => {
      const span = wrapper.find('span');

      wrapper.setProps({ value: 'name1', age: 30 });
      expect(span.type()).toBe('span');
      expect(span.text()).toBe('You are 30 years old');

      wrapper.setProps({ value: 'name1', age: 20 });
      expect(span.type()).toBe('span');
      expect(span.text()).toBe('You are 20 years old');

      process.nextTick(() => {
        next();
      });
    });
  });
});