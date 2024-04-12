---    
title: 编辑卡片式
description: 编辑卡片式
---

```jsx
import React, { useState } from 'react';
import { Tabs, Radio, Switch } from '@leke/rc';

const { TabPane } = Tabs;

export default function(){
    const [state, setState] = useState('top');
    const [animated, setAnimated] = useState(false);
    const [activeKey, setActiveKey] = useState(3);
    const [data, setData] = useState(() => Array(30).fill('').map((_,i) => ({
        key: i+1,
        tab: `Tab ${i + 1}`,
        disabled: i===20,
        closable: i===14,
        content: `Content of Tab Pane ${i + 1}`
    })));
    const onChange = (key) => {
        setActiveKey(key);
    };
    const onEdit = (key, action) => {
        if(action === 'add') {
            setData(d => d.concat({
                key: d[d.length - 1].key+1,
                tab: `Tab ${d[d.length - 1].key + 1}`,
                content: `Content of Tab Pane ${d[d.length - 1].key + 1}`
            }));
            console.log('new ======>', data[data.length - 1].key+1);
            setActiveKey(data[data.length - 1].key+1);
        } else if(action === 'remove') {
            let newKey = activeKey == key ? undefined : activeKey;
            const findIndex = data.findIndex(i => i.key == key);
            if(!newKey && findIndex !== -1 && data.length > 1) {
                if(findIndex === 0) {
                    newKey = data[1].key;
                }else {
                    newKey = data[findIndex - 1].key;
                }
                setActiveKey(newKey);
            }
            setData(d => d.filter(i => i.key != key));
        }
    };
    
    return(
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                切换动画：<Switch onChange={setAnimated} />
            </div>
            <br />
            <Tabs onEdit={onEdit} type="editable-card" animated={animated} tabPosition={state} activeKey={activeKey} onChange={onChange} style={{ height: 220 }}>
                {data.map((item) => (
                    <TabPane tab={item.tab} key={item.key} disabled={item.disabled} closable={item.closable}>
                        {item.content}
                    </TabPane>
                ))}
            </Tabs>
        </>
    );
}
```