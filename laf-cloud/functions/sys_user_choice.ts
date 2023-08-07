import cloud from '@lafjs/cloud'

import { Response } from '@/global-response'

const DB = cloud.database();

const DB_NAME = "sys_user"
const _ = DB.command;


export default async function (ctx: FunctionContext) {

  const { name } = ctx.query

  const regex = new RegExp(name, 'i'); // 'i' 表示不区分大小写

  const { data: data } = await DB.collection(DB_NAME)
    .where(

      _.or([{ username: regex }, { nickname: regex }])
    )
    .get()
  let data2 = data.map((item) => ({ value: item._id, label: item.username + '-' + item.nickname }))
  return Response.ok(data2)
}


