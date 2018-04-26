import React from 'react';
import PropTypes from 'prop-types';
import { t } from '../';

import BaseComponent from './Base';

export default class Translate extends BaseComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  render() {
    const { value, ...otherProps } = this.props;
    const translation = t(value, otherProps);

    return <React.Fragment>{translation}</React.Fragment>;
  }
}
