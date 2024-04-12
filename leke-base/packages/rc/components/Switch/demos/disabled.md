---    
title: 禁用
description: 禁用按钮样式
---

```jsx
import React,{useState} from 'react';
import {Switch,Button} from '@leke/rc';

export default function(){
    const [disabled,setDisabled] = useState(true);
    const onToggle = () => {
        setDisabled(!disabled);
    };
    return(
        <>
            <Switch disabled={disabled} defaultChecked/>
            <br />
            <Switch disabled={disabled} size="small"/>
            <br />
            <br />
            <Button onClick={onToggle} type='main'>toggle disabled</Button>
        </>
    );
}
```


