import Component from '../component';
import { addFullscreenListener,removeFullscreenListener } from '../../../tools/share';

class FullControl extends Component {
    private icon: any;
    private isFullscreen: boolean; 
    private proxyFullscreenChange: (boolean)=>void;

    constructor(el,video,event){
        super(el,video,event);
        this.icon=this.el.querySelector('.video-icon');
        this.init();
    }

    init() {
        this.subscription();
    }
    
    subscription() {
        this.event.on('proxyFullscreenChange', (fn) => {
            this.proxyFullscreenChange=fn;
        });
        this.el.addEventListener('click', () => {
            if(!this.proxyFullscreenChange){
                this.isFullscreen?this.event.trigger('exitFullscreen'):this.event.trigger('entryFullscreen');
            }else{
                this.proxyFullscreenChange(!this.isFullscreen);
            }
        });
        this.event.on('entryFullscreen', () => {
            this.isFullscreen = true;
            this.icon.className = 'video-icon icon_tuichuquanping';
        });
        this.event.on('exitFullscreen', () => {
            this.isFullscreen = false;
            this.icon.className = 'video-icon icon_quanping';
        });

        // 监听退出
        const fullListener = () => {
            const doc=document as any;
            if (
                !doc.webkitIsFullScreen &&
                !doc.mozFullScreen &&
                !doc.msFullscreenElement
            ) {
                if(!this.proxyFullscreenChange){
                    this.event.trigger('exitFullscreen');
                }else{
                    this.proxyFullscreenChange(false);
                }
            }
        };
        addFullscreenListener(fullListener);
        this.event.on('destroy', () => {
            removeFullscreenListener(fullListener);
        });
    }

}

export default FullControl;