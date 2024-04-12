/**
 * @author zhoujunda
 * @description DefaultTabBar 默认标签页头
 */
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import cn from 'classnames';
import { Close } from "@leke/icons";
import { addMouseWheel, removeMouseWheel, returnTabPositionAttribute } from './utils';
import { IDefaultTabBar, navType } from './types';
import Popover from "../Popover";

const DefaultTabBar = forwardRef((props: IDefaultTabBar, ref: any) => {
    const { navList, centered, tabPosition, type, onEdit, addIcon, moreIcon, hideAdd, tabBarExtraContent, setCurrentTabKey, currentTabKey, setBarStyle, barStyle, tabBarGutter, tabBarStyle, onTabClick, onTabScroll } = props;
    const navRef = useRef(null); // tab导航元素
    const scrollEventLister = useRef(null); // 滚动监听 
    const currentTabInfo = useRef({
        key: null, // 选中nav的key
        index: null, // 选中nav的下标
        currentEle: null // 选中的元素
    }); // 当前选中tab样式
    const maxScrollLength = useRef(-1); // 最大滚动长度
    const [scrollLength, setScrollLength] = useState(0); // 滚动长度
    const [isShowScroll, setIsShowScroll] = useState(false); // 是否显示滚动
    const allowEdit = type === 'editable-card'; // 是否允许编辑

    useImperativeHandle(ref, () => ({
        currentTabInfo
    }));

    // 不同方向布局配置
    const postionOpt = useMemo(() => returnTabPositionAttribute(tabPosition), [tabPosition]);

    /**编辑回调 */
    const handleEdit = useCallback((key, action, e) => {
        onEdit?.(key, action);
        e.stopPropagation();
    }, [onEdit]);

    /**判断元素是否在可见区域 */
    const isInVisibleArea = useCallback((ele) => {
        if (isShowScroll && (ele[postionOpt.start] + scrollLength) < navRef.current[postionOpt.start]) {
            return { status: false, type: 1 }; // 左边
        }
        if (isShowScroll && (ele[postionOpt.start] + ele[postionOpt.length] + scrollLength) > (navRef.current[postionOpt.start] + navRef.current[postionOpt.length])) {
            return { status: false, type: 2 }; // 右边
        }
        return { status: true, type: 0 };
    }, [scrollLength, postionOpt, isShowScroll]);

    /**跳转交互 */
    const scrollToTab = useCallback((key, index) => {
        const currentEle = navRef.current.getElementsByClassName(`leke-tabs-nav-item-text`)[index];
        currentTabInfo.current = {
            ...currentTabInfo.current,
            index,
            key
        };
        setBarStyle(currentEle ? postionOpt.barStyle(currentEle[postionOpt.length], currentEle[postionOpt.start]) : {});
        const visibleType = isInVisibleArea(currentEle);
        if (visibleType.status) {
            return;
        }
        if (visibleType.type === 1) {
            setScrollLength(-currentEle[postionOpt.start]);
        } else if (visibleType.type === 2) {
            setScrollLength(-currentEle[postionOpt.start] - currentEle[postionOpt.length] + navRef.current[postionOpt.length]);
        }
    }, [isInVisibleArea, postionOpt, setBarStyle]);

    /**tab点击切换 */
    const handleTitleCilck = useCallback((item: navType, index: number, e: React.MouseEvent<HTMLDivElement | HTMLLIElement, MouseEvent>) => {
        onTabClick?.(item.key, e);
        if (item.disabled) return;
        if (item.key !== currentTabKey) {
            setCurrentTabKey(item.key);
        }
        scrollToTab(item.key, index);
    }, [setCurrentTabKey, scrollToTab, onTabClick, currentTabKey]);

    /**鼠标移入事件 */
    const onMouseEnter = useCallback(() => {
        if (!isShowScroll) return;
        // 监听滚动事件
        scrollEventLister.current = (e) => {
            onTabScroll?.({ direction: tabPosition, event: e });
            setScrollLength(v => {
                const isPlus = e.wheelDelta ? e.wheelDelta > 0 : e.detail ? e.detail < 0 : false;
                const newLength = isPlus ? v + 100 : v - 100;
                const maxLength = maxScrollLength.current = navRef.current.getElementsByClassName('leke-tabs-nav-list')?.[0]?.[postionOpt.scroll] - navRef.current[postionOpt.length];
                return newLength > 0 ? 0 : newLength < -maxLength ? -maxLength : newLength;
            });
            e?.preventDefault?.();
        };
        addMouseWheel(navRef.current, scrollEventLister.current);
    }, [isShowScroll, postionOpt, tabPosition, onTabScroll]);

    /**鼠标移除事件 */
    const onMouseLeave = useCallback(() => {
        removeMouseWheel(navRef.current, scrollEventLister.current);
    }, []);

    // 内容变化监听
    useEffect(() => {
        if (!navRef.current) return;

        if (currentTabInfo.current.key === null) {
            // 第一次进来,初始化
            if (navList.length) {
                const key = currentTabKey ? String(currentTabKey) : navList[0]?.key; // 初始key
                let index = navList.findIndex(item => item.key === key);
                index = index === -1 ? 0 : index; // 初始下标

                const currentEle = navRef.current.getElementsByClassName(`leke-tabs-nav-item-text`)[index];
                currentTabInfo.current = {
                    ...currentTabInfo.current,
                    key,
                    index,
                    currentEle
                };
                setBarStyle(postionOpt.barStyle(currentEle[postionOpt.length], currentEle[postionOpt.start]));
                setCurrentTabKey(key);
            }
        } else {
            const index = navList.findIndex(item => item.key === currentTabKey);
            // 再次进来,表示内容有更新
            if (navList.length && index !== -1) {
                // 滚动到当前选中的tab
                scrollToTab(currentTabKey, index);
            }

            if (isShowScroll) {
                // 校正是否超出最大和最小长度
                setScrollLength(v => {
                    const maxLength = maxScrollLength.current = navRef.current?.getElementsByClassName('leke-tabs-nav-list')?.[0]?.[postionOpt.scroll] - navRef.current[postionOpt.length];
                    return v > 0 ? 0 : v < -maxLength ? -maxLength : v;
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navList, postionOpt]);

    // 监听是否显示更多下拉（同步渲染效果较好）
    useLayoutEffect(() => {
        // 判断是否超出
        if (navRef.current) {
            setIsShowScroll(navRef.current.getElementsByClassName('leke-tabs-nav-list')?.[0]?.[postionOpt.scroll] - navRef.current[postionOpt.length] > 0);
        }
        const onResize = () => {
            setIsShowScroll(navRef.current?.getElementsByClassName?.('leke-tabs-nav-list')?.[0]?.[postionOpt.scroll] - navRef.current?.[postionOpt.length] > 0);
        };
        // 监听窗口变化，重新计算
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [postionOpt, navList]);

    // 监听布局变化
    useEffect(() => {
        const { key, index } = currentTabInfo.current;
        if (index === null) return;
        scrollToTab(key, index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postionOpt]);

    // 渲染增加按钮
    const renderAdd = useMemo(() => {
        return allowEdit && !hideAdd ? (
            <button className="leke-tabs-add-button" onClick={(e) => handleEdit('add', 'add', e)}>
                {addIcon}
            </button>
        ) : null;
    }, [allowEdit, addIcon, hideAdd, handleEdit]);

    // 渲染更多下拉框
    const renderMoreDrop = useMemo(() => {
        if (!isShowScroll) return;
        const showMoreNavList = [];
        const navItemList = navRef.current.getElementsByClassName(`leke-tabs-nav-item`);
        for (let i = 0; i < navItemList.length; i++) {
            // 判断在可见区域外
            if (!!navList[i] && !isInVisibleArea(navItemList[i]).status) {
                const item = {
                    ...navList[i],
                    index: i
                };
                showMoreNavList.push(item);
            }
        }
        return (
            <ul className="leke-tabs-nav-more">
                {showMoreNavList.map(item => (
                    <li className={cn({ ['leke-tabs-nav-more-disabled']: item.disabled })} key={item.key} onClick={(e) => handleTitleCilck(item, item.index, e)}>
                        {item.tab}
                    </li>
                ))}
            </ul>
        );
    }, [isShowScroll, isInVisibleArea, navList, handleTitleCilck]);

    // 渲染导航
    const renderNav = navList.map((item, index) => {
        const { key, disabled, tab, closable, tabIcon } = item;
        const cls = cn('leke-tabs-nav-item', {
            [`leke-tabs-nav-active`]: currentTabKey === key,
            [`leke-tabs-nav-disabled`]: disabled
        });
        return (
            <div key={key} onClick={(e) => handleTitleCilck(item, index, e)} className={cls} style={postionOpt.tabBarGutterStyle(tabBarGutter)}>
                { tabIcon ? <span>
                    <span className="leke-tabs-nav-item-icon">{tabIcon}</span>
                    <span className="leke-tabs-nav-item-text" title={tab}>{tab}</span>
                </span> : <span className="leke-tabs-nav-item-text" title={tab}>{tab}</span>}
                {(allowEdit && !closable && !disabled) && (
                    <div onClick={(e) => handleEdit(key, 'remove', e)} className="leke-tabs-tabpane-close-icon">
                        <Close />
                    </div>
                )}
            </div>
        );
    });

    const navListCls = cn("leke-tabs-nav-list", { ["leke-tabs-nav-list-center"]: centered });

    const navWrapCls = cn("leke-tabs-nav-wrap", {
        ["leke-tabs-nav-wrap-ping-left"]: isShowScroll && scrollLength !== 0,
        ["leke-tabs-nav-wrap-ping-right"]: isShowScroll && scrollLength !== -maxScrollLength.current
    });

    return (
        <div className="leke-tabs-nav" style={tabBarStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {tabBarExtraContent?.left || null}
            <div ref={navRef} className={navWrapCls}>
                <div className={navListCls} style={{ transform: postionOpt.transform(scrollLength) }}>
                    {renderNav}
                    {!isShowScroll && renderAdd}
                    <div style={barStyle} className="leke-tabs-nav-bar" />
                </div>
            </div>
            {isShowScroll && (
                <>
                    <Popover
                        popup={renderMoreDrop}
                    >
                        <div className="leke-tabs-more-btn">
                            {moreIcon}
                        </div>
                    </Popover>
                    {renderAdd}
                </>
            )}
            {tabBarExtraContent?.right || null}
        </div>
    );
});

export default DefaultTabBar;
