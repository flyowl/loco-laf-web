import cloud from '@lafjs/cloud'
import captcha from 'svg-captcha'
import nodemailer from "nodemailer";
import Dysmsapi, * as dysmsapi from "@alicloud/dysmsapi20170525";
import * as OpenApi from "@alicloud/openapi-client";
import * as Util from "@alicloud/tea-util";

const db = cloud.database()

export async function main(ctx: FunctionContext) {
  const data = await codePhone('18170910512')
  console.log(data)
  return data
  // let data = null
  // switch (type) {
  //   case 2: // 发送邮箱认证码
  //     data = await codeEmail(value)
  //     console.log(data, 'data')
  //     return data
  //     break
  //   case 3: // 发送手机认证码
  //     data = await codePhone('18170910512')
  //     return data
  //     break
  //   default: // 默认登录认证码 svg
  //     data = await codeSvg()
  //     return data
  // }

}


export async function codeSvg() {
  const options = {
    size: 4, // 验证码长度为4
    ignoreChars: '0oO1IiLl', // 不包含字符"0oO1IiLl"
    noise: 3, // 噪点数量为1个
    color: true, // 验证码彩色显示
    background: '#EEE', // 背景颜色
    charPreset: "12345689", // 默认是数字+字母，这里改成纯数字
  }
  const captchaData = captcha.create(options)   // 生成验证码数据

  // 保存验证码到数据库
  const db = cloud.database()
  let { id } = await db.collection('codes')
    .add({
      type: 1,
      code: captchaData.text.toLocaleLowerCase(),
      createdAt: new Date(),
      expiredAt: new Date(Date.now() + 5 * 60 * 1000), // 验证码5分钟后过期
    })
  return ({
    ok: true,
    msg: '',
    data: {
      id,
      svg: captchaData.data
    }
  })
  // ctx.response.type('svg').send(captchaData.data) // 返回验证码图片
}

export async function codeEmail(email: String) {
  // 校验 email 是否为有效的邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.toString())) {
    return { error: "邮箱地址错误!" };
  }

  // 生成一个6位随机数字验证码,记录为 code
  const code = Math.floor(100000 + Math.random() * 900000);
  // 使用QQ邮箱发送邮件到 email 地址,邮件内容为:你正在使用laf,验证码为:code.
  const transportConfig = {
    host: "smtp.qq.com",
    port: 465,
    secureConnection: true,
    auth: {
      user: "110@qq.com",
      pass: "uyzrxxxxxxxxx",
    },
  };
  const mailOptions = {
    from: '"<laf>" <110@qq.com>',
    to: email,
    subject: "注册验证码",
    html: `您的注册验证码为：${code},5分钟内有效!`,
  };
  const transporter = nodemailer.createTransport(transportConfig);
  const { messageId } = await transporter.sendMail(mailOptions)
  if (messageId) {
    let { id } = await db.collection("codes").add({
      type: 2,
      name: email,
      code,
      createdAt: new Date(),
      expiredAt: new Date(Date.now() + 5 * 60 * 1000), // 验证码5分钟后过期
    });
    return {
      ok: true,
      msg: '验证码已发送到邮箱,请注意查收!',
      data: id
    }
  }
}

export async function codePhone(phone: String) {
  console.log('-', phone)
  const accessKeyId = cloud.env.accessKeyId;  // 阿里key
  const accessKeySecret = cloud.env.accessKeySecret; // 阿里access
  const signName = cloud.env.signName;  // 短信签名
  const templateCode = cloud.env.templateCode; // 短信模板
  const endpoint = cloud.env.endpoint;

  const code = Math.floor(Math.random() * 900000 + 100000); // 生成6位随机验证码
  const sendSmsRequest = new dysmsapi.SendSmsRequest({
    phoneNumbers: phone,
    signName,
    templateCode,
    templateParam: `{"code":${code}}`,
  });
  const config = new OpenApi.Config({ accessKeyId, accessKeySecret, endpoint });
  const client = new Dysmsapi(config);
  const runtime = new Util.RuntimeOptions({});
  const { body } = await client.sendSmsWithOptions(sendSmsRequest, runtime); // 发送短信
  console.log(body)
  if (body.code === 'OK' && body.message === 'OK') {

    cloud.shared.set(`${phone}-sms`, code);
    setTimeout(() => {
      cloud.shared.delete(`${phone}-sms`);
    }, 300000);
    return true
  } else {
    return false
  }
}

