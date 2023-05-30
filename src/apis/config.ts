const devBaseURL = "http://x4beg0.192.168.0.238.nip.io/"; //开发环境
const proBaseURL = ''; //生产环境

export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: "";
export const TIMEOUT = 30000;


