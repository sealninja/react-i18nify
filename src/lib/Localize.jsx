import React from 'react';
import PropTypes from 'prop-types';
import { l } from '../';
import BaseComponent from './Base';

export default class Localize extends BaseComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object]).isRequired,
    dateFormat: PropTypes.string,
    parseFormat: PropTypes.string,
    options: PropTypes.object,
  };

  render() {
    const {
      value, dateFormat, parseFormat, options = {},
    } = this.props;
    const localization = l(value, { ...options, dateFormat, parseFormat });

    return <React.Fragment>{localization}</React.Fragment>;
  }
}
