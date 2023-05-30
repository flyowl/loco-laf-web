import cloud from "@lafjs/cloud";

import { Response } from '@/global-response'
import { userDetails } from '@/user-details'

const DB = cloud.database()
const DB_NAME = {
  SYS_BLOCK: 'sys_block',
}

export async function main(ctx: FunctionContext) {
  const { userId, type } = userDetails(ctx)
  console.debug('Log[delete-block] body->', ctx.body, " userId->", userId)
  if (!userId) {
    return Response.failed('非法请求', 401)
  }

  if (type !== 'admin') {
    return Response.failed('非法请求', 401)
  }

  const { name } = ctx.body;
  if (!name) {
    return Response.failed('[参数不合法]block名称不能为空', 401)
  }

  const block = await selectOneByBlockName(name)
  if (!block) {
    return Response.ok(1) //Response.failed('[信息不存在]block信息不存在', 401)
  }

  const res = await DB
    .collection(DB_NAME.SYS_BLOCK)
    .where({ name: name })
    .remove({ multi: true })
  return Response.ok(res.deleted)
}

async function selectOneByBlockName(apiName: string) {
  const { data: user } = await DB.collection(DB_NAME.SYS_BLOCK)
    .where({ name: apiName, deleted: false })
    .getOne()
  return user
}
