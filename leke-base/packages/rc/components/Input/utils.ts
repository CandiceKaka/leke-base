/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:33:54
 * @LastEditTime: 2021-03-19 14:19:44
 */
/**
 * @deprecated 使用 omit 包代替
 * @description: 去除对象上的指定属性
 * @param {Object} object
 * @param {string[]} fields
 * @return Object
 */
export function omit(object:Object,fields:string[]):Object {
    const shallowCopy = Object.assign({},object);
    for (const key of fields) {
        if (Object.prototype.hasOwnProperty.call(shallowCopy, key)) {
            delete shallowCopy[key];
        }
    }
    return shallowCopy;
}

interface NodeType {
    sizingStyle: string;
    paddingSize: number;
    borderSize: number;
    boxSizing: string;
}
const SIZING_STYLE = [
    'letter-spacing',
    'line-height',
    'padding-top',
    'padding-bottom',
    'font-family',
    'font-weight',
    'font-size',
    'font-variant',
    'text-rendering',
    'text-transform',
    'width',
    'text-indent',
    'padding-left',
    'padding-right',
    'border-width',
    'box-sizing',
];

/**
 * @description: 获取节点大小属性
 * @param {HTMLElement} node
 * @return NodeType
 */
export function calculateNodeStyling(node: HTMLElement) {
    const style = window.getComputedStyle(node);
    
    const boxSizing =
        style.getPropertyValue('box-sizing') ||
        style.getPropertyValue('-moz-box-sizing') ||
        style.getPropertyValue('-webkit-box-sizing');
  
    const paddingSize =
        parseFloat(style.getPropertyValue('padding-bottom')) +
        parseFloat(style.getPropertyValue('padding-top'));
  
    const borderSize =
        parseFloat(style.getPropertyValue('border-bottom-width')) +
        parseFloat(style.getPropertyValue('border-top-width'));
  
    const sizingStyle = SIZING_STYLE.map(
        (name) => `${name}:${style.getPropertyValue(name)}`,
    ).join(';');
  
    const nodeInfo: NodeType = {
        sizingStyle,
        paddingSize,
        borderSize,
        boxSizing,
    };
  
    return nodeInfo;
}


const HIDDEN_TEXTAREA_STYLE = `
    min-height:0 !important;
    max-height:none !important;
    height:0 !important;
    visibility:hidden !important;
    overflow:hidden !important;
    position:absolute !important;
    z-index:-1000 !important;
    top:0 !important;
    right:0 !important`;

let hiddenTextareaNode = null;
export function calculateNodeHeight(
    textareaNode: HTMLTextAreaElement,
    minRows: number | null = null,
    maxRows: number | null = null,
) {
    if (!hiddenTextareaNode) {
        hiddenTextareaNode = document.createElement('textarea');
        hiddenTextareaNode.setAttribute('tab-index', '-1');
        hiddenTextareaNode.setAttribute('aria-hidden', 'true');
        document.body.appendChild(hiddenTextareaNode);
    }
  
    const {
        paddingSize,
        borderSize,
        boxSizing,
        sizingStyle,
    } = calculateNodeStyling(textareaNode);
  
    hiddenTextareaNode.setAttribute(
        'style',
        `${HIDDEN_TEXTAREA_STYLE};${sizingStyle};`,
    );
    hiddenTextareaNode.value = textareaNode.value || textareaNode.placeholder || '';
  
    let minHeight = Number.MIN_SAFE_INTEGER;
    let maxHeight = Number.MAX_SAFE_INTEGER;
    let height = hiddenTextareaNode.scrollHeight;
    let overflowY: string;
  
    if (boxSizing === 'border-box') {
        height += borderSize;
    } else if (boxSizing === 'content-box') {
        height -= paddingSize;
    }
  
    if (minRows !== null || maxRows !== null) {
        hiddenTextareaNode.value = ' ';
        const singleRowHeight = hiddenTextareaNode.scrollHeight - paddingSize;
        if (minRows !== null) {
            minHeight = singleRowHeight * minRows;
            if (boxSizing === 'border-box') {
                minHeight = minHeight + paddingSize + borderSize;
            }
            height = Math.max(minHeight, height);
        }
        if (maxRows !== null) {
            maxHeight = singleRowHeight * maxRows;
            if (boxSizing === 'border-box') {
                maxHeight = maxHeight + paddingSize + borderSize;
            }
            overflowY = height > maxHeight ? '' : 'hidden';
            height = Math.min(maxHeight, height);
        }
    }
    return { height, minHeight, maxHeight, overflowY };
}


// 获取小数精度
export const getPrecision = (value:number)=>{
    const valueString = String(value);
    if (valueString.indexOf('e-') >= 0) {
        return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
    }
    let precision = 0;
    if (valueString.indexOf('.') >= 0) {
        precision = valueString.length - valueString.indexOf('.') - 1;
    }
    return precision;
};
