import React, { useEffect } from "react";
import cn from 'classnames';
import { ITabpaneContentProps } from './types';

const TabpaneContent = (props:ITabpaneContentProps) => {
    const { currentTabKey, tabKey, children, forceRender } = props;
    const cls = cn("leke-tabs-tabpane", {
        ["leke-tabs-tabpane-hide"]: tabKey !== currentTabKey
    });
    const [visited, setVisited] = React.useState(forceRender);

    useEffect(() => {
        if(tabKey === currentTabKey) {
            setVisited(true);
        }
    },[currentTabKey, tabKey]);
    return (
        <div className={cls}>
            {(visited || tabKey === currentTabKey ) && children}
        </div>
    );
};

export default TabpaneContent;