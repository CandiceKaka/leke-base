---    
title: 获取错误信息
---

```jsx
import React from 'react';
import {useResolve} from '@leke/hooks';

function rejectData() {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{reject('error');},2000);
    });
}
export default function() {
    const {loading,error}=useResolve(rejectData);
    return (
        <p>{loading?'loading...':error}</p>
    );
}
```