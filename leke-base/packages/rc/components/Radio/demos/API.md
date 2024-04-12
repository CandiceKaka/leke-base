---    
title: API
---
---    
title: Radio/Radio.Button
---

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| checked | 指定当前是否选中 | boolean | false |
| defaultChecked | 初始是否选中 | boolean | false |
| disabled | 禁用 Radio | boolean | false |
| value | 根据 value 进行比较，判断是否选中 | any | - |

## RadioGroup.

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| value | 用于设置当前选中的值 | any | - | 
| defaultValue | 默认选中的值 | any | - |
| disabled | 禁选所有子单选器 | boolean | false |
| options | 以配置形式设置子元素 | string[] | Array<{ label: string value: string disabled?: boolean }> | - |
| size | 大小，只对按钮样式生效 | large  middle  small | - |
| onChange | 选项变化时的回调函数 | function(val:选中值) | - | 

