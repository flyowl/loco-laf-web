import cloud from '@lafjs/cloud'
import { userDetails } from '@/user-details'

import { Response } from '@/global-response'

const DB = cloud.database();

const DB_NAME = "sys_api"



export default async function (ctx: FunctionContext) {
  const { userId } = userDetails(ctx)

  // if (!userId) {
  // 登入校验
  //   return Response.failed('非法请求', 401)
  // }
  if (ctx.method == 'GET') {

    const { data: data } = await DB.collection(DB_NAME)
      .where(ctx.query)
      .get()
    return Response.ok(data)
    // 接口权限校验

    // 处理
    return Response.ok(data)

  } else if (ctx.method == 'POST') {
    // 接口权限校验
    const { name, typed_id, schema, description = '' } = ctx.body
    const res = await DB.collection(DB_NAME).add({
      name: name,
      typed_id: typed_id,
      schema: schema,
      description: description,
      createTime: new Date(),
      updateTime: new Date(),
      createrId: userId,
      updaterId: userId,
    })

    return Response.ok(res)




  } else if (ctx.method == 'PUT') {
    // 接口权限校验

    const { name, type_id, schema, description = '', id } = ctx.body

    const res = await DB.collection(DB_NAME).doc(id).update({
      name,
      type_id,
      schema,
      description,
      updateTime: new Date(),
      updaterId: userId,
    })

    return Response.ok(res)


  } else if (ctx.method == 'DELETE') {
    // 接口权限校验
    const { id } = ctx.query

    const res = await DB.collection(DB_NAME).where({ _id: id }).remove()
    return Response.ok(res)
  }

}


