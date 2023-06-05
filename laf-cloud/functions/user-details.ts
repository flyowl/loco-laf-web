import cloud from '@lafjs/cloud'
import { Response } from '@/global-response'

export function userDetails(ctx: FunctionContext): Partial<UserDetails> {

  try {
    // 可能会抛出异常的代码
    const authorization = ctx.headers?.authorization
    if (authorization) {
      const token = authorization.split('Bearer ')[1]
      if (cloud.parseToken(token)) {
        return cloud.parseToken(token)

      }
      return {}

    }
  } catch (error) {
    return {}
    // 异常处理逻辑
  }


  return {}
}





export interface UserDetails {
  userId: string
  type: string
  exp: number
}