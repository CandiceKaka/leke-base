---
title: 日历组件
description: 日历组件日历组件日历组件日历组件
---

```jsx
import React, { useState, useRef } from 'react';
import { Calendar } from '@leke/mobile';
import { Down } from '@leke/icons';

const extra = {
    '2017/07/15': { info: 'Disable', disable: true },
};

const now = new Date();
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: '自定义', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: '自定义', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: '自定义', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: '自定义', disable: true };

Object.keys(extra).forEach((key) => {
    const info = extra[key];
    const date = new Date(key);
    if (!Number.isNaN(+date) && !extra[+date]) {
        extra[+date] = info;
    }
});

export default function() {
    const [{ show,config,startTime,endTime }, setState] = useState({
        show: false,
        config: {},
        startTime: null,
        endTime: null
    });
    const originbodyScrollY = useRef(document.getElementsByTagName('body')[0].style.overflowY);

    const renderBtn = (text, config = {}) => {
        return (
            <button className="leke-mobile-calendar-btn"
                onClick={() => {
                    document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
                    setState({
                        show: true,
                        config,
                    });
                }}
            >
                <span>{text}</span>
                <div><Down /></div>
            </button>
        );
    };

    const onSelectHasDisableDate = (dates) => {
        console.warn('onSelectHasDisableDate', dates);
    };

    const onConfirm = (startTime, endTime) => {
        document.getElementsByTagName('body')[0].style.overflowY = originbodyScrollY.current;
        setState({
            show: false,
            startTime,
            endTime,
        });
    };

    const onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = originbodyScrollY.current;
        setState({
            show: false,
            startTime: undefined,
            endTime: undefined,
        });
    };

    const getDateExtra = date => extra[+date];

    return (
        <div>
            {renderBtn('选择日期区间')}
            {renderBtn('选择日期', { type: 'one' })}
            {renderBtn('选择日期区间(快捷)', { showShortcut: true })}
            {renderBtn('不无限滚动', { infinite: false })}
            {renderBtn('水平进入', { enterDirection: 'horizontal' })}
            {renderBtn('默认选择范围', { defaultValue: [new Date(+now - 86400000), new Date(+now - 345600000)] })}
            {renderBtn('onSelect API', {
                onSelect: (date, state) => {
                    console.log('onSelect', date, state);
                    return [date, new Date(+now - 604800000)];
                },
            })}
            {
                startTime && <button>Time1: {startTime.toLocaleString()}</button>
            }
            {
                endTime && <button>Time2: {endTime.toLocaleString()}</button>
            }
            <Calendar
                {...config}
                visible={show}
                onCancel={onCancel}
                infiniteOpt
                // title="这是一个标题"
                onConfirm={onConfirm}
                onSelectHasDisableDate={onSelectHasDisableDate}
                getDateExtra={getDateExtra}
                defaultDate={now}
                minDate={new Date(+now - 5184000000)}
                maxDate={new Date(+now + 31536000000)}
            />
        </div>
    );
}
```

```css
.leke-mobile-calendar-btn {
    display: flex;
    justify-content: space-between;
    background: #fff;
    border: none;
    padding: 10px 16px;
    width: 100vw;
    text-align: left;
    position: relative;
}

.leke-mobile-calendar-btn .leke-icon {
    transform: rotate(270deg);
    color: #aaa;
}

.leke-mobile-calendar-btn::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 0;
  width: 100vh;
  height: 1px;
  background-color: #eee;
}

.leke-mobile-calendar-btn:active {
    background: #f1f1f1;
}

.leke-mobile-calendar-btn:first-child::before {
    left: 0px;
}

.leke-mobile-calendar-btn:nth-child(7) {
    border-bottom: 1px solid #eee;
}
```