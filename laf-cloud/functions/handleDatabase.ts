import cloud from '@lafjs/cloud'
import { validate, validatePut } from '@/public'
import { sys_menu } from '@/model'

export default async function (ctx: FunctionContext) {

  const b = {
    "visible": "1",
    "delFlag": "0",
    "_id": "649596b7ed0171a2acb88f97",
    "name": "权限管理",
    "permission": "",
    "path": "/admin",
    "parentId": "-1",
    "icon": "icon-miyue",
    "sortOrder": 1,
    "keepAlive": "0",
    "menuType": "0",
    "createBy": "admin",
    "updateBy": "admin",
    "label": "权限管理",
    "updateTime": 1679993118089,
    "createTime": 1679993118089,
    "children": [
      {
        "_id": "649596b7ed0171a2acb88f99",
        "name": "角色管理",
        "permission": "",
        "path": "/admin/role/index",
        "parentId": "649596b7ed0171a2acb88f97",
        "icon": "icon-quanxianguanli",
        "sortOrder": 1,
        "keepAlive": "0",
        "menuType": "0",
        "createBy": "admin",
        "updateBy": "admin",
        "delFlag": "0",
        "label": "角色管理",
        "visible": "1",
        "updateTime": 1679993118089,
        "createTime": 1679993118089,
        "__level": 1,
        "__hidden": true
      },
      {
        "_id": "649596b7ed0171a2acb88fa3",
        "name": "菜单管理",
        "permission": "",
        "path": "/admin/menu/index",
        "parentId": "649596b7ed0171a2acb88f97",
        "icon": "icon-caidanguanli",
        "sortOrder": 2,
        "keepAlive": "0",
        "menuType": "0",
        "createBy": "admin",
        "updateBy": "admin",
        "delFlag": "0",
        "label": "菜单管理",
        "visible": "1",
        "updateTime": 1679993118089,
        "createTime": 1679993118089,
        "__level": 1,
        "__hidden": true
      },
      {
        "_id": "649596b7ed0171a2acb88fab",
        "name": "账号管理",
        "permission": "",
        "path": "/admin/user/index",
        "parentId": "649596b7ed0171a2acb88f97",
        "icon": "icon-yonghuguanli",
        "sortOrder": 3,
        "keepAlive": "0",
        "menuType": "0",
        "createBy": "admin",
        "updateBy": "admin",
        "delFlag": "0",
        "label": "账号管理",
        "visible": "1",
        "updateTime": 1679993118089,
        "createTime": 1679993118089,
        "__level": 1,
        "__hidden": true
      },
      {
        "_id": "649633b6838574faf8f9007d",
        "name": "登入",
        "permission": "",
        "path": "/user/login",
        "parentId": "649596b7ed0171a2acb88f97",
        "icon": "icon-caidanguanli",
        "sortOrder": 2,
        "keepAlive": "0",
        "menuType": "0",
        "createBy": "admin",
        "updateBy": "admin",
        "delFlag": "0",
        "label": "登入",
        "visible": "1",
        "updateTime": 1679993118089,
        "createTime": 1679993118089,
        "__level": 1,
        "__hidden": true
      },
      {
        "_id": "6496385a838574faf8f9007e",
        "name": "首页",
        "permission": "",
        "path": "/welcome",
        "parentId": "649596b7ed0171a2acb88f97",
        "icon": "icon-caidanguanli",
        "sortOrder": 2,
        "keepAlive": "0",
        "menuType": "0",
        "createBy": "admin",
        "updateBy": "admin",
        "delFlag": "0",
        "label": "首页",
        "visible": "1",
        "updateTime": 1679993118089,
        "createTime": 1679993118089,
        "__level": 1,
        "__hidden": true
      }
    ],
    "__level": 0,
    "__hidden": false
  }
  // const { error, value } = await validate(test, b)

  // console.log(error)
  // console.log(value)

  const db = new Database("sys_menu")
  const { _id, ...data } = b
  const [id, error] = await db.put(_id, sys_menu, data)

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

  async get(id: string): Promise<T> {
    const db = cloud.database();
    const { data } = await db.collection(this.collectionName).doc(id).get();
    return data ? data as T : null;
  }
  async list(page: number = 1, pageSize: number = 10, query: object = {}) {
    const db = cloud.database();
    console.log(page, pageSize, query)
    const { data } = await db.collection(this.collectionName)
      .where(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
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

  async post(validatedata: T, data: T) {
    const db = cloud.database();
    const { error, value } = await validate(validatedata, data)
    if (error) {
      return [false, error.message]
    }
    const { id, ok } = await db.collection(this.collectionName).add(value);
    return [ok, ok ? id : null];
  }

  async put(id: string, validatedata: T, data: T) {
    const { error, value } = await validatePut(validatedata, data)
    if (error) {
      return [false, error.message]
    }
    const db = cloud.database();
    const { ok } = await db.collection(this.collectionName).doc(id).update(value);
    return [ok, null];
  }

  async del(id: string): Promise<boolean> {
    const db = cloud.database();
    const { ok } = await db.collection(this.collectionName).doc(id).remove();
    return ok;
  }
}

export {
  Database  // 单表操作
};