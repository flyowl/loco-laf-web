import * as React from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { material,plugins } from '@alilc/lowcode-engine';
import { injectAssets } from '@alilc/lowcode-plugin-inject';

import { Nav, Select, Loading,Message } from '@alifd/next';
import { project, config,init } from '@alilc/lowcode-engine';

const { useEffect, useState } = React;
const { Item, SubNav } = Nav;
const formItemLayout = {
  labelCol: {
    fixedSpan: 8,
  },
  wrapperCol: {
    span: 14,
  },
};


// 获取相关接口配置
function checkBlockAPI() {
  const apiList = config.get('pageApi') || {};
  const { block: blockAPI } = apiList;
  if (!blockAPI?.low_schema_history_detail) {
    Message.error("[面板] 菜单列表没有配置");

  }
  if (!blockAPI?.sys_menuList_edit) {
    Message.error("[面板] 菜单列表没有配置");

  }

  return blockAPI;
}


const  PagesPlugin = () => {
  const {  low_schema_history_detail,sys_menuList_edit } = checkBlockAPI();

  const [files, setFiles] = useState(null);
  const [Visable, setVisable] = useState(false);

  async function getFiles() {
    const files = await sys_menuList_edit();
    console.log("files",files)
    setFiles(files);

 
   
  }

  useEffect(() => {
    getFiles();
  }, []);

  const defaultCurrentPage = config.get('currentPage') || 'home';
  const onSelect = async (keys: Number[]) => {
    setVisable(true)
    const id = keys[0];
    const schema = await low_schema_history_detail(id);
    await material.setAssets({
      "packages": [],
      "components": [],
      "sort": {
          "groupList": [
              "精选组件",
              "原子组件"
          ],
          "categoryList": [
              "基础元素",
              "布局容器类",
              "表格类",
              "表单详情类",
              "帮助类",
              "对话框类",
              "业务类",
              "通用",
              "引导",
              "信息输入",
              "信息展示",
              "信息反馈"
          ]
      },
      "groupList": [
          "精选组件",
          "原子组件"
      ],
      "ignoreComponents": {}
  })
    await material.loadIncrementalAssets(schema.assets)
    // project.simulator.rerender()
    // project.simulatorHost.rerender()


    await project.removeDocument(project.currentDocument as any);
    // project.openDocument(data.componentsTree[0]);
    const data = JSON.parse(schema.schema)

    await project.createDocument(data.componentsTree[0]);

    config.set('currentPage', id);
    config.set('editordata', {
      type: 'menu',
      menuid: id,
      schemaid: schema._id,
    });
    // console.log(d)

    setVisable(false)

  };


  if (files ==null  ) {
    return (
      <div className="block-pane-loading">
        <Loading />
      </div>
    );
  }
  // const filedata = delTreeData(files, 'id', 'parent', 'children');

  const renderMenuData = (data: any) => {
    
    if (data ==undefined){
      return
    }
    return data.map((item: any) => {
      if (item.parentId =="-1") {
        if (item.menuType  == 0){
          return (
            <SubNav key={item._id} label={item.name} icon={item.icon}>
              {renderMenuData(item.children)}
            </SubNav>
          );
        }

      }

        return (
          <Item icon={item.icon} key={item._id}>
            {item.name}
          </Item>
        );
      
    });
  };



  return (
    <>
    <Loading
          visible={Visable}
          fullScreen
        />


      <Nav
        style={{ width: '100%' }}
        embeddable
        // defaultOpenAll
        defaultSelectedKeys={defaultCurrentPage}
        hasArrow={false}
        hasTooltip
        openMode="single"
        onSelect={onSelect}
      >
        {files.length ? renderMenuData(files) : null}
      </Nav>
    </>
  );
};


const LowcodePluginLocoPluginPages = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    // 插件的初始化函数，在引擎初始化之后会立刻调用
    init() {
      // 你可以拿到插件注册时的初始化参数
      // console.log(options.name);

      // 往引擎增加面板
      ctx.skeleton.add({
        area: 'leftArea',
        name: 'LowcodePluginLocoPluginPagesPane',
        type: 'PanelDock',
        props: {
          align: 'top',
          icon: 'kaiwenjianjia',
          description: '页面管理',
        },
        content: <PagesPlugin/>,
      });

    },
  };
};

// 插件名，注册环境下唯一
LowcodePluginLocoPluginPages.pluginName = 'LowcodePluginLocoPluginPages';
LowcodePluginLocoPluginPages.meta = {
  // 依赖的插件（插件名数组）
  dependencies: [],
  // engines: {
  //   lowcodeEngine: '^1.1.0', // 插件需要配合 ^1.1.0 的引擎才可运行
  // },
}

export default LowcodePluginLocoPluginPages;
