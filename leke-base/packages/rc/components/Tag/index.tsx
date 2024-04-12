/**
 * @Author: yangxule
 * @Date: 2020/11/13 20:22
 * @Description: 标签
 */
import React, {ReactNode,useCallback,AllHTMLAttributes} from 'react';
import {Close} from '@leke/icons';
import classNames from "classnames";

interface Props extends AllHTMLAttributes<HTMLDivElement>{
    text: string;
    colorType?: string;
    icon?: ReactNode;
    closable?: boolean;
    onClose?: ()=>void;
    visible?: boolean;
}
const PRESET = [
    'default','seablue','lekegreen','brighteyes','hotred','lime','auroragreen','geekblue','saucepurple','magenta','volcano','marigold','sunrise',
    'bluefill','greenfill','orangefill','redfill'
];
const PRE_CLASSNAME = 'leke-tag';

const Tag = React.forwardRef<HTMLDivElement,Props>((props,ref) => {
    const {text,colorType,icon,closable,onClose,visible,className,...otherProps} = props;
    const handleClick = useCallback((e)=>{
        e.stopPropagation();
        onClose && onClose();
    },[onClose]);
    const CloseIcon = closable ? <span className={`${PRE_CLASSNAME}-closeicon`} onClick={handleClick}><Close/></span> : null;
    const Icon = icon ? <span className={`${PRE_CLASSNAME}-icon`}>{icon}</span> : null;
    const mixClassName = classNames(
        PRE_CLASSNAME,
        {
            [`${PRE_CLASSNAME}-${colorType}`]: PRESET.indexOf(colorType) >= 0,
            [`${PRE_CLASSNAME}-close`]: !visible
        },
        className
    );
    return <div className={mixClassName} ref={ref} {...otherProps}>
        {Icon}<span className={`${PRE_CLASSNAME}-text`}>{text}</span>{CloseIcon}
    </div>;
});
Tag.defaultProps = {
    visible: true
};
export default React.memo(Tag);