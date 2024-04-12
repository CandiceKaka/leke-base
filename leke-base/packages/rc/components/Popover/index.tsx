import React, {
    CSSProperties,
    useRef,
    useReducer, useEffect, useCallback
} from 'react';
import classNames from 'classnames';
import {useAnimation,useControl} from '@leke/hooks';
import {setPopupPosition,placementType} from './util';
import Popup from './Popup';

export interface childPropsType {
    ref?:React.RefObject<HTMLElement>|React.RefCallback<HTMLElement>,
    tabIndex?:number,
    onFocus?:(e)=>void,
    onClick?:(e)=>void,
    onMouseEnter?:(e)=>void,
    onMouseLeave?:(e)=>void,
    onBlur?:(e)=>void
}
export interface popupPropsType {
    ref:React.RefObject<HTMLDivElement>,
    onMouseEnter?:(e)=>void,
    onMouseLeave?:(e)=>void,
    onMouseDown?:(e)=>void,
    onFocus?:(e)=>void,
    onBlur?:(e)=>void,
    className:string,
    style?:CSSProperties
}
export interface triggerPropsType {
    visible?:boolean
    onVisibleChange?:(boolean)=>void
    children:React.ReactElement<HTMLElement>
    eventType?:Array<'focus'|'hover'|'click'>
    popup:React.ReactNode
    popupStyle?:CSSProperties
    popupClassName?:string
    getPopupContainer?:(HTMLElement)=>HTMLElement
    placement?:placementType
    autoSize?:boolean
    disabled?:boolean
    customAnimation?: { enter: string, exit: string }
    extendPosition?: { x?: number, y?: number }
}
const enter='leke-open';
const exit='leke-close';
function contains (container:HTMLElement,target:HTMLElement){
    if(typeof container.contains==='function'){
        return container.contains(target);
    }
    while (target&&target!==document.body){
        if (target === container){
            return true;
        }
        target = target.parentElement;
    }
    return false;
}
const useLayoutEffect=typeof window==='object'?React.useLayoutEffect:useEffect;
function Popover (props) {
    const {children,eventType,popup,popupStyle,popupClassName,getPopupContainer,placement,autoSize,disabled, customAnimation,extendPosition}=props;
    const [visible,setVisible]=useControl(props.visible,props.onVisibleChange,false);
    const triggerRef=useRef<HTMLElement>(null);
    const popupRef=useRef<HTMLDivElement>(null);
    const timerRef=useRef(null);
    const counterRef=useRef(0); // 显隐计数器
    const [portalContainer,setPortalContainer]=useReducer(()=>getPopupContainer(triggerRef.current),null);
    const child=React.Children.only(children);
    const childProps:childPropsType=child.props;
    const includeClick=eventType.indexOf('click')!==-1;
    const includeFocus=eventType.indexOf('focus')!==-1;
    const includeHover=eventType.indexOf('hover')!==-1;

    const popupProps:popupPropsType={
        ref:popupRef,
        style:popupStyle,
        className:classNames('leke-popup',`leke-popup-${placement}`,popupClassName)
    };
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
    const clearDelay=useCallback(()=>{
        if(timerRef.current){
            clearTimeout(timerRef.current);
        }
    },[]);
    const delaySetVisible=useCallback((v)=>{
        clearDelay();
        timerRef.current=setTimeout(()=>{
            setVisible(v);
        },50);
    },[clearDelay,timerRef,setVisible]);
    if(!disabled){
        if(includeClick){
            cloneProps.onClick=(e)=>{
                delaySetVisible(true);
                childProps.onClick?.(e);
            };
        }
        if(includeFocus){
            cloneProps.onFocus=(e)=>{
                counterRef.current += 1;
                delaySetVisible(true);
                childProps.onFocus?.(e);
            };
            cloneProps.onBlur=(e)=>{
                counterRef.current -= 1;
                setTimeout(() => {
                    if(counterRef.current === 0) {
                        delaySetVisible(false);
                        childProps.onBlur?.(e);
                    }
                },0);
                
            };
            popupProps.onFocus=(e)=>{
                counterRef.current += 1;
            };
            popupProps.onBlur=(e)=>{
                counterRef.current -= 1;
                setTimeout(() => {
                    if(counterRef.current === 0) {
                        delaySetVisible(false);
                    }
                },0);
            };
            popupProps.onMouseDown=e=> {
                if(e.target.tagName !== 'INPUT') {
                    e.preventDefault();
                }
            };
        }
        if(includeHover){
            cloneProps.onMouseEnter=(e)=>{
                childProps.onMouseEnter?.(e);
                delaySetVisible(true);
            };
            cloneProps.onMouseLeave=(e)=>{
                childProps.onMouseLeave?.(e);
                delaySetVisible(false);
            };
            popupProps.onMouseEnter=clearDelay;
            popupProps.onMouseLeave=()=>{
                delaySetVisible(false);
            };
        }
    }
    useAnimation({
        ref:popupRef,
        popupClassName: popupClassName,
        open:portalContainer?visible:false,
        enter: customAnimation?.enter || enter,
        exit: customAnimation?.exit || exit,
        exited:'leke-hide'
    });
    useLayoutEffect(()=>{
        if(visible){
            if(portalContainer){
                if(autoSize){
                    if(placement.indexOf('bottom')===0||placement.indexOf('top')===0){
                        popupRef.current.style.minWidth=triggerRef.current.offsetWidth+'px';
                    }else{
                        popupRef.current.style.minHeight=triggerRef.current.offsetHeight+'px';
                    }
                }
                setPopupPosition(popupRef.current,triggerRef.current,portalContainer,placement,extendPosition);
            }else{
                setPortalContainer();
            }
        }
    },[children,visible,triggerRef,popupRef,placement,portalContainer,setPortalContainer,autoSize,extendPosition]);

    useEffect(clearDelay,[clearDelay]);

    useEffect(()=>{
        if(includeClick){
            const click=(e)=>{
                const {target}=e;
                if(popupRef.current&&!contains(triggerRef.current,target)&&!contains(popupRef.current,target)){
                    delaySetVisible(false);
                }
            };
            document.addEventListener('click',click);
            return ()=>{
                document.removeEventListener('click',click);
            };
        }
    },[includeClick,delaySetVisible,triggerRef,popupRef]);
    return(
        <>
            {React.cloneElement(child,cloneProps)}
            <Popup  portalContainer={portalContainer} visible={visible} >
                <div {...popupProps}>{popup}</div>
            </Popup>
        </>
    );
};
Popover.defaultProps={
    placement:'bottomLeft',
    getPopupContainer:()=>document.body,
    eventType:['hover']
};
export default Popover;