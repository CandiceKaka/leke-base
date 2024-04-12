import React, { CSSProperties, ReactNode } from "react";

export interface ITabsProps {
  defaultActiveKey?: string | number;
  children: any;
  centered?: boolean;
  animated?: boolean;
  size?: 'large' | 'default' | 'small';
  type?: "line" | "card" | "editable-card" | "separate";
  tabPosition?: "top" | "right" | "bottom" | "left";
  style?: CSSProperties;
  className?: string,
  activeKey?: string | number;
  addIcon?: ReactNode;
  moreIcon?: ReactNode;
  hideAdd?: boolean;
  tabBarExtraContent?: { left?: ReactNode; right?: ReactNode };
  tabBarGutter?: number;
  tabBarStyle?: CSSProperties;
  onTabClick?: (key: string | number, event: React.MouseEvent<HTMLDivElement | HTMLLIElement, MouseEvent>) => void;
  onTabScroll?: ({ direction, event }: { direction: 'left' | 'right' | 'top' | 'bottom', event: MouseEvent }) => void;
  onChange?: (activeKey: string | number) => void;
  onEdit?: (activeKey: string | number, action: "add" | "remove") => void;
  renderTabBar?: (props: IDefaultTabBar, DefaultTabBar: (props: IDefaultTabBar) => ReactNode) => ReactNode;
}

export interface ITabPaneProps {
  key: string | number;
  tab?: string;
  tabIcon?: ReactNode;
  closeIcon?: ReactNode;
  forceRender?: boolean;
  disabled?: boolean;
  children: any;
  closable?: boolean;
  active?: boolean; 
}


export interface IDefaultTabBar extends ITabsProps {
  ref: any;
  navList: navType[];
  currentTabKey: string | number;
  setCurrentTabKey: any;
  barStyle: {};
  setBarStyle: any;
}

export type navType = ITabPaneProps;

export interface ITabpaneContentProps extends ITabPaneProps {
  tabKey: string | number;
  currentTabKey: string | number;
}