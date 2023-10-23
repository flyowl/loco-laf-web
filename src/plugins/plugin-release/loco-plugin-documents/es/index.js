import * as React from 'react';
import DocumentsDialog from './document-dialog';
var LocoPluginDocuments = function LocoPluginDocuments(ctx, options) {
  return {
    // 插件的初始化函数，在引擎初始化之后会立刻调用
    init: function init() {
      // 你可以拿到插件注册时的初始化参数
      // console.log(options.name);

      // 往引擎增加面板
      ctx.skeleton.add({
        name: 'documentsSample',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right'
        },
        content: /*#__PURE__*/React.createElement(DocumentsDialog, null)
      });
    }
  };
};

// 插件名，注册环境下唯一
/* Generated By Ali Lowcode Tools */LocoPluginDocuments.pluginName = "LocoPluginDocuments";
LocoPluginDocuments.meta = {
  // 依赖的插件（插件名数组）
  dependencies: []
  // engines: {
  //   lowcodeEngine: '^1.1.0', // 插件需要配合 ^1.1.0 的引擎才可运行
  // },
};

export default LocoPluginDocuments;