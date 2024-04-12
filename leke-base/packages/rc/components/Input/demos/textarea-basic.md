<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-02-07 14:38:20
-->
---
title: 文本域
description: 适合输入较长的文本段落
---
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    const [value,SetValue] = React.useState('');
    return  <Input.TextArea className="outer" placeholder="基本使用"/>;
}
```