import cloud from '@lafjs/cloud'

import { Response } from '@/global-response'
const DB = cloud.database();

const DB_NAME = {
  sys_schema: "sys_schema",
  sys_schema_history: "sys_schema_history",

  sys_menu: "sys_menu"
}
export default async function (ctx: FunctionContext) {

  const userId = ctx.user.userId

  const { menu_id, schema_history_id } = ctx.body

  if (!menu_id || !schema_history_id) {
    return Response.failed("无效的参数")
  }


  const { data: data2 } = await DB.collection(DB_NAME.sys_schema_history).doc(schema_history_id).get();
  if (!data2) {
    return Response.failed("请先保存")
  }

  const { data } = await DB.collection(DB_NAME.sys_schema).where({ menu_id: menu_id }).get();

  console.log(data)
  if (data.length === 0) {
    console.log("创建")
    // 如果 data 长度为 0，说明不存在该记录，执行插入操作
    await DB.collection(DB_NAME.sys_schema).add({
      schema: data2.schema,
      menu_id: menu_id,
      createTime: new Date(),
      updateTime: new Date(),
      createrId: userId,
      updaterId: userId,
      deleted: false
    });
  } else {
    console.log("更新")

    // 否则存在该记录，执行更新操作
    const { _id, version } = data[0];
    await DB.collection(DB_NAME.sys_schema).doc(_id).update({
      schema: data2.schema,
      updaterId: userId,
    });
  }

  await DB.collection(DB_NAME.sys_schema_history).doc(schema_history_id).update({
    status: 1,
    updaterId: userId,
  });
  // const { data: data2 } = DB.collection(DB_NAME.sys_schema_history).where({ _id: schema_history_id }).get()



  return Response.ok(data)
}