import cloud from '@lafjs/cloud'
import { Database } from '@/handleDatabase'
import { Response } from '@/public'
import { video_learning_time, video_video_time } from '@/video_model'
const db = new Database("video_learning_time")


const DB = cloud.database()
const _ = DB.command;


export default async function (ctx: FunctionContext) {

  const userId = ctx.user.userId

  if (ctx.method == "POST") {

    const { videoId } = ctx.body

    if (!videoId) {
      return Response.failed("无效的视频ID")
    }

    const data = {
      videoId: videoId,
      userId: userId
    }

    const [id, error] = await db.post(video_learning_time
      , data, userId)

    if (id) {


      const { data: videodata } = await DB.collection('video_video_time').where({
        videoId: videoId,
        userId: userId
      }).field({ _id: 1, study_time: 1 }).getOne()

      console.log(videodata)
      if (videodata) {

        DB.collection('video_video_time').doc(videodata._id).update({
          study_time: videodata.study_time + 1
        })
      } else {
        const db = new Database("video_video_time")
        db.post(video_video_time, {
          "study_time": 1,
          "videoId": videoId,
          "status": 1,
          "userId": userId,
        }, userId)
      }


      return Response.ok(id)
    }
    return Response.failed(String(error))




    return Response.failed("无效的数据")
  }