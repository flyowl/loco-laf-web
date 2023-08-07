import cloud from '@lafjs/cloud'
import { S3 } from "@aws-sdk/client-s3"
import { Response } from '@/global-response'
import { Database } from '@/handleDatabase'
import { sys_file } from '@/model'
const db = new Database("sys_file")

export default async function (ctx: FunctionContext) {
  // Create your bucket first
  const { typed = 0, api = 'deaults' } = ctx.body


  const BUCKET = cloud.env.ossName
  console.log('-', "BUCKET")
  const client = new S3({
    region: cloud.env.OSS_REGION,
    endpoint: cloud.env.OSS_EXTERNAL_ENDPOINT,
    credentials: {
      accessKeyId: cloud.env.OSS_ACCESS_KEY,
      secretAccessKey: cloud.env.OSS_ACCESS_SECRET,
    },
    forcePathStyle: true,
  })

  const file = ctx.files[0]
  console.log(file)
  const stream = require('fs').createReadStream(file.path)
  const path = await getYearMonth() + ctx.files[0].filename
  const res = await client.putObject({
    Bucket: 'gvfh2x-web',
    Key: path,
    Body: stream,
    ContentType: file.mimetype,
  })

  const ossurl = cloud.env.ossurl
  let re = {
    VersionId: res.VersionId,
    url: ossurl + path,
    typed: typed
  }

  const [id, error] = await db.post(sys_file, re, ctx.user?.userId)
  if (!id) {
    return Response.failed(String(error))
  }

  re._id = id
  if (api === 'deaults') {
    return Response.ok(re)
  }

  const succMap = {}

  succMap[file.originalname] = ossurl + path

  if (api === 'vditor') {
    const b = {
      "msg": "",
      "code": 0,
      "data": {
        // "errFiles": [],
        "succMap": succMap
      }
    }
    return b
  }

  if (api == 'fusion') {
    const c =
      [
        {
          "success": true,
          // "message": "上传成功",                                  // success=false 时候可以展示错误
          "url": ossurl + path,           // 返回结果
          // "imgURL": ossurl + path,        // 图片预览地址 (非必须)
          // "downloadURL": ossurl + path    // 文件下载地址 (非必须)
        }
      ]


    return c

  }

}



async function getYearMonth() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // 月份从 0 开始，所以需要加 1
  return `${year}\/${month}\/`
}
