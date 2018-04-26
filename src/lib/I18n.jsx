import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from './Base';

export default class I18n extends BaseComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return React.Children.map(this.props.children, child => React.cloneElement(child));
  }
}
