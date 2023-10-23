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
    const { _id } = ctx.query
    if (_id) {
      const db = await dbs.get({ _id: _id }, { password: 0 })
      if (!db) {
        return Response.failed("空数据")
      }
      return Response.ok(db)
    } else {
      const db = await dbs.get({ _id: userId }, { password: 0, postList: 0, roleList: 0 })
      if (!db) {
        return Response.failed("空数据")
      }
      return Response.ok(db)
    }
  } else {
    const { oldPassword, newPassword, newPassword2 } = ctx.body
    if (newPassword.length < 8) {
      return Response.failed('密码小于8个字符串')
    }
    if (newPassword != newPassword2) {
      return Response.failed('二次密码不正确')
    }


    if (! await passwordCheck(userId, oldPassword)) {
      return Response.failed('原密码不正常')

    }


    const passwordStr = PasswordTool.encrypt('sha256', newPassword)
    const [status, error] = await db.put(userId, sys_user, { password: passwordStr }, userId)
    console.log(status, error)
    if (status) {
      return Response.ok(status)
    }
  }
  return Response.ok([])
}

async function passwordCheck(UserId: string, password: string) {
  const { data: user } = await db.collection('sys_user').doc(UserId).get()
  if (PasswordTool.check(password, user.password)) {
    return true
  }
  return false
}


