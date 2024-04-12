---    
title: 基本用法
description: 音频基本使用
---
```jsx
import React from 'react';
import {AudioPlayer,Button} from '@leke/rc';

const mp3List = [
    'http://music.163.com/song/media/outer/url?id=493735012.mp3',
    'http://music.163.com/song/media/outer/url?id=493735.mp3'
];

export default function(){
    const [allowSeek,setAllowSeek] = React.useState(true);
    const [audioStatus,setAudioStatus] = React.useState('stop');
    const [index,setIndex] = React.useState(0);
    
    return <>
        <h3>audio status：{audioStatus}</h3>
        <AudioPlayer 
            src={mp3List[index]} 
            allowSeek={allowSeek} 
            onPlay={()=>{setAudioStatus('playing');}} 
            onPause={()=>{setAudioStatus('pause');}}
        />
        <br/>
        <Button className="audio-button" size="small" onClick={()=>
        {setAudioStatus('stop');setIndex(pre=>+!pre);}}>toggle mp3</Button>
        <Button className="audio-button" size="small" onClick={()=>{setAllowSeek(pre=>!pre);}}>toggle allowSeek</Button>
    </>;
}
```
```css
.audio-button{
    margin-right: 8px;
}
```
