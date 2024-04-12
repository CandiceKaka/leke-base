export default class EventBase {
    events: {};
    constructor() {
        this.events = {};
    }
    getListener = (type) => {
        if (!this.events[type]) this.events[type] = [];
        return this.events[type];
    }
    on = (types, listener) => {
        if(Array.isArray(types)){
            types.forEach(type=>{
                this.getListener(type).push(listener);
            });
        }else{
            this.getListener(types).push(listener);
        }
    }
    off = (types, listener) => {
        if(Array.isArray(types)){
            types.forEach(type=>{
                this.getListener(type).filter(item => item !== listener);
            });
        }else{
            this.getListener(types).filter(item => item !== listener);
        }
    }
    trigger = (...args) => {
        const [type, ...params] = args;
        return this.getListener(type).map(fn => { return fn(...params); });
    }
}