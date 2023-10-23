import cloud from '@lafjs/cloud'
import { Response } from '@/utils/global-response'

import { selectDefauleSchema, selectDefauleAssets, getAssets } from '@/lowcode/public'


const DB = cloud.database()
const DB_NAME = "sys_schema"


export default async function (ctx: FunctionContext) {
  const { menu_id, path } = ctx.query
  // 根据路径获取，生成ID
  if (path) {

    const { data: data } = await DB.collection("sys_menu")
      .where({ path: path }).field({ _id: 1, assetsId: 1, schema: 1 })
      .getOne()
    if (!data?.schema) {
      const da = await selectDefauleSchema()
      data.schema = da.schema
    }
    data.assets = await getAssets(data.assetsId)

    return Response.ok(data)
  }
  // 没根据菜单ID 处理，这是获取生产ID
  if (menu_id) {
    const { data } = await DB.collection('sys_menu')
      .doc(menu_id).get()

    if (!data.schema) {
      const da = await selectDefauleSchema()
      data.schema = da.data
    }

    data.assets = await getAssets(data.assetsId)
    return Response.ok(data)
  }



  const data = await selectDefauleSchema()
  data.assets = await getAssets(data.assetsId)
  return Response.ok(data)



}



