import cloud from '@lafjs/cloud';

import { Response } from '@/global-response'
import { userDetails } from '@/user-details'

const DB = cloud.database();
const cmd = DB.command

const DB_NAME = {
  SYS_TYPED: 'sys_typed',
}

function findChildren(data, parentId) {
  return data
    .filter(item => item.p_id === parentId)
    .map(item => ({
      ...item,
      children: findChildren(data, item._id)
    }));
}

export async function main(ctx: FunctionContext) {
  const { userId, type } = userDetails(ctx)
  console.debug('Log[list-typed] body->', ctx.body, " userId->", userId)

  if (!userId) {
    return Response.failed('非法请求', 401)
  }

  if (type !== 'admin') {
    return Response.failed('非法请求', 401)
  }

  const { name } = ctx.body

  const res = await DB
    .collection(DB_NAME.SYS_TYPED)
    .orderBy("createTime", "desc")
    .get()

  console.debug('查询结果: ', res.data)

  // Convert to tree data
  const rawData = res.data.map(item => ({ ...item, p_id: String(item.p_id) }));
  const rootNode = rawData.find(item => item.name === name)
  if (!rootNode) {
    return {
      code: 2000,
      msg: '未找到节点',
      data: { tree: [], success: true }
    }
  }

  const treeData = [{
    ...rootNode,
    children: findChildren(rawData, rootNode._id)
  }];

  console.debug('Log[list-typed] result->', treeData)

  return Response.ok({ tree: treeData }, 'Success');
}
