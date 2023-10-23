import cloud from '@lafjs/cloud'

import { Response } from '@/utils/global-response'

const DB = cloud.database();

const DB_NAME = "sys_schema_history"


export default async function (ctx: FunctionContext) {
  const userId = ctx.user?.userId || null

  if (ctx.method == 'GET') {
    // 接口权限校验

    // 处理
    const data = await DB.collection(DB_NAME).where(ctx.query).orderBy("createTime", "desc").field({
      menu_id: 1,
      createTime: 1,
      updateTime: 1,
      status: 1,
    }).get()

    return Response.ok(data)

  } else if (ctx.method == 'POST') {
    // 接口权限校验
    const { menu_id, schema } = ctx.body
    const data = await DB.collection(DB_NAME).add({
      schema,
      menu_id,
      createTime: new Date(),
      updateTime: new Date(),
      createrId: userId,
      updaterId: userId,
    })

    return Response.ok(data)

  }
  else if (ctx.method == 'DELETE') {
    // 接口权限校验
    const { id } = ctx.query
    if (!id) {
      return Response.failed("无效的参数")
    }
    const res = await DB.collection(DB_NAME).where({ _id: id }).remove()
    return Response.ok(res)
  }
}


