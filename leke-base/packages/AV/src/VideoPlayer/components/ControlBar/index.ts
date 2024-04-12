import Component from '../component';
import PlayerControl from '../PlayControl';
import TimerControl from '../TimeControl';
import ProcessControl from '../ProcessControl';
import VolumeControl from '../VolumeControl';
import FullControl from '../FullControl';
import * as Dom from '../../../tools/dom';

class Control extends Component {
    private play:any;
    private time:any;
    private progress:any;
    private volume:any;
    private fullscreen:any;

    constructor(el,video,event){
        super(el,video,event);
        this.play=this.el.querySelector('.video-play-wrap');
        this.time=this.el.querySelector('.video-time-wrap');
        this.progress=this.el.querySelector('.video-progress-wrap');
        this.volume=this.el.querySelector('.video-volume-wrap');
        this.fullscreen=this.el.querySelector('.video-fullscreen-container');
        this.init();
    }
    
    init() {
        new PlayerControl(this.play,this.video,this.event);
        new TimerControl(this.time,this.video,this.event);
        new ProcessControl(this.progress,this.video,this.event);
        new VolumeControl(this.volume,this.video,this.event);
        new FullControl(this.fullscreen,this.video,this.event);
        this.subscription();
    }

    subscription() {
        this.event.on('play', () => {
            this.el.style.opacity = '';
        });
        this.event.on('pause', () => {
            this.el.style.opacity = 1;
        });
        this.event.on('entryFullscreen', () => {
            Dom.addClass(this.el, 'full-video-control-bar');
        });
        this.event.on('exitFullscreen', () => {
            Dom.removeClass(this.el, 'full-video-control-bar');
        });
    }
}

export default Control;