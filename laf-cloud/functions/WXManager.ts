import cloud from '@lafjs/cloud'


// 接口地址
//https://developers.weixin.qq.com/apiExplorer?apiName=getPhoneNumber&plat=miniprogram

export default async function (ctx: FunctionContext) {
  console.log('Hello World')
  const d = await new WXManager(cloud.env?.AppId, cloud.env?.appSecret)
  console.log("---1", await d.getOpenId("0d1xLRFa1cpGLF0hcUFa1bGMN21xLRFy"))
  return { data: 'hi, laf' }
}

class WXManager {
  private appId: string;
  private appSecret: string;
  private session_key: string;

  constructor(appId, appSecret) {
    this.appId = appId;
    this.appSecret = appSecret;
  }
  async getOpenId(code) {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appId}&secret=${this.appSecret}&js_code=${code}&grant_type=authorization_code`;
    const res = await cloud.fetch(url);
    console.log(res.data)
    // const ress = JSON.parse(res);
    this.session_key = res.data?.session_key
    return res.data?.openid
  }
}


export {
  WXManager
}

