## 工程介绍

- 整个项目使用 package.json 中的 workspace 管理，所有依赖共享
- website 为官网工程
- packages/\*是发布至 npm 中的源码工程
- tsetUtil 是 jest 通用测试方法
- 通过 tsconfig 中的 path 与 website 中 webpack 的 alias 配置依赖路径解析

## 命令行

```
{
    "build:icons": gulp打包packages/icons
    "build:hooks": gulp打包packages/hooks
    "build:rc": gulp打包packages/rc
    "build:website": webpack打包website
    "dev:website": 官网开发环境
    "dev": 先打包icons，然后启动开发环境
    "test": 启动单元测试，输出覆盖率文档
    "test:update": 更新单元测试快照
    "lint": 代码规范校验
    "fix": 自动格式化代码规范
    "tsc": ts类型校验
}
注意：
1.当添加svg至icons中时，需执行npm run build:icons
2.commit会对代码进行校验（tsc与fix），未通过无法提交代码，请大家注意代码规范与ts类型，必要时可通过eslint-disable避开eslint代码校验
```

## 单元测试

- 在每个组件或者 hook 文件夹下创建**test**文件夹，测试用例都放在其中，包括内部逻辑测试与 demo 测试（已封装好方法，调用就行）
- 使用[@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)编写组件测试用例
- 使用[@testing-library/react-hooks](https://react-hooks-testing-library.com/reference/api/)编写 hooks 测试用例
- 使用[@testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event)可以模拟 dom 事件

## demos

- 在每个组件或者 hook 文件夹下创建 demos 文件夹
- demos 使用.md 文件，支持 html 语法
- demos 应该包括核心功能渲染与参数描述，hooks 还需对 result 进行描述，如果包含 http 请求，还需添加 mock 数据
- [demos 输出规范](https://gitlab.leke.cn/frontend/fe-basics/leke-base/-/blob/master/packages/rc/components/MiniHeader/demos/index.ts)

## 官网路由配置

每个事业线可以创建一个 group，一个 group 大概是这样

```json
{
    title:'通用',
    keys:[
        'useResolve'  //组件名或hooks名
    ]
}
通过import(`path/${key}/demos/index.ts`)的形式按需加载
```

## npm 测试包版本

- 修改 package.json，如"version": "1.0.1-test"
- npm publish --tag=test
- npm install \<packageName\>@test
- test 可以随意命名。建议采用自己独有的命名
