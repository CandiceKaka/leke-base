---
title: 不可用
description: radio 不可用状态
---
```jsx
import React from 'react';
import { Radio, Button } from '@leke/rc';

export default function(){
    const [disabled, setDisabled] = React.useState(true);
    const onToggle = () => {
        setDisabled(!disabled);
    };
    const style={
        marginTop:'20px'
    };
    return(
        <>
            <Radio disabled={disabled}>未选禁用</Radio>
            <Radio disabled={disabled} checked>选中后禁用</Radio>
        </>
    );
}
```

