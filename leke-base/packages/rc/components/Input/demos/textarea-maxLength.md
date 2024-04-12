<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-03-04 11:20:29
-->
---
title: 限制字数的文本域
description: 适合有字数限制的表单输入
---
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <Input.TextArea className="outer" placeholder="限制最大字数" maxLength={100}/>;
}
```