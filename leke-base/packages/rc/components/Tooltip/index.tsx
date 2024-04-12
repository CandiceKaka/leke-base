import React, { Children, ReactElement, CSSProperties, useRef, useEffect } from "react";
import Popover from "../Popover";
import classNames from "classnames";
import { setPopupPosition } from "./util";

export interface childPropsType {
    ref?:React.RefObject<HTMLElement>|React.RefCallback<HTMLElement>,
    tabIndex?:number,
    onMouseEnter?:(e)=>void,
    onMouseLeave?:(e)=>void,
}
export interface dropdownPropsType {
    popup: ReactElement | string,
    children: React.ReactElement<HTMLElement>,
    style?: CSSProperties,
    className?: string,
    visible?: boolean,
    arrowPointAtCenter?: boolean
    eventType?: Array<'focus'|'hover'|'click'>,
    onVisibleChange?: (boolean) => void,
    getPopupContainer?: (HTMLElement) => HTMLElement,
    placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'leftCenter' | 'leftTop' | 'leftBottom' | 'rightCenter' | 'rightTop' | 'rightBottom',
}
export default function Tooltip(props: dropdownPropsType) {
    const {style, className, popup, placement, children, arrowPointAtCenter = false} = props;
    const triggerRef=useRef<HTMLElement>(null);
    const child=Children.only(children);
    const cloneProps:childPropsType={
        ref(node){
            const childRef=(child as any).ref;
            if(typeof childRef==='function'){
                childRef(node);
            }else if(Object.prototype.toString.call(childRef)==='[object Object]'){
                childRef.current=node;
            }
            triggerRef.current=node;
        }
    };
    const TooltipContent = () => {
        const popupRef: {current: any} = useRef();
        useEffect(() => {
            if(arrowPointAtCenter && popupRef.current){
                const popup = popupRef.current;
                const trigger = triggerRef.current;
                setPopupPosition(popup, trigger, placement);
            }
        }, [popupRef]);
        return (
            <div ref={popupRef} className={classNames('leke-tooltip-container', className)} style={style}>
                <div className={'leke-modifyStyle'}></div>
                <div className={`leke-contentStyle`}>
                    {typeof popup === 'string' ? <span className={`leke-contentSpanSty`}>{popup}</span> : popup}
                </div>
            </div>
        );
    };
    
    return (
        <>
            <Popover
                {...props}
                popup={<TooltipContent />}
                popupClassName={`leke-popup-shadowRewrite`}
                customAnimation={{ enter: 'tooltip-enter', exit: 'tooltip-exit' }}
            >
                {React.cloneElement(child,cloneProps)}
            </Popover>
        </>
    );
}