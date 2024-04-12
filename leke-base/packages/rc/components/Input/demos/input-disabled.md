<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-02-07 14:34:29
-->
---
title: 禁用状态
description: 禁止操作输入框
---
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <Input className="outer" disabled placeholder="disabled" />;
}
```