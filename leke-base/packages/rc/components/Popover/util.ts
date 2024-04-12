import { triggerPropsType } from ".";

export type placementType=
    'topLeft'|
    'topCenter'|
    'topRight'|
    'bottomLeft'|
    'bottomCenter'|
    'bottomRight'|
    'leftTop'|
    'leftCenter'|
    'leftBottom'|
    'rightTop'|
    'rightCenter'|
    'rightBottom'

function getPosition(trigger:HTMLElement,container:HTMLElement) {
    let left=0,top=0;
    let offsetElement=trigger;
    while (offsetElement&&offsetElement!==container){
        left+=offsetElement.offsetLeft;
        top+=offsetElement.offsetTop;
        offsetElement=offsetElement.offsetParent as HTMLElement;
    }
    return {
        left,
        top,
        bottom:top+trigger.offsetHeight,
        right:left+trigger.offsetWidth
    };
}
export function setPopupPosition(popup:HTMLElement,trigger:HTMLElement,container:HTMLElement,placement:placementType,extendPosition:triggerPropsType['extendPosition']) {
    const {top,bottom,left,right}=getPosition(trigger,container);
    const {x = 0, y = 0} = extendPosition || {}; // 偏移量控制
    switch (placement) {
    case "topLeft":
        popup.style.top = top - y - popup.offsetHeight + 'px';
        popup.style.left = left - x + 'px';
        break;
    case "topRight":
        popup.style.top = top - y - popup.offsetHeight + 'px';
        popup.style.left=left - x+trigger.offsetWidth-popup.offsetWidth + 'px';
        break;
    case "topCenter":
        popup.style.top = top - y - popup.offsetHeight + 'px';
        popup.style.left = (trigger.offsetWidth-popup.offsetWidth)/2+left - x + 'px';
        break;
    case "bottomLeft":
        popup.style.top = bottom + y + 'px';
        popup.style.left = left - x + 'px';
        break;
    case "bottomRight":
        popup.style.top = bottom + y + 'px';
        popup.style.left=left - x+trigger.offsetWidth-popup.offsetWidth + 'px';
        break;
    case "bottomCenter":
        popup.style.top = bottom + y + 'px';
        popup.style.left = (trigger.offsetWidth-popup.offsetWidth)/2+left - x + 'px';
        break;
    case "leftTop":
        popup.style.top = top - y + 'px';
        popup.style.left = left - x-popup.offsetWidth + 'px';
        break;
    case "leftCenter":
        popup.style.top = (trigger.offsetHeight-popup.offsetHeight)/2+top - y + 'px';
        popup.style.left = left - x-popup.offsetWidth + 'px';
        break;
    case "leftBottom":
        popup.style.top = bottom + y  - popup.offsetHeight + 'px';
        popup.style.left = left - x-popup.offsetWidth + 'px';
        break;
    case "rightTop":
        popup.style.top = top - y + 'px';
        popup.style.left = right + x + 'px';
        break;
    case "rightCenter":
        popup.style.top = (trigger.offsetHeight-popup.offsetHeight)/2+top - y + 'px';
        popup.style.left = right + x + 'px';
        break;
    case "rightBottom":
        popup.style.top = bottom + y  - popup.offsetHeight + 'px';
        popup.style.left = right + x + 'px';
        break;
    }
}