import React from 'react';
import PropTypes from 'prop-types';
import I18n from './I18n';
import BaseComponent from './Base';

export default class Localize extends BaseComponent {
  static propTypes = {
    tag: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
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

  static defaultProps = {
    tag: 'span',
  };

  render() {
    const {
      tag: Tag, value, dateFormat, options = {}, dangerousHTML, style, className,
    } = this.props;
    const localization = I18n._localize(value, { ...options, dateFormat });

    if (dangerousHTML) {
      return (
        <Tag
          style={style}
          className={className}
          dangerouslySetInnerHTML={{ __html: localization }}
        />
      );
    }
    return <Tag style={style} className={className}>{localization}</Tag>;
  }
}
