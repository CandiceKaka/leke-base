const initOptions = {
    vertical: false,
    defaultValue: 0,
    onMouseDown: function () { },
    onTouchMove: function () { },
    onTouchEnd: function () { },
};
class Slider {
    el: any;
    options: any;
    container: any;
    rail: any;
    buffer: any;
    track: any;
    step: any;
    scale: any;
    prevStep: any;
    handle: any;
    isDrag: boolean;
    onMouseDown: ()=>void;
    onTouchMove?: (step:number)=>void;
    onTouchEnd: (step:number)=>boolean;
    constructor(el, options) {
        this.el = el;
        this.options = {
            ...initOptions,
            ...options
        };
        this.rail = this.el.querySelector('.slider-rail');
        this.buffer = this.el.querySelector('.buffer-rail');
        this.track = this.el.querySelector('.slider-track');
        this.step = this.el.querySelector('.slider-step');
        this.scale = this.el.querySelector('.scale-rail');
        this.handle = this.el.querySelector('.slider-handle');
        this.onMouseDown = this.options.onMouseDown;
        this.onTouchMove = this.options.onTouchMove;
        this.onTouchEnd = this.options.onTouchEnd;
        this.isDrag = false;
        this.init();
    }
    init() {
        if (this.options.defaultValue) {
            if(this.options.vertical){
                this.track.style.height = `${this.options.defaultValue}%`;
                this.step.style.height = `${this.options.defaultValue}%`;
                this.handle.style.bottom = `${this.options.defaultValue}%`;
            }else{
                this.track.style.width = `${this.options.defaultValue}%`;
                this.step.style.width = `${this.options.defaultValue}%`;
                this.handle.style.left = `${this.options.defaultValue}%`;
            }
        }
        this.subscription();
    }

    subscription() {
        const touchMove = e => {
            if (this.options.vertical) {
                const height = this.rail.clientHeight;
                const scaleY = this.rail.getBoundingClientRect().bottom - e.clientY;
                let step;
                if (scaleY > 0) {
                    if (scaleY <= height) {
                        step = (scaleY / height * 100).toFixed(2);
                    } else {
                        step = 100;
                    }
                } else {
                    step = 0;
                }
                this.step.style.height = `${step}%`;
                this.handle.style.bottom = `${step}%`;
                this.onTouchMove(step);
            } else {
                const scaleX = e.clientX - this.rail.getBoundingClientRect().left;
                const width = this.rail.clientWidth;
                let step;
                if (scaleX > 0) {
                    if (scaleX <= width) {
                        step = (scaleX / width * 100).toFixed(2);
                    } else {
                        step = 100;
                    }
                } else {
                    step = 0;
                }
                this.step.style.width = `${step}%`;
                this.handle.style.left = `${step}%`;
                this.onTouchMove(step);
            }
            return false;
        };
        const touchEnd = () => {
            this.isDrag = false;
            let step;
            if (this.options.vertical) {
                const scaleY = this.step.clientHeight;
                const height = this.rail.clientHeight;
                step = (scaleY / height * 100).toFixed(2);
                this.track.style.height = `${step}%`;
                this.step.style.height = `${step}%`;
            } else {
                const scaleX = this.step.clientWidth;
                const width = this.rail.clientWidth;
                step = (scaleX / width * 100).toFixed(0);
                this.track.style.width = `${step}%`;
                this.step.style.width = `${step}%`;
            }
            this.onTouchEnd(step);
            // const result=this.onTouchEnd(step);
            // if(!result){
            //     if(this.options.vertical){
            //         this.track.style.height = `${this.prevStep}%`;
            //         this.step.style.height = `${this.prevStep}%`;
            //         this.handle.style.bottom = `${this.prevStep}%`;
            //     }else{
            //         this.track.style.width = `${this.prevStep}%`;
            //         this.step.style.width = `${this.prevStep}%`;
            //         this.handle.style.left = `${this.prevStep}%`;
            //     }
            // }else{
            //     this.prevStep=step;
            // }
            this.step.style.display = 'none';
            this.track.style.display = 'block';
            document.removeEventListener('mousemove', touchMove);
            document.removeEventListener('mouseup', touchEnd);
            return false;
        };
        this.handle.addEventListener('mousedown', () => {
            this.isDrag = true;
            this.step.style.display = 'block';
            this.track.style.display = 'none';
            this.onMouseDown();
            document.addEventListener('mousemove', touchMove);
            document.addEventListener('mouseup', touchEnd);
            return false;
        });
    }
}

export default Slider;