---    
title: 异步关闭
description: 异步关闭
---
```jsx
import React,{useState,useCallback} from 'react';
import cx from 'classnames';
import {Button,Modal} from '@leke/rc';

export default function(){
    const [visible,setVisible]=useState(false);
    const [confirmLoading,setConfirmLoading]=useState(false);
    const handleOk=useCallback(()=>{
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    });
    return  <div>
        <Button type='main' onClick={()=>{setVisible(true);}}>异步关闭</Button>
        <Modal 
            title='异步关闭弹窗'
            visible={visible} 
            confirmLoading={confirmLoading}
            onCancel={()=>{setVisible(false);}}
            onOk={handleOk}
        >
            <div className="center4">
                <p>balabala~</p>
                <p>balabala~</p>
                <p>balabala~</p>
            </div>
        </Modal>
    </div>;
}
```

```css
.center4 {
    height: 92px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

```