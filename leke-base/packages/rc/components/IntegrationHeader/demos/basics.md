---    
title: 基本用法
description: 组件内部会请求后端获取用户信息与消息数量
---
```jsx
import React from 'react';
import {IntegrationHeader} from '@leke/rc';

export default function(){
    return  <IntegrationHeader title="学生综合素质评价" menuList={[{label:'实时评价',url:'#rc/IntegrationHeader/aaa'},{label:'实时评价',url:'#rc/IntegrationHeader/bbb'}]}/>;
}
```

