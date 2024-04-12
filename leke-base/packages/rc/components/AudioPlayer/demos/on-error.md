---    
title: 捕获错误
description: 捕获音频错误进行对应的处理
---
```jsx
import React from 'react';
import {AudioPlayer,Button} from '@leke/rc';


export default function(){
    const audioPlayerRef = React.useRef(null);
    const [error,setError] = React.useState('');
    const options = {
        src:'http://error.mp3',
    };

    return <> 
        <AudioPlayer ref={audioPlayerRef} onError={e=>{
            setError(`type:${e.type},code:${e.error.code}`);
        }} {...options}/>
        <br/>
        <p>错误信息：{error}</p>
    </>;
}
```
