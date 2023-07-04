
const devBaseURL = "http://qv5aa8.192.168.0.238.nip.io/"; //开发环境
const proBaseURL = 'http://qv5aa8.192.168.0.238.nip.io/'; //生产环境




export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;
export  const TIMEOUT = 30000;



export const  baseUrl = 'http://qv5aa8.192.168.0.238.nip.io'
export const dbProxyUrl = '/proxy/app'
export const environment = 'h5'
// 后台管理页面
export const admin = '/laf-admin'
