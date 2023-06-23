import cloud from '@lafjs/cloud'
import { IsInt, IsString } from "class-validator";
import { Verlidator } from '@/public_velidator'



class UserInfo {
  @IsInt()
  user_id: number;
  @IsString()
  user: string
}

export default async function (ctx: FunctionContext) {
  console.log('Hello World')
  const input = {
    user_id: 3,
    user: 1
  };


  const status = await Verlidator(UserInfo, input)

  console.log(status)
  return { data: 'hi, laf' }



}