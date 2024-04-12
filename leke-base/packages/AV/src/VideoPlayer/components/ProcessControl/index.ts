import Component from '../component';
import Slider from '../Slider';
import { getTime } from '../../../tools/share';

class ProcessControl extends Component {
    private tooltip: any;
    private slider: any;
    private isDrag: boolean;

    constructor(el, video, event) {
        super(el, video, event);
        this.tooltip = this.el.querySelector('.video-tooltip');
        this.slider = this.getSlider();
        this.init();
    }

    init() {
        this.subscription();
    }

    getSlider(){
        return new Slider(this.el, {
            onMouseDown: () => {
                this.event.trigger('processDragStart');
            },
            onTouchEnd: (step) => {
                this.event.trigger('processDragEnd');
                this.event.trigger('touchTimeChange', step);
                return true;
            }
        });
    }

    subscription() {
        this.event.on('timeupdate', () => {
            this.update();
        });
        this.event.on('ended', () => {
            this.update();
        });
        this.event.on('start', () => {
            this.updateSlider(0);
        });
        this.event.on('processDragStart', () => {
            this.isDrag = true;
            this.slider.track.style.display = 'none';
            this.slider.step.style.display = 'block';
        });
        this.event.on('processDragEnd', () => {
            this.isDrag = false;
            this.slider.track.style.display = 'block';
            this.slider.step.style.display = 'none';
        });
        this.event.on('timeChange', (time) => {
            const step=time/this.video.duration*100;
            this.updateSlider(step);
            this.video.currentTime = time;
        });
        this.event.on('touchTimeChange',(step)=>{
            const time=step/100*this.video.duration;
            this.event.trigger('timeChange',time);
        });
        // 点击进度条进度跳转
        this.el.addEventListener('click', (e) => {
            const scaleX = e.clientX - this.slider.rail.getBoundingClientRect().left;
            const width = this.slider.rail.clientWidth;
            if (scaleX / width > 1) return;
            const step = (scaleX / width * 100).toFixed(2);
            this.event.trigger('touchTimeChange', step);
        });

        // tooltip  mouseEnter mouseMove mouseLeave监听
        const mouseMove = e => {
            const scaleX = e.clientX - this.el.getBoundingClientRect().left;
            const width = this.el.clientWidth;
            if (scaleX / width <= 1 && scaleX / width >= 0) {
                if (this.tooltip.style.display !== `block`)
                    this.tooltip.style.display = `block`;
                this.tooltip.style.left = `${scaleX}px`;
                this.tooltip.querySelector('span').innerText = getTime((scaleX / width) * this.video.duration);
            } else {
                if (this.tooltip.style.display !== `none`) {
                    this.tooltip.style.display = `none`;
                }
            }
        };
        this.el.addEventListener('mouseenter', () => {
            if (this.tooltip.style.display !== 'block') {
                this.tooltip.style.display = 'block';
            }
            this.el.addEventListener('mousemove', mouseMove);
        });
        this.el.addEventListener('mouseleave', () => {
            if (this.tooltip.style.display !== 'none') {
                this.tooltip.style.display = 'none';
            }
            this.el.removeEventListener('mousemove', mouseMove);
        });
    }

    update() {
        const { buffered, duration, currentTime } = this.video;
        if (buffered.length) {
            this.slider.buffer.style.width = `${(buffered.end(buffered.length - 1) / duration) * 100}%`;
        }
        if (this.isDrag === true) return;
        const step = (currentTime / duration * 100).toFixed(2);
        this.updateSlider(step);
    }

    updateSlider(step) {
        this.slider.track.style.width = `${step}%`;
        this.slider.step.style.width = `${step}%`;
        this.slider.handle.style.left = `${step}%`;
    }

}

export default ProcessControl;