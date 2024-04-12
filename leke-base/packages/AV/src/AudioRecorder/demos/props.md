---
title: API
---

为录音组件设定个性化配置
| 属性 | 说明 | 类型 | 默认值 |
| ------------------ | ------------ | ---------------------------------------------------------- | --------- |
| el       | 需要放置播放器的外部元素 | HTMLElement   | -          |
| player | 音频组件 | audioProps | - |
| duration | 录音限时时长 | number | 默认 500s |
| audioPlayerVisible | 是否查看音频 | boolean | false |
| onStart | 开始录音回调 | boolean | - |
| onStop | 停止录音回调 | function | bold |
| onReRecorder | 重新录音回调 | function | - |
| uploadParams | 音频上传 | {...http,success:()=>{}//成功回调，error:()=>{}//失败回调} | - |
| updateAudioSrc | 更新音频地址 | string | - |
| recordUpload | 手动触发录音上传 | string | - |
