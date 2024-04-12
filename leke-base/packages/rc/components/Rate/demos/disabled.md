---    
title: 只读状态
description: 只读+默认数值
---

```jsx
import React from 'react';
import {Rate} from '@leke/rc';

export default function(){
    return(
        <Rate defaultValue={6} count={10} disabled/>
    );
}
```