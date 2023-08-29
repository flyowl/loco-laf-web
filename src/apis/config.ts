
const devBaseURL = "https://gvfh2x.flyowl.com.cn/"; //开发环境
const proBaseURL = 'https://gvfh2x.flyowl.com.cn/'; //生产环境


// const devBaseURL = "https://gvfh2x.laf.run/"; //开发环境
// const proBaseURL = 'https://gvfh2x.laf.run/'; //生产环境



export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;
export  const TIMEOUT = 30000;



// export const  baseUrl = 'https://gvfh2x.laf.run'

export const  baseUrl = 'https://gvfh2x.flyowl.com.cn'
export const dbProxyUrl = '/proxy/app'
export const environment = 'h5'

// 后台管理页面

export const admin = '/laf-admin'
