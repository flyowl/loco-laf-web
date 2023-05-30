
import cloud from "@lafjs/cloud";

import { Response } from '@/global-response'
import { userDetails } from '@/user-details'
import { User } from '@/model'

const DB = cloud.database();

const DB_NAME = {
  SYS_API: 'sys_api',
  SYS_USER: 'sys_user'
}

export default async function main(ctx: FunctionContext) {
  const { userId, type } = userDetails(ctx)

  console.debug('Log[create-api] body->', ctx.body, " userId->", userId)

  if (!userId) {
    return Response.failed('非法请求', 401);
  }
  if (type !== 'admin') {
    return Response.failed('非法请求', 401);
  }

  const { name, schema, typed_id, description = "" } = ctx.body;

  if (!name) {
    return Response.failed('[参数不合法]接口名称不能为空', 401)
  }

  // if (!schema) {
  //   return Response.failed('[参数不合法]接口schema不能为空', 401)
  // }

  // if (!typed_id) {
  //   return Response.failed('[参数不合法]接口类型id不能为空', 401)
  // }

  // 验证用户是否已存在
  const { total } = await DB.collection(DB_NAME.SYS_API).where({ name }).count()
  if (total > 0) {
    return Response.failed('API已经存在', 400)
  }

  // user auth
  let users = await selectUsersNameByUserId(userId)
  if (!users) {
    return Response.failed('[信息不存在]用户信息不存在', 401)
  }

  users = users.map(
    (user: User) => user.name
  )

  console.debug('Log[create-api] users->', users)

  const { id: id } = await DB.collection(DB_NAME.SYS_API).add({
    name,
    schema,
    typed_id,
    description,
    createTime: new Date(),
    updateTime: new Date(),
    createrId: userId,
    updaterId: userId,
    createBy: users[0],
    updateBy: users[0],
    deleted: false
  });

  const data = { id }
  console.debug('Log[create-api] result->', data)

  return Response.ok(data, 'Success');
}


async function selectUsersNameByUserId(userId: string) {
  const { data: users } = await DB.collection(DB_NAME.SYS_USER)
    .where({ _id: userId })
    .get()
  return users
}
