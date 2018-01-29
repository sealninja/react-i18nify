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
    dangerousHTML: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),
  };

  render() {
    const {
      value, dateFormat, options = {}, dangerousHTML, style, className,
    } = this.props;
    const localization = I18n._localize(value, { ...options, dateFormat });

    if (dangerousHTML) {
      return (
        <span
          style={style}
          className={className}
          dangerouslySetInnerHTML={{ __html: localization }}
        />
      );
    }
    return <span style={style} className={className}>{localization}</span>;
  }
}
