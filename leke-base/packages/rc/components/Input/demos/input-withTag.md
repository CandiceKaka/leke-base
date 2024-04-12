<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-03-03 15:36:52
-->
---
title: 配合tag使用
description: 可以前置或者后置tag
---
```jsx
import React from 'react';
import {Input,Button,Select} from '@leke/rc';
export default function(){
    const options=[
        {label:'1-1',value:'1-1'},
        {label:'1-2',value:'1-2'},
        {label:'1-3',value:'1-3'},
    ];
    return  <>
        <Input className="outer" addonBefore="http://" />
        <br />
        <br />
        <Input className="outer" addonAfter=".com" />
        <br />
        <br />
        <Input className="outer" addonBefore="http://" addonAfter=".com" />
    </>;
}
```