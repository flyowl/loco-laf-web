import cloud from '@lafjs/cloud'
import { cache } from '@/public'

const db = cloud.database()
export default async function (ctx: FunctionContext) {
  console.log('Hello World')

  const k = new AuthManager(ctx)

  const b = await k.ClassAuth("64b5fbb3e358efb950c8c3891")
  console.log(b)
  return { data: 'hi, laf' }
}



//核对是否存在管理员权限
function checkAuth(target: any, name: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    if (await this.adminAuth()) {
      return true;
    }
    return originalMethod.apply(this, args);
  }
  return descriptor;
}

class AuthManager<T>{
  private ctx: FunctionContext
  private userId: string
  constructor(ctx: FunctionContext) {
    this.ctx = ctx
    this.userId = ctx.user.userId

  }
  async adminAuth() {
    let data = cache.get("user_" + this.userId)
    if (!data) {
      const { data } = await db.collection('sys_user').doc(this.userId).get()
      await cache.set("user_" + this.userId, data)
      // 用户权限
    }
    if (data.username == 'admin') {
      return true
    }
    return false
  }
  async ClassAuth(classId: string) {
    //根据 班级ID 获取权限相关
    const { data: data } = await db.collection('video_class_user').where({
      classId: classId,
      userId: this.userId
    }).getOne()
    if (data) {
      return true
    }
    return false
  }
  async CourseAuth(courseId: string) {
    //根据 用户ID 获取相关权限
    const { data: data } = await db.collection('video_user').where({
      courseId: courseId,
      userId: this.userId
    }).getOne()
    if (data) {
      return true
    }
    return false
  }

  async VideoAuth(videoId: string) {
    // 视频ID 视频权限
  }

}

export {
  AuthManager
}