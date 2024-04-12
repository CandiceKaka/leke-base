---    
title: 附加内容
description: 可以在页签两边添加附加操作。
---

```jsx
import React from 'react';
import {Tabs,Button} from '@leke/rc';
import { ExclamationcCircleFill } from "@leke/icons";

const { TabPane } = Tabs;

export default function(){
    const callback = (key) => {
        console.log(key);
    };
    return(
        <Tabs defaultActiveKey="2" tabBarExtraContent={{ left: <Button  size="small" style={{ marginRight: '16px' }}>左边按钮</Button>,right: <Button size="small">右边按钮</Button> }}>
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
    );
}
```
