---    
title: 基本用法
description: 默认正常大小，可选默认打开和小开关
---

```jsx
import React from 'react';
import {Switch} from '@leke/rc';

export default function(){
    return(
        <>
            <Switch autoFocus defaultChecked/>
            <br />
            <Switch size="small"/>
        </>
    );
}
```

