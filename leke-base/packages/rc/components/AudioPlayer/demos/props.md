## props
为音频组件设定个性化配置
  
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| ref  | 用于获取AudioPlayer实例 | AudioPlayer  | - |
| src | 音频地址，参考 audio 标签的 src 属性 | string | - |
| autoplay   | 参考 audio 标签的 autopaly 属性。注：可能存在局限性，参考[注意](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#%E5%B1%9E%E6%80%A7) | boolean  | false      |
| loop       | 是否循环播放音频，参考 audio 标签的 loop 属性                | boolean  | false      |
| preload    | 使用何种加载方式加载音频，参考 audio 标签的 preload 属性 | function | 'metadata' |
| timeFormat | 自定义展示音频总时间 | duration:number => string | - |
| allowSeek  | 是否允许手动控制进度条 | boolean  | true |
| onEvent  | 使用驼峰命名方式，例如onPlay()，支持原生audio所有事件，参考[audio事件-MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#%E4%BA%8B%E4%BB%B6) | e:Event => void  | - |
| onError  | 错误回调，目前包含了[DOMException](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException)和[MediaError](https://developer.mozilla.org/en-us/docs/Web/API/MediaError) | error => void  | - |
