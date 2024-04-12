import React, { useState, useCallback, CSSProperties, useMemo } from "react";
import Popover, { triggerPropsType } from "../Popover";
import classNames from 'classnames';
import OptionList from '../Select/OptionList';
import Menu from '../Menu';
import { useControl } from "@leke/hooks";
import DropdownBtn from './dropdownBtn';
import { Down } from "@leke/icons";
export interface dropdownPropsType extends Omit<triggerPropsType, 'autoSize'|'placement'>{
    placement?:triggerPropsType['placement'],
    listHeight?:number,
    itemHeight?:number,
    popup:any,
    empty?:React.ReactNode,
    fieldNames?:string,
    dropdownRender?:any,
    defaultValue?:any,
    onChange?:()=>any
    value?:any,
    style?:CSSProperties,
    buttonsRender?:any,
    type?:any
}
const defaultFieldNames = {
    label: "label",
    value: "value",
    divider: false,
    content: "content",
    disabled: "disabled",
};
type valueType = Array<number | string> | string | number;
export default function Dropdown(props: dropdownPropsType) {
    const { popupClassName, listHeight, itemHeight, popup, empty, fieldNames, style, disabled, dropdownRender, ...otherProps } = props;
    const [activeIndex, setActiveIndex] = useState(-1);
    const {
        value: valueKey,
        label,
        disabled: disabledKey,
    } = Object.assign({}, defaultFieldNames, fieldNames);
    const [value, onChange] = useControl<valueType>(
        props.value,
        props.onChange,
        props.defaultValue
    );
    const [visible, setVisible] = useControl(
        props.visible,
        props.onVisibleChange,
        false
    );
    function handle(item) {
        if (item[valueKey] !== value) {
            onChange(item[valueKey], item);
            setVisible(false);
        } else setVisible(false);
    }
    const onVisibleChange = useCallback(
        (show) => {
            setVisible(show);
        },
        [setVisible]
    );
    function renderItem(item, index) {
        const selected = value === item[valueKey] || (Array.isArray(value) && value.indexOf(item[valueKey]) !== -1); // 已选择
        const active = activeIndex === index; // 被选中
        const Icon = item['Icon'];

        return (
            <div
                className={classNames(
                    "leke-option",
                    {
                        ["leke-option-active"]: active && !item[disabledKey],
                        ["leke-option-selected"]: selected,
                        ["leke-option-disabled"]: item[disabledKey],
                        ["leke-option-group-item"]: item['groupLabel']
                    }
                )}
                style={{ borderBottom: item.divider ? '1px solid #eee' : '' }}
                key={item[valueKey]}
                onMouseEnter={() => {
                    setActiveIndex(index);
                }}
                onClick={() => {
                    if (item[disabledKey]) {
                        return;
                    }
                    handle(item);
                }}
            >
                <div style={{ display: 'inline-block' }}>
                    {Icon ? <span>{Icon}  {item[label]}</span> : item[label]}
                </div>
            </div>
        );
    }
    const defaultStyle = {
        color: '#1FB5AB',
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
    };

    const renderPopup = useMemo(() => {
        if (popup.type?.displayName !== 'Menu') {
            return popup;
        }
        const getEle = (ele) => React.cloneElement(ele, ele.props, React.Children.map(ele.props?.children, (item) => {
            if (item.type?.displayName === "MenuItemGroup" && item.props?.children) {
                return getEle(item);
            } else if (item.type?.displayName === "SubMenu" && item.props?.children) {
                return (
                    <Dropdown
                        extendPosition={{ x: 4 }}
                        style={{ display: 'block', color: 'initial' }}
                        disabled={item.props?.disabled}
                        placement="rightTop"
                        popup={
                            <Menu>{item.props.children}</Menu>
                        }>
                        <div>
                            {React.cloneElement(item, {
                                expandIcon: <span className="leke-dropdown-submenu-arrow"><Down /></span>,
                                onMouseEnter: (e) => { e.domEvent.stopPropagation(); item.props?.onMouseEnter?.(e); }
                            }, null)}
                        </div>
                    </Dropdown>
                );
            } else if (item.type?.displayName === "MenuItem") {
                return React.cloneElement(item, { onClick: item.props?.onClick || ((e) => { setVisible(false);}) });
            }
            return item;
        }));
        return getEle(popup);
    }, [popup, setVisible]);

    return (
        <div style={{ ...defaultStyle, display: 'inline-block', ...style }}>
            <Popover
                popupClassName={classNames('leke-dropdown', popupClassName)}
                autoSize={true}
                extendPosition={{ y: 4 }}
                {...otherProps}
                visible={visible}
                onVisibleChange={onVisibleChange}
                disabled={disabled}
                popup={
                    popup?.length ? (
                        <OptionList
                            options={popup}
                            renderItem={renderItem}
                            listHeight={listHeight}
                            itemHeight={itemHeight}
                            dropdownRender={dropdownRender}
                        />
                    ) : renderPopup
                }
            />
        </div>
    );
};

Dropdown.defaultProps = {
    bordered: true,
    size: 'middle',
    showArrow: true,
    listHeight: 244,
    itemHeight: 32,
    empty: <div className="leke-select-empty">暂无数据</div>,
};
Dropdown.Button = DropdownBtn;