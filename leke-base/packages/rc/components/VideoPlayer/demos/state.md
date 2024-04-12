---    
title: 受控组件
---
```jsx
import React,{useState,useRef} from 'react';
import {VideoPlayer} from '@leke/rc';


export default function(){
    const [paused,setPaused]=useState(true);
    const [time,setTime]=useState(0);
    const [volume,setVolume]=useState(60);
    const [full,setFull]=useState(false);
    const ref=useRef(null);

    return <div>
        <VideoPlayer 
            src='https://file.leke.cn/group1/M00/D7/65/wKgURF3nbCGAPa0_AAAopHOOv_E71.m3u8' 
            paused={paused}
            volume={volume}
            fullscreen={full}
            onPausedChange={(paused)=>{
                setPaused(paused);
            }}
            onTimeChange={time=>{
                setTime(time);
            }}
            onVolumeChange={volume=>{
                setVolume(volume);
            }}
            onFullscreenChange={full=>{
                setFull(full);
            }}
            onTouchTimeChange={time=>{
                console.log(time);
            }}
            ref={ref}
        />
        <div style={{marginTop:12}}>
            <button style={{marginRight:16}} onClick={()=>{
                paused?setPaused(false):setPaused(true);
            }}>暂停/播放</button>
            <button style={{marginRight:16}} onClick={()=>{
                setVolume(0);
            }}>静音</button>
            <button style={{marginRight:16}} onClick={()=>{
                setFull(!full);
            }}>全屏</button>
            <button style={{marginRight:16}} onClick={()=>{
                console.log(ref.current.video);
            }}>打印Video实例</button>
        </div>
    </div>
    ;
}
```
