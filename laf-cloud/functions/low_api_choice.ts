import cloud from '@lafjs/cloud'
import { userDetails } from '@/user-details'

import { Response } from '@/global-response'

const DB = cloud.database();

const DB_NAME = "sys_api"


export default async function (ctx: FunctionContext) {


  const { data: data } = await DB.collection(DB_NAME)
    .where(ctx.query)
    .get()


  console.log(data)

  let data2 = data.map((item) => ({ value: item._id, label: item.name, item }))
  return Response.ok(data2)
  // 接口权限校验

  // 处理

}


