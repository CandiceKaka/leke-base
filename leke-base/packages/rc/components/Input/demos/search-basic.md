<!--
 * @Description: 
 * @Author: linchaoting
 * @Date: 2020-11-13 16:16:51
 * @LastEditTime: 2021-03-04 10:19:43
-->
### 搜索框
```jsx
import React from 'react';
import {Input,Select} from '@leke/rc';
import {Remove as SearchIcon} from '@leke/icons';
export default function(){
    const options=[
        {label:'1-1',value:'1-1'},
        {label:'1-2',value:'1-2'},
        {label:'1-3',value:'1-3'},
    ];
    return  <>
        <Input.Search className="outer-search" />
        <br />
        <br />
        <Input.Search enterButton="搜索" className="outer-search" />
        <br />
        <br />
        <Input.Search
            className="outer-search"
            addonBefore={<Select placeholder='资源' options={options} style={{width:'70px'}}/>} 
            enterButton="搜索"
            style={{
                width:'236px'
            }}
        />
    </>;
}
```
```css
.outer-search{
    width:200px
}
.leke-select{
    border-color:#d9d9d9
}
```