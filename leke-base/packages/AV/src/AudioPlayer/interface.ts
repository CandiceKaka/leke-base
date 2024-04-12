/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-21 14:57:17
 * @LastEditTime: 2021-01-27 14:07:53
 */

export interface AudioPlayerOptions{
  el: HTMLElement,
  src:string,
  loop:boolean,
  autoplay:boolean,
  allowSeek:boolean,
  allowPlayControl:boolean,
  preload:'none' | 'metadata' | 'auto' | ''
  timeFormat?:(val:number)=>string
}

export interface AudioPlayerNativeEvent {
  onAudioProcess:(e:Event)=>void,
  onCanplay:(e:Event)=>void,
  onCanplayThrough:(e:Event)=>void,
  onDurationChange:(e:Event)=>void,
  onEmptied:(e:Event)=>void,
  onEnded:(e:Event)=>void,
  onError:(e:Event)=>void,
  onLoadedData:(e:Event)=>void,
  onLoadedMetaData:(e:Event)=>void,
  onPause:(e:Event)=>void,
  onPlay:(e:Event)=>void,
  onPlaying:(e:Event)=>void,
  onRateChange:(e:Event)=>void,
  onSeeked:(e:Event)=>void,
  onSeeking:(e:Event)=>void,
  onStalled:(e:Event)=>void,
  onSuspend:(e:Event)=>void,
  onTimeUpdate:(e:Event)=>void,
  onVolumeChange:(e:Event)=>void,
  onWaiting:(e:Event)=>void,
}