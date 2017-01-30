'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _I18n = require('./I18n');

var _I18n2 = _interopRequireDefault(_I18n);

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-underscore-dangle: "off" */
/* eslint react/no-danger: "off" */

var Translate = function (_BaseComponent) {
  _inherits(Translate, _BaseComponent);

  function Translate() {
    _classCallCheck(this, Translate);

    return _possibleConstructorReturn(this, (Translate.__proto__ || Object.getPrototypeOf(Translate)).apply(this, arguments));
  }

  _createClass(Translate, [{
    key: 'otherProps',
    value: function otherProps() {
      var result = _extends({}, this.props);
      delete result.value;
      return result;
    }
  }, {
    key: 'render',
    value: function render() {
      var translation = _I18n2.default._translate(this.props.value, this.otherProps());
      if (this.props.dangerousHTML) {
        return _react2.default.createElement('span', { style: this.props.style,
          className: this.props.className,
          dangerouslySetInnerHTML: { __html: translation } });
      }
      return _react2.default.createElement(
        'span',
        { style: this.props.style,
          className: this.props.className },
        translation
      );
    }
  }]);

  return Translate;
}(_Base2.default);

Translate.propTypes = {
  value: _react2.default.PropTypes.string.isRequired,
  dangerousHTML: _react2.default.PropTypes.bool,
  className: _react2.default.PropTypes.string,
  /**
   * Optional styling
   */
  style: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]))
};
exports.default = Translate;