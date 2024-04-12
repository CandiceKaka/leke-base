import React, {useImperativeHandle,createRef} from "react";
import { IVideoProps } from "./type";
import {VideoPlayer} from '@leke/AV';

class Video extends React.PureComponent<IVideoProps>{
    ref: React.RefObject<HTMLDivElement>;
    instance: any;
    constructor(props){
        super(props);
        this.ref=createRef();
        this.instance=null;
    }
    componentDidMount(){
        const {
            src,
            autoplay,
            width,
            height,
            loop,
            poster,
            paused,
            volume,
            fullscreen,
            resourceType,
            unsupportImgStyle={},
            onReady,
            onLoad,
            onStart,
            onEnded,
            onTimeChange,
            onTouchTimeChange,
            onPausedChange,
            onVolumeChange,
            onFullscreenChange
        }=this.props;

        this.instance=new VideoPlayer({
            el:this.ref.current,
            src,
            width,
            height,
            autoplay:paused?false:autoplay,
            loop,
            poster,
            muted:volume===0,
            resourceType,
            unsupportImgStyle,
            onReady,
            onLoad,
            onStart,
            onEnded,
            onTimeChange,
            onPausedChange:paused!==undefined?onPausedChange:null,
            onVolumeChange:volume!==undefined?onVolumeChange:null,
            onFullscreenChange:fullscreen!==undefined?onFullscreenChange:null
        });

        paused===undefined&&onPausedChange&&this.instance.on('click',(nextStatus)=>{
            onPausedChange(nextStatus);
        });

        volume===undefined&&onVolumeChange&&this.instance.on('volumeChange',(step)=>{
            onVolumeChange(step);
        });

        fullscreen===undefined&&onFullscreenChange&&this.instance.on('fullscreenChange',(nextStatus)=>{
            onFullscreenChange(nextStatus);
        });

        onPausedChange&&this.instance.on('ended',()=>{
            onPausedChange(true);
        });

        onTouchTimeChange&&this.instance.on('touchTimeChange',(step)=>{
            onTouchTimeChange(step/100*this.instance.duration);
        });
    }
    
    componentDidUpdate(prevProps){
        const {paused,volume,fullscreen}=this.props;
        if(prevProps.paused!==paused){
            paused?this.instance.pause():this.instance.play();
        }
        if(prevProps.volume!==volume){
            if(volume!==0)this.instance.trigger('preVolume',volume);
            this.instance.trigger('volumeChange',volume);
        }
        if(prevProps.fullscreen!==fullscreen){
            fullscreen?this.instance.entryFullscreen():this.instance.exitFullscreen();
        }
    }

    render(){
        const {wrapClassName}=this.props;
        return <div ref={this.ref} className={wrapClassName}></div>;
    }
}


export default React.forwardRef((props:IVideoProps,ref:any)=>{
    useImperativeHandle(ref, ()=>{
        return ref.current.instance;
    }, [ref]);
    return (<Video {...props} ref={ref}/>);
});
