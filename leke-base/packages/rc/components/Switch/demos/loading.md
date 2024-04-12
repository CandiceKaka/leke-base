---
title: 加载中
description: 加载中样式此时开关不可操作
---

```jsx
import React,{useState} from 'react';
import {Switch,Button} from '@leke/rc';

export default function(){
    const [loading,setLoading] = useState(true);
    const onToggle = () => {
        setLoading(!loading);
    };
    return(
        <>
            <Switch defaultChecked loading={loading}/>
            <br />
            <Switch size="small" loading={loading}/>
            <br />
            <br />
            <Button onClick={onToggle} type='main'>toggle loading</Button>
        </>
    );
}
```