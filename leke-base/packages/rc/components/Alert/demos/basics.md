---
title: 不可关闭
description: 不展示关闭按钮，不展示icon
---

```jsx
import React from 'react';
import { Alert } from '@leke/rc';

export default function() {
    return (
        <div>
            <Alert closeIcon={null} icon={null} type={'info'} message={'这是一条普通消息'} />
            <Alert closeIcon={null} icon={null} type={'success'} message={'恭喜！你所提交的信息已经审核通过，如有问题请联系客服。'} />
            <Alert closeIcon={null} icon={null} type={'error'} message={'这是一条失败消息'} />
            <Alert closeIcon={null} icon={null} type={'warning'} message={'这是一条警告消息'} />
        </div>
        
    );
}
```
