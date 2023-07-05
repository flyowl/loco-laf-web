/*
公共函数位置
*/
import Joi from 'joi';
import cloud from '@lafjs/cloud'

// 为后面的redis做准备
const cache = cloud.shared

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


function NowData() {
  // 获取当前时间的东八区时间
  const date = new Date();
  const offset = 8; // 东八区偏移量为 +8

  // 计算当前时间的 UTC 时间，再加上偏移量得到东八区时间
  const utcTime = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
  const beijingTime = new Date(utcTime + (offset * 60 * 60 * 1000));
  return beijingTime
}
function buildTree(permissions: any, panrentData: any = "-1") {
  let tree = [];
  for (let i = 0; i < permissions.length; i++) {
    let arr = [];
    for (let j = 0; j < permissions.length; j++) {
      if (permissions[i]._id === permissions[j].parentId) {
        permissions[i].children = arr;
        arr.push(permissions[j]);
      }
    }
  }
  for (let i = 0; i < permissions.length; i++) {
    if (permissions[i].parentId === panrentData) {
      tree.push(permissions[i]);
    }
  }
  return tree;
}

async function authInit() {
  const db = cloud.database()

  const _ = db.command;

  const { data } = await db
    .collection("sys_role").field({ menuList: 1 }).get()
  const authList = {}
  for (const a of data) {
    const { data: menu } = await db
      .collection("sys_menu").where({
        _id: _.in(a.menuList)
      }).field({ _id: 0, permission: 1 }).get()

    const permissions = Array.from(new Set(menu.map(item => item.permission)));
    authList[a._id] = permissions
  }
  await cache.set('auth', authList); // 设置一个缓存
  return authList
}

export {
  cache
  , validate // 解决单表post数据问题
  , validatePut  //解决单表put数据问题
  , Response // 接口返回
  , findChildren //树结构返回
  , NowData //获取当前时间
  , buildTree //树结构
  , authInit // 权限缓存到内存
}

