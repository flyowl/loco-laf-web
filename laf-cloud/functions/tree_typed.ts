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
  console.debug('Log[tree-typed] body->', ctx.body, " userId->", userId)

  if (!userId) {
    return Response.failed('非法请求', 401)
  }

  if (type !== 'admin') {
    return Response.failed('非法请求', 401)
  }

  const { page = 1, pageSize = 10, created_at } = ctx.body

  let query = {}
  if (created_at && created_at.length > 0) {
    const start = new Date(created_at[0])
    const end = new Date(created_at[1])
    console.log(start, end)
    query = {
      createTime: cmd.gte(start).and(cmd.lt(end))
    }
  }

  const res = await DB
    .collection(DB_NAME.SYS_TYPED)
    .where(query)
    .orderBy("createTime", "desc")
    .get()

  const { total } = await DB.collection(DB_NAME.SYS_TYPED)
    .where(query)
    .count()

  console.debug('查询结果: ', res.data)

  // Convert to tree data
  const rawData = res.data.map(item => ({ ...item, p_id: String(item.p_id) }));
  const treeData = findChildren(rawData, "-1");

  const r = {
    tree: treeData,
    success: res.ok,
    total,
    current: page,
    pageSize: total < pageSize ? total : pageSize
  }

  console.debug('Log[tree-typed] result->', r)

  return Response.ok(r, 'Success');
}
