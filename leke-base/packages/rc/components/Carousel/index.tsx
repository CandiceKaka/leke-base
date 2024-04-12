import React, {useState, useCallback, useMemo, useRef, useEffect, useImperativeHandle, RefObject} from 'react';
import classNames from 'classnames';
import { LineCircleLeft, LineCircleRight, FillCircleRight, FillCircleLeft} from '@leke/icons';
import Slide from './Slide';
import Fade from './Fade';

interface propTypes{
    children:React.ReactElement<HTMLElement>|React.ReactElement<HTMLElement>[],
    autoplay?:boolean,
    interval?:number,
    beforeChange?:(from:number,to:number)=>void,
    className?:string,
    style?:React.CSSProperties,
    vertical?:boolean,
    dots?:boolean,
    type?:'slide'|'fade',
    dotType?: 'circle' | 'line',
    arrowControl?: boolean;
    arrowType?: 'line' | 'default',
    arrowStyle?: React.CSSProperties,
}

function usePlay(callback,interval) {
    const timerRef=useRef(0);

    const stop=useCallback(()=>{
        const timer=timerRef.current;
        if(timer){
            clearTimeout(timer);
            timerRef.current=0;
        }
    },[]);

    const play=useCallback(()=>{
        timerRef.current=window.setTimeout(callback,interval);
    },[interval,callback]);

    return {stop,play};
}

type indexType=((index:number)=>number)|number
type setIndexType=(newIndex?:indexType)=>void
type refType={dom:HTMLDivElement,goTo:setIndexType}

const Carousel = React.forwardRef<refType,propTypes>(function (props,ref){
    const {children,style,autoplay,interval,beforeChange,className,vertical,dots,type, dotType, arrowControl, arrowType = 'default', arrowStyle = {}}=props;
    const [currentIndex,setIndex]=useState(0);
    const carouselData=useRef({oldIndex:currentIndex,height:0});
    const domRef=useRef<HTMLDivElement>(null);
    
    const childList=useMemo(()=>{
        const childList=React.Children.toArray(children) as React.ReactElement<HTMLElement>[];
        if(type==='slide'&&childList.length>1){
            childList.push(childList[0]);
        }
        return childList;
    },[children,type]);

    const maxIndex=childList.length-1;

    const setCurrentIndex=useCallback<setIndexType>((newIndex)=>{
        if(typeof newIndex==='function'){
            newIndex=newIndex(currentIndex);
        }else if(newIndex===undefined){
            newIndex=currentIndex+1;
        }
        if(newIndex===currentIndex){
            return;
        }
        if(currentIndex===maxIndex&&newIndex===maxIndex+1){
            newIndex=0;
        }else if(currentIndex===0&&newIndex===-1){
            newIndex=maxIndex;
        }
        if(newIndex!==currentIndex&&typeof beforeChange==='function'){
            beforeChange(currentIndex,newIndex===maxIndex?0:newIndex);
        }
        setIndex(newIndex);
    },[currentIndex,maxIndex,setIndex,beforeChange]);

    useImperativeHandle(ref,()=>{
        return {
            goTo:setCurrentIndex,
            dom:domRef.current
        };
    },[setCurrentIndex,domRef]);

    const isNeedDuration=useMemo(()=>{
        if(type==='fade'){
            return true;
        }
        const {oldIndex}=carouselData.current;

        if(oldIndex===maxIndex&&currentIndex===0){
            return false;
        }
        if(oldIndex===0&&currentIndex===maxIndex){
            return false;
        }
        return true;
    },[type,currentIndex,maxIndex]);
    carouselData.current.oldIndex=currentIndex;

    const {stop,play}=usePlay(setCurrentIndex,interval);

    useEffect(()=>{
        if(!isNeedDuration){
            stop();
            setTimeout(setCurrentIndex,50);
            //animationFrame(()=>setCurrentIndex());
        }else if(autoplay){
            play();
            return stop;
        }
    },[stop,play,autoplay,isNeedDuration,setCurrentIndex]);

    const length=React.Children.count(children);

    const hanldeOnArrowClick = () => {
        stop();
        setCurrentIndex();
    };

    const renderArrowControl = () => {
        return  <div className={classNames('leke-carousel-control')} onMouseEnter={stop} onMouseLeave={play}>
            {
                arrowType === 'default' 
                    ?
                    <> 
                        <FillCircleLeft className={'left-arrow leke-carousel-button-prev'} 
                            onClick={hanldeOnArrowClick} style={arrowStyle} />
                        <FillCircleRight className={'right-arrow leke-carousel-button-next'} 
                            onClick={hanldeOnArrowClick} style={arrowStyle}  />
                    </> 
                    : 
                    <> 
                        <LineCircleLeft className={'left-arrow line leke-carousel-button-prev'}
                            onClick={hanldeOnArrowClick} style={arrowStyle}  />
                        <LineCircleRight className={'right-arrow line leke-carousel-button-next'} 
                            onClick={hanldeOnArrowClick} style={arrowStyle}  />
                    </>
            }
            
        </div>;
    };

    return (
        <div ref={domRef} className={classNames('leke-carousel',className)} onMouseEnter={stop} onMouseLeave={play} style={style}>
            {
                type==='fade'
                    ?
                    <Fade currentIndex={currentIndex}>{childList}</Fade>
                    :
                    <Slide className={isNeedDuration?'leke-carousel-transition':''} currentIndex={currentIndex} vertical={vertical}>{childList}</Slide>
                
            }

            {
                dots ?
                    <ul className={`leke-carousel-dots ${dotType === 'line' ? '' : 'circle'}`}>
                        {
                            new Array(length).fill('').map((item,index)=>{
                                const className=currentIndex===index||(length===currentIndex&&index===0)?'leke-carousel-dot-current':'';
                                return(
                                    <li
                                        key={index}
                                        className={className}
                                        onClick={()=>index!==currentIndex&&setCurrentIndex(index)}
                                    ></li>
                                );
                            })
                        }
                    </ul>
                    :
                    null
            }
            {
                arrowControl && renderArrowControl()
            }
        </div>
    );
});


Carousel.defaultProps={
    autoplay:true,
    interval:3000,
    dots:true,
    vertical:false,
    type:'slide',
    dotType: 'line',
    arrowControl: false,
    arrowType: 'default',
};
export default Carousel;
