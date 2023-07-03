import cloud from '@lafjs/cloud'
import { Response } from '@/global-response'

const DB = cloud.database()
const DB_NAME = "sys_schema"


export default async function (ctx: FunctionContext) {
  const { data: roles } = await DB.collection("sys_assets")
    .where({ is_default: 1 })
    .getOne()

  const { id, menu_id, path } = ctx.query
  if (id) {

    const data = await SelectDetailSchema(id)
    data.assets = roles.data

    return Response.ok(data)

  }
  if (path) {
    const { data: data } = await DB.collection("sys_menu")
      .where({ path: path }).field({ _id: 1 })
      .getOne()
    const { data: data2 } = await DB.collection(DB_NAME)
      .where({ menu_id: data._id })
      .getOne()

    data2.assets = roles.data

    return Response.ok(data2)
  }

  if (!menu_id || menu_id == "") {
    const data = await selectDefauleSchema()
    data.assets = roles.data
    return Response.ok(data)
  } else {
    const data = await forMenuSelectDetailSchema(menu_id)
    if (!data) {
      const data = await selectDefauleSchema()
      data.assets = roles.data
      return Response.ok(data)
    }
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

async function SchemaCreate(data: any) {
  const res = await DB.collection(DB_NAME).add(data)
  return res
}