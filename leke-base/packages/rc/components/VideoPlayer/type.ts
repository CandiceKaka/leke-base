
export interface IVideoProps {
    // 给容器添加类名
    wrapClassName?: string;
    // 资源路径
    src:string;
    // 宽度
    width?:number;
    // 高度
    height?:number;
    // 自动播放
    autoplay?: boolean;
    // 循环播放
    loop?: boolean;
    // 视频封面
    poster?: string;
    // 暂停
    paused?:boolean
    // 音量
    volume?:number;
    // 全屏
    fullscreen?: boolean;
    // 资源类型
    resourceType?:'audio'|'video';
    // 视频不支持下提示的图片样式
    unsupportImgStyle?:any;
    // 组件SourceBuffer加载完成后的回调
    onReady?:()=>void;
    // 组件媒体信息获取完毕后的回调
    onLoad?:()=>void;
    // 视频开始播放的回调
    onStart?:()=>void;    
    // 视频结束播放的回调
    onEnded?:()=>void;
    // 播放时间变更的回调
    onTimeChange?:(time:number)=>void;
    // 手动改变播放时间后触发的回调
    onTouchTimeChange?:(time:number)=>void;
    // 播放状态的回调
    onPausedChange?:(pasued:boolean)=>void;
    // 音量变更的回调
    onVolumeChange?:(volumn:number)=>void;
    // 进入全屏的回调
    onFullscreenChange?:(isFullscreen:boolean)=>void;
  }