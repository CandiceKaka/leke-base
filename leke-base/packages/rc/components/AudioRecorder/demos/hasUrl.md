<!--
 * @Descripttion: 
 * @Author: gulingxin
 * @Date: 2021-02-03 15:42:48
 * @LastEditTime: 2021-02-04 17:12:05
-->
---

title: 初始化音频
description: 初始化有音频的时候
---

```jsx
import React from "react";
import { AudioRecorder } from "@leke/rc";

export default function () {
    const onStart = () => {
        console.log("start");
    };
    const onStop = (e) => {
        console.log(e);
    };
    const handleAudioUpdate = (e) => {
        console.log(e);
    };
    const onReRecorder = () => {
        console.log('重新录音');
    };
    const player = {
        src:'http://music.163.com/song/media/outer/url?id=493735012.mp3'
    };
    return (
        <>
            <AudioRecorder player={player} duration="5" onStart={onStart} onStop={onStop} audioPlayerVisible onReRecorder={onReRecorder} />
        </>
    );
}
```

```css

```
