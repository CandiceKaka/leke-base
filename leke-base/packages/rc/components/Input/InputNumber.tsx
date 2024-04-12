import React from 'react';
import classNames from "classnames";
import omit from 'omit.js';
import { getPrecision } from './utils';
import { SizeType } from "./interface";
import {Down,Up,Plus,Minus} from "@leke/icons";
interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'prefix'|'size'|'onChange'>{
  className?:string,
  defaultValue?:number,
  disabled?:boolean,
  handleDirection?: 'column' | 'row',
  max?:number,
  min?:number,
  prefix?:React.ReactNode,
  size?:SizeType,
  step?:number,
  suffix?:React.ReactNode,
  value?:number,
  onBlur?:()=>void,
  onChange?:(val:string)=>void,
  onFocus?:()=>void,
  parser?:(val:string)=>string,
  formatter?:(val:string)=>string
}

const baseCls = 'leke-input-number';

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 2 ** 53 - 1;

const defaultParser = (str:string)=>{
    return str.replace(/[^\w.-]+/g, '');
};

const InputNumber:React.FC<InputNumberProps> = (props) => {
    const {
        className,
        disabled,
        defaultValue,
        handleDirection,
        max:maxValue,
        min:minValue,
        prefix,
        step,
        size,
        suffix,
        value,
        onBlur,
        onFocus,
        onChange,
        formatter,
        parser
    } = props;

    const [focus, setFocus] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>(()=>defaultValue?String(defaultValue):'0');
    
    // 文本框展示的数值
    const displayInputValue:string = React.useMemo(() => {
        let formatValue = inputValue;
        if (formatter) {
            formatValue = formatter(formatValue);
        }
        return formatValue;
    },[inputValue,formatter]);

    const maxPrecision:number = React.useMemo(() => {
        return Math.max(
            getPrecision(value),
            getPrecision(step),
            getPrecision(maxValue),
            getPrecision(minValue),
            getPrecision(Number(inputValue))
        );
    }, [value,step, minValue, maxValue,inputValue]);

    React.useEffect(() => {
        if (value!==undefined && value!==null) {
            setInputValue(String(value));
        }
    }, [value]);

    const getInputClassName:()=>string = () => {
        const inputClassName = classNames(className,{
            [`${baseCls}-sm`]:size==="small",
            [`${baseCls}-lg`]:size==="large",
            [`${baseCls}-clear-padding`]:handleDirection==="row",
            [`${baseCls}-disabled`]:disabled,
            [`${baseCls}-focus`]:focus
        });
        return inputClassName;
    };

    const onInputNumberFocus:React.FocusEventHandler = (e) => {
        setFocus(true);
        onFocus&&onFocus();
    };
    const onInputNumberBlur:React.FocusEventHandler = (e) => {
        setFocus(false);
        onBlur&&onBlur();
        // 失焦时修正 input 值
        handleValueChange(inputValue,true);
    };

    const onStepClk=(type:string,stepValue:number)=> (e:React.MouseEvent) => {
        if(disabled) return;
        let _inputValue = Number.parseFloat(inputValue);
        if (type==='up') {
            // 当数字框为空时，用一个合适的值作为初始值
            if (inputValue === '') return handleValueChange(String(Math.max(minValue,0)),true);
            if (+inputValue>=maxValue) return;
            _inputValue = +inputValue+stepValue;
        }else if(type==='down'){
            if (inputValue === '') return handleValueChange(String(Math.min(maxValue,100)),true);
            if (+inputValue<=minValue) return;
            _inputValue = +inputValue-stepValue;
        }
        handleValueChange(Number(_inputValue).toFixed(maxPrecision));
    };

    const onInputChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        handleValueChange(parser(e.target.value));
    };

    const handleValueChange= (textValue:string,strict:boolean = false) => {
        let result = textValue;
        if (strict) {
            result = getValidateDisplayValue(textValue);
        }
        setInputValue(pre=>{
            let val = pre;
            if (value===undefined) {
                val = result;
            }
            if (pre!==result) {
                onChange&&onChange(result);
            }
            return val;
        });
        
    };

    const getValidateDisplayValue = (value:string,min:number=minValue,max:number=maxValue) => {
        const validValue = Number.parseFloat(value);
        if (Number.isNaN(validValue)) return '';
        if(validValue<min) return String(min);
        if(validValue>max) return String(max);
        return String(validValue);
    };

    const getDefaultInput = (cls='')=>{
        return (<input
            {...omit(props,['className','placeholder','size','prefix','defaultValue','formatter','handleDirection','type','value','onBlur','onChange','onFocus','parser'])}
            className={classNames('input-number',cls)}
            type='text'
            value={displayInputValue}
            onChange={onInputChange}
            onFocus={onInputNumberFocus}
            onBlur={onInputNumberBlur}
        />);
    };

    if (suffix || prefix) {
        return (
            <div className={classNames(`${baseCls}`,getInputClassName())}>
                {
                    prefix&&<div className={`${baseCls}-prefix-wrap`}>{prefix}</div>
                }
                {
                    getDefaultInput()
                }
                {
                    suffix&&<div className={`${baseCls}-suffix-wrap`}>{suffix}</div>
                }
                
            </div>
        );
    }
    return (
        <div className={classNames(`${baseCls}`,getInputClassName())}>
            {
                handleDirection==='row'?<>
                    <div className={classNames(`${baseCls}-handle-prefix-wrap`)} onClick={onStepClk('down',step)}>
                        <Minus />
                    </div>
                    {getDefaultInput(classNames('input-number-center',{
                        [`input-number-sm`]:size==="small",
                        [`input-number-lg`]:size==="large",
                    }))}
                    <div className={classNames(`${baseCls}-handle-suffix-wrap`)} onClick={onStepClk('up',step)}>
                        <Plus />
                    </div>
                </>:<>
                    <div className={`${baseCls}-handle-wrap`}>
                        <span
                            className={classNames(`${baseCls}-handle-up`,{
                                [`${baseCls}-handle-up-disabled`]:+inputValue>=maxValue && inputValue!==''
                            })}
                            onClick={onStepClk('up',step)}>
                            <Up />
                        </span>
                        <span
                            className={classNames(`${baseCls}-handle-down`,{
                                [`${baseCls}-handle-down-disabled`]:+inputValue<=minValue && inputValue!==''
                            })}
                            onClick={onStepClk('down',step)}>
                            <Down />
                        </span>
                    </div>
                    {getDefaultInput()}
                </>
            }
            
        </div>
    );
    
};
InputNumber.defaultProps={
    step:1,
    max:MAX_SAFE_INTEGER,
    min:-MAX_SAFE_INTEGER,
    parser:defaultParser,
    handleDirection:'column'
};

export default InputNumber;
