---    
title: API
---

| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| title | 标题 | string | null |
| menuList | 菜单列表 | array<{lable,url, [blank]}> | null |
| userInfo | 用户信息，未登录时传入null，对应接口地址：/auth/global/tutor/common/getMiniMenu.htm | object \| null | _ |
| messageCount | 消息数量，对应接口地址：/auth/global/notice/common/todo/findNoticeAndAfficheNum.htm| number | _ |
