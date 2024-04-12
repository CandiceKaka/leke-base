import React, {forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";

export interface OptionListPropsType<T=any> {
    options:T[]
    listHeight:number
    itemHeight:number
    dropdownRender: (originNode: React.ReactNode) => React.ReactNode,
    renderItem:(item:T,index:number)=>React.ReactNode
}
const OptionList=forwardRef(function (props:OptionListPropsType,ref) {
    const {options, listHeight,itemHeight,renderItem, dropdownRender}=props;
    const [start,setStart]=useState(0);
    const scrollBarRef=useRef<HTMLDivElement>(null);
    const containerRef=useRef<HTMLDivElement>(null);
    const [scrollX,setScrollX]=useState(0);
    const realList = useMemo(() => {
        const labelCache = {}; // 分组头缓存
        let cutNum = 0;// cutNum：分组名需要不计入真实list下标，但需要占位用于虚拟列表计算
        setStart(0);  // 重置滚动
        scrollBarRef.current && (scrollBarRef.current.scrollTop = 0); // 重置滚动
        return options.reduce((t,i) => {
            // 直接返回不含分组的项和已插入分组头的项
            if(!i.groupLabel || labelCache[i.groupLabel]) {
                return t.concat([i]);
            }
            labelCache[i.groupLabel] = cutNum += 1; // 缓存已插入的分组头
            return t.concat([{ group: i.groupLabel, cutNum }, i]);
        }, []);
    },[options]);
    const itemNum = realList.length; // item的数量（options数量加上分组头）
    const end=Math.min(start+Math.ceil(listHeight/itemHeight)+2,itemNum);
    const totalHeight=itemHeight*itemNum;
    const haveScrollBar=totalHeight>listHeight;

    function scroll(e){
        const start=Math.floor(e.target.scrollTop/itemHeight);
        setScrollX(-e.target.scrollTop % itemHeight);
        setStart(start);
    }
    useImperativeHandle(ref,()=>{
        return {
            scrollToIndex(index){
                const scrollBar=scrollBarRef.current;
                if(scrollBar){
                    const maxScrollTop=totalHeight-listHeight;
                    const oldScrollTop=scrollBar.scrollTop;
                    const newScrollTop=Math.min(maxScrollTop,index*itemHeight);
                    const inView = (top)=>{
                        return top>=oldScrollTop && top<=oldScrollTop+listHeight;
                    };
                    if(!inView(newScrollTop) || !inView(newScrollTop+itemHeight)){
                        scrollBar.scrollTop=newScrollTop;
                    }
                }
            }
        };
    },[totalHeight,itemHeight,listHeight]);

    useEffect(()=>{
        if(haveScrollBar){
            const onWheel = (e)=>{
                e.preventDefault();
                scrollBarRef.current.scrollTop=scrollBarRef.current.scrollTop+e.deltaY;
            };
            const container=containerRef.current;
            container.addEventListener('wheel',onWheel);
            return ()=>{
                container.removeEventListener('wheel',onWheel);
            };
        }
    },[haveScrollBar]);

    const renderList = useMemo(() => {
        let cutNum = 0;
        return realList.slice(start,end).map((item,index)=> {
            if (item.group) {
                cutNum = item.cutNum;
                return <div key={'group' + item.group} className="leke-option-group">{item.group}</div>;
            }
            return renderItem(item,start+index-cutNum);
        });
    }, [end, realList, renderItem, start]);

    const render = <div ref={containerRef}  className='leke-option-container'>
        <div className='leke-option-list' style={{maxHeight:listHeight, transform: `translateY(${scrollX}px)`}}>
            {renderList}
        </div>
        {haveScrollBar?
            <div ref={scrollBarRef} onScroll={scroll} className='leke-option-scrollBar' style={{maxHeight:listHeight,overflow:"auto"}}>
                <div style={{height:totalHeight}}></div>
            </div>:null
        }
    </div>;

    return dropdownRender ? <>{dropdownRender(render)}</> : render;
});
OptionList.defaultProps={
    itemHeight:32,
};
export default OptionList;