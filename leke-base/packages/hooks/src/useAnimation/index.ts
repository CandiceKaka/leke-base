/* eslint-disable react-hooks/rules-of-hooks */
import {useRef, RefObject, useEffect,useLayoutEffect} from "react";
import classNames from 'classnames';
import omit from 'omit.js';
interface useAnimationProps{
    ref:RefObject<HTMLElement>,
    popupClassName?: string,
    type?:'transition'|'animation',
    open:boolean,
    enter?:string,
    entering?:string,
    entered?:string,
    exit?:string,
    exiting?:string,
    exited?:string
    onEnter?:()=>void,
    onEntering?:()=>void,
    onEntered?:()=>void,
    onExit?:()=>void,
    onExiting?:()=>void,
    onExited?:()=>void,
}
function getAnimationEventName(type='animation') {
    const el=document.body;
    if(el.style[type]!==undefined){
        return type+'end';
    }
    const webkitName='webkit'+type.replace(/^[a-z]/,($0)=>$0.toUpperCase());
    if(el.style[webkitName]!==undefined){
        return webkitName+'End';
    }
    return type+'end';
}

export default function useAnimation(params:useAnimationProps) {
    if(typeof window!=='object'){
        return;
    }
    const {
        ref,
        open,
    }=params;
    const classNameRef=useRef(null);
    const popupClassName = useRef(null);
    const omitRef=useRef(null);
    omitRef.current=omit(params,['ref','open']);
    useLayoutEffect(()=>{
        const el=ref.current;
        if(!el){
            return;
        }
        // 当popup的ClassName发生变化时也需要及时更新初始ClassName
        if(classNameRef.current===null || params.popupClassName !== popupClassName.current){
            popupClassName.current = params.popupClassName;
            classNameRef.current=el.className||'';
        }
        const {enter,exit,onEnter,onExit}=omitRef.current;
        if(open){
            el.className=classNames(classNameRef.current,enter);
            typeof onEnter==='function'&&onEnter();
        }else{
            el.className=classNames(classNameRef.current,exit);
            typeof onExit==='function'&&onExit();
        }
    },[open,ref,params.popupClassName]);
    useEffect(()=>{
        const el=ref.current;
        if(!el){
            return;
        }
        const {entering,entered,exiting,exited,onEntering,onEntered,onExiting,onExited,type}=omitRef.current;
        if(open){
            if(entering){
                el.className=classNames(classNameRef.current,entering);
            }
            typeof onEntering==='function'&&onEntering();
        }else{
            if(exiting){
                el.className=classNames(classNameRef.current,exiting);
            }
            typeof onExiting==='function'&&onExiting();
        }
        const eventName=getAnimationEventName(type);
        function eventCallback(){
            if(open){
                el.className=classNames(classNameRef.current,entered);
                typeof onEntered==='function'&&onEntered();
            }else{
                el.className=classNames(classNameRef.current,exited);
                typeof onExited==='function'&&onExited(el);
            }
            el.removeEventListener(eventName,eventCallback);
        }
        el.addEventListener(eventName,eventCallback);
    },[open,ref]);
}