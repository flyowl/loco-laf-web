import cloud from '@lafjs/cloud'
import { Response } from '@/global-response'
import { sys_user } from '@/model'
import { Database } from '@/handleDatabase'
import { WXManager } from '@/WXManager'

const db = new Database("sys_user")

// 基于微信登入 post数据


const DB = cloud.database()


const wx = new WXManager(cloud.env.AppId, cloud.env.appSecret)

export default async function (ctx: FunctionContext) {
  const { code, nickname, avatar } = ctx.body

  if (!code) {
    return Response.failed("无效的code")
  }

  //获取openI的
  const openId = await wx.getOpenId(code)
  console.log("===", openId)
  if (!openId) {
    return Response.failed("无效的微信code")
  }
  //创建账号，如果存在账号 
  if (nickname) {
    let body = {
      username: openId,
      avatar: avatar,
      nickname: nickname,
    }

    const [id, error] = await db.post(sys_user, body)
    if (!id) {
      return Response.failed(String(error))
    }
    //登入
    const { data: user } = await DB.collection('sys_user')
      .where({ _id: id })
      .getOne()
    return Response.ok(await getReturnToken(user))
  }


  //如果存在则直接登入
  const { data: user } = await DB.collection('sys_user')
    .where({ username: openId })
    .getOne()
  if (user) {
    return Response.ok(await getReturnToken(user))
  } else {
    return Response.ok({ status: false })
  }


  return Response.failed("无效的数据")

}


async function getReturnToken(user: any) {
  let exp = Math.floor(Date.now() / 1000) + 86400 * 30
  const access_token = cloud.getToken({
    userId: user._id,
    username: user.username,
    exp: exp
  })
  const returndata = {
    access_token: access_token,
    // refresh_token: refresh_token,
    exp: exp,
    id: user._id,
    username: user.username,
    nickname: user.nickname,
    status: true
  }
  return returndata
}

