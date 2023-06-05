
const devBaseURL = "http://x4beg0.192.168.0.238.nip.io/"; //开发环境
const proBaseURL = 'http://x4beg0.192.168.0.238.nip.io/'; //生产环境





export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;
export  const TIMEOUT = 30000;



export const  baseUrl = 'http://x4beg0.192.168.0.238.nip.io'
export const dbProxyUrl = '/proxy/app'
export const environment = 'h5'

