import cloud from '@lafjs/cloud'
const db = cloud.database();
import { Response } from '@/public'

export default async function (ctx: FunctionContext) {
  const { data } = await db.collection("sys_menu").field({ path: 1 }).get()
  return Response.ok(data)
}