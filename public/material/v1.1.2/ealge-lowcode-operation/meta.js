!function e(t,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.EalgeLowcodeOperationMeta=r():t.EalgeLowcodeOperationMeta=r()}(window,(function(){return function(e){var t={};function r(l){if(t[l])return t[l].exports;var a=t[l]={i:l,l:!1,exports:{}};return e[l].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,l){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(r.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(l,a,function(t){return e[t]}.bind(null,a));return l},r.n=function(e){var t=e&&e.__esModule?function t(){return e.default}:function t(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){"use strict";function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,l)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function n(e,t,r){return(t=i(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e){var t=u(e,"string");return"symbol"===l(t)?t:String(t)}function u(e,t){if("object"!==l(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,t||"default");if("object"!==l(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}r.r(t),r.d(t,"components",(function(){return ye})),r.d(t,"componentList",(function(){return ge}));var p,c=[{title:"xterm\u57fa\u7840\u7ec4\u4ef6",screenshot:"http://cdn.itq168.com/img/20221221091020.png?imageslim",schema:{componentName:"baseXterm",props:{rendererType:"canvas"}}}],s=o(o({},{componentName:"baseXterm",title:"xterm\u57fa\u7840\u7ec4\u4ef6",docUrl:"",group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",category:"\u7f16\u8f91\u5668",screenshot:"http://cdn.itq168.com/img/20221221091020.png?imageslim",devMode:"proCode",npm:{package:"ealge-lowcode-operation",version:"0.1.5",exportName:"baseXterm",main:"src/index.tsx",destructuring:!0,subName:""},configure:{props:[{title:"\u80cc\u666f\u989c\u8272",name:"theme.background",defaultValue:"black",supportVariable:!0,setter:{componentName:"ColorSetter"}},{title:"\u5149\u6807\u989c\u8272",name:"theme.cursor",defaultValue:"yellow",supportVariable:!0,setter:{componentName:"ColorSetter"}},{title:"\u5149\u6807\u6837\u5f0f",name:"cursorStyle",defaultValue:"block",supportVariable:!0,setter:{componentName:"ColorSetter"}},{title:"\u5b57\u4f53\u989c\u8272",name:"theme.foreground",defaultValue:"block",supportVariable:!0,setter:{componentName:"ColorSetter"}},{title:"\u5b57\u4f53\u5927\u5c0f",name:"fontSize",defaultValue:12,supportVariable:!0,setter:{componentName:"NumberSetter"}},{title:"\u7ec8\u7aef\u56de\u6eda",name:"scrollback",defaultValue:500,supportVariable:!0,setter:{componentName:"NumberSetter"}},{title:"\u6e32\u67d3\u7c7b\u578b",name:"rendererType",defaultValue:"canvas",supportVariable:!0,setter:{componentName:"StringSetter"}},{title:{label:"\u5149\u6807\u914d\u7f6e",tip:"\u542f\u7528\u65f6\uff0c\u5149\u6807\u5c06\u8bbe\u7f6e\u4e3a\u4e0b\u4e00\u884c\u7684\u5f00\u5934"},name:"convertEol",defaultValue:!0,supportVariable:!0,setter:{componentName:"BoolSetter"}},{title:{label:"\u5149\u6807\u95ea\u70c1",tip:"\u5149\u4ea4\u662f\u5426\u95ea\u70c1"},name:"cursorBlink",defaultValue:!0,supportVariable:!0,setter:{componentName:"BoolSetter"}},{title:{label:"\u5149\u6807\u8f93\u5165",tip:"\u662f\u5426\u7981\u6b62\u8f93\u5165"},name:"disableStdin",defaultValue:!1,supportVariable:!0,setter:{componentName:"BoolSetter"}}],supports:{style:!0,events:["saveField"],className:!0},component:{}}}),{},{snippets:c});function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,l)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){v(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function v(e,t,r){return(t=y(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function y(e){var t=d(e,"string");return"symbol"===b(t)?t:String(t)}function d(e,t){if("object"!==b(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var l=r.call(e,t||"default");if("object"!==b(l))return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}var g={componentName:"diffmonacoapi",title:"code\u7f16\u8f91\u5668\u6bd4\u5bf9",group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",category:"\u7f16\u8f91\u5668",docUrl:"",screenshot:"http://cdn.itq168.com/img/20221213133810.png?imageslim",devMode:"proCode",npm:{package:"ealge-lowcode-operation",version:"0.1.0",exportName:"diffmonacoapi",main:"src/index.tsx",destructuring:!0,subName:""},configure:{props:[{title:"\u6bd4\u5bf9\u6570\u636e",name:"original",supportVariable:!0,defaultValue:"",setter:["StringSetter"]},{title:"\u9ed8\u8ba4\u6570\u636e",name:"value",supportVariable:!0,defaultValue:"",setter:["StringSetter"]},{title:"\u5bbd\u5ea6",name:"width",supportVariable:!0,defaultValue:"auto",setter:["StringSetter"]},{title:"\u9ad8\u5ea6",name:"height",supportVariable:!0,defaultValue:"auto",setter:["StringSetter"]},{title:"\u8bed\u8a00",name:"language",supportVariable:!0,defaultValue:"sql",setter:{componentName:"SelectSetter",props:{options:[{label:"apex",value:"apex"},{label:"azcli",value:"azcli"},{label:"bat",value:"bat"},{label:"c",value:"c"},{label:"clojure",value:"clojure"},{label:"coffeescript",value:"coffeescript"},{label:"cpp",value:"cpp"},{label:"csharp",value:"csharp"},{label:"csp",value:"csp"},{label:"css",value:"css"},{label:"dockerfile",value:"dockerfile"},{label:"fsharp",value:"fsharp"},{label:"go",value:"go"},{label:"graphql",value:"graphql"},{label:"handlebars",value:"handlebars"},{label:"html",value:"html"},{label:"ini",value:"ini"},{label:"java",value:"java"},{label:"javascript",value:"javascript"},{label:"json",value:"json"},{label:"kotlin",value:"kotlin"},{label:"less",value:"less"},{label:"lua",value:"lua"},{label:"markdown",value:"markdown"},{label:"msdax",value:"msdax"},{label:"mysql",value:"mysql"},{label:"objective-c",value:"objective-c"},{label:"pascal",value:"pascal"},{label:"perl",value:"perl"},{label:"pgsql",value:"pgsql"},{label:"php",value:"php"},{label:"plaintext",value:"plaintext"},{label:"postiats",value:"postiats"},{label:"powerquery",value:"powerquery"},{label:"powershell",value:"powershell"},{label:"pug",value:"pug"},{label:"python",value:"python"},{label:"r",value:"r"},{label:"razor",value:"razor"},{label:"redis",value:"redis"},{label:"redshift",value:"redshift"},{label:"ruby",value:"ruby"},{label:"rust",value:"rust"},{label:"sb",value:"sb"},{label:"scheme",value:"scheme"},{label:"scss",value:"scss"},{label:"shell",value:"shell"},{label:"sol",value:"sol"},{label:"sql",value:"sql"},{label:"st",value:"st"},{label:"swift",value:"swift"},{label:"tcl",value:"tcl"},{label:"typescript",value:"typescript"},{label:"vb",value:"vb"},{label:"xml",value:"xml"},{label:"yaml",value:"yaml"}]}}},{title:"\u8def\u5f84",name:"path",supportVariable:!0,defaultValue:"",setter:["StringSetter"]},{title:"\u98ce\u683c",name:"theme",supportVariable:!0,defaultValue:"vs-dark",setter:{componentName:"RadioGroupSetter",props:{options:[{label:"vs",value:"vs"},{label:"hc-black",value:"hc-black"},{label:"vs-dark",value:"vs-dark"},{label:"hc-light",value:"hc-light"}]}}}],supports:{style:!0,className:!0,events:["editorDidMount","editorWillMount","onChange"]},component:{}}},h,S,j=[{title:"code\u6bd4\u5bf9",screenshot:"http://cdn.itq168.com/img/20221213133810.png?imageslim",schema:{componentName:"diffmonacoapi",props:{width:"100%",height:"400px",original:JSON.stringify({a:"\u65b9\u5757\u667a\u8fde"},null,2),value:JSON.stringify({b:"\u65b9\u5757\u667a\u8fde"},null,2)}}}],O=f(f({},g),{},{snippets:j});function w(e){return(w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function V(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,l)}return r}function N(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?V(Object(r),!0).forEach((function(t){P(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):V(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function P(e,t,r){return(t=k(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function k(e){var t=x(e,"string");return"symbol"===w(t)?t:String(t)}function x(e,t){if("object"!==w(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var l=r.call(e,t||"default");if("object"!==w(l))return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}var q,E=[{title:"json\u7f16\u8f91\u5668",screenshot:"http://cdn.itq168.com/img/20230105105333.png?imageslim",schema:{componentName:"jsonView",props:{}}}],D=N(N({},{componentName:"jsonView",title:"json\u7f16\u8f91\u5668",group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",category:"\u7f16\u8f91\u5668",docUrl:"",screenshot:"http://cdn.itq168.com/img/20230105105333.png?imageslim",devMode:"proCode",npm:{package:"ealge-lowcode-operation",version:"0.1.6",exportName:"jsonView",main:"src/index.tsx",destructuring:!0,subName:""},configure:{props:[{title:"value",name:"src",description:"\u6570\u636e",supportVariable:!0,setter:{componentName:"JsonSetter",isRequired:!0,initialValue:{}}},{title:"defaultValue",name:"defaultValue",description:"\u6570\u636e",supportVariable:!0,setter:{componentName:"JsonSetter",isRequired:!0,initialValue:{}}},{title:"\u4e3b\u9898",name:"theme",description:"\u4e3b\u9898",supportVariable:!0,setter:{initialValue:"rjv-default",componentName:"SelectSetter",props:{options:[{label:"rjv-default",value:"rjv-default"},{label:"ashes",value:"ashes"},{label:"bespin",value:"bespin"},{label:"apathy",value:"apathy"},{label:"apathy:inverted",value:"apathy:inverted"},{label:"brewer",value:"brewer"},{label:"threezerotwofour",value:"threezerotwofour"}]}}},{title:"icon\u6837\u5f0f",name:"iconStyle",supportVariable:!0,setter:{initialValue:"circle",componentName:"SelectSetter",props:{options:[{label:"circle",value:"circle"},{label:"square",value:"square"},{label:"triangle",value:"triangle"}]}}},{title:"\u662f\u5426\u65b0\u589e",name:"onAdd",supportVariable:!0,setter:{initialValue:!0,componentName:"BoolSetter"}},{title:"\u662f\u5426\u7f16\u8f91",name:"onEdit",supportVariable:!0,setter:{initialValue:!1,componentName:"BoolSetter"}},{title:"\u662f\u5426\u5220\u9664",name:"onDelete",supportVariable:!0,setter:{initialValue:!1,componentName:"BoolSetter"}},{title:"\u6298\u53e0",name:"collapsed",supportVariable:!0,setter:{initialValue:!1,componentName:"BoolSetter"}},{title:"\u5185\u90e8\u6392\u5e8f",name:"sortKeys",supportVariable:!0,setter:{initialValue:!1,componentName:"BoolSetter"}},{title:"\u5931\u8d25\u6d88\u606f",name:"validationMessage",supportVariable:!0,description:"onEdit\u3001onAdd\u6216onDelete\u56de\u8c03\u7684\u9a8c\u8bc1\u5931\u8d25\u7684\u81ea\u5b9a\u4e49\u6d88\u606f",setter:{componentName:"StringSetter",initialValue:"\u9519\u8bef\u7684\u64cd\u4f5c"}}],supports:{style:!0,events:["onAdd","onEdit","onDelete","onSelect"],className:!0},component:{}}}),{},{snippets:E});function M(e){return(M="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,l)}return r}function A(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?C(Object(r),!0).forEach((function(t){B(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):C(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function B(e,t,r){return(t=T(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function T(e){var t=z(e,"string");return"symbol"===M(t)?t:String(t)}function z(e,t){if("object"!==M(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var l=r.call(e,t||"default");if("object"!==M(l))return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}var U,X=[{title:"code\u7f16\u8f91\u5668",screenshot:"http://cdn.itq168.com/img/20221212211319.png?imageslim",schema:{componentName:"monacoapi",props:{width:"100%",height:"400px",data:"select * from abc"}}}],_=A(A({},{componentName:"monacoapi",title:"code\u7f16\u8f91\u5668",group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",category:"\u7f16\u8f91\u5668",docUrl:"",screenshot:"http://cdn.itq168.com/img/20221212211319.png?imageslim",devMode:"proCode",npm:{package:"ealge-lowcode-operation",version:"0.1.0",exportName:"monacoapi",main:"src/index.tsx",destructuring:!0,subName:""},configure:{props:[{title:"\u6570\u636e\u6e90",name:"data",supportVariable:!0,defaultValue:"",setter:["StringSetter"]},{title:"\u5bbd\u5ea6",name:"width",supportVariable:!0,defaultValue:"auto",setter:["StringSetter"]},{title:"\u9ad8\u5ea6",name:"height",supportVariable:!0,defaultValue:"auto",setter:["StringSetter"]},{title:"\u8bed\u8a00",name:"language",supportVariable:!0,defaultValue:"sql",setter:{componentName:"SelectSetter",props:{options:[{label:"apex",value:"apex"},{label:"azcli",value:"azcli"},{label:"bat",value:"bat"},{label:"c",value:"c"},{label:"clojure",value:"clojure"},{label:"coffeescript",value:"coffeescript"},{label:"cpp",value:"cpp"},{label:"csharp",value:"csharp"},{label:"csp",value:"csp"},{label:"css",value:"css"},{label:"dockerfile",value:"dockerfile"},{label:"fsharp",value:"fsharp"},{label:"go",value:"go"},{label:"graphql",value:"graphql"},{label:"handlebars",value:"handlebars"},{label:"html",value:"html"},{label:"ini",value:"ini"},{label:"java",value:"java"},{label:"javascript",value:"javascript"},{label:"json",value:"json"},{label:"kotlin",value:"kotlin"},{label:"less",value:"less"},{label:"lua",value:"lua"},{label:"markdown",value:"markdown"},{label:"msdax",value:"msdax"},{label:"mysql",value:"mysql"},{label:"objective-c",value:"objective-c"},{label:"pascal",value:"pascal"},{label:"perl",value:"perl"},{label:"pgsql",value:"pgsql"},{label:"php",value:"php"},{label:"plaintext",value:"plaintext"},{label:"postiats",value:"postiats"},{label:"powerquery",value:"powerquery"},{label:"powershell",value:"powershell"},{label:"pug",value:"pug"},{label:"python",value:"python"},{label:"r",value:"r"},{label:"razor",value:"razor"},{label:"redis",value:"redis"},{label:"redshift",value:"redshift"},{label:"ruby",value:"ruby"},{label:"rust",value:"rust"},{label:"sb",value:"sb"},{label:"scheme",value:"scheme"},{label:"scss",value:"scss"},{label:"shell",value:"shell"},{label:"sol",value:"sol"},{label:"sql",value:"sql"},{label:"st",value:"st"},{label:"swift",value:"swift"},{label:"tcl",value:"tcl"},{label:"typescript",value:"typescript"},{label:"vb",value:"vb"},{label:"xml",value:"xml"},{label:"yaml",value:"yaml"}]}}},{title:"\u8def\u5f84",name:"path",supportVariable:!0,defaultValue:"",setter:["StringSetter"]},{title:"\u98ce\u683c",name:"theme",supportVariable:!0,defaultValue:"vs-dark",setter:{componentName:"RadioGroupSetter",props:{options:[{label:"vs",value:"vs"},{label:"hc-black",value:"hc-black"},{label:"vs-dark",value:"vs-dark"},{label:"hc-light",value:"hc-light"}]}}}],supports:{style:!0,events:["editorDidMount","editorWillMount","onChange"],className:!0},component:{}}}),{},{snippets:X});function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function J(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,l)}return r}function R(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?J(Object(r),!0).forEach((function(t){L(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):J(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function L(e,t,r){return(t=F(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function F(e){var t=G(e,"string");return"symbol"===I(t)?t:String(t)}function G(e,t){if("object"!==I(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var l=r.call(e,t||"default");if("object"!==I(l))return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}var W,K=[{title:"ws\u7ec4\u4ef6",screenshot:"http://cdn.itq168.com/img/20221221091020.png?imageslim",schema:{componentName:"Xterminal",props:{url:"127.0.0.1:8000/ws/webssh/"}}}],$=R(R({},{componentName:"Xterminal",title:"ws\u7ec4\u4ef6",docUrl:"",group:"\u81ea\u5b9a\u4e49\u7ec4\u4ef6",category:"\u7f16\u8f91\u5668",screenshot:"http://cdn.itq168.com/img/20221221091020.png?imageslim",devMode:"proCode",npm:{package:"ealge-lowcode-operation",version:"0.1.5",exportName:"Xterminal",main:"src/index.tsx",destructuring:!0,subName:""},configure:{props:[{title:"\u80cc\u666f\u989c\u8272",name:"theme.background",defaultValue:"black",supportVariable:!0,setter:{componentName:"ColorSetter"}},{title:"\u5149\u6807\u989c\u8272",name:"theme.cursor",defaultValue:"yellow",supportVariable:!0,setter:{componentName:"ColorSetter"}},{title:"\u5149\u6807\u6837\u5f0f",name:"cursorStyle",defaultValue:"block",supportVariable:!0,setter:{componentName:"ColorSetter"}},{title:"\u5b57\u4f53\u989c\u8272",name:"theme.foreground",defaultValue:"block",supportVariable:!0,setter:{componentName:"ColorSetter"}},{title:"\u5b57\u4f53\u5927\u5c0f",name:"fontSize",defaultValue:12,supportVariable:!0,setter:{componentName:"NumberSetter"}},{title:"\u7ec8\u7aef\u56de\u6eda",name:"scrollback",defaultValue:500,supportVariable:!0,setter:{componentName:"NumberSetter"}},{title:"\u6e32\u67d3\u7c7b\u578b",name:"rendererType",defaultValue:"canvas",supportVariable:!0,setter:{componentName:"StringSetter"}},{title:{label:"\u5149\u6807\u914d\u7f6e",tip:"\u542f\u7528\u65f6\uff0c\u5149\u6807\u5c06\u8bbe\u7f6e\u4e3a\u4e0b\u4e00\u884c\u7684\u5f00\u5934"},name:"convertEol",defaultValue:!0,supportVariable:!0,setter:{componentName:"BoolSetter"}},{title:{label:"\u5149\u6807\u95ea\u70c1",tip:"\u5149\u4ea4\u662f\u5426\u95ea\u70c1"},name:"cursorBlink",defaultValue:!0,supportVariable:!0,setter:{componentName:"BoolSetter"}},{title:{label:"\u5149\u6807\u8f93\u5165",tip:"\u662f\u5426\u7981\u6b62\u8f93\u5165"},name:"disableStdin",defaultValue:!1,supportVariable:!0,setter:{componentName:"BoolSetter"}},{title:{label:"token",tip:"\u4f20\u9012token\u6570\u636e"},name:"token",supportVariable:!0,setter:{componentName:"StringSetter"}},{title:{label:"\u8bf7\u6c42\u5730\u5740",tip:"websocket\u8bf7\u6c42\u5730\u5740"},name:"url",supportVariable:!0,setter:{componentName:"StringSetter"}}],supports:{style:!0,className:!0},component:{}}}),{},{snippets:K});function H(e,t){return Z(e)||Y(e,t)||re(e,t)||Q()}function Q(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function Y(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var l,a,o,n,i=[],u=!0,p=!1;try{if(o=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(l=o.call(r)).done)&&(i.push(l.value),i.length!==t);u=!0);}catch(e){p=!0,a=e}finally{try{if(!u&&null!=r.return&&(n=r.return(),Object(n)!==n))return}finally{if(p)throw a}}return i}}function Z(e){if(Array.isArray(e))return e}function ee(e){return ae(e)||le(e)||re(e)||te()}function te(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function re(e,t){if(e){if("string"==typeof e)return oe(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?oe(e,t):void 0}}function le(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function ae(e){if(Array.isArray(e))return oe(e)}function oe(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,l=new Array(t);r<t;r++)l[r]=e[r];return l}function ne(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,l)}return r}function ie(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ne(Object(r),!0).forEach((function(t){ue(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ne(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ue(e,t,r){return(t=pe(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function pe(e){var t=ce(e,"string");return"symbol"===se(t)?t:String(t)}function ce(e,t){if("object"!==se(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var l=r.call(e,t||"default");if("object"!==se(l))return l;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}function se(e){return(se="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var be={};function me(e){var t=[{title:"\u5e38\u7528",icon:"",children:[]},{title:"\u5bb9\u5668",icon:"",children:[]},{title:"\u5bfc\u822a",icon:"",children:[]},{title:"\u5185\u5bb9",icon:"",children:[]},{title:"Feedback \u53cd\u9988",icon:"",children:[]}],r={"\u539f\u5b50\u7ec4\u4ef6":!0},l={};return e.forEach((function(e){var a=e.category||"\u5176\u4ed6";e.group&&!l[e.componentName]&&(l[e.componentName]=e.group),e.group&&!r[e.group]&&(r[e.group]=!0);var o=t.find((function(e){return e.title===a}));o||(o={title:a,icon:"",children:[]},t.push(o)),e.snippets&&e.snippets.length&&o.children.push({componentName:e.componentName,title:e.title||e.componentName,sort:{category:o.title,group:l[e.componentName]||"\u539f\u5b50\u7ec4\u4ef6",priority:be[o.title]||0},icon:"",package:e.npm.pkg,snippets:e.snippets||[]})})),t}function fe(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ealge-lowcode-operation",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0.1.9",l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{"@alifd/next":"1.25.23","@alifd/meet":"2.6.3",antd:"4.17.3"};if(!e||!r)return e;var a=e.npm;return a?("object"===se(l)&&l[a.package]?e.npm=ie(ie({},a),{},{version:l[a.package]}):a.package===t&&(e.npm=ie(ie({},a),{},{version:r})),e):e}["\u57fa\u7840\u5143\u7d20","\u5e03\u5c40\u5bb9\u5668\u7c7b","\u8868\u683c\u7c7b","\u8868\u5355\u8be6\u60c5\u7c7b","\u5e2e\u52a9\u7c7b","\u5bf9\u8bdd\u6846\u7c7b","\u4e1a\u52a1\u7c7b","\u901a\u7528","\u5f15\u5bfc","\u4fe1\u606f\u8f93\u5165","\u4fe1\u606f\u5c55\u793a","\u4fe1\u606f\u53cd\u9988"].reverse().forEach((function(e,t){be[e]=++t}));var ve,ye=[],de={};[s,O,D,_,$].forEach((function(e){if(Array.isArray(e))ye.push.apply(ye,ee(e.map((function(e){if(!e.npm){var t=e.componentName,r=t.split("."),l=H(r,2),a=l[0],o=l[1];e.npm={exportName:a,main:"",destructuring:!0,subName:r.length>1?t.slice(t.indexOf(".")+1):o}}return e.npm=ie(ie({},de),e.npm||{}),fe(e)}))));else if(e.components)ye.push.apply(ye,ee(e.components.map((function(e){if(!e.npm){var t=e.componentName,r=t.split("."),l=H(r,2),a=l[0],o=l[1];e.npm={exportName:a,main:"",destructuring:!0,subName:r.length>1?t.slice(t.indexOf(".")+1):o}}return e.npm=ie(ie({},de),e.npm||{}),fe(e)}))));else{if(!e.npm){var t=e.componentName,r=t.split("."),l=H(r,2),a=l[0],o=l[1];e.npm={exportName:a,main:"",destructuring:!0,subName:r.length>1?t.slice(t.indexOf(".")+1):o}}e.npm=ie(ie({},de),e.npm||{}),ye.push(fe(e))}}));var ge=me(ye),he=!0}])}));