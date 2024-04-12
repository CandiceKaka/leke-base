---    
title: 标签模式
---

```jsx
import React, {useState} from 'react';
import {Select,Switch} from '@leke/rc';

export default function(){
    const options=new Array(10).fill('').map((item,index)=>({label:""+index+index,value:index}));
    return(
        <>
            <Select width="middle" mode="tags" allowClear options={options} placeholder='请选择' />
        </>
    );
}
```

