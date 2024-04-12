/*
 * @Descripttion:
 * @Author: gulingxin
 * @Date: 2021-02-04 16:26:49
 * @LastEditTime: 2021-02-07 13:36:17
 */
import { RecordHtml, AudioHtml, NoData } from "./html";
import { timeFormat, blobToDataURI } from "./utils";

declare let MediaRecorder: any;
declare let window: any;

// 构造函数参数格式
interface IRecorderConfig {
  el: HTMLElement;
  duration?: number;
  recordConfig?:any;
}

class Recorder {
  private cfg: IRecorderConfig;
  private Recorder: any;
  private count: number = 0; //录音用时
  private duration: number = 300; //录音限时时长，默认5分钟
  private recorderBold: any; //录音二进制文件
  private time: any;
  private record: HTMLElement;
  private recordTime: HTMLElement;
  private recordContainer: HTMLElement;
  private audioInput: any;
  private context: any;
  private config: any;
  private size: number; //录音文件长度
  private buffer: any[]; //录音缓存
  private inputSampleRate: number; //输入采样率
  private inputSampleBits: number; //输入采样数位 8, 16
  private outputSampleRate: any; //输出采样率
  private oututSampleBits: number; //输出采样数位 8, 16
  public onStart: () => void; //开始录音回调
  public onStop: (bold: any) => void; //结束录音回调

  /**
   *
   * @param cfg
   */
  constructor(cfg: IRecorderConfig) {
      this.cfg = arguments.length ? cfg : null;
      this.duration = this.cfg && this.cfg.duration ? this.cfg.duration : 3000;
      this.init();
  }
  recorderList: [];
  private init() {
      require("./Recorder.less");
      this.initHtml();
      this.initEvent();
  }
  //初始化页面
  private initHtml() {
      const { el } = this.cfg;
      el.innerHTML = this.isHasMedia() ? RecordHtml : NoData;
      this.record = el.querySelector("#record");
      this.recordContainer = el.querySelector("#recordContainer");
      this.recordTime = el.querySelector(".record-time");
      if (this.isHasMedia()) {
          this.getUserMedia({ audio: true });
      }
  }
  private initEvent() {
      // 录制
      this.record &&
      this.record.addEventListener("click", () => {
          if (this.Recorder) {
              this.stopRecord();
              return;
          }
          this.startRecord();
      });
  }
  /**
   * 初始化录音实例
   * @param stream
   */
  private initRecorder(stream): void {
      //首先new一个AudioContext对象，作为声源的载体
      const audioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new audioContext();

      this.config = this.cfg.recordConfig || {};
      this.config.channelCount = 1;// 双声道
      this.config.numberOfInputChannels = this.config.channelCount;
      this.config.numberOfOutputChannels = this.config.channelCount;
      this.config.sampleBits = this.config.sampleBits || 16;
      this.config.sampleRate = this.config.sampleRate || 8000;
      this.config.bufferSize = 4096; //创建缓存，用来缓存声音
      //将声音输入这个对像，stream 就是上面返回音源-
      this.audioInput = this.context.createMediaStreamSource(stream); //将声音输入这个对像
      const volume = this.context.createGain(); //设置音量节点
      this.audioInput.connect(volume);

      // 创建声音的缓存节点，createScriptProcessor方法的第二个和第三个参数指的是输入和输出都是声道数
      this.Recorder = this.context.createScriptProcessor(
          this.config.bufferSize,
          this.config.channelCount,
          this.config.channelCount
      );
      this.size = 0; //录音文件长度
      this.buffer = []; //录音缓存
      this.inputSampleRate = this.context.sampleRate; //输入采样率
      this.inputSampleBits = 16; //输入采样数位 8, 16
      this.outputSampleRate = this.config.sampleRate; //输出采样率
      this.oututSampleBits = this.config.sampleBits; //输出采样数位 8, 16
      //音频采集  
      this.Recorder.onaudioprocess = (e) => {
          this.input(e.inputBuffer.getChannelData(0));
      };
      this.run();
  }
  input(data) {
      // 实时存储录音的数据
      this.buffer.push(new Float32Array(data)); //Float32Array
      this.size += data.length;
  }
  reshapeWavData(sampleBits, offset, iBytes, oData) {
      // 8位采样数位
      if (sampleBits === 8) {
          for (let i = 0; i < iBytes.length; i++, offset++) {
              const s = Math.max(-1, Math.min(1, iBytes[i]));
              let val = s < 0 ? s * 0x8000 : s * 0x7fff;
              val = 255 / (65535 / (val + 32768));
              oData.setInt8(offset, val, true);
          }
      } else {
          for (let i = 0; i < iBytes.length; i++, offset += 2) {
              const s = Math.max(-1, Math.min(1, iBytes[i]));
              oData.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
          }
      }
      return oData;
  }
  getRawData() {
      //合并压缩
      //合并
      const data = new Float32Array(this.size);
      let offset = 0;
      for (let i = 0; i < this.buffer.length; i++) {
          data.set(this.buffer[i], offset);
          offset += this.buffer[i].length;
      }
      // 压缩
      const getRawDataion = this.inputSampleRate / this.outputSampleRate;
      const length = data.length / getRawDataion;
      const result = new Float32Array(length);
      let index = 0,
          j = 0;
      while (index < length) {
          result[index] = data[j];
          j += getRawDataion;
          index++;
      }
      return result;
  }
  private covertWav() {
      // 转换成wav文件数据
      const sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
      const sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
      const bytes = this.getRawData();
      const dataLength = bytes.length * (sampleBits / 8);
      const buffer = new ArrayBuffer(44 + dataLength);
      let data = new DataView(buffer);
      let offset = 0;
      const writeString = function (str) {
          for (let i = 0; i < str.length; i++) {
              data.setUint8(offset + i, str.charCodeAt(i));
          }
      };
      // 资源交换文件标识符
      writeString("RIFF");
      offset += 4;
      // 下个地址开始到文件尾总字节数,即文件大小-8
      data.setUint32(offset, 36 + dataLength, true);
      offset += 4;
      // WAV文件标志
      writeString("WAVE");
      offset += 4;
      // 波形格式标志
      writeString("fmt ");
      offset += 4;
      // 过滤字节,一般为 0x10 = 16
      data.setUint32(offset, 16, true);
      offset += 4;
      // 格式类别 (PCM形式采样数据)
      data.setUint16(offset, 1, true);
      offset += 2;
      // 通道数
      data.setUint16(offset, this.config.channelCount, true);
      offset += 2;
      // 采样率,每秒样本数,表示每个通道的播放速度
      data.setUint32(offset, sampleRate, true);
      offset += 4;
      // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8
      data.setUint32(
          offset,
          this.config.channelCount * sampleRate * (sampleBits / 8),
          true
      );
      offset += 4;
      // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8
      data.setUint16(offset, this.config.channelCount * (sampleBits / 8), true);
      offset += 2;
      // 每样本数据位数
      data.setUint16(offset, sampleBits, true);
      offset += 2;
      // 数据标识符
      writeString("data");
      offset += 4;
      // 采样数据总数,即数据总大小-44
      data.setUint32(offset, dataLength, true);
      offset += 4;
      // 写入采样数据
      data = this.reshapeWavData(sampleBits, offset, bytes, data);
      return data;
  }
  private getFullWavData() {
      // 用blob生成文件
      const data = this.covertWav();
      return new Blob([data], { type: "audio/wav" });
  }
  //获取录音状态
  public getRecordState() {
      let state: string = this.Recorder.state;
      return state;
  }
  //开始录音
  public startRecord() {
      this.count = 0;
      this.onStart && this.onStart();
      if (this.Recorder) {
          this.run();
          return;
      }

      if (this.isHasMedia()) {
          this.getUserMedia({ audio: true }, true);
      } else {
          const { el } = this.cfg;
          el.innerHTML = NoData;
      }
  }
  //初始化录音样式
  private initStartRecorderHtml() {
      const { el } = this.cfg;
      const recordIng: HTMLElement = this.recordContainer.querySelector(
          ".record-recording"
      );
      recordIng.style.display = "block";
      this.recordTime.style.display = "block";
      this.recordTime.querySelector("#recordDuration").innerHTML = timeFormat(
          this.duration
      );
      this.recordTime.querySelector("#recordUsetime").innerHTML = timeFormat(
          this.count
      );
      //没有麦克风设备提示
      const recordError: HTMLElement = el.querySelector(".record-error");
      recordError.style.display = "none";
  }
  //获取录音权限
  private isHasMedia() {
      const n = <any>navigator;
      if (
          (n.mediaDevices && n.mediaDevices.getUserMedia) ||
      n.getUserMedia ||
      n.webkitGetUserMedia ||
      n.mozGetUserMedia
      ) {
          return true;
      }
      return false;
  }
  /**
   * 录音兼容处理
   * @param constrains
   * @param isInitRecorder
   */
  public getUserMedia(constrains, isInitRecorder?: boolean) {
      let that = this;
      const n = <any>navigator;
      if (n.mediaDevices.getUserMedia) {
          const getUserMedia = n.mediaDevices.getUserMedia(constrains);
          // 最新标准API、
          if (getUserMedia) {
              getUserMedia
                  .then((stream) => {
                      that.success(stream, isInitRecorder);
                  })
                  .catch((err) => {
                      that.error(err);
                  });
          } else {
              const { el } = this.cfg;
              el.innerHTML = NoData;
          }
      } else if (n.webkitGetUserMedia || n.mozGetUserMedia) {
      // webkit内核浏览器
          if (n.mediaDevices === undefined) {
              n.mediaDevices = {};
          }

          // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
          // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
          if (navigator.mediaDevices.getUserMedia === undefined) {
              navigator.mediaDevices.getUserMedia = function (constraints) {
                  // 首先，如果有getUserMedia的话，就获得它
                  const getUserMedia = n.webkitGetUserMedia || n.mozGetUserMedia;

                  // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
                  if (!getUserMedia) {
                      return Promise.reject(
                          new Error("getUserMedia is not implemented in this browser")
                      );
                  }

                  // 否则，为老的navigator.getUserMedia方法包裹一个Promise
                  return new Promise(function (resolve, reject) {
                      getUserMedia.call(navigator, constraints, resolve, reject);
                  });
              };
          }
          const getUserMedia = navigator.mediaDevices.getUserMedia(constrains);
          if (getUserMedia) {
              getUserMedia
                  .then((stream) => {
                      that.success(stream, isInitRecorder);
                  })
                  .catch((err) => {
                      that.error(err);
                  });
          } else {
              const { el } = this.cfg;
              el.innerHTML = NoData;
          }
      } else if ((navigator as any).getUserMedia) {
      // 旧版API
          const getUserMedia = n.getUserMedia(constrains);
          if (getUserMedia) {
              getUserMedia
                  .then((stream) => {
                      that.success(stream, isInitRecorder);
                  })
                  .catch((err) => {
                      that.error(err);
                  });
          } else {
              const { el } = this.cfg;
              el.innerHTML = NoData;
          }
      }
  }
  // 成功的回调函数
  private success(stream, isInitRecorder?: boolean) {
      if (isInitRecorder) {
          this.initStartRecorderHtml();
          this.initRecorder(stream);
      }
  }
  // 异常的回调函数
  private error(error) {
      console.log("访问用户媒体设备失败：", error.name, error.message);
      const { el } = this.cfg;
      const recordError: HTMLElement = el.querySelector(".record-error");
      recordError.style.display = "block";
      clearInterval(this.time);
      const recording: HTMLElement = this.recordContainer.querySelector(
          ".record-recording"
      );
      recording.style.display = "none";
      this.recordTime.style.display = "none";
  }

  //结束录音
  public stopRecord = async () => {
      clearInterval(this.time);
      this.stop();
      const boldFile = this.getFullWavData();
      const recording: HTMLElement = this.recordContainer.querySelector(
          ".record-recording"
      );
      recording.style.display = "none";
      // const req = await this.getRecorderAudio();
      this.onStop && this.onStop(boldFile);
      this.Recorder = null;
  };
  //获取音频
  public getRecorderAudio = (type?: string) => {
      return new Promise((resolve) =>
          setTimeout(async () => {
              if (!this.recorderBold) {
                  resolve("暂无音频文件，请先录音");
              }
              if (type === "base64") {
                  const res = await blobToDataURI(this.recorderBold);
                  resolve(res);
              }
              resolve(this.recorderBold);
          }, 0)
      );
  };
  private start() {
      this.audioInput.connect(this.Recorder);
      this.Recorder.connect(this.context.destination);
  }
  // 停止
  private stop() {
      this.Recorder.disconnect();
      this.context && this.context.close();
  }
  //录音计时
  private run(): void {
      this.start();
      clearInterval(this.time);
      this.initStartRecorderHtml();
      this.time = setInterval(() => {
          if (this.count >= this.duration) {
              this.stopRecord();
              clearInterval(this.time);
              return;
          }
          this.count++;

          this.recordTime.querySelector("#recordUsetime").innerHTML = timeFormat(
              this.count
          );
      }, 1000);
  }
}

export default Recorder;
