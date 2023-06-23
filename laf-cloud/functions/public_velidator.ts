import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export default async function (ctx: FunctionContext) {
  return { data: 'hi, laf' }
}

export function Verlidator(classdata: any, data: any) {
  // 是否存在未知类型

  const inputAsClassInstance = plainToClass(
    classdata, data
  );

  const keys = Object.keys(data);
  for (const key of keys) {
    if (!(key in classdata)) {
      return ['无效的参数'];
    }
  }
  const errors = validate(inputAsClassInstance)

  return errors
}

