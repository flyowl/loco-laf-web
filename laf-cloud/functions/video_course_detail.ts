import cloud from '@lafjs/cloud'
import { Database } from '@/handleDatabase'
import { Response, NowData } from '@/public'
import { video_course } from '@/video_model'
const db = new Database("video_course")

const DB = cloud.database();

export default async function (ctx: FunctionContext) {
  const { _id, typed = "0" } = ctx.query
  if (!_id) {
    return Response.failed("无效的数据")
  }
  if (typed == "0") {
    const data = await db.get({ _id: _id })
    if (!data) {
      return Response.failed("无效的数据")
    }
    const res = await DB.collection('video_video').where({ courseId: _id }).get()
    data['videoList'] = res.data
    return Response.ok(data)
  } else if (typed == "1") {


    const da = await db.get({ _id: _id })
    // console.log(da)
    if (!da) {
      return Response.failed("数据为空")
    }


    const { data } = await DB
      .collection("video_time_class").where({
        courseId: _id,
        startTime: DB.command.lt(await NowData())
      }).field({
        videoId: 1, startTime: 1,
      })
      .withOne({
        query: DB.collection("video_video").field({
          title: 1,
          duration: 1,
          kid: 1,
          CoverURL: 1, description: 1
        }),
        localField: "videoId", // 主表连接键，即 article.id
        foreignField: "_id", // 子表连接键，即 tag.article_id
        as: "video", // 查询结果中字段重命名，缺省为子表名
      }).withOne({
        query: DB.collection("video_video_time").where({
          userId: ctx.user.userId
        }).field({
          study_time: 1,
          status: 1,
          videoId: 1
        }),
        localField: "videoId", // 主表连接键，即 article.id
        foreignField: "videoId", // 子表连接键，即 tag.article_id
        as: "status", // 查询结果中字段重命名，缺省为子表名
      })
      .get();
    console.log(data)
    const redata = data?.map((item) => {
      console.log(item.status)
      return {
        description: item.video?.description,
        startTime: item.startTime,

        title: item.video?.title,
        duration: item.video?.duration,
        kid: item.video?.kid,
        CoverURL: item?.video?.CoverURL,
        _id: item?.video._id,
        study_time: item?.status?.study_time || 0,
        status: item?.status?.status || 0,
      }
    })

    // console.log(redata)
    da['videoList'] = redata
    return Response.ok(da)
  }

}