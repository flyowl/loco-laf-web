import cloud from '@lafjs/cloud'

export default async function (ctx: FunctionContext) {
  return {
    ip: ctx.headers['x-real-ip']
  }
}