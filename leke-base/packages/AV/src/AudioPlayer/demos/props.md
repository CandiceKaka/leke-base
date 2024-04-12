---    
title: 构造函数配置项
---

| 属性     | 说明       | 类型     | 默认值     |
| ---      | ------------------------ | -------- | ---------- |
| el       | 需要放置播放器的外部元素 | HTMLElement   | -          |
| src   | 音频地址，参考 audio 标签的 src 属性  | string   | -          |
| autoPlay   | 是否自动播放音频，参考 audio 标签的 autopaly 属性。注：可能存在局限性，参考[注意](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#%E5%B1%9E%E6%80%A7) | boolean  | false      |
| loop       | 是否循环播放音频，参考 audio 标签的 loop 属性 | boolean  | false      |
| preload    | 使用何种加载方式加载音频，参考 audio 标签的 preload 属性  | function | 'metadata' |
| timeFormat | 自定义展示音频总时间 | function | - |
| allowSeek  | 是否允许手动控制进度条  | boolean  | - |

