## 使用方式

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="my-player" />
</body>
<link ref="stylesheet" href="audioPlayer.css">
<srcipt src="audioPlayer.js"></srcipt>
<script>
  var player = new AudioPlayer({
    el:'#my-player',
    source:'https://xxx.com/xx.mp3'
	})
  player.play().then(()=>{
    // do something
  })
</script>
</html>
```



### AudioPlayer 配置

创建 AudioPlayer 实例时可传入以下参数：

| 属性       | 说明                                                         | 类型     | 默认值     |
| ---------- | ------------------------------------------------------------ | -------- | ---------- |
| el         | 需要放置播放器的外部元素id                                   | string   | -          |
| source     | 音频地址，参考 audio 标签的 src 属性                         | string   | -          |
| autoplay   | 是否自动播放音频，参考 audio 标签的 autopaly 属性。注：可能存在局限性，参考[注意](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#%E5%B1%9E%E6%80%A7) | boolean  | false      |
| loop       | 是否循环播放音频，参考 audio 标签的 loop 属性                | boolean  | false      |
| preload    | 使用何种加载方式加载音频，参考 audio 标签的 preload 属性     | function | 'metadata' |
| timeFormat | 自定义展示音频总时间                                         | function | -          |
| allowSeek  | 是否允许手动控制进度条                                       | boolean  | -          |

### AudioPlayer API
AudioPlayer实例会暴露以下内容：
#### 实例属性
##### `audioPlayer.duration`
音频时间长度(s)

##### `audioPlayer.currentTime`
当前播放时间

#### 静态方法

##### `AudioPlayer.canPlay(types)`
type有以下几种类型

+ Mp3 - `AudioPlayer.canPlay('mp3')`
+ Aac - `AudioPlayer.canPlay('aac')`
+ Wav - `AudioPlayer.canPlay('wav')`
+ Flac - `AudioPlayer.canPlay('flac')`
+ Ogg -  `AudioPlayer.canPlay('ogg')`

返回是否可以播放该音频的结果



#### 实例方法
##### `audioPlayer.load(url)`
载入音频，返回`Promise`，将在音频可播放时`resolve()`

##### `audioPlayer.play()`
播放音频

##### `audioPlayer.pause()`
播放音频

##### `audioPlayer.togglePlay()`
切换音频播放状态

##### `audioPlayer.seek()`
跳转到指定的时间开始播放

#### 事件
##### `audioPlayer.on(event,callback)`
参考[audio事件-MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio#%E4%BA%8B%E4%BB%B6)


