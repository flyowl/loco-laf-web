/*
公共函数位置
*/
import Joi from 'joi';


// 测试
export default async function (ctx: FunctionContext) {
  const sys_menu = {
    "name": Joi.string().default(null).allow(''),
    "permission": Joi.string().default(null).allow(''),
    "path": Joi.string().default(null).allow(''),
    "parentId": Joi.string().default("-1"),
    "icon": Joi.string().required().default("icon"),
    "sortOrder": Joi.number().required().default(0),
    "keepAlive": Joi.string().required().default("0"),
    "menuType": Joi.string().required().default("0"),
    "label": Joi.string().required().default(null),
    "visible": Joi.string().required().default("0"),
  }

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



  const { error, value } = await validatePut(sys_menu, b);
  if (error) {
    console.log(error.message)
  } else {
    console.log(value)
    return value
  }

  console.log('Hello World')
  return { data: 'hi, laf' }
}


async function validate(schema: any, jsonData: any) {
  for (const key in jsonData) {
    if (!schema.hasOwnProperty(key)) {
      delete jsonData[key]
    }
  }
  const userSchema = Joi.object(schema);
  const { value, error } = userSchema.validate(jsonData);
  return { error, value }
}

async function validatePut(schema: any, jsonData: any) {
  for (const key in schema) {
    if (!jsonData.hasOwnProperty(key)) {
      delete schema[key]
    }
  }
  for (const key in jsonData) {
    if (!schema.hasOwnProperty(key)) {
      delete jsonData[key]
    }
  }
  const userSchema = Joi.object(schema);
  const { value, error } = userSchema.validate(jsonData);
  return { error, value }
}


// 信息返回
class Response<T> {
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

  public static failed(msg: string = 'error', code: number = 400) {
    return new Response(code, msg, false)
  }
}


// 树结构
function findChildren(data, parentId) {
  return data.filter(item => item.p_id === parentId)
    .map(item => ({
      ...item,
      children: findChildren(data, item._id)
    }));
}

export {
  validate // 解决单表post数据问题
  , validatePut  //解决单表put数据问题
  , Response // 接口返回
  , findChildren //树结构返回
}

