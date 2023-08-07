import cloud from '@lafjs/cloud'
import { Database } from '@/handleDatabase'
import { Response } from '@/public'
import { video_class_user } from '@/video_model'
const db = new Database("video_class_user")

const DB = cloud.database();

//typed   detail 个人详细   list 获取班级信息   myclass获取我的班级
export default async function (ctx: FunctionContext) {
  const { _id, typed = "detail" } = ctx.query

  if (typed == "detail") {
    if (!_id) {
      return Response.failed("无效的数据")
    }
    const data = await db.get(ctx.query)
    if (!data) {
      return Response.failed("无效的数据")
    }
    return Response.ok(data)
  }

  if (typed == "list") {
    if (!_id) {
      return Response.failed("无效的数据")
    }
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
  if (typed == "myclass") {
    const { data } = await DB
      .collection("video_class_user").where({ userId: ctx.user.userId })
      .withOne({
        query: DB.collection("video_class"),
        localField: "classId", // 主表连接键，即 article.id
        foreignField: "_id", // 子表连接键，即 tag.article_id
        as: "class", // 查询结果中字段重命名，缺省为子表名
      })
      .get();
    return Response.ok(data)
  }
}