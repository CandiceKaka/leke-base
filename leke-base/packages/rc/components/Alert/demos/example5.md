---
title: 无边框
description: 去除边框和线条
---

```jsx
import React from 'react';
import { Alert, Button } from '@leke/rc';

export default function() {
    return (
        <div>
            <Alert style={{border: 'none', borderRadius: '0'}} type={'info'} message={'这是一条警告消息，你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。'} />
            <Alert style={{border: 'none', borderRadius: '0'}} type={'success'} message={'这是一条警告消息，你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。'} />
            <Alert style={{border: 'none', borderRadius: '0'}} type={'error'} message={'这是一条警告消息，你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。'} />
            <Alert style={{border: 'none', borderRadius: '0'}} type={'warning'} message={'这是一条警告消息，你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。'} />
            <Alert style={{border: 'none', borderRadius: '0'}} type={'warning'} message={'这是一条警告消息，你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。'} icon={null} closeIcon={null} action={<Button className={'leke-remove-padding'} type='link' size={'small'}>查看详情</Button>} />
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