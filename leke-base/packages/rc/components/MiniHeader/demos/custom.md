---    
title: 参数外部传入
description: userInfo与messageCount支持外部传入，如果不传，内部将发起http请求获取
---
```jsx
import React from 'react';
import {MiniHeader} from '@leke/rc';

export default function(){
    return  <MiniHeader userInfo={null}/>;
}
```

