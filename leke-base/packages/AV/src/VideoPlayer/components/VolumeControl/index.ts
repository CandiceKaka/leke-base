import Component from '../component';
import Slider from '../Slider';

class VolumeControl extends Component {
    private container:any;
    private iconWrap:any;
    private icon:any;
    private volumeNum:any;
    private sliderContainer:any;
    private slider:any;
    private preVolume:number;
    private isDrag:boolean;
    private proxyVolumeChange:(number,boolean?)=>void;

    constructor(el,video,event){
        super(el,video,event);
        this.container = this.el.querySelector('.video-volume-container');
        this.iconWrap = this.el.querySelector('.volume-icon');
        this.icon = this.iconWrap.querySelector('.video-icon');
        this.volumeNum = this.el.querySelector('.volume-num');
        this.sliderContainer = this.el.querySelector('.volume-slider-container');
        this.slider = this.getSlider();
        this.init();
    }

    init() {
        this.preVolume = this.video.volume*100;
        this.subscription();
    }

    getSlider() {
        return new Slider(this.sliderContainer, {
            vertical: true,
            defaultValue: this.video.volume * 100,
            onMouseDown: () => {
                this.event.trigger('volumeDragStart');
            },
            onTouchMove: (step) => {
                if(this.proxyVolumeChange){
                    this.proxyVolumeChange(parseInt(step));
                }else{
                    this.event.trigger('volumeChange', parseInt(step));
                }
            },
            onTouchEnd: (step) => {
                if(this.proxyVolumeChange&&this.preVolume!==parseInt(step)){
                    // 并未修改外部传入的volume
                    this.event.trigger('volumeChange', this.preVolume);
                }else{
                    this.preVolume=parseInt(step);
                }
                this.event.trigger('volumeDragEnd');
            }
        });
    }

    subscription() {
        this.event.on('proxyVolumeChange',(fn)=>{
            this.proxyVolumeChange=fn;
        });
        this.iconWrap.addEventListener('click', () => {
            const step=!this.video.volume?this.preVolume:0;
            if(this.proxyVolumeChange){
                this.proxyVolumeChange(step,true);
            }else{
                this.event.trigger('volumeChange', step);
            }
        });
        this.event.on('volumeChange', (step) => {
            this.volumeNum.innerText = step;
            this.video.volume = step / 100;
            this.updateSlider(step);
            if (Number(step) === 0) {
                this.video.muted = true;
                this.icon.className = 'video-icon icon_jingyin';
            } else {
                this.video.muted = false;
                this.icon.className = 'video-icon icon_shengyin';
            }
        });
        this.event.on('volumeDragStart', () => {
            this.isDrag=true;
            this.container.style.display = 'flex';
        });
        this.event.on('volumeDragEnd', () => {
            setTimeout(()=>{this.isDrag=false;});
            this.container.style.display = '';
        });
        this.event.on('preVolume', (volume) => {
            this.preVolume=volume;
        });
        this.sliderContainer.addEventListener('click', (e) => {
            if(this.isDrag)return;
            const height = this.slider.rail.clientHeight;
            const scaleY = this.slider.rail.getBoundingClientRect().bottom - e.clientY;
            let step;
            if (scaleY / height > 1) {
                step = 100;
            } else if (scaleY / height < 0) {
                step = 0;
            } else {
                step = (scaleY / height * 100).toFixed(0);
            }
            if(this.proxyVolumeChange){
                this.proxyVolumeChange(parseInt(step));
            }else{
                this.event.trigger('volumeChange',parseInt(step));
                this.preVolume=parseInt(step);
            }
        });
    }
    updateSlider(step) {
        this.slider.track.style.height = `${step}%`;
        this.slider.step.style.height = `${step}%`;
        this.slider.handle.style.bottom = `${step}%`;
    }

}

export default VolumeControl;