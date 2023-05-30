import cloud from '@lafjs/cloud'

import { Response } from '@/global-response'
import { PasswordTool } from '@/util'

const DB = cloud.database()

const DB_NAME = {
  SYS_USER: 'sys_user',
  SYS_ROLE: 'sys_role',
  SYS_POST: 'sys_post',
  SYS_USER_ROLE: 'sys_user_role',
  SYS_USER_POST: 'sys_user_post'
}

export async function main(ctx: FunctionContext) {
  console.debug('Log[sys-user-create] body->', ctx.body)

  const { userId, type } = userDetails(ctx)
  if (!userId) {
    return Response.failed('非法请求', 401)
  }
  if (type !== 'admin') {
    return Response.failed('非法请求', 401)
  }
  const {
    deptId,
    username,
    password,
    phone,
    avatar,
    nickname,
    name,
    email,
    idNumber,
    role,
    post
  } = ctx.body


  // 验证用户是否已存在
  const { total } = await DB.collection(DB_NAME.SYS_USER).where({ username }).count()
  if (total > 0) {
    return Response.failed('账号已存在', 400)
  }
  const { total: roleCount } = await DB.collection(DB_NAME.SYS_ROLE)
    .where({
      _id: DB.command.in(role)
    }).count()

  if (roleCount !== role.length) {
    return Response.failed('角色不合法', 400)
  }

  // 验证 role 是否合法
  console.log('验证 role 是否合法', role)

  // 验证 post 是否合法
  const { total: postCount } = await DB.collection(DB_NAME.SYS_POST)
    .where({
      _id: DB.command.in(post)
    }).count()
  if (postCount !== post.length) {
    return Response.failed('岗位不合法', 400)
  }

  const passwordStr = PasswordTool.encrypt('sha256', password)

  // 添加 账号
  const { id: uid } = await DB.collection(DB_NAME.SYS_USER)
    .add({
      deptId,
      username,
      phone,
      avatar,
      nickname,
      name,
      email,
      idNumber,
      password: passwordStr,
      createTime: new Date(),
      updateTime: new Date(),
      lockFlag: "0",
      delFlag: "0"
    })

  // 添加用户角色
  await insertUserRoleByUserId(uid, role)

  // 添加用户岗位
  await insertUserPostByUserId(uid, post)

  return Response.ok(true)
}

interface UserDetails {
  userId: string
  type: string
  exp: number
}

async function insertUserPostByUserId(userId: string | number, postIds: string[]) {
  for (const postId of postIds) {
    await DB.collection(DB_NAME.SYS_USER_POST).add({
      userId,
      postId
    })
  }
}

async function insertUserRoleByUserId(userId: string | number, roleIds: string[]) {
  for (const roleId of roleIds) {
    await DB.collection(DB_NAME.SYS_USER_ROLE).add({
      userId,
      roleId
    })
  }
}

function userDetails(ctx: FunctionContext): Partial<UserDetails> {
  const authorization = ctx.headers?.authorization
  if (authorization) {
    const token = authorization.split('Bearer ')[1]
    return cloud.parseToken(token)
  }
  return {}
}

