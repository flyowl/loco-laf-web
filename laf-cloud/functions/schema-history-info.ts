import cloud from '@lafjs/cloud'
import { Response } from '@/global-response'
import { userDetails } from '@/user-details'
import { Role, Menu } from '@/model'

const DB = cloud.database()
const DB_NAME = {
  SYS_SCHEMA_HISTORY: 'sys_schema_history',
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
  console.debug('Log[schema-history-info] body->', ctx.body, " userId->", userId)

  if (!userId) {
    return Response.failed('非法请求', 401)
  }

  const { id: _id } = ctx.query;

  if (!_id) {
    return Response.failed('物料id不能为空', 401)
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

  const history = await selectOneByhistoryId(_id)
  if (!history) {
    return Response.failed('history信息不存在', 401)
  }

  console.debug('Log[schema-history-info] schema-history->', history)

  return Response.ok({
    "id": history._id,
    "schema": history.schema,
    "menu_id": history.menu_id,
    "description": history.description,
    "createTime": history.createTime,
    "updateTime": history.updateTime,
    "createrId": history.createrId,
    "updaterId": history.updaterId,
    "createBy": history.createBy,
    "updateBy": history.updateBy
  })
}

async function selectOneByhistoryId(historyId: string) {
  const { data: user } = await DB.collection(DB_NAME.SYS_SCHEMA_HISTORY)
    .where({ _id: historyId, deleted: false })
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


