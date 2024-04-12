## store
#### 使用 npm 或 yarn 安装
```
npm install @leke/store --save
yarn add @leke/store --save
```

## 使用
```jsx
import React from 'react';
import {useData,useDispatch,StoreProvider} from '@leke/store';
function selector(state){
    return state.count;
}
function Demo (){
    const count=useData(selector);
    const dispatch=useDispatch();
    return(
        <div>
            <p>{count}</p>
            <button onClick={()=>dispatch({count:count+1})}>增加</button>
        </div>
    );
}
export default function(){
    return <StoreProvider data={{count:1}}><Demo /></StoreProvider>;
}
```
## useData
useData会为selector返回的数据创建订阅，当dispatch时根据compare返回结果判断是否更新组件
```js
function selector(state){
    return {
        text:state.text,
        visible:state.visible
    };
}
function compare(prev,next) {
    return prev.visible===next.visible;   //当visible发生变化时更新数据
}
const {text,visible}=useData(selector,compare);
```
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| selector | 定义useData返回的数据 | any | _ |
| compare | 定义更新的规则，返回false时将更新 | (prev,next)=>boolean | 浅比较 |

## useStore
```js
const {getData,setData}=useStore;
```
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| getData | 获取store中的数据 | ()=>any | _ |
| setData | 更新store中的数据 | (object)=>void | _ |