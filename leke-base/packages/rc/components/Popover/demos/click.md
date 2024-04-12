---    
title: 点击时弹出下拉菜单
---
```jsx
import React from 'react';
import {Popover} from '@leke/rc';

export default function(){
    return(
        <Popover 
            popup={<div style={{height:50,width:50}}>popup</div>}
            eventType={['click']}
        >
            <a>click me</a>
        </Popover>
    );
}
```

