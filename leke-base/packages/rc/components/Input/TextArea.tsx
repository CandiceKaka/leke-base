import React,{useState,useEffect,useRef} from 'react';
import classNames from "classnames";
import omit from 'omit.js';
// import ResizeObserver from 'resize-observer-polyfill';
import {calculateNodeHeight} from './utils';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    autoSize?: boolean | {
        minRows:number,
        maxRows:number
    }
    className?:string,
    maxLength?:number,
    value?:string,
    onChange?:(e:React.ChangeEvent)=>void,
    onResize?:(rect:{width:number,height:number})=>void,
}


const baseCls = 'leke-text-area';
const TextArea:React.FC<TextAreaProps> = (props) => {
    const {autoSize,className,maxLength,value,onChange,onResize} = props;
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [inputVal, setInputVal] = useState(value||'');
    const getTextAreaClassName = () => classNames(className,baseCls,{
        [`${baseCls}-auto-size`]:autoSize
    });

    const preValueRef = useRef(value);
    useEffect(() => {
        if (value !== undefined || preValueRef.current !== value) {
            setInputVal(value);
            preValueRef.current = value;
        }
    }, [value]);


    // TODO onResize 暂时先不添加 依赖于resize-observer-polyfill
    // useEffect(() => {
    //     const resizeObserver = new ResizeObserver((entries)=>{
    //         entries.forEach(i => {
    //             const className:string=i.target.className;
    //             if (className===textareaRef.current.className) {
    //                 onResize&&onResize({
    //                     width:i.contentRect.width,
    //                     height:i.contentRect.height,
    //                 });
    //             }
    //         });
    //     });
    //     resizeObserver.observe(textareaRef.current);
    // }, [onResize]);

    // 自动计算 textarea 高度
    useEffect(() => {
        if (autoSize) {
            let minRows,maxRows;
            if (typeof autoSize ==='object') {
                minRows = autoSize.minRows;
                maxRows = autoSize.maxRows;
            }
            const res = calculateNodeHeight(textareaRef.current,minRows,maxRows);
            textareaRef.current.style.height=res.height+'px';
        }
    }, [inputVal,autoSize]);

    const hasMaxLength = maxLength > 0;

    const onTextAreaChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        if (hasMaxLength&&(e.target.value.length>maxLength)) return;
        setInputVal(e.target.value);
        onChange&&onChange(e);
    };

    const textareaNode =(
        <textarea
            className={getTextAreaClassName()}
            ref={textareaRef}
            value={inputVal}
            {...omit(props,['className','value','onBlur','autoSize','onResize'])}
            onChange={onTextAreaChange}
        />
    );

    if (hasMaxLength){
        const textLength = inputVal.length;
        const baseContainerCls  = `${baseCls}-container`;
        return (
            <div data-count={`${textLength}/${maxLength}`} className={classNames(baseContainerCls,{
                [`${baseContainerCls}-show-count`]:hasMaxLength
            })}>
                {textareaNode}
            </div>);
    } 
    return textareaNode;
};
TextArea.defaultProps={
    autoSize:false,
};
export default TextArea;
