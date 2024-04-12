/* eslint-disable react/no-find-dom-node */
import React, { FC, useEffect, useRef, useState } from "react";
import { Calendar as RMCalendar, CalendarPropsType } from '@cnstrong/m-calendar';
import type { PropsType as HeaderType } from '@cnstrong/m-calendar/es/Calendar/Header';
import { Close } from '@leke/icons';
import { findDOMNode } from "react-dom";

const Header = (props:HeaderType) => {
    return <div className="header">
        <span className="left"></span>
        <span className="title">{props.title}</span>
        <span className="right" onClick={props.onCancel}><Close /></span>
    </div>;
};

const Calendar: FC<CalendarPropsType> = (props) => {
    const [dateTitle, setDateTitle] = useState('');
    const calendarRef = useRef<any>();

    // 滚动日期动态标题
    const onScroll = () => {
        document.body.offsetTop;
        const monthTitles = (findDOMNode(calendarRef.current) as HTMLElement).getElementsByClassName('month-title');
        const wrapper = (findDOMNode(calendarRef.current) as HTMLElement).getElementsByClassName('wrapper')[0];
        
        let title = null;
        for(let i = 0;i < monthTitles.length;i++) {
            if(wrapper.scrollTop - (monthTitles[i] as HTMLElement).offsetTop < 0) {
                title = monthTitles[i - 1];
                break;
            }
        }
        if(!title) title = monthTitles[0];
        setDateTitle(title?.getInnerHTML?.());
    };

    useEffect(() => {
        // 打开的时候初始化标题时间
        if(props.visible) {
            onScroll();
        }
    },[props.visible]);


    return <RMCalendar
        ref={calendarRef}
        renderHeader={(headerProps) => Header({...headerProps,title: props.title || dateTitle })}
        onScroll={props.title ? undefined : onScroll}
        {...props}
        pickTime={false}
    />;
};

Calendar.defaultProps = {
    prefixCls: 'am-calendar',
    timePickerPrefixCls: 'am-picker',
    timePickerPickerPrefixCls: 'am-picker-col',
};

export default Calendar;