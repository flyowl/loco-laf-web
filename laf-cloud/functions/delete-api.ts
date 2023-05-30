import cloud from "@lafjs/cloud";

import { Response } from '@/global-response'
import { userDetails } from '@/user-details'

const DB = cloud.database()
const DB_NAME = {
  SYS_API: 'sys_api'
}

export async function main(ctx: FunctionContext) {
  const { userId, type } = userDetails(ctx)
  console.debug('Log[delete-api] body->', ctx.body, " userId->", userId)
  if (!userId) {
    return Response.failed('非法请求', 401)
  }

  if (type !== 'admin') {
    return Response.failed('非法请求', 401)
  }

  const { name } = ctx.body;
  if (!name) {
    return Response.failed('[参数不合法]接口名称不能为空', 401)
  }

  const api = await selectOneByApiName(name)
  if (!api) {
    return Response.failed('[信息不存在]接口信息不存在', 401)
  }

  const res = await DB
    .collection(DB_NAME.SYS_API)
    .where({ name: name })
    .remove({ multi: true })
  return Response.ok(res.deleted)
}

async function selectOneByApiName(apiName: string) {
  const { data: user } = await DB.collection(DB_NAME.SYS_API)
    .where({ name: apiName, deleted: false })
    .getOne()
  return user
}
