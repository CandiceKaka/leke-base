import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { CloseCircleFill } from "@leke/icons";
import { animationDuration, prefix,SIZE } from './config';
import {ButtonType} from '../Button/type';
import Mask from './Mask';
import cx from 'classnames';
import Button from '../Button';

export interface ModalProps {
    visible?: boolean,
    title: React.ReactElement | string | string[],
    getContainer?: () => HTMLElement,
    onOk?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    okText?: string,
    okType?: ButtonType,
    okButtonProps?: object,
    confirmLoading?: boolean,
    onCancel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    cancelText?: string,
    cancelType?: ButtonType,
    cancelButtonProps?: object,
    size?: string,
    className?: string,
    wrapClassName?: string,
    header?: React.ReactNode,
    footer?: React.ReactNode,
    afterClose?: () => any,
    destroyOnClose?:boolean,
    closable?: boolean,
    closeIcon?: React.ReactElement,
    mask?: boolean,
    maskClosable?: boolean,
    zIndex?: number,
    show?: boolean,
    children?: React.ReactNode,
    onChangeTitle?: (title: string, index: number) => void 
}

const Modal = (props: ModalProps) => {
    const ref = useRef(null);
    const initRef = useRef({ INIT: false });
    const [currentTitleIndex, setCurrentTitleIndex] = useState(-1);
    const currentTabInfo = useRef({});

    const {
        visible = false,
        title,
        getContainer,
        onOk = (e) => { },
        okText = '确定',
        okType = 'main',
        okButtonProps={},
        confirmLoading = false,
        onCancel = (e) => { },
        cancelText = '取消',
        cancelType='secondary',
        cancelButtonProps={},
        size =SIZE.MEDIUM,
        className = '',
        wrapClassName = '',
        header,
        footer,
        afterClose,
        destroyOnClose=false,
        closable = true,
        closeIcon,
        mask = true,
        maskClosable = false,
        zIndex = 1000,
        show = false,
        children,
        onChangeTitle
    } = props;

    /**多标题切换 */
    const handleTitleCilck = useCallback((item: string, index: number) => {
        const currentEle = ref.current?.getElementsByClassName(`${prefix}-tab-title`)?.[0]?.getElementsByTagName('p')?.[index];
        currentTabInfo.current = currentEle ? { width: currentEle.clientWidth, left: currentEle.offsetLeft } : {};
        setCurrentTitleIndex(index);
        onChangeTitle?.(item, index);
    }, [onChangeTitle]);

    useEffect(() => {
        if (!initRef.current.INIT) {
            initRef.current.INIT = true;
            return;
        }
        if (visible) {
            if(destroyOnClose){
                const timer=setTimeout(()=>{
                    ref.current.style.display = 'block';
                    clearTimeout(timer);
                },animationDuration);
            }else{
                if(ref.current) ref.current.style.display = 'block';
            }
        } else {
            const timer = setTimeout(() => {
                if(!destroyOnClose) ref.current.style.display = 'none';
                afterClose?.();
                clearTimeout(timer);
            }, animationDuration);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, destroyOnClose]);

    useEffect(() => {
        // 仅执行一次，多标题指标初始位置
        setTimeout(()=>{
            if (currentTitleIndex === -1 && Array.isArray(title) && ref.current && visible) {
                const current = ref.current.getElementsByClassName(`${prefix}-tab-title`)[0].getElementsByTagName('p')[0];
                currentTabInfo.current = { width: current.clientWidth, left: current.offsetLeft };
                setCurrentTitleIndex(0);
            }
        },animationDuration);
        
    }, [title, visible,currentTitleIndex]);

    useEffect(() => {
        return () => { ref.current = null; };
    }, []);

    const render = () => <div className={cx(`${prefix}-wrap`, wrapClassName)}>
        <div className={cx(prefix, size, className, visible ? 'zoom-enter' : 'zoom-leave')} style={{ zIndex }} ref={ref}>
            {header !== undefined ? header : (Array.isArray(title) ? (
                <div className={`${prefix}-tab-header`}>
                    <div className={cx(`${prefix}-tab-title`)}>
                        {title.map((item, index) => <p onClick={() => handleTitleCilck(item, index)} className={cx({[`${prefix}-tab-title-active`]: currentTitleIndex === index })} key={item}>{item}</p>)}
                    </div>
                    {closable && (!closeIcon ? <CloseCircleFill className={`${prefix}-close-icon`} onClick={onCancel} /> : closeIcon)}
                    <div style={currentTabInfo.current} className={`${prefix}-tab-bar`} />
                </div>
            ) : (
                <div className={`${prefix}-header`}>
                    <div className={`${prefix}-title`}>{title}</div>
                    {closable && (!closeIcon ? <CloseCircleFill className={`${prefix}-close-icon`} onClick={onCancel} /> : closeIcon)}
                </div>
            ))}
            <div className={`${prefix}-body`}>
                <div className={`${prefix}-content`}>
                    {children}
                </div>
            </div>
            {footer !== null ? <div className={`${prefix}-footer`}>
                {footer || <>
                    <Button type={cancelType} size={size==='mini'?'small':'middle'} {...cancelButtonProps} onClick={onCancel}>{cancelText}</Button>
                    <Button type={okType} size={size==='mini'?'small':'middle'} {...okButtonProps} onClick={onOk} loading={confirmLoading}>{okText}</Button>
                </>}
            </div> : null}
        </div>
    </div>;

    const onMaskClick = maskClosable ? (e)=>{onCancel(e);} : (e) => { };
    return <Mask mask={mask} visible={visible} getContainer={getContainer} style={{ zIndex }} onMaskClick={onMaskClick} show={show} destroyOnClose={destroyOnClose}>
        {render()}
    </Mask>;
};

Modal.confirm = function (config:any={}) {
    const div = document.createElement('div');
    const closeCallback=() => { update({ visible: false });};
    config.onOk = config.onOk ? config.onOk.bind(this, closeCallback) :closeCallback ;
    config.onCancel = config.onCancel ? config.onCancel.bind(this, closeCallback) : closeCallback;
    if(config.header===null&&config.footer===null)config.header=<div className={`${prefix}-info-close`}><CloseCircleFill className={`${prefix}-close-icon`} onClick={config.onCancel} /></div>;

    let currentConfig = { ...config, show: true, visible: true, destroyOnClose: true };

    function render(config) {
        const { content, ...props } = config;
        const timer = setTimeout(() => {
            ReactDOM.render(<Modal {...props} >{content}</Modal>, div);
            clearTimeout(timer);
        });
    }

    function update(configUpdate) {
        if (typeof configUpdate === 'function') {
            currentConfig = configUpdate(currentConfig);
        } else {
            currentConfig = {
                ...currentConfig,
                ...configUpdate,
            };
        }
        render(currentConfig);
    }
    render(currentConfig);
    return { destroy:closeCallback, update };
};

Modal.info = function (config:any={}) {
    const currentConfig = {
        header:null,
        ...config,
        cancelButtonProps:{style:{display:'none'}}
    };
    return Modal.confirm(currentConfig);
};

Modal.miniConfirm = function (config:any={}) {
    const currentConfig = {
        size: 'mini',
        header: null,
        ...config,
    };
    return Modal.confirm(currentConfig);
};

Modal.miniInfo= function (config:any={}){
    const currentConfig = {
        size: 'mini',
        header: null,
        footer: null,
        ...config,
    };
    return Modal.confirm(currentConfig);
};

export default Modal;