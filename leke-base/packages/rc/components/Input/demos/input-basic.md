<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-03-04 14:31:31
-->
---
title: 基本使用
description: 提供输入文本、数字功能
---
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <Input className="outer" placeholder="基本使用" onPressEnter={(e)=>{console.log(e.target.value);}}/>;
}
```
```css
.outer{
    width:364px
}
```