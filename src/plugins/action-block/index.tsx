import { Dialog, Form, Input, Notification, TreeSelect,Message } from '@alifd/next';
import { config, event, Node } from '@alilc/lowcode-engine';
import { default as html2canvas } from 'html2canvas';
import * as React from 'react';
import './index.scss';

export const openNotification = (type: any, content: string) => {
  Notification.open({
    title: '消息通知',
    content: content,
    type,
  });
};

const FormItem = Form.Item;

interface SaveAsBlockProps {
  node: Node;
}

function checkBlockAPI() {
  const apiList = config.get('apiList') || {};
  const { block: blockAPI } = apiList;

  if (!blockAPI?.low_block_create) {
    throw new Error('[面板] API没有配置');
  }
  if (!blockAPI?.low_typed_tree) {
    throw new Error('[面板] 获取数据没有配置.');
  }
  return blockAPI;
}

let dialog: any;

const SaveAsBlock = (props: SaveAsBlockProps) => {
  const { low_block_create, low_typed_tree } = checkBlockAPI();
  const { node } = props;
  const [src, setSrc] = React.useState();
  const [treeblock, setBlock] = React.useState([]);
  const [blockTypeId, setblockTypeId] = React.useState();

  const blocktreedata = async () => {
    let data = (await low_typed_tree()) || [];
    setBlock(data);
  };

  function handleChange(value) {
    setblockTypeId(value);
  }

  React.useEffect(() => {
    blocktreedata();
    const generateImage = async () => {
      let dom2 = node.getDOMNode();
      const canvas = await html2canvas?.(dom2, { scale: 0.5 });
      const dataUrl = canvas.toDataURL();
      setSrc(dataUrl);
    };

    generateImage();
  }, []);

  const save = async (values) => {
    const { type, name, description } = values;
    const { schema } = node;

    await low_block_create({
      typed_id:blockTypeId,
      description,
      name,
      schema: JSON.stringify(schema),
      screenshot: src,
    });
    dialog?.hide();
    openNotification('success', '创建成功');
    event.emit('BlockChanged');
  };
  const handleCopy = (e: ClipboardEvent) => {
    const { schema } = node;
    

    // clipboardData 可能是 null
    e.clipboardData && e.clipboardData.setData('text/plain',  JSON.stringify(schema) );
    e.preventDefault();
    // removeEventListener 要传入第二个参数
    document.removeEventListener('copy', handleCopy);
};

  const copy = () => {
    document.addEventListener('copy', handleCopy);
    document.execCommand('copy');
    Message.success("复制成功");

  }

  return (
    <div>
      <Form colon>
        <FormItem name="name" label="名称" required requiredMessage="请输入名称!">
          <Input />
        </FormItem>
        <FormItem name="description" label="说明" required requiredMessage="详细说明!">
          <Input.TextArea placeholder="详细说明" aria-label="description" />
        </FormItem>
        <FormItem name="typed" label="类型选择" requiredMessage="请选择!">
          <TreeSelect
            onChange={handleChange}
            hasClear={true}
            style={{ width: '100%' }}
            value={blockTypeId}
            dataSource={treeblock}
          />
        </FormItem>

        <FormItem name="screenshot" label="缩略图">
          <div className="block-screenshot">
            <img src={src} />
          </div>
          <Input value={src} style={{ display: 'none' }} />
        </FormItem>
        <FormItem label=" " colon={false}>
          <Form.Submit type="primary" validate onClick={save} style={{ marginRight: 8 }}>
            保存
          </Form.Submit>
          <Form.Reset>重置</Form.Reset>
          <Form.Submit type="primary"  className='edit-button' warning  onClick={copy} >
            复制
          </Form.Submit>
        </FormItem>
      </Form>
    </div>
  );
};

export default {
  name: 'add',
  content: {
    icon: {
      type: 'add',
      size: 'xs',
    },
    title: '新增',
    action(node: Node) {
      dialog = Dialog.show({
        v2: true,
        title: '保存为区块',
        content: <SaveAsBlock node={node} />,
        footer: false,
      });
    },
  },
  important: true,
};
