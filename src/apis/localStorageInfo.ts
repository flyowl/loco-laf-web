export const setLocalStorageInfo = (key: string, info: any) => {
  localStorage.setItem(key, JSON.stringify(info));
};
// export const setSessionStorageInfo = (key: string, info: any) => {
//   sessionStorage.setItem(key, JSON.stringify(info));
// };

export const getLocalStorageInfo = (key: string) => {
  return window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : null;
};

export const getSessionStorageInfo = (key: string) => {
  return window.sessionStorage.getItem(key)
    ? JSON.parse(window.sessionStorage.getItem(key))
    : null;
};

const setCookie = (cname: string, cvalue: string, exdays: number) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires;
};


export const GetLToken = () => {
  return localStorage.getItem('Authorization');
};
export const SetToken = (info:String) => {
  return localStorage.setItem('Authorization','JWT '+info);
};
export const ClearToken = () => {
  localStorage.removeItem("Authorization")
};

export const SetDictionary = (data:any) => {
  localStorage.setItem("Dictionary",data)
};

export const SetEditor = (data:any) => {
  localStorage.setItem("system_info",JSON.stringify(data))
};
export const GetDictionary = (info:string,value:any=null) => {
  const data:Array<any> = JSON.parse(localStorage.getItem('Dictionary')||"")
  if (data.hasOwnProperty(info)){
    return data[info].children

  }else {
    return []
  }
};
export const GetEditInfo = (info:string) => {
  const data:Object = JSON.parse(localStorage.getItem('system_info')||"")
  return data[info] 
}

