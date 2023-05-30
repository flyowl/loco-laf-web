import cloud from '@lafjs/cloud'

export default async function (ctx: FunctionContext) {
  return { data: 'hi, laf' }
}


// 信息返回
export class Response<T> {
  public code: number
  public msg: string
  public data: T

  constructor(code: number, msg: string, data: T) {
    this.code = code
    this.msg = msg
    this.data = data
  }

  public static ok<T = any>(data: T, msg: string = 'ok'): Response<T> {
    return new Response<T>(200, msg, data)
  }

  public static failed(msg: string = 'error', code: number = 400) {
    return new Response(code, msg, false)
  }
}


// 树结构
export function findChildren(data, parentId) {
  return data.filter(item => item.p_id === parentId)
    .map(item => ({
      ...item,
      children: findChildren(data, item._id)
    }));
}