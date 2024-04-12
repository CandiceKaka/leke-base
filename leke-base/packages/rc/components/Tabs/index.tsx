/**
 * @author zhoujunda
 * @description Tabs标签页
 */
import React, { useMemo, useRef, useState } from "react";
import cn from 'classnames';
import { More, Plus } from "@leke/icons";
import { useControl } from "@leke/hooks";
import { ITabsProps, navType, ITabPaneProps, IDefaultTabBar } from './types';
import DefaultTabBar from "./DefaultTabBar";
import TabpaneContent from "./TabpaneContent";

const Tabs = (props: ITabsProps) => {
    const { children, onChange, animated, tabPosition, style, type, activeKey, defaultActiveKey, size, renderTabBar, className } = props;
    const tabBarRef = useRef(null);
    const [barStyle, setBarStyle] = useState({}); // bar行内样式
    const [currentTabKey, setCurrentTabKey] = useControl<string | number>(activeKey ? String(activeKey) : undefined, onChange, defaultActiveKey ? String(defaultActiveKey) : undefined); // 当前选中tab的key

    // 导航栏tab数组
    const navList:navType[] = useMemo(() => React.Children.map(children, (item) => {
        if (!item.type.isTabPane) {
            return { key: null, tab: null, children: item };
        }
        const { disabled, closable, tabIcon } = item.props;
        return { key: item.key, tab: item.props.tab, disabled, closable, tabIcon, children: item };
    }).filter(item => item.key !== null),[children]);

    const tabsCls = cn("leke-tabs", `leke-tabs-${tabPosition}`, {
        [`leke-tabs-nav-card`]: ['card','editable-card'].includes(type),
        [`leke-tabs-nav-separate`]: ['separate'].includes(type),
        [`leke-tabs-nav-${size}`]: !!size
    }, className);

    const contentCls = cn("leke-tabs-content", { ["leke-tabs-content-animated"]: animated });

    const defaultProps: IDefaultTabBar = {
        ...props,
        ref: tabBarRef,
        navList,
        currentTabKey,
        setCurrentTabKey,
        barStyle,
        setBarStyle
    };
    
    const currentTabIndex = tabBarRef.current?.currentTabInfo?.current?.index ?? 0;

    return (
        <div className={tabsCls} style={style}>
            { renderTabBar ? renderTabBar(defaultProps, DefaultTabBar) : <DefaultTabBar {...defaultProps}/> }
            <div className="leke-tabs-content-wrap">
                <div style={{ marginLeft: - currentTabIndex * 100 + '%' }} className={contentCls}>
                    {navList.map(item => 
                        <TabpaneContent key={item.key} tabKey={item.key} currentTabKey={currentTabKey} {...item} />
                    )}
                </div>
            </div>
        </div>
    );
};

const TabPane = (props: ITabPaneProps) => {
    const { children } = props;
    return children;
};

TabPane.isTabPane = true;

Tabs.TabPane = TabPane;

TabPane.defaultProps = {
    forceRender: false,
    disabled: false,
    closable: false,
};

Tabs.defaultProps = {
    tabPosition: 'top',
    type: 'line',
    size: 'default',
    centered: false,
    hideAdd: false,
    addIcon: <Plus />,
    moreIcon: <More />
};

export default Tabs;
