/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-12 18:51:00
 * @LastEditTime: 2021-03-24 17:33:52
 */

import EventEmitter from './EventEmitter';
import {AudioPlayerOptions,AudioPlayerNativeEvent} from './interface';
import { str2dom,formatTime,getDuration } from './utils';
import * as Dom from '../tools/dom';

const defaultOps: AudioPlayerOptions = {
    el: typeof window === 'object' ? document.querySelector('body'):null,
    src:'',
    loop:false,
    autoplay:false,
    allowSeek:true,
    allowPlayControl:true,
    preload:'metadata',
};

class AudioPlayer extends EventEmitter implements AudioPlayerNativeEvent{
  private options: AudioPlayerOptions
  private $audio!:HTMLAudioElement
  private $playBtn!:HTMLDivElement
  private $innerProgress!:HTMLDivElement
  private $outerProgress!:HTMLDivElement
  private $progressBtn!:HTMLDivElement
  private $timeText!:HTMLSpanElement
  private $container!:HTMLElement
  private template=`<div class="leke-audio-container">
    <audio id="audio"></audio>
    <div class="button"></div>
    <div class="progress-outer">
      <div class="progress-inner">
        <div class="progress-button"></div>
      </div>
    </div>
    <span class="duration-text">0'00"</span>
  </div>`
  private playing:boolean = false
  private canplay:boolean = false
  private dragging:boolean = false
  
  currentTime:number = 0
  duration:number = 0
  currentPercent:number = 0
  
  constructor(ops: Partial<AudioPlayerOptions> = {}) {
      super();
      this.options = {
          ...defaultOps,
          ...ops
      };
      this.init();
  }

  static canplay(mime_type){
      const audio = document.createElement('audio');
      let mime_str;
      switch (mime_type) {
      case 'mp3':
          mime_str = 'audio/mpeg';
          break;
      case 'aac':
          mime_str = 'audio/aac';
          break;
      case 'ogg':
          mime_str = 'audio/ogg';
          break;
      case 'flac':
          mime_str = 'audio/flac';
          break;
      case 'wav':
          mime_str = 'audio/wav';
          break;
      }
      if (mime_str !== undefined) {
          if (mime_type === 'mp3' && navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Firefox/i)) {
              return true;
          }
          try {
              return !!audio.canPlayType && audio.canPlayType(mime_str) !== '';
          } catch (e) {
              return false;
          }
      }
      return false;
  }

  private init(){
      require('./index.less');
      const {el,src,autoplay,loop,preload} = this.options;
      const $audioContainer = str2dom(this.template)[0] as HTMLElement;
      this.$container = $audioContainer;
      this.$audio = $audioContainer.querySelector<HTMLAudioElement>('#audio')!;
      this.$playBtn = $audioContainer.querySelector<HTMLDivElement>('.button')!;
      this.$timeText = $audioContainer.querySelector<HTMLSpanElement>('.duration-text')!;
      this.$innerProgress = $audioContainer.querySelector<HTMLDivElement>('.progress-inner')!;
      this.$outerProgress = $audioContainer.querySelector<HTMLDivElement>('.progress-outer')!;
      this.$progressBtn = $audioContainer.querySelector<HTMLDivElement>('.progress-button')!;
      if (autoplay) {
          this.playing = true;
          this.$audio.autoplay = true;
          Dom.addClass(this.$playBtn,'button-pause');
          //   this.$playBtn.classList.add('button-pause');
      }else{
          this.playing = false;
          Dom.addClass(this.$playBtn,'button-start');
          //   this.$playBtn.classList.add('button-start');
      }

      if (src) {
          this.loadSource(src);
      }
      this.$audio.loop=loop;
      this.$audio.preload=preload;
      this.bindEvent();
    
      if (el) {
          el.appendChild($audioContainer);
      }
    
  }

  private bindEvent(){
      this.$outerProgress.addEventListener('click',this.onProgressClk.bind(this));
      this.$playBtn.addEventListener('click',this.togglePlay.bind(this));
      this.$progressBtn.addEventListener('mousedown',this.onDragStart.bind(this));
      this.$progressBtn.addEventListener('touchstart',this.onDragStart.bind(this));

      // 音频事件
      this.$audio.addEventListener('audioprocess',this.onAudioProcess.bind(this));
      this.$audio.addEventListener('canplay',this.onCanplay.bind(this));
      this.$audio.addEventListener('canplaythrough',this.onCanplayThrough.bind(this));
      this.$audio.addEventListener('durationchange',this.onDurationChange.bind(this));
      this.$audio.addEventListener('emptied',this.onEmptied.bind(this));
      this.$audio.addEventListener('ended',this.onEnded.bind(this));
      this.$audio.addEventListener('error',this.onError.bind(this));
      this.$audio.addEventListener('loadeddata',this.onLoadedData.bind(this));
      this.$audio.addEventListener('loadedmetadata',this.onLoadedMetaData.bind(this));
      this.$audio.addEventListener('pause',this.onPause.bind(this));
      this.$audio.addEventListener('play',this.onPlay.bind(this));
      this.$audio.addEventListener('playing',this.onPlaying.bind(this));
      this.$audio.addEventListener('ratechange',this.onRateChange.bind(this));
      this.$audio.addEventListener('seeked',this.onSeeked.bind(this));
      this.$audio.addEventListener('seeking',this.onSeeking.bind(this));
      this.$audio.addEventListener('stalled',this.onStalled.bind(this));
      this.$audio.addEventListener('suspend',this.onSuspend.bind(this));
      this.$audio.addEventListener('timeupdate',this.onTimeUpdate.bind(this));
      this.$audio.addEventListener('volumechange',this.onVolumeChange.bind(this));
      this.$audio.addEventListener('waiting',this.onWaiting.bind(this));
  }

  private addPlayStyle() {
      const playBtnClass = 'button-start';
      const pauseBtnClass = 'button-pause';
      //   this.$playBtn.classList.remove(playBtnClass);
      //   this.$playBtn.classList.add(pauseBtnClass);
      Dom.removeClass(this.$playBtn,playBtnClass);
      Dom.addClass(this.$playBtn,pauseBtnClass);
  }

  private addPauseStyle() {
      const playBtnClass = 'button-start';
      const pauseBtnClass = 'button-pause';
      //   this.$playBtn.classList.remove(pauseBtnClass);
      //   this.$playBtn.classList.add(playBtnClass);
      Dom.removeClass(this.$playBtn,pauseBtnClass);
      Dom.addClass(this.$playBtn,playBtnClass);
  }

  private onProgressClk(e){
      if (!this.canplay) return;
      if (!this.options.allowSeek) return;
      const outerProgressRect = this.$outerProgress.getBoundingClientRect();
      const seekPercent = parseFloat(((e.clientX-outerProgressRect.left)/outerProgressRect.width).toFixed(4));
      this.seek(this.duration*seekPercent);
  }
  private onDragStart(e) {
      if (!this.options.allowSeek) return;
      let seekPercent;
      this.dragging = true;
      Dom.addClass(this.$progressBtn,'progress-button-dragging');
      //   this.$progressBtn.classList.add('progress-button-dragging');

      const onDragMove = (e)=>{
          const x = e.touches?e.touches[0].clientX:e.clientX;
          const outerProgressRect = this.$outerProgress.getBoundingClientRect();
          seekPercent = parseFloat(((x-outerProgressRect.left)/outerProgressRect.width).toFixed(4));
      
          // 考虑拖拽边界条件
          if (seekPercent<0) {
              seekPercent = 0;
          }
          if (seekPercent>1) {
              seekPercent = 1;
          }
          this.$innerProgress.style.width=seekPercent*100+'%';
      };

      const onDragEnd = () => {
          this.dragging = false;
          if (seekPercent) {
              this.seek(this.duration*seekPercent);
          }
          //   this.$progressBtn.classList.remove('progress-button-dragging');
          Dom.removeClass(this.$progressBtn,'progress-button-dragging');
          document.removeEventListener('mousemove',onDragMove);
          document.removeEventListener('mouseup',onDragEnd);
      };
    
      document.addEventListener('mouseup',onDragEnd);
      document.addEventListener('touchend',onDragEnd);

      document.addEventListener('mousemove',onDragMove);
      document.addEventListener('touchmove',onDragMove);
  }

  async onDurationChange(e:Event){
      const {timeFormat:customFormat,src} = this.options;
      let duration:number = this.$audio.duration;
      // Hack 解决谷歌下部分音频长度为 Infinity 的情况 
      // https://stackoverflow.com/questions/21522036/html-audio-tag-duration-always-infinity
      if (duration === Infinity) {
          duration = await getDuration(src);
      }
      this.$timeText.innerHTML = formatTime(duration || 0,customFormat);
      this.duration = duration;

      this.emit('durationchange',e);
  }

  onEmptied(e:Event) {
      this.emit('emptied',e);
  }

  onEnded(e:Event){
      const playBtnClass = 'button-start';
      const pauseBtnClass = 'button-pause';
      this.playing = false;
      //   this.$playBtn.classList.remove(pauseBtnClass);
      //   this.$playBtn.classList.add(playBtnClass);
      Dom.removeClass(this.$playBtn,pauseBtnClass);
      Dom.addClass(this.$playBtn,playBtnClass);
      this.emit('ended',e);
  }

  onError(e:Event) {
      this.emit('error',{
          type:'MediaError',
          error:(e.target as HTMLMediaElement).error,
          message:'a MediaError occurred'
      });
  }

  onAudioProcess(e:Event) {
      this.emit('audioprocess',e);
  }

  onCanplay(e:Event) {
      this.emit('canplay',e);
  }

  onCanplayThrough(e:Event) {
      this.emit('canplaythrough',e);
  }

  onLoadedData(e:Event) {
      this.emit('loadeddata',e);
  }

  onLoadedMetaData(e:Event) {
      this.emit('loadedmetadata',e);
  }

  onPause(e:Event) {
      this.addPauseStyle();
      this.playing = false;
      this.emit('pause',e);
  }

  onPlay(e:Event) {
      this.emit('play',e);
  }

  onPlaying(e:Event) {
      // IE11下 play事件在循环播放模式下，
      // 第二次播放onPlay事件无法正常触发，故用playing事件代替play事件
      if(!this.playing){
          this.addPlayStyle();
          this.playing = true;
      }
      this.emit('playing',e);
  }

  onRateChange(e:Event) {
      this.emit('ratechange',e);
  }

  onSeeked(e:Event) {
      this.emit('seeked',e);
  }

  onSeeking(e:Event) {
      this.emit('seeking',e);
  }

  onStalled(e:Event) {
      this.emit('stalled',e);
  }

  onSuspend(e:Event) {
      this.emit('suspend',e);
  }

  onTimeUpdate(e:Event){
      this.emit('timeupdate',e);
    
      if (this.dragging) return;
      this.currentTime = this.$audio.currentTime;
      this.currentPercent = parseFloat((this.currentTime/this.duration).toFixed(4));
      this.$innerProgress.style.width=this.currentPercent*100+'%';
    
  }

  onVolumeChange(e:Event) {
      this.emit('volumechange',e);
  }

  onWaiting(e:Event) {
      this.emit('waiting',e);
  }

  /**
   * @description: 开始播放音频
   * @return {*} void
   */
  play() {
      const promise = this.$audio.play();
      if (promise) {
          promise.catch(e=>{
              this.emit('error',{
                  type:'DOMException',
                  error:e,
                  message:'a DOMException occurred'
              });
          });
      }
      
  }

  /**
   * @description: 暂停播放音频
   * @return {*} void
   */
  pause(){
      // if (!this.canplay) return
      const playBtnClass = 'button-start';
      const pauseBtnClass = 'button-pause';
      this.playing = false;
      this.$audio.pause();
      //   this.$playBtn.classList.remove(pauseBtnClass);
      //   this.$playBtn.classList.add(playBtnClass);
      Dom.removeClass(this.$playBtn,pauseBtnClass);
      Dom.addClass(this.$playBtn,playBtnClass);
  }

  /**
   * @description: 切换音频播放状态 开始 => 暂停 || 暂停 => 开始
   * @return {*} void
   */
  togglePlay(){
      if (!this.options.allowPlayControl) return;
      if (this.playing) {
          this.pause();
      }else{
          this.play();
      }
  }

  /**
   * @description: 更换音频链接，configOptions 的便携调用版
   * @param {string} url 音频链接
   * @return {Promise} promise
   */
  load(url:string){
      return this.configOptions({
          src:url
      });
  }

  /**
   * @description: 加载音频资源
   * @param {string} url 音频链接
   * @return {Promise} promise
   */
  loadSource(url:string){
      this.canplay = false;
      this.playing = false;
      this.$audio.setAttribute('src',url);
      this.addPauseStyle();
      return new Promise((resolve, reject) => {
          const warpFn = () => {
              this.canplay = true;
              resolve(null);
              this.$audio.removeEventListener('canplay',warpFn);
          };
          this.$audio.addEventListener('canplay',warpFn);
      });
  }

  /**
   * @description: 跳转到指定时间播放
   * @param {number} time 指定时间（秒）
   * @return {*} void
   */
  seek(time:number){
      if (time < 0) {
          time = 0;
      }
      if (time>this.duration) {
          time = this.duration;
      }
      this.$audio.currentTime = Math.floor(time);
  }

  on(event:string,fn:Function){
      this.addListener(event,fn,false);
  }

  once(event:string,fn:Function){
      this.addListener(event,fn,true);
  }

  off(event:string,fn?:Function){
      this.removeListener(event,fn);
  }

  getAllListener(){
      return this.getListener();
  }

  configOptions(ops){
      if (ops.src && ops.src !== this.options.src) {
          this.loadSource(ops.src);
      }
      if (ops.autoplay) {
          this.$audio.autoplay = ops.autoplay;
      }
      if (ops.loop) {
          this.$audio.loop = ops.loop;
      }
      if (ops.preload) {
          this.$audio.preload = ops.preload;
      }
      Object.keys(ops).forEach(key=>{
          if (this.options.hasOwnProperty(key)) {
              this.options[key] = ops[key];
          }
      });
  }

}

export default AudioPlayer;