## props
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| count | star 总数 | number | 5 |
| allowClear | 是否允许再次点击后清除 | boolean | true |
| allowHalf | 是否允许半选 | boolean | true |
| disabled | 只读，无法进行交互 | boolean | false |
| defaultValue | 默认值 | number | _ |
| value | 当前数，受控值 | number | _ |
| onChange | 选择时的回调 | function() | _ |
| onHoverChange | 鼠标经过时数值变化的回调 | function() | _ |
| character | 自定义字符 | ReactNode \| (RateProps) => ReactNode | _ |
| className | 自定义样式类名 | string | _ |