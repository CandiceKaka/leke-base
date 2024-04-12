---    
title: 基本用法
description: 两种大小可选，默认第一种
---

```jsx
import React from 'react';
import {Spin} from '@leke/rc';

export default function(){
    return(
        <div className="spin-basics">
            <Spin />
            <Spin size="small" />
        </div>
    );
}
```

```css
.spin-basics {
  display: inline-flex;
  align-items: center;
}

.spin-basics .leke-spin-animation {
  margin-right: 20px;
}
```
