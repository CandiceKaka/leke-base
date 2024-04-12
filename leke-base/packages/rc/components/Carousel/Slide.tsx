import React, {useCallback, useMemo, useRef} from 'react';
import classNames from 'classnames';

interface SlideProps{
    children:React.ReactElement<HTMLElement>[],
    currentIndex:number,
    vertical:boolean,
    className:string
}
export default function Slide({children,currentIndex,vertical,className}:SlideProps) {
    const dataRef=useRef({oldIndex:currentIndex,height:0});

    const modifyChildren=useMemo(()=>{
        return React.Children.map(children,(child,index)=>{
            return React.cloneElement(child,{
                style:Object.assign({},child.props.style,{width:'100%',height:'100%',[vertical?'height':'width']:100/children.length+'%'}),
                key:index,
                className:classNames(
                    'leke-carousel-item',
                    child.props.className
                )});
        });
    },[children,vertical]);
    const length=modifyChildren.length;

    const wrapStyle:React.CSSProperties=useMemo(()=>{
        let left=null;
        let top=null;
        const {height}=dataRef.current;
        if(vertical){
            top=-currentIndex*height;
        }else {
            left=-currentIndex*100+'%';
        }
        return {
            [vertical?'height':'width']:(length*100)+'%',
            left,
            top
        };
    },[currentIndex,length,vertical,dataRef]);

    dataRef.current.oldIndex=currentIndex;

    const refCallback=useCallback((node)=>{
        if(node){
            dataRef.current.height=node.clientHeight/length;
        }
    },[length]);
    
    return <div ref={refCallback} className={classNames("leke-carousel-wrap",className)} style={wrapStyle}>{modifyChildren}</div>;
}