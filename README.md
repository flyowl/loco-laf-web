## 简介
这是一个 基于 laf 和 低代码 的前后端一体化的后台管理系统，是一个轻量级的在线开发系统。


https://locolaf.flyowl.com.cn:4443/
账号：admin，密码：123456

## 准备

cd loco-laf-web

npm install
运行
npm start
打包
npm run build


## 环境准备

npm i -g laf-cli
vscode 安装插件 laf-assistant
初始化项目

在 laf-cloud 目录下初始化 laf app
发布所有 function 到 laf 线上

## NGINX部署配置

新增 
```
 location /{
  try_files $uri $uri/ /index.html;
}

```

## 功能概述

loco 可以做什么？

loco的基础功能？

loco之上的平台开发？

### 可以做什么

可以做erp，oa系统，电商网站，大屏报表，也可以做官网等等，几乎能做到市面上90%的web系统，未来我们还将开发app物料，能做到80%的app应用快速开发。

### 基础功能

#### 前端积木化开发

通过拖拽生成前端页面，轻量级编写js以及css，从而生成完整的页面。后端根据前端界面不同的物料定制好不同的函数方便调用。

![1.jpg](https://gitee.com/tianyadg/loco-low-code-backend/raw/master-public/img/Jietu20230324-103942.jpg)
 

#### 模块物料化，区块化
根据产品类型定制不同的物料以及区块。完全适配项目需求。完全根据公司需求，开发不同的物料，且物料开发非常简单，初级工程师完全可上手。

 ![1.jpg]()

#### 区块
根据自己设计的页面，直接保存为区块，方便其他页面调用

 ![1.jpg](https://gitee.com/tianyadg/loco-low-code-backend/raw/master-public/img/Jietu20230324-104029.jpg)

 

#### 物料
通过自定义开发物料，实现模块级别复用。

  ![1.jpg](https://gitee.com/tianyadg/loco-low-code-backend/raw/master-public/img/Jietu20230324-104045.jpg)


#### 模板市场
利用公共模板，快速开发需要的页面

  ![1.jpg](https://gitee.com/tianyadg/loco-low-code-backend/raw/master-public/img/Jietu20230324-104232.jpg)


#### 物料市场
通过公共物料，快速嵌入物料到原有系统

 ![1.jpg](https://gitee.com/tianyadg/loco-low-code-backend/raw/master-public/img/Jietu20230324-104333.jpg)

 #### 历史功能
通过历史功能，可以快速回退到之前的版本

 ![1.jpg](https://gitee.com/tianyadg/loco-low-code-backend/raw/master-public/img/Jietu20230324-104127.jpg)

## 如何贡献
Pull Request:

Fork 代码!

创建自己的分支: git checkout -b feat/xxxx

提交你的修改: git commit -am 'feat(function): add xxxxx'

推送您的分支: git push origin feat/xxxx

提交pull request

Git 贡献提交规范

参考 vue 规范 (Angular)

feat 增加新功能

fix 修复问题/BUG

style 代码风格相关无影响运行结果的

perf 优化/性能提升

refactor 重构

revert 撤销修改

test 测试相关

docs 文档/注释

chore 依赖更新/脚手架配置修改等

workflow 工作流改进

ci 持续集成

types 类型定义文件更改

wip 开发中
