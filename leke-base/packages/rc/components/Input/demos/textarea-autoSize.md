<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-03-04 11:20:57
-->
---
title: 自适应高度的文本域
description: 适合于字数不定的输入
---
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <Input.TextArea className="outer" placeholder="自适应高度" autoSize />;
}
```