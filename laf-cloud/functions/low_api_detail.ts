import cloud from '@lafjs/cloud'
import { Response } from '@/global-response'

const DB = cloud.database();

const DB_NAME = "sys_api"

export default async function (ctx: FunctionContext) {
  const { id } = ctx.query

  if (id != undefined) {
    const data = await functionselectDetailAssets(id)
    return Response.ok(data)
  } else {


  }
}

async function functionselectDetailAssets(id: string) {
  const { data: roles } = await DB.collection(DB_NAME)
    .where({ _id: id })
    .getOne()
  return roles
}