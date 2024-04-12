---    
title: 弹出位置
description: 支持 12 个弹出位置
---
```jsx
import React from 'react';
import {Popover,Button} from '@leke/rc';

export default function(){
    return(
        <div className='trigger-demo'>
            <div>
                <Popover 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'bottomLeft'}
                >
                    <Button>bottomLeft</Button>
                </Popover>
                <Popover 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'bottomCenter'}
                >
                    <Button>bottomCenter</Button>
                </Popover>
                <Popover 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'bottomRight'}
                >
                    <Button>bottomRight</Button>
                </Popover>
            </div>
            <div style={{display:'flex',justifyContent: 'space-between'}}>
                <div className='trigger-demo-block'>
                    <Popover 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'leftTop'}
                    >
                        <Button>leftTop</Button>
                    </Popover>
                    <Popover 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'leftCenter'}
                    >
                        <Button>leftCenter</Button>
                    </Popover>
                    <Popover 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'leftBottom'}
                    >
                        <Button>leftBottom</Button>
                    </Popover>                
                </div>
                <div className='trigger-demo-block'>
                    <Popover 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'rightTop'}
                    >
                        <Button>rightTop</Button>
                    </Popover>
                    <Popover 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'rightCenter'}
                    >
                        <Button>rightCenter</Button>
                    </Popover>
                    <Popover 
                        popup={<div style={{height:50,width:50}}>popup</div>}
                        placement={'rightBottom'}
                    >
                        <Button>rightBottom</Button>
                    </Popover>                
                </div>
            </div>
            <div>
                <Popover 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'topLeft'}
                >
                    <Button>topLeft</Button>
                </Popover>
                <Popover 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'topCenter'}
                >
                    <Button>topCenter</Button>
                </Popover>
                <Popover 
                    popup={<div style={{height:50,width:50}}>popup</div>}
                    placement={'topRight'}
                >
                    <Button>topRight</Button>
                </Popover>
            </div>
        </div>
    );
}
```
```css
.trigger-demo{
    width:400px;
    text-align: center;
}
.trigger-demo>div+div{
    margin-top: 40px
}
.trigger-demo .trigger-demo-block{
    display: flex;
    flex-direction: column;
}
.trigger-demo .trigger-demo-block button+button{
     margin-top: 20px;
}
.trigger-demo Button{
    margin-right: 25px;
}
```

