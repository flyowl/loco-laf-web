import cloud from '@lafjs/cloud'
import { Response } from '@/utils/public'
import { Database } from '@/handleDatabase'
import { sys_role } from '@/model'
const db = new Database("sys_role")

const dbs = cloud.database()
/*
根据不同的请求地址，实现不同的功能，用于单表下其他的各种操作

 */

export default async function (ctx: FunctionContext) {
  const { getRoleMenu = null, roleId = null } = ctx.query

  if (getRoleMenu && roleId) {
    const query = {
      role: roleId,
    }

  }


}