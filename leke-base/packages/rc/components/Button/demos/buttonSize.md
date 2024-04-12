## 按钮大小

```jsx
import React,{useState} from 'react';
import {Button} from '@leke/rc';

export default function(){
    const [size,setSize] = useState('middle');

    const sizes = ['large','middle','small'];

    return  <>
        <div>
            {
                sizes.map((item,index)=> {
                    return (
                        <div 
                            key={index} 
                            className={size === item ? 'leke-demo-active' : 'leke-demo-sx'} 
                            onClick={()=> setSize(item)}>
                            {item}
                        </div> 
                    );
                }) 
            }
        </div>
        <div>
            <Button type='main' className='leke-demo-container' size={size}>按钮</Button>
            <Button className='leke-demo-container' size={size}>按钮</Button>
            <Button type='secondary' className='leke-demo-container' size={size}>按钮</Button>
            <Button type='dashed' className='leke-demo-container' size={size}>按钮</Button>
            <Button type='link' className='leke-demo-container' size={size}>按钮</Button>
        </div>
    </>;
}
```
```css
.leke-demo-container{
    margin-right: 8px;
    margin-bottom: 12px;
}
.leke-demo-sx{
    display:inline-block;
    width:64px;
    height:30px;
    border:1px solid #d9d9d9;
    cursor: pointer;
    text-align:center;
    line-height:30px;
    margin-bottom:8px;
}
.leke-demo-active{
    display:inline-block;
    width:64px;
    height:30px;
    border:1px solid #1FB5AB;
    color:#1FB5AB;
    cursor: pointer;
    text-align:center;
    line-height:30px;
    margin-bottom:8px;
}
```