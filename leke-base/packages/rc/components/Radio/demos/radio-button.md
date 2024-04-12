---
title: Radio button
description: Radio button样式用法
---
```jsx
import React from 'react';
import { Radio } from '@leke/rc';

export default function(){
    const onChange = e => {
        console.log(`radio checked:${e}`);
    };
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    const style={
        margin:'16px 0'
    };
    return(
        <>
            <div>线框样式：</div>
            <Radio.Group onChange={onChange} defaultValue="c" style={style}>
                <Radio.Button value="a">选项二</Radio.Button>
                <Radio.Button value="b" disabled>未选禁用</Radio.Button>
                <Radio.Button value="c">选中状态</Radio.Button>
                <Radio.Button value="d">选项二</Radio.Button>
            </Radio.Group>
            <Radio.Group onChange={onChange} defaultValue="a" style={style}>
                <Radio.Button value="a" disabled>已选禁用</Radio.Button>
                <Radio.Button value="b" disabled>未选禁用</Radio.Button>
                <Radio.Button value="c" disabled>未选禁用</Radio.Button>
                <Radio.Button value="d" disabled>未选禁用</Radio.Button>
            </Radio.Group>
            <div style={style}>填充样式：</div>
            <Radio.Group onChange={onChange} defaultValue="c" buttonStyle="solid" style={style}>
                <Radio.Button value="a">选项一</Radio.Button>
                <Radio.Button value="b">选项一</Radio.Button>
                <Radio.Button value="c">选中状态</Radio.Button>
                <Radio.Button value="d">选项一</Radio.Button>
            </Radio.Group>
            <Radio.Group onChange={onChange} defaultValue="c" buttonStyle="solid" style={style}>
                <Radio.Button value="a">选项二</Radio.Button>
                <Radio.Button value="b" disabled>未选禁用</Radio.Button>
                <Radio.Button value="c">选中状态</Radio.Button>
                <Radio.Button value="d">选项二</Radio.Button>
            </Radio.Group>
            <Radio.Group onChange={onChange} defaultValue="a" buttonStyle="solid" style={style}>
                <Radio.Button value="a" disabled>已选禁用</Radio.Button>
                <Radio.Button value="b" disabled>未选禁用</Radio.Button>
                <Radio.Button value="c" disabled>未选禁用</Radio.Button>
                <Radio.Button value="d" disabled>未选禁用</Radio.Button>
            </Radio.Group>
        </>
    );
}
```

