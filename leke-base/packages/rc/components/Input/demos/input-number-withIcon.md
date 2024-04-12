<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-03-04 11:25:13
-->
---
title: 数字输入框-标签
description: 为输入框带上前置或者后置文字或者icon
---
```jsx
import React from 'react';
import {Input} from '@leke/rc';
import {Warn} from "@leke/icons";

export default function(){
    return  <>
        <Input.InputNumber prefix={`￥`} className="outer-number" />
        <br />
        <br />
        <Input.InputNumber suffix={`%`} className="outer-number" />
        <br />
        <br />
        <Input.InputNumber prefix={<Warn />} className="outer-number" />
    </>;
}
```
```css
.outer-number{
    width:116px
}
```