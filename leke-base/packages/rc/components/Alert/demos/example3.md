---
title: 自定义关闭
description: 替换关闭按钮icon，设置自定义的操作按钮
---

```jsx
import React from 'react';
import { Alert, Button } from '@leke/rc';

export default function() {
    return (
        <div>
            <Alert
                type={'info'}
                message={'这是一条普通消息'}
                action={<Button className={'leke-remove-padding'} type='link' size={'small'}>撤销</Button>}
            />
            <Alert
                type={'success'}
                message={'恭喜！你所提交的信息已经审核通过，如有问题请联系客服。'}
                action={<Button className={'leke-remove-padding'} type='link' size={'small'}>查看详情</Button>}
            />
            <Alert
                type={'error'}
                message={'这是一条普通消息'}
                action={<Button className={'leke-remove-padding'} type='link' size={'small'}>前往设置</Button>}
            />
            <Alert
                type={'warning'}
                message={'这是一条警告消息'}
                closeIcon={<Button className={'leke-remove-padding'} type='link' size={'small'}>我知道了</Button>}
            />
        </div>
        
    );
}
```
```css
.leke-remove-padding {
  padding: 0;
  min-width: initial;
}
```