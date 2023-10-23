import cloud from '@lafjs/cloud'
import { cache, authInit } from '@/utils/public'
const db = cloud.database()
const whiteList = [
  //只是内部使用
  '/tools/WXManager',
  '/tools/send-code',
  '/tools/BackupDB',
  '/test/test',
  "/utils/public",
  '/utils/initsql', //初始化使用
  '/handleDatabase',
  //外部使用
  '/lowcode/low_asset_detail',
  '/lowcode/sys_user_login',
  '/lowcode/low_schema_detail',
  '/lowcode/low_typed_tree',
  '/lowcode/low_block_search',
  '/lowcode/low_typed_tree',
  '/lowcode/low_assets_choice',
  '/system/sys_user_choice',
  '/tools/get_local_ip',
  '/tools/upload-file',
  '/tools/wx_login',//微信登入
  '/system/user/sys_user_login'
]
//白名单
const authwhiteList = {
  '/tools/get-oss-sts': ['GET'],
  '/system/role/sys_role_choice': ['GET'],
  '/system/post/sys_post_choice': ['GET'],
  '/lowcode/api/low_api_choice': ['GET'],
  '/system/menu/sys_menu_tree': ['GET'],
  '/system/dept/sys_dept_tree': ['GET'],
  '/system/menu/menu/sys_menu_route': ['GET'],
  '/lowcode/low_schema_history_detail': ['GET'],
  '/system/menu/sys_menu_route_edit': ['GET'],
  '/lowcode/low_schema_history': ['GET'],
  '/system/user/sys_user_detail': ['GET', 'PUT'],
  // 用户设置
  '/system/user/sys_user_setting': ['GET', 'POST', 'PUT', 'DELETE'],
}

// 以及最重要的拦截器 __interceptor__
export async function main(ctx: FunctionContext) {

  // return true

  // 白名单，直接放行
  if (whiteList.includes(ctx.request.path)) {
    return true
  }



  if (!ctx.user) {
    ctx.response.send({ code: 401, message: 'token 过期，请重新登入' })
    return false
  }
  if (Object.keys(authwhiteList).includes(ctx.request.path)) {
    if (authwhiteList[ctx.request.path].includes(ctx.request.method)) {
      return true
    }
  }

  //演示模式
  // if (ctx.request.method != "GET") {
  //   return false
  // }
  
  const path = ctx.request.path.replace('/', '') + ":" + ctx.request.method
  const stat = authority(ctx.user.userId, path)
  // 权限校验 
  return stat



}


async function authority(userId: string, auth: string) {
  // 用户缓存
  let data = cache.get("user_" + userId)
  if (!data) {
    const { data } = await db.collection('sys_user').doc(userId).get()
    await cache.set("user_" + userId, data)
    // 用户权限
  }
  if (data?.username == 'admin') {
    return true
  }

  const authList = cache.get('auth'); // 设置一个缓存
  if (data?.roleList.length > 0) {
    for (const roleId of data?.roleList) {
      if (authList[roleId].includes(auth)) {
        return true
      }
    }
  }
  return false
}