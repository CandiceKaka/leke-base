---    
title: API
description: 可以用ref获取到实例
---
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| wrapClassName | 容器类命 | string | - |
| src | 资源路径 | string | - |
| width | 宽度 | number | 638 |
| height | 高度 | number | 358 |
| autoplay | 自动播放 | boolean | false |
| loop | 循环播放 | boolean | false |
| poster | 视频封面 | string | - |
| paused | 是否暂停 | boolean | false |
| resourceType | 播放的资源类型 | "video"\|"audio" | "video" |
| volume | 音量 | number | 100 |
| fullscreen | 是否全屏(不支持初始化为true) | boolean | false |
| unsupportImgStyle | 视频不支持下提示的图片样式 | style object | - |
| onReady | 媒体SourceBuffer加载完成后的回调 | function | - |
| onLoad | 媒体信息获取完毕后的回调 | function | - |
| onStart | 视频开始播放的回调 | function | - |
| onEnded | 视频结束播放的回调 | function | - |
| onPausedChange | 切换暂停/播放时触发的回调 | function | - |
| onTimeChange | 播放时间变更后的回调 | function | - |
| onTouchTimeChange | 手动改变播放时间后触发的回调 | function | - |
| onVolumeChange | 音量变更的回调 | function | - |
| onFullscreenChange | 进入/退出全屏的回调 | function | - |
| ref | 获取挂载实例,实例的属性video可以获取到Video Element对象 | ref | - |