import React from 'react';
import PropTypes from 'prop-types';
import I18n from './I18n';
import BaseComponent from './Base';

export default class Translate extends BaseComponent {
  static propTypes = {
    tag: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
    value: PropTypes.string.isRequired,
    dangerousHTML: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ])),
  };

  static defaultProps = {
    tag: 'span',
  };

  otherProps() {
    const result = { ...this.props };
    delete result.value;
    return result;
  }

  render() {
    const {
      tag: Tag, value, dangerousHTML, style, className,
    } = this.props;
    const translation = I18n._translate(value, this.otherProps());

    if (dangerousHTML) {
      return (
        <Tag
          style={style}
          className={className}
          dangerouslySetInnerHTML={{ __html: translation }}
        />
      );
    }
    return <Tag style={style} className={className}>{translation}</Tag>;
  }
}
