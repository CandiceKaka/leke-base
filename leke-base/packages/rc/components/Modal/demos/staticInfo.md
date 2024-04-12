---    
title: 信息提示框
description: 信息提示框
---
```jsx
import React,{useState} from 'react';
import cx from 'classnames';
import {Button,Modal} from '@leke/rc';

export default function(){
    const [current,setCurrent]=useState(null);
    const data=['info','miniInfo'];
    return  <div>
        <div>
            {data.map(item=><div key={item} className={cx('leke-demo',{active:current===item})} onClick={()=>{
                setCurrent(item);
                if(item==='info'){
                    Modal.info({
                        content:<div className="center2">
                            <p>一些简单的信息提示</p>
                            <p>一些简单的信息提示</p>
                        </div>
                    });
                }else{
                    Modal.miniInfo({
                        content:<div className="center2">
                            <p>一些简单的信息提示</p>
                            <p>一些简单的信息提示</p>
                        </div>
                    });
                }
            }}>{item}</div>)}
        </div>
    </div>;
}
```

```css
.center2 {
    height: 144px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

```