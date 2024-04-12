
```jsx
import React,{useState,useEffect} from 'react';
import {BusinessHeader} from '@leke/rc';

export default function(){
    const [title,setTitle] = useState('作业');
    useEffect(()=>{
        setTimeout(() => {
            setTitle('备课');
        }, 1000);
    },[]);
    return <BusinessHeader 
        projectName='homework'
        renderHeader={()=><div onClick={()=>{console.log('自定义事件');}} style={{color:'#fff'}} className='custom'>自定义Header{title}</div>}
    />;
        
}
```