import cloud from '@lafjs/cloud'


// 接口地址
//https://developers.weixin.qq.com/doc/oplatform/Mobile_App/WeChat_Login/Authorized_API_call_UnionID.html
// 网页地址
//https://developers.weixin.qq.com/apiExplorer?apiName=getPhoneNumber&plat=miniprogram
export default async function (ctx: FunctionContext) {
  console.log('Hello World')
  const d = await new WXManager(cloud.env?.AppId, cloud.env?.appSecret)
  await d.getToken()
  console.log(await d.getInfo('0c16CbHa1KetMF0sUiGa1e9E5w36CbHw'))
  return { data: 'hi, laf' }
}



class WXManager {
  private appId: string;
  private appSecret: string;
  private AccessToken: string;

  constructor(appId, appSecret) {
    this.appId = appId;
    this.appSecret = appSecret;
  }
  async getToken() {

    const url = `https://api.weixin.qq.com/cgi-bin/token?appid=${this.appId}&secret=${this.appSecret}&grant_type=client_credential`
    const res = await cloud.fetch(url);

    console.log('1')
    this.AccessToken = res.data.access_token
    return res.data.access_token
  }

  async getInfo(code) {
    const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.appId}&secret=${this.appSecret}&code=${code}&grant_type=authorization_code`;


    const res = await cloud.fetch(url);
    // this.AccessToken = res.data.access_token
    return res.data
    // {
    //   "access_token": "ACCESS_TOKEN",
    //     "expires_in": 7200,
    //       "refresh_token": "REFRESH_TOKEN",
    //         "openid": "OPENID",
    //           "scope": "SCOPE",
    //             "unionid": "UNIONID"
    // }
  }
  async getUserInfo(ACCESS_TOKEN: string, OpenId: string) {
    const url = `https://api.weixin.qq.com/sns/userinfo?${ACCESS_TOKEN}=ACCESS_TOKEN&openid=${OpenId}`;




    const res = await cloud.fetch(url);
    // const { unionid } = JSON.parse(res);
    return res.data.unionid
    // {
    //   "openid": "OPENID",
    //     "nickname": "NICKNAME",
    //       "sex": 1,
    //         "province": "PROVINCE",
    //           "city": "CITY",
    //             "country": "COUNTRY",
    //               "headimgurl": "https://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
    //                 "privilege": ["PRIVILEGE1", "PRIVILEGE2"],
    //                   "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL"
    // }

  }
  async getPhone(code: string) {
    //获取电话号码
    const url = ` https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${this.AccessToken}`
    const res = await cloud.fetch.post(url, {
      code: code
    });
    // const ress = JSON.parse(res);
    return res.data
    // {
    //   "errcode": 0,
    //     "errmsg": "ok",
    //       "phone_info": {
    //     "phoneNumber": "xxxxxx",
    //       "purePhoneNumber": "xxxxxx",
    //         "countryCode": 86,
    //           "watermark": {
    //       "timestamp": 1637744274,
    //         "appid": "xxxx"
    //     }
    //   }
    // }
  }
}


export {
  WXManager
}

