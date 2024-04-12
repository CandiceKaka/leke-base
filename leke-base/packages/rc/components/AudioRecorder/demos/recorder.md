---
title: 纯录音
description: 录音基本使用
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
    return (
        <>
            <AudioRecorder onStart={onStart} onStop={onStop} />
        </>
    );
}
```

```css

```
