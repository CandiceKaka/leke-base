<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-03-04 11:22:18
-->
---
title: 数字输入框-三种大小
description: large、middle、small三种尺寸
---
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <>
        <Input.InputNumber className="outer-number" size='small' />
        <br/>
        <br/>
        <Input.InputNumber className="outer-number" />
        <br/>
        <br/>
        <Input.InputNumber className="outer-number" size='large' />
    </>;
}
```
```css
.outer-number{
    width:116px
}
```