
```jsx
import React from 'react';
import {BusinessHeader} from '@leke/rc';

export default function(){
    return <BusinessHeader 
        icon={'preparelessons'}
        title={'备课'}
        extraTitle='这是一段描述文字'
        projectName='homework'
        defaultSubs={false}
        hideSecondary={true}
        activeKey='章节备课'
    />;
}
```