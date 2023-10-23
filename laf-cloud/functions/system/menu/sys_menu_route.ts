import cloud from '@lafjs/cloud'
import { Response } from '@/utils/public'

// 菜单访问

const DB = cloud.database()
const DB_NAME = {
  SYS_USER: 'sys_user',
  SYS_ROLE: 'sys_role',
  SYS_MENU: 'sys_menu',
}

export async function main(ctx: FunctionContext) {

  const userId = ctx.user?.userId
  const username = ctx.user?.username || ""
  const user = await selectOneByUserId(userId)
  if (!user) {
    return Response.failed('非法请求', 401)
  }
  if (user?.roleList.leight == 0) {
    return Response.failed('无权限', 401)
  }

  if (username == "admin") {
    const tree = await selectUserPermissionByRoleId()
    return Response.ok(tree)
  }

  const sd = await selectUserRoleByUserId(user.roleList)

  const tree = await selectUserPermissionByRoleIds(sd)
  return Response.ok(tree)
}


async function selectOneByUserId(id: string[]) {
  const { data: user } = await DB.collection(DB_NAME.SYS_USER)
    .where(
      { "_id": id }
    )
    .getOne()
  return user
}

async function selectUserPermissionByRoleIds(menuIdList: string[]) {
  const cmd = DB.command

  const { data: permissions } = await DB.collection(DB_NAME.SYS_MENU)
    .where({ menuType: cmd.in(["0", "1"]), _id: cmd.in(menuIdList) }).orderBy("sortOrder", "asc").field({ schema: 0 })
    .get()
  return buildTree(permissions)
}

async function selectUserRoleByUserId(roleList: string[]) {
  const { data: roles } = await DB.collection(DB_NAME.SYS_ROLE)
    .where(
      {
        _id: {
          $in: roleList
        }
      }
    ).field({ menuList: 1, _id: 0 })
    .get()

  const merged = roles.reduce((result, item) => {
    if (item.menuList) {
      result.push(...item.menuList);
    }
    return result;
  }, []);

  const unique = Array.from(new Set(merged.filter(Boolean)));

  return unique
}

function buildTree(permissions: any) {
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
    if (permissions[i].parentId === '-1') {
      tree.push(permissions[i]);
    }
  }
  return tree;
}

async function selectUserPermissionByRoleId() {
  const cmd = DB.command
  const { data: permissions } = await DB.collection(DB_NAME.SYS_MENU)
    .where({ menuType: cmd.in(["0", "1"]) }).orderBy("sortOrder", "asc").field({ schema: 0 })
    .get()

  return buildTree(permissions)
}


