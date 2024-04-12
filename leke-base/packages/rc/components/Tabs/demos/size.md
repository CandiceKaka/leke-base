---    
title: 预设大小
description: 大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。
---

```jsx
import React, { useState } from 'react';
import {Tabs,Radio} from '@leke/rc';

const { TabPane } = Tabs;

export default function(){
    const [size,setSize] = useState('small');
    const [postion,setPostion] = useState('top');
    const callback = (key) => {
        console.log(key);
    };
    
    return(
        <>
            <Radio.Group value={size} onChange={setSize} style={{ marginTop: 16 }}>
                <Radio.Button value="small">small</Radio.Button>
                <Radio.Button value="default">default</Radio.Button>
                <Radio.Button value="large">large</Radio.Button>
            </Radio.Group>
            
            <Radio.Group value={postion} onChange={setPostion} style={{ marginTop: 16 }}>
                <Radio.Button value="top">top</Radio.Button>
                <Radio.Button value="bottom">bottom</Radio.Button>
                <Radio.Button value="left">left</Radio.Button>
                <Radio.Button value="right">right</Radio.Button>
            </Radio.Group>
            <br />
            <Tabs onChange={callback} size={size} tabPosition={postion}>
                <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
                </TabPane>
            </Tabs>
            <br />
            <br />
            <Tabs type="card" onChange={callback} size={size}>
                <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </>
        
    );
}
```
