import cloud from '@lafjs/cloud'
import { cache, authInit } from '@/public'
const db = cloud.database()
const whiteList = [
  '/low_asset_detail',
  '/get-oss-sts',
  '/BackupDB',
  '/sys_user_login',
  '/low_schema_detail',
  '/low_typed_tree',
  '/low_block_search',
  '/low_typed_tree',
  '/low_assets_choice',
  '/test'
]
const authwhiteList = [
  'sys_role_choice:GET',
  'sys_post_choice:GET',
  'low_api_choice:GET',
  'sys_menu_tree:GET',
  'sys_dept_tree:GET',
  'sys_menu_route:GET',
  'low_schema_history_detail:GET',
  'sys_menu_route_edit:GET',
  'low_schema_history:GET'
]

// 以及最重要的拦截器 __interceptor__
export async function main(ctx: FunctionContext) {
  // 白名单，直接放行
  if (whiteList.includes(ctx.request.path)) {
    return true
  }

  if (!ctx.user) {
    ctx.response.send({ code: 401, message: 'token 过期，请重新登入' })
    return false
  }
  const path = ctx.request.path.replace('/', '') + ":" + ctx.request.method

  // 登入后的白名单
  if (authwhiteList.includes(path)) {
    return true
  }
  console.log('==')
  // return true
  const stat = authority(ctx.user.userId, path)
  // 权限校验 
  return stat
}


async function authority(userId: string, auth: string) {

  // 用户缓存
  const data = cache.get("user_" + userId)
  if (!data) {
    const { data } = await db.collection('sys_user').doc(userId).get()
    await cache.set("user_" + userId, data)
    // 用户权限
    const authList = cache.get('auth'); // 设置一个缓存
    if (data.roleList.length > 0) {
      for (const roleId of data.roleList) {
        if (authList[roleId].includes(auth)) {
          return true
        }
      }
    }
  }else{
    // 用户权限
    const authList = cache.get('auth'); // 设置一个缓存
    if (data.roleList.length > 0) {
      for (const roleId of data.roleList) {
        if (authList[roleId].includes(auth)) {
          return true
        }
      }
    }
  }


  return false
}