---    
title: 基本用法
---

```jsx
import React, {useRef, useState} from 'react';
import {useAnimation} from '@leke/hooks';

export default function() {
    const ref = useRef(null);
    const [open,setOpen] = useState(true);
    useAnimation({
        ref,
        open,
        entering:'rotate-enter',
        exiting:'rotate-leave',
        onEntered(){
            setOpen(false);
        },
        onExited(){
            setOpen(true);
        }
    });
    return (
        <div className='demo-container'>
            <div ref={ref} className='demo-line'></div>
        </div>
    );
}
```
```css
.demo-container{
    width: 420px;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.demo-line{
    width: 100px;
    height:2px;
    background-color: #ccc;
    transform-origin: 0 0; 
}
.rotate-enter{
    animation-duration:1.5s;
    animation-timing-function: linear;
    animation-name:rotate-enter;
}
.rotate-leave{
    animation-duration:1.5s;
    animation-timing-function: linear;
    animation-name:rotate-leave;
}
@keyframes rotate-enter {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(180deg);
  }
}
@keyframes rotate-leave {
  0%{
    transform: rotate(180deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
```