import cloud from '@lafjs/cloud'
import { Response } from '@/global-response'

const DB = cloud.database()
const DB_NAME = "sys_schema"


export default async function (ctx: FunctionContext) {
  const { data: roles } = await DB.collection("sys_assets")
    .where({ is_default: 1 })
    .getOne()

  const { id, menu_id, path } = ctx.query


  // 根据路径获取，生成ID
  if (path) {
    let query = {}
    const { data: data } = await DB.collection("sys_menu")
      .where({ path: path }).field({ _id: 1, assetsId: 1 })
      .getOne()



    const { data: data2 } = await DB.collection(DB_NAME)
      .where({ menu_id: data._id })
      .getOne()
    data2.assets = await getAssets(data.assetsId)

    return Response.ok(data2)
  }

  // 没根据菜单ID 处理，这是获取生产ID
  if (menu_id) {
    const data = await forMenuSelectDetailSchema(menu_id)
    if (!data) {
      const data = await selectDefauleSchema()
      data.assets = roles.data
      return Response.ok(data)
    }
    const menu = await SelectMenuIdGetAppId(menu_id)
    data.assets = await getAssets(menu.assetsId)
    return Response.ok(data)
  }

  const data = await selectDefauleSchema()
  data.assets = roles.data
  return Response.ok(data)

  // 获取schemaId 作用 排查一下，失效
  if (id) {

    const data = await SelectDetailSchema(id)
    data.assets = roles.data

    return Response.ok(data)

  }
}


async function selectDefauleSchema() {
  const { data: roles } = await DB.collection(DB_NAME)
    .where({ menu_id: "0" })
    .getOne()
  return roles
}

async function forMenuSelectDetailSchema(id: String) {
  const { data: roles } = await DB.collection(DB_NAME)
    .where({ menu_id: id })
    .getOne()
  return roles
}
async function SelectDetailSchema(id: String) {
  const { data: roles } = await DB.collection(DB_NAME)
    .where({ _id: id })
    .getOne()
  return roles
}
async function SelectMenuIdGetAppId(id: string) {
  const { data } = await DB.collection('sys_menu').where({ _id: id })
    .getOne()
  return data
}

async function getAssets(id: string = null) {

  let query = {}
  if (id) {
    query = { _id: id }
  } else {
    query = { is_default: 1 }

  }
  console.log(query)
  const { data: roles } = await DB.collection("sys_assets")
    .where(query)
    .getOne()
  return roles.data
}