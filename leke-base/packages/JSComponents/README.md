原生JS组件库

## 安装
#### 使用 npm 或 yarn 安装
```
npm install @leke/JSComponents --save
yarn add @leke/JSComponents --save

```
## 如何使用第三方库
举例：使用jsonp
- JSComponents/rollup.config.js文件中external增加jsonp
```
...,
external:[/@babel\/runtime/,/jsonp/,'@leke/http'],//编译打包后的文件排除第三方库代码
...
```
## 新增组件
例如新增BusinessHeader
- 第一步：在src下建文件夹BusinessHeader，注意结构保持一致
- 第二步：JSComponents/src/index.ts 文件中增加BusinessHeader
- 第三步：JSComponents/entry-arr.js 文件中增加BusinessHeader
- 第四步：JSComponents/index.cjs.js 文件中增加BusinessHeader
- 第五步：JSComponents/index.esm.js 文件中增加BusinessHeader

```
{
  BusinessHeader: path.resolve("./src/BusinessHeader/index.ts")
}

```

## 编译

```
yarn build:JSComponents
```

## 升级@leke/JSComponents

- 修改JSComponents/package.json中版本号

- 切到JSComponents目录下
```
cd ./packages/JSComponents
```
- npm源切到公司私有仓库地址


- 先发布测试包
```
npm publish --tag=taolixia 版本号
*建议测试包名称：1.0.0-taolixia-beta1
```

- 通过测试后发正式包
```
npm publish 版本号
```

## 集成到@leke/rc中
在rc/package.json中增加版本依赖
