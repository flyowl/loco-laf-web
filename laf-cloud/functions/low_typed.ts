import cloud from '@lafjs/cloud'
import { userDetails } from '@/user-details'


import { Response } from '@/global-response'

const DB = cloud.database();

const DB_NAME = "sys_typed"


export default async function (ctx: FunctionContext) {
  const { userId, type } = userDetails(ctx)
  console.log(userId, type)

  // if (!userId) {
  // 登入校验
  //   return Response.failed('非法请求', 401)
  // }
  if (ctx.method == 'GET') {
    // 接口权限校验

    // 处理
    let data = await get(ctx)

    return Response.ok(data)

  } else if (ctx.method == 'POST') {
    const { name, typed, p_id = -1, description = "" } = ctx.body;


    const { id: id } = await DB.collection(DB_NAME).add({
      name,
      typed,
      p_id,
      description,
      createTime: new Date(),
      updateTime: new Date(),
      createrId: userId,
      updaterId: userId,
      deleted: false
    });
    // 接口权限校验

    let data = await post(ctx)

    return Response.ok(data)

  } else if (ctx.method == 'PUT') {
    // 接口权限校验

    let data = await put(ctx)
    return Response.ok(data)


  } else if (ctx.method == 'DELETE') {
    // 接口权限校验

    let data = await del(ctx)
    return Response.ok(data)
  }

}


async function get(ctx: FunctionContext) {
  // 业务逻辑

  return { data: 'get' }
}

async function post(ctx: FunctionContext) {
  // 业务逻辑
  return { data: 'post' }
}

async function put(ctx: FunctionContext) {
  // 业务逻辑
  return { data: 'put' }
}

async function del(ctx: FunctionContext) {
  // 业务逻辑
  return { data: 'del' }
}
