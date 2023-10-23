"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _drawer = _interopRequireDefault(require("@alifd/next/lib/drawer"));
var _button = _interopRequireDefault(require("@alifd/next/lib/button"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var React = _interopRequireWildcard(require("react"));
var _lowcodeEngine = require("@alilc/lowcode-engine");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// 获取相关接口配置
function checkBlockAPI() {
  var apiList = _lowcodeEngine.config.get('documentApi') || {};
  var blockAPI = apiList.url;
  if (!blockAPI) {
    throw new Error('[面板] url地址没有配置');
  }
  return blockAPI;
}
var DocumentsDialog = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(DocumentsDialog, _React$Component);
  function DocumentsDialog() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      visible: false,
      bookUrl: false
    };
    _this.onOpen = function () {
      _this.setState({
        visible: true
      });
    };
    _this.onClose = function () {
      _this.setState({
        visible: false
      });
    };
    return _this;
  }
  var _proto = DocumentsDialog.prototype;
  _proto.componentDidMount = function componentDidMount() {
    var _checkBlockAPI = checkBlockAPI(),
      blockAPI = _checkBlockAPI.blockAPI;

    // 获取传递的页面传递的参数，不要可删除
    this.setState({
      id: this.setState({
        bookUrl: blockAPI || 'https://lowcode.itq168.com/release/58/?bookid=2'
      })
    });
  };
  _proto.render = function render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_button["default"], {
      type: "primary",
      onClick: this.onOpen
    }, " \u6587\u6863 "), /*#__PURE__*/React.createElement(_drawer["default"], {
      title: "\u64CD\u4F5C\u6587\u6863 ",
      placement: "right",
      width: '70%',
      cache: true,
      closeMode: ['close', 'mask', 'esc'],
      visible: this.state.visible,
      onClose: this.onClose
    }, /*#__PURE__*/React.createElement("iframe", {
      src: this.state.bookUrl,
      style: {
        height: '90vh',
        width: '100%'
      },
      frameborder: "0"
    })));
  };
  return DocumentsDialog;
}(React.Component);
var _default = DocumentsDialog;
exports["default"] = _default;