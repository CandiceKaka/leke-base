---    
title: API
---

```
const countRef = useRef(null)

useAnimation({
    ref,
    open,
    type,
    enter,
    entering,
    entered,
    exit,
    exiting,
    exited,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
})

```

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ref | 需要绑定动画的元素 | RefObject\<HTMLElement\> | _ |
| type | 动画类型 | "animation" \| "transition" | "animation" |
| open | 进入动画/退出动画 | boolean | _ |
| enter | 进入动画的类名 | string | - |
| entering | 进入动画过程中的类名 | string | - |
| entered | 进入动画结束的类名 | string | - | 
| exit | 退出动画的类名 | string | - |
| exiting | 退出动画过程中的类名 | string | - |
| exited | 退出动画结束后的类名 | string | - |
| on\[event\]| 监听事件 | ()=>void | - |


