import cloud from '@lafjs/cloud'
import { Response } from '@/global-response'
import { userDetails } from '@/user-details'
import { Role, Menu } from '@/model'

const DB = cloud.database()
const DB_NAME = {
  SYS_BLOCK: 'sys_block',
  SYS_USER: 'sys_user',
  SYS_ROLE: 'sys_role',
  SYS_MENU: 'sys_menu',
  SYS_ROLE_MENU: 'sys_role_menu',
  SYS_USER_ROLE: 'sys_user_role'
}

/**
 * 获取typed信息
 * @param ctx
 */
export async function main(ctx: FunctionContext) {
  const { userId } = userDetails(ctx)
  console.debug('Log[block-info] body->', ctx.body, " userId->", userId)

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

  const block = await selectOneByBlockName(name)
  if (!block) {
    return Response.failed('block信息不存在', 401)
  }

  console.debug('Log[block-info] block->', block)

  return Response.ok({
    "id": block._id,
    "name": block.name,
    "screenshot": block.screenshot,
    "schema": block.schema,
    "typed_id": block.typed_id,
    "description": block.description,
    "createTime": block.createTime,
    "updateTime": block.updateTime,
    "createrId": block.createrId,
    "updaterId": block.updaterId,
    "createBy": block.createBy,
    "updateBy": block.updateBy
  })
}

async function selectOneByBlockName(apiName: string) {
  const { data: user } = await DB.collection(DB_NAME.SYS_BLOCK)
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


