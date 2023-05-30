
import cloud from '@lafjs/cloud';

import { Response } from '@/global-response'
import { userDetails } from '@/user-details'

const DB = cloud.database();
const cmd = DB.command

const DB_NAME = {
  SYS_API: 'sys_api'
}

export async function main(ctx: FunctionContext) {
  console.debug('Log[list-api] body->', ctx.body)
  const { userId, type } = userDetails(ctx)

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
      created_at: cmd.gte(start).and(cmd.lt(end))
    }
  }

  const res = await DB
    .collection(DB_NAME.SYS_API)
    .where(query)
    .skip(page * (page - 1))
    .limit(pageSize)
    .orderBy("created_at", "desc")
    .get()

  const { total } = await DB.collection(DB_NAME.SYS_API)
    .where(query)
    .count()

  console.debug('分页查询结果: ', res.data)

  const r = {
    list: res.data,
    success: res.ok,
    total,
    current: page,
    pageSize: total < pageSize ? total : pageSize
  }

  console.debug('Log[fetchList] result->', r)

  return r
}
