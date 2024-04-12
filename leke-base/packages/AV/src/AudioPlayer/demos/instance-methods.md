---    
title: 实例方法
---

| 方法 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| load(url) | 加载音频资源,等于 configOptions({src:url}) | string=>Promise | - |
| play() | 播放音频 | void | - |
| pause() | 暂停音频 | void | - |
| togglePlay() | 切换播放状态 | void | - |
| seek(seconds) | 跳转到指定位置播放(s) | number => void | - |
| on(event,callback) | 事件同[audio事件-MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#%E4%BA%8B%E4%BB%B6) | void | - |
| configOptions(ops) | 修改音频 src，autoplay 等构造配置项 | - | - |


