---    
title: 位置
placement: 位置有 12 个方向
---

```jsx
import React from 'react';
import {Tooltip, Button} from '@leke/rc';

export default function(){
    const popup = 'prompt text';
    return(
        <div className='Tooltip-demo'>
            <div>
                <Tooltip 
                    popup={popup}
                    placement={'topLeft'}
                >
                    <Button>TL</Button>
                </Tooltip>
                <Tooltip 
                    popup={popup}
                    placement={'topCenter'}
                >
                    <Button>TC</Button>
                </Tooltip>
                <Tooltip 
                    popup={popup}
                    placement={'topRight'}
                >
                    <Button>TR</Button>
                </Tooltip>
            </div>
            <div style={{display:'flex',justifyContent: 'space-between'}}>
                <div className='Tooltip-demo-block'>
                    <Tooltip 
                        popup={popup}
                        placement={'leftTop'}
                    >
                        <Button>LT</Button>
                    </Tooltip>
                    <Tooltip 
                        popup={popup}
                        placement={'leftCenter'}
                    >
                        <Button>LC</Button>
                    </Tooltip>
                    <Tooltip 
                        popup={popup}
                        placement={'leftBottom'}
                    >
                        <Button>LB</Button>
                    </Tooltip>                
                </div>
                <div className='Tooltip-demo-block'>
                    <Tooltip 
                        popup={popup}
                        placement={'rightTop'}
                    >
                        <Button>RT</Button>
                    </Tooltip>
                    <Tooltip 
                        popup={popup}
                        placement={'rightCenter'}
                    >
                        <Button>RC</Button>
                    </Tooltip>
                    <Tooltip 
                        popup={popup}
                        placement={'rightBottom'}
                    >
                        <Button>RB</Button>
                    </Tooltip>                
                </div>
            </div>
            <div>
                <Tooltip 
                    popup={popup}
                    placement={'bottomLeft'}
                >
                    <Button>BL</Button>
                </Tooltip>
                <Tooltip 
                    popup={popup}
                    placement={'bottomCenter'}
                >
                    <Button>BC</Button>
                </Tooltip>
                <Tooltip 
                    popup={popup}
                    placement={'bottomRight'}
                >
                    <Button>BR</Button>
                </Tooltip>
            </div>
        </div>
    );
}
```
```css
.Tooltip-demo{
    width:450px;
    text-align: center;
}
.Tooltip-demo>div+div{
    margin-top: 8px
}
.Tooltip-demo .Tooltip-demo-block{
    display: flex;
    flex-direction: column;
}
.Tooltip-demo .Tooltip-demo-block button+button{
     margin-top: 8px;
}
.Tooltip-demo Button{
    margin-right: 8px;
    /* height: 100px;
    width: 100px; */
}
```

