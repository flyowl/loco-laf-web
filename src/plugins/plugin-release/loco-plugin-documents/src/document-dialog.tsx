import * as React from 'react';
import { Button, Drawer } from '@alifd/next';
import { config } from '@alilc/lowcode-engine';


 class DocumentsDialog extends React.Component {
    state = {
        visible: false,
        bookUrl: 'https://lowcode.itq168.com/release/58/?bookid=2',
    };
 componentDidMount() {
    const apiList = config.get('documentApi') || {};
    const { url: blockAPI } = apiList;
    if (!blockAPI) {
        console.log('[面板] url地址没有配置')
    }
    // 获取传递的页面传递的参数，不要可删除
     this.setState({
        bookUrl:blockAPI || 'https://lowcode.itq168.com/release/58/?bookid=2'
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
    }


    

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.onOpen} > 文档 </Button>
                <Drawer
                    title="操作文档 "
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


export default DocumentsDialog;
