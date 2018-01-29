import React from 'react';
import PropTypes from 'prop-types';
import I18n from './I18n';
import BaseComponent from './Base';

export default class Translate extends BaseComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    dangerousHTML: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),
  };

  otherProps() {
    const result = { ...this.props };
    delete result.value;
    return result;
  }

  render() {
    const {
      value, dangerousHTML, style, className,
    } = this.props;
    const translation = I18n._translate(value, this.otherProps());

    if (dangerousHTML) {
      return (
        <span
          style={style}
          className={className}
          dangerouslySetInnerHTML={{ __html: translation }}
        />
      );
    }
    return <span style={style} className={className}>{translation}</span>;
  }
}
