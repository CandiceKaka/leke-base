## Modal.method()

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| content | 内容 | ReactNode | - |
| visible | 弹窗是否课件 | boolean | false |
| title | 标题 | ReactNode \| string | - |
| onOk | 点击确定回调 | function(e) | - |
| okText | 确认按钮文字 | string | 确认 |
| okType | 确认按钮类型 | string | primary |
| confirmLoading | 确定按钮 loading | boolean | false |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | - |
| cancelText | 取消按钮文字 | string | 取消 |
| size | 弹窗大小 | string | small \| middle \| large \| xLarge |
| className | 弹窗类名 | string | - |
| wrapClassName | 容器类名 | string | - |
| header | 自定义头部 | ReactNode \| null | - |
| footer | 自定义底部 | ReactNode \| null | - |
| maskClosable | 点击蒙层是否允许关闭 | boolean | false |
| mask | 是否展示蒙版 | boolean | true |
| closable | 是否显示右上角的关闭按钮 | boolean | true |
| closeIcon | 自定义关闭图标 | ReactNode | - |
| zIndex | 设置 Modal 的 z-index | number | 1000 |


以上函数调用后，会返回一个引用，可以通过该引用更新和关闭弹窗:
```javascript
const {update,destroy} = Modal.confirm({
    title:'提示',
    content:'balabala~'
});

update({
    title: '修改的标题',
    content: '修改的内容',
});

update(prevConfig => ({
    ...prevConfig,
    title: `${prevConfig.title}（新）`,
}));

destroy();
```