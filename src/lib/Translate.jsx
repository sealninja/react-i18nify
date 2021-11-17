import PropTypes from 'prop-types';
import { translate } from './core';
import BaseComponent from './Base';

class Translate extends BaseComponent {
  render() {
    const { value, locale, ...otherProps } = this.props;
    const translation = translate(value, otherProps, { locale });

    return translation;
  }
}

Translate.propTypes = {
  value: PropTypes.string.isRequired,
  locale: PropTypes.string,
};

export default Translate;
