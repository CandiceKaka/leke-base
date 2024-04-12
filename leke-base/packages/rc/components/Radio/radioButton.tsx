import * as React from 'react';
import Radio from './radio';
import { RadioChangeEvent } from './interface';
import { AbstractCheckboxProps } from './interface';
import RadioGroupContext from './context';

export type RadioButtonProps = AbstractCheckboxProps<RadioChangeEvent>;

const RadioButton = (props: RadioButtonProps) => {
    const radioGroupContext = React.useContext(RadioGroupContext);

    const { prefixCls: customizePrefixCls, ...radioProps } = props;
    const prefixCls = customizePrefixCls || 'leke-button';
    if (radioGroupContext) {
        radioProps.checked = props.value === radioGroupContext.value;
        radioProps.disabled = props.disabled || radioGroupContext.disabled;
    }
    return <Radio prefixCls={prefixCls} {...radioProps} type="radio" />;
};

export default RadioButton;
