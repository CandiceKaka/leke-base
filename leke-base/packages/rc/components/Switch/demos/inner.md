---
title: 文本和图标
description: 可增加文本或任意元素显示
---

```jsx
import React,{useState} from 'react';
import {Switch} from '@leke/rc';
import { Check, Close } from "@leke/icons";

export default function(){
    return(
        <div>
            <Switch defaultChecked checkedChildren="开启" unCheckedChildren="关闭"/>
            <br />
            <Switch size="small" checkedChildren={<Check className="anticon" />} unCheckedChildren={<Close className="anticon" />} />
        </div>
    );
}
```


