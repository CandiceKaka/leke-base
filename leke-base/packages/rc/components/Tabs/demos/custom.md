---    
title: 自定义tab
description: 支持自定义tab
---

```jsx
import React from 'react';
import {Tabs} from '@leke/rc';
import { ExclamationcCircleFill } from "@leke/icons";

const { TabPane } = Tabs;

export default function(){
    const callback = (key) => {
        console.log(key);
    };
    return(
        <Tabs defaultActiveKey="2" onChange={callback}>
            <TabPane tabIcon={<ExclamationcCircleFill />} tab="Tab1" key="1">
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