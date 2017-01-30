/* eslint no-underscore-dangle: "off" */
/* eslint react/no-danger: "off" */

import React from 'react';
import I18n from './I18n';
import BaseComponent from './Base';

export default class Translate extends BaseComponent {

  static propTypes = {
    value: React.PropTypes.string.isRequired,
    dangerousHTML: React.PropTypes.bool,
    className: React.PropTypes.string,
    /**
     * Optional styling
     */
    style: React.PropTypes.objectOf(
      React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string,
      ])
    ),
  };

  otherProps() {
    const result = { ...this.props };
    delete result.value;
    return result;
  }

  render() {
    const translation = I18n._translate(this.props.value, this.otherProps());
    if (this.props.dangerousHTML) {
      return <span style={this.props.style}
                   className={this.props.className}
                   dangerouslySetInnerHTML={{ __html: translation }} />;
    }
    return <span style={this.props.style}
                 className={this.props.className}>{translation}</span>;
  }
}
