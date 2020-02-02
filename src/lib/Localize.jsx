import React from 'react';
import PropTypes from 'prop-types';
import { localize } from './core';
import BaseComponent from './Base';

class Localize extends BaseComponent {
  render() {
    const {
      value, dateFormat, parseFormat, options = {},
    } = this.props;
    const localization = localize(value, { ...options, dateFormat, parseFormat });

    return (
      <React.Fragment>
        {localization}
      </React.Fragment>
    );
  }
}

Localize.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object]).isRequired,
  dateFormat: PropTypes.string,
  parseFormat: PropTypes.string,
  options: PropTypes.object,
};

export default Localize;
