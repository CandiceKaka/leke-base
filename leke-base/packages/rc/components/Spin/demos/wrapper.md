---    
title: 内容包裹
description: 包裹内容时，可以使被包裹内容处于加载状态
---

```jsx
import React, { useState } from 'react';
import { Spin, Alert, Switch } from '@leke/rc';

export default function(){
    const [spinning,setSpinning] = useState(false);
    return(
        <div>
            <Spin spinning={spinning} size="small">
                <Alert style={{ margin: 0 }} closeIcon={null} icon={null} type={'info'} message={'这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息这是一条普通消息'} />
            </Spin>
            <div style={{ marginTop: '20px' }}>
                <span style={{ verticalAlign: 'middle' }}>切换状态：</span>
                <Switch checked={spinning} onChange={setSpinning} style={{ verticalAlign: 'middle' }}/>
            </div>
        </div>
    );
}
```