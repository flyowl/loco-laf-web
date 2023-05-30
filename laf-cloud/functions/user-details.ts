import cloud from '@lafjs/cloud'

export function userDetails(ctx: FunctionContext): Partial<UserDetails> {
  const authorization = ctx.headers?.authorization
  if (authorization) {
    const token = authorization.split('Bearer ')[1]
    return cloud.parseToken(token)
  }
  return {}
}

export interface UserDetails {
  userId: string
  type: string
  exp: number
}