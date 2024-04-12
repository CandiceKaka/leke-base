---    
title: 箭头指向
description: 默认状态鼠标移入就会显示弹层,还有颜色换整套背景颜色和字体颜色
---

```jsx
import React from 'react';
import {Tooltip, Button} from '@leke/rc';

export default function(){
    return(
        <>
            <Tooltip 
                popup={'popup'}
                placement={"topLeft"}
            >
                <Button className="childrens">Align edge / 边缘对齐</Button>
            </Tooltip>
            <Tooltip 
                popup={<div>popup</div>}
                placement={"topLeft"}
                arrowPointAtCenter
            >
                <Button className="childrens">arrow point at center / 箭头指向中心</Button>
            </Tooltip>
        </>
    );
}
```

```css
.childrens{
    margin-right: 20px;
}
```