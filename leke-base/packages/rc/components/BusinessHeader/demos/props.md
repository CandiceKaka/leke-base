---
title: API
---

## 业务头的props说明

|参数|说明|类型|默认值|
|----|----|----|----|
|onlyShowToolbar|只显示toolbar悬浮操作栏,需要配合传一个roleId（默认100）(新增)|boolean|false|
|projectName|项目名称(必须传)|string|' '|
|icon|业务icon|string|' '|
|title|业务标题|string|' '|
|extraTitle|额外的标题内容|string|' '|
|subs|一级子标题|array|[ ]|
|activeKey|高亮的一级标题名|string|''|
|defaultSubs|默认一级子标题(默认配置项)，需要自定义时设为false，并与subs同时使用|boolean|true|
|hide|是否隐藏业务头|boolean|false|
|hideToolbar|是否隐藏toolbar悬浮操作栏|boolean|false|
|hidePhoto|是否隐藏右侧用户信息|boolean|false|
|fullScreen|全屏业务头(左右不留空隙)|boolean|false|
|saveUserInfo|获取用户信息|function(value)|
|renderHeader|控制header自定义组件渲染|React.ReactNode|-|
|hideSecondary|是否隐藏二级标题|boolean|false|
|onReRender|重新渲染，需先new实例(新增)|(newProps)=>void|-|

## subs（具体请见例子）

|参数|说明|类型|
|----|----|----|
|roleId|角色id|number|
|menus|当前角色下的一级子标题|array|

## menus（具体请见例子）

|参数|说明|类型|
|----|----|----|
|key|子标题名|string|
|url|子标题链接|string|
|urls(不建议使用，将被废弃)|当前子标题下所有的需要高亮显示的链接情况|array|
|data|该标题请求的接口链接|string|
|defaultActive(不建议使用，将被废弃)|是否高亮(true-高亮，false-不高亮)|boolean|


## 业务头的图片类型和title名（详细参数请参考以下表格）

|icon|title|picture|
|----|----|----|
|default|默认|![default](https://static.leke.cn/images/common/header/defaultlogo.png)  |
|prepareclass|预习|![prepareclass](https://static.leke.cn/images/common/header/prepareclass.png)|
|studyreport|学习报告|![studyreport](https://static.leke.cn/images/common/header/studyreport.png)|
|review|复习|![review](https://static.leke.cn/images/common/header/review.png)|
|microclassthrough|微课通|![microclassthrough](https://static.leke.cn/images/common/header/microclassthrough.png)|
|brushquestionking|提分王|![brushquestionking](https://static.leke.cn/images/common/header/brushquestionking.png)|
|preparelessons|备课|![preparelessons](https://static.leke.cn/images/common/header/preparelessons.png)|
|testicon|考试|![testicon](https://static.leke.cn/images/common/header/testicon.png)|
|homework|作业|![homework](https://static.leke.cn/images/common/header/hosework.png)|
|wrongnote|错题本|![wrongnote](https://static.leke.cn/images/common/header/wrongnote.png)|
|noteicon|笔记|![noteicon](https://static.leke.cn/images/common/header/noteicon.png)|
|answer|乐答|![answer](https://static.leke.cn/images/common/header/answer.png)|
|teachingdiagnosis|教学诊断|![teachingdiagnosis](https://static.leke.cn/images/common/header/teachingdiagnosis.png)|
|officesystem|办公系统|![officesystem](https://static.leke.cn/images/common/header/officesystem.png)|
|airclass|乐桃学院|![airclass](https://static.leke.cn/images/common/header/airclass.png)|
|classmanagement|班务管理| ![classmanagement](https://static.leke.cn/images/common/header/classmanagement.png) |
|financialcontrol|财务管理|![financialcontrol](https://static.leke.cn/images/common/header/financialcontrol.png)|
|learningtomonitor|学情监控|![learningtomonitor](https://static.leke.cn/images/common/header/learningtomonitor.png)|
|educationaladministration|教务管理|![educationaladministration](https://static.leke.cn/images/common/header/educationaladministration.png)|
|monitoringofteaching|教学监控|![monitoringofteaching](https://static.leke.cn/images/common/header/monitoringofteaching.png)|
|pluponform|平台管理|![pluponform](https://static.leke.cn/images/common/header/pluponform.png)|
|schoolclass|校园课堂|![schoolclass](https://static.leke.cn/images/common/header/schoolclass.png)|
|train|教师研修|![train](https://static.leke.cn/images/common/header/train.png)|
|financialstatistics|财务管理|![financialstatistics](https://static.leke.cn/images/common/header/financialstatistics.png)|
|preparecheck|预习检查|![preparecheck](https://static.leke.cn/images/common/header/preparecheck.png)|
|resource|资源库(我的、区域、学校)|![resource](https://static.leke.cn/images/common/header/resource.png)|
|homemanage|主页管理|![homemanage](https://static.leke.cn/images/common/header/homemanage.png)|
|selectlesson|选课排课|![selectlesson](https://static.leke.cn/images/common/header/selectlesson.png)|
|evaluation|智慧评价|![selectlesson](https://static.leke.cn/images/common/header/evaluation.png)|
|teacherDynamics|老师动态|![teacherDynamics](https://static.leke.cn/images/common/header/teachDynamics.png)|
|studentDynamics|学生动态|![studentDynamics](https://static.leke.cn/images/common/header/teachDynamics.png)|
|classGroup|班级分组|![classGroup](https://static.leke.cn/images/common/header/classGroup.png)|

## 角色id

|roleId|角色名|
|----|----|
| 100 |学生|
| 101 |老师|
| 102 |家长|
| 103 |班主任|
| 104 |教务|
| 105 |校长|
| 106 |学校教研|
| 108 |公司领导|
| 109 |教育局长|
| 110 |技术支持|
| 111 |运维人员|
| 112 |客户经理|
| 113 |助教|
| 114 |运营人员|
| 115 |教育局财务|
| 120 |年级组长|
| 121 |学科组长|
| 122 |评价管理者|
| 200 |平台管理员|
| 300 |平台财务|
| 301 |学校财务|
| 400 |题库录入员|
| 401 |题库审核员|
| 402 |教研员|
| 403 |教研主管(题库管理员)|
| 500 |教研总监(施课)|
| 501 |教研经理(施课)|
| 502 |教研员(施课)|
| 503 |课件制作(施课)|
| 504 |督导主任(施课)|
| 505 |课程主管(施课)|
| 506 |课程顾问(施课)|
| 599 |施课编辑(施课)|
| 600 |助理总经理|
| 601 |区域经理|
| 602 |市场经理|
| 603 |营销处经理|
| 604 |营销中心总经理|