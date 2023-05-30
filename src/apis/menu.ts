

import service from './request'
import { SetDictionary } from './localStorageInfo';

export const listFiles = async () => {
  const url = `/api/lowcode/route`;
  const res = await service(url);
  return res.data.data;
}

export const listMenus = async (query:any) => {
    const url = `/api/system/menu/web_router/`;
    const res = await service(
      {
        url: url,
        method: 'get',
        params:{...query,limit:999}
      }
    )
    return res.data.data;
  }

  export const OneMenus = async (menuid:any) => {
    const url = `/api/system/menu/`+menuid+'/';
    const res = await service(
      {
        url: url,
        method: 'get',

      }
    )
    return res.data;
  }



  export const list_Route_Menus = async (query:any) => {
    const url = `/api/system/menu/web_router/`;
    const res = await service(
      {
        url: url,
        method: 'get',
        params:{...query,limit:999}
      }
    )
    // let menuList=[]
    // res.data.data.forEach(item=>{
    //   //console.log(item,'item---- 菜单权限---')
    //   menuList = menuList.concat(item.menuPermission)
    // })
    // let menu = Array.from(new Set(menuList))
    // localStorage.setItem('menuList', JSON.stringify(menu))
    return res.data.data;
  }




  export const allDictionary = async () => {
    const url = `/api/init/dictionary/?dictionary_key=all`;
    const res = await service.get(url) .then((res) => {
      if (res.code == 2000) {
        SetDictionary(JSON.stringify(res.data.data))
      } 
    });
};
    // return res.data.data;

    export const listApp = async (query:any) => {
      const url = `/api/system/appmanager/getpathdata/`;
      const res = await service(
        {
          url: url,
          method: 'get',
          params:{...query}
        }
      )
      return res;
    }
    export const listAppchoice = async (query:any) => {
      const url = `/api/system/appmanager/choice/`;
      const res = await service(
        {
          url: url,
          method: 'get',
          params:{...query}
        }
      )
      return res.data.data;
    }
  

    export const GetlistApp = async (query:any) => {
      const url = `/api/system/appmanager/`;
      const res = await service(
        {
          url: url,
          method: 'get',
          params:{...query}
        }
      )
      return res.data.data;
    }
  