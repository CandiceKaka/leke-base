export const addMouseWheel = (ele: Element,cb: EventListenerOrEventListenerObject) => {
    ele.addEventListener('mousewheel',cb);
    ele.addEventListener('DOMMouseScroll', cb);
};

export const removeMouseWheel = (ele,cb) => {
    ele.removeEventListener('mousewheel',cb);
    ele.removeEventListener('DOMMouseScroll', cb);
};

/**返回根据tab方向的字段配置 */
export const returnTabPositionAttribute = (tabPosition) => {
    switch (tabPosition) {
    case 'top':
        return {
            length: 'offsetWidth', // 该方向计算长度属性
            start: 'offsetLeft', // 该方向计算起始位置属性
            tabBarGutterStyle: (gutter) => (gutter || gutter === 0 ? { marginLeft: gutter + 'px'  } : {}),// 该方向tab间距控制
            barStyle: (length, postion) => ({ left: postion + length / 2 - 14 }), // 该方向滑动bar控制
            scroll: 'scrollWidth', // 该方向滚动计算属性
            transform: (scrollLength) => `translateX(${scrollLength}px)` // 该方向tab头滚动样式
        };
    case 'bottom':
        return {
            length: 'offsetWidth',
            start: 'offsetLeft',
            tabBarGutterStyle: (gutter) => (gutter || gutter === 0 ? { marginLeft: gutter + 'px'  } : {}),
            barStyle: (length, postion) => ({ left: postion + length / 2 - 14 }),
            scroll: 'scrollWidth',
            transform: (scrollLength) => `translateX(${scrollLength}px)`
        };
    case 'left':
        return {
            length: 'offsetHeight',
            start: 'offsetTop',
            tabBarGutterStyle: (gutter) => (gutter || gutter === 0 ? { marginTop: gutter + 'px'  } : {}),
            barStyle: (length, postion) => ({ top: postion + length / 2 - 14 }),
            scroll: 'scrollHeight',
            transform: (scrollLength) => `translateY(${scrollLength}px)`
        };
    case 'right':
        return {
            length: 'offsetHeight',
            start: 'offsetTop',
            tabBarGutterStyle: (gutter) => (gutter || gutter === 0 ? { marginTop: gutter + 'px'  } : {}),
            barStyle: (length, postion) => ({ top: postion + length / 2 - 14 }),
            scroll: 'scrollHeight',
            transform: (scrollLength) => `translateY(${scrollLength}px)`
        };
    default:
        return {
            length: 'offsetWidth',
            start: 'offsetLeft',
            tabBarGutterStyle: (gutter) => (gutter || gutter === 0 ? { marginLeft: gutter + 'px'  } : {}),
            barStyle: (length, postion) => ({ left: postion + length / 2 - 14 }),
            scroll: 'scrollWidth',
            transform: (scrollLength) => `translateX(${scrollLength}px)`
        };
    }
};