import { Button, MenuButton } from '@alifd/next';
import { ILowCodePluginContext, material, plugins, project,config } from '@alilc/lowcode-engine';
import AliLowCodeEngineExt from '@alilc/lowcode-engine-ext';
import CodeEditor from '@alilc/lowcode-plugin-code-editor';
import CodeGenPlugin from '@alilc/lowcode-plugin-code-generator';
import ComponentsPane from '@alilc/lowcode-plugin-components-pane';
import Inject from '@alilc/lowcode-plugin-inject';
import SchemaPlugin from '@alilc/lowcode-plugin-schema';
import UndoRedoPlugin from '@alilc/lowcode-plugin-undo-redo';
import React from 'react';
import { getAssetForApp, saveSchema } from 'src/apis/assets';
import { registerRefProp } from 'src/setters/set-ref-prop';
import {getQueryString} from 'src/utils/index'
import { getPageSchema, preview } from './utils';

import {  low_schemaDetail,low_assetDetail,low_schema_history_save } from 'src/apis/lafapi';

// 公开npm
// import LocoPluginDocuments from 'loco-plugin-documents';
// import LowcodePluginLocoPluginAi from 'lowcode-plugin-loco-plugin-ai';
// import LowcodePluginLocoPluginRelease from 'lowcode-plugin-loco-plugin-release';
// import LowcodePluginLocoPluginHistory from 'lowcode-plugin-loco-plugin-history';
// import LowcodePluginLocoPluginBlock from 'lowcode-plugin-loco-plugin-block';
// import LowcodePluginLocoPluginPages from 'lowcode-plugin-loco-plugin-pages';
// import LowcodePluginLocoPluginTemplate from 'lowcode-plugin-loco-plugin-template';

import LocoPluginDocuments from 'src/plugins/plugin-public/loco-plugin-documents/src/index';
import LowcodePluginLocoPluginAi from 'src/plugins/plugin-public/loco-plugin-ai/src/index';
import LowcodePluginLocoPluginRelease from 'src/plugins/plugin-public/loco-plugin-release/src/index';
import LowcodePluginLocoPluginHistory from 'src/plugins/plugin-public/loco-plugin-history/src/index';
import LowcodePluginLocoPluginBlock from 'src/plugins/plugin-public/loco-plugin-block/src/index';
import LowcodePluginLocoPluginPages from 'src/plugins/plugin-public/loco-plugin-pages/src/index';
import LowcodePluginLocoPluginTemplate from 'src/plugins/plugin-public/loco-plugin-template/src/index';


// 调试代码使用
import { default as saveAsBlock } from 'src/plugins/action-block';
import simulatorPaneRef from 'src/plugins/plugin-simulator-size/index';
import Logo from 'src/plugins/sample-plugins/logo';
import DataSourcePanePlugin from 'src/plugins/plugin-datasource-pane';


const { Item } = MenuButton;


export default async function registerPlugins() {
  const app_id = getQueryString('app')
  await plugins.register(Inject);
  // 注册保存为区块工作条
  material.addBuiltinComponentAction(saveAsBlock);
  await plugins.register(registerRefProp);

  // 页面管理
  await plugins.register(LowcodePluginLocoPluginPages);

  // 区块管理
  await plugins.register(LowcodePluginLocoPluginBlock);

  // plugin API 见 https://yuque.antfin.com/ali-lowcode/docs/cdukce
  // schema编辑器
  SchemaPlugin.pluginName = 'SchemaPlugin';
  await plugins.register(SchemaPlugin);

  // 切换画布大小
  simulatorPaneRef.pluginName = 'simulatorPaneRef';
  plugins.register(simulatorPaneRef);

  const editorInit = (ctx: ILowCodePluginContext) => {
    return {
      name: 'editor-init',
      async init() {
        // const defaultCurrentPage = config.get('currentPage') || 1;
        const { material, project } = ctx;1

        const assets = await low_assetDetail();
        
        material.setAssets(JSON.parse(assets.data));


        //获取默认的数据
        // const schema = await getPageSchema(1);
        const schema = await low_schemaDetail({});


        // 加载 schema
        project.openDocument(schema);
      },
    };
  };
  editorInit.pluginName = 'editorInit';
  await plugins.register(editorInit);

  const builtinPluginRegistry = (ctx: ILowCodePluginContext) => {
    return {
      name: 'builtin-plugin-registry',
      async init() {
        const { skeleton } = ctx;
        // 注册 logo 面板
        skeleton.add({
          area: 'topArea',
          type: 'Widget',
          name: 'logo',
          content: Logo,
          contentProps: {
            logo: '/img/logo.jpeg',
            href: '/',
          },
          props: {
            align: 'left',
          },
        });

        // 注册组件面板
        const componentsPane = skeleton.add({
          area: 'leftArea',
          type: 'PanelDock',
          name: 'componentsPane',
          content: ComponentsPane,
          contentProps: {},
          props: {
            align: 'top',
            icon: 'zujianku',
            description: '组件库',
          },
        });
        componentsPane?.disable?.();
        project.onSimulatorRendererReady(() => {
          componentsPane?.enable?.();
        });
        // // 注册页面管理
        // skeleton.add({
        //   index: -1,
        //   area: 'leftArea',
        //   type: 'PanelDock',
        //   name: 'pagesPane',
        //   content: PagesPane,
        //   contentProps: {},
        //   props: {
        //     align: 'top',
        //     icon: 'kaiwenjianjia',
        //     description: '页面管理',
        //   },
        // });
      },
    };
  };
  builtinPluginRegistry.pluginName = 'builtinPluginRegistry';
  await plugins.register(builtinPluginRegistry);

  // 设置内置 setter 和事件绑定、插件绑定面板
  const setterRegistry = (ctx: ILowCodePluginContext) => {
    const { setterMap, pluginMap } = AliLowCodeEngineExt;
    return {
      name: 'ext-setters-registry',
      async init() {
        const { setters, skeleton } = ctx;
        // 注册setterMap
        setters.registerSetter(setterMap);
        // 注册插件
        // 注册事件绑定面板
        skeleton.add({
          area: 'centerArea',
          type: 'Widget',
          content: pluginMap.EventBindDialog,
          name: 'eventBindDialog',
          props: {},
        });

        // 注册变量绑定面板
        skeleton.add({
          area: 'centerArea',
          type: 'Widget',
          content: pluginMap.VariableBindDialog,
          name: 'variableBindDialog',
          props: {},
        });
      },
    };
  };
  setterRegistry.pluginName = 'setterRegistry';
  await plugins.register(setterRegistry);

  // 注册回退/前进
  await plugins.register(UndoRedoPlugin);

  // 注册ai变成
  // await plugins.register(LowcodePluginLocoPluginAi);

  // 注册文档
  // await plugins.register(LocoPluginDocuments);

  // 历史功能
  await plugins.register(LowcodePluginLocoPluginHistory);

  // 模板功能
  await plugins.register(LowcodePluginLocoPluginTemplate);
  // 注册保存面板
  const saveSample = (ctx: ILowCodePluginContext) => {
    return {
      name: 'saveSample',
      async init() {
        const { skeleton, hotkey } = ctx;

        skeleton.add({
          name: 'saveSample',
          area: 'topArea',
          type: 'Widget',
          props: {
            align: 'right',
          },
          content: <Button onClick={low_schema_history_save}>保存</Button>,
        });
      },
    };
  };
  saveSample.pluginName = 'saveSample';
  await plugins.register(saveSample);

  // 数据源注册
  DataSourcePanePlugin.pluginName = 'DataSourcePane';
  await plugins.register(DataSourcePanePlugin);

  // 编辑器注册
  CodeEditor.pluginName = 'CodeEditor';
  await plugins.register(CodeEditor);

  // 注册出码插件
  // CodeGenPlugin.pluginName = 'CodeGenPlugin';
  // await plugins.register(CodeGenPlugin);

  // 预览功能
  const previewSample = (ctx: ILowCodePluginContext) => {
    return {
      name: 'previewSample',
      async init() {
        const { skeleton } = ctx;
        skeleton.add({
          name: 'previewSample',
          area: 'topArea',
          type: 'Widget',
          props: {
            align: 'right',
          },
          content: (
            <Button type="primary" onClick={preview} style={{ backgroundColor: '#815476' }}>
              预览
            </Button>
          ),
        });
      },
    };
  };
  previewSample.pluginName = 'previewSample';
  await plugins.register(previewSample);

  // 注册发布
  plugins.register(LowcodePluginLocoPluginRelease);
}
