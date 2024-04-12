---
title: API
---

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- |
| className | 自定义alert的class | string | undefined |
| style | css样式 | CSSProperties | undefined |
| type | Alert的类型 | 枚举 success \| info \| warning \|error | info |
| closeIcon | 不传入时使用默认配置的close图标，传入null可清除图标 | ReactNode | undefined |
| title | 标题 | ReactNode | undefined |
| message | Alert消息 | ReactNode | undefined |
| action | 可扩展用户的自定义操作选项 | ReactNode | undefined |
| icon | 不传入时使用默认配置的图标，传入null可清除图标 | ReactNode | undefined |
| afterClose | 关闭Alert后 | () => void | undefined |