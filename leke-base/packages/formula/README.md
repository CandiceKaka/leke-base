## 公式编辑器
#### 使用 npm 或 yarn 安装
```
npm install @leke/formula --save
yarn add @leke/formula --save
```

## 配置
在nodejs运行目录下创建leke.config.js,配置大致如下：
```js
import Formula from '@leke/formula';
const formula=new Formula(document.getElementById('root'));
formula.latex(); //获取latex公式
formula.latex('\\frac{1}{2}'); //根据latex渲染公式
```

## 实例API
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| latex | 获取或者重置公式 | ?:string | _ |
| toDataURL | 获取base64 Url| _ | _ |


