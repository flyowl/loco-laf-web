/**
 * 获取个人用户信息
 * 更新密码
 */


import { Response } from '@/utils/public'
import { Database } from '@/handleDatabase'
import { sys_user } from '@/model'
const dbs = new Database("sys_user")
import { PasswordTool } from '@/utils/util'
const db = new Database("sys_user")




export default async function (ctx: FunctionContext) {
  const userId = ctx.user.userId
  if (ctx.method == "GET") {

    const db = await dbs.get({ _id: userId }, { password: 0, postList: 0, roleList: 0 })
    if (!db) {
      return Response.failed("空数据")
    }
    return Response.ok(db)

  } else if(ctx.method == "PUT") {
    const { nickname, description } = ctx.body


    const [status, error] = await db.put(userId, sys_user, {
      nickname: nickname,
      description: description
    }, userId)
    if (status) {
      return Response.ok(status)
    }
    return Response.failed(String(error))





  }
}

async function passwordCheck(UserId: string, password: string) {
  const { data: user } = await db.collection('sys_user').doc(UserId).get()
  if (PasswordTool.check(password, user.password)) {
    return true
  }
  return false
}


