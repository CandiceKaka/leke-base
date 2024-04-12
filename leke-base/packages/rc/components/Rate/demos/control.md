---    
title: 受控 + 文案展示
description: 受控组件，加上文案展示
---

```jsx
import React, { useState } from 'react';
import {Rate} from '@leke/rc';

export default function(){
    const [value,setValue] = useState(2);
    return(
        <div className="center">
            <Rate allowHalf value={value} onChange={setValue}/>
            {!!value && <span>{value.toFixed(1)}</span>}
        </div>
    );
}
```

```css
.center {
    display: flex;
    align-items: center;
}
```