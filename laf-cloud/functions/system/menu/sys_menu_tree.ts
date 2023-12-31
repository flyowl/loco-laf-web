import cloud from '@lafjs/cloud';

import { Response } from '@/utils/global-response'

const DB = cloud.database();
const cmd = DB.command

const DB_NAME = "sys_menu"

// 平级转树结构
/* treeArr 基础数据
 * id 唯一id
 * 更改的唯一id
 * parentId 父级id
 * 更换的父级id
 * childrenList 子级数组名*/
export const delTreeData = (treeArr: any, id: any, parentId: any, childrenList: any) => {
  // 数据克隆
  let cloneData = JSON.parse(JSON.stringify(treeArr));
  return cloneData.filter((fatherItem: any) => {
    let warpArr = cloneData.filter((sonItem: any) => fatherItem[id] == sonItem[parentId]);
    warpArr.length ? (fatherItem[childrenList] = warpArr) : (fatherItem[childrenList] = []);
    return !fatherItem[parentId];
  });
};

interface DataNode {
  _id: string; // 唯一标识
  name: string; // 显示文本
  p_id: string | number; // 父节点 id
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

const {all = false} = ctx.query

if (all){
  const { data: data } = await DB
    .collection(DB_NAME).field({ _id: 1, name: 1, parentId: 1 })
    .get()
  console.log(data)

  // const data2 = delTreeData(data, "_id", "p_id", "childrenList")
  const treeData = buildTree(data, '-1');
  return Response.ok(treeData);

}
  
  
  
  const { data: data } = await DB
    .collection(DB_NAME).where({ menuType: cmd.neq("2") }).field({ _id: 1, name: 1, parentId: 1 })
    .get()
  console.log(data)

  // const data2 = delTreeData(data, "_id", "p_id", "childrenList")
  const treeData = buildTree(data, '-1');
  return Response.ok(treeData);





}
