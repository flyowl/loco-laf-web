import cloud from '@lafjs/cloud'
import { cache, authInit } from '@/public'
const db = cloud.database()
const whiteList = [
  //只是内部使用
  '/WXManager',
  '/send-code',
  '/BackupDB',
  '/test',

  //外部使用
  '/low_asset_detail',
  '/sys_user_login',
  '/low_schema_detail',
  '/low_typed_tree',
  '/low_block_search',
  '/low_typed_tree',
  '/low_assets_choice',
  '/sys_user_choice',
  '/get_local_ip',
  '/upload-file',
  '/wx_login',//微信登入
]
// const authwhiteList = [
//   '/get-oss-sts:GET',
//   'sys_role_choice:GET',
//   'sys_post_choice:GET',
//   'low_api_choice:GET',
//   'sys_menu_tree:GET',
//   'sys_dept_tree:GET',
//   'sys_menu_route:GET',
//   'low_schema_history_detail:GET',
//   'sys_menu_route_edit:GET',
//   'low_schema_history:GET',
//   'sys_user_detail:GET',
//   'sys_user_detail:PUT'
// ]
//白名单
const authwhiteList = {
  '/get-oss-sts': ['GET'],
  '/sys_role_choice': ['GET'],
  '/sys_post_choice': ['GET'],
  '/low_api_choice': ['GET'],
  '/sys_menu_tree': ['GET'],
  '/sys_dept_tree': ['GET'],
  '/sys_menu_route': ['GET'],
  '/low_schema_history_detail': ['GET'],
  '/sys_menu_route_edit': ['GET'],
  '/low_schema_history': ['GET'],
  '/sys_user_detail': ['GET', 'PUT'],
  //培训系统
  '/video_course': ['GET'],
  '/video_video': ['GET'],
  '/video_user': ['GET'],
  '/video_video_time': ['GET'],
  '/video_learning_time': ['GET'],
  '/video_comments': ['GET'],
  '/video_class': ['GET'],
  '/video_class_user': ['GET'],
  '/video_assignment': ['GET'],
  '/video_time_class': ['GET'],
  '/video_course_detail': ['GET', 'POST', 'PUT', 'DELETE'],
  '/video_class_detail': ['GET', 'POST', 'PUT', 'DELETE'],
  '/video_video_detail': ['GET', 'POST', 'PUT', 'DELETE'],
  '/video_class_user_detail': ['GET', 'POST', 'PUT', 'DELETE'],
  '/video_user_detail': ['GET', 'POST', 'PUT', 'DELETE'],
  '/video_time_class_detail': ['GET', 'POST', 'PUT', 'DELETE'],
  '/video_assignment_detail': ['GET', 'POST', 'PUT'], //作业
  '/video_auth': ['GET'],
  // 用户设置
  '/sys_user_setting': ['GET', 'POST', 'PUT', 'DELETE'],
  // 学习 一分钟传一次
  '/video_learning_time_detail': ['GET', 'POST', 'PUT', 'DELETE']

}

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


  if (Object.keys(authwhiteList).includes(ctx.request.path)) {
    if (authwhiteList[ctx.request.path].includes(ctx.request.method)) {
      return true
    }
  }

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
  if (data.username == 'admin') {
    return true
  }

  const authList = cache.get('auth'); // 设置一个缓存
  if (data.roleList.length > 0) {
    for (const roleId of data.roleList) {
      if (authList[roleId].includes(auth)) {
        return true
      }
    }
  }
  // else {
  //   // 用户权限
  //   const authList = cache.get('auth'); // 设置一个缓存
  //   if (data.roleList.length > 0) {
  //     for (const roleId of data.roleList) {
  //       if (authList[roleId].includes(auth)) {
  //         return true
  //       }
  //     }
  //   }
  // }


  return false
}