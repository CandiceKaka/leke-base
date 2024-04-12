---    
title: API
---

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| allowClear | 支持清除 | boolean | false |
| bordered | 是否有边框 | boolean | true |
| clearIcon | 自定义的多选框清空图标 | ReactNode | _ |
| className | 选择器类名 | string | _ |
| defaultValue | 指定默认选中的条目 | string \| string[] \| number \| number[] | _ |
| disabled | 是否禁用 | false | _ |
| empty | 当list为空时的内容 | React.ReactNode | _ |
| fieldNames | 指定条目中的value,label,disabled对应的字段名 | {label?:string,value?:string,disabled?:string} | {label:label,value:value,disabled:disabled} |
| filter | options过滤器 | (opt,searchValue)=>void | _ | 
| getPopupContainer | 获取弹层渲染父节点 | (triggerNode: HTMLElement)=>HTMLElement | ()=>document.body |
| icon | 定义选择器icon | React.ReactNode | _ |
| listHeight | 指定options渲染的最大高度 | number | 244 |
| itemHeight | 指定单个条目的高度 | number | 32 |
| multiple | 是否多选 | false | _ |
| mode | 设置 Select 的模式为多选或标签 | multiple \| tags | _ |
| options | 选择器条目列表 | object[] | _ |
| optionGroups | 分组模式 | {label: string, options: options[] }[] | _ |
| popup | 弹层 | ReactNode | _ |
| popupStyle | 弹层样式 | CSSProperties | _ |
| popupClassName | 弹层类名 | string | _ |
| placement | 弹出位置 | "bottomLeft" \| "bottomCenter" \| "bottomRight" \| "topLeft" \| "topCenter" \| "topRight" | "bottomLeft" |
| placeholder | 选择框默认文本 | string  | _ |
| renderOption | 自定义渲染条目内容 | (opt,searchValue)=>React.ReactNode | _ |
| showSearch | 是否支持搜索 | boolean | false |
| size | 选择框大小 | 'large' \| 'middle' \| 'small' | 'middle' |
| searchValue | 搜索的值 | string | '' |
| style | 选择器样式 | CSSProperties | _ |
| visible | 是否显示弹层 | boolean | _ |
| value | 指定当前选中的条目 | string \| string[] \| number \| number[] | _ |
| width | 预设宽度 | 'smaller' \| 'small' \| 'middle' \| 'long' \| 'longer' \| number | _ |
| onChange | value变化时的回调 | (value,selectedOption)=>void  | _ |
| onSearch | searchValue变化时的回调 | (searchValue)=>void  | _ |
| onVisibleChange | visible变化时的回调 | (visible:boolean)=>void | _ |



