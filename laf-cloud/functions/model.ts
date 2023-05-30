import cloud from '@lafjs/cloud'

export interface Role {
  roleId: string
}

export interface Menu {
  menuId: string
}

export interface User {
  _id: string,
  name: string
}

export interface Permission {
  permission: string
}