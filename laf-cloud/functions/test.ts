import cloud from '@lafjs/cloud'
import { Database } from '@/handleDatabase'
import { Response, get_location } from '@/public'


import RPCClient from '@alicloud/pop-core';



export default async function (ctx: FunctionContext) {



  console.log(ctx.user)

  console.log(await get_location(ctx.headers['x-real-ip']))

  return { status: 'ok' }
}




