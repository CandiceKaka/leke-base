/*
 * @Descripttion:
 * @Author: gulingxin
 * @Date: 2021-02-04 16:34:16
 * @LastEditTime: 2021-02-08 14:42:34
 */
import * as React from "react";
import {AudioRecorder as Recorder} from "@leke/AV";
import {AudioPlayerProps} from "../AudioPlayer";
import {httpRequest} from "@leke/http";

type Player = AudioPlayerProps;

interface AudioUpload extends httpRequest {
    success?: (res: any) => void;
    error?: (res: any) => void;
}

interface IProps {
    duration?: number; //录音限时
    audioPlayerVisible?: boolean; //是否展示音频
    player?: Player; //音频组件
    uploadParams?: AudioUpload; //音频上传
    onStart?: () => void; //开始录音回调
    onStop?: (e: any) => void; //结束录音回调
    onReRecorder?: () => void; //重录回调
}

interface IState {}

class AudioRecorder extends React.Component<IProps, IState> {
    recorderRef: React.RefObject<HTMLDivElement>;
    recorder = null;
    constructor(props) {
        super(props);
        this.recorderRef = React.createRef();
    }
    //初始化recorder
    startRecord = () => {
        if (this.recorderRef.current) {
            this.recorder = new Recorder({
                el: this.recorderRef.current,
                ...this.props
            });
            this.recorder.onStart = this.props.onStart;
            this.recorder.onStop = (e) => this.handleStop(e);
        }
    };

    componentDidMount() {
        this.startRecord();
    }
    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if(this.props.uploadParams && this.props.uploadParams.data && !this.isObjectValueEqual(prevProps.uploadParams,this.props.uploadParams)){
            this.recorder.recorderUpload(this.props.uploadParams);
        }
    }
    /**
     * 判断两个对象是否相等
     */
    isObjectValueEqual(a, b) {
        // 取对象a和b的属性名
        let aProps = Object.getOwnPropertyNames(a);
        let bProps = Object.getOwnPropertyNames(b);
        // 判断属性名的length是否一致
        if (aProps.length != bProps.length) {
            return false;
        }
        let flag = true;
        // 循环取出属性名，再判断属性值是否一致
        aProps.forEach((propName,index)=>{
            if(typeof a[propName] === "function"){
                return;
            }
            if (a[propName] !== b[propName]) {
                flag = false;
            }
        });
        return flag;
    }
    handleStop(e){
        this.props.onStop && this.props.onStop(e);
    }

    public render() {
        return <div ref={this.recorderRef}></div>;
    }
}

export default AudioRecorder;
