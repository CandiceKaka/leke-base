---    
title: 三种大小
description: 三种大小的选择框，当 size 分别为 large 和 small 时，输入框高度为 40px 和 24px ，默认高度为 32px。
---

```jsx
import React, { useState } from 'react';
import {Select,Radio} from '@leke/rc';

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
const options=new Array(10000).fill('').map((item,index)=>({label:""+index+index,value:index}));
export default function(){
    const [size,setSize] = useState('small');
    const [width,setWidth] = useState('smaller');

    return(
        <>
            <Radio.Group value={size} onChange={setSize} style={{ marginBottom: 16 }}>
                <Radio.Button value="small">small</Radio.Button>
                <Radio.Button value="middle">middle</Radio.Button>
                <Radio.Button value="large">large</Radio.Button>
            </Radio.Group>
            <Radio.Group value={width} onChange={setWidth} style={{ marginBottom: 16 }}>
                <Radio.Button value="smaller">smaller</Radio.Button>
                <Radio.Button value="small">small</Radio.Button>
                <Radio.Button value="middle">middle</Radio.Button>
                <Radio.Button value="long">long</Radio.Button>
                <Radio.Button value="longer">longer</Radio.Button>
            </Radio.Group>
            <Select width={width} options={options1} placeholder='请选择' style={{marginRight:20}} size={size} />
            <br />
            <br />
            <Select width={width} showSearch allowClear options={options} multiple placeholder='请选择' size={size}/>
        </>
    );
}
```

