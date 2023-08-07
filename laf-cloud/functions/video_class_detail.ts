import cloud from '@lafjs/cloud'
import { Database } from '@/handleDatabase'
import { Response } from '@/public'
import { video_class } from '@/video_model'
const db = new Database("video_class")



export default async function (ctx: FunctionContext) {
  const { _id } = ctx.query
  if (!_id) {
    return Response.failed("无效的数据")
  }
  const data = await db.get(ctx.query)
  if (data) {
    return Response.ok(data)
  }
  return Response.failed("无效的数据")
}