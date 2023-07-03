import cloud from '@lafjs/cloud'
import { authInit } from '@/public'
export default async function (ctx: FunctionContext) {
  await authInit()
  // console.log(cloud.shared.get('auth')) // 设置一个缓存

}

