---
title: Radio group
description: Radio group分组用法
---
```jsx
import React from 'react';
import { Radio, Input } from '@leke/rc';

export default function(){
    const [value, setValue] = React.useState(1);
    const onChange = val => {
        setValue(val);
    };
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    return(
        <Radio.Group onChange={onChange} value={value}>
            <Radio style={radioStyle} value={1}>常态</Radio>
            <Radio style={radioStyle} value={2}>常态</Radio>
            <Radio style={radioStyle} value={3}>常态</Radio>
            <Radio style={radioStyle} value={4}>更多
                {value === 4 ? <Input size="middle" style={{ width: 100, marginLeft: 10 }} /> : null}
            </Radio>
        </Radio.Group>
    );
}
```

