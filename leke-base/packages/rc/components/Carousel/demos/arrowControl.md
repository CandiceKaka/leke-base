---    
title: 带有左右箭头控制器
---

```jsx
import React from 'react';
import {Carousel} from '@leke/rc';

export default function(){
    return(
        <div className={'arrow-control-demo'}>
            <Carousel style={{width:500,height:300}} arrowControl={true} arrowType={'line'}>
                <div style={{backgroundColor:'#60D195'}}></div>
                <div style={{backgroundColor:'#ff9900'}}></div>
                <div style={{backgroundColor:'#479FFF'}}></div>
            </Carousel>
            <Carousel style={{width:500,height:300}} arrowControl={true} dotType={'circle'}>
                <div style={{backgroundColor:'#60D195'}}></div>
                <div style={{backgroundColor:'#ff9900'}}></div>
                <div style={{backgroundColor:'#479FFF'}}></div>
            </Carousel>
        </div>
    );
}
```
```css
.arrow-control-demo {
    display: flex;
}
.arrow-control-demo .leke-carousel+.leke-carousel {
    margin-left: 30px;
}
```
