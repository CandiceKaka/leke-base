## SSR脚手架
#### 使用 npm 或 yarn 安装
```
npm install @leke/ssr --save
yarn add @leke/ssr --save
```
## 启动
在package.json scripts中添加此配置
```
{
    "dev": "cross-env NODE_ENV=development leke dev",
    "build": "cross-env NODE_ENV=production leke build",
    "debug": "cross-env NODE_ENV=development leke debug"
}
```
## 配置
在nodejs运行目录下创建leke.config.js,配置大致如下：
```js
module.exports={
    cssModules:false,
    entry:'./src/index.ts',
    devServer:{
        port:9999,
        serveIndex:false,
        host:'localhost'
    },
    browsers:[
        "last 2 versions",
        "ie >= 11"
    ],
    babelConfig (config,target) {
        if(target==='web'){
            config.plugins.push(
                ["import",
                    {
                        libraryName: "@leke/rc",
                        libraryDirectory: "es",
                        camel2DashComponentName: false,
                        style(name) {
                            return `${name}/index.less`.replace('/es/','/style/');
                        }
                    }
                ]
            );
        }
    },
    webpackConfig(config){},
    postcssConfig(config){},
    modifyVars:{}
};
```

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| cssModules | 是否启用cssModules，[配置详情](https://www.npmjs.com/package/css-loader) | boolean \| object | false |
| entry | 入口文件路径| string | _ |
| devServer | [开发服务器配置](https://webpack.docschina.org/configuration/dev-server/#devserveropenpage) | object | { port:9999, serveIndex:false, host:"localhost" } |
| browsers | 根据提供的浏览器进行js补丁与css前缀补全| Array | \[ "last 2 versions","ie >= 11" \] |
| babelConfig | 自定义babel-loader配置 | (config, target:"web" \| "node")=>void | _ |
| postcssConfig | 自定义postcss-loader的配置，[配置详情](https://www.npmjs.com/package/postcss-loader) | (config)=>void | _ |
| webpackConfig | 自定义webpack配置 | (config)=>void | _ |
| modifyVars | less主题定制 | object | _ |

## entry
```js
import React from "react";
import start from "@leke/ssr";
import {createHttp} from "@leke/http";

const headContent=(
    <>
        <meta charSet="utf-8" />
        <meta httpEquiv="Cache-Control" content="no-cache" />
        <link type="image/x-icon" rel="shortcut icon" href="https://static.leke.cn/images/common/favicon.ico" />
    </>
);

export default start({
    publicPath:'/test',
    headContent:headContent,
    createRequest(req){
        const {ticket}=req.cookies;
        const Cookie=ticket?`ticket=${ticket}`:'';
        return createHttp({
            headers:{Cookie},
            baseURL:'https://webapp.leke.cn'
        });
    },
    errorInterceptor(error,req,res,next){
        //错误拦截器,此方法拦截错误并处理，未处理的错误请执行next(error)
        const status=error?error.status:null;
        switch (status) {
        case 404:
            res.redirect('https://repository.leke.cn/error/404.htm');
            break;
            //.....
        default:
            next(error);
            break;
        }
    },
    routes:[
        {
            path:'/demo',
            getComponent(){
                return import('./demo');
            }
        }
    ]
});
```
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| publicPath | 访问路径公共前缀 | string | _ |
| headContent | html页面head中内容 | ReactNode \| (req)=>ReactNode | _ |
| path | 访问的路径应为publicPath+path | string | _ |
| getComponent | 按需加载PageComponent | ()=>Promise<SSRpage\> | _ |
| createRequest | node端请求工具配置，通常需要配置cookie等，将作为getInitialData的第一个参数 | (req)=>any | _ | 
| errorInterceptor | 错误拦截器 | (error,req,res,next)=>void | _ |

## PageComponent
```tsx
import React from "react";
import {SSRPage} from "@leke/ssr";
interface propsType {
    text:string
}

const PageComponent:SSRPage<propsType>=function(props){
    return (
        <div>{props.text}</div> // hello
    );
};
PageComponent.getInitialData=async function (http,req,res) {
    return {
        text:'hello'
    };
};
export default PageComponent;
```
## SSR模块引用
```
<script src=`${publicPath}${path}?type=module&&rootId=${rootId}`></script>
//rootId为挂载dom的Id
```

