import cloud from '@lafjs/cloud'
import { Database } from '@/handleDatabase'
import { Response, NowData } from '@/public'
import { video_time_class } from '@/video_model'
const db = new Database("video_time_class")
const DB = cloud.database()
const _ = DB.command;

export default async function (ctx: FunctionContext) {

  const userId = ctx.user.userId



  if (ctx.method == "PUT") {


    const { videoId } = ctx.body
    if (!videoId) {
      return Response.failed("无效的数据")
    }

    const res = await db.collection("video_video_time").where({
      videoId: videoId,
      userId: userId
    }).update({
      status: 2
    })
    return Response.ok(res)
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
    const _ = DB.command;

    if (!courseId) {
      return Response.failed("无效的数据")
    }
    const { data } = await DB
      .collection("video_time_class").where({
        courseId: courseId,
        startTime: _.lt(NowData()),
      }).field({
        videoId: 1,
        courseId: 1,
        startTime: 1,
        endTime: 1

      })
      .withOne({
        query: DB.collection("video_video"),
        localField: "videoId", // 主表连接键，即 article.id
        foreignField: "_id", // 子表连接键，即 tag.article_id
        as: "course", // 查询结果中字段重命名，缺省为子表名
      })
      .get();
    return Response.ok(data)
  }


  if (typed == "todaytask") {
    const _ = DB.command;
    const now = await NowData()
    if (!classId) {
      return Response.failed("无效的数据")
    }
    const query = {
      classId: classId,
      startTime: cloud.database().command.lte(now),
      endTime: cloud.database().command.gte(now)
    }
    const data = await db.get(query)
    const { data: data2 } = await DB.collection('video_assignment').where({
      classId: classId,
      userId: ctx.user.userId,
      timeClassId: data._id
    }).getOne()
    if (data2) {
      console.log(1)
      data2.status = false
      return Response.ok(data2)

    }

    if (data) {
      console.log(2)

      data.status = true
      return Response.ok(data)
    }


  }

  if (typed == 'finish') {

    const data = await db.get({ _id: _id })

    if (data) {
      const { data: redata } = await DB.collection("video_video_time").where({
        videoId: data?.videoId,
        userId: userId
      }).field({
        study_time: 1,
        status: 1,
      }).getOne()
      if (redata.status < 2) {
        return Response.ok({ status: false })
      } else {

        return Response.ok({ status: true })

      }
    }

  }

  return Response.failed("无效的数据")
}

