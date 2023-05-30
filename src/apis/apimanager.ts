import service from './request'

export const listApimanager = async (query:any) => {
  const url = `/api/lowcode/apimanager/`;
  const res = await service(
    {
      url: url,
      method: 'get',
      params:query
    }
  )
  return res.data;
}

export const createApimanager = async (block:any) => {
    const url = `/api/lowcode/apimanager/`;
    const res = service.post(url,block)
  }



export const ApimanagerTree = async (query:any) => {
  const url = `/api/lowcode/apimanager/tree/`;
  const res = await service(
    {
      url: url,
      method: 'get',
      params:query
    }
  )
  return res.data;
}
