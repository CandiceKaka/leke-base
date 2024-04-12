---    
title: API
---
```
const {data,error,loading} = useResolve(value , dep);
```
## params
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| value | 需要解析的value，如果value不是function，data=value | any \| (any)=>Promise | _ |
| dep | 依赖，发生变化时会重新解析value,如果value是function，将作为参数传给value | any[] | _ |

## result
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| data | 返回数据 | any | _ |
| loading | 解析中为true，解析完毕为false | boolean | true |
| error | 捕获到的错误 | any | _ |

