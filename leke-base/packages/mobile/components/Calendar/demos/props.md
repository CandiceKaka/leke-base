---
title: API
---

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- |
| enterDirection | 入场方向 vertical: 垂直 horizontal: 水平 | 'horizontal' \|  'vertical' |	vertical
| locale | 本地化 | Models.Locale | _
| onCancel | 关闭时回调 | () => void | _
| onConfirm | 确认时回调 | (startDateTime?: Date, endDateTime?: Date) => void | _
| prefixCls | 样式前缀 | string |	rmc-calendar
| renderShortcut | 替换快捷选择栏 需要设置showShortcut: true | (select: (startDate?: Date, endDate?: Date) => void) => React.ReactNode | _
| renderHeader | 替换标题栏 | () => React.ReactNode | _
| showShortcut | 快捷日期选择 | boolean |	false
| title | header | string |	{locale.title}
| type | 选择类型 one: 单日 range: 日期区间 | 'one' \| 'range' |	range
| visible | 是否显示 | boolean | false
| defaultDate | 显示开始日期 | Date |	today
| getDateExtra | 日期扩展数据 | (date: Date) => Models.ExtraData | _
| infiniteOpt | 无限滚动优化（大范围选择） | boolean | false
| initalMonths | 初始化月个数 | number | 6
| maxDate | 最大日期 | Date | _
| minDate | 最小日期 | Date | _
| onSelect | 选择区间回调 | (date: Date, state?: [Date \|	undefined, Date \| undefined]) => [Date, Date] \| [Date] \| void	| _
| onSelectHasDisableDate | 选择区间包含不可用日期 | (date: Date[]) => void | _
| rowSize | 行大小 | 'normal' \| 'xl' | _
| defaultValue | 默认日历选择范围 | [Date, Date] \| [Date] | _
| defaultTimeValue | 默认时间选择值 | Date | _


























