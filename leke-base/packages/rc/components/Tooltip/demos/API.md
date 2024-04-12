---    
title: API
---

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| style | 样式 | CSSProperties | _ |
| className | 类名 | string | _ |
| visible | 是否显示弹层 | boolean | false |
| arrowPointAtCenter | 箭头指向中心 | boolean | false |
| popup | 弹层 | ReactNode \| string | _ |
| placement | 弹出位置 | 'bottomLeft' \| 'bottomCenter' \| 'bottomRight' \| 'topLeft' \| 'topCenter' \| 'topRight' \| 'leftCenter' \| 'leftTop' \| 'leftBottom' \| 'rightCenter' \| 'rightTop' \| 'rightBottom' | bottomLeft |
| eventType | 触发提示的行为 | Array<"focus" \| "hover" \| "click"> | \["hover"\] |
| onVisibleChange | visible变化时的回调 | (visible:boolean)=>void | _ |
| getPopupContainer | 获取弹层渲染父节点 | (triggerNode: HTMLElement)=>HTMLElement | ()=>document.body |