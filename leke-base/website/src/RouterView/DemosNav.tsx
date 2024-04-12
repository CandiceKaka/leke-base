import React, {useEffect, useMemo, useRef, useState} from "react";

interface types {
    mds:any[]
}

let frameId=null;
const domEl=document.documentElement||document.body;
function toBottom() {
    return domEl.scrollHeight-domEl.scrollTop-domEl.clientHeight;
}
function animateScrollTo(el,callback) {
    const distance=Math.min(el.getBoundingClientRect().top-50,toBottom());
    let speed=distance/5;
    if(speed>0){
        speed=Math.max(1,Math.floor(speed));
    }else{
        speed=Math.min(-1,Math.ceil(speed));
    }
    window.scrollTo(0,domEl.scrollTop+speed);
    if(distance!==0){
        frameId=window.requestAnimationFrame(()=>{
            animateScrollTo(el,callback);
        });
    }else{
        callback&&callback();
    }
}
function queryIndex() {
    const els=document.querySelectorAll('.nav-section');
    const scrollTop=domEl.scrollTop;
    for(let i=0;i<els.length;i++){
        const el=els[i] as HTMLElement;
        if(scrollTop+50<=el.offsetTop+el.offsetHeight){
            return i;
        }
    }
    return -1;
}
export default function DemosNav (props:types) {
    const {mds}=props;
    const [currentIndex,setCurrentIndex]=useState(-1);
    const disableRef=useRef(false);
    const demoList=useMemo(()=>{
        return mds.filter(md=>md.title);
    },[mds]);
    useEffect(()=>{
        let timer=null;
        function scroll(){
            if(disableRef.current){
                if(timer){
                    clearTimeout(timer);
                    timer=null;
                }
            }else if(!timer){
                timer=setTimeout(()=>{
                    timer=null;
                    setCurrentIndex(queryIndex());
                },100);
            }
        }
        window.addEventListener('scroll',scroll);
        setCurrentIndex(queryIndex());
        return ()=>{
            window.removeEventListener('scroll',scroll);
            window.cancelAnimationFrame(frameId);
            if(timer){
                clearTimeout(timer);
            }
        };
    },[demoList,setCurrentIndex]);
    function click(index) {
        window.cancelAnimationFrame(frameId);
        const el=document.querySelectorAll('.nav-section')[index];
        disableRef.current=true;
        animateScrollTo(el,()=>{
            disableRef.current=false;
            setCurrentIndex(queryIndex());
        });
    }
    return(
        <div className='demos-nav'>
            <span className='demos-nav-title'>示例导航</span>
            <ul className='demos-nav-list'>
                {demoList.map((md,index)=><li onClick={()=>click(index)} key={md.title||index} className={index===currentIndex?'current':''}>{md.title}</li>)}
            </ul>
        </div>
    );
}