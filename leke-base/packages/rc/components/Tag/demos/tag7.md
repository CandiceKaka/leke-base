---    
title: 可关闭带动画标签
---
```jsx
import React, {useState,useRef} from 'react';
import {Tag} from '@leke/rc';
import {useAnimation} from '@leke/hooks';

export default function(){
    const [open,setOpen] = useState(true);
    const ref = useRef(null);
    const tagPointer = ref.current;
    const handleClose = ()=>{
        setOpen(false);
        console.log('已关勿扰');
    };
    useAnimation({
        ref,
        open,
        type:'transition',
        exited: `leke-tag-close`,
        onExit: ()=>{
            tagPointer.style.width = tagPointer.offsetWidth + 'px';
        },
        onExiting: ()=>{
            tagPointer.style.width = '0px';
            tagPointer.style.padding = '0px';
            tagPointer.style.transform = 'scale(0,0)';
        }

    });
    return  (
        <>
            <Tag colorType='seablue' className='leke-tag-ani' closable={true} text='可关闭带动画' ref={ref} onClose={handleClose}/>
        </>
    );
}
```
```css
.leke-tag-ani{
    white-space: nowrap;
    transition: all 0.2s;
    overflow: hidden;
}
```