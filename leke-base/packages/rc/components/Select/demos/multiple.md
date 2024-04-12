---    
title: 多选
---

```jsx
import React, {useState} from 'react';
import {Select,Switch} from '@leke/rc';

export default function(){
    const [dis, setDis] = useState(false);
    const options=new Array(10000).fill('').map((item,index)=>({label:""+index+index,value:index}));
    return(
        <>
            <Switch value={dis} onChange={setDis}/>
            <br />
            <br />
            <Select width="middle" disabled={dis} allowClear options={options} multiple placeholder='请选择' />
        </>
    );
}
```

