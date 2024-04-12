---    
title: 变形标签
---
```jsx
import React from 'react';
import {Tag} from '@leke/rc';
export default function(){
    return  (
        <>
            <Tag className='trans-style-one' text='变形标签' />
            <Tag className='trans-style-two' text='变形标签' />
            <Tag className='trans-style-three' text='变形标签' />
            <br/>
            <Tag className='trans-style-four' text='变形标签' />
            <br/>
            <Tag className='trans-style-five' text='变形标签' />
            <br/>
            <Tag className='trans-style-six' text='变形标签' />
            <Tag className='trans-style-seven' text='新' />
            <Tag className='trans-style-eight' text='荐' />
            <Tag className='trans-style-nine' text='热' />
            <br/>
            <Tag className='trans-style-ten' text='变形标签' />
            <br/><br/>
            <Tag className='trans-style-eleven' text='变形标签' />
            <br/>
            
        </>
    );
}
```
```css
.trans-style-one{
    background: linear-gradient(57deg, #70BAFF 0%, #85A5FF 100%);
    border-radius: 6px 0px 6px 0px;
    color: white;
}
.trans-style-two{
    background: #FFF9E6;
    border-radius: 6px 0px 6px 0px;
    color: #FF9900;
}
.trans-style-three{
    background: #FFF9E6;
    border-radius: 100px 0px 0px 100px;
    color: #FF9900;
}
.trans-style-four{
    background: #000000;
    border-radius: 0px 10px 10px 0px;
    opacity: 0.5;
    color: white;
}
.trans-style-five{
    background: #000000;
    border-radius: 0px 0px 6px 6px;
    opacity: 0.5;
    color: white;
}
.trans-style-six{
    background: #FFF9E6;
    border-radius: 10px;
    color: #FF9900;
}
.trans-style-seven{
    width: 20px;
    height: 20px;
    background: #FF4848;
    border-radius: 4px;
    font-size: 12px;
    color: #FFFFFF;
    padding: 0;
    justify-content: center;
}
.trans-style-eight{
    width: 20px;
    height: 20px;
    background: #479FFF;
    border-radius: 4px;
    font-size: 12px;
    color: #FFFFFF;
    padding: 0;
    justify-content: center;
}
.trans-style-nine{
    width: 20px;
    height: 20px;
    background: #FF9900;
    border-radius: 4px;
    font-size: 12px;
    color: #FFFFFF;
    padding: 0;
    justify-content: center;
}
.trans-style-ten{
    background: #F0F0F0;
    border-radius: 10px;
    color: #595959;
}
.trans-style-eleven{
    background: #FFF9E6;    
    border-radius: 2px 0px 2px 0px;
    color: #FF9900;
    transform: skewY(-30deg);
}
.trans-style-eleven .leke-tag-text{
    transform: skewY(30deg) rotate(-30deg);
}
```