import cloud from '@lafjs/cloud'

// util 云函数
export default async function main() {
  return "util 已引入"
};

export function add(a: number, b: number) {
  return a + b
};