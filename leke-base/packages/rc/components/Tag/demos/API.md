---    
title: API
---
| 属性 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| text | 标签展示内容 | string | - | 是 |
| colorType | 预设标签类型 | string | - | 否 |
| icon | 标签左侧图标 | ReactNode | - | 否 |
| closable | 是否可关闭 | boolean | - | 否 |
| onClose | 标签关闭时的回调 | ()=>void | - | 否 |
| visible | 控制标签显示或隐藏 | boolean | true | 否 |
| onClick | 标签点击时的回调 | ()=>void | - | 否 |
| className | 自定义样式名称 | string | - | 否 |
| ref | 接管dom | RefObject\<HTMLDivElement\> | - | 否 |
