---    
title: API
---

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| visible | 是否显示弹层 | boolean | _ |
| disabled | 是否禁用弹层 | boolean | false |
| onVisibleChange | visible变化时的回调 | (visible:boolean)=>void | _ |
| getPopupContainer | 获取弹层渲染父节点 | (triggerNode: HTMLElement)=>HTMLElement | ()=>document.body |
| popup | 菜单集合 | ReactNode\|数组 | popup instanceof Array? {value:string \| number,label:string, divider: boolean, Icon:ReactNode,  disabled:boolean} : ReactNode |
| popupStyle | 弹层样式 | CSSProperties | _ |
| style | 弹层前菜单样式 | CSSProperties | _ |
| type | 设置按钮类型 | main \| dashed \| link \| default \| secondary | default |
| popupClassName | 弹层类名 | string | _ |
| placement | 弹出位置 | "bottomLeft" \| "bottomCenter" \| "bottomRight" \| "topLeft" \| "topCenter" \| "topRight" | "bottomLeft" |
| event | 触发下拉的行为 | Array<"focus" \| "hover" \| "click"> | \["focus"\] |
