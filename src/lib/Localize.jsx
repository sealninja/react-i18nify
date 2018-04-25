import React from 'react';
import PropTypes from 'prop-types';
import I18n from './I18n';
import BaseComponent from './Base';

export default class Localize extends BaseComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object]).isRequired,
    options: PropTypes.object,
    dateFormat: PropTypes.string,
    parseFormat: PropTypes.string,
  };

  render() {
    const {
      value, dateFormat, parseFormat, options = {},
    } = this.props;
    const localization = I18n._localize(value, { ...options, dateFormat, parseFormat });

    return <React.Fragment>{localization}</React.Fragment>;
  }
}
