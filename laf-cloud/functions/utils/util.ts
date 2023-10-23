import * as crypto from 'crypto'
import cloud from '@lafjs/cloud'

export class JwtToken {



  public readonly payload: any

  constructor(uid: string, type: string) {
    this.payload = JwtToken.getPayload(uid, type)
  }


  private static get expire() {
    const envTime = process.env.user_expire
    if (envTime){
      return Math.floor(Date.now() / 1000) + parseInt(envTime)
    }

    return Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
  }

  public get accessToken(): string {
    // @ts-ignore
    return cloud.getToken(this.payload)
  }

  private static getPayload(uid: string, type: string): any {
    return {
      userId: uid,
      type: type,
      expires_in: JwtToken.expire,
      active: true,
      clientId: type,
      license: 'made by gms',
      scope: 'server',
      token_type: 'bearer'
    }
  }

  public view() {
    return { ...this.payload, access_token: this.accessToken }
  }

}

export class PasswordTool {
  /**
   * 加密方式映射
   * - key: 加密方式, 保存在密码头中
   * - value: 加密字符串的方法
   */
  private static readonly encryptionMapping = {
    /**
     * 明文: "{none}"
     */
    none: (s: string) => s,
    /**
     * 哈希: "{sha256}"
     */
    sha256: (s: string) => crypto.createHash('sha256').update(s).digest('hex'),
  }
  /**
   * 密码格式: [{加密方式}]<非空字符密文>
   */
  private static readonly encryption = new RegExp('^(\\{([\\dA-Za-z]+)})?(\\S+)$')

  /**
   * 检查密码
   * @param password 客户端提供未加密密码
   * @param ciphertext 数据库保存的加密后的密码
   */
  public static check(password: string, ciphertext: string) {
    const arr = this.encryption.exec(ciphertext)
    // 密码格式不正确
    if (!arr) {
      return false
    }

    const type: keyof typeof PasswordTool.encryptionMapping = (arr[2] ?? 'sha256') as any
    const cipher = arr[3]

    // 如果找不到合适的加密函数, 表达式应为: undefined === cipher
    return this.encryptionMapping[type]?.(password) === cipher
  }

  /**
   * 加密
   */
  public static encrypt(type: keyof typeof PasswordTool.encryptionMapping, password: string) {
    const fun = this.encryptionMapping[type]
    if (!fun) {
      throw new Error('未知类型: ' + type)
    }
    return `{${type}}` + fun?.(password)
  }

}

const isFileExist = async (key: string) => {
  try {
    const status = await cloud.fetch(key, { method: 'HEAD' }).then(r => r.status);
    return status === 200
  } catch {
    return false
  }
}
