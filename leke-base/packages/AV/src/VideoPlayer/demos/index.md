# H5 视频播放器
通用的H5视频播放器

## 兼容环境
- 现代浏览器和IE11

## 升级提示
![提示](https://static.leke.cn/scripts/common/player/images/upgrade_tip.png)

## 支持的视频格式
| 格式 | IE | Firefox | Opera | Chrome | Safari | 
| --- | --- | --- | --- | --- | --- | 
| MP4 | 9.0+ | 35.0+ | 25.0+ | 4.0+  | 3.2+ |
| WebM | No | 28.0+ | 16.0+| 16.0+  | 12.0+ |
| Ogg | No | 3.5+ | 11.5+ | 4.0+  | No |
| M3U8 | 11.0+(IE 11部分支持) | 42.0+ | 15.0+ | 23.0+  | 8.0+ |

## 代码演示

```html
<script src='https://static.leke.cn/scripts/common/player/VideoPlayer.min.js'></script>
<script>
	const player=new VideoPlayer({
		el:document.querySelector('#root'),
		width:876,
		height:492,
		src:'https://hls.cntv.kcdnvip.com/asp/hls/1200/0303000a/3/default/c9d6fcb3ff7e42f6b6db4199768ff249/1200.m3u8?maxbr=2048',
		autoplay:true
	});
	// 方法
	player.pause();
	// 属性
	console.log(player.duration);
	// 事件
	player.on('error',()=>{});
	player.on('ended',()=>{});
	player.on('timeupdate',()=>{});
</script>
```

## API
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| el | 挂载实例 | element | - |
| debug | 是否开启debug模式 | bollean | false |
| src | 资源路径 | string | - |
| width | 宽度 | number | 638 |
| height | 高度 | number | 358 |
| autoplay | 自动播放 | boolean | false |
| loop | 循环播放 | boolean | false |
| poster | 视频封面 | string | - |
| muted | 静音 | boolean | false |
| resourceType | 播放的资源类型 | "video"\|"audio" | "video" |
| unsupportImgStyle | 视频不支持下提示的图片样式 | style object | - |
| onReady | 媒体SourceBuffer加载完成后的回调 | function | - |
| onLoad | 媒体信息获取完毕后的回调 | function | - |
| onStart | 视频开始播放的回调 | function | - |
| onEnded | 视频结束播放的回调 | function | - |

## 属性
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| video | Video Element | element | - |
| currentTime | 当前时间 | number | - |
| duration | 视频时长 | number | - |
| volume | 视频音量 | number | 1 |
| isFullscreen | 是否处于全屏 | boolean | false |

## 方法
| 方法 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| play | 播放 | function | - |
| pause | 暂停 | function | - |
| changeTime | 时间跳转 | function(time)=>void | - |
| changeVolume | 音量调节 | function(volume)=>void | - |
| entryFullscreen | 进入全屏 | function | - |
| exitFullscreen | 退出全屏 | function | - |
