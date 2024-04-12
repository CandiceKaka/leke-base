---    
title: 基本用法
---

```jsx
import React,{useState} from 'react';
import {useResolve} from '@leke/hooks';

function resolveData(n) {
    return new Promise(resolve => {
        setTimeout(()=>{resolve(n);},2000);
    });
}
export default function() {
    const [num,setNum]=useState(10);
    const {data,loading}=useResolve(resolveData,[num]);
    return (
        <div>
            <p>{loading?'loading...':data}</p>
            <button onClick={()=>setNum(num+1)}>增加</button>
        </div>
    );
}
```