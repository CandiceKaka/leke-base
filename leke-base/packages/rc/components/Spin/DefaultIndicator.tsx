import React, { FC, memo } from "react";
import classNames from "classnames";

interface IDefaultIndicatorProps {
    size?: "small" | "default";
}

const DefaultIndicator: FC<IDefaultIndicatorProps> = memo(({ size }) => {
    const props = {
        className: classNames("leke-spin-animation", {
            ['leke-spin-animation-small']: size === 'small',
        }),
    };

    return (
        <div {...props}>
            <i className="leke-spin-dotC"></i>
            <i className="leke-spin-dotD"></i>
            <i className="leke-spin-dotA"></i>
            <i className="leke-spin-dotB"></i>
        </div>
    );
});

export default DefaultIndicator;
