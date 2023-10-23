import cloud from '@lafjs/cloud'
const DB = cloud.database()

export default async function (ctx: FunctionContext) {
  console.log('Hello World')
  return { data: 'hi, laf' }
}





async function selectDefauleSchema() {
  const { data: roles } = await DB.collection("sys_schema_history")
    .where({ isdefault: 1 })
    .getOne()
  return roles
}

async function selectDefauleAssets() {
  const { data: roles } = await DB.collection("sys_assets")
    .where({ is_default: 1 })
    .getOne()
  return roles
}

async function getAssets(id: string = null) {
  //assetsId

  let query = {}
  if (id) {
    query = { _id: id }
  } else {
    query = { is_default: 1 }

  }
  const { data: roles } = await DB.collection("sys_assets")
    .where(query)
    .getOne()
  return roles.data
}


export {
  selectDefauleSchema,
  selectDefauleAssets,
  getAssets
}