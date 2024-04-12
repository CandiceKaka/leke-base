---    
title: 解析静态数据
---

```jsx
import React from 'react';
import {useResolve} from '@leke/hooks';

export default function() {
    const {data,loading,error}=useResolve('hello world');
    return (
        <div>
            <p>{data}</p>
            <p>{String(loading)}</p>
            <p>{String(error)}</p>
        </div>
    );
}
```