import cloud from '@lafjs/cloud'

import { Response } from '@/utils/global-response'

const DB = cloud.database();

const DB_NAME = "sys_assets"


export default async function (ctx: FunctionContext) {
  const { data: data } = await DB.collection(DB_NAME)
    .where(ctx.query).field({ data: 0 })
    .get()
  let data2 = data.map((item) => ({ value: item._id, label: item.name, ...item }))
  return Response.ok(data2)
}


