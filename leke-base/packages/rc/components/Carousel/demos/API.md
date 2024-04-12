---    
title: API
---
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| autoplay | 是否自动切换 | boolean | true |
| dots | 是否显示面板指示点 | boolean | true |
| dotType | 面板指示点样式 | "circle"\|"line" | "line" |
| type | 切换面板时的动画类型 | "slide"\|"fade" | "slide" |
| arrowControl | 显示左右箭头控制器 | boolean | false |
| arrowType | 箭头控制器类型 | "line" \| "default" | default |
| arrowStyle | 箭头控制器样式 | CSSProperties | _ |
| interval | 切换面板的时间间隔 | number | 3000 |
| style | 容器样式 | CSSProperties | _ |
| className | 容器类名 | string | _ |
| direction | type="slide"时，规定切换面板的动画方向 | "left"\|"right"\|"up"\|"down" | "left" |
| beforeChange | 切换面板之前的回调 | function(from, to) | _ |

## ref
| 属性 | 说明 | 类型 |
| --- | --- | --- |
| dom | 容器的dom节点 | HTMLDivElement |
| goTo | 切换至指定面板 | (currentIndex:number \| ((index:number)=>number))=>newIndex |
