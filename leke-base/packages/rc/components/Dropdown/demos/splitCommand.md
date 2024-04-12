---    
title: 点击或Hover时弹出多命令菜单
description: 左侧主面板按钮用于定义操作频率较高的独立性单一命令，右侧下拉选项可以枚举选择其他不常用命令
---

```jsx
import React,{useState} from 'react';
import {Dropdown,Select,Button,Tooltip} from '@leke/rc';
import { DownFill, RecordLoading } from "@leke/icons";
export default function(){
    const [name,setName] = useState('独立命令');
    const [name1,setName1] = useState('加载中');
    const options=[
        {label:'1-1',value:'1-1'},
        {label:'1-2',value:'1-2'},
        {label:'1-3',value:'1-3'},
    ];
    return(
        <> 
            <Dropdown.Button 
                popup={options}
                eventType={['click']}
                onChange={setName}
                style={{marginRight:30}}
            >{name}</Dropdown.Button>
            <Dropdown.Button 
                popup={options}
                eventType={['click']}
                onChange={setName}
                style={{marginRight:30}}
                type="main"
            >{name}</Dropdown.Button>
            <Dropdown.Button 
                popup={options}
                onChange={setName}
                style={{marginRight:30}}
                type="main"
            >{name}</Dropdown.Button>
            <Dropdown.Button 
                popup={options}
                eventType={['click']}
                onChange={setName}
                type="main"
                style={{marginRight:30}}
                disabled
            >{name}</Dropdown.Button>
            <Dropdown.Button 
                popup={options}
                eventType={['click']}
                onChange={setName1}
                type="main"
                style={{marginRight:30}}
                disabled
                buttonsRender={([leftButton, rightButton]) => [
                    <Tooltip key="1" popup={<div className="popup">popup</div>} placement={"topLeft"}>
                        {leftButton}
                    </Tooltip>,
                    React.cloneElement(rightButton, { loading: true }),
                ]}>{name1}</Dropdown.Button>
        </>
    );
}
```

