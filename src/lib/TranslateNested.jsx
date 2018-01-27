import React from 'react';
import PropTypes from 'prop-types';
import I18n from './I18n';
import BaseComponent from './Base';

export default class TranslateNested extends BaseComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  render() {
    const { value, ...rest } = this.props;
    const translation = I18n.t('really.deeply.nested', rest);

    return (
      <span >{translation[value]}</span>
    );
  }
}
