import cloud from '@lafjs/cloud'
import { Response, buildTree } from '@/utils/public'
import { Database } from '@/handleDatabase'
import { sys_dept } from '@/model'
const db = new Database("sys_dept")

export default async function (ctx: FunctionContext) {
  const userId = ctx.user.userId
  if (ctx.method == "GET") {
    const { page = 1, pageSize = 999, ...query } = ctx.query
    const res = await db.list(parseInt(page), parseInt(pageSize), query)
    let data = buildTree(res.data, "0")
    res.data = data
    return Response.ok(res)
  } else if (ctx.method == "POST") {
    const [id, error] = await db.post(sys_dept, ctx.body, userId)
    if (id) {
      return Response.ok(id)
    }
    return Response.failed(String(error))
  } else if (ctx.method == "PUT") {
    const { _id, ...data } = ctx.body
    const [status, error] = await db.put(_id, sys_dept, data, userId)
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