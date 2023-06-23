/*
公共函数位置
*/
import Joi from 'joi';


// 测试
export default async function (ctx: FunctionContext) {
  const user = {
    name: Joi.string().required(),
    email: Joi.string().email().default('123@sdf.com'),
    age: Joi.number().integer().min(15).max(120).required()
  }

  const validUser = {
    name: 'Alice',
    // email: 'alic@eexample.com',
    // age: 16,
  };

  // console.log(b)

  for (const key in user) {
    if (!validUser.hasOwnProperty(key)) {
      console.log(key)
      delete user[key]
    }
  }


  const { error, value } = validatePut(user, validUser);
  if (error) {
    console.log(error.message)
  } else {
    console.log(value)
    return value
  }

  console.log('Hello World')
  return { data: 'hi, laf' }
}


function validate(schema: any, jsonData: any) {
  const userSchema = Joi.object(schema);
  const { value, error } = userSchema.validate(jsonData);
  return { error, value }
}

function validatePut(schema: any, jsonData: any) {
  for (const key in schema) {
    if (!jsonData.hasOwnProperty(key)) {
      delete schema[key]
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

