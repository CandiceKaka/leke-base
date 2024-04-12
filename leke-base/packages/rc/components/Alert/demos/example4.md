---
title: 含有辅助文字样式
description: 含有辅助文字时的Alert
---

```jsx
import React from 'react';
import { Alert, Button } from '@leke/rc';

export default function() {
    return (
        <div className={'context'}>
            <div className={'left'}>
                <Alert
                    type={'info'}
                    icon={null}
                    title={'普通消息标题'}
                    message={'你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。'}
                />
                <Alert
                    type={'success'}
                    icon={null}
                    title={'成功消息标题'}
                    message={'你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。'}
                />
                <Alert
                    type={'error'}
                    icon={null}
                    title={'失败消息标题'}
                    message={'你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。'}
                />
                <Alert
                    type={'warning'}
                    icon={null}
                    title={'警告消息标题'}
                    message={'你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。'}
                />
            </div>
            <div className={'right'}>
                <Alert
                    type={'info'}
                    title={'普通消息标题'}
                    message={<div>
                        你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。
                        <Button type='link' size={'small'}>查看详情</Button>
                    </div>}
                />
                <Alert
                    type={'success'}
                    title={'恭喜！你所提交的信息已经审核通过，如有问题请联系客服。'}
                    message={'你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。'}
                />
                <Alert
                    type={'error'}
                    title={'失败消息标题'}
                    message={'你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。'}
                />
                <Alert
                    type={'warning'}
                    title={'警告消息标题'}
                    message={'你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。你好！欢迎使用金融云2.0专业版，你可以根据自身需求添加业务模块。'}
                />
            </div>
        </div>
    );
}
```
```css
.context {
  display: flex;
}
.left {
  flex: 1;
  padding: 0 20px;
  box-sizing: border-box;
}
.right {
  flex: 1;
  padding: 0 20px;
  box-sizing: border-box;
}
```