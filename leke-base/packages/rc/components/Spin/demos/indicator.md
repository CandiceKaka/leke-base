---    
title: 自定义指示器
description: 支持自定义指示器
---

```jsx
import React from 'react';
import {Spin} from '@leke/rc';
import { Loading } from "@leke/icons";

export default function(){
    return(
        <div className="spin-container">
            <Spin indicator={<Loading className="leke-spin-custom-indicator"/>} tip="请稍等.."/>
        </div>
    );
}
```

```css
.spin-container {
  text-align: center;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}

.leke-spin-custom-indicator {
  display: inline-block;
  color: #1FB5AB;
  width: 20px;
  height: 20px;
  animation: rotating 1s linear infinite;
  
}

.leke-spin-custom-indicator svg {
    width: 20px;
    height: 20px;
}
```