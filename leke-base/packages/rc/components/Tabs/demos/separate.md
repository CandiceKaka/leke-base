---    
title: 分隔式
description: 通过分隔线区分tab
---

```jsx
import React, { useState } from 'react';
import { Tabs, Radio, Switch } from '@leke/rc';

const { TabPane } = Tabs;

export default function(){
    const [state, setState] = useState('top');
    const [animated, setAnimated] = useState(true);
    const callback = (key) => {
        console.log(key);
    };
    return(
        <div className="separate-container">
            <Tabs type="separate" animated={animated} tabPosition={state} defaultActiveKey="1" onChange={callback} style={{ height: 220 }}>
                {Array(3).fill('').map((_,i) => (
                    <TabPane tab={`Tab ${i + 1}`} key={i+1} disabled={i===20}>
                        <div className="content">
                            Content of Tab Pane {i + 1}
                        </div>
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
}
```

```css
.separate-container {
  margin: 0;
  padding: 20px;
  background: #f5f5f5;
}

```
