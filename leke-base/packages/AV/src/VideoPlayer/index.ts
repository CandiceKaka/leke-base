import Hls from 'hls.js';
import { newUID } from './utils/uid';
import EventBase from '../tools/event';
import * as Dom from '../tools/dom';
import {checkBrowser,getResourceType, entryFullscreen, exitFullscreen,calcDefaultProps} from '../tools/share';
import { VIDEO_EVENTS } from './utils/config';
import { getVideoSize } from './utils/share';
import Control from './components/ControlBar';
import txt from './template.html';

const prefixCls='leke';

class Player {
    private hls: Hls;
    private uid: number;
    private width: number;
    private height: number;
    private unsupportImgStyle:any;
    private paused:boolean;
    private currentTime:number;
    private duration:number;
    private volume:number;
    private options: any;
    private browser: string;
    private event: any;
    private template: string;
    private loadingFlag: boolean;
    private loadingTimer: any;
    private isFullscreen: boolean;
    private mountNode: any;
    private el: any;
    private input: any;
    private video: any;
    private loading: any;
    private mask: any;
    private audioPlay: any;
    private audioSuspend: any;
    private audioInit: any;
    private control: any;
    private toast: any;
    private error: any;
    private errorFlag: boolean;
    private proxyPausedChange:(boolean)=>void

    constructor(options) {
        const { el,unsupportImgStyle, ...opts } = options;
        this.uid = newUID();
        this.mountNode = el;
        this.unsupportImgStyle=unsupportImgStyle;
        const { width, height } = getVideoSize(options.width, options.height);
        this.width = width;
        this.height = height;
        this.options = calcDefaultProps({resourceType:'video'},opts);
        this.browser = checkBrowser();
        this.event = new EventBase();
        this.errorFlag = false;
        this.loadingFlag = false;
        this.loadingTimer = null;
        this.isFullscreen = false;
        this.volume=100;
        this.template = txt;
        this.init();
    }

    init() {
        require('./index.less');
        if (!this.mountNode) return console.error('请传入挂载实例');
        if (!this.options.src) return console.error('请传入视频路径');
        const type=getResourceType(this.options.src);
        const style=Dom.getStyle(this.unsupportImgStyle);
        if(type==='M3U8'){
            if(Hls.isSupported()){
                this.initVideo();
                this.hlsHandle();
            }else{
                const video=document.createElement('video');
                if(video.canPlayType('application/vnd.apple.mpegurl')){
                    this.initVideo();
                    this.video.src=this.options.src;
                }else{
                    this.mountNode.innerHTML = `<div class="${prefixCls}-video-unsupport" style="width:${this.width}px;height:${this.height}px;"><img src="https://static.leke.cn/scripts/common/player/images/upgrade.png" style="${style}" /><p>浏览器版本过低，请升级或用其他浏览器打开</p></div>`;
                }
            }
        }else if(['MP4','WEBM','OGG'].indexOf(type)!==-1){
            this.initVideo();
            this.video.src=this.options.src;
        }else{
            this.mountNode.innerHTML = `<div class="${prefixCls}-video-unsupport" style="width:${this.width}px;height:${this.height}px;"><img src="https://static.leke.cn/scripts/common/player/images/upgrade.png" style="${style}" /><p>不支持的视频格式，请转化为Mp4、WebM、Ogg、M3u8等格式</p></div>`;
        }
    }

    handleError(){
        if(this.loadingFlag)this.closeLoading();
        this.error.style.display='block';
        this.control.style.display='none';
        this.pause();
    }
    initVideo(){
        this.mountNode.innerHTML=this.template.replace(`<div class="${prefixCls}-video-root-container">`,`<div class="${prefixCls}-video-root-container" style="width:${this.width}px;height:${this.height}px;">`);
        this.el = this.mountNode.querySelector(`.${prefixCls}-video-root-container`);
        this.input = this.el.querySelector(`.${prefixCls}-video-input`);
        this.input.id = `video-input-${this.uid}`;
        this.video = this.el.querySelector(`video`);
        this.video.id=`video-${this.uid}`;
        this.mask = this.el.querySelector(`.${prefixCls}-video-mask`);
        this.audioPlay = this.el.querySelector(`.${prefixCls}-audio-play`);
        this.audioSuspend = this.el.querySelector(`.${prefixCls}-audio-suspend`);
        this.audioInit = this.el.querySelector(`.${prefixCls}-audio-init`);
        this.control = this.el.querySelector(`.${prefixCls}-video-control-bar`);
        this.loading = this.el.querySelector(`.${prefixCls}-loading-container`);
        this.error = this.el.querySelector(`.${prefixCls}-error-wrap`);
        this.toast = this.el.querySelector(`.${prefixCls}-video-fullscreen-toast`);
        new Control(this.control,this.video,this.event);
        this.initConfig();
    }


    hlsHandle() {
        const hls = new Hls({
            debug:this.options.debug
        });
        this.hls = hls;
        hls.on(Hls.Events.MEDIA_ATTACHED, ()=> {
            hls.loadSource(this.options.src);
        });
        hls.on(Hls.Events.MEDIA_ATTACHED,()=>{
            this.event.trigger('ready');
        });
        hls.on(Hls.Events.FRAG_PARSING_INIT_SEGMENT,(e,data)=>{
            console.log(Hls.Events.FRAG_PARSING_INIT_SEGMENT,e,data);
            this.event.trigger('fragInit');
        });
        hls.on(Hls.Events.BUFFER_CODECS,(data)=>{
            // console.log(Hls.Events.BUFFER_CODECS,data);
        });
        hls.on(Hls.Events.ERROR, (err,errorContent) => {
            console.error(err,errorContent);
            if(!this.loadingFlag)this.showLoading();
            // @ts-ignore
            if (errorContent.response&&errorContent.response.code>=400) {
                // 此处为兼容部分音频存在播放到一半文件返回异常的问题
                this.handleError();
            }
        });
        hls.on(Hls.Events.FRAG_LOADING, () => {
            this.loadingTimer = setTimeout(() => {
                clearTimeout(this.loadingTimer);
                this.showLoading();
            }, 1000);
        });
        hls.on(Hls.Events.BUFFER_CREATED, () => {
            if(!this.loadingFlag)this.showLoading();
        });
        hls.on(Hls.Events.FRAG_BUFFERED, () => {
            this.closeLoading();
        });
        hls.on(Hls.Events.BUFFER_APPENDED, () => {
            this.closeLoading();
        });
        hls.attachMedia(this.video);
    }
    initConfig() {
        this.subscription();
        const config: any = {};
        if (this.options.autoplay) {
            config.autoplay = 'autoplay';
        }
        if (this.options.loop) {
            config.loop = 'loop';
        }
        if(this.options.poster){
            config.poster=this.options.poster;
        }
        if(this.options.muted){
            config.muted='muted';
        }
        if(this.options.onReady){
            this.on('ready',this.options.onReady);
        }
        if(this.options.onLoad){
            this.on('loadedmetadata',this.options.onLoad);
        }
        if(this.options.onStart){
            this.on('start',this.options.onStart);
        }
        if(this.options.onEnded){
            this.on('ended',this.options.onEnded);
        }
        if(this.options.onTimeChange){
            this.on('timeupdate',this.options.onTimeChange);
        }
        if(this.options.onPausedChange){
            this.trigger('proxyPausedChange',this.options.onPausedChange);
        }
        if(this.options.onVolumeChange){
            this.trigger('proxyVolumeChange',this.options.onVolumeChange);
        }
        if(this.options.onFullscreenChange){
            this.trigger('proxyFullscreenChange',this.options.onFullscreenChange);
        }
        Dom.setProps(this.video, {}, config);
    }

    subscription() {
        this.event.on('proxyPausedChange', (fn) => {
            this.proxyPausedChange=fn;
        });
        VIDEO_EVENTS.forEach(action => {
            this.video.addEventListener(action, () => {
                this.event.trigger(action);
            });
        });
        this.video.addEventListener('click', () => {
            this.event.trigger('click',!this.video.paused);
        });
        this.mask.addEventListener('click', () => {
            this.event.trigger('click',!this.video.paused);
        });
        this.el.addEventListener('click', () => {
            this.event.trigger('containerClick');
        });
        this.video.addEventListener('play', () => {
            this.paused=false;
            this.event.trigger('play');
            if (this.video.currentTime === 0) {
                this.event.trigger('start');
            }
        });
        this.video.addEventListener('pause', () => {
            this.paused=true;
            this.event.trigger('pause');
        });
        this.video.addEventListener('loadedmetadata', () => {
            this.duration=this.video.duration;
            this.event.trigger('loadedmetadata');
        });
        this.video.addEventListener('timeupdate', () => {
            this.currentTime=this.video.currentTime;
            if(this.loadingFlag)this.closeLoading();
            this.event.trigger('timeupdate', this.video.currentTime);
        });
        this.event.on('click', (nextPaused) => {
            if (!this.proxyPausedChange) {
                nextPaused ?this.video.pause(): this.video.play();
            } else {
                this.proxyPausedChange(nextPaused);
            }
        });
        this.event.on('containerClick', () => {
            this.input.focus();
        });
        this.event.on('ready', () => {
            if(this.options.resourceType==='audio'){
                this.audioInit.style.display='block';
            }
            if (this.options.muted||this.browser==='FF') {
                this.video.defaultMuted = true;
                this.event.trigger('volumeChange', 0);
            }
            this.event.on('error', (err) => {
                console.error(err);
                this.errorFlag=true;
                this.handleError();
            });
        });
        this.event.on('volumeChange', (step) => {
            this.volume=step;
        });   
        this.event.on('entryFullscreen', () => {
            this.isFullscreen = true;
            entryFullscreen(this.el);
            Dom.addClass(this.el, 'full-video-container');
            if (this.browser === 'IE') {
                this.toast.style.display='block';
                setTimeout(()=>{this.toast.style.display='';},2000);
            }
        });
        this.event.on('exitFullscreen', () => {
            this.isFullscreen = false;
            exitFullscreen();
            Dom.removeClass(this.el, 'full-video-container');
        });
        this.event.on('play', () => {
            if(this.options.resourceType==='video'){
                this.mask.style.display='';
            }else{
                this.audioPlay.style.display='block';
                this.audioSuspend.style.display='';
                this.mask.style.display='';
            }
        });
        this.event.on('pause', () => {
            if(this.options.resourceType==='video'){
                this.mask.style.display='block';
            }else{
                this.audioPlay.style.display='';
                this.audioSuspend.style.display='block';
            }
        });
        this.event.on('playing',()=>{
            if(this.loadingFlag)this.closeLoading();
        });
        this.event.on('ended', () => {
            this.closeLoading();
            this.pause();
        });
        // 空格符控制暂停/播放
        const keyDown = e => {
            if (e.keyCode === 32) {
                e.preventDefault();
                const activeId = document.activeElement.id;
                if (activeId === `video-input-${this.uid}`) {
                    this.trigger('click',!this.video.paused);
                }
            }
        };
        document.body.addEventListener('keydown', keyDown);
        this.event.on('destroy', () => {
            if (this.hls) {
                this.hls.destroy();
            }
            document.body.removeEventListener('keydown', keyDown);
        });
    }

    showLoading(){
        if(this.errorFlag)return;
        this.loadingFlag=true;
        this.loading.style.display='block';
    }

    closeLoading(){
        this.loadingTimer && clearTimeout(this.loadingTimer);
        this.loadingFlag=false;
        this.loading.style.display='';
    }

    play(){
        this.video.play();
    }
    pause(){
        this.video.pause();
    }
    changeTime(time:number){
        if (time < 0) {
            time = 0;
        }
        if (time>this.duration) {
            time = this.duration;
        }
        this.trigger('timeChange',time);
    }
    changeVolume(volume:number){
        if (volume < 0) {
            volume = 0;
        }
        if (volume>100) {
            volume = 100;
        }
        this.trigger('volumeChange',volume);
    }
    entryFullscreen(){
        this.trigger('entryFullscreen');
    }
    exitFullscreen(){
        this.trigger('exitFullscreen');
    }
    addEventListener(type, listener) {
        this.event.on(type, listener);
    }
    on(type, listener) {
        this.event.on(type, listener);
    }
    removeEventListener(type, listener) {
        this.event.off(type, listener);
    }
    off(type, listener) {
        this.event.off(type, listener);
    }
    getListener(type) {
        return this.event.getListener(type);
    }
    trigger(...args) {
        this.event.trigger(...args);
    }
    destroy() {
        this.event.trigger('destroy');
    }
}

export default Player;
