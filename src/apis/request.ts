import axios from 'axios';
import { BASE_URL, TIMEOUT } from './config';
import { Dialog } from '@alifd/next';

import { openNotification } from 'src/utils/index';
import { GetLToken } from './localStorageInfo';
import { insertChild } from '@alilc/lowcode-designer';



const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});
const url = new URL(window.location.href)


const codeMessage: Record<number, string> = {
  10000: '系统未知错误，请反馈给管理员',
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export function getErrorMessage(msg: any) {
  if (msg === '身份认证信息未提供。') {
    window.location.href = '/user/login?redirect=' +url.pathname;
    localStorage.setItem("redirect",url.pathname)
  }

  if (typeof msg === 'string') {
    return msg;
  }
  if (typeof msg === 'object') {
    if (msg.code === 'token_not_valid') {
      // util.cookies.remove('token')
      // util.cookies.remove('uuid')
      // router.push({ path: '/login' })
      window.location.href = '/user/login?redirect=' +url.pathname;
      localStorage.setItem("redirect",url.pathname)

      // router.go(0)
      return '登录超时，请重新登录！';
    }
    if (msg.code === 'user_not_found') {
      // util.cookies.remove('token')
      // util.cookies.remove('uuid')
      // router.push({ path: '/login' })
      window.location.href = '/user/login?redirect=' +url.pathname;
      localStorage.setItem("redirect",url.pathname)

      // router.go(0)
      return '用户无效，请重新登录！';
    }
    return Object.values(msg);
  }
  if (Object.prototype.toString.call(msg).slice(8, -1) === 'Array') {
    return msg;
  }
  return msg;
}

// http request 拦截器
service.interceptors.request.use(
  (config) => {
    // 发送网络请求时, 在界面的中间位置显示Loading的组件,使用ant-design插件，这里不再赘述
    //请求携带的信息
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: GetLToken(),
      // 'Access-Control-Allow-Headers':'token',
      ...config.headers,
    };
    return config;
  },
  (err) => {
    //...关闭加载loading的组件，显示消息提示弹窗
    return err;
  },
);

// http response 拦截器
service.interceptors.response.use(
  (res: any) => {
    let redata = res.data;
    if (redata.code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      return res;
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (redata.code) {
        case 2000:
          // [ 示例 ] code === 2000 代表没有错误
          // TODO 可能结果还需要code和msg进行后续处理，所以去掉.data返回全部结果
          // return dataAxios.data
          return res.data;
        case 401:
          // openNotification('error',  `${redata.msg}`);
          // TODO 置换token 未完善
          // util.cookies.remove('token')
          // util.cookies.remove('uuid')
          // util.cookies.remove('refresh')s
          // router.push({ path: '/login' })
          // errorCreate(`${getErrorMessage(dataAxios.msg)}`)
          window.location.href = '/user/login?redirect=' +url.pathname;
          localStorage.setItem("redirect",url.pathname)

          // openNotification('error',`${getErrorMessage(redata.msg)}`)

          break;
        case 404:
          openNotification('error', `${redata.msg}`);

          // dataNotFound(`${dataAxios.msg}`)
          break;
        case 4000:
          openNotification('error', `${getErrorMessage(redata.msg)}`);

          // 删除cookie
          // errorCreate(`${getErrorMessage(dataAxios.msg)}`)
          break;
        case 400:
          openNotification('error', `${redata.msg}`);

          // errorCreate(`${dataAxios.msg}`)
          break;
        default:
          openNotification('error', `${redata.msg}`);

          // 不是正确的 code
          // errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          break;
      }
    }

    // return res.data;
  },
  (err) => {
    if (err && err.response) {
      const msg = codeMessage[err.response.status] || codeMessage[10000];

      if (err.response.status === 401 || err.response.status === 403) {
        openNotification('error', `${err.response.status} ${msg}`);
      } else {
        openNotification('error', `${err.response.status} ${msg}`);
      }

      // switch (err.response.status) {
      //   case 401:
      //     console.log("请求错误");
      //     break;
      //   case 403:
      //     console.log("未授权访问");
      //     break;
      //   default:
      //     console.log("其他错误信息");
      // }
    }
    return err;
  },
);

export function post(url: any, params: any,mess=true) {
  return new Promise(function (resolve, reject) {
    //做一些异步操作
    const res = service.post(url, params).then((res: any) => {
      if (res.code == 2000) {
        if (mess){openNotification('success', '创建成功');}
        resolve(res);
      } else {
        resolve(res);
        if (mess){openNotification('error', res.msg)}
      }
    });
  });
}

export async function put(url: any, params: any,mess=true) {
  return new Promise(function (resolve, reject) {
    //做一些异步操作
    const res =  service.put(url, params).then((res: any) => {
      if (res.code == 2000) {
        if (mess){openNotification('success', '更新成功');}

        
        resolve(res)
      } else {
        reject(res)
        if (mess){openNotification('error', res.msg)}

      }
    });
  });

}

export function del(url: any,mess=true) {
  return new Promise(function (resolve, reject) {
    Dialog.confirm({
      v2: true,
      title: '删除',
      content: '请确认是否删除...',
      onOk: () => {
        const res = service.delete(url).then((res: any) => {
          if (res.code == 2000) {
            resolve(res)
            if (mess){openNotification('error', res.msg)}
          } else {
            reject(res)
            if (mess){openNotification('error', res.msg)}
          }
        });
      },
    });
  });

}

export default service;
