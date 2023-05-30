import { Button, Card, Icon, Message, Pagination, Table,MenuButton } from '@alifd/next';
import { TableProps } from '@alifd/next/lib/table';
import * as React from 'react';
import { listMenus } from 'src/apis/menu';
import styles from './index.module.css';
import { getColumnKey } from './util';
import { useFusionTable, useSetState } from 'ahooks';
import {delTreeData} from "src/utils/index";

const { useState } = React;
// @ts-ignore
const TableActionIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1899388_oxn3zhg34oj.js',
});

// const paginationProps = {
//   total: 55,
// };
const tableProps = [
  {
    id: 'first',
    rowNo: '中华人民共和国国内安全管理条例',
    rowContent: '',
    children: [
      {
        id: 1,
        rowNo: '第一条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 2,
        rowNo: '第二条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 3,
        rowNo: '第三条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 4,
        rowNo: '第四条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
  {
    id: 'second',
    rowNo: '中华人民共和国海商法',
    rowContent: '',
    children: [
      {
        id: 5,
        rowNo: '第一条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 6,
        rowNo: '第二条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 7,
        rowNo: '第三条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 8,
        rowNo: '第四条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
  {
    id: '14',
    rowNo: '纳税担保试行方法',
    rowContent: '水电费第三方',
    children: [
      {
        id: 9,
        rowNo: '第一条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 10,
        rowNo: '第二条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 11,
        rowNo: '第三条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 12,
        rowNo: '第四条',
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
  {
    id: 'fourth',
    rowNo: '中华人民共和国担保法',
    rowContent: '',
    children: [
      {
        id: 13,
        rowNo: '第一条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 14,
        rowNo: '第二条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 15,
        rowNo: '第三条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 16,
        rowNo: '第四条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
  {
    id: 'fifth',
    rowNo: '纳税担保试行方法',
    rowContent: '',
    children: [
      {
        id: 17,
        rowNo: '第一条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 18,
        rowNo: '第二条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 19,
        rowNo: '第三条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
      {
        id: 20,
        rowNo: '第四条',
        // eslint-disable-next-line
        rowContent:
          '法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容法律条文内容',
      },
    ],
  },
];


const defaultColumns = [
  {
    title: '序号',
    dataIndex: 'id',
  },
  {
    title: '菜单名称',
    dataIndex: 'name',
  },
  {
    title: 'icon',
    dataIndex: 'icon',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '是否目录',
    dataIndex: 'is_catalog',
  },
  {
    title: '外链接',
    dataIndex: 'is_link',
  },
  {
    title: '路由地址',
    dataIndex: 'web_path',
  },
  {
    title: '组件地址',
    dataIndex: 'component',
  },
  {
    title: '组件名称',
    dataIndex: 'component_name',
  },
  {
    title: '拥有权限',
    dataIndex: 'menuPermission',
  },

  {
    title: '缓存',
    dataIndex: 'cache',
  },

  {
    title: '侧边可见',
    dataIndex: 'visible',
  },

  {
    title: '状态',
    dataIndex: 'status',
  },
];

// 根据 hidden 切换当前 column 是否显示
const filterColumns = (columnList: any) => {
  const newColumnList = [...columnList];
  return newColumnList
    .filter((columnItem) => {
      if (columnItem.hidden) {
        return false;
      }
      return true;
    })
    .map((columnItem) => {
      if (columnItem.children) {
        const groupProps = { ...columnItem };
        delete groupProps.children;

        return (
          <Table.ColumnGroup key={getColumnKey(columnItem)} {...groupProps}>
            {filterColumns(columnItem.children)}
          </Table.ColumnGroup>
        );
      }

      return <Table.Column key={getColumnKey(columnItem)} {...columnItem} />;
    });
};



const AppList = () => {
  const [visible, setVisible] = useState(false);
  const [tabdata, settabdata] = useState([]);

  const fetchRemote = () => {
    Message.success('请求成功');
  };

  const {data} = useFusionTable(listMenus);
  if (data){
    let d = delTreeData(data,"id","parent","children")
  }

  // 切换紧凑模式
  const [sizeStatus, changeSize] = useState<TableProps['size']>('medium');
  const autoChangeSize = () => {
    if (sizeStatus === 'medium') {
      changeSize('small');
    } else {
      changeSize('medium');
    }
  };


  const tableOperation = (value: string, index: number, record: any) => {
    return (
      <div className={styles.buttonGroup}>
        <Button type="primary" text onClick={fetchRemote}>查看</Button>
        <Button type="primary" text onClick={() => setVisible(true)}>编辑</Button>
        <Button type="primary" text onClick={() => setVisible(true)}>删除</Button>

      </div>
    );
  };






  // 切换 zebra
  const [zebraStatus, changeZebra] = useState(false);

  // 获取表格数据
  // const { paginationProps, tableProps } = useFusionTable(getTableData, {});

  // 切换当前 columns
  const [columns, onColumnChange] = useState<any>(defaultColumns);

  return (
    <Card free className={styles.container} id="table-container">
      <Card.Content>
        <div className={styles.actionBar}>
          <div className={styles.buttonGroup}>
            <Button type="primary" onClick={() => Message.success('已批量处理xx条数据')}>
              新增数据
            </Button>
          </div>
          <div className={styles.rightButtonGroup}>
            <Button text onClick={autoChangeSize}>
              <TableActionIcon type="narrow" size="small" />
            </Button>
            <Button text onClick={() => changeZebra(!zebraStatus)}>
              <TableActionIcon type="zebra" size="small" />
            </Button>
          </div>
        </div>
        <Table
          dataSource={tableProps}
          size={sizeStatus}
          isTree
          isZebra={zebraStatus}
          primaryKey="id"
        >
          {filterColumns(columns)}
          <Table.Column title="操作" dataIndex="operation" width={180} cell={tableOperation} />
        </Table>
      </Card.Content>
    </Card>
  );
};

export default AppList;
