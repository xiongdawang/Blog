## HTML5拖拽

### 简介
HTML 拖放接口使应用程序能够在Firefox和其他浏览器中使用拖放功能。例如，通过这些功能，用户可以使用鼠标选择可拖动元素，将元素拖动到可放置元素，并通过释放鼠标按钮来放置这些元素。可拖动元素的一个半透明表示在拖动操作期间跟随鼠标指针。

对于网站、扩展以及 XUL 应用程序来说，你可以自定义能够成为可拖拽的元素类型、可拖拽元素产生的反馈类型，以及可放置的元素。

### 目标是否可拖动
让一个元素被拖动需要添加 draggable 属性，再加上全局事件处理函数ondragstart 
```
<p id="p1" draggable="true" ondragstart="dragstart_handler(event);">This element is draggable.</p>
```

### 拖拽事件
在拖放过程中发触发如下事件：

    在拖动目标上触发的事件：
    ondragstart: 当用户开始拖动一个元素或选中的文本时触发
    ondrag: 当拖动元素或选中的文本时触发
    ondragend: 当拖拽操作结束时触发 
    释放目标时触发的事件：
    ondragenter: 当拖动元素或选中的文本到一个可释放目标时触发
    ondragover: 当元素或选中的文本被拖到一个可释放目标上时触发
    ondragleave: 当拖动元素或选中的文本离开一个可释放目标时触发
    ondrop: 当元素或选中的文本在可释放目标上被释放时触发

示例：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>drag</title>
    <style>
    p{border: 5px solid royalblue;padding: 10px; width: 200px;}
    div{border: 5px solid blueviolet; padding: 20px; width: 300px;}
    </style>
</head>
<body>
    <p id="drag_src" draggable="true" ondragstart="dragstart(event)" ondrag="drag(event)" ondragend="dragend(event)">拖动元素到<strong>放置区</strong></p>
    <div id="drop_target" ondragenter="dragenter(event)" ondragover="dragover(event)" ondragleave="dragleave(event)" ondrop="drop(event)">
        <strong>放置区</strong>
    </div>
    <script>
    function dragstart(e) {
        console.log(e);
        e.currentTarget.style.border = "5px dashed green";
        e.dataTransfer.setData("text", e.target.id);
        console.log("dragstart");
    }
    function drag(e) {
        console.log("drag");
    }
    function dragend(e) {
        e.currentTarget.style.border = "5px solid royalblue";
        console.log("dragend");
    }
    function dragenter(e) {
        e.currentTarget.style.border = "5px dashed blueviolet";
        console.log("dragenter");
    }
    function dragover(e) {
        e.preventDefault();
        console.log("dragover");
    }
    function dragleave(e) {
        e.currentTarget.style.border = "5px solid blueviolet";
        console.log("dragleave");
    }
    function drop(e) {
        e.preventDefault();
        e.currentTarget.style.border = "5px solid blueviolet";
        var id = e.dataTransfer.getData("text");
        var darg_src = document.getElementById(id).cloneNode(true);
        document.getElementById("drop_target").appendChild(drag_src);
        console.log("drop");
    }
    </script>
</body>
</html>
```

### 在jquery中使用
注意jquery把拖拽事件进行了封装，拖拽的原始事件保存在originalEvent中。
示例：
```javascript
$("#drag").on("drag", function(e) {
    console.log(e.originalEvent);
});
```
