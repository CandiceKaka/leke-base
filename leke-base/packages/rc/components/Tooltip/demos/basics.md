---    
title: 基本用法
description: 最基本的，鼠标移入就出现tooltip提示
---

```jsx
import React from 'react';
import {Tooltip, Button} from '@leke/rc';

export default function(){
    return(
        <>
            <Tooltip 
                popup={<div className="popup">popup</div>}
                placement={"topLeft"}
            >
                <span className="childrens">鼠标移入显示Tooltip</span>
            </Tooltip>
        </>
    );
}
```

```css
.linksty{
    display: inline-block;
}
.childrens{
    margin-right: 20px;
}
.popup{
    display: inline-block;
}
```