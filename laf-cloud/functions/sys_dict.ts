import cloud from '@lafjs/cloud'
import { Response } from '@/public'
import { Database } from '@/handleDatabase'
import { sys_dict } from '@/model'
const db = new Database("sys_dict")

export default async function (ctx: FunctionContext) {
  const userId = ctx.user.userId
  if (ctx.method == "GET") {
    const { page = 1, pageSize = 999, ...query } = ctx.query
    const res = await db.list(parseInt(page), parseInt(pageSize), query)
    return Response.ok(res)
  } else if (ctx.method == "POST") {
    const [id, error] = await db.post(sys_dict, ctx.body, userId)
    if (id) {
      return Response.ok(id)
    }
    return Response.failed(String(error))
  } else if (ctx.method == "PUT") {
    const { _id, ...data } = ctx.body
    const [status, error] = await db.put(_id, sys_dict, data, userId)
    if (status) {
      return Response.ok(status)
    }
    return Response.failed(String(error))
  } else if (ctx.method == "DELETE") {
    const { _id } = ctx.query
    const res = await db.del(_id)
    if (res) {
      return Response.ok(res)
    }
    return Response.failed("失败")
  }
  return Response.failed("无效的数据")
}