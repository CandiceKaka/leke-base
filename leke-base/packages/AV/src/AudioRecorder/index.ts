/*
 * @Descripttion:
 * @Author: gulingxin
 * @Date: 2021-02-04 16:31:05
 * @LastEditTime: 2021-02-07 16:59:31
 */
import http, {httpRequest} from "@leke/http";
import AudioPlayer from "../AudioPlayer";
import {AudioPlayerOptions} from "../AudioPlayer/interface";
import Recorder from "./Recorder";

const AudioHtml = `
<div class='leke-record-audio-wrap'>
    <div class='leke-record-audio-container'></div>
    <div id='reWrap' class='leke-record-reRecord'>重录</div>
</div>
`;
type Player = AudioPlayerOptions;

interface AudioUpload extends httpRequest {
    success?: (res: any) => void;
    error?: (res: any) => void;
}

interface IRecorderConfig {
    el: HTMLElement;
    duration?: number; //录音限时
    player?: Player; //音频组件
    audioPlayerVisible?: boolean; //是否展示音频
    onStart?: () => void; //开始录音回调
    onStop?: (e: any) => void; //结束录音回调
    onReRecorder?: () => void; //重录回调
}

class AudioRecorder {
    cfg: IRecorderConfig;
    duration?: number; //录音限时
    url?: number; //音频地址
    audio?: any;
    recorderAudio: BlobPart;
    uploadParams:AudioUpload;
    audioSrc: any;
    audioContainer: HTMLElement;
    recorder: any;
    isLoading: boolean = false;
    isSuccess: boolean = true;

    constructor(cfg) {
        this.cfg = arguments.length ? cfg : null;
        this.init();
    }

    init() {
        require("./index.less");
        if (this.cfg && this.cfg.player && Object.keys(this.cfg.player).length && this.cfg.player.src) {
            this.audioSrc = this.cfg.player.src;
            this.initAudio();
        } else {
            this.initRecorder(false);
        }
    }

    /*加载音频 */
    initAudio() {
        const {el} = this.cfg;
        const self = this;
        let audioProps = {};
        if(this.cfg.player && Object.keys(this.cfg.player).length){
            const {src, ...props} = this.cfg.player;
            audioProps = props;
        }
        if(this.audio){
            this.audio.load(this.audioSrc);
        } else {
            el.innerHTML = AudioHtml;
            this.audioContainer = el.querySelector(".leke-record-audio-container");
            const audio = new AudioPlayer({
                el: this.audioContainer,
                src: this.audioSrc,
                ...audioProps,
            });
            this.audio = audio;
        }
        this.audioContainer = el.querySelector(".leke-record-audio-container");
        if (this.isLoading) {
            let reRecorder = el.querySelector("#reWrap");
            reRecorder.className = "leke-record-loading";
            reRecorder.innerHTML =
                '<svg t="1612356175047" class="icon" viewBox="0 0 1024 1024" width="1em" height= "1em" fill="currentColor" ><defs><style type="text/css"></style></defs><path d="M62.2 613.5c1-0.2 1.9-0.4 2.9-0.6-0.9 0.2-1.9 0.4-2.9 0.6zM38.7 619.6c0.8-0.2 1.5-0.5 2.3-0.7-0.8 0.2-1.5 0.5-2.3 0.7zM84.6 609.8c1.1-0.1 2.2-0.3 3.3-0.4-1.1 0.1-2.2 0.2-3.3 0.4z" fill="#F5F5F5" p-id="6896"></path><path d="M291.1 231.2m-90 0a90 90 0 1 0 180 0 90 90 0 1 0-180 0Z" fill="#F5F5F5" p-id="6897"></path><path d="M164.7 499.3m-100 0a100 100 0 1 0 200 0 100 100 0 1 0-200 0Z" fill="#F5F5F5" p-id="6898"></path><path d="M325 793.6m-110 0a110 110 0 1 0 220 0 110 110 0 1 0-220 0Z" fill="#F5F5F5" p-id="6899"></path><path d="M565.1 143.2m-75 0a75 75 0 1 0 150 0 75 75 0 1 0-150 0Z" fill="#F5F5F5" p-id="6900"></path><path d="M824 283.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#F5F5F5" p-id="6901"></path><path d="M909.4 526m-50 0a50 50 0 1 0 100 0 50 50 0 1 0-100 0Z" fill="#F5F5F5" p-id="6902"></path><path d="M811.1 785.8m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z" fill="#F5F5F5" p-id="6903"></path><path d="M610.1 900.1m-30 0a30 30 0 1 0 60 0 30 30 0 1 0-60 0Z" fill="#F5F5F5" p-id="6904"></path></svg>';
            return;
        }
        if (!this.isSuccess) {
            let reRecorder = el.querySelector("#reWrap");
            reRecorder.className = "leke-record-reUpload";
            reRecorder.innerHTML =
                '上传失败，点击<span class="reUpload">重新上传</span>';
            const reUpload = reRecorder.querySelector(".reUpload");
            console.log('this.audio',this.audio);
            reUpload &&
            reUpload.addEventListener("click", function () {
                reRecorder.className = "leke-record-loading";
                reRecorder.innerHTML =
                    '<svg t="1612356175047" class="icon" viewBox="0 0 1024 1024" width="1em" height= "1em" fill="currentColor" ><defs><style type="text/css"></style></defs><path d="M62.2 613.5c1-0.2 1.9-0.4 2.9-0.6-0.9 0.2-1.9 0.4-2.9 0.6zM38.7 619.6c0.8-0.2 1.5-0.5 2.3-0.7-0.8 0.2-1.5 0.5-2.3 0.7zM84.6 609.8c1.1-0.1 2.2-0.3 3.3-0.4-1.1 0.1-2.2 0.2-3.3 0.4z" fill="#F5F5F5" p-id="6896"></path><path d="M291.1 231.2m-90 0a90 90 0 1 0 180 0 90 90 0 1 0-180 0Z" fill="#F5F5F5" p-id="6897"></path><path d="M164.7 499.3m-100 0a100 100 0 1 0 200 0 100 100 0 1 0-200 0Z" fill="#F5F5F5" p-id="6898"></path><path d="M325 793.6m-110 0a110 110 0 1 0 220 0 110 110 0 1 0-220 0Z" fill="#F5F5F5" p-id="6899"></path><path d="M565.1 143.2m-75 0a75 75 0 1 0 150 0 75 75 0 1 0-150 0Z" fill="#F5F5F5" p-id="6900"></path><path d="M824 283.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#F5F5F5" p-id="6901"></path><path d="M909.4 526m-50 0a50 50 0 1 0 100 0 50 50 0 1 0-100 0Z" fill="#F5F5F5" p-id="6902"></path><path d="M811.1 785.8m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z" fill="#F5F5F5" p-id="6903"></path><path d="M610.1 900.1m-30 0a30 30 0 1 0 60 0 30 30 0 1 0-60 0Z" fill="#F5F5F5" p-id="6904"></path></svg>';
                if(self.uploadParams){
                    self.recorderUpload(self.uploadParams);
                }
            });
            return;
        }
        let reRecorder = el.querySelector("#reWrap");
        reRecorder.className = "leke-record-reRecord";
        reRecorder.innerHTML = "重录";
        reRecorder.addEventListener("click", function () {
            const {el} = self.cfg;
            self.cfg.onReRecorder && self.cfg.onReRecorder();
            el.innerHTML = "";
            self.audio = null;
            self.initRecorder(true);
        });
    }

    /*初始化录音 */
    initRecorder(isPlay) {
        const self = this;
        this.recorder = new Recorder({
            el: this.cfg.el,
            duration: this.cfg.duration,
        });
        this.recorder.onStart = this.cfg.onStart;
        this.recorder.onStop = function (e) {
            self.handleStop(e);
        };
        if (isPlay) {
            this.recorder.startRecord();
        }
    }
    /**
     * 更新音频地址
     * */
    public updateAudioSrc(src){
        this.audioSrc = src;
        if(this.audio){
            this.audio.load(src);
        }
    }
    /*音频上传 */
    public recorderUpload(uploadParams) {
        const self = this;
        this.isLoading = true;
        this.uploadParams = uploadParams;
        self.initAudio();
        http({...uploadParams})
            .then((res) => {
                self.isLoading = false;
                self.isSuccess = true;
                self.initAudio();
                uploadParams.success && uploadParams.success(res);
            })
            .catch((error) => {
                self.isLoading = false;
                self.isSuccess = false;
                self.initAudio();
                uploadParams.error && uploadParams.error(error);
            });
    }

    /*暂停录音 */
    handleStop(event) {
        this.cfg.onStop && this.cfg.onStop(event);
        this.recorderAudio = event;
        this.audioSrc = window.URL.createObjectURL(
            new Blob([event], {type: "audio/wav"})
        );
        this.recorderAudio = event;
    }
}

export default AudioRecorder;
