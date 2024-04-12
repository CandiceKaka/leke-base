<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:24:57
 * @LastEditTime: 2021-03-04 10:46:26
-->

---
title: Input API
---

| 参数 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| type | 声明 input 类型，同原生 input 标签的 type属性 | string | text |
| disabled | 禁用 | boolean | - |
| value | 输入框内容 | string | - |
| prefix | 输入框前缀 | ReactNode | - |
| suffix | 输入框后缀 | ReactNode | - |
| defaultValue | 输入框默认内容 | string | - |
| size | 输入框大小 | small \| middle \| large | middle |
| onChange | 输入框内容变化时回调 | function(e) | - |
| onPressEnter | 按下回车的回调 | function(e) | - |
  
### Input.NumberInput

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


### Input.TextArea

| 参数 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| defaultValue | 默认值 | boolean | - |
| value | 当前值 | boolean | - |
| autoSize | 是否自适应高度，也可以限制最小行数和最大行数 | boolean | object | - |
| maxLength | 内容最大长度 | number | - |

Input.TextArea 的其他属性和浏览器自带的 textarea 一致。
