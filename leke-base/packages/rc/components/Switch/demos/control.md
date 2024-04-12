---    
title: 受控组件
description: 传入checked和onChange控制状态
---

```jsx
import React,{useState} from 'react';
import {Switch} from '@leke/rc';

export default function(){
    const [checked, setChecked] = useState(true);
    const onClick = (ret, e) => {
        console.log("onClick =>", ret, e);
    };
    return(
        <>
            <Switch checked={checked} onChange={setChecked} onClick={onClick} />
        </>
    );
}
```


