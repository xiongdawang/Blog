# 浏览器页面是否可见API

## 简介

使用选项卡式浏览，任何给定网页都有可能在后台，因此对用户不可见。页面可见性 API提供了您可以观察的事件，以便了解文档何时可见或隐藏，以及查看页面当前可见性状态的功能。

    注意：页面可见性 API对于节省资源和提高性能特别有用，它使页面在文档不可见时避免执行不必要的任务。

当用户最小化窗口或切换到另一个选项卡时，API会发送visibilitychange事件，让监听者知道页面状态已更改。你可以检测事件并执行某些操作或行为不同。例如，如果您的网络应用正在播放视频，则可以在用户将标签放入背景时暂停视频，并在用户返回标签时恢复播放。 用户不会在视频中丢失位置，视频的音轨不会干扰新前景选项卡中的音频，并且用户在此期间不会错过任何视频。

iframe的可见性状态与父文档相同。使用CSS属性（例如display: none;）隐藏

iframe不会触发可见性事件或更改框架中包含的文档的状态。

使用情景

+ 网站有图片轮播效果，只有在用户观看轮播的时候，才会自动展示下一张幻灯片。
+ 显示信息仪表盘的应用程序不希望在页面不可见时轮询服务器进行更新。
+ 页面想要检测是否正在渲染，以便可以准确的计算网页浏览量
+ 当设备进入待机模式时，网站想要关闭设备声音（用户按下电源键关闭屏幕）

开发者在过去使用不完善的代理来处理这一点。比如，监听 blur 和 focus 事件来帮助你了解页面是否处于活动状态，但是它并没有告诉你页面是对用户隐藏的。页面可见性 API 解决了这个问题。

    注意：虽然onblur和onfocus会告诉你用户是否切换窗口，但不一定意味着它是隐藏的。当用户切换选项卡或最小化包含选项卡的浏览器窗口时，页面才会隐藏。

示例：为了改善用户体验并优化CPU和电源效率，该应用程序可以在应用程序为时自动播放视频，而在应用程序为时 visible自动暂停播放hidden：
```js
var videoElement = document.getElementById("videoElement");

// Autoplay the video if application is visible
if (document.visibilityState == "visible") {
  videoElement.play();
}

// Handle page visibility change events
function handleVisibilityChange() {
  if (document.visibilityState == "hidden") {
    videoElement.pause();
  } else {
    videoElement.play();
  }
}

document.addEventListener('visibilitychange', handleVisibilityChange, false);
```
## Document.hidden

如果页面处于被认为是对用户隐藏状态时返回true，否则返回false。

    注意：hidden由于历史原因，保留了对属性的支持。开发人员尽可能使用visibilityState 。

## Document.visibilityState

visibilityState属性表示页面的可见性。可能的值：

+ visible : 页面内容至少是部分可见。 在实际中，这意味着页面是非最小化窗口的前景选项卡。
+ hidden : 页面内容对用户不可见。 在实际中，这意味着文档可以是一个后台标签，或是最小化窗口的一部分，或是在操作系统锁屏激活的状态下。
+ prerender : 页面内容正在被预渲染且对用户是不可见的(被document.hidden当做隐藏). 文档可能初始状态为prerender，但绝不会从其它值转为该值。 注释：浏览器支持是可选的。
+ unloaded : 页面正在从内存中卸载。 注释：浏览器支持是可选的。



## Document.onvisibilitychange

EventListener 提供在visibilitychange 事件被触发时要调用的代码。

示例：
```js
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        document.title = "页面不可见";
    } else {
        document.title = "页面可见";
    }
})
```

# 参考

[Page Visibility Level 2](https://www.w3.org/TR/2017/PR-page-visibility-2-20171017/)

[页面可见性 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API)