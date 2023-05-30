
import cloud from "@lafjs/cloud";

import { Response } from '@/global-response'
import { userDetails } from '@/user-details'
import { User } from '@/model'

const DB = cloud.database();

const DB_NAME = {
  SYS_SCHEMA_HISTORY: 'sys_schema_history',
  SYS_TYPED: 'sys_typed',
  SYS_USER: 'sys_user'
}

export default async function main(ctx: FunctionContext) {
  const { userId, type } = userDetails(ctx)
  console.debug('Log[create-schema-history] body->', ctx.body, " userId->", userId)

  if (!userId) {
    return Response.failed('非法请求', 401);
  }
  if (type !== 'admin') {
    return Response.failed('非法请求', 401);
  }

  const { schema = "", menu_id = "-1", description = "" } = ctx.body;

  // if (!schema) {
  //   return Response.failed('[参数不合法]schema不能为空', 401)
  // }

  // user auth
  let users = await selectUsersNameByUserId(userId)
  if (!users) {
    return Response.failed('[信息不存在]用户信息不存在', 401)
  }

  users = users.map(
    (user: User) => user.name
  )

  console.debug('Log[create-schema-history] users->', users)

  const { id: id } = await DB.collection(DB_NAME.SYS_SCHEMA_HISTORY).add({
    schema,
    menu_id,
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
  console.debug('Log[create-schema-history] result->', data)

  return Response.ok(data, 'Success');;
}


async function selectUsersNameByUserId(userId: string) {
  const { data: users } = await DB.collection(DB_NAME.SYS_USER)
    .where({ _id: userId })
    .get()
  return users
}
