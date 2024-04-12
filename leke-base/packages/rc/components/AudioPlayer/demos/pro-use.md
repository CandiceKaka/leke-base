---    
title: 拓展用法
description: 传入ref获取AudioPlayer的实例，可以利用实例绑定事件或者控制音频播放，具体用法可在“音视频”项中找到
---
```jsx
import React from 'react';
import {AudioPlayer,Button} from '@leke/rc';


export default function(){
    const audioPlayerRef = React.useRef(null);
    const options = {
        id: 'audio-player-control',
        src:'http://music.163.com/song/media/outer/url?id=493735012.mp3',
        loop:false,
        autoplay:false,
        allowSeek:true,
        preload:'metadata',
    };

    return <> 
        <AudioPlayer ref={audioPlayerRef} {...options}/>
        <br/>
        <Button className="audio-button" size="small" onClick={()=>{audioPlayerRef.current.play();}}>play</Button>
        <Button className="audio-button" size="small" onClick={()=>{audioPlayerRef.current.pause();}}>pause</Button>
        <Button className="audio-button" size="small" onClick={()=>{audioPlayerRef.current.togglePlay();}}>toggle play</Button>
        <Button className="audio-button" size="small" onClick={()=>{audioPlayerRef.current.seek(20);}}>seek at 20s</Button>
        <Button className="audio-button" size="small" onClick={()=>{audioPlayerRef.current.on('play',e=>{
            console.log('start play');
        });}}>bind event</Button>
        <Button className="audio-button" size="small" onClick={()=>{audioPlayerRef.current.once('play',e=>{
            console.log('start once play');
        });}}>bind event once</Button>
        <Button className="audio-button" size="small" onClick={()=>{audioPlayerRef.current.off('play');}}>unbind all event</Button>
    </>;
}
```


