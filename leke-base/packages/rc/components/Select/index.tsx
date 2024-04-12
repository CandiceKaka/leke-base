import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Popover from "../Popover";
import OptionList from "./OptionList";
import classNames from "classnames";
import { Down, Close, CloseCircleFill, RecordLoading, Search } from "@leke/icons";
import { useControl } from "@leke/hooks";
import { getPresetWidth, toArray } from "./utils";
import { selectPropsType, valueType } from "./type";

const defaultFieldNames = {
    label: "label",
    value: "value",
    content: "content",
    disabled: "disabled",
};

const eventType: Array<"focus"> = ["focus"];
export default function Select(props: selectPropsType) {
    const {allowClear,loading,clearIcon,placeholder,optionGroups,fieldNames,renderOption,listHeight,itemHeight,style,className,popupStyle,popupClassName,getPopupContainer,dropdownRender,filter,empty,icon,disabled,mode,size,showArrow,bordered,width} = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const selectorRef = useRef<HTMLDivElement>(null);
    const optionListRef = useRef(null);
    const selectedOptionsRef = useRef([]);
    const isHide = useRef(false);
    const [isFocus, setIsFocus] = useState(false);
    const [options, setOptions] = useState([]);
    
    const [searchValue, setSearchValue] = useControl(
        props.searchValue,
        (props.onSearch && props.searchValue) ? props.onSearch : undefined, // props的searchValue 和 onSearch都存在才为完全受控
        ""
    );
    const [visible, setVisible] = useControl(
        props.visible,
        props.onVisibleChange,
        false
    );
    const [value, onChange] = useControl<valueType>(
        props.value,
        props.onChange,
        props.defaultValue
    );
    const [activeIndex, setActiveIndex] = useState(-1);
    const {
        label,
        value: valueKey,
        content,
        disabled: disabledKey,
    } = Object.assign({}, defaultFieldNames, fieldNames);
    const values = toArray(value);
    const multiple = props.multiple || !!mode;
    const showSearch = props.showSearch || mode === 'tags';


    // 筛选list
    const list = useMemo(() => {
        if(filter === false) return options;
        const isTags = mode === 'tags'; // 自定义添加标签模式
        const newList = options.filter((opt) => {
            return typeof filter === "function"
                ? filter(opt, searchValue)
                : opt[label].indexOf(searchValue) > -1;
        });
        if (!newList.length && isTags) {
            newList.push({ label: searchValue, value: searchValue, isTag: true });
        }
        return newList;
    }, [options, searchValue, filter, label, mode]);

    if (value !== undefined && options.length) {
        values.forEach((v, index) => {
            const opt = selectedOptionsRef.current[index];
            if (!opt || v !== opt[valueKey]) {
                selectedOptionsRef.current[index] = options.find(
                    (o) => o[valueKey] === v
                ) || { [valueKey]: v };
            }
        });
    } else {
        selectedOptionsRef.current = [];
    }

    /**点击清空按钮 */
    const handleClear = () => {
        setOptions(v => v.filter(i => !i.isTag));
        onChange();
        setSearchValue("");
    };

    /**选中（反选） */
    function handle(item) {
        if (multiple) {
            const newValues = [...values];
            const index = newValues.indexOf(item[valueKey]);
            if (index !== -1) { // 已存在就移除
                if (item.isTag) {
                    setOptions(v => v.filter(i => i.value !== item.value));
                }
                newValues.splice(index, 1);
                selectedOptionsRef.current.splice(index, 1);
            } else { // 不存在就添加
                if (item.isTag) {
                    setOptions(v => [...v, item]);
                }
                newValues.push(item[valueKey]);
                selectedOptionsRef.current.push(item);
            }
            onChange(newValues, selectedOptionsRef.current);
            setSearchValue("");
        } else if (item[valueKey] !== value) {

            selectedOptionsRef.current = [item];
            onChange(item[valueKey], item);
            inputRef.current.blur();
            setVisible(false);
        } else {
            inputRef.current.blur();
            setVisible(false);
        }
    }
    
    function renderItem(item, index) {
        const selected = value === item[valueKey] || (Array.isArray(value) && value.indexOf(item[valueKey]) !== -1); // 已选择
        const active = activeIndex === index; // 被选中
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
                {typeof renderOption === "function"
                    ? renderOption(item, searchValue)
                    : item[content] || item[label]}
            </div>
        );
    }
    function renderSelector() {
        const selectedOptions = selectedOptionsRef.current;
        if (multiple && selectedOptions.length) {
            return selectedOptions.map((item) => {
                return (
                    <span className="leke-select-tag" key={item[valueKey]}>
                        <span className="leke-select-tag-text">{item[label]}</span>
                        <Close
                            className="leke-icon-close"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handle(item)}
                        />
                    </span>
                );
            });
        }
        if (searchValue) {
            return null;
        }
        if (selectedOptions.length === 1) {
            const item = selectedOptions[0];
            return (
                <div key={item[valueKey]} className="leke-select-text">
                    {item[label]}
                </div>
            );
        }
        return <span className="leke-select-placeholder">{placeholder}</span>;
    }

    const onVisibleChange = useCallback(
        (show) => {
            isHide.current = !show;
            setVisible(show);
            if (!show) {
                setSearchValue('');
            }
        },
        [setVisible,setSearchValue]
    );

    function onMouseDown(e) {
        e.preventDefault();
        if (!inputRef.current) {
            return;
        }
        if (document.activeElement !== inputRef.current) {
            inputRef.current.focus();
        }
        if(visible) { // 对于已打开的弹窗，再次点击就关闭
            inputRef.current.blur();
        }
        const searchBox: HTMLDivElement = selectorRef.current.querySelector(
            ".leke-select-search-content"
        );
        searchBox.style.maxWidth = selectorRef.current.offsetWidth + "px";
    }
    function onKeyDown(e) {
        if (
            !visible || !optionListRef.current || list.findIndex((item) => !item[disabledKey]) === -1
        ) {
            return;
        }
        const keyCode = e.keyCode;
        const maxIndex = list.length - 1;
        if (keyCode === 38) {
            e.preventDefault();
            const newIndex = (function () {
                let index = activeIndex;
                do {
                    index = index - 1 < 0 ? maxIndex : index - 1;
                } while (list[index][disabledKey]);
                return index;
            })();
            setActiveIndex(newIndex);
            optionListRef.current.scrollToIndex(newIndex);
        } else if (keyCode === 40) {
            e.preventDefault();
            const newIndex = (function () {
                let index = activeIndex;
                do {
                    index = index + 1 > maxIndex ? 0 : index + 1;
                } while (list[index][disabledKey]);
                return index;
            })();
            setActiveIndex(newIndex);
            optionListRef.current.scrollToIndex(newIndex);
        } else if (keyCode === 13) {
            const item = list[activeIndex];
            if (item) {
                e.preventDefault();
                handle(item);
            }
        }
    }

    useEffect(() => {
        if (optionGroups) {
            setOptions(optionGroups.reduce((t, i) => t.concat(i.options.map(v => ({...v, groupLabel: i.label}))), []));
            return;
        }
        setOptions(props.options);
    },[optionGroups, props.options]);

    useEffect(() => {
        if(!isHide.current && props.searchValue === undefined) {
            isHide.current = false;
            props.onSearch?.(searchValue);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchValue]);
    const readOnly = !showSearch || disabled;
    return (
        <Popover
            autoSize
            placement="bottomLeft"
            eventType={eventType}
            popupStyle={popupStyle}
            getPopupContainer={getPopupContainer}
            visible={visible}
            onVisibleChange={onVisibleChange}
            disabled={disabled}
            extendPosition={{ y: 4 }}
            popupClassName={classNames({['leke-select-popup-null']: !list.length && !empty}, popupClassName)}
            popup={
                list.length ? (
                    <OptionList
                        ref={optionListRef}
                        options={list}
                        renderItem={renderItem}
                        listHeight={listHeight}
                        itemHeight={itemHeight}
                        dropdownRender={dropdownRender}
                    />
                ) : (
                    empty
                )
            }
        >
            <div
                className={classNames(
                    "leke-select",
                    `leke-select-${size}`,
                    {
                        ["leke-select-multiple"]: multiple,
                        ["leke-select-open"]: visible,
                        ["leke-select-disabled"]: disabled,
                        ["leke-select-show-search"]: showSearch,
                        ["leke-select-borderless"]: !bordered,
                    },
                    className
                )}
                style={{ width: getPresetWidth(width), ...style }}
                onMouseDown={onMouseDown}
            >
                <div className="leke-select-flex">
                    <div
                        ref={selectorRef}
                        className="leke-select-selector"
                        style={{ marginLeft: values.length && multiple ? 4 : "" }}
                    >
                        {renderSelector()}
                        <div className="leke-select-search">
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchValue || ''}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={onKeyDown}
                                readOnly={readOnly}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                style={{ opacity: readOnly ? "0" : "" }}
                            />
                            <div className="leke-select-search-content">{searchValue}</div>
                        </div>
                    </div>
                    {loading ? (
                        <RecordLoading className="leke-icon-loading" />
                    ) : (
                        <>
                            {showArrow && icon === undefined ? (
                                showSearch && isFocus ? <Search className="leke-icon-search" /> : <Down className="leke-icon-down" />
                            ) : (
                                icon
                            )}
                            {allowClear && !disabled && value && clearIcon === undefined ? (
                                <CloseCircleFill
                                    onClick={handleClear}
                                    className="leke-icon-clear"
                                />
                            ) : (
                                clearIcon
                            )}
                        </>
                    )}
                </div>
            </div>
        </Popover>
    );
}

Select.defaultProps = {
    bordered: true,
    size: 'middle',
    showArrow: true,
    listHeight: 244,
    itemHeight: 32,
    empty: <div className="leke-select-empty">暂无数据</div>,
};
