import localize from '../lib/localize';

import BaseComponent from './Base';

class Localize extends BaseComponent {
  render() {
    const { dateFormat, options = {}, parseFormat, value } = this.props;
    const localization = localize(value, { ...options, dateFormat, parseFormat });

    return localization;
  }
}

export default Localize;
