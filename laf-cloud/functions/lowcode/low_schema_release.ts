import cloud from '@lafjs/cloud'

import { Response } from '@/utils/global-response'
const DB = cloud.database();

const DB_NAME = {
  sys_schema: "sys_schema",
  sys_schema_history: "sys_schema_history",

  sys_menu: "sys_menu"
}
export default async function (ctx: FunctionContext) {

  const userId = ctx.user?.userId

  const { menu_id, schema_history_id } = ctx.body

  if (!menu_id || !schema_history_id) {
    return Response.failed("无效的参数")
  }


  const { data: data2 } = await DB.collection(DB_NAME.sys_schema_history).doc(schema_history_id).get();
  if (!data2) {
    return Response.failed("请先保存")
  }

  const { ok } = await DB.collection("sys_menu").doc(menu_id).update({ schema: data2.schema });


  // 如果 data 长度为 0，说明不存在该记录，执行插入操作

  DB.collection(DB_NAME.sys_schema_history).doc(schema_history_id).update({
    status: 1,
    updaterId: userId,
  });



  return Response.ok(ok)
}