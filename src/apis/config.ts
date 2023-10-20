
const devBaseURL = "https://wzvafh.laf.run"; //开发环境
const proBaseURL = 'https://wzvafh.laf.run'; //生产环境





export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;
export  const TIMEOUT = 30000;




export const  baseUrl = 'https://wzvafh.laf.run'
export const dbProxyUrl = '/proxy/app'
export const environment = 'h5'

// 后台管理页面

export const admin = '/laf-admin'
