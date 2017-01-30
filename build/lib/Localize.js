'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var Localize = function (_BaseComponent) {
  _inherits(Localize, _BaseComponent);

  function Localize() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Localize);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Localize.__proto__ || Object.getPrototypeOf(Localize)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      var localization = _I18n2.default._localize(_this.props.value, _this.props.dateFormat ? { dateFormat: _this.props.dateFormat } : _this.props.options);
      if (_this.props.dangerousHTML) {
        return _react2.default.createElement('span', { style: _this.props.style,
          className: _this.props.className,
          dangerouslySetInnerHTML: { __html: localization } });
      }
      return _react2.default.createElement(
        'span',
        { style: _this.props.style,
          className: _this.props.className },
        localization
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Localize;
}(_Base2.default);

Localize.propTypes = {
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.object]).isRequired,
  options: _react2.default.PropTypes.object,
  dateFormat: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  dangerousHTML: _react2.default.PropTypes.bool,
  /**
   * Optional styling
   */
  style: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]))
};
exports.default = Localize;