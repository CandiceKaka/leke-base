---    
title: 滑动
description: 可以左右、上下滑动，容纳更多标签
---

```jsx
import React, { useState } from 'react';
import { Tabs, Radio, Switch } from '@leke/rc';

const { TabPane } = Tabs;

export default function(){
    const [state, setState] = useState('top');
    const [animated, setAnimated] = useState(false);
    const callback = (key) => {
        console.log(key);
    };

    const onTabScroll = ({ direction, event }) => {
        console.log("onTabScroll =====>", direction);
        console.log("event =====>", event);
    };
    return(
        <>
            <Radio.Group value={state} onChange={setState} style={{ marginTop: 16 }}>
                <Radio.Button value="top">top</Radio.Button>
                <Radio.Button value="left">left</Radio.Button>
            </Radio.Group>
            <br />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                切换动画：<Switch onChange={setAnimated} />
            </div>
            <br />
            <Tabs  animated={animated} tabPosition={state} defaultActiveKey="1" onChange={callback} style={{ height: 220 }}>
                {Array(3).fill('').map((_,i) => (
                    <TabPane tab={`Tab ${i + 1}`} key={i+1} disabled={i===20}>
                        Content of Tab Pane {i + 1}
                    </TabPane>
                ))}
            </Tabs>
            <br />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                超出样式：
            </div>
            <br />
            <Tabs onTabScroll={onTabScroll} animated={animated} tabPosition={state} defaultActiveKey="1" onChange={callback} style={{ height: 220 }}>
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