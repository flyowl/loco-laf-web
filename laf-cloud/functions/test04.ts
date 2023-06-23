import cloud from '@lafjs/cloud'
import { validateSync, ValidatorOptions, IsInt } from 'class-validator';
import { plainToClass } from 'class-transformer';

function validateJsonToClass<T>(json: any, cls: new () => T, validatorOptions?: ValidatorOptions): boolean {
  const classInstance = plainToClass(cls, json);
  const errors = validateSync(classInstance, { skipMissingProperties: false });
  console.log(errors)
  console.log(classInstance)
  // 检查 JSON 对象中是否存在未知的属性
  const unknownProperties = Object.keys(json).filter((key) => !(key in classInstance));
  if (unknownProperties.length > 0) {
    return false;
  }
  return errors.length === 0;
}


export default async function (ctx: FunctionContext) {

  class UserInfo {
    @IsInt()
    user_id: number;
  }

  const input = {
    user_id: 3,
    user: 1,
  };

  const isValid = validateJsonToClass(input, UserInfo);
  console.log(isValid); // 输出 t


}