---    
title: 分组
---

```jsx
import React from 'react';
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

const optionGroups = [{
    label: '第一组',
    options: options1
},{
    label: '第二组',
    options: options2
}];

export default function(){
    return(
        <>
            <Select  width="small" optionGroups={optionGroups} placeholder='请选择' style={{marginTop:20,marginRight:20}} />
            <br />
            <br />
            <Select width="small" showSearch allowClear mode="tags" optionGroups={optionGroups} placeholder='请选择' style={{marginTop:20,marginRight:20}} />
        </>
    );
}
```

