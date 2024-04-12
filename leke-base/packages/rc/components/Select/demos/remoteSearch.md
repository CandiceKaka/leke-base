---    
title: 远程搜索
---

```jsx
import React, {useState} from 'react';
import { RecordLoading } from "@leke/icons";
import {Select} from '@leke/rc';

const defOptions=[
    {label:'1-1',value:'1-1'},
    {label:'1-2',value:'1-2'},
    {label:'1-3',value:'1-3'},
];

const fetch = (v) => new Promise((r) => {
    setTimeout(() => {
        r([
            {label:v+'-1',value:v+'-1'},
            {label:v+'-2',value:v+'-2'},
            {label:v+'-3',value:v+'-3'},
        ]);
    },1000);
});

export default function(){
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);
    const [empty,setEmpty] = useState(null);

    const onSearch = (v) => {
        if(v) {
            setOptions([]);
            setLoading(true);
            setEmpty(<div className="leke-select-empty"><RecordLoading className="leke-icon-loading" /> 加载中</div>);
            fetch(v).then((res) => {
                setLoading(false);
                setOptions(res);
                if(!res.length) {
                    setEmpty(undefined); // 默认暂无数据
                }
            });
        }else {
            setOptions([]);
            setEmpty(null);
        }
    };

    const onChange = (v) => {
        setValue(v);
    };
    return(
        <>
            <Select width="small" showSearch loading={loading} filter={false} showArrow={false} value={value} options={options} onChange={onChange} onSearch={onSearch} empty={empty} placeholder='请选择' style={{marginRight:20}} />
        </>
    );
}
```

```css

.leke-icon-loading {
      margin-top: -6px;
      font-size: 12px;
      color: @border-color;
      animation: rotating 1s linear infinite;
}
```