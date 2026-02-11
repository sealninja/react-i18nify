import translate from '../lib/translate';

import BaseComponent from './Base';

class Translate extends BaseComponent {
  render() {
    const { locale, value, ...otherProps } = this.props;
    const translation = translate(value, otherProps, { locale });

    return translation;
  }
}

export default Translate;
