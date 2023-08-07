import cloud from '@lafjs/cloud'
import { validate, validatePut, NowData } from '@/public'
import { sys_menu } from '@/model'

const db = cloud.database();


export default async function (ctx: FunctionContext) {

  const b = { "visible": "1", "delFlag": "0", "_id": "649596b7ed0171a2acb88f97", "name": "权限管理", "permission": "", "path": "/admin", "parentId": "-1", "icon": "set", "sortOrder": 1, "keepAlive": "0", "menuType": "0", "createBy": "admin", "updateBy": "admin", "label": "权限管理", "updateTime": "2023-03-28T08:45:18.089Z", "createTime": "2023-03-28T08:45:18.089Z", "__level": 0, "__hidden": false }
  // const { error, value } = await validate(test, b)

  // console.log(error)
  // console.log(value)
  const db = new Database("sys_menu")
  const { _id, ...data } = b
  const [id, error] = await db.put(_id, sys_menu, data, ctx.user.userId)

  // const id = await db.put("64964c43ed0171a2acb890b1", test, b)

  // const id = await db.list(1, 10)
  console.log(id)
  console.log(error)

  return { data: 'hi, laf' }
}

class Database<T> {
  private collectionName: string;
  constructor(collectionName: string) {
    this.collectionName = collectionName;

  }

  async get(query: any, field: any = {}): Promise<T> {
    const { data } = await db.collection(this.collectionName).where(query).field(field).getOne();
    return data ? data as T : null;
  }
  async list(page: number = 1, pageSize: number = 10, query: object = {}, field: any = {}) {
    const { data } = await db.collection(this.collectionName)
      .where(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize).field(field)
      .get();
    const { total } = await db.collection(this.collectionName)
      .where(query)
      .count();
    const res = {
      total: total,
      page: page,
      pageSize: total < pageSize ? total : pageSize,
      data: data
    }
    return res
  }

  async post(validatedata: T, data: T, userId: string = null) {
    const { error, value } = await validate(validatedata, data)
    if (error) {
      return [false, error.message]
    }
    value.createBy = userId
    value.updateBy = userId
    value.createTime = NowData()
    value.updateTime = NowData()
    const { id, ok } = await db.collection(this.collectionName).add(value);
    return [id, ok ? id : null];
  }

  async put(id: string, validatedata: T, data: T, userId: string = null) {
    const { error, value } = await validatePut(validatedata, data)
    if (error) {
      return [false, error.message]
    }
    value.updateBy = userId
    value.updateTime = NowData()
    const { ok } = await db.collection(this.collectionName).doc(id).update(value);
    return [ok, null];
  }

  async del(id: string): Promise<boolean> {
    const { ok } = await db.collection(this.collectionName).doc(id).remove();
    return ok;
  }
  collection(databaseName: string = null) {
    if (databaseName) {
      return db.collection(databaseName)
    } else {
      return db.collection(this.collectionName)
    }
  }
  async db(collectionName: string = null) {
    if (collectionName) {
      return db.collection(collectionName)
    }

    return db.collection(this.collectionName)
  }

}

export {
  Database  // 单表操作
};