
import cloud from '@lafjs/cloud';

import { Response } from '@/global-response'
import { userDetails } from '@/user-details'

const DB = cloud.database();
const cmd = DB.command

const DB_NAME = {
  SYS_BLOCK: 'sys_block',
}

export async function main(ctx: FunctionContext) {
  const userId = ctx.user.userId

  // if (!userId) {
  //   return Response.failed('非法请求', 401)
  // }


  const { page = 1, pageSize = 50, name, type_id } = ctx.query
  let query: Record<string, any> = {};
  if (name != undefined) {
    query['name'] = { $regex: name }
  }
  if (type_id != undefined) {
    query['type_id'] = type_id
  }
  console.log(query)
  const res = await DB
    .collection(DB_NAME.SYS_BLOCK)
    .where(query)
    .skip(page * (page - 1))
    .limit(pageSize)
    .orderBy("created_at", "desc")
    .get()


  return Response.ok(res.data);
}
