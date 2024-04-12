---
title: 可关闭
description: 展示默认关闭按钮，展示默认icon
---

```jsx
import React from 'react';
import { Alert } from '@leke/rc';

export default function() {
    return (
        <div>
            <Alert type={'info'} message={'这是一条普通消息'} />
            <Alert type={'success'} message={'恭喜！你所提交的信息已经审核通过，如有问题请联系客服。'} />
            <Alert type={'error'} message={'这是一条失败消息'} />
            <Alert type={'warning'} message={'这是一条警告消息'} />
        </div>
        
    );
}
```