## Performance

### 简介
    performance是W3C基于前端对性能的需求下推出的一套性能API标准，这套API的目的是简化开发者对网站性能进行精确分析与控制过程，当然对于测试开发来说，也可以利用这套API开发自己的框架来得到前端性能参数。

### 浏览器支持
    IE9+, Chrome11+, Firefox7+.

### 属性
    Performance接口没有继承任何属性

    Performance.navigation 提供了在指定时间段里发生的操作相关信息，包括页面是加载还是刷新、发生了多少次重定向等等。

    Performance.timing 包含延迟相关的性能信息

    Performance.timerOrigin 返回性能测试量开始时的时间的高精度时间戳

    Performance.memory 是Chrome添加的一个非标准库扩展，这个属性提供了一个获取基本内存使用情况的对象。

#### Performance.timing
    以下是w3c提供的performance.timing各阶段api图

![timestamp-diagram](/timestamp-diagram.svg)

    navigationStart: 当前浏览器窗口的前一个网页关闭，发生unload事件时的时间戳。如果没有前一个网页，就等于fetchStart
    unloadEventStart: 前一个网页（与当前页面同域）unload 的时间戳，如果无前一个网页 unload 或者前一个网页与当前页面不同域，则值为 0
    nuloadEventEnd: 和 unloadEventStart 相对应，返回前一个网页 unload 事件绑定的回调函数执行完毕的时间戳
    redirectStart: 第一次重定向开始时的时间戳，如果没有重定向，或者上次重定向不是同源的。则为0
    redirectEnd: 最后一个 HTTP 重定向完成时的时间。有跳转且是同域名内的重定向才算，否则值为 0
    fetchStart: 浏览器准备好使用 HTTP 请求抓取文档的时间，这发生在检查本地缓存之前
    domainLookupStart: DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
    domainLookupEnd: DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
    connectStart: HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等,如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接开始的时间
    connectEnd: HTTP（TCP） 完成建立连接的时间（完成握手），如果是持久连接，则与 fetchStart 值相等,如果在传输层发生了错误且重新建立连接，则这里显示的是新建立的连接完成的时间
    secureConnectionStart: HTTPS 连接开始的时间，如果不是安全连接，则值为 0
    requestStart: HTTP 请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存,连接错误重连时，这里显示的也是新建立连接的时间
    responseStart: HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
    responseEnd: HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存
    domLoading: 开始解析渲染 DOM 树的时间，此时 Document.readyState 变为 loading，并将抛出 readystatechange 相关事件
    domInteractive: 完成解析 DOM 树的时间，Document.readyState 变为 interactive，并将抛出 readystatechange 相关事件
    domContentLoadedEventStart: DOM 解析完成后，网页内资源加载开始的时间,文档发生 DOMContentLoaded事件的时间
    domContentLoadedEventEnd: DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕），文档的DOMContentLoaded 事件的结束时间
    domComplete: DOM 树解析完成，且资源也准备就绪的时间，Document.readyState 变为 complete，并将抛出 readystatechange 相关事件
    loadEventStart: load 事件发送给文档，也即 load 回调函数开始执行的时间,如果没有绑定 load 事件，值为 0
    loadEventEnd: load 事件的回调函数执行完毕的时间,如果没有绑定 load 事件，值为 0

    常用的一些计算：
    1. 准备新页面耗时：fetchStart - navigationStart
    2. 重定向时间：redirectEnd - redirectStart
    3. App Cache时间：domainLookupStart - fetchStart
    4. DNS解析时间：domainLookupEnd - domainLookupStart
    5. TCP连接时间：connectEnd - connectStart
    6. request时间：responseEnd - requestStart
    7. 请求完毕到DOM树加载：domInteractive - reponseEnd
    8. 构建与解析DOM树，加载资源时间：domComplete - domInteractive
    9. load时间：loadEventEnd - loadEventStart
    10. 整个页面加载时间：loadEventEnd - navigationStart
    11. 白屏时间：responseStart - navigationStart

#### Performance.navigation
    PerformanceNavigation接口呈现了如何导航到当前文档的信息。PerformanceNavigation有两个属性，一个是type，表示如何导航到当前页面的，主要有4个值。
        type=0(TYPE_NAVIGATE)：表示当前页面是通过点击链接，书签和表单提交，或者脚本操作，或者在url中直接输入地址访问的。
        type=1(TYPE_RELOAD): 表示当前页面是点击刷新或者调用Location.reload()方法访问的。
        type=2(TYPE_BACK_FORWARD): 表示当前页面是通过历史记录或者前进后退按钮访问的。
        type=255(TYPE_UNDEFINED): 其他方式访问的
    redirectCount：示到达最终页面前，重定向的次数，但是这个接口有同源策略限制，即仅能检测同源的重定向。

#### Performance.memory
    一个非标准属性，由chrome浏览器提供。这个属性提供了一个可以获取到基本内存使用情况的对象。

### 方法

#### Performance.clearMarks()
    将给定的 mark 从浏览器的性能输入缓冲区中移除。

#### Performance.clearMeasures()
    将给定的 measure 从浏览器的性能输入缓冲区中。

#### Performance.clearResourceTimings()
    从浏览器的性能数据缓冲区中移除所有 entryType 是 "resource" 的  performance entries。

#### Performance.getEntries()
    基于给定的 filter 返回一个 PerformanceEntry 对象的列表。

#### Performance.getEntriesByName()
    基于给定的 name 和 entry type 返回一个 PerformanceEntry 对象的列表。

#### Performance.getEntriesByType()
    基于给定的 entry type 返回一个 PerformanceEntry 对象的列表

#### Performance.mark()
    根据给出 name 值，在浏览器的性能输入缓冲区中创建一个相关的timestamp

#### Performance.measure()
    在浏览器的指定 start mark 和 end mark 间的性能输入缓冲区中创建一个指定的 timestamp

#### Performance.now()
    返回一个表示从性能测量时刻开始经过的毫秒数 DOMHighResTimeStamp

#### Performance.setResourceTimingBufferSize()
    将浏览器的资源 timing 缓冲区的大小设置为 "resource" type performance entry 对象的指定数量

#### Performance.toJSON()
    其是一个 JSON 格式转化器，返回 Performance 对象的 JSON 对象
