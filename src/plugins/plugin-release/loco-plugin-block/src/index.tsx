import * as React from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { ILowCodePluginContext } from '@alilc/lowcode-engine';
import { default as BlockPane } from './pane';
import {  Icon } from '@alifd/next';



const LowcodePluginLocoPluginBlock = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    // 插件名，注册环境下唯一
    name: 'LowcodePluginCusPlugin',
    // 依赖的插件（插件名数组）
    dep: [],
    // 插件对外暴露的数据和方法
    exports() {
      return {
        data: '你可以把插件的数据这样对外暴露',
        func: () => {
        },
      }
    },
    // 插件的初始化函数，在引擎初始化之后会立刻调用
    init() {
      // 你可以拿到其他插件暴露的方法和属性
      // const { data, func } = ctx.plugins.pluginA;
      // func(); 

      // console.log(options.name);

      // 往引擎增加面板
      ctx.skeleton.add({
        area: 'leftArea',
        name: 'LowcodePluginLocoPluginBlock',
        type: 'PanelDock',
        props: {
          icon: <Icon type="clock" style={{ color: "#8a8a8a"}}/>,
          description: '区块面板',
        },
        content: BlockPane,
      });

      // ctx.logger.log('打个日志');
    },
  };
};

// 插件名，注册环境下唯一
LowcodePluginLocoPluginBlock.pluginName = 'LowcodePluginLocoPluginBlock';
LowcodePluginLocoPluginBlock.meta = {
  // 依赖的插件（插件名数组）
  dependencies: [],
  // engines: {
  //   lowcodeEngine: '^1.1.0', // 插件需要配合 ^1.1.0 的引擎才可运行
  // },
}

export default LowcodePluginLocoPluginBlock;
