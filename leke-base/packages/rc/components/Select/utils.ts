import { selectPropsType } from "./type";

/**根据宽度预设返回对应宽度 */
export const getPresetWidth: (width: selectPropsType['width']) => number | undefined = (width) => {
    switch(width) {
    case 'smaller':
        return 116;
    case 'small':
        return 240;
    case 'middle':
        return 364;
    case 'long':
        return 488;
    case 'longer':
        return 612;
    default:
        return typeof width === 'number' ? width : undefined;
    }
};

export function toArray(v) {
    return Array.isArray(v) ? v : v !== undefined ? [v] : [];
}