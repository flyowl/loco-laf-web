
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
    return new Response<T>(2000, msg, data)
  }

  public static failed(msg: string = 'error', code: number = 4000) {
    return new Response(code, msg, false)
  }
}