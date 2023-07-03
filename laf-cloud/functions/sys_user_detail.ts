import { Response } from '@/public'
import { Database } from '@/handleDatabase'

const dbs = new Database("sys_user")




export default async function (ctx: FunctionContext) {
  const userId = ctx.user.userId

  const { _id } = ctx.query
  if (_id) {

    const db = await dbs.get({ _id: _id }, { password: 0 })
    if (db.length == 0){
      return Response.failed("空数据")

    }
    return Response.ok(db[0])
  } else {
    const db = await dbs.get({ _id: userId }, { password: 0, postList: 0, roleList:0 })
    if (db.length == 0) {
      return Response.failed("空数据")
    }
    return Response.ok(db[0])
  }

  return Response.ok([])
}