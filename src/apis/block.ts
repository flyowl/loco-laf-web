
import service from './request'

export const listBlocks = async (query:any) => {
  const url = `/api/lowcode/block/search/`;
  const res = await service(
    {
      url: url,
      method: 'get',
      params:query
    }
  )
  return res.data;
}

export const getBlockById = async (id:any) => {
  const url = `/api/lowcode/block/${id}/`;
  const res = await service(url);
  return res.data;
}

export const createBlock = async (block:any) => {
  const url = `/api/lowcode/block/`;
  const res = service.post(url,block)
}


export const getTreeblock = async () => {
  const url = `/api/lowcode/typeblock`;
  const res = await service(url);
  return res.data;
}




export const ListTreeDataType = async () => {
  const url = `/api/lowcode/datatype/treev2/`;
  const res = await service(url);
  return res.data;
}
