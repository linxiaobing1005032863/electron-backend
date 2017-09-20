# electron-backend

## 前言：
这是基于electron与react开发的一个简易后台管理系统，Electron 是 GitHub 发布的跨平台桌面应用开发工具，支持 Web 技术开发桌面应用，其本身是基于 C++ 开发的，GUI 核心来自于 Chrome，而 JavaScript 引擎使用 v8,在electron上可以轻易的跨平台。

本项目技术栈：
## electron + react + reat-router + react-redux + es6 + antd

## 效果如下：

![image](https://github.com/LuoShengMen/electron-backend/blob/master/public/one.png)
![image](https://github.com/LuoShengMen/electron-backend/blob/master/public/two.png)



## 命令行
``` bash

# install dependencies
"inst": "npm install --registry=https://registry.npm.taobao.org",

# run in electron
"electron": "electron .",

 # 打包文件
 "packager": "electron-packager . yuan --platform win32 --electronVersion 1.4.13 --overwrite",
 
 # start
 "start": "react-scripts start",
 
 # 编译文件
"build": "react-scripts build",

```

