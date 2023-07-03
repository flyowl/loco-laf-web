
import cloud from '@lafjs/cloud'
import { Response } from '@/public'
import { Database } from '@/handleDatabase'
import { sys_typed } from '@/model'
const db = new Database("sys_typed")

export default async function (ctx: FunctionContext) {
  const userId = ctx.user.userId
  if (ctx.method == "GET") {
    const { page = 1, pageSize = 999, ...query } = ctx.query
    const res = await db.list(parseInt(page), parseInt(pageSize), query)
    return Response.ok(res)
  } else if (ctx.method == "POST") {
    const [id, error] = await db.post(sys_typed, ctx.body, userId)
    if (id) {
      return Response.ok(id)
    }
    return Response.failed(String(error))
  } else if (ctx.method == "PUT") {
    const { _id, ...data } = ctx.body
    const [status, error] = await db.put(_id, sys_typed, data, userId)
    if (status) {
      return Response.ok(status)
    }
    return Response.failed(String(error))
  } else if (ctx.method == "DELETE") {
    const { _id } = ctx.query
    const res = await db.del(_id)
    if (res) {
      return Response.ok(res)
    }
    return Response.failed("失败")
  }
  return Response.failed("无效的数据")
}


// import cloud from '@lafjs/cloud'

// import { Response } from '@/global-response'



// const DB = cloud.database();
// const cmd = DB.command

// const DB_NAME = "sys_block"

// export default async function (ctx: FunctionContext) {
//   const userId = ctx.user.userId

//   if (ctx.method == 'GET') {
//     // 接口权限校验
//     // 处理
//     let data = await get(ctx)
//     return Response.ok(data)

//   } else if (ctx.method == 'POST') {
//     // 接口权限校验
//     const { name, screenshot = "", schema = "", typed_id = "", description = "" } = ctx.body;
//     const res = await DB.collection(DB_NAME).add({
//       name,
//       screenshot,
//       schema,
//       typed_id,
//       description,
//       createTime: new Date(),
//       updateTime: new Date(),
//       createrId: userId,
//       updaterId: userId,
//       deleted: false
//     });

//     return Response.ok(res)

//   } else if (ctx.method == 'PUT') {
//     // 接口权限校验

//     let data = await put(ctx, userId)
//     return Response.ok(data)


//   } else if (ctx.method == 'DELETE') {
//     // 接口权限校验

//     let data = await del(ctx)
//     return Response.ok(data)
//   }
// }


// async function get(ctx: FunctionContext) {

//   // 业务逻辑
//   const { page = 1, pageSize = 10, created_at } = ctx.body

//   let query = {}
//   if (created_at && created_at.length > 0) {
//     const start = new Date(created_at[0])
//     const end = new Date(created_at[1])
//     console.log(start, end)
//     query = {
//       created_at: cmd.gte(start).and(cmd.lt(end))
//     }
//   }

//   const res = await DB
//     .collection(DB_NAME)
//     .where(query)
//     .skip(page * (page - 1))
//     .limit(pageSize)
//     .orderBy("created_at", "desc")
//     .get()

//   const { total } = await DB.collection(DB_NAME)
//     .where(query)
//     .count()

//   console.debug('分页查询结果: ', res.data)

//   const r = {
//     list: res.data,
//     success: res.ok,
//     total,
//     current: page,
//     pageSize: total < pageSize ? total : pageSize
//   }

//   return r
// }

// async function post(ctx: FunctionContext, userId: string) {
//   // 业务逻辑

//   const { name, screenshot = "", schema = "", typed_id = "", description = "" } = ctx.body;

//   if (!name) {
//     return Response.failed('[参数不合法]接口名称不能为空', 401)
//   }


//   const { id: id } = await DB.collection(DB_NAME).add({
//     name,
//     screenshot,
//     schema,
//     typed_id,
//     description,
//     createTime: new Date(),
//     updateTime: new Date(),
//     createrId: userId,
//     updaterId: userId,
//     deleted: false
//   });

//   const data = { id }
//   console.debug('Log[create-block] result->', data)


//   return { data: 'post' }
// }

// async function put(ctx: FunctionContext, userId: string) {
//   const {
//     id: _id,
//     name,
//     screenshot,
//     schema,
//     typed_id,
//     description
//   } = ctx.body;

//   if (!_id) {
//     return Response.failed('[参数不合法]id不能为空', 400)
//   }

//   const item = {
//     name,
//     screenshot,
//     schema,
//     typed_id,
//     description,
//     "updateTime": Date.now(),
//     "updaterId": userId,
//   }
//   // 更新信息项目
//   await DB.collection(DB_NAME)
//     .where({ _id })
//     .update(item)
//   // 业务逻辑
//   return { status: true }
// }

// async function del(ctx: FunctionContext) {

//   const { id } = ctx.body;
//   if (!id) {
//     return Response.failed('[参数不合法]block名称不能为空', 401)
//     const res = await DB
//       .collection(DB_NAME)
//       .where({ _id: id })
//       .remove()
//     // 业务逻辑
//     return { status: true }
//   }
// }
