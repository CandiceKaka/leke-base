import Component from '../component';

class PlayerControl extends Component {
    private proxyPausedChange:(boolean)=>void

    constructor(el,video,event){
        super(el,video,event);
        this.init();
    }

    init() {
        this.subscription();
    }
    subscription() {
        this.event.on('proxyPausedChange', (fn) => {
            this.proxyPausedChange=fn;
        });
        this.el.addEventListener('click', () => {
            this.event.trigger('click',!this.video.paused);
        });
        this.event.on('play', () => {
            this.update();
        });
        this.event.on('pause', () => {
            this.update();
        });
    }
    update() {
        this.el.querySelector('i').className = `video-icon ${this.video.paused ? 'icon_weikebofang' : 'icon_weikezanting'}`;
    }

}

export default PlayerControl;