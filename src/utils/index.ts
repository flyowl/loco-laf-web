import { Tag,Notification } from '@alifd/next';

export const openNotification = (type: any, content: string) => {
  Notification.open({
    title: '消息通知',
    content: content,
    type,
  });
};

// 平级转树结构
/* treeArr 基础数据
 * id 唯一id
 * 更改的唯一id
 * parentId 父级id
 * 更换的父级id
 * childrenList 子级数组名*/
export const delTreeData = (treeArr: any, id: any, parentId: any, childrenList: any) => {
  // 数据克隆
  let cloneData = JSON.parse(JSON.stringify(treeArr));
  return cloneData.filter((fatherItem: any) => {
    let warpArr = cloneData.filter((sonItem: any) => fatherItem[id] == sonItem[parentId]);
    warpArr.length ? (fatherItem[childrenList] = warpArr) : (fatherItem[childrenList] = []);
    return !fatherItem[parentId];
  });
};

//根据字典获取所有的数据
export const dict = (data: any, value: any, tag: any = null) => {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.value == value) {
      switch (tag) {
        case 1:
          break;
        case 2:
          break;
        default:
          return element;
      }

      // if (tag == null){
      //   return element
      // }
    }
  }
};

//根据字典获取所有的数据
export const dictTag = (data: any, value: any, tag: any = null) => {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.value == value) {
      switch (tag) {
        case 1:
          break;
        case 2:
          break;
        default:
          return element

          // return (<Tag>)
      }

      // if (tag == null){
      // }
    }
  }
};

// 根据fiel进行校验数据返回true 和false

export const fieldValidate = (field: any) => {
  const data = field.getValues();
  field.validate((errors: any, data: any) => {
    // console.log(errors)
    if (errors == null) {
      return true;
    }
  });
  return false;
};



// 获取传递的参数
export const getQueryString = (name: String) =>  {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return null;
}



// export const loadjs = (url: String)=> new Promise(function (resolve, reject) {
//       const js = document.createElement('script');
//     js.src = url;
//     document.head.appendChild(js);
//     console.log("3333=3333")
//     resolve()
// })



export const loadjs = (src:string) => new Promise(function (resolve, reject) {{
  var script = document.createElement('script'),
      head = document.getElementsByTagName('head')[0];
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.src = src;
  if (script.addEventListener) {
      script.addEventListener('load', function () {
          resolve()
    
      }, false);
  } else if (script.attachEvent) {
      script.attachEvent('onreadystatechange', function () {
          var target = window.event.srcElement;
          if (target.readyState == 'loaded') {
            resolve();
          }
      });
  }
  head.appendChild(script);
}})


export const loadListJs  = (urls: string[]) => {
  const promiseArr = urls.map(url => {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script'),
          head = document.getElementsByTagName('head')[0];
      script.type = 'text/javascript';
      script.charset = 'UTF-8';
      script.src = url;
      if (script.addEventListener) {
          script.addEventListener('load', function () {
              resolve();
          }, false);
      } else if (script.attachEvent) {
          script.attachEvent('onreadystatechange', function () {
              var target = window.event.srcElement;
              if (target.readyState == 'loaded') {
                resolve();
              }
          });
      }
      head.appendChild(script);
    });
  });
  return Promise.all(promiseArr);
}

// 获取传递的参数
// export const loadjs = (url: String) =>  {
//   const js = document.createElement('script');
//   js.src = url;
//   document.head.appendChild(js);
//   return new Promise((resolve, reject) => {
//     resolve()
// })
// }


// 获取传递的参数
export const permission = (value: string) =>  {
  let permission = JSON.parse(localStorage.getItem("Permission"))
    if (permission){
      if (permission.indexOf(value) != -1){
        return true
      }
    }
    return false
  }



  export function downloadFileURLByIframe(url:string) {
    var iframe =document.createElement("iframe")
    iframe.style.display ="none";
    iframe.src = url;
    document.body.appendChild(iframe);
}


// 设置url地址
export function setUrl(url:string,title:string){
    history.pushState({url: url, title: document.title}, document.title, url)
}

