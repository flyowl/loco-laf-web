import cloud from '@lafjs/cloud'
import { userDetails } from '@/user-details'

import { Response } from '@/global-response'

const DB = cloud.database();

const DB_NAME = "sys_api"


export default async function (ctx: FunctionContext) {
  const { data: data } = await DB.collection(DB_NAME)
    .where(ctx.query)
    .get()
  let data2 = data.map((item) => ({ value: item._id, label: item.name, ...item }))
  return Response.ok(data2)
}


