---    
title: 标签选中态
---
```jsx
import React, {useState} from 'react';
import {Tag} from '@leke/rc';
export default function(){
    const [chosen,setChosen] = useState(false);
    const handleClick = ()=>{
        setChosen(!chosen);
    };
    return  (
        <>
            <Tag colorType='seablue' className={chosen ? 'chosen-style' : ''} text='选中态' onClick={handleClick}/>
        </>
    );
}
```
```css
.chosen-style{
    background-color: #1FB5AB;
    color: white;
    border-color: #1FB5AB;
}
```