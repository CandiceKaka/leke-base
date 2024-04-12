---    
title: 过渡动画
description: type属性可以规定卡片切换的时的过渡动画，可使用slide或者fade
---

```jsx
import React from 'react';
import {Carousel} from '@leke/rc';

export default function(){
    return(
        <Carousel style={{width:500,height:300}} type='fade'>
            <div style={{backgroundColor:'#60D195'}}></div>
            <div style={{backgroundColor:'#ff9900'}}></div>
            <div style={{backgroundColor:'#479FFF'}}></div>
        </Carousel>
    );
}
```

