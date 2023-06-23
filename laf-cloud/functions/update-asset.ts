import cloud from '@lafjs/cloud'

import { Response } from '@/global-response'
import { userDetails } from '@/user-details'
import { User } from '@/model'

const DB = cloud.database()
const DB_NAME = {
  SYS_ASSETS: 'sys_assets',
  SYS_USER: 'sys_user',
  SYS_USER_ROLE: 'sys_user_role',
  SYS_USER_POST: 'sys_user_post'
}

export async function main(ctx: FunctionContext) {
  const { userId, type } = userDetails(ctx)
  console.debug('Log[update-asset] body->', ctx.body, " userId->", userId)

  if (!userId) {
    return Response.failed('非法请求', 401)
  }

  if (type !== 'admin') {
    return Response.failed('非法请求', 401)
  }

  const {
    id: _id,
    name,
    is_default,
    data,
    version,
    description,
  } = ctx.body;

  if (!_id) {
    return Response.failed('[参数不合法]id不能为空', 400)
  }

  // if (!name) {
  //   return Response.failed('[参数不合法]接口名称不能为空', 401)
  // }

  // user auth
  let users = await selectUsersNameByUserId(userId)
  if (!users) {
    return Response.failed('[信息不存在]用户信息不存在', 401)
  }

  users = users.map(
    (user: User) => user.name
  )

  const item = {
    name,
    is_default,
    data,
    version,
    description,
    "updateTime": Date.now(),
    "updaterId": userId,
    "updateBy": users[0]
  }

  // 更新信息项目
  await DB.collection(DB_NAME.SYS_ASSETS)
    .where({ _id })
    .update(item)

  return Response.ok(true)
}

async function selectUsersNameByUserId(userId: string) {
  const { data: users } = await DB.collection(DB_NAME.SYS_USER)
    .where({ _id: userId })
    .get()
  return users
}