import cloud from '@lafjs/cloud'
import { Database } from '@/handleDatabase'
import { Response } from '@/public'
import { video_user } from '@/video_model'
const db = new Database("video_user")

const DB = cloud.database();

//typed    mycourse  查看 我的课程 所有的    status 查看是否已购买的
export default async function (ctx: FunctionContext) {
  const { courseId, typed = "detail" } = ctx.query

  if (typed == "status") {
    if (!courseId) {
      return Response.failed("无效的数据")
    }
    const { data: data } = await DB.collection("video_user").where({ courseId: courseId, userId: ctx.user.userId }).getOne()
    if (data) {
      return Response.ok(false)
    }
    return Response.ok(true)
  }

  if (typed == "list") {


    const { data } = await DB
      .collection("video_class_user").where({ classId: _id }).field({ userId: 1, postId: 1, classId: 1, parentId: 1 })
      .withOne({
        query: DB.collection("sys_user").field({ nickname: 1, avatar: 1 }),
        localField: "userId", // 主表连接键，即 article.id
        foreignField: "_id", // 子表连接键，即 tag.article_id
        as: "userList", // 查询结果中字段重命名，缺省为子表名
      }).withOne({
        query: DB.collection("sys_post"),
        localField: "postId", // 主表连接键，即 article.id
        foreignField: "_id", // 子表连接键，即 tag.article_id
        as: "postList", // 查询结果中字段重命名，缺省为子表名
      })
      .get();

    return Response.ok(data)

  }

  if (typed == "mycourse") {
    const { data } = await DB
      .collection("video_user").where({ userId: ctx.user.userId }).field({ courseId: 1, userId: 1 })
      .withOne({
        query: DB.collection("video_course"),
        localField: "courseId", // 主表连接键，即 article.id
        foreignField: "_id", // 子表连接键，即 tag.article_id
        as: "course", // 查询结果中字段重命名，缺省为子表名
      })
      .get();
    return Response.ok(data)

  }


}