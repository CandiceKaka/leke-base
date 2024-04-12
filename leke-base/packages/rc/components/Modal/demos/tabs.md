---    
title: 多标题模式
description: tab+modal模式
---
```jsx
import React,{useState,useCallback} from 'react';
import cx from 'classnames';
import {Button,Modal} from '@leke/rc';

export default function(){
    const [visible,setVisible]=useState(false);
    const [tab,setTab]=useState(0);
    const handleOk=useCallback(()=>{
        setVisible(false);
    });
    const onChangeTitle = (_,index) => {
        setTab(index);
    };
    return  <div>
        <Button type='main' onClick={()=>{setVisible(true);}}>标签modal</Button>
        <Modal 
            title={['标题1','标题2','标题3']}
            visible={visible} 
            onCancel={()=>{setVisible(false);}}
            onOk={handleOk}
            onChangeTitle={onChangeTitle}
        >
            <div className="center3">
                {tab === 0 ? (
                    <p>第一页啊啊啊啊阿</p>
                ) : tab === 1 ? (
                    <p>第二页啊啊啊啊阿</p>
                ) : (
                    <p>第三页啊啊啊啊阿</p>
                )}
            </div>
        </Modal>
    </div>;
}
```

```css
.center3 {
    height: 92px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

```