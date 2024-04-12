---    
title: 卡片式页签容器
description: 用于容器顶部，需要一点额外的样式覆盖。

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
        <div className="card-container">
            <Tabs type="card" animated={animated} tabPosition={state} defaultActiveKey="1" onChange={callback} style={{ height: 220 }}>
                {Array(30).fill('').map((_,i) => (
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
.card-container {
  margin: 0;
  padding: 20px;
  background: #f5f5f5;
}
.card-container > .leke-tabs {
    background: #fff;
}

.card-container > .leke-tabs > .leke-tabs-nav > .leke-tabs-nav-wrap > .leke-tabs-nav-list > .leke-tabs-nav-item {
    border: none;
    margin: 0;
    background: #f5f5f5;
}

.card-container > .leke-tabs > .leke-tabs-nav > .leke-tabs-nav-wrap > .leke-tabs-nav-list > .leke-tabs-nav-active {
    background: #fff;
}

.content {
    margin-left: 20px;
}

```
