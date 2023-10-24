import cloud from '@lafjs/cloud'
import { EJSON } from 'bson'
import { Document, OptionalId } from "mongodb";
const db = cloud.database();
export default async function (ctx: FunctionContext) {

  const key = 'sys_menu'

  try {
    const data = (
      await cloud.fetch("https://oss.laf.run/gvfh2x-database/BackupDB/sys_menu/0.json"
      )
    ).data;
    console.log(typeof data)
    // 插入数据
    const collection = cloud.mongo.db.collection(key);
    // 将字符串解析为对象数组
    const dataArray = EJSON.parse(JSON.stringify(data), { relaxed: false }) as OptionalId<Document>[];
    console.log(dataArray)
    await collection.insertMany(dataArray);
    console.log(`插入${key}表批数据成功`);

  } catch (error) {
    console.log("插入失败：", error);
    return { data: error };
  }
}
