<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-02-07 14:34:29
-->
---
title: InputNumber禁用状态
description: 禁止操作数字输入框
---
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <>
        <Input.InputNumber className="outer-number" disabled />
        <br />
        <br />
        <Input.InputNumber className="outer-number" handleDirection="row" disabled />
    </>;
}
```

```css
.outer-number{
    width:116px
}
```