type placementType =
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

export function setPopupPosition(popup:HTMLElement, trigger:HTMLElement, placement:placementType) {
    const top = popup.offsetTop;
    const left = popup.offsetLeft;
    const height = popup.offsetHeight;
    const width = popup.offsetWidth;
    const transverse = 22;  //左右偏移量
    const portrait = 14;    //上下偏移量
    const triggerWidth = trigger.offsetWidth;
    const triggerHeight = trigger.offsetHeight;
    const topAndBottom = triggerWidth / 2 - transverse;
    const leftAndRight = triggerHeight / 2 - portrait;
    switch (placement) {
    case "topLeft":
        popup.style.left = left + topAndBottom + 'px';
        popup.parentElement.style.transformOrigin = left + topAndBottom + 'px bottom';
        break;
    case "topRight":
        popup.style.left = left - topAndBottom + 'px';
        popup.parentElement.style.transformOrigin = left - topAndBottom + width + 'px bottom';
        break;
    case "bottomLeft":
        popup.style.left = left + topAndBottom + 'px';
        popup.parentElement.style.transformOrigin = left + topAndBottom + 'px top';
        break;
    case "bottomRight":
        popup.style.left = left - topAndBottom + 'px';
        popup.parentElement.style.transformOrigin =  left - topAndBottom + width + 'px top';
        break;
    case "leftTop":
        popup.style.top = top + leftAndRight + 'px';
        popup.parentElement.style.transformOrigin = 'right ' + top + leftAndRight + 'px';
        break;
    case "leftBottom":
        popup.style.top = top - leftAndRight + 'px';
        popup.parentElement.style.transformOrigin = 'right ' + (top - leftAndRight + height) + 'px';
        break;
    case "rightTop":
        popup.style.top = top + leftAndRight + 'px';
        popup.parentElement.style.transformOrigin = 'left ' + top + leftAndRight + 'px';
        break;
    case "rightBottom":
        popup.style.top = top - leftAndRight + 'px';
        popup.parentElement.style.transformOrigin = 'left ' + (top - leftAndRight + height) + 'px';
        break;
    }
}