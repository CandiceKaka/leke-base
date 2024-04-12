<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-03-04 11:19:11
-->
---
title: 配合icon使用
description: 可以前置或者后置icon
---
```jsx
import React from 'react';
import {Input} from '@leke/rc';
import {Notice} from "@leke/icons";
import {Search} from "@leke/icons";

export default function(){
    return  <>
        <Input className="outer" prefix={<Notice />} type='password' placeholder="prefix-icon"/>
        <br/>
        <br/>
        <Input className="outer" suffix={<Search />} placeholder="suffix-icon"/>
    </>;
}
```