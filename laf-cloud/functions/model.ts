import Joi from 'joi';

/*
用户model模块的编写，控制其数据，如果是超大量数据写入，不使用这个
*/


// 测试
export default async function (ctx: FunctionContext) {
  console.log('Hello World')
  return { data: 'hi, laf' }
}



const sys_user = {
  "deptId": Joi.string(),
  "username": Joi.string().required(),
  "password": Joi.string().default("{sha256}bcb15f821479b4d5772bd0ca866c00ad5f926e3580720659cc80d39c9d09802a"),
  "phone": Joi.string().default(null),
  "avatar": Joi.string().default(null),
  "nickname": Joi.string().default(null),
  "name": Joi.string().default(null),
  "idNumber": Joi.string().default(null),
  "email": Joi.string().email(),
  "createBy": Joi.string().default(null),
  "updateBy": Joi.string().default(null),
  "createTime": Joi.date().default(Date.now()),
  "updateTime": Joi.date().default(Date.now()),
  "lockFlag": Joi.string().default(null),
  "delFlag": Joi.string().default(null)
}



export {
  sys_user // 用户信息
}
// 系统信息