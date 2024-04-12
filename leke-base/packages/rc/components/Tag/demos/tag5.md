---    
title: 标签hover态
---
```jsx
import React from 'react';
import {Tag} from '@leke/rc';
export default function(){
    return  (
        <>
            <Tag className='hover-style' text='hover态标签' />
        </>
    );
}
```
```css
.hover-style{
    border-color: #99D1FF;
    background-color: #EBF7FF;
    color: #479FFF;
}
.hover-style:hover{
    border-color: #40C2B5;
}
.hover-style:active{
    border-color: #118F8B;
}
```