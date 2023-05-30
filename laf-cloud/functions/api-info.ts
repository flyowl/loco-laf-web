import cloud from '@lafjs/cloud'
import { Response } from '@/global-response'
import { userDetails } from '@/user-details'
import { Role, Menu } from '@/model'

const DB = cloud.database()
const DB_NAME = {
  SYS_API: 'sys_api',
  SYS_USER: 'sys_user',
  SYS_ROLE: 'sys_role',
  SYS_MENU: 'sys_menu',
  SYS_ROLE_MENU: 'sys_role_menu',
  SYS_USER_ROLE: 'sys_user_role'
}

/**
 * 获取接口信息
 * @param ctx
 */
export async function main(ctx: FunctionContext) {
  const { userId } = userDetails(ctx)
  console.debug('Log[api-info] body->', ctx.body, " userId->", userId)

  if (!userId) {
    return Response.failed('非法请求', 401)
  }

  const { name } = ctx.body;

  if (!name) {
    return Response.failed('接口名称不能为空', 401)
  }

  const user = await selectOneByUserId(userId)
  if (!user) {
    return Response.failed('非法请求', 401)
  }

  let roles = await selectUserRoleByUserId(userId)
  if (!roles) {
    return Response.failed('暂无权限', 401)
  }

  roles = roles.map(
    (role: Role) => role.roleId
  )

  let permissions = await selectUserPermissionByRoleIds(roles)
  if (!permissions) {
    return Response.failed('暂无权限', 401)
  }

  const api = await selectOneByApiName(name)
  if (!api) {
    return Response.failed('接口信息不存在', 401)
  }

  console.debug('Log[api-info] api->', api)

  return Response.ok({
    "id": api._id,
    "name": api.name,
    "schema": api.schema,
    "typed_id": api.typed_id,
    "createTime": api.createTime,
    "updateTime": api.updateTime,
    "createrId": api.createrId,
    "updaterId": api.updaterId,
    "createBy": api.createBy,
    "updateBy": api.updateBy
  })
}

async function selectOneByApiName(apiName: string) {
  const { data: user } = await DB.collection(DB_NAME.SYS_API)
    .where({ name: apiName, deleted: false })
    .getOne()
  return user
}

async function selectOneByUserId(userId: string) {
  const { data: user } = await DB.collection(DB_NAME.SYS_USER)
    .where({ _id: userId })
    .getOne()
  return user
}

async function selectUserPermissionByRoleIds(roleIds: string[]) {
  const cmd = DB.command
  const { data: rolePermissions } = await DB.collection(DB_NAME.SYS_ROLE_MENU)
    .where({ roleId: cmd.in(roleIds) })
    .get()
  const menuIds = rolePermissions.map(
    (menu: Menu) => menu.menuId
  )
  const { data: permissions } = await DB.collection(DB_NAME.SYS_MENU)
    .where({ _id: cmd.in(menuIds) })
    .get()
  const codes = permissions.filter(item => {
    if (item.permission) {
      return item.permission
    }
  })
  return codes
}

async function selectUserRoleByUserId(userId: string) {
  const { data: roles } = await DB.collection(DB_NAME.SYS_USER_ROLE)
    .where({ userId: userId })
    .get()
  return roles
}


