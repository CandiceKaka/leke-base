
```jsx
import React from 'react';
import {BusinessHeader} from '@leke/rc';

export default function(){
    const subs = [{
        roleId: 101, // 角色id
        menus: [{
            key: '智能排课', // 需要高亮的业务头
            url:  'https://lesson.leke.cn/auth/provost/paike/manage/taskManage.htm', // 高亮业务头点击后跳转的地址
            defaultActive: true, // 开启高亮
        }]
    }];
    return <BusinessHeader 
        icon={'selectlesson'}
        title={'选课排课'}
        extraTitle='这是一段描述文字'
        projectName='homework'
        subs={subs}
        defaultSubs={false}
    />;
}
```