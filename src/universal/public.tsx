import {  material } from '@alilc/lowcode-engine';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { config, plugins,ILowCodePluginContext } from '@alilc/lowcode-engine';

import { injectAssets } from '@alilc/lowcode-plugin-inject';


  const  loadIncrementalAssets = async (data:any) => {
    await  material.setAssets(await injectAssets(data.assets));
    config.set('editInitData', {
      data:data,
    });
    // await material.setAssets(await injectAssets(data.assets));

    // editorInit.pluginName = 'editorInit';
    // await plugins.register(editorInit);
  };



  const editorInit = (ctx: ILowCodePluginContext) => {
    return {
      name: 'editor-init',
      async init() {
        // const defaultCurrentPage = config.get('currentPage') || 1;
        const { material, project } = ctx;

        const data =  config.get('editInitData')
        console.log("EditorInitPlugin",data)
        await material.setAssets(await injectAssets(data.assets));
  
        // 加载 schema
        project.openDocument(data.componentsTree[0]);

        project.importSchema(data.schema);
        
     
      },
    };
  };

  const EditorInitPlugin =  (ctx: IPublicModelPluginContext, options: any) => {
    return {
      async init() {
        const { material, project, config } = ctx;
        const scenarioName = options['scenarioName'];
        const scenarioDisplayName = options['displayName'] || scenarioName;
        const scenarioInfo = options['info'] || {};
        // 保存在 config 中用于引擎范围其他插件使用
        config.set('scenarioName', scenarioName);
        config.set('scenarioDisplayName', scenarioDisplayName);
        config.set('scenarioInfo', scenarioInfo);
       const data =  config.get('editInitData')
      console.log("EditorInitPlugin",data)
        // 设置物料描述
  
        await material.setAssets(await injectAssets(data.assets));
  
        // 加载 schema
        project.openDocument(data.componentsTree[0]);

        project.importSchema(data.schema);
      },
    };
  }


  export {loadIncrementalAssets,EditorInitPlugin}