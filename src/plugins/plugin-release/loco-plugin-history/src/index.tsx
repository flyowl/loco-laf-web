import * as React from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button, Drawer, Divider,Icon,Message } from '@alifd/next';
import { config,project } from '@alilc/lowcode-engine';


const { useState } = React;

// 获取相关接口配置
function checkBlockAPI() {
  const apiList = config.get('historyApi') || {};
  const { block: blockAPI } = apiList;
  
  if (!blockAPI?.low_schema_history_list) {
    Message.error("[面板] 历史-没有配置");
  }
  if (!blockAPI?.low_schema_history_detail_id) {
    Message.error("[面板] 历史单个数据没有配置");
  }

  if (!blockAPI?.low_schema_history_delete) {
    Message.error("[面板] 删除历史没有配置");
  }
  return blockAPI;
}


const HistoryDialog = () => {
  const { low_schema_history_list, low_schema_history_detail_id,low_schema_history_delete } = checkBlockAPI()||{
    low_schema_history_list:{},
    low_schema_history_detail_id:{},
    low_schema_history_delete:{},
  };

  const [display, setdisplay] = useState(false);

  const [schemadata, setSchemadata] = useState([]);

  // async function getschemaid(data: any) {
  //   const schema = await OneMenus(data.menuid);
  //   setSchemaid(schema.schema);
  // }

  async function getschema(data: any) {
    const schema = await low_schema_history_list();
    setSchemadata(schema.data);
    setdisplay(true);
  }

  const onOpen = () => {
    const data = config.get('editordata');
    getschema(data);
  };

  const onClose = () => {
    setdisplay(false);
  };

  async   function schemaImport(schemid: string) {
    const schema = await low_schema_history_detail_id(schemid);
    const data = JSON.parse(schema.schema)
    project.removeDocument(project.currentDocument as any);
    project.openDocument(data.componentsTree[0]);
  };

   async function delReload (id:string){

    const res = await low_schema_history_delete(id)
    
    if (res.code ==2000){
      
      let schema = schemadata.filter(function(item) {
        return item._id !==id;
      });
      
  
      setSchemadata(schema)
      
      Message.show({
        type: "success",
        content:
          "删除成功",
      });
    }else{
      Message.show({
        type: "error",
        content:
          "删除失败",
      });
    }

  }
  const renderData = (data: any) => {
    return data.map((item: any) => {

      if (item.status == 1){
        return (
          <div>
             <span style={{marginRight:'3px'}}><Icon type="error"  size={'xs'} onClick={(e) => delReload(item._id)}/></span >

            <span>{item.createTime} </span>
            <a onClick={(e) => schemaImport(item._id)} style={{ float: 'right' ,color:'red'}}>
              生产导入
            </a>
            <Divider />
          </div>
        );
      }

        return (
          <div>
             <span style={{marginRight:'3px'}}><Icon type="error"  size={'xs'} onClick={(e) => delReload(item._id)}/></span >

            <span>{item.createTime} </span>
            <a onClick={(e) => schemaImport(item._id)} style={{ float: 'right' }}>
              导入
            </a>
            <Divider />
          </div>
        );
      
    });
  };

  return (
    <div>
      <Button type="primary" onClick={onOpen} style={{ color: 'write' }}>
        {' '}
        历史{' '}
      </Button>
      {display && (
        <Drawer
          title="历史记录 "
          placement="right"
          width={'300px'}
          closeMode={['close', 'mask', 'esc']}
          visible={display}
          onClose={onClose}
        >
          <div>{schemadata.length ? renderData(schemadata) : null}</div>
        </Drawer>
      )}
    </div>
  );
};



const LowcodePluginLocoPluginHistory = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    // 插件的初始化函数，在引擎初始化之后会立刻调用
    init() {
      // 你可以拿到插件注册时的初始化参数
      // console.log(options.name);

      // 往引擎增加面板
      ctx.skeleton.add({
        name: 'LowcodePluginLocoPluginHistoryPane',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: <HistoryDialog />,
      });
    },
  };
};

// 插件名，注册环境下唯一
LowcodePluginLocoPluginHistory.pluginName = 'LowcodePluginLocoPluginHistory';
LowcodePluginLocoPluginHistory.meta = {
  // 依赖的插件（插件名数组）
  dependencies: [],
  // engines: {
  //   lowcodeEngine: '^1.1.0', // 插件需要配合 ^1.1.0 的引擎才可运行
  // },
}

export default LowcodePluginLocoPluginHistory;
