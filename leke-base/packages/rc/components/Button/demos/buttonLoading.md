## 加载中状态

```jsx
import React, {useState} from 'react';
import {Button} from '@leke/rc';
import {Upload} from '@leke/icons';

export default function(){
    const [loadings,setLoadings] = useState([false,false]);

    const DownloadOutlined = () =>{
        return (
            <span className='leke-icon-loading'>
                <Upload />
            </span>
        );
    };

    const handleClick = (index) => {
        const newLoadings = [...loadings];
        newLoadings[index] = true;
        setLoadings(newLoadings);
        setTimeout(()=>{
            setLoadings(data => {
                const newLoadings = [...data];
                newLoadings[index] = false;
                return newLoadings;
            });
        },6000);
    };

    return  <>
        <Button type='main' className='leke-demo-container' loading>按钮</Button>
        <Button 
            type='main' 
            className='leke-demo-container' 
            shape='circle' 
            loading={loadings[0]}
            onClick={() => handleClick(0)} 
            icon={<DownloadOutlined />} />
        <Button 
            type='main' 
            className='leke-demo-container' 
            shape='circle' 
            loading
            icon={<DownloadOutlined />} />
        <Button type='main' className='leke-demo-container' loading={loadings[1]} onClick={() => handleClick(1)}>按钮</Button>
    </>;
}
```
```css
.leke-demo-container{
    margin-right: 8px;
    margin-bottom: 12px;
}
.leke-icon-loading{
    display:inline-block;
    /* vertical-align:middle; */
}
```
