import React from 'react';
import classNames from "classnames";
import omit from 'omit.js';
import { SizeType } from "./interface";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'prefix'|'size'>  {
    addonBefore?:React.ReactNode, 
    addonAfter?:React.ReactNode,
    className?:string,
    disabled?:boolean,
    prefix?:React.ReactNode,
    suffix?:React.ReactNode,
    size?: SizeType,
    style?:React.CSSProperties;
    type?:'text' | 'password',
    onPressEnter?:React.KeyboardEventHandler<HTMLInputElement>;
    onChange?:React.ChangeEventHandler<HTMLInputElement>
}

function noop() {}

const baseCls = 'leke-input';
const Input:React.FC<InputProps> = (props) => {
    const {addonBefore,addonAfter,className,disabled,prefix,size,suffix,type,onChange,onPressEnter} = props;
    
    const getInputClassName = () => {
        const inputClassName = classNames(`${baseCls}`,{
            [`${baseCls}-sm`]:size==="small",
            [`${baseCls}-lg`]:size==="large",
            [`${baseCls}-disabled`]:disabled
        },className);
        return inputClassName;
    };

    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onPressEnter) {
            onPressEnter(e);
        }
    };

    const getDefaultInput = (className=baseCls)=>{
        return (<input
            {...omit(props,['className','type','onChange','prefix','size','suffix','addonBefore','addonAfter','onPressEnter'])}
            className={className}
            type={type}
            onChange={onChange}
            onKeyDown={handleKeyDown}
        />);
    };

    // 输入框外前置、后置标签
    if (addonBefore || addonAfter) {
        return(
            <span className={classNames(`${baseCls}-wrap`)}>
                {addonBefore&&<span className={classNames("leke-input-addon","leke-input-addon-before",{
                    'leke-input-addon-text':typeof addonBefore === 'string'
                })}>{addonBefore}</span>}
                {getDefaultInput(getInputClassName())}
                {addonAfter&&<span className={classNames("leke-input-addon","leke-input-addon-after",{
                    'leke-input-addon-text':typeof addonAfter === 'string'
                })}>{addonAfter}</span>}
            </span>
        );
    }

    // 输入框内文字前缀、后缀
    if (suffix || prefix) {
        return(
            <span className={classNames(`${baseCls}-wrap`,getInputClassName())}>
                {prefix&&<span className="leke-input-prefix">{prefix}</span>}
                {getDefaultInput('leke-input-cleared')}
                {suffix&&<span className="leke-input-suffix">{suffix}</span>}
            </span>
        );
    }

    return getDefaultInput(getInputClassName());
};

Input.defaultProps = {
    disabled:false,
    size:'middle',
    type:'text',
    onChange:noop,
};

export default Input;
