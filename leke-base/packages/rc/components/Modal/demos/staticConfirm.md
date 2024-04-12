---    
title: 确认对话框
description: 确认对话框以及最大高度限制
---

```jsx
import React,{useState} from 'react';
import cx from 'classnames';
import {Button,Modal} from '@leke/rc';

export default function(){
    const [current,setCurrent]=useState(null);
    const data=['confirm','miniConfirm'];
    return  <div>
        <div>
            {data.map(item=><div key={item} className={cx('leke-demo',{active:current===item})} onClick={()=>{
                setCurrent(item);
                if(item==='confirm'){
                    Modal.confirm({
                        title:'确认弹窗',
                        content:<div>
                            <p style={{ color: '#000000' }}>确定要删除这条信息吗？</p>
                            {Array(30).fill('').map((_,i) => <p key={i}>简单的信息描述</p>)}
                            <p>看得到我吗</p>
                        </div>
                    });
                }else{
                    Modal.miniConfirm({
                        content:<div>
                            <p style={{ color: '#000000' }}>确定要删除这条信息吗？</p>
                            <p>简单的信息描述</p>
                            <p>简单的信息描述</p>
                        </div>
                    });
                }
            }}>{item}</div>)}
        </div>
    </div>;
}
```