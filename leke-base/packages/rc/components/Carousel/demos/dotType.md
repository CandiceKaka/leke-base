---
title: 面板指示点样式
---

```jsx
import React from 'react';
import {Carousel} from '@leke/rc';

export default function(){
    return(
        <div className={'dot-demo'}>
            <Carousel style={{width:500,height:300}} dotType="circle">
                <div style={{backgroundColor:'#60D195'}}></div>
                <div style={{backgroundColor:'#ff9900'}}></div>
                <div style={{backgroundColor:'#479FFF'}}></div>
            </Carousel>
            <Carousel style={{width:500,height:300}}>
                <div style={{backgroundColor:'#60D195'}}></div>
                <div style={{backgroundColor:'#ff9900'}}></div>
                <div style={{backgroundColor:'#479FFF'}}></div>
            </Carousel>
        </div>
    );
}
```
```css
.dot-demo {
    display: flex;
}
.dot-demo .leke-carousel+.leke-carousel {
    margin-left: 30px;
}
```