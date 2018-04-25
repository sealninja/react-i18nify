import React from 'react';
import PropTypes from 'prop-types';
import I18n from './I18n';
import BaseComponent from './Base';

export default class Translate extends BaseComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  render() {
    const { value, ...otherProps } = this.props;
    const translation = I18n._translate(value, otherProps);

    return <React.Fragment>{translation}</React.Fragment>;
  }
}
