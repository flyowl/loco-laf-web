import Joi from 'joi';

/*
用户model模块的编写，控制其数据，如果是超大量数据写入，不使用这个
*/


// 测试
export default async function (ctx: FunctionContext) {
  console.log('Hello World')
  return sys_menu
}

// 默认
const delault = {
  "createBy": Joi.string().default(""),
  "updateBy": Joi.string().default(""),
  "createTime": Joi.date().default(Date.now()),
  "updateTime": Joi.date().default(Date.now()),
  "delFlag": Joi.string().default("0").allow(''),
}


const test = {
  ...delault,
  "deptId": Joi.string(),
  "username": Joi.string().required(),
  "password": Joi.string().default("{sha256}bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a"),
  "phone": Joi.string().default(""),
  "avatar": Joi.string().default(""),
  "nickname": Joi.string().default(""),
  "name": Joi.string().default(""),
  "idNumber": Joi.string().default(""),

}

const sys_user = {
  "deptId": Joi.string().default(""),
  "username": Joi.string().required(),
  "password": Joi.string().default("{sha256}bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a"),
  "phone": Joi.string().default(""),
  "avatar": Joi.string().default(""),
  "nickname": Joi.string().default(""),
  "name": Joi.string().default(""),
  "idNumber": Joi.string().default(""),
  "email": Joi.string().email(),
  ...delault,
  "lockFlag": Joi.string().default(""),
}


const sys_menu = {
  "name": Joi.string().default(""),
  "permission": Joi.string().default("").allow(''),
  "path": Joi.string().default(""),
  "parentId": Joi.string().default("-1"),
  "icon": Joi.string().required().default("icon"),
  "sortOrder": Joi.number().required().default(0),
  "keepAlive": Joi.string().default("0"),
  "menuType": Joi.string().required().default("0"),
  "label": Joi.string().default(""),
  "visible": Joi.string().required().default("0"),
  ...delault
}

export {
  sys_user // 用户信息
  , sys_menu
  , test
}
// 系统信息