<!--
 * @Description:
 * @Author: linchaoting
 * @Date: 2021-01-18 20:38:36
 * @LastEditTime: 2021-02-07 13:44:08
-->

## 代码演示

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://static.leke.cn/scripts/common/player/AudioRecorder.min.js"></script>
</head>
<body>
    <div id="wrap"></div>
</body>
<script>
    window.onload = function () {
        var recorder = new AudioRecorder({
            el: document.getElementById('wrap'),
            duration: 300,
            onStop:(boldFile) => {
                if (!boldFile) {
                    return;
                }
                const reader = new FileReader();
                reader.readAsDataURL(boldFile);
                reader.onload = function (e) {
                    let baseFile = e.target.result;
                    console.log(baseFile)
                    recorder.recorderUpload({
                        method: "post",
                        url: "/auth/global/fs/upload/audio/base64.htm",
                        data:baseFile.split(',')[1],
                    })
                };

            }
        })
        console.log(recorder)
    }
</script>
</html>
```
