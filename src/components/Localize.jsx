import PropTypes from 'prop-types';
import localize from '../lib/localize';
import BaseComponent from './Base';

class Localize extends BaseComponent {
  render() {
    const { value, dateFormat, parseFormat, options = {} } = this.props;
    const localization = localize(value, { ...options, dateFormat, parseFormat });

    return localization;
  }
}

Localize.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
  dateFormat: PropTypes.string,
  parseFormat: PropTypes.string,
  options: PropTypes.object,
};

export default Localize;
