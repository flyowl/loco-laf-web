import cloud from '@lafjs/cloud'
import { Response } from '@/global-response'

const DB = cloud.database()
const DB_NAME = "sys_schema_history"
export default async function (ctx: FunctionContext) {
  const { id, _id, menu_id } = ctx.query


  if (_id) {
    // 获取历史数据的数据
    const data = await DetailSchema(_id)
    if (!data) {
      const data2 = await selectDefauleSchema()
      data2.assets = await getAssets()
      return Response.ok(data2)
    }
    data.assets = await getAssets()
    return Response.ok(data)
  }


  if (id) {
    // 获取历史数据的数据
    const data = await SelectDetailSchema(id)
    if (!data) {
      const data2 = await selectDefauleSchema()
      data2.assets = await getAssets()
      return Response.ok(data2)
    }
    const res = await SelectMenuIdGetAppId(id)

    console.log(res)

    data.assets = await getAssets(res.assetsId)

    return Response.ok(data)
  }
  if (menu_id) {
    const data = await SelectMenuDetailSchema(menu_id)
    if (data) {
      const menu = await SelectMenuIdGetAppId(menu_id)
      data.assets = await getAssets(menu.assetsId)
      return Response.ok(data)
    }
    const data2 = await selectDefauleSchema()
    data2.assets = await getAssets()

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

async function SelectMenuIdGetAppId(id: string) {
  console.log(id)
  const { data } = await DB.collection('sys_menu').where({ _id: id })
    .getOne()
  return data
}



async function selectDefauleSchema() {
  const { data: roles } = await DB.collection("sys_schema")
    .where({ menu_id: "0" })
    .getOne()
  return roles
}


async function getAssets(id: string = null) {

  let query = {}
  if (id) {
    query = { _id: id }
  } else {
    query = { is_default: 1 }

  }
  const { data: roles } = await DB.collection("sys_assets")
    .where(query)
    .getOne()
  return roles.data
}
