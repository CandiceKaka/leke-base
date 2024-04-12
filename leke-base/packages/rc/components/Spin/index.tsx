/**
 * @author zhoujunda
 * @description Spin加载中
 * @updated ###### Fri Jan 15 09:38:39 PHT 2021
 */
import React, { CSSProperties, FC, memo, ReactNode, useEffect, useRef, useState } from "react";
import DefaultIndicator from "./DefaultIndicator";
import classNames from "classnames";
interface ISpinProps {
    delay?: number;
    indicator?: ReactNode;
    size?: "small" | "default";
    spinning?: boolean;
    tip?: string;
    wrapperClassName?: string;
    children?: ReactNode;
    style?: CSSProperties;
}

const Spin: FC<ISpinProps> = memo(
    ({ size, spinning, wrapperClassName, tip, indicator, children, delay, style, ...props }) => {
        const [loading, setLoading] = useState(false);
        const timer = useRef<NodeJS.Timeout>();

        /**渲染默认指示器 */
        const renderSpin = () =>
            loading && (
                <div className="leke-spin-bg" style={style} {...props}>
                    {!!indicator ? indicator : <DefaultIndicator size={size} />}
                    {!!tip && <p className="leke-spin-tip">{tip}</p>}
                </div>
            );

        /**监听开关以及延迟 */
        useEffect(() => {
            if (delay) {
                timer.current = setTimeout(() => {
                    setLoading(spinning);
                }, delay);
                return () => {
                    clearTimeout(timer.current);
                    timer.current = null;
                };
            }
            setLoading(spinning);
        }, [delay, spinning]);

        return children ? (
            <div className={classNames("leke-spin-wrapper", wrapperClassName)} {...props}>
                {renderSpin()}
                <div
                    className={classNames("leke-spin-container", {
                        ["leke-spin-blur"]: loading,
                    })}
                >
                    {children}
                </div>
            </div>
        ) : (
            renderSpin()
        );
    }
);

Spin.defaultProps = {
    spinning: true,
    size: "default"
};

export default Spin;
