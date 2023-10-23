import * as React from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';

import { MenuButton, Dialog,Field,Form,Select,Input,Message } from '@alifd/next';
import { project,config } from '@alilc/lowcode-engine';
import { TransformStage } from '@alilc/lowcode-types';



const { useState } = React;
const { Item } = MenuButton;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};



// 获取相关接口配置
function checkBlockAPI() {
  const apiList = config.get('releaseApi') || {};
  const { block: API } = apiList;

  if (!API?.low_schema_release) {
    Message.error("[面板] 发布API没有配置");
  }

  if (!API?.releasepreview) {
    Message.error("[面板] 发布数据没有配置");

  }

  return API;
}


const releaseDialog = () => {
  const { low_schema_release, releasepreview } = checkBlockAPI()||{
    low_schema_release:{},
    releasepreview:{},

  };

  const field = Field.useField();



  const handleCopy = (e: ClipboardEvent) => {
    let schema = project.exportSchema(TransformStage.Save)

    // clipboardData 可能是 null
    e.clipboardData && e.clipboardData.setData('text/plain',  JSON.stringify(schema) );
    e.preventDefault();
    // removeEventListener 要传入第二个参数
    document.removeEventListener('copy', handleCopy);
};





  return (
    <div>
            <MenuButton type="primary" popupTriggerType={'hover'} label="预览"  style={{backgroundColor:'red'}} onClick={releasepreview}>
            <Item style={{color:'red'}} onClick={  low_schema_release}>发布</Item>
          </MenuButton>
    </div>
  );
};


const LowcodePluginLocoPluginRelease = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    // 插件的初始化函数，在引擎初始化之后会立刻调用
    init() {
      // 你可以拿到插件注册时的初始化参数
      // console.log(options.name);

      // 往引擎增加面板
      ctx.skeleton.add({
        name: 'LowcodePluginLocoPluginReleasePane',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: releaseDialog,
      });

    },
  };
};

// 插件名，注册环境下唯一
LowcodePluginLocoPluginRelease.pluginName = 'LowcodePluginLocoPluginRelease';
LowcodePluginLocoPluginRelease.meta = {
  // 依赖的插件（插件名数组）
  dependencies: [],
  // engines: {
  //   lowcodeEngine: '^1.1.0', // 插件需要配合 ^1.1.0 的引擎才可运行
  // },
}

export default LowcodePluginLocoPluginRelease;
