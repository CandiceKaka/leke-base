/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-13 14:14:07
 * @LastEditTime: 2021-01-15 11:29:07
 */

export default class EventEmitter {
  private _events={}
  
  /**
   * @description: 注册事件函数
   * @param {String} event 需要注册的事件名称
   * @param {Function} fn 事件回调函数
   * @param {Boolean} isOnce 是否只执行一次
   * @return {EventEmitter} eventEmitter 实例对象
   */
  addListener(event:string,fn:Function,isOnce:boolean = false){
      if(!(fn instanceof Function)){
          throw new Error('event callback must be a function');
      }
      let eventCallbackArr = this._events[event] || [];
      let wrapFn = fn;
      if(isOnce){
          wrapFn = (...args) => {
              fn.apply(this,args);
              this.removeListener(event,wrapFn);
          };
      }
      eventCallbackArr.push(wrapFn);
      this._events[event] = eventCallbackArr;
      return this;
  }

  /**
   * @description: 取消注册事件函数
   * @param {string} event 需要需取消的事件名称
   * @param {Function} fn 需要需取消的函数回调，空则清除所有
   * @return {EventEmitter} eventEmitter 实例对象
   */
  removeListener(event:string,fn?:Function){
      const eventCallbackArr = this._events[event];
      if (fn) {
          this._events[event] = eventCallbackArr && eventCallbackArr.filter(i => i !== fn);
      }else{
          this._events[event]=[];
      }
      return this;
  }

  /**
   * @description: 事件触发
   * @param {string} event 需要触发的事件名称
   * @param {argument} args 触发参数
   * @return {EventEmitter} eventEmitter 实例对象
   */
  emit(event:string,...args){
      const eventCallbackArr = this._events[event] || [];
      eventCallbackArr.forEach(fn => fn.apply(this,args));
      return this;
  }

  /**
   * @description: 获取所有监听的事件
   */
  getListener(){
      return this._events;
  }
}
