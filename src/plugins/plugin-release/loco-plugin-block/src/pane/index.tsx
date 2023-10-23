import { Box, Grid, Loading, Search, TreeSelect,Message } from '@alifd/next';
import { common, config, event, project } from '@alilc/lowcode-engine';
import * as React from 'react';
import { default as BlockCard } from '../card';
import { default as store } from '../store';
import './index.scss';

const { Row, Col } = Grid;

const { useState, useEffect } = React;

const DEFAULT_SCREENSHOT = 'http://cdn.itq168.com/img/20221017151506.png?imageslim';

function checkBlockAPI() {
  const apiList = config.get('apiList') || {};
  const { block: blockAPI } = apiList;

  if (!blockAPI?.low_block_search) {
    Message.error("[区块] 没有配置");
  }
  if (!blockAPI?.low_typed_tree) {
    Message.error("[区块] 没有配置");
  }
  return blockAPI;
}

export interface Block {}

export interface BlockResponse {
  code: number;
  data: Block[];
}

export interface BlockPaneAPI {
  low_block_search: () => BlockResponse;
}

export interface BlockPaneProps {
  api: BlockPaneAPI;
}

export const BlockPane = (props: BlockPaneProps) => {
  const { low_block_search, low_typed_tree } = checkBlockAPI()||{
    low_block_search:{},
    low_typed_tree:{}
  };
  const [blocks, setBlocks] = useState();
  const [blockTypeId, settyped] = React.useState();
  const [search, setsearch] = React.useState();

  const [treeblock, setBlock] = React.useState([]);

  const blocktreedata = async () => {
    let data = (await low_typed_tree()) || [];
    setBlock(data);
  };
  const fetchBlocks = async (typed?: any) => {
    const res = await low_block_search({
      type_id: typed || blockTypeId,
      name: search || null,
    });
    store.init(res);
    setBlocks(res);
  };

  useEffect(() => {
    blocktreedata();
    event.on('common:BlockChanged', () => {
      fetchBlocks();
    });
    fetchBlocks();
  }, []);

  const registerAdditive = (shell: HTMLDivElement | null) => {
    if (!shell || shell.dataset.registered) {
      return;
    }

    function getSnippetId(elem: any) {
      if (!elem) {
        return null;
      }
      while (shell !== elem) {
        if (elem.classList.contains('snippet')) {
          return elem.dataset.id;
        }
        elem = elem.parentNode;
      }
      return null;
    }

    const _dragon = common.designerCabin.dragon;
    if (!_dragon) {
      return;
    }

    // eslint-disable-next-line
    const click = (e: Event) => {};

    shell.addEventListener('click', click);

    _dragon.from(shell, (e: Event) => {
      const doc = project.getCurrentDocument();
      const id = getSnippetId(e.target);

      if (!doc || !id) {
        return false;
      }

      // console.log('store.get(id): ', store.get(id));

      const dragTarget = {
        type: 'nodedata',
        data: store.get(id),
      };

      return dragTarget;
    });

    shell.dataset.registered = 'true';
  };

  if (!blocks) {
    return (
      <div className="block-pane-loading">
        <Loading />
      </div>
    );
  }

  function handleChange(value: any) {
    settyped(value);
    fetchBlocks(value);
  }
  function handlesearch(vaule: any) {
    fetchBlocks();
  }

  function handlesearchchange(vaule: any) {
    setsearch(vaule);
  }

  return (
    <div style={{ height: ' 100%' }}>
      <div className="grid-fixed-demo-title">
        <Row className="block-search">
          <Col span="12">
            <TreeSelect onChange={handleChange} style={{ width: '100%' }} dataSource={treeblock} />
          </Col>
          <Col span="12">
            <Search
              placeholder="搜索组件"
              shape="simple"
              onSearch={handlesearch}
              onChange={handlesearchchange}
              value={search}
              hasClear
            />
          </Col>
        </Row>
      </div>

      <div className="block-pane-master" ref={registerAdditive}>
        <Box direction="row" wrap>
          {blocks.map((item: any) => (
            <BlockCard
              id={item._id}
              title={item.name}
              screenshot={item.screenshot || DEFAULT_SCREENSHOT}
              description={item.description}
            />
          ))} 
        </Box>
      </div>
    </div>
  );
};

export default BlockPane;
