import * as React from 'react';
import { IPublicModelPluginContext } from '@alilc/lowcode-types';
import { Button, Drawer,Message } from '@alifd/next';
import { config } from '@alilc/lowcode-engine';



// 获取相关接口配置
function checkBlockAPI() {
    const apiList = config.get('aiApi') || {};
    const { url: blockAPI } = apiList;
    if (!blockAPI) {
      Message.error("[面板] url地址没有配置");

        return '/'
    }
    return blockAPI
  
  }
  
 class DocumentsDialog extends React.Component {

    state = {
        visible: false,
        bookUrl: '',
    };

 componentDidMount() {
    const apiList = config.get('aiApi') || {};
    const { url: blockAPI } = apiList;
    if (!blockAPI) {
      Message.error("[面板] url地址没有配置");

    }
    this.setState({
        bookUrl:blockAPI ||'/'
      })

  }
    onOpen = () => {
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };


    

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.onOpen}  style={{backgroundColor:'#c123de'}}> AI编程 </Button>
                <Drawer
                    title="AI编程"
                    placement="right"
                    width={'70%'}
                    cache={true}
                    closeMode={['close','mask','esc']}
                    visible={this.state.visible}
                    onClose={this.onClose}>
                    <iframe src={this.state.bookUrl} style={{height:'90vh',width:'100%'}}  frameborder={"0"}/>
                </Drawer>
            </div>
        );
    }
}




const LowcodePluginLocoPluginAi = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    // 插件的初始化函数，在引擎初始化之后会立刻调用
    init() {
      // 你可以拿到插件注册时的初始化参数
      // console.log(options.name);

      // 往引擎增加面板
      ctx.skeleton.add({
        area: 'topArea',
        name: 'LowcodePluginLocoPluginAiPane',
        type: 'Widget',
        props: {
          align: 'right',
        },
        content: <DocumentsDialog/>,
      });

    },
  };
};

// 插件名，注册环境下唯一
LowcodePluginLocoPluginAi.pluginName = 'LowcodePluginLocoPluginAi';
LowcodePluginLocoPluginAi.meta = {
  // 依赖的插件（插件名数组）
  dependencies: [],
  // engines: {
  //   lowcodeEngine: '^1.1.0', // 插件需要配合 ^1.1.0 的引擎才可运行
  // },
}

export default LowcodePluginLocoPluginAi;
