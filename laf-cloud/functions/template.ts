import cloud from '@lafjs/cloud'
import { userDetails } from '@/user-details'


import { Response } from '@/global-response'

const DB = cloud.database();

const DB_NAME = {
  SYS_API: '',
}


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
