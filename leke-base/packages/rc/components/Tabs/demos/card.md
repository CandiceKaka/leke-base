---    
title: 卡片式
description: 另一种样式的页签，不提供对应的垂直样式。
---

```jsx
import React, { useState } from 'react';
import { Tabs, Radio, Input } from '@leke/rc';

const { TabPane } = Tabs;

export default function(){
    const [state, setState] = useState('top');
    const [animated, setAnimated] = useState(false);
    const [tabBarGutter, setTabBarGutter] = useState();
    const callback = (key) => {
        console.log(key);
    };

    const onChange = (num) => {
        setTabBarGutter(num ?? undefined);
    };
    return(
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                控制间距：<Input.InputNumber className="outer-number" onChange={onChange} />
            </div>
            <br />
            <Tabs type="card" tabBarGutter={tabBarGutter} animated={animated} tabPosition={state} defaultActiveKey="1" onChange={callback} style={{ height: 220 }}>
                {Array(30).fill('').map((_,i) => (
                    <TabPane tab={`Tab ${i + 1}`} key={i+1} disabled={i===20}>
                        Content of Tab Pane {i + 1}
                    </TabPane>
                ))}
            </Tabs>
        </>
    );
}
```

```css
.outer-number {
    width: 116px;
}
```