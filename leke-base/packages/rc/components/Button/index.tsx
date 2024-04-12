/**
 * @Author: gulingxin@cnstrong.cn
 * @Date: 2020/12/23 11:15
 * @Description: 按钮
 */
import React, {ReactNode, forwardRef, useState, useEffect} from 'react';
import classNames from 'classnames';
import { ButtonShape, ButtonSize, ButtonType,ButtonHTMLType } from './type';

type BaseButtonProps = {
    children?: ReactNode;
    type?: ButtonType;
    disabled?: boolean;
    className?: string;
    size?:ButtonSize;
    shape?:ButtonShape;
    icon?:ReactNode;
    loading?:boolean;
}

export type ButtonProps = {
    htmlType?:ButtonHTMLType;
} & BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>,'type'>


const Button = (props: ButtonProps,ref) => {
    const { type = 'default', disabled, className,size = 'middle',shape,icon,children,loading,htmlType, ...otherProps} = props;

    const [isBtnClickAnimating,setIsBtnClickAnimating] = useState('false');

    const classes = classNames(className, {
        'leke-btn': true,
        [`leke-btn-${type}`]: type,
        [`leke-btn-${shape}`]:shape,
        [`leke-btn-${size}`]:size,
        'leke-btn-loading':loading,
        'leke-btn-icon-only':icon && !children,
    });

    const LoadingIcon = () => {
        return <div className="leke-btn-loading-icon"></div>;
    };

    const iconNode = loading ? <LoadingIcon /> : icon  ? icon : null;

    const kids = children ? 
        <span className='leke-btn-content'>{children}</span>
        : 
        null;

    let fadeOutTimer = null;
    const handleMouseUp = ()=>{
        if(fadeOutTimer) clearTimeout(fadeOutTimer);
        setIsBtnClickAnimating('true');
        fadeOutTimer = setTimeout(()=>{
            setIsBtnClickAnimating('false');
        },350);
    };

    useEffect(() => {
        return () => {
            if(fadeOutTimer) clearTimeout(fadeOutTimer);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <button ref={ref} type={htmlType} disabled={disabled} className={`${classes} `} {...otherProps} onMouseUp={handleMouseUp} btn-click-animating={isBtnClickAnimating}>
            {iconNode}
            {kids}
        </button>
    );
};

export default forwardRef(Button);
