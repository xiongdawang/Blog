# 前端表格数据导出 CSV 文件

## 实例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>save csv</title>
</head>

<body>
    <button type="button" id="download">下载</button>
    <script>
        // 数据格式
        let data = "姓名,年龄,性别\r\n小红,10,女\r\n小明,12,男";

        // 数据保存为 CSV 文件
        function saveToCSV(data, filename) {

            // excel不能识别无BOM的UTF-8编码，需要转为带BOM的UTF-8编码，就是在文件头加上\ufeff
            const dataBlob = new Blob([`\ufeff${data}`], { type: 'text/plain;charset=utf-8' });

            const downloadFilename = filename + '.csv';

            if (typeof MouseEvent === 'function') {
                const url = window.URL.createObjectURL(dataBlob);

                const $a = document.createElement('a');
                $a.download = downloadFilename;
                $a.target = '_blank';
                $a.href = url;

                var evt = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: false
                });
                $a.dispatchEvent(evt);
                window.URL.revokeObjectURL(url);
            } else if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveBlob(dataBlob, downloadFilename);
            }
        }

        // 下载按钮
        document.querySelector('#download').addEventListener('click', () => {
            saveToCSV(data, '测试导出为Excel文件');
        });
    </script>
</body>

</html>
```

## 参考

[填坑:前端导出csv文件](https://www.jianshu.com/p/cc36ee9ab95e?utm_campaign)
