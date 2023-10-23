import cloud from '@lafjs/cloud'
import { Response } from '@/utils/public'

// 菜单访问

const DB = cloud.database()
const DB_NAME = {
  SYS_USER: 'sys_user',
  SYS_ROLE: 'sys_role',
  SYS_MENU: 'sys_menu',
  SYS_ROLE_MENU: 'sys_role_menu',
  SYS_USER_ROLE: 'sys_user_role'
}

export async function main(ctx: FunctionContext) {
  const tree = await selectUserPermissionByRoleIds()
  return Response.ok(tree)
}

async function selectUserPermissionByRoleIds() {
  const cmd = DB.command
  const { data: permissions } = await DB.collection(DB_NAME.SYS_MENU)
    .where({ menuType: cmd.in(["0", "1"]) }).orderBy("sortOrder", "asc").field({schema:0})
    .get()
  return buildTree(permissions)
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


