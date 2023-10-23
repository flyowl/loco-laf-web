import * as React from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button, Dialog, Tab, Grid,Pagination,Message } from '@alifd/next';
import { config } from '@alilc/lowcode-engine';
import './index.scss';


const { Row, Col } = Grid;
// Message.config({
//   duration: 3000
// });
// 获取相关接口配置
function checkBlockAPI() {
  const apiList = config.get('templateApi') || {};
  const { block: blockAPI } = apiList;

  if (!blockAPI?.tempListSchema) {
    Message.error("[面板] 模板列表没有配置");
  }
  if (!blockAPI?.tempDetailSchema) {
    Message.error("[面板] 模板详细没有配置.");
  }
  if (!blockAPI?.tempPubileSchema) {
    Message.error("[面板] 公共模板没有配置.");
  }
  return blockAPI;
}


const { useState, useEffect } = React;

const TempDialog = () => {
  const { tempListSchema, tempDetailSchema,tempPubileSchema } = checkBlockAPI() || { 
    tempListSchema: {}, 
    tempDetailSchema: {}, 
    tempPubileSchema: {}
  };

  const [display, setdisplay] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [typed, setTyped] = useState(0);

  const [tabdata, setTabdata] = useState([]);
  const [schemadata, setSchemaData] = useState([]);


  const onOpen = () => {
    Promise.all(
      [getTemplateDict(),getSchemaData({limit:8,page:1})]
    )
  .then(responses => {
    // 处理每个接口的响应结果
    setdisplay(true);


  })
  .catch(error => {
    console.error(error);
  });

  };

  const onClose = () => {
    setdisplay(false);
  };
  const getTemplateDict = async () => {
    const data =  await tempPubileSchema();
    setTabdata(data)
  };






  const handleOnclick = (value: any) => {
    setPage(1)
    setTyped(value)
    if (value == 0){
      getSchemaData({limit:8,page:1})
      return
    }
    getSchemaData({limit:8,page:1,typed:value})
  };



  const RenderTab = (data: any) => {
    return data.map((item: any) => {
      return <Tab.Item title={item.label} key={item.value}></Tab.Item>;
    });
  };

  const RenderdeTail= (id:any)=>{
    tempDetailSchema(id)
    onClose()
  }

  const RenderSchema = (data: any) => {
    return data.map((item: any) => {
      return (
        <Col className="block-card-col" span="6" onClick={(e)=>{RenderdeTail(item.id)}}>
        <img src={item?.screenshot || '/img/temp.jpg'}></img>
        <p>{item?.name}</p>
        <span>{item?.description}</span>
      </Col>
      )
    });
  };

  const pageChange = (value:any)=>{
    setPage(value)
    if (typed == 0){
      getSchemaData({limit:8,page:value})
      return
    }
    getSchemaData({limit:8,page:value,typed:typed})
  }

  const getSchemaData = async (query:any) => {
    // const query = {limit:8,page:page,typed:typed}
    
    const data =  await tempListSchema(query);

    setTotal(data.total)
    setSchemaData(data.data)
    setPage(data.page)
    
  };



  return (
    <div>
      <Button style={{ backgroundColor: '#DAEB89' }} onClick={onOpen}>
        模板
      </Button>
      {display && (
        <Dialog
        cache={true}
          v2
          title="页面模板"
          visible={display}
          width={1024}
          // onOk={this.onClose}
          onClose={onClose}
        >
          <Tab onClick={handleOnclick} shape={'text'} style={{ textAlign: 'center' }}>
            <Tab.Item title="所有" key="0"></Tab.Item>
            {tabdata.length ? RenderTab(tabdata) : null}
          </Tab>

          <div className="edit-block-card snippet">
            <Row gutter={10}  wrap={true}>
              {schemadata.length ? RenderSchema(schemadata) : null }
            </Row>
          </div>
          <Pagination className='edit-page' pageSize={8} total={total} defaultCurrent={page}  onChange={pageChange}/>
        </Dialog>
      )}
    </div>
  );
};



const LowcodePluginLocoPluginTemplate = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    // 插件的初始化函数，在引擎初始化之后会立刻调用
    init() {
      // 你可以拿到插件注册时的初始化参数
      // console.log(options.name);

      // 往引擎增加面板
      ctx.skeleton.add({
        area: 'topArea',
        name: 'LowcodePluginLocoPluginTemplatePane',
        type: 'Widget',
        props: {
          align: 'right',

        },
        content: <TempDialog/>,
      });

    },
  };
};

// 插件名，注册环境下唯一
LowcodePluginLocoPluginTemplate.pluginName = 'LowcodePluginLocoPluginTemplate';
LowcodePluginLocoPluginTemplate.meta = {
  // 依赖的插件（插件名数组）
  dependencies: [],
  // engines: {
  //   lowcodeEngine: '^1.1.0', // 插件需要配合 ^1.1.0 的引擎才可运行
  // },
}

export default LowcodePluginLocoPluginTemplate;
