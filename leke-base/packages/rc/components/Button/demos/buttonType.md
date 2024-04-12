## 按钮类型

```jsx
import React, {useRef} from 'react';
import {Button} from '@leke/rc';

export default function(){
    const myRef = useRef(null);

    return  <>
        <Button ref={myRef}  type='main' className='leke-demo-container'>主按钮（main）</Button>
        <Button className='leke-demo-container'>默认按钮（default）</Button>
        <Button type='secondary' className='leke-demo-container'>次按钮（secondary）</Button>
        <Button type='dashed' className='leke-demo-container'>虚线按钮（dashed）</Button>
        <Button type='link' className='leke-demo-container'>文字按钮（link）</Button>
    </>;
}
```

```css
.leke-demo-container{
    margin-right: 8px;
    margin-bottom: 12px;
}
```
