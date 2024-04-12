---    
title: 点击时弹出下拉菜单---默认按钮触发
---

```jsx
import React,{useState} from 'react';
import {Dropdown,Select,Button} from '@leke/rc';
import { Down, Star } from "@leke/icons";
export default function(){
    const [name,setName] = useState('点击下拉');
    const [name1,setName1] = useState('横线格式');
    const [name2,setName2] = useState('前置图标');
    const options=[
        {label:'1-1',value:'1-1'},
        {label:'1-2',value:'1-2'},
        {label:'1-3',value:'1-3'},
    ];
    const options1=[
        {label:'1-1',value:'1-1',divider:true},
        {label:'1-2',value:'1-2'},
        {label:'1-3',value:'1-3'},
    ];
    const options2=[
        {label:'1-1',value:'1-1',Icon: <Star />},
        {label:'1-2',value:'1-2'},
        {label:'1-3',value:'1-3'},
    ];
    return(
        <>
            <Dropdown 
                popup={options}
                eventType={['click']}
                onChange={setName}
                style={{marginRight:30}}
            ><Button >{name}<Down className="downfill"/></Button></Dropdown>

            <Dropdown 
                popup={options1}
                eventType={['click']}
                onChange={setName1}
                style={{marginRight:30}}
            ><Button >{name1}<Down className="downfill"/></Button></Dropdown>

            <Dropdown 
                popup={options2}
                eventType={['click']}
                onChange={setName2}
                style={{marginRight:30}}
            ><Button >{name2}<Down className="downfill"/></Button></Dropdown>

            <Dropdown 
                popup={options}
                eventType={['click']}
                disabled
            ><Button style={{cursor:'not-allowed'}}>禁止下拉 <Down className="downfill"/></Button></Dropdown>
        </>
    );
}
```
```css
.downfill{
    color: #1FB5AB;
    margin-left:5px;
}
```

