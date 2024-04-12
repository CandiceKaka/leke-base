import { dropdownPropsType } from "../Dropdown";

export type valueType = Array<number | string> | string | number;

export interface selectPropsType<T = any>
    extends Omit<dropdownPropsType, "popup" | "children" | "eventType"> {
    allowClear?: boolean;
    bordered?: boolean;
    loading?: boolean;
    defaultValue?: valueType;
    value?: valueType;
    placeholder?: string | React.ReactNode;
    multiple?: boolean;
    mode?: 'multiple' | 'tags';
    optionGroups?: {
        label: string;
        options: T[];
    }[],
    options: T[];
    fieldNames?: {
        label?: string;
        value?: string;
        disabled?: string;
    };
    renderOption?: (item: T, searchContent: string) => React.ReactNode;
    listHeight?: number;
    itemHeight?: number;
    onChange?: (v: valueType, opt: any) => void;
    style?: React.CSSProperties;
    className?: string;
    showSearch?: boolean;
    searchValue?: string;
    onSearch?: (v: string) => void;
    filter?: ((opt: T, v: string) => void )| boolean;
    empty?: React.ReactNode;
    icon?: React.ReactNode;
    clearIcon?: React.ReactNode;
    disabled?: boolean;
    size?: 'large' | 'middle' | 'small';
    width?: 'smaller' | 'small' | 'middle' | 'long' | 'longer' | number;
    showArrow?: boolean;
    dropdownRender?: (originNode: React.ReactNode) => React.ReactNode
}