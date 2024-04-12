---    
title: 自定义字符
description: 支持自定义字符
---

```jsx
import React from 'react';
import {Rate} from '@leke/rc';
import {CheckCircleFill,CloseCircleFill,Star} from '@leke/icons';

const customIcons = {
    1: <CheckCircleFill />,
    2: <CheckCircleFill />,
    3: <Star />,
    4: <CloseCircleFill />,
    5: <CloseCircleFill />,
};

export default function(){
    return(
        <div>
            <div><Rate defaultValue={2} allowHalf character={5}/></div>
            <div><Rate defaultValue={3} allowHalf character={'A'}/></div>
            <div><Rate defaultValue={4} allowHalf character={<CheckCircleFill />}/></div>
            <div><Rate defaultValue={3} allowHalf character={({ index }) => index + 1}/></div>
            <div><Rate defaultValue={2} allowHalf character={({ index }) => customIcons[index + 1]}/></div>
        </div>
    );
}
```

```css

```