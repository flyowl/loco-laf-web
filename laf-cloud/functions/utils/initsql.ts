import cloud from '@lafjs/cloud'
import { sys_user, sys_post, sys_menu, sys_dept, sys_dict } from '@/model'
import { Database } from '@/handleDatabase'
const db = cloud.database()

// 用于初始化数据库 


const sys_user_data = {
  "username": "admin",
  "password": "{sha256}b280631e867c2041f9b4782951157d71930b123a80ea45793a357e9d72760d8f",
  "nickname": "超级管理员",
  "email": "laf@laf.run",
  "createBy": "admin",
}
  
const sys_role = {
  "roleName": "系统管理员",
  "roleCode": "ROLE_ADMIN",
  "roleDesc": "系统管理员",
  "dsType": 0,
}

  
const sys_dept_data = {
  "name": "人文教育学院",
  "sortOrder": 1,
  "parentId": "0",
}
  
const sys_dict_data = {
  "_id": "64a03dc5838574faf8f9007f",
  "label": "合适的",
  "value": "0",
  "type": "0",
  "children": [
    {
      "label": "1",
      "value": "0",
      "color": "#FFFFFF",
      "editMode": false,
      "origin-label": "abvsdf"
    },
    {
      "id": "id-sygifc",
      "editMode": false,
      "label": "2",
      "value": "1"
    }
  ]
}
  
const sys_post_data = {
  "postCode": "CTO",
  "postName": "校长",
  "postSort": 1,
  "remark": "校长",
}
  
const sys_menu_data = {
  "name": "权限管理",
  "permission": "",
  "path": "/admin",
  "parentId": "-1",
  "icon": "set",
  "sortOrder": 1,
  "menuTyped": "1",
  "keepAlive": "0",
  "menuType": "0",
  "label": "权限管理",
  "visible": "1",
}





export default async function (ctx: FunctionContext) {

  let db = new Database('sys_user')
  if (!db.isExists()) {
    let d = await db.post(sys_user, sys_user_data)
    console.log(d)
  } else {
    console.log("已存在数据库sys_user")
  }
  db = new Database('sys_dept')
  if (!db.isExists()) {
    const d = await db.post(sys_dept, sys_dept_data)
    console.log(d)
  } else {
    console.log("已存在数据库sys_dept")
  }
  db = new Database('sys_dict')
  if (!db.isExists()) {
    const d = await db.post(sys_dict, sys_dict_data)
    console.log(d)
  } else {
    console.log("已存在数据库sys_dict")
  }
  db = new Database('sys_post')
  if (!db.isExists()) {
    const d = await db.post(sys_post, sys_post_data)
    console.log(d)
  } else {
    console.log("已存在数据库sys_post")
  }
  db = new Database('sys_menu')
  if (!db.isExists()) {
    const d = await db.post(sys_menu, sys_menu_data)
    console.log(d)
  } else {
    console.log("已存在数据库sys_menu")
  }
}


