import React from 'react';
import classNames from 'classnames';

interface FadeProps{
    children:React.ReactElement<HTMLElement>[],
    currentIndex:number
}
export default function Fade({children,currentIndex}:FadeProps) {
    const modifyChildren=React.Children.map(children,(child,index)=>{
        return React.cloneElement(child,{
            style:Object.assign({},child.props.style,{width:'100%',height:'100%',opacity:currentIndex===index?'1':'0'}),
            key:index,
            className:classNames(
                'leke-carousel-item',
                'leke-carousel-fade-item',
                child.props.className
            )});
    });
    return <div className='leke-carousel-wrap' >{modifyChildren}</div>;
}