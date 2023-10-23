import _Drawer from "@alifd/next/es/drawer";
import _Button from "@alifd/next/es/button";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import * as React from 'react';
import { config } from '@alilc/lowcode-engine';

// 获取相关接口配置
function checkBlockAPI() {
  var apiList = config.get('documentApi') || {};
  var blockAPI = apiList.url;
  if (!blockAPI) {
    throw new Error('[面板] url地址没有配置');
  }
  return blockAPI;
}
var DocumentsDialog = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(DocumentsDialog, _React$Component);
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
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Button, {
      type: "primary",
      onClick: this.onOpen
    }, " \u6587\u6863 "), /*#__PURE__*/React.createElement(_Drawer, {
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
export default DocumentsDialog;