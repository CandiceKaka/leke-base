import Component from '../component';
import { getTime } from '../../../tools/share';

class TimeControl extends Component {
    private current: any;
    private duration: any;

    constructor(el, video, event) {
        super(el, video, event);
        this.current = this.el.querySelector('.currentTime');
        this.duration = this.el.querySelector('.duration');
        this.init();
    }

    init() {
        this.subscription();
    }

    subscription() {
        this.event.on('start', () => {
            this.current.innerText = getTime(0);
        });
        this.event.on('timeupdate', () => {
            this.updateCurrent();
        });
        this.event.on('ended', () => {
            this.updateCurrent();
        });
        this.event.on('loadedmetadata', () => {
            this.update();
        });
        this.event.on('timeChange', (time) => {
            this.current.innerText = getTime(time);
        });
    }
    updateCurrent() {
        this.current.innerText = getTime(this.video.currentTime);
    }
    update() {
        this.current.innerText = getTime(this.video.currentTime);
        this.duration.innerText = getTime(this.video.duration);
    }

}

export default TimeControl;