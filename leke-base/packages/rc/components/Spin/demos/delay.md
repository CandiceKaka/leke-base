---    
title: 延迟显示
description: 支持延迟显示，防止闪烁（打开和关闭都延迟）
---

```jsx
import React, { useState } from 'react';
import { Spin, Alert, Switch } from '@leke/rc';

export default function(){
    const [spinning,setSpinning] = useState(false);
    return(
        <div>
            <Spin spinning={spinning} size="small" delay={500}>
                <Alert style={{ margin: 0 }} closeIcon={null} icon={null} type="success" message={'延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示延迟显示'} />
            </Spin>
            <div style={{ marginTop: '20px' }}>
                <span style={{ verticalAlign: 'middle' }}>切换状态：</span>
                <Switch checked={spinning} onChange={setSpinning} style={{ verticalAlign: 'middle' }}/>
            </div>
        </div>
    );
}
```