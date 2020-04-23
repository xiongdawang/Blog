# 通过js判断页面是否存在滚动条

## 前言

假如页面有滚动条，页面弹出模态框，需要隐藏滚动条，这样会造成页面右移抖动问题。这是需要进行特殊处理，出现模态框，通过overflow-y: hidden来隐藏滚动条时，获取当前元素滚动条宽度，再给元素设置margin-right、padding-right、border-right等，来占用；隐藏模态框显示滚动条，再把前面设置的样式清除。

## 判断是否存在滚动条

由于业务的需要，根据浏览器宽度会出现在body元素或内部某个div元素上。这两种场景判断判读滚动条方法不一样。

```js
/**
 * 判断是否存在滚动条
 * 
 * @param el DOM元素 不传递该参数，默认判断body元素；传递el参数，则判断传入元素
 * /
function hasScrollbar(el) {
    if (el) {
        return el.scrollHeight > el.offsetHeight;
    }
    return document.body.scrollHeight > document.documentElement.clientHeight;
}
```

## 获取滚动条宽度

显示模态框，给元素添加占位样式时（如：mrgin-right），需要获取滚动条的宽度。获取方法很简单，新加一个div元素，再添加样式让其显示滚动条，通过元素的getBoundingClientRect()、clientWidth计算出滚动条宽度。

```js
/**
 * 获取页面滚动条宽度
 * /
function getScrollbarWidth() {
    const divEl = document.createElement("div");
    divEl.style.cssText = "position: absolute; top: -9999; width: 50px height: 50px; overflow: scroll";
    document.body.appendChild(divEl);
    const scrollbarWidth = divEl.getBoundingClientRect().width - divEl.clientWidth;
    document.body.removeChild(divEl);
    return scrollbarWidth;
}
```

## 资料

[Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)
