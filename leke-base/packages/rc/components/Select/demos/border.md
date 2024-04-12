---    
title: 无边框
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

export default function(){
    return(
        <>
            <Select width="smaller" bordered={false} options={options1} placeholder='请选择' style={{marginTop:20,marginRight:20}} />
            <Select width="smaller" bordered={false} disabled options={options2} placeholder='disabled' style={{marginTop:20,marginRight:20}} />
        </>
    );
}
```

