
import service from './request'

export const listFiles = async () => {
  const url = `/api/lowcode/route`;
  const res = await service(url);
  return res.data;
}

export const getFileById = async (id) => {
  const url = `/api/lowcode/route/${id}`;
  const res = await service(url);
  return res.data;
}

export const createFile = async (file:any) => {
  const url = `/api/lowcode/route`;
  
  const res = await service.post(url,file)
  return res.data;
}