/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-01-14 14:08:52
 * @LastEditTime: 2021-01-28 14:11:01
 */

export const str2dom =(str:string)=>{
    const $outer = document.createElement('div');
    $outer.innerHTML=str;
    return $outer.children;
};

export const formatTime =(duration:number,formatFn?:(duration:number)=>string)=>{
    if (formatFn) {
        return formatFn(duration);
    }
    if (duration===Infinity || !duration) {
        duration = 0;
    }
    const minutes =Math.floor(duration/60); 
    const seconds = Math.floor(duration%60);
    return minutes +'\''+(seconds<10?`0${seconds}`:seconds)+'"';
};


// Hack 解决谷歌下部分音频长度为 Infinity 的情况 
// https://stackoverflow.com/questions/21522036/html-audio-tag-duration-always-infinity
// export const getDuration = function (url, cb) {
//     let tempPlayer = new Audio(url);
//     tempPlayer.addEventListener("durationchange", function (e) {
//         if (this.duration!=Infinity) {
//             const duration = this.duration;
//             this.remove&&this.remove();
//             // this.pause()
//             cb(duration);
//         };
//     }, false);
//     tempPlayer.addEventListener("loadedmetadata", function (e) {
//         // IE11 需要在有数据情况下才能设置 currentTime
//         // 部分手机浏览器单独设置 volume 无效，会在后台播放，同时设置 volume 和 muted
//         this.volume = 0;
//         this.muted = true;
//         this.currentTime = 24*60*60; //fake big time
//         // 兼容FF
//         // 兼容IE11 下 play 返回 void
//         const promise = this.play();
//         if (promise) {
//             promise.catch(()=>{});
//         }
//     }, false);
//     tempPlayer.load();
// };

// Hack 解决谷歌下部分音频长度为 Infinity 的情况 
// https://stackoverflow.com/questions/21522036/html-audio-tag-duration-always-infinity
export const getDuration =  (url) => new Promise<number>((resolve, reject) => {
    let tempPlayer = new Audio(url);
    tempPlayer.addEventListener("durationchange", function (e) {
        if (this.duration!=Infinity) {
            const duration = this.duration;
            this.remove&&this.remove();
            // this.pause()
            resolve(duration);
        };
    }, false);
    tempPlayer.addEventListener("loadedmetadata", function (e) {
        // IE11 需要在有数据情况下才能设置 currentTime
        // 部分手机浏览器单独设置 volume 无效，会在后台播放，同时设置 volume 和 muted
        this.volume = 0;
        this.muted = true;
        this.currentTime = 24*60*60; //fake big time
        // 兼容FF
        // 兼容IE11 下 play 返回 void
        const promise = this.play();
        if (promise) {
            promise.catch(()=>{});
        }
    }, false);
    tempPlayer.addEventListener("error", function (e) {
        reject(e);
    }, false);
    tempPlayer.load();
});

