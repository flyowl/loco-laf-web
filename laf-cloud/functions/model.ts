import Joi from 'joi';
import { NowData } from '@/public'
import cloud from "@lafjs/cloud";

/*
用户model模块的编写，控制其数据，如果是超大量数据写入，不使用这个
*/


// 测试
export default async function (ctx: FunctionContext) {
  console.log('Hello World')

  unique('sys_role', { roleCode: 1 })

  // await db.collection("users").createIndex({ username: 1 }, { unique: true })


  // return sys_menu
}
// 唯一性索引的设置
function unique(databasename: string, query: object) {

  const DB = cloud.database();
  const id = DB.collection(databasename).createIndex(query, { unique: true })
  console.log(id)

}

// 默认
const delault = {
  "createBy": Joi.string().default(null).allow("").allow(null),
  "updateBy": Joi.string().default("").default(null).allow("").allow(null),
  "createTime": Joi.date().default(NowData()),
  "updateTime": Joi.date().default(NowData()),
  "delFlag": Joi.string().default("0").allow('').allow(null),
  "description": Joi.string().default(null).allow(null).allow(""),
}


const test = {
  ...delault,
  "deptId": Joi.string(),
  "username": Joi.string().required(),
  "password": Joi.string().default("{sha256}bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a"),
  "phone": Joi.string().default(""),
  "avatar": Joi.string().default("").allow(null).allow(""),
  "nickname": Joi.string().default(""),
  "name": Joi.string().default(""),
  "idNumber": Joi.string().default(""),
}

const sys_user = {
  "deptId": Joi.string().default(""),
  "username": Joi.string().required(),
  "password": Joi.string().default("{sha256}bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a"),
  "phone": Joi.string().default(""),
  "avatar": Joi.string().default("").allow(null).allow(""),
  "nickname": Joi.string().default(""),
  "email": Joi.string().email(),
  ...delault,
  "lockFlag": Joi.string().default(""),
  "roleList": Joi.array()
    .items(Joi.string()).default([]),
  "postList": Joi.array()
    .items(Joi.string()).default([]),
}


const sys_menu = {
  "name": Joi.string().default(null).allow(""),
  "permission": Joi.string().default(null).allow("").allow(null),
  "path": Joi.string().allow(null).allow(""),
  "parentId": Joi.string().default("-1"),
  "icon": Joi.string().default("icon").allow(null).allow(""),
  "sortOrder": Joi.number().required().default(0),
  "keepAlive": Joi.string().default("0").allow(null),
  "menuType": Joi.string().required().default("0"),
  "label": Joi.string().default(null).allow(null),
  "visible": Joi.string().default("0"),
  ...delault
}



const sys_dept = {
  "name": Joi.string().default(null).allow(null).required(),
  "parentId": Joi.string().default("0"),
  "sortOrder": Joi.number().required().default(0),
  ...delault
}

const sys_post = {
  "postCode": Joi.string().required(),
  "postName": Joi.string().required(),
  "postSort": Joi.number().required().default(0),
  "remark": Joi.string().default(null).allow(null),
}

const sys_role = {
  "roleName": Joi.string().required(),
  "roleCode": Joi.string().required(),
  "roleDesc": Joi.string().default(null).allow(null),
  "menuList": Joi.array()
    .items(Joi.string()).default([]),
  "dsType": Joi.number().default(0),
  "dsScope": Joi.string().default(null).allow(null).allow(""),

}

const sys_block = {
  "name": Joi.string().required(),
  "screenshot": Joi.string().required(),
  "schema": Joi.string().required(),
  "typed_id": Joi.string().allow(null).allow(""),
}


const sys_assets = {
  "name": Joi.string().required(),
  "version": Joi.string().required().allow(null).allow(""),
  "data": Joi.string().required(),
  "is_default": Joi.number().default(0).required()
}

const sys_typed = {

}

const sys_role_menu = {
  roleId: Joi.string().required(),
  menuId: Joi.string().required(),
}

const sys_dict = {
  ...delault,
  label: Joi.string().required(),
  value: Joi.string().required(),
  type: Joi.string().required().default("0"),
  children: Joi.array()
    .items().default([]),

}

export {
  sys_user // 用户信息
  , sys_menu
  , test
  , sys_dept //部门
  , sys_post // 岗位
  , sys_role //角色
  , sys_block //低代码区块
  , sys_assets // 低代码物料管理
  , sys_typed // 低代码类型管理
  , sys_role_menu // 角色-菜单
  , sys_dict //系统字典
}
// 系统信息