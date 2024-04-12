## 安装
#### 使用 npm 或 yarn 安装
```
npm install @leke/rc @leke/icons @leke/hooks --save
yarn add @leke/rc @leke/icons @leke/hooks --save
```
## 按需加载<br>
js支持基于 ES modules 的 tree shaking，需引入全部样式:
```js
import '@leke/rc/style/index.less'; //or '@leke/rc/style/index.css'
```
使用babel-import-plugin,配置如下:
```js
["import", 
    {
        libraryName: "@leke/rc",
        libraryDirectory: "es",
        camel2DashComponentName: false,
        style(name) {
            return `${name}/index.less`.replace('/es/','/style/');
        }
    }
];
```
如果你的项目使用typescript解析，可使用[ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin)

## 配置http请求工具
```js
import {configure} from "@leke/rc";
import http from '@leke/http';
configure({http});
```

