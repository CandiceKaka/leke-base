---    
title: 受控用法
description: 设置 paused 会使组件变得受控，此时 autoplay 属性失效
---
```jsx
import React from 'react';
import {AudioPlayer,Button} from '@leke/rc';


export default function(){
    const audioPlayerRef = React.useRef(null);
    const [paused,setPaused] = React.useState(true);
    const options = {
        id: 'audio-player-control',
        src:'http://music.163.com/song/media/outer/url?id=493735012.mp3',
        autoplay:false,
    };

    return <> 
        <AudioPlayer ref={audioPlayerRef} paused={paused} {...options}/>
        <br/>
        <Button className="audio-button" size="small" onClick={()=>{setPaused(false);}}>play</Button>
        <Button className="audio-button" size="small" onClick={()=>{setPaused(true);}}>pause</Button>
    </>;
}
```
