import PropTypes from 'prop-types';
import BaseComponent from './Base';

export default class I18n extends BaseComponent {
  static propTypes = {
    render: PropTypes.func.isRequired,
  };

  render = () => this.props.render();
}
