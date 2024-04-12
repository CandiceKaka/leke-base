---    
title: API
---

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| visible | 是否显示弹层 | boolean | _ |
| onVisibleChange | visible变化时的回调 | (visible:boolean)=>void | _ |
| getPopupContainer | 获取弹层渲染父节点 | (triggerNode: HTMLElement)=>HTMLElement | ()=>document.body |
| popup | 弹层 | ReactNode | _ |
| popupStyle | 弹层样式 | CSSProperties | _ |
| popupClassName | 弹层类名 | string | _ |
| placement | 弹出位置 | "bottomLeft" \| "bottomCenter" \| "bottomRight" \| "topLeft" \| "topCenter" \| "topRight" \| "leftTop" \| "leftCenter" \| "leftBottom" \| "rightTop" \| "rightCenter" \| "rightBottom" \| "bottomLeft" |
| eventType | 触发下拉的行为 | Array<"focus" \| "hover" \| "click"> | \["hover"\] |
| autoSize | 是否根据触发器自动设置minWidth或者minHeight | boolean | _ |
| customAnimation | 自定义动画类 | { enter: string, exit: string } | _ |



