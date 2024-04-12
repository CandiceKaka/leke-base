---    
title: 预设状态标签
---
```jsx
import React from 'react';
import {Tag} from '@leke/rc';
import {Stop, Warn, Fail, Success} from '@leke/icons';
export default function(){
    return  (
        <>
            纯文字：
            <br/><br/>
            <Tag colorType='seablue' text='进行中'/>
            <Tag colorType='lekegreen' text='已完成'/>
            <Tag colorType='brighteyes' text='警告'/>
            <Tag colorType='hotred' text='失败'/>
            <Tag colorType='default' text='未完成'/>
            <br/><br/>
            图标+文字：
            <br/><br/>
            <Tag colorType='seablue' icon={<Stop/>} text='进行中'/>
            <Tag colorType='lekegreen' icon={<Success/>} text='已完成'/>
            <Tag colorType='brighteyes' icon={<Warn/>} text='警告'/>
            <Tag colorType='hotred' icon={<Fail/>} text='失败'/>
            <Tag colorType='default' icon={<Stop/>} text='未完成'/>

        </>
    );
}
```