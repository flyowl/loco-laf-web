import cloud from '@lafjs/cloud'
import { Response,authInit } from '@/public'
import { Database } from '@/handleDatabase'
import { sys_role } from '@/model'
const db = new Database("sys_role")

export default async function (ctx: FunctionContext) {
  const userId = ctx.user.userId
  if (ctx.method == "GET") {


    const { page = 1, pageSize = 999, ...query } = ctx.query
    const res = await db.list(parseInt(page), parseInt(pageSize), query,{})
    return Response.ok(res)
    return Response.ok([])
  } else if (ctx.method == "POST") {
    if (ctx.body.roleCode) {

      const data = await db.get({ "roleCode": ctx.body.roleCode },{})
      if (data.length > 0) {
        return Response.failed("重复的唯一代码")
      }
    }
    // const { menuList } = ctx.body


    const [id, error] = await db.post(sys_role, ctx.body, userId)
    if (id) {
      // RoleManager(id, menuList)
      await authInit()
      return Response.ok(id)
    }
    return Response.failed(String(error))
  } else if (ctx.method == "PUT") {
    const { _id, ...data } = ctx.body

    // RoleManager(_id, menuList)

    const [status, error] = await db.put(_id, sys_role, data, userId)
    if (status) {
      await authInit()

      return Response.ok(status)
    }
    return Response.failed(String(error))
  } else if (ctx.method == "DELETE") {
    const { _id } = ctx.query
    const res = await db.del(_id)
    if (res) {
      await authInit()

      return Response.ok(res)
    }
    return Response.failed("失败")
  }
  return Response.failed("无效的数据")
}
