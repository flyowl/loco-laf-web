import cloud from '@lafjs/cloud'
import { authInit } from '@/utils/public'
export default async function (ctx: FunctionContext) {
  // 初始化权限信息
  await authInit()
  // console.log(cloud.shared.get('auth')) // 设置一个缓存
}