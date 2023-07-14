import cloud from '@lafjs/cloud'
import { Response } from '@/public'
import { Database } from '@/handleDatabase'
import { sys_user } from '@/model'
const db = new Database("sys_user")
import { PasswordTool } from '@/util'
//管理员专用修改密码
export default async function (ctx: FunctionContext) {
  const userId = ctx.user.userId
  const { _id, newPassword, newPassword2 } = ctx.body
  console.log(_id, newPassword, newPassword)
  if (newPassword.length < 8) {
    return Response.failed('密码小于8个字符串')
  }
  if (newPassword != newPassword2) {
    return Response.failed('二次密码不正确')
  }

  const passwordStr = PasswordTool.encrypt('sha256', newPassword)
  console.log(passwordStr)
  if (_id) {
    const [status, error] = await db.put(_id, sys_user, { password: passwordStr }, userId)
    console.log(status, error)
    if (status) {
      return Response.ok(status)
    }
  } else {


  }
  return Response.failed('无效的数据')
}