import cloud from '@lafjs/cloud'
import { Response } from '@/global-response'

const DB = cloud.database()
const DB_NAME = "sys_schema_history"
export default async function (ctx: FunctionContext) {
  const { id, menu_id } = ctx.query

  if (id) {
    const data = await SelectDetailSchema(id)
    if (!data) {
      const data2 = await selectDefauleSchema()
      return Response.ok(data2)

    }
    return Response.ok(data)
  }
  if (menu_id) {
    const data = await SelectMenuDetailSchema(menu_id)
    if (data) {
      return Response.ok(data)
    }
    const data2 = await selectDefauleSchema()
    return Response.ok(data2)
  }
  Response.failed("无效的参数")
}


async function SelectDetailSchema(id: String) {
  const { data: roles } = await DB.collection(DB_NAME)
    .where({ _id: id })
    .getOne()
  return roles
}


async function SelectMenuDetailSchema(id: String) {
  const { data: roles } = await DB.collection(DB_NAME)
    .where({ menu_id: id }).orderBy("createTime", "desc")
    .getOne()
  return roles
}



async function selectDefauleSchema() {
  const { data: roles } = await DB.collection("sys_schema")
    .where({ menu_id: "0" })
    .getOne()
  return roles
}