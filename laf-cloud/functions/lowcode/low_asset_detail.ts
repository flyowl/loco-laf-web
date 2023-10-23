import cloud from '@lafjs/cloud'
import { Response } from '@/utils/global-response'

const DB = cloud.database();

const DB_NAME = "sys_assets"

export default async function (ctx: FunctionContext) {
  const { id } = ctx.query


  if (!id || id == "") {
    const data = await functionselectDetailAssets()
    return Response.ok(data)
  } else {

  }
}

async function functionselectDetailAssets() {
  const { data: roles } = await DB.collection(DB_NAME)
    .where({ is_default: 1 })
    .getOne()
  return roles
}