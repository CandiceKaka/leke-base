---    
title: 可关闭标签
---
```jsx
import React, {useState} from 'react';
import {Tag} from '@leke/rc';

export default function(){
    const [visible,setVisible] = useState(true);
    const handleClose = ()=>{
        setVisible(false);
        console.log('已关勿扰');
    };
    return  (
        <>
            <Tag colorType='seablue' closable={true} text='可关闭' onClose={handleClose} visible={visible}/>
        </>
    );
}
```