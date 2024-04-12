---    
title: 不同尺寸下拉菜单举例
---

```jsx
import React,{useState} from 'react';
import {Dropdown,Select,Button} from '@leke/rc';
import { Down, Star } from "@leke/icons";
export default function(){
    const options=[
        {label:'1-1',value:'1-1'},
        {label:'1-2',value:'1-2'},
        {label:'1-3',value:'1-3'},
    ];
    return(
        <>
            <Dropdown 
                popup={options}
                eventType={['click']}
                style={{marginRight:30}}
            ><Button type="main"  size="large">大尺寸<Down className="dropfill"/></Button></Dropdown>
            <Dropdown 
                popup={options}
                eventType={['click']}
                style={{marginRight:30}}
            ><Button type="main" >中等尺寸<Down className="dropfill"/></Button></Dropdown>
            <Dropdown 
                popup={options}
                eventType={['click']}
                style={{marginRight:30}}
            ><Button type="main"  size="small">小尺寸<Down className="dropfill"/></Button></Dropdown>
        </>
    );
}
```
```css
.dropfill{
    color: #fff;
    margin-left:5px;
}
```

