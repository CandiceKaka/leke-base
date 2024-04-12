import * as React from 'react';
import classNames from 'classnames';
import { RadioProps } from '../interface';

class Checkbox extends React.Component<any, RadioProps> {
    static defaultProps = {
        prefixCls: 'leke-checkbox',
        className: '',
        style: {},
        type: 'checkbox',
        defaultChecked: false,
        onChange() {},
    };
  
    constructor(props) {
        super(props);
        const checked = 'checked' in props ? props.checked : props.defaultChecked;
        this.state = {
            checked,
        };
    }
  
    static getDerivedStateFromProps(props, state) {
        if ('checked' in props) {
            return {
                ...state,
                checked: props.checked,
            };
        }
        return null;
    }
  
    handleChange = (e) => {
        const { disabled, onChange } = this.props;
        if (disabled) {
            return;
        }
        if (!('checked' in this.props)) {
            this.setState({
                checked: e.target.checked,
            });
        }
        if (onChange) {
            onChange({
                target: {
                    ...this.props,
                    checked: e.target.checked,
                },
                stopPropagation() {
                    e.stopPropagation();
                },
                preventDefault() {
                    e.preventDefault();
                },
                nativeEvent: e.nativeEvent,
            });
        }
    };
  
    render() {
        const {
            prefixCls,
            className,
            style,
            name,
            id,
            type,
            disabled,
            value
        } = this.props;
  
        const { checked } = this.state;
        const classString = classNames(prefixCls, className, {
            [`${prefixCls}-checked`]: checked,
            [`${prefixCls}-disabled`]: disabled,
        });
  
        return (
            <span className={classString} style={style}>
                <input
                    name={name}
                    id={id}
                    type={type}
                    disabled={disabled}
                    className={`${prefixCls}-input`}
                    checked={!!checked}
                    onChange={this.handleChange}
                    value={value}
                />
                <span className={`${prefixCls}-inner`} />
            </span>
        );
    }
}
  
export default  Checkbox;