<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-03-04 10:46:45
 * @LastEditTime: 2021-03-04 10:47:57
-->
---
title: Input.NumberInput API
---

| 参数 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| defaultValue | 默认值 | boolean | - |
| value | 当前值 | boolean | - |
| disabled | 禁用 | boolean | - |
| handleDirection | 操作框形态 | number | 'row' \| 'column' |
| max | 最大值 | number  | Number.MAX_SAFE_INTEGER  |
| min | 最小值 | number  | Number.MIN_SAFE_INTEGER  |
| prefix | 输入框前缀 | ReactNode | - |
| suffix | 输入框后缀 | ReactNode | - |
| size | 输入框大小 | small \| middle \| large | middle |
| step | 每次改变步数 | number | 1 |
| onChange | 变化回调 | function(value:number)=>void | - |