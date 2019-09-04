import PropTypes from 'prop-types';
import BaseComponent from './Base';

class I18n extends BaseComponent {
  render = () => this.props.render();
}

I18n.propTypes = {
  render: PropTypes.func.isRequired,
};

export default I18n;
