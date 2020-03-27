# 基于Hash实现

```html
<body>
    <ul>
        <!-- 定义路由 -->
        <li><a href="#/home">home</a></li>
        <li><a href="#/about">about</a></li>
    </ul>

    <!-- 渲染路由对应 UI -->
    <div id="routeView"></div>
</body>
```
```js
// 页面加载完不会触发 hashchange 事件，这里主动触发一次 hashchange 事件
window.addEventListener('DOMContentLoaded', onLoad);
// 监听路由变化
window.addEventListener('hashchange', onHashChange);

// 路由视图
var routerView = null;

function onLoad() {
    routerView = document.querySelector('#routeView');
    onHashChange();
}

// 路由变化时，根据路由渲染对应 UI
function onHashChange() {
    switch (locatioin.hash) {
        case '#/home':
            routerView.innerHTML = 'Home';
            return;
        case '#/about':
            routerView.innerHTML = 'About';
            return;
        default:
            return;
    }
}
```

# 基于History实现

```html
<body>
    <ul>
        <!-- 定义路由 -->
        <li><a href="/home">home</a></li>
        <li><a href="/about">about</a></li>
    </ul>

    <!-- 渲染路由对应 UI -->
    <div id="routeView"></div>
</body>
```

```js
// 页面加载完不会触发 popstate 事件，这里主动触发一次 popstate 事件
window.addEventListener('DOMContentLoaded', onLoad);
// 监听路由变化
window.addEventListener('popstate', onPopState);

var routerView = null;

function onLoad() {
    routerView = document.querySelector('#routeView');
    onPopState();

    // 劫持 a 标签超链接，阻止默认行为
    var linkList = document.querySelectorAll('a[href]');
    linkList.forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            history.pushState(null, '', el.getAttribute('href'));
            onPopState();
        });
    })
}

// 路由变化时，根据路由渲染对应 UI
function onPopState() {
    switch (location.pathname) {
        case '/home':
            routerView.innerHTML = 'Home';
            return;
        case '/about':
            routerView.innerHTML = 'About';
            return;
        default:
            return;
    }
}
```
