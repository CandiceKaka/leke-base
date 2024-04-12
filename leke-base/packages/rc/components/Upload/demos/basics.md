---    
title: 基本用法
---

```jsx
import React from 'react';
import {Upload,Button} from '@leke/rc';

export default function(){
    return(
        <Upload 
            url={'https://yapi.leke.cn/mock/629/upload'}
            onSuccess={res=>console.log(res)}
        >
            <Button>上传文件</Button>
        </Upload>
    );
}
```

