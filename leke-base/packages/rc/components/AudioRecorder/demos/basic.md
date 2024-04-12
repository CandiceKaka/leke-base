---
title: 功能拓展
description: 展示录音音频
---

```jsx
/* eslint-disable */
import React, { useState, useCallback, useEffect } from "react";
import { AudioRecorder } from "@leke/rc";
import http from "@leke/http";

export default function () {
  const [httpOption, setHttpOption] = useState({});

  const onStart = () => {
    console.log("start");
  };

  const onStop = async (boldFile) => {
    if (!boldFile) {
      return;
    }
    let baseFile = await blobToDataURI(boldFile);

    const number = 8;
    //检索头部关键词位置
    const pos = baseFile.search(";base64,");
    //去头部
    baseFile = baseFile.slice(pos + number, baseFile.length);
    setTimeout(() => {
      setHttpOption({
        method: "post",
        url: "https://webapp.leke.cn/auth/global/fs/upload/audio/base64.htm",
        data: `file=${baseFile}&ext=mp3&type=audio`,
      });
    }, 3000);
  };
  const onReRecorder = () => {
    console.log("重新录音");
  };
  const blobToDataURI = (blob) => {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function (e) {
        resolve(e.target.result);
      };
      reader.readAsDataURL(blob);
    });
  };
  return (
    <>
      <AudioRecorder
        duration="300"
        audioPlayerVisible
        onStart={onStart}
        uploadParams={{
          ...httpOption,
          success: (e) => {
            console.log("success", e);
          },
          error: (error) => {
            console.log("error", error);
          },
        }}
        onStop={onStop}
        onReRecorder={onReRecorder}
      />
    </>
  );
}
```
