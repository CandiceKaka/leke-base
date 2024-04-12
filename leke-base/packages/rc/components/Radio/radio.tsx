import * as React from 'react';
import classNames from 'classnames';
import Checkbox from './checkBox';
import { RadioProps, RadioChangeEvent } from './interface';
import RadioGroupContext from './context';

const InternalRadio: React.ForwardRefRenderFunction<HTMLElement, RadioProps> = (props, ref) => {
    const context = React.useContext(RadioGroupContext);

    const onChange = (e: RadioChangeEvent) => {
        if (props.onChange) {
            props.onChange(e);
        }
    
        if (context.onChange) {
            context.onChange(e);
        }
    };
    const { prefixCls: customizePrefixCls, className, children, style, ...restProps} = props;
    const prefixCls = customizePrefixCls || 'leke-radio';
    const radioProps: any = { ...restProps };
    if (context) {
        radioProps.name = context.name;
        radioProps.onChange = onChange;
        radioProps.checked = props.value === context.value;
        radioProps.disabled = props.disabled || context.disabled;
    }
    const wrapperClassString = classNames(
        `${prefixCls}-wrapper`,
        {
            [`${prefixCls}-wrapper-checked`]: radioProps.checked,
            [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
        },
        className,
    );
    return (
        <label
            className={wrapperClassString}
            style={style}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            <Checkbox {...radioProps} prefixCls={prefixCls} />
            {children !== undefined ? <span>{children}</span> : null}
        </label>
    );
};

const Radio = React.forwardRef<unknown, RadioProps>(InternalRadio);

Radio.displayName = 'Radio';

Radio.defaultProps = {
    type: 'radio',
};

export default Radio;

