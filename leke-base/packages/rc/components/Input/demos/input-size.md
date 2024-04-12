<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:26:24
 * @LastEditTime: 2021-02-07 12:01:48
-->
---
title: 不同尺寸
description: large、middle、small三种尺寸
---
```jsx
import React from 'react';
import {Input} from '@leke/rc';

export default function(){
    return  <>
        <Input className="outer" size="large" placeholder="large" />
        <br/>
        <br/>
        <Input className="outer" size="middle" placeholder="middle"/>
        <br/>
        <br/>
        <Input className="outer" size="small" placeholder="small"/>
    </>;
}
```