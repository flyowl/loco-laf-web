// import { Apphelp } from 'src/utils/lowtool';

import { Tag } from '@alifd/next';
import { Dialog,Message } from '@alifd/next';
import { useRef } from 'react';
import md5 from 'js-md5';
import { BASE_URL } from 'src/apis/config';
import { GetDictionary } from 'src/apis/localStorageInfo';
import { LoginApi } from 'src/apis/Login';
import service, { del, post, put } from 'src/apis/request';
import { createAxiosFetchHandler } from 'src/plugins/axiosfatchhandler';
import {cloud, delTreeData, dict, getQueryString, loadjs,loadListJs, openNotification,permission,setUrl,downloadFileURLByIframe } from './index';

const setTag  = (data: any, value: any, tag: any = null)=>{
  switch (tag){
    case null:
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.value == value) {
              return <Tag size="small" type="primary" color={element?.color} >{element.label}</Tag>
        }
      }
    case 1:
      <Tag size="small" type="primary"  >{value}</Tag>
    case 2:
      break;
    default:
      return ""
  }
    return ""
  }
export const Apphelp = {
  requestHandlersMap: {
    fetch: createAxiosFetchHandler(),
  },
  utils: {
    // 消息
    msg: openNotification,
    //
    'Message':Message,
    md5: md5,
    // 登入接口
    LoginApi: LoginApi,
    // 树结构渲染
    TreeData: delTreeData,
    //请求参数
    request: service,
    // 业务三部曲
    post: post,
    put: put,
    del: del,
    // 确认
    Dialog: Dialog,
    // 获取字典相应的数据
    dict: GetDictionary,
    // 根据字典获取label
    getDictValue: dict,
    // 获取url传递的字符串
    getQueryString: getQueryString,
    // 添加js路径
    loadjs: loadjs,
    js:loadListJs,
    baseurl: BASE_URL,
    permission:permission,
    downloadFile:downloadFileURLByIframe,
    // 登录
    setUrl:setUrl, //设置url地址 
    setTag:setTag,  //标签设置
    could:cloud, //云函数
    ref:useRef // useRef生成
  },
};





  export default Apphelp