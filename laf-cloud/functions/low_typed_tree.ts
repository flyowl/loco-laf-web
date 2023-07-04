import cloud from '@lafjs/cloud';

import { Response } from '@/global-response'

const DB = cloud.database();
const cmd = DB.command

const DB_NAME = "sys_typed"

interface DataNode {
  _id: string; // 唯一标识
  name: string; // 显示文本
  parentId: string | number; // 父节点 id
}
interface TreeNode {
  value: string;
  label: string;
  children: TreeNode[];
}


function buildTree(
  data: DataNode[],
  parentId: string | number
): TreeNode[] {
  const children = data
    .filter((item) => item.parentId === parentId)
    .map((item) => ({
      value: item._id,
      label: item.name,
      children: buildTree(data, item._id),
    }));
  return children;
}



export async function main(ctx: FunctionContext) {
  const { data: data } = await DB
    .collection(DB_NAME).field({ _id: 1, name: 1, parentId: 1 })
    .get()
  console.log(data)
  const treeData = buildTree(data, '');
  return Response.ok(treeData);
}
