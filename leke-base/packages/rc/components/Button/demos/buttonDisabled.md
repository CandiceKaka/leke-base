## 不可用状态

```jsx
import React from 'react';
import {Button} from '@leke/rc';

export default function(){
    return  <div>
        <div>
            <Button type='main' className='leke-demo-container' disabled>按钮(disabled)</Button>
            <Button className='leke-demo-container' disabled>按钮(disabled)</Button>
            <Button type='secondary' className='leke-demo-container' disabled>按钮(disabled)</Button>
            <Button type='dashed' className='leke-demo-container' disabled>按钮(disabled)</Button>
            <Button type='link' className='leke-demo-container' disabled>按钮(disabled)</Button>
        </div>
        <div>
            <Button type='main' className='leke-demo-container leke-demo-disabled-main' disabled>按钮(lekeDisabled)</Button>
            <Button className='leke-demo-container leke-demo-disabled-default' disabled>按钮(lekeDisabled)</Button>
            <Button type='dashed' className='leke-demo-container leke-demo-disabled-dashed' disabled>按钮(lekeDisabled)</Button>
            <Button type='link' className='leke-demo-container leke-demo-disabled-link' disabled>按钮(lekeDisabled)</Button>
        </div>
    </div>;
}
```
```css
.leke-demo-container{
    margin-right: 8px;
    margin-bottom: 12px;
}
.leke-demo-disabled-main[disabled]:hover,
.leke-demo-disabled-main[disabled]{
    background-color: #bbe9df;
    color: #fff;
}
.leke-demo-disabled-default[disabled]:hover,
.leke-demo-disabled-default[disabled]{
    border: 1px solid #bbe9df;
    color: #bbe9df;
}
.leke-demo-disabled-dashed[disabled]:hover,
.leke-demo-disabled-dashed[disabled]{
    border: 1px dashed  #bbe9df;
    color: #bbe9df;
}
.leke-demo-disabled-link[disabled]:hover,
.leke-demo-disabled-link[disabled]{
    color: #bbe9df;
}
```