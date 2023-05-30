import cloud from '@lafjs/cloud'
import { Response } from '@/global-response'

const DB = cloud.database()
const DB_NAME = "sys_schema"


export default async function (ctx: FunctionContext) {
  const { id, menu_id, path } = ctx.query
  console.log(id)
  if (id) {

    const data = await SelectDetailSchema(id)
    console.log(data)
    return Response.ok(data)

  }
  if (path) {

  }
  console.log(menu_id)

  if (!menu_id || menu_id == "") {
    const data = await selectDefauleSchema()
    return Response.ok(data)
  } else {
    const data = await forMenuSelectDetailSchema(menu_id)
    if (!data) {
      const data = await selectDefauleSchema()
      return Response.ok(data)
    }
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