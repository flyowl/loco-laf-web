import cloud from '@lafjs/cloud'
import { Database } from '@/handleDatabase'
import { Response, NowData } from '@/public'
import { video_assignment } from '@/video_model'
const db = new Database("video_assignment")
const DB = cloud.database()

import { } from '@/video_auth'

export default async function (ctx: FunctionContext) {

  if (ctx.method == "POST") {
    const data = ctx.body

    data.userId = ctx.user.userId
    if (!ctx.body.classId) {
      return Response.failed("无效的数据")
    }
    data.taskLog = JSON.parse(data.taskLog)
    console.log(data)
    const [id, error] = await db.post(video_assignment
      , ctx.body, ctx.user.userId)
    if (id) {
      return Response.ok(id)
    }
    return Response.failed(String(error))

  }



  const { typed = "detail", courseId, _id, classId } = ctx.query
  if (typed == "detail") {
    const data = await db.get(ctx.query)
    if (!_id) {
      return Response.failed("无效的数据")
    }
    console.log(data)
    if (data) {
      return Response.ok(data)
    }
  }
  if (typed == "list") {

    const { page = 1, pageSize = 999, typed, ...query } = ctx.query
    query.userId = ctx.user.userId
    const res = await db.list(parseInt(page), parseInt(pageSize), query)
    return Response.ok(res)

 
  }


  return Response.failed("无效的数据")
}

