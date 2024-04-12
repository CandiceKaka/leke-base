---    
title: 自定义页签头
description: 支持自定义页签头
---

```jsx
import React, { useEffect, useState } from 'react';
import {Tabs} from '@leke/rc';

const { TabPane } = Tabs;

export default function(){
    const callback = (key) => {
        console.log(key);
    };

    const renderTabBar = (props,DefaultTabBar) => {
        return (
            <div className="leke-tabs-tabbar-bg">
                <DefaultTabBar {...props} />
            </div>
        );
    };

    return(
        <Tabs onChange={callback} renderTabBar={renderTabBar}>
            <TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
            </TabPane>
            <div>22312312312</div>
        </Tabs>
    );
}
```

```css
.leke-tabs-tabbar-bg {
  /* position: sticky;
  top: 300px; */
  color: red!important;
}

```
