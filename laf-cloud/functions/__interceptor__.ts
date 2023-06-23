import cloud from '@lafjs/cloud'


// 以及最重要的拦截器 __interceptor__
export async function main(ctx: FunctionContext) {
  // console.log(ctx.request.path)
  // console.log(ctx.method)
  // 白名单，直接放行
  const whiteList = ['/low_asset_detail', '/sys_user_login', '/low_schema_detail', '/init-collection-data','/util']
  if (whiteList.includes(ctx.request.path)) {
    return true
  }
  if (!ctx.user) {
    ctx.response.send({ code: 401, message: 'token 过期，请重新登入' })
    return false
  }
  return true
}