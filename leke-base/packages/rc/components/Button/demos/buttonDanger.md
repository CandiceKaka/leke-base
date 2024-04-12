## 定制按钮

```jsx
import React from 'react';
import {Button} from '@leke/rc';

export default function(){
    return  <div>
        <div>危险/失败按钮</div>
        <div>
            <Button type='main' className='leke-demo-container leke-demo-danger-primary'>按钮</Button>
            <Button type='main' className='leke-demo-container' disabled>按钮</Button>
        </div>
        <div>
            <Button className='leke-demo-container leke-demo-danger-default'>按钮</Button>
            <Button className='leke-demo-container' disabled>按钮</Button>
        </div>
        <div>
            <Button type='dashed' className='leke-demo-container leke-demo-danger-dashed'>按钮</Button>
            <Button type='dashed' className='leke-demo-container' disabled>按钮</Button>
        </div>
        <div>
            <Button type='link' className='leke-demo-container leke-demo-danger-text'>按钮</Button>
            <Button type='link' className='leke-demo-container' disabled>按钮</Button>
        </div>
        <div>警示/提醒按钮</div>
        <div>
            <Button type='main' className='leke-demo-container leke-demo-warning-primary'>按钮</Button>
            <Button type='main' className='leke-demo-container' disabled>按钮</Button>
        </div>
        <div>
            <Button className='leke-demo-container leke-demo-warning-default'>按钮</Button>
            <Button className='leke-demo-container' disabled>按钮</Button>
        </div>
        <div>
            <Button type='dashed' className='leke-demo-container leke-demo-warning-dashed'>按钮</Button>
            <Button type='dashed' className='leke-demo-container' disabled>按钮</Button>
        </div>
        <div>
            <Button type='link' className='leke-demo-container leke-demo-warning-text'>按钮</Button>
            <Button type='link' className='leke-demo-container' disabled>按钮</Button>
        </div>
    </div>;
}
```
```css
.leke-demo-container{
    margin-right: 8px;
    margin-bottom: 12px;
}
.leke-demo-danger-primary{
    color: #fff;
    border: none;
    background-color: #ff4848;
    
}
.leke-demo-danger-primary::after{
    color: #ff4848;
}
.leke-demo-danger-primary:focus,
.leke-demo-danger-primary:hover{
    background-color: #ff7571;
}
.leke-demo-danger-primary:active{
    background-color: #d93337;
}
.leke-demo-danger-primary-disabled[disabled]:hover,
.leke-demo-danger-primary-disabled[disabled]{
    background-color: #ffc8c2;
    color: #fff;
    cursor: auto;
}

.leke-demo-danger-default{
    color: #ff4848;
    background: transparent;
    border: 1px solid #ff4848;
}
.leke-demo-danger-default:focus,
.leke-demo-danger-default:hover{
    color: #ff7571;
    border-color: #ff7571; ;
}
.leke-demo-danger-default:active{
    color: #d93337;
    border-color: #d93337; ;
}
.leke-demo-danger-default-disabled[disabled]:hover,
.leke-demo-danger-default-disabled[disabled]{
    border: 1px solid #ffc8c2;
    color: #ffc8c2;
    cursor: auto;
}

.leke-demo-danger-dashed{
    color: #ff4848;
    background: transparent;
    border: 1px dashed #ff4848;
}
.leke-demo-danger-dashed:focus,
.leke-demo-danger-dashed:hover{
    color: #ff7571;
    border-color: #ff7571;
}
.leke-demo-danger-dashed:active{
    color: #d93337;
    border-color: #d93337;
}
.leke-demo-danger-dashed-disabled[disabled]:hover,
.leke-demo-danger-dashed-disabled[disabled]{
    border: 1px dashed #ffc8c2;
    color: #ffc8c2;
    cursor: auto;
}

.leke-demo-danger-text{
    color: #ff4848;
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
}
.leke-demo-danger-text:focus,
.leke-demo-danger-text:hover{
    color: #ff7571;
}
.leke-demo-danger-text:active{
    color: #d93337;
}
.leke-demo-danger-text-disabled[disabled]:hover,
.leke-demo-danger-text-disabled[disabled]{
    color: #ffc8c2;
    cursor: auto;
}

@warning-btn-color:#ff9900;
@warning-btn-hover-color:#ffb029;
@warning-btn-click-color:#d97b00;
@leke-warning-btn-disabled:#ffe7a3;

.leke-demo-warning-primary{
    color: #fff;
    border: none;
    background-color: #ff9900;
}
.leke-demo-warning-primary::after{
    color: #ff9900;
}
.leke-demo-warning-primary:focus,
.leke-demo-warning-primary:hover{
    background-color: #ffb029;
}
.leke-demo-warning-primary:active{
    background-color: #d97b00;
}
.leke-demo-warning-primary-disabled[disabled]:hover,
.leke-demo-warning-primary-disabled[disabled]{
    background-color: #ffe7a3;
    color: #fff;
    cursor: auto;
}

.leke-demo-warning-default{
    color: #ff9900;
    background: transparent;
    border: 1px solid #ff9900;
}
.leke-demo-warning-default:focus,
.leke-demo-warning-default:hover{
    color: #ffb029;
    border-color: #ffb029; ;
}
.leke-demo-warning-default:active{
    color: #d97b00;
    border-color: #d97b00; ;
}
.leke-demo-warning-default-disabled[disabled]:hover,
.leke-demo-warning-default-disabled[disabled]{
    border: 1px solid #ffe7a3;
    color: #ffe7a3;
    cursor: auto;
}

.leke-demo-warning-dashed{
    color: #ff9900;
    background: transparent;
    border: 1px dashed #ff9900;
}
.leke-demo-warning-dashed:focus,
.leke-demo-warning-dashed:hover{
    color: #ffb029;
    border-color: #ffb029;
}
.leke-demo-warning-dashed:active{
    color: #d97b00;
    border-color: #d97b00;
}
.leke-demo-warning-dashed-disabled[disabled]:hover,
.leke-demo-warning-dashed-disabled[disabled]{
    border: 1px dashed #ffe7a3;
    color: #ffe7a3;
    cursor: auto;
}

.leke-demo-warning-text{
    color: #ff9900;
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
}
.leke-demo-warning-text:focus,
.leke-demo-warning-text:hover{
    color: #ffb029;
}
.leke-demo-warning-text:active{
    color: #d97b00;
}
.leke-demo-warning-text-disabled[disabled]:hover,
.leke-demo-warning-text-disabled[disabled]{
    color: #ffe7a3;
    cursor: auto;
}
```
