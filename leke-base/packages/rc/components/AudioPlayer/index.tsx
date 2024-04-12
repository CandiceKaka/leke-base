/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-19 14:57:47
 * @LastEditTime: 2021-02-04 17:22:34
 */
import React from 'react';

import {AudioPlayer as AudioPlayerCls,AudioPlayerNativeEvent} from '@leke/AV';

const noop = ()=>{};
export interface AudioPlayerProps extends Partial<AudioPlayerNativeEvent> {
    // forwardedRef?:React.RefObject<AudioPlayerCls | null>
    className?:string,
    style?:object,
    src?:string,
    paused?:boolean,
    autoplay?:boolean,
    loop?:boolean,
    allowSeek?:boolean,
    preload?:'none' | 'metadata' | 'auto' | '',
    timeFormat?:(num:number)=>string
}

const AudioPlayerFC = (props:AudioPlayerProps,ref) => {
    const {className,style,src='',autoplay=false,paused,loop=false,preload='metadata',allowSeek=true,timeFormat,...eventProps} = props;
    const audioRef = React.useRef<AudioPlayerCls>(null);
    const $audioContainer = React.useRef<HTMLDivElement>(null);
    const init = React.useCallback(
        () => {
            const audioPlayer = new AudioPlayerCls({
                el:$audioContainer.current,
                src:src,
                autoplay:autoplay,
                loop:loop,
                preload:preload,
                timeFormat:timeFormat,
                allowSeek,
                allowPlayControl:!(paused!==null && paused!==undefined),
            });
            Object.keys(eventProps).forEach((key)=>{
                if(/^on/.test(key)){
                    const eventName=key.replace(/^on([A-Z])/,($0,$1)=>{
                        return $1.toLowerCase();
                    });
                    audioPlayer.on(eventName,eventProps[key] || noop);
                }
            });
            if (ref) {
                ref.current = audioPlayer;
            }
            audioRef.current = audioPlayer;
    
        },[allowSeek, autoplay, eventProps, loop, paused, preload, ref, src, timeFormat]
    ); 
    React.useEffect(()=>{
        if (audioRef.current) {
            audioRef.current.configOptions({
                src,autoplay,loop,preload,allowSeek
            });
        }else{
            init();
        }
    },[src,autoplay,loop,preload,allowSeek,init]);
    
    React.useEffect(()=>{
        if (paused!==null && paused!==undefined) {
            if (audioRef.current) {
                paused?audioRef.current.pause():audioRef.current.play();
            }
        }
    },[paused]);


    return (
        <div ref={$audioContainer} className={className} style={style}/>
    );
};

// export default React.forwardRef(AudioPlayer);
class AudioPlayer extends React.Component<AudioPlayerProps> {
    $audioContainer:React.RefObject<HTMLDivElement>
    audioRef:React.RefObject<AudioPlayerCls>
    audioPlayer:AudioPlayerCls
    static defaultProps = {
        className:"",
        src:'',
        autoplay:false,
        loop:false,
        preload:'metadata',
        allowSeek:true,
    }
    
    constructor(props){
        super(props);
        this.$audioContainer = React.createRef();
        this.audioRef = React.createRef();
    }
    componentDidMount(){
        this.init();
    }
    componentDidUpdate(preProps){
        const keys = ['src','autoplay','loop','preload','allowSeek'];
        const changedObj = {};
        keys.forEach(key=>{
            if (preProps[key]!==this.props[key]) {
                changedObj[key] = this.props[key];
            }
        });
        if (Object.keys(changedObj).length) {
            this.audioPlayer.configOptions(changedObj);
        }

        if (this.props.paused!==null && this.props.paused!==undefined) {
            this.props.paused?
                this.audioPlayer.pause()
                :this.audioPlayer.play();
        }
    }
    init(){
        const {
            className,
            style,
            src,
            autoplay,
            paused,
            loop,
            preload,
            allowSeek,
            timeFormat,
            // forwardedRef,
            ...eventProps
        } = this.props;
        const audioPlayer = new AudioPlayerCls({
            el:this.$audioContainer.current,
            src:src,
            autoplay:autoplay,
            loop:loop,
            preload:preload,
            timeFormat:timeFormat,
            allowSeek,
            allowPlayControl:!(paused!==null && paused!==undefined),
        });
        Object.keys(eventProps).forEach((key)=>{
            if(/^on/.test(key)){
                const eventName=key.replace(/^on([A-Z])/,($0,$1)=>{
                    return $1.toLowerCase();
                });
                audioPlayer.on(eventName,eventProps[key] || noop);
            }
        });
        // if (forwardedRef) {
        //     forwardedRef.current = audioPlayer;
        // }
        this.audioPlayer = audioPlayer;
    }
    render() {
        const {className,style} = this.props;
        return (
            <div ref={this.$audioContainer} className={className} style={style}/>
        );
    }
}

export default React.forwardRef((props:AudioPlayerProps,ref:React.RefObject<AudioPlayerCls>)=>{
    const audioPlayerRef = React.useRef(null);
    React.useImperativeHandle(
        ref,
        () => audioPlayerRef.current.audioPlayer,
    );
    return (<AudioPlayer {...props} ref={audioPlayerRef}/>);
});
