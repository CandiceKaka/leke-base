/**
 * @author zhoujunda
 * @description Switch开关组件
 * @updated ###### Fri Dec 25 15:25:10 PHT 2020
 */
import React, { FC, memo, ReactNode } from "react";
import classNames from "classnames";
import { useControl } from "@leke/hooks";
import { Loading } from "@leke/icons";
interface SwitchProps {
  autoFocus?:boolean;
  checked?:boolean;
  checkedChildren?:ReactNode;
  className?:string;
  defaultChecked?:boolean;
  disabled?:boolean;
  loading?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  size?:'default' | 'small';
  unCheckedChildren?:string;
  onChange?:(checked, e?) =>void;
  onClick?:(checked, e) =>void;
}

const Switch: FC<SwitchProps> = memo(({ autoFocus, size, checked: checkedProp, defaultChecked, disabled, className, loading, checkedChildren, unCheckedChildren, onChange, onClick, onKeyDown, ...props }) => {
    const [checked, setChecked] = useControl(checkedProp,onChange,defaultChecked);
    disabled = loading || disabled;
  
    function onToggle(
        newChecked: boolean,
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
    ) {
        let mergedChecked = checked;

        if (!disabled) {
            mergedChecked = newChecked;
            setChecked?.(mergedChecked, event);
        }
  
        return mergedChecked;
    };
    
    function onHandler(e) {
        const ret = onToggle(!checked, e);
        onClick?.(ret, e);
    };

    function onInternalKeyDown(e) {
        if (e.keyCode === 37) {
            // 左箭头控制
            onToggle(false, e);
        } else if (e.keyCode === 39) {
            // 右箭头控制
            onToggle(true, e);
        }
        onKeyDown?.(e);
    };
    
    const switchProps = {
        ...props,
        autoFocus,
        onClick: onHandler,
        onKeyDown: onInternalKeyDown,
        className: classNames("leke-switch", {
            ['leke-switch-small']: size === 'small',
            ['leke-switch-checked']: checked,
            ['leke-switch-disabled']: disabled,
        }, className)
    };

    return (
        <button {...switchProps}>
            <div className="leke-switch-handle">
                {
                    loading ?
                        <Loading className="leke-switch-loading" />
                        : null
                }
            </div>
            <span className="leke-switch-inner">
                {checked ? checkedChildren : unCheckedChildren}
            </span>
        </button>
    );
});

Switch.defaultProps = {
    autoFocus: false,
    defaultChecked:false,
    disabled:false,
    loading:false,
    size: 'default',
};

export default Switch;
