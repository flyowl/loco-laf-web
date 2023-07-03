import cloud from '@lafjs/cloud'
import { Response } from '@/global-response'

const DB = cloud.database()
const DB_NAME = "sys_schema_history"
export default async function (ctx: FunctionContext) {
  const { id,_id, menu_id } = ctx.query
  const { data: roles } = await DB.collection("sys_assets")
    .where({ is_default: 1 })
    .getOne()

  if (_id) {
    // 获取历史数据的数据
    const data = await DetailSchema(_id)
    if (!data) {
      const data2 = await selectDefauleSchema()
      data2.assets = roles.data
      return Response.ok(data2)

    }
    data.assets = roles.data
    return Response.ok(data)
  }


  if (id) {
    // 获取历史数据的数据
    const data = await SelectDetailSchema(id)
    if (!data) {
      const data2 = await selectDefauleSchema()
      data2.assets = roles.data
      return Response.ok(data2)

    }
    data.assets = roles.data
    return Response.ok(data)
  }
  if (menu_id) {
    const data = await SelectMenuDetailSchema(menu_id)
    if (data) {
      data.assets = roles.data
      return Response.ok(data)
    }
    const data2 = await selectDefauleSchema()
    data2.assets = roles.data

    return Response.ok(data2)
  }
  Response.failed("无效的参数")
}


async function SelectDetailSchema(id: String) {
  const { data: roles } = await DB.collection(DB_NAME).orderBy("createTime", "desc")
    .where({ menu_id: id })
    .getOne()
  return roles
}

async function DetailSchema(id: String) {
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