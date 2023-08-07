import cloud from '@lafjs/cloud'
import { Database } from '@/handleDatabase'
import { Response } from '@/public'
import { VodClient } from '@/alicloud_vod'
import { video_video } from '@/video_model'
const db = new Database("video_video")
const DB = cloud.database();


// detail 详细   play 播放   aliList 播放列表


export default async function (ctx: FunctionContext) {
  const { _id, typed = "detail", videoId } = ctx.query
  // 添加多个视频
  if (ctx.method == "POST") {
    const { data, course_id } = ctx.body
    // console.log(course_id)

    if (!course_id) {
      return Response.failed("无效的数据")
    }
    const obj = []


    data.forEach((item) => {
      obj.push({
        "title": item.Video.Title,
        "duration": item.Video.Duration,
        "CoverURL": item.Video.CoverURL,
        "courseId": course_id,
        "kid": item.MediaId
      })
    });
    const { ok } = await DB.collection("video_video").add(obj, { multi: true })
    return Response.ok(ok)
  }




  if (typed === "detail") {
    if (!_id) {
      return Response.failed("无效的数据")
    }
    const data = await db.get(ctx.query)
    if (data) {
      return Response.ok(data[0])
    }
  }

  if (typed === "play") {
    //vid  不是视频ID
    if (!videoId) {
      return Response.failed("无效的数据")
    }
    const vodClient = new VodClient();
    await vodClient.init();
    const data = await vodClient.getPlayInfo(videoId)
    return Response.ok(data)
  }

  if (typed === "aliList") {
    const vodClient = new VodClient();
    await vodClient.init();
    const data = await vodClient.SearchMedia()
    return Response.ok(data)
  }
  return Response.failed("无效的数据")
}



//播放权限
async function playAuth(userId: string, videoId: string) {


}


