!function e(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.EagleCustomMaterialUiMeta=r():t.EagleCustomMaterialUiMeta=r()}(window,(function(){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function t(){return e.default}:function t(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){"use strict";function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function n(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.r(t),r.d(t,"components",(function(){return fe})),r.d(t,"componentList",(function(){return ge}));var i,p=[{title:"\u989c\u8272\u9009\u62e9\u5668",screenshot:"https://cdn.itq168.com/img/20221024212935.png?imageslim",schema:{componentName:"colorful",props:{}}}],l=n(n({},{componentName:"colorful",group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",category:"\u7cfb\u7edf\u529f\u80fd",title:"\u989c\u8272\u9009\u62e9\u5668",docUrl:"",screenshot:"https://cdn.itq168.com/img/20221024212935.png?imageslim",devMode:"proCode",npm:{package:"eagle-custom-material-ui",version:"1.1.1",exportName:"colorful",main:"src/index.tsx",destructuring:!0,subName:""},configure:{props:[{title:{label:{type:"i18n","en-US":"color","zh-CN":"color"}},name:"colors",setter:{componentName:"ColorSetter"}}],supports:{style:!0,events:["onChange"]},component:{}}}),{},{snippets:p});function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var m,b=[{title:"\u88c1\u526a\u4e0a\u4f20",screenshot:"https://cdn.itq168.com/img/20221016105929.png?imageslim",schema:{componentName:"CropperPicture",props:{accept:["image/jpeg","image/jpg","image/png"],zipWidth:"200"}}}],d=c(c({},{group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",componentName:"CropperPicture",title:"\u88c1\u526a\u4e0a\u4f20",docUrl:"",category:"\u7cfb\u7edf\u529f\u80fd",screenshot:"https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_upload.png",npm:{package:"eagle-custom-material-ui",version:"0.1.4",exportName:"CropperPicture",main:"src/index.tsx",destructuring:!0,subName:""},configure:{props:[{name:"value",title:"\u5f53\u524d\u503c",supportVariable:!0,setter:{componentName:"JsonSetter"}},{name:"defaultValue",title:"\u9ed8\u8ba4\u503c",supportVariable:!0,setter:{componentName:"JsonSetter"}},{name:"disabled",title:"\u662f\u5426\u7981\u7528",setter:"BoolSetter",supportVariable:!0},{type:"group",title:"\u4e0a\u4f20\u5b9a\u4e49",display:"block",items:[{name:"action",title:"\u4e0a\u4f20\u7684\u5730\u5740",setter:"StringSetter",defaultValue:"/api/system/file/",supportVariable:!0},{name:"accept",title:"\u6587\u4ef6\u7c7b\u578b",setter:"JsonSetter",supportVariable:!0},{name:"data",title:"\u4e0a\u4f20\u7684\u989d\u5916\u4f20\u53c2\u6570",setter:"JsonSetter",supportVariable:!0},{name:"timeout",title:"\u8d85\u65f6\u65f6\u95f4",setter:"NumberSetter",supportVariable:!0},{name:"method",title:"\u65b9\u6cd5",setter:{componentName:"RadioGroupSetter",props:{options:[{label:"post",value:"post"},{label:"put",value:"put"}]}},supportVariable:!0}]},{type:"group",title:"\u9ad8\u7ea7",display:"block",items:[{name:"id",title:{label:{type:"i18n",zh_CN:"\u552f\u4e00\u6807\u8bc6",en_US:"ID"},tip:{type:"i18n",zh_CN:"\u5c5e\u6027: id | \u8bf4\u660e: \u552f\u4e00\u6807\u8bc6",en_US:"prop: id | description: switch id"}},setter:"StringSetter",supportVariable:!0},{name:"name",title:{label:{type:"i18n",zh_CN:"\u8868\u5355\u6807\u8bc6",en_US:"Name"},tip:{type:"i18n",zh_CN:"\u5c5e\u6027: name | \u8bf4\u660e: \u8868\u5355\u6807\u8bc6",en_US:"prop: name | description: switch name"}},setter:"StringSetter",supportVariable:!0}]},{type:"group",title:"\u88c1\u526a\u8bbe\u7f6e",display:"block",items:[{name:"aspectRatio",title:"\u88c1\u526a\u6bd4\u4f8b",setter:"StringSetter",supportVariable:!0,defaultValue:"9/16"},{name:"Height",title:"\u9ad8\u5ea6",setter:"StringSetter",supportVariable:!0,defaultValue:"300px"},{name:"Width",title:"\u5bbd\u5ea6",setter:"StringSetter",supportVariable:!0,defaultValue:"100%"},{name:"autoCropArea",title:"\u81ea\u52a8\u526a\u88c1\u533a\u57df",setter:"StringSetter",supportVariable:!0,defaultValue:"0.8"},{name:"cropBoxResizable",title:"\u88c1\u526a\u5927\u5c0f\u53d8\u66f4",setter:"BoolSetter",supportVariable:!0,defaultValue:!1},{name:"movable",title:"\u79fb\u52a8\u88c1\u526a\u6846",setter:"BoolSetter",supportVariable:!0,defaultValue:!1},{name:"zipWidth",title:"\u538b\u7f29\u540e\u5bbd\u5ea6",setter:"NumberSetter",supportVariable:!0}]}],supports:{style:!0,events:["beforeUpload","onSuccess","onError","onSelect","request","afterSelect","onChange","formatter"]},component:{}}}),{},{snippets:b});function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){g(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function g(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var O,S=[{title:"html",screenshot:"http://cdn.itq168.com/img/html.png?imageslim",schema:{componentName:"htmlapi",props:{html:"<div>\u8fd9\u91cc\u53ef\u4ee5\u5199html</div>"}}}],v=y(y({},{componentName:"htmlapi",title:"html",group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",category:"\u5176\u4ed6",docUrl:"",screenshot:"http://cdn.itq168.com/img/html.png?imageslim",devMode:"proCode",npm:{package:"eagle-custom-material-ui",version:"1.1.3",exportName:"htmlapi",main:"src/index.tsx",destructuring:!0,subName:""},configure:{props:[{title:{label:{type:"i18n","en-US":"html","zh-CN":"html"},tip:"html | \u7c7b\u578b"},name:"html",description:"html",supportVariable:!0,setter:["TextAreaSetter"]}],supports:{style:!0,className:!0},component:{}}}),{},{snippets:S});function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){N(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function N(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var V,w=[{title:"\u5185\u94fe\u7ec4\u4ef6",screenshot:"https://cdn.itq168.com/img/20221016105837.png?imageslim",schema:{componentName:"iframe",props:{width:"100%",height:"200"}}}],P=j(j({},{group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",componentName:"iframe",title:"\u5185\u5d4c",category:"\u7cfb\u7edf\u529f\u80fd",npm:{package:"eagle-custom-material-ui",version:"latest",exportName:"iframe",main:"src/index.tsx",destructuring:!0,subName:""},configure:{props:[{title:"\u94fe\u63a5",name:"src",setter:{componentName:"StringSetter"}},{title:"\u6807\u9898",name:"title",setter:{componentName:"StringSetter"}},{title:"id",name:"id",setter:{componentName:"StringSetter"}},{title:"\u6eda\u52a8\u6761",name:"scrolling",defaultValue:"yes",setter:{componentName:"RadioGroupSetter",props:{options:[{label:"\u5426",value:"no"},{label:"\u662f",value:"yes"}]}}},{title:"\u8fb9\u6846",name:"frameBorder",defaultValue:"0",setter:{componentName:"RadioGroupSetter",props:{options:[{label:"\u65e0",value:"0"},{label:"\u6709\u8fb9\u6846",value:"1"}]}}},{title:"\u6309\u94ae\u8fb9\u6846",name:"buttonColor",setter:{componentName:"ColorSetter"}}],supports:{style:!0},component:{}}}),{},{snippets:w});function x(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function k(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?x(Object(r),!0).forEach((function(t){D(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):x(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function D(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var T,B=[{title:"\u5bfc\u822a",screenshot:"https://cdn.itq168.com/img/20230212164713.png?imageslim",schema:{componentName:"navapi",props:{inlineIndent:20,data:[{label:"\u83dc\u5355\u9879\u4e00",value:"key1",children:[{label:"\u9009\u9879\u4e00",value:"key1-1"},{label:"\u9009\u9879\u4e8c",value:"key1-2"}]},{label:"\u83dc\u5355\u9879\u4e8c",value:"key2",children:[{label:"\u9009\u9879\u4e00",value:"key2-1"},{label:"\u9009\u9879\u4e8c",value:"key2-2"}]},{label:"\u83dc\u5355\u9879\u4e09",value:"key3"}]}}}],C=k(k({},{componentName:"navapi",title:"\u5bfc\u822a",docUrl:"",screenshot:"",devMode:"proCode",group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",category:"\u7cfb\u7edf\u529f\u80fd",npm:{package:"eagle-custom-material-ui",version:"1.1.6",exportName:"navapi",main:"src/index.tsx",destructuring:!0,subName:""},configure:{props:[{title:"\u6570\u636e\u6e90",name:"data",description:"html",supportVariable:!0,setter:["JsonSetter"]},{title:"\u5bfc\u822a\u5e03\u5c40",name:"direction",supportVariable:!0,setter:{componentName:"RadioGroupSetter",props:{options:[{label:"\u6c34\u5e73",value:"hoz"},{label:"\u5782\u76f4",value:"ver"}]}}},{title:"\u5bfc\u822a\u7c7b\u578b",name:"type",supportVariable:!0,setter:{componentName:"SelectSetter",props:{options:[{label:"\u666e\u901a",value:"normal"},{label:"\u4e3b\u8981",value:"primary"},{label:"\u6b21\u8981",value:"secondary"},{label:"\u7ebf\u5f62",value:"line"}]}}},{title:"\u5c55\u5f00\u6a21\u5f0f",name:"openMode",supportVariable:!0,setter:{componentName:"RadioGroupSetter",props:{options:[{label:"\u5355\u4e2a",value:"single"},{label:"\u591a\u4e2a",value:"multiple"}]}}},{title:"\u89e6\u53d1\u65b9\u5f0f",name:"triggerType",supportVariable:!0,setter:{componentName:"RadioGroupSetter",props:{options:[{label:"\u70b9\u51fb",value:"click"},{label:"\u89e6\u53d1",value:"hover"}]}}},{title:"\u5b50\u5bfc\u822a\u7f29\u8fdb\u8ddd\u79bb",name:"inlineIndent",supportVariable:!0,setter:"NumberSetter"},{title:"\u53ea\u663e\u793a\u56fe\u6807",name:"iconOnly",supportVariable:!0,defaultValue:!1,setter:"BoolSetter"},{title:"\u662f\u5426\u5d4c\u5165\u6a21\u5f0f",name:"embeddable",supportVariable:!0,defaultValue:!1,setter:"BoolSetter"},{title:"\u53f3\u4fa7\u7bad\u5934",name:"hasArrow",supportVariable:!0,setter:{componentName:"BoolSetter"}},{title:"\u9009\u4e2d\u7684value",name:"selectedKeys",supportVariable:!0,setter:{componentName:"JsonSetter"}},{title:"\u521d\u59cb\u5316\u9009\u4e2d\u7684value",name:"defaultSelectedKeys",supportVariable:!0,setter:{componentName:"JsonSetter"}}],supports:{style:!0,events:["onSelect"]},component:{}}}),{},{snippets:B});function U(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(Object(r),!0).forEach((function(t){_(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var z,R=[{title:"vditor\u6e32\u67d3",screenshot:"https://cdn.itq168.com/img/20221016105708.png?imageslim",schema:{componentName:"render",props:{data:"## \u6807\u98981 \n \u6d4b\u8bd5  \n  ## \u6807\u98982  \n   ### \u6807\u98983 \n \u6d4b\u8bd5 ",spacing:20}}}],A=E(E({},{group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",componentName:"render",title:"vditor\u6e32\u67d3",category:"\u7f16\u8f91\u5668",docUrl:"",screenshot:"",devMode:"proCode",npm:{package:"eagle-custom-material-ui",version:"0.1.0",exportName:"render",main:"src/index.tsx",destructuring:!0,subName:""},configure:{props:[{title:"\u9ed8\u8ba4\u6570\u636e",name:"data",supportVariable:!0,setter:{componentName:"StringSetter"}},{title:"\u6807\u9898\u6dfb\u52a0\u951a\u70b9",name:"anchor",supportVariable:!0,defaultValue:0,setter:{componentName:"SelectSetter",props:{options:[{value:0,title:"\u4e0d\u6e32\u67d3"},{value:1,title:"\u6e32\u67d3\u4e8e\u6807\u9898\u524d"},{value:2,title:"\u6e32\u67d3\u4e8e\u6807\u9898\u540e"}]}}},{title:"\u9009\u4e2d\u9605\u8bfb",name:"speech.enable",supportVariable:!0,defaultValue:!1,setter:{componentName:"BoolSetter"}},{title:"\u9ed8\u8ba4\u6a21\u5f0f",name:"mode",supportVariable:!0,setter:{componentName:"StringSetter"}},{title:"\u56fe\u7247\u61d2\u52a0\u8f7d",name:"lazyLoadImage",supportVariable:!0,defaultValue:"",setter:{componentName:"SelectSetter",props:{options:[{value:"Loading",title:"\u542f\u7528"},{value:"",title:"\u7981\u7528"}]}}},{title:"TOC\u7ae0\u8282",type:"group",display:"block",items:[{title:"\u662f\u5426\u663e\u793a",name:"tocShow",supportVariable:!0,defaultValue:!0,setter:["BoolSetter"]},{title:"toc\u5bbd\u5ea6",name:"spacing",supportVariable:!0,setter:{componentName:"NumberSetter"}}]},{title:"markdown",type:"group",display:"block",items:[{title:"\u81ea\u52a8\u7a7a\u683c",name:"markdown.autoSpace",defaultValue:!1,setter:{componentName:"BoolSetter"}},{title:"\u81ea\u52a8\u77eb\u6b63\u672f\u8bed",name:"markdown.fixTermTypo",defaultValue:!1,setter:{componentName:"BoolSetter"}},{title:"\u6bb5\u843d\u5f00\u5934\u7a7a\u4e24\u4e2a",name:"markdown.paragraphBeginningSpace",defaultValue:!1,setter:{componentName:"BoolSetter"}},{title:"\u63d2\u5165\u76ee\u5f55",name:"markdown.toc",defaultValue:!1,setter:{componentName:"BoolSetter"}}]}],supports:{style:!0},component:{}}}),{},{snippets:R});function M(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function q(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?M(Object(r),!0).forEach((function(t){G(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function G(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var J,I=[{title:"\u4e0a\u4f20\u7ec4\u4ef6",screenshot:"https://cdn.itq168.com/img/\u6587\u4ef6\u4e0a\u4f20.svg?imageslim",schema:{componentName:"uploadCustom",props:{prefix:"next-",closable:!0,autoUpload:!0,shape:"card",title:"\u4e0a\u4f20\u6587\u4ef6",defaultValue:[]}}}],L=q(q({},{group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",componentName:"uploadCustom",title:"\u4e0a\u4f20",docUrl:"",screenshot:"https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_upload.png",category:"\u7cfb\u7edf\u529f\u80fd",npm:{package:"eagle-custom-material-ui",version:"0.1.0",exportName:"uploadCustom",main:"src/index.tsx",destructuring:!0,subName:""},props:[{name:"value",propType:{type:"Json"},description:"\u6587\u4ef6\u5217\u8868"},{name:"defaultValue",propType:"object",description:"\u9ed8\u8ba4\u6587\u4ef6\u5217\u8868"},{name:"shape",propType:{type:"oneOf",value:["card"]},description:"\u4e0a\u4f20\u6309\u94ae\u5f62\u72b6"},{name:"listType",propType:{type:"oneOf",value:["text","image","card"]},description:"\u4e0a\u4f20\u5217\u8868\u7684\u6837\u5f0f"},{name:"name",propType:"string",description:"\u6587\u4ef6\u540d\u5b57\u6bb5"},{name:"data",propType:{type:"oneOfType",value:["object","func"]},description:"\u4e0a\u4f20\u989d\u5916\u4f20\u53c2"},{name:"formatter",propType:"func",title:"\u6570\u636e\u683c\u5f0f\u5316\u51fd\u6570"},{name:"limit",propType:"number",description:"\u6700\u5927\u6587\u4ef6\u4e0a\u4f20\u4e2a\u6570",defaultValue:null},{name:"timeout",propType:"number",description:"\u8bbe\u7f6e\u4e0a\u4f20\u8d85\u65f6,\u5355\u4f4dms"},{name:"accept",propType:"string"},{name:"dragable",propType:"bool",description:"\u53ef\u9009\u53c2\u6570\uff0c\u662f\u5426\u652f\u6301\u62d6\u62fd\u4e0a\u4f20\uff0c`ie10+` \u652f\u6301\u3002"},{name:"useDataURL",propType:"bool",description:"\u53ef\u9009\u53c2\u6570\uff0c\u662f\u5426\u672c\u5730\u9884\u89c8"},{name:"disabled",propType:"bool",description:"\u53ef\u9009\u53c2\u6570\uff0c\u662f\u5426\u7981\u7528\u4e0a\u4f20\u529f\u80fd"},{name:"onSelect",propType:"func",description:"\u9009\u62e9\u6587\u4ef6\u56de\u8c03"},{name:"onProgress",propType:"func",description:"\u4e0a\u4f20\u4e2d"},{name:"onChange",propType:"func",description:"\u4e0a\u4f20\u6587\u4ef6\u6539\u53d8\u65f6\u7684\u72b6\u6001\n@param {Object} info \u6587\u4ef6\u4e8b\u4ef6\u5bf9\u8c61"},{name:"onSuccess",propType:"func",description:"\u53ef\u9009\u53c2\u6570\uff0c\u4e0a\u4f20\u6210\u529f\u56de\u8c03\u51fd\u6570\uff0c\u53c2\u6570\u4e3a\u8bf7\u6c42\u4e0b\u54cd\u5e94\u4fe1\u606f\u4ee5\u53ca\u6587\u4ef6\n@param {Object} file \u6587\u4ef6\n@param {Array<Object>} value \u503c"},{name:"afterSelect",propType:"func",description:"\u53ef\u9009\u53c2\u6570, \u7528\u4e8e\u6821\u9a8c\u6587\u4ef6,afterSelect\u4ec5\u5728 autoUpload=false \u7684\u65f6\u5019\u751f\u6548,autoUpload=true\u65f6,\u53ef\u4ee5\u4f7f\u7528beforeUpload\u5b8c\u5168\u53ef\u4ee5\u66ff\u4ee3\u8be5\u529f\u80fd.\n@param {Object} file\n@returns {Boolean} \u8fd4\u56defalse\u4f1a\u963b\u6b62\u4e0a\u4f20,\u5176\u4ed6\u5219\u8868\u793a\u6b63\u5e38"},{name:"onRemove",propType:"func",description:"\u79fb\u9664\u6587\u4ef6\u56de\u8c03\u51fd\u6570\n@param {Object} file \u6587\u4ef6\n@returns {Boolean|Promise} \u8fd4\u56de false\u3001Promise.resolve(false)\u3001 Promise.reject() \u5c06\u963b\u6b62\u6587\u4ef6\u5220\u9664"},{name:"onError",propType:"func",description:"\u53ef\u9009\u53c2\u6570\uff0c\u4e0a\u4f20\u5931\u8d25\u56de\u8c03\u51fd\u6570\uff0c\u53c2\u6570\u4e3a\u4e0a\u4f20\u5931\u8d25\u7684\u4fe1\u606f\u3001\u54cd\u5e94\u4fe1\u606f\u4ee5\u53ca\u6587\u4ef6\n@param {Object} file \u51fa\u9519\u7684\u6587\u4ef6\n@param {Array} value \u5f53\u524d\u503c"},{name:"beforeUpload",propType:"func",title:{label:"\u5f00\u59cb\u4e0a\u4f20\u65f6\u56de\u8c03",tip:"\u53ef\u9009\u53c2\u6570, \u8be6\u89c1 [beforeUpload](#beforeUpload)\n@param {Object} file \u6240\u6709\u6587\u4ef6\n@param {Object} options \u53c2\u6570\n@returns {Boolean|Object|Promise} \u8fd4\u56de\u503c\u4f5c\u7528\u89c1demo"}},{name:"onDrop",propType:"func",description:"\u653e\u6587\u4ef6"},{name:"className",propType:"string",description:"\u81ea\u5b9a\u4e49class"},{name:"style",propType:"object",description:"\u81ea\u5b9a\u4e49\u5185\u8054\u6837\u5f0f"},{name:"autoUpload",propType:"bool",description:"\u81ea\u52a8\u4e0a\u4f20",defaultValue:!0},{name:"request",propType:"func",description:"\u81ea\u5b9a\u4e49\u4e0a\u4f20\u65b9\u6cd5\n@param {Object} option\n@return {Object} object with abort method"},{name:"progressProps",propType:"object",description:"\u900f\u4f20\u7ed9Progress props"},{name:"isPreview",propType:"bool",description:"\u662f\u5426\u4e3a\u9884\u89c8\u6001"},{name:"renderPreview",propType:"func",description:"\u9884\u89c8\u6001\u6a21\u5f0f\u4e0b\u6e32\u67d3\u7684\u5185\u5bb9\n@param {number} value \u8bc4\u5206\u503c"}],configure:{props:[{name:"title",title:"\u6807\u9898",setter:"StringSetter",supportVariable:!0},{name:"value",title:"\u5f53\u524d\u503c",supportVariable:!0,setter:{componentName:"JsonSetter"}},{name:"defaultValue",title:"\u9ed8\u8ba4\u503c",supportVariable:!0,setter:{componentName:"JsonSetter"}},{name:"shape",title:"\u6309\u94ae\u5f62\u72b6",setter:{componentName:"RadioGroupSetter",props:{options:[{title:"\u9ed8\u8ba4",value:null},{title:"\u5361\u7247",value:"card"},{title:"\u62d6\u62fd",value:"Dragger"}]}},description:"\u4e0a\u4f20\u6309\u94ae\u5f62\u72b6"},{name:"listType",title:"\u5217\u8868\u6837\u5f0f",setter:{componentName:"RadioGroupSetter",props:{options:["text","image","card"]}},defaultValue:"text",description:"\u4e0a\u4f20\u5217\u8868\u7684\u6837\u5f0f"},{name:"limit",title:"\u6570\u91cf\u9650\u5236",setter:"NumberSetter",supportVariable:!0},{name:"disabled",title:"\u662f\u5426\u7981\u7528",setter:"BoolSetter",supportVariable:!0},{type:"group",title:"\u4e0a\u4f20\u5b9a\u4e49",display:"accordion",items:[{name:"action",title:"\u4e0a\u4f20\u7684\u5730\u5740",setter:"StringSetter",defaultValue:"/api/system/file/",supportVariable:!0},{name:"accept",title:"\u6587\u4ef6\u7c7b\u578b",setter:"StringSetter",supportVariable:!0},{name:"data",title:"\u4e0a\u4f20\u7684\u989d\u5916\u4f20\u53c2\u6570",setter:"JsonSetter",supportVariable:!0},{name:"timeout",title:"\u8d85\u65f6\u65f6\u95f4",setter:"NumberSetter",supportVariable:!0},{name:"method",title:"\u65b9\u6cd5",setter:{componentName:"RadioGroupSetter",props:{options:[{label:"post",value:"post"},{label:"put",value:"put"}]}},supportVariable:!0}]},{type:"group",title:"\u62d6\u62fd\u4e0a\u4f20",display:"accordion",items:[{title:"\u7981\u7528\u4e0a\u4f20",name:"disabled",setter:"BoolSetter"},{title:"\u591a\u9009\u6587\u4ef6\u652f\u6301",name:"multiple",setter:"BoolSetter"},{title:"\u6587\u4ef6\u5939\u652f\u6301",name:"webkitdirectory",setter:"BoolSetter"},{title:"\u62d6\u62fd\u4e0a\u4f20",name:"dragable",setter:"BoolSetter"},{title:"\u652f\u6301\u7684\u6587\u4ef6\u7c7b\u578b",name:"accept",setter:"StringSetter"},{title:"\u8bbe\u5907\u5a92\u4f53",name:"capture",setter:"StringSetter"}]},{type:"group",title:"\u9ad8\u7ea7",display:"block",items:[{name:"id",title:{label:{type:"i18n",zh_CN:"\u552f\u4e00\u6807\u8bc6",en_US:"ID"},tip:{type:"i18n",zh_CN:"\u5c5e\u6027: id | \u8bf4\u660e: \u552f\u4e00\u6807\u8bc6",en_US:"prop: id | description: switch id"}},setter:"StringSetter",supportVariable:!0},{name:"name",title:{label:{type:"i18n",zh_CN:"\u8868\u5355\u6807\u8bc6",en_US:"Name"},tip:{type:"i18n",zh_CN:"\u5c5e\u6027: name | \u8bf4\u660e: \u8868\u5355\u6807\u8bc6",en_US:"prop: name | description: switch name"}},setter:"StringSetter",supportVariable:!0}]}],supports:{style:!0,events:["beforeUpload","onSuccess","onError","onSelect","request","afterSelect","onChange","formatter","onSelect","onDragOver","onDragLeave","onDrop"]}}}),{},{snippets:I});function F(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function W(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?F(Object(r),!0).forEach((function(t){K(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):F(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function K(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var H,$=[{title:"vditor\u7f16\u8f91\u5668",screenshot:"https://cdn.itq168.com/img/20221016105634.png?imageslim",schema:{componentName:"vdit",props:{data:"\u521d\u59cb\u5316\u6570\u636e",height:"400px"}}}],Q=W(W({},{group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",componentName:"vdit",title:"vditor\u7f16\u8f91\u5668",category:"\u7f16\u8f91\u5668",docUrl:"",screenshot:"",npm:{package:"eagle-custom-material-ui",version:"0.1.0",exportName:"vdit",main:"src/index.tsx",destructuring:!0,subName:""},configure:{props:[{title:"\u57fa\u7840\u9009\u9879",type:"group",display:"block",items:[{title:"\u5f53\u524d\u6570\u636e",name:"value",defaultValue:"\u6d4b\u8bd5\u6570\u636e",supportVariable:!0,setter:{componentName:"StringSetter"}},{title:"\u9ad8\u5ea6",name:"height",supportVariable:!0,defaultValue:"400px",setter:["StringSetter"]},{title:"\u6beb\u79d2\u95f4\u9694",name:"delay",supportVariable:!0,defaultValue:1e3,setter:["NumberSetter"]},{title:"\u5168\u5c4f\u5c42\u7ea7",name:"fullscreen.index",supportVariable:!0,defaultValue:99999,setter:["NumberSetter"]},{title:"\u5bbd\u5ea6",name:"width",supportVariable:!0,defaultValue:"auto",setter:["StringSetter"]},{title:"\u56fe\u6807\u98ce\u683c",name:"icon",defaultValue:"material",setter:{componentName:"RadioGroupSetter",props:{options:[{label:"ant",value:"ant"},{label:"material",value:"material"}]}}},{title:"\u7f16\u8f91\u6a21\u5f0f",name:"mode",defaultValue:"wysiwyg",setter:{componentName:"RadioGroupSetter",props:{options:[{label:"\u6240\u89c1\u5373\u6240\u5f97",value:"wysiwyg"},{label:"\u5373\u65f6\u6e32\u67d3",value:"ir"},{label:"\u5206\u5c4f\u9884\u89c8",value:"ir"}]}}},{title:"\u4e3b\u9898",name:"theme",defaultValue:"classic",setter:{componentName:"RadioGroupSetter",props:{options:[{label:"classic",value:"classic"},{label:"dark",value:"dark"}]}}}]},{title:"\u5de5\u5177\u680f",type:"group",display:"block",items:[{name:"toolbarConfig.hide",title:"\u662f\u5426\u9690\u85cf",supportVariable:!0,setter:["BoolSetter"],defaultValue:!1},{name:"toolbarConfig.pin",title:"\u662f\u5426\u56fa\u5b9a",supportVariable:!0,setter:["BoolSetter"],defaultValue:!1},{title:"\u8ba1\u6570\u503c",name:"counter.enable",defaultValue:!1,setter:{componentName:"BoolSetter"}},{title:"\u5141\u8bb8\u8f93\u5165\u7684\u6700\u5927\u503c",name:"counter.max",setter:{componentName:"NumberSetter"}},{title:"\u672c\u5730\u7f13\u5b58",name:"cache.enable",defaultValue:!1,setter:{componentName:"BoolSetter"}}]},{title:"markdown",type:"group",display:"block",items:[{title:"\u884c\u53f7",name:"preview.hljs.lineNumber",supportVariable:!0,defaultValue:!1,setter:["BoolSetter"]},{title:"\u81ea\u52a8\u7a7a\u683c",name:"preview.markdown.autoSpace",defaultValue:!1,setter:{componentName:"BoolSetter"}},{title:"\u81ea\u52a8\u77eb\u6b63\u672f\u8bed",name:"preview.markdown.fixTermTypo",defaultValue:!1,setter:{componentName:"BoolSetter"}},{title:"\u6bb5\u843d\u5f00\u5934\u7a7a\u4e24\u4e2a",name:"preview.markdown.paragraphBeginningSpace",defaultValue:!1,setter:{componentName:"BoolSetter"}},{title:"\u63d2\u5165\u76ee\u5f55",name:"preview.markdown.toc",defaultValue:!1,setter:{componentName:"BoolSetter"}}]},{title:"\u5927\u7eb2",type:"group",display:"block",items:[{title:"\u5c55\u73b0\u5927\u7eb2",name:"outline.enable",defaultValue:!1,setter:{componentName:"BoolSetter"}},{title:"\u5927\u7eb2\u4f4d\u7f6e",name:"outline.position",defaultValue:"left",setter:{componentName:"RadioGroupSetter",props:{options:[{label:"\u5de6\u8fb9",value:"left"},{label:"\u53f3\u8fb9",value:"right"}]}}}]},{title:"\u4e0a\u4f20",type:"group",display:"block",items:[{title:"\u4e0a\u4f20\u5730\u5740",name:"upload.url",defaultValue:"/api/system/file/",setter:{componentName:"StringSetter"}},{title:"\u9ecf\u8d34\u4e0a\u4f20\u5730\u5740",name:"upload.linkToImgUrl",defaultValue:"/api/system/file/",setter:{componentName:"StringSetter"}},{title:"\u6587\u4ef6\u5927\u5c0fByte",name:"upload.max",defaultValue:1024810240,setter:{componentName:"NumberSetter"}},{title:"headers",name:"upload.headers",setter:{componentName:"JsonSetter"}},{title:"\u6587\u4ef6\u7c7b\u578b",name:"upload.accept",setter:{componentName:"StringSetter"}},{title:"\u6269\u5c55\u53c2\u6570",name:"upload.extraData",setter:{componentName:"JsonSetter"}},{title:"\u4e0a\u4f20\u5b57\u6bb5\u540d\u79f0",name:"upload.fieldName",defaultValue:"file",setter:{componentName:"StringSetter"}},{title:"\u591a\u4e2a\u6587\u4ef6",name:"upload.multiple",setter:{componentName:"BoolSetter"}}]}],supports:{style:!0,events:["saveField","upload.success","upload.linkToImgFormat","upload.format"]},component:{}}}),{},{snippets:$});function X(e,t){return ee(e)||Z(e,t)||oe(e,t)||Y()}function Y(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function Z(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var o=[],n=!0,a=!1,i,p;try{for(r=r.call(e);!(n=(i=r.next()).done)&&(o.push(i.value),!t||o.length!==t);n=!0);}catch(e){a=!0,p=e}finally{try{n||null==r.return||r.return()}finally{if(a)throw p}}return o}}function ee(e){if(Array.isArray(e))return e}function te(e){return ae(e)||ne(e)||oe(e)||re()}function re(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function oe(e,t){if(e){if("string"==typeof e)return ie(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?ie(e,t):void 0}}function ne(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function ae(e){if(Array.isArray(e))return ie(e)}function ie(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}function pe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function le(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?pe(Object(r),!0).forEach((function(t){se(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):pe(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function se(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ce(e){return(ce="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var ue={};function me(e){var t=[{title:"\u5e38\u7528",icon:"",children:[]},{title:"\u5bb9\u5668",icon:"",children:[]},{title:"\u5bfc\u822a",icon:"",children:[]},{title:"\u5185\u5bb9",icon:"",children:[]},{title:"Feedback \u53cd\u9988",icon:"",children:[]}],r={"\u539f\u5b50\u7ec4\u4ef6":!0},o={};return e.forEach((function(e){var n=e.category||"\u5176\u4ed6";e.group&&!o[e.componentName]&&(o[e.componentName]=e.group),e.group&&!r[e.group]&&(r[e.group]=!0);var a=t.find((function(e){return e.title===n}));a||(a={title:n,icon:"",children:[]},t.push(a)),e.snippets&&e.snippets.length&&a.children.push({componentName:e.componentName,title:e.title||e.componentName,sort:{category:a.title,group:o[e.componentName]||"\u539f\u5b50\u7ec4\u4ef6",priority:ue[a.title]||0},icon:"",package:e.npm.pkg,snippets:e.snippets||[]})})),t}function be(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"eagle-custom-material-ui",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"1.2.0",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{"@alifd/next":"1.25.23","@alifd/meet":"2.6.3",antd:"4.17.3"};if(!e||!r)return e;var n=e.npm;return n?("object"===ce(o)&&o[n.package]?e.npm=le(le({},n),{},{version:o[n.package]}):n.package===t&&(e.npm=le(le({},n),{},{version:r})),e):e}["\u57fa\u7840\u5143\u7d20","\u5e03\u5c40\u5bb9\u5668\u7c7b","\u8868\u683c\u7c7b","\u8868\u5355\u8be6\u60c5\u7c7b","\u5e2e\u52a9\u7c7b","\u5bf9\u8bdd\u6846\u7c7b","\u4e1a\u52a1\u7c7b","\u901a\u7528","\u5f15\u5bfc","\u4fe1\u606f\u8f93\u5165","\u4fe1\u606f\u5c55\u793a","\u4fe1\u606f\u53cd\u9988"].reverse().forEach((function(e,t){ue[e]=++t}));var de,fe=[],ye={};[l,d,v,P,C,A,L,Q].forEach((function(e){if(Array.isArray(e))fe.push.apply(fe,te(e.map((function(e){if(!e.npm){var t=e.componentName,r=t.split("."),o=X(r,2),n=o[0],a=o[1];e.npm={exportName:n,main:"",destructuring:!0,subName:r.length>1?t.slice(t.indexOf(".")+1):a}}return e.npm=le(le({},ye),e.npm||{}),be(e)}))));else if(e.components)fe.push.apply(fe,te(e.components.map((function(e){if(!e.npm){var t=e.componentName,r=t.split("."),o=X(r,2),n=o[0],a=o[1];e.npm={exportName:n,main:"",destructuring:!0,subName:r.length>1?t.slice(t.indexOf(".")+1):a}}return e.npm=le(le({},ye),e.npm||{}),be(e)}))));else{if(!e.npm){var t=e.componentName,r=t.split("."),o=X(r,2),n=o[0],a=o[1];e.npm={exportName:n,main:"",destructuring:!0,subName:r.length>1?t.slice(t.indexOf(".")+1):a}}e.npm=le(le({},ye),e.npm||{}),fe.push(be(e))}}));var ge=me(fe),Oe=!0}])}));