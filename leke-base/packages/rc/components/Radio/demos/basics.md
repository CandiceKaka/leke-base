---
title: 基础
description: 基本用法
---
```jsx
import React from 'react';
import { Radio } from '@leke/rc';

export default function(){
    const [value, setValue] = React.useState(3);

    const onChange = val => {
        setValue(val);
    };
    const onChangeUnBind = e => {
        
    };
    return(
        <>
            <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>常态</Radio>
                <Radio value={2}>常态</Radio>
                <Radio value={3}>选中</Radio>
            </Radio.Group>
        </>
    );
}
```

