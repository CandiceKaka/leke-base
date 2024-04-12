<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-03-04 11:23:40
-->
---
title: 数字输入框-横置操作
description: 将操作框横置并常显，适合小范围数据输入
---
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <>
        <Input.InputNumber handleDirection="row" className="outer-number" />
    </>;
}
```
```css
.outer-number{
    width:116px
}
```