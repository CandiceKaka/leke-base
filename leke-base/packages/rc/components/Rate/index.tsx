/**
 * @author zhoujunda
 * @description Rate评分
 */
import React, { FC, memo, ReactNode, useCallback, useMemo, useRef } from "react";
import classnames from "classnames";
import {Star} from '@leke/icons';
import { IRateProps, TRatePropsType, TCharacterType } from './type';
import { useControl } from "@leke/hooks";

const Rate: FC<IRateProps> = memo(
    ({ count, allowClear, allowHalf, defaultValue, disabled, value, onChange, onHoverChange, className, character }) => {
        const [source, setSource] = useControl(value, onChange, defaultValue);
        const [hoverSource, setHoverSource] = useControl(undefined, onHoverChange, value ?? defaultValue);
        const isHover = useRef(false);

        /**点选 */
        const handleClick = useCallback((newSource: number) => {
            if(disabled) return;

            // 相同表示清空
            if (allowClear && source === newSource) {
                newSource = 0;
            }

            setSource(newSource);
            setHoverSource(newSource);
        },[allowClear, source, disabled, setHoverSource, setSource]);
        
        /**悬浮 */
        const handleHover = useCallback((newSource) => {
            if (disabled) return;
            setHoverSource(newSource);
        },[setHoverSource, disabled]);

        /**hover移入事件监听 */
        const onMouseEnter = () => {
            isHover.current = true;
        };

        /**hover移出事件监听 */
        const onMouseLeave = () => {
            isHover.current = false;
            setHoverSource(0);
        };
        
        // 容器样式
        const containerClass = useMemo(() => classnames('leke-rate-container', {
            ['leke-rate-disabled']: disabled,
            [className]: !!className
        }), [disabled, className]);
        
        /**渲染star */
        const renderStar = (i) => {
            let RateComponent: TCharacterType = character || <Star />;

            if (character && Object.prototype.toString.call(character) === '[object Function]') {
                RateComponent = (character as (rateProps: TRatePropsType) => ReactNode)({ index: i });
            }
            
            const topStarClass = classnames('leke-rate-ele-top',{
                ['leke-rate-ele-top-full']: i + 1 <= (isHover.current ? hoverSource : source), // 满星
                ['leke-rate-ele-top-half']: i + 0.5 === (isHover.current ? hoverSource : source), // 半星
                ["leke-rate-ele-top-hover"]: isHover.current && hoverSource !== source, // 悬浮
            });
            const halfSource = allowHalf ? i + 0.5 : i + 1;
            return (
                <>
                    <div className="leke-rate-ele-bottom">
                        {RateComponent}
                    </div>
                    <div className={topStarClass}>
                        {RateComponent}
                    </div>
                    <div className="leke-rate-ghost-ele-half"  onClick={() => handleClick(halfSource)} onMouseEnter={() => handleHover(halfSource)}></div>
                    <div className="leke-rate-ghost-ele" onClick={() => handleClick(i + 1)} onMouseEnter={() => handleHover(i + 1)}></div>
                </>
            );
        };

        return <div className={containerClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {Array(count).fill('').map((_, i) => (
                <div key={i} className="leke-rate-ele">
                    {renderStar(i)}
                </div>
            ))}
        </div>;
    }
);

Rate.defaultProps = {
    count: 5,
    allowClear: true,
    allowHalf: false,
    disabled: false
};

export default Rate;
