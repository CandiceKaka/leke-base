---    
title: 定制回填
---

```jsx
import React, {useState} from 'react';
import {Select,Switch} from '@leke/rc';

export default function(){
    const options=new Array(10).fill('').map((item,index)=>({label:""+index+index,value:index,content: <span style={{ color: '#595959' }}>自定义{index}</span>}));
    return(
        <>
            <Select width="middle" showSearch allowClear options={options} multiple placeholder='请选择' />
        </>
    );
}
```

