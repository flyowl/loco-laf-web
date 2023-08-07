import { Response } from '@/global-response'
import { PasswordTool, JwtToken } from '@/util'
import { NowData, get_location } from '@/public'
import cloud from '@lafjs/cloud'

const DB = cloud.database()

const DB_NAME = {
  SYS_USER: 'sys_user',
  SYS_ROLE: 'sys_role',
  SYS_MENU: 'sys_menu',
  SYS_ROLE_MENU: 'sys_role_menu',
  SYS_USER_ROLE: 'sys_user_role'
}

interface Permission {
  permission: string
}

interface Role {
  roleId: string
}

interface Menu {
  menuId: string
}

export async function main(ctx: FunctionContext) {
  const { username, password } = ctx.body
  if (!username || !password) {
    return Response.failed('参数不合法')
  }
  const { data: user } = await DB.collection(DB_NAME.SYS_USER)
    .where({ username })
    .getOne()

  if (!user) {
    console.log('用户名密码错误: ', username)
    return Response.failed('用户名密码错误')
  }
  if (!PasswordTool.check(password, user.password)) {
    console.log('密码错误')
    return Response.failed('用户名或密码错误')
  }

  // user auth
  let roles = await selectUserRoleByUserId(user._id)

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
  permissions = permissions.map(
    (item: Permission) => item.permission
  )
  // 签发 token
  // const token = new JwtToken(user._id, 'admin')
  let exp = Math.floor(Date.now() / 1000) + 86400 * 30
  const access_token = cloud.getToken({
    userId: user._id,
    username:user.username,
    exp: exp
  })

  // const refresh_token = cloud.getToken({
  //   uid: userid,
  //   message: '刷新token',
  //   exp: exp + 10000
  // })


  const authorities = []
  for (const item of roles.map((role: Role) => "ROLE_" + role.roleId).concat(permissions)) {
    const authority = { authority: item }
    authorities.push(authority)
  }

  // 添加IP跟浏览器
  const ip = ctx.headers['x-real-ip']
  const agent = ctx.headers['user-agent']

  DB.collection('sys_login_log').add({
    ip:ip,
    agent:agent,
    username:user.username,
    createTime: NowData(),
    location: await get_location(ctx.headers['x-real-ip'])
  })
  


  delete user.password
  delete user.createBy
  delete user.createTime




  const user_info = { ...user, authorities }
  // const data = token.view()
  // data.refresh_token = refresh_token
  const res = {
    access_token: access_token,
    // refresh_token: refresh_token,
    exp: exp,
    username,
    id: user._id,
    user: user_info,
  }
  return Response.ok(res)
}

async function selectUserRoleByUserId(userId: string) {
  const { data: roles } = await DB.collection(DB_NAME.SYS_USER_ROLE)
    .where({ userId: userId })
    .get()
  return roles
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





