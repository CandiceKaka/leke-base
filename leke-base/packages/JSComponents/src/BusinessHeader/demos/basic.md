
<!--
* @Author: taolixia 
 * @Date: 2021-08-16 14:25:11 
 * @Last Modified by:   taolixia 
 * @Last Modified time: 2021-08-16 14:25:11 
-->

## 代码演示

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="BusinessHeader"></div>
</body>


<!-- import js -->
<script src='https://static.leke.cn/scripts/common/JSComponents/BusinessHeader.min.js'></script>

<script>
  window.onload=function(){

    /*----------------- 常规用法 ---------------*/
    const businessHeader = new BusinessHeader({
      el:document.querySelector('#BusinessHeader'),
      icon:'wrongnote',
      title:'作业',
      projectName:'homework'
    })


    /*----------------- 只使用toolbar ---------------*/
    const businessHeader = new BusinessHeader({
      el:document.querySelector('#BusinessHeader'),
      onlyShowToolbar:true,
      roleId:100
    })
     

    /*----------------- 重新渲染 ---------------*/
    businessHeader.onReRender({
      title:'布置作业'
    })
  }
</script>
</html>
```