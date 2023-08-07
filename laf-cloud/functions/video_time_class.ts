import { Response } from '@/public'
import { Database } from '@/handleDatabase'
import { video_time_class } from '@/video_model'
const db = new Database("video_time_class")
import cloud from '@lafjs/cloud'


const DB = cloud.database(


)
export default async function (ctx: FunctionContext) {
  const userId = ctx.user.userId
  if (ctx.method == "GET") {
    const { page = 1, pageSize = 999, ...query } = ctx.query
    // const res = await db.list(parseInt(page), parseInt(pageSize), query)
    // return Response.ok(res)


    const { data } = await DB
      .collection("video_time_class").where(query)
      .withOne({
        query: DB.collection("video_video"),
        localField: "videoId", // 主表连接键，即 article.id
        foreignField: "_id", // 子表连接键，即 tag.article_id
        as: "videoList", // 查询结果中字段重命名，缺省为子表名
      }).get();


    return Response.ok(data)





  } else if (ctx.method == "POST") {
    // const [id, error] = await db.post(video_time_class
    //   , ctx.body, userId)
    // if (id) {
    //   return Response.ok(id)
    // }
    // return Response.failed(String(error))
    const { courseId, classId } = ctx.body
    console.log(courseId, classId)
    const { data } = await DB.collection("video_video").where({ courseId: courseId }).get()

    // const { data: data2 } = await DB.collection("video_time_class").where({ classId: classId }).get()

    for (const item of data) {
      const { data: d } = await db.collection('video_time_class').where({ videoId: item._id, classId }).getOne();
      if (!d) {
        const data = { classId, courseId, videoId: item._id };

        db.post(video_time_class
          , data, userId)



      }
    }

    return Response.ok("更新成功")





  } else if (ctx.method == "PUT") {
    const { _id, ...data } = ctx.body
    const [status, error] = await db.put(_id, video_time_class, data, userId)
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



