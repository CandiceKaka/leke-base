<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-03-04 10:46:45
 * @LastEditTime: 2021-03-04 10:46:58
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