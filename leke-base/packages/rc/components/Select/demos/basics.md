---    
title: 基本用法
description: options,placeholder,showSearch,disabled等参数使用说明
---

```jsx
import React, {useState} from 'react';
import {Select} from '@leke/rc';

const options1=[
    {label:'1-1',value:'1-1'},
    {label:'1-2',value:'1-2'},
    {label:'1-3',value:'1-3'},
];
const options2=[
    {label:'2-1',value:'2-1'},
    {label:'2-2',value:'2-2',disabled:true},
    {label:'2-3',value:'2-3'},
];

export default function(){
    const [value,setValue] = useState();
    return(
        <>
            <Select width="smaller" defaultValue="1-2" options={options1} placeholder='请选择' style={{marginTop:20,marginRight:20}} />
            <Select width="smaller" disabled options={options2} placeholder='disabled' style={{marginTop:20,marginRight:20}} />
            <Select width="smaller" allowClear options={options2} placeholder='option disabled' style={{marginTop:20,marginRight:20}} />
            <Select width="smaller" showSearch allowClear options={options1} placeholder='input text' style={{marginTop:20,marginRight:20}}/>
            <Select width="smaller" value={value} onChange={setValue} loading={!!value} options={options1} placeholder='input text' style={{marginTop:20}}/>
        </>
    );
}
```

