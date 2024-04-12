export function userInfo(){
    // 设备判断
    if (typeof window !== 'undefined') {
        if (/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent)) {
            let w = window.screen.width;
            const _meta:any = document.getElementsByName('viewport')[0];
            if (_meta) {
                if (w >= 1200) {
                    _meta.content = 'width=device-width, maximum-scale=1.0, user-scalable=yes';
                } else {
                    _meta.content = 'width=1200,  maximum-scale=1.0, user-scalable=yes';
                }
                document.getElementsByTagName('head')[0].appendChild(_meta);
            }
            const _evt = 'orientationchange';
            window.addEventListener(_evt, function () {
                w = window.screen.width;
                if (w >= 1200) {
                    _meta.content = 'width=device-width, maximum-scale=1.0, user-scalable=yes';
                } else {
                    _meta.content = 'width=1200,  maximum-scale=1.0, user-scalable=yes';
                }
            }, false);
        }
    }
}

