import { Response } from '@/public'
import cloud from '@lafjs/cloud'

import { Database } from '@/handleDatabase'
import { video_class_user } from '@/video_model'
const db = new Database("video_class_user")
const DB = cloud.database();


export default async function (ctx: FunctionContext) {
  const userId = ctx.user.userId
  if (ctx.method == "GET") {
    const { page = 1, pageSize = 999, typed, ...query } = ctx.query


    if (!typed) {
      const res = await db.list(parseInt(page), parseInt(pageSize), query)
      return Response.ok(res)
    }

    // const res = await DB.collection("video_class_user")


  } else if (ctx.method == "POST") {
    const { userId, classId } = ctx.body

    const isex = await isExist(userId, classId)


    if (isex) {
      return Response.failed("已存在用户")

    }


    const [id, error] = await db.post(video_class_user
      , ctx.body, userId)
    if (id) {
      return Response.ok(id)
    }
    return Response.failed(String(error))
  } else if (ctx.method == "PUT") {
    const { _id, ...data } = ctx.body
    const [status, error] = await db.put(_id, video_class_user, data, userId)
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


async function isExist(userId: string, classId: string) {

  const { data } = await DB.collection('video_class_user').where({ userId: userId, classId: classId }).get()

  if (data.length > 0) {
    return true
  }
  return false

}

