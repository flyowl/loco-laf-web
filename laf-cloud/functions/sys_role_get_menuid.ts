import cloud from '@lafjs/cloud'
import { Response } from '@/public'

const db = cloud.database()
/*
用户获取菜单ID
 */


export default async function (ctx: FunctionContext) {
  const { roleId } = ctx.query

  if (!roleId) {
    return Response.failed("无效的ID")
  }
  const { data } = await db.collection("sys_role_menu").where({
    roleId: roleId
  }).field({ menuId: 1 }).get()
  const menuIds = data.map(item => item.menuId);


  return Response.ok(menuIds)
}