import service from './request'


export const getUserInfo = async () => {
    const url = `/api/system/user/user_info/`;
    const res = await service(url);
    
    return res.data;
  }