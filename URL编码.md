## URL编码
>一般来说，URL只能使用英文字母、阿拉伯数字和某些标点符号，不能使用其他文字和符号。比如，世界上有英文字母的网址"http://www.abc.com"，但是没有希腊字母的网址"http://www.aβγ.com"（读作阿尔法-贝塔-伽玛.com）。这是因为网络标准RFC 1738做了硬性规定："只有字母和数字[0-9a-zA-Z]、一些特殊符号"$-_.+!*'(),"[不包括双引号]、以及某些保留字，才可以不经过编码直接用于URL。"
>这意味着，如果URL中有汉字，就必须编码后使用。但是麻烦的是，RFC 1738没有规定具体的编码方法，而是交给应用程序（浏览器）自己决定。这导致"URL编码"成为了一个混乱的领域。

### Javascript转义函数
    Javascript提供了三个编码函数：escape()、encodeURI()、encodeURIComponent()
    对应解码函数：unescape()、uncodeURI()、uncodeURIComponent()

### escape
    escape函数是全局对象的属性。
    它不能转义的字符有："*/@+-._0-9a-zA-Z"。
    注意：该函数已被Web标准废弃，虽然浏览器现在还支持，强烈建议不要使用。

### encodeURI
    encodeURI函数是对整个url进行编码。
    它不能转义的字符有："!#$&'()*+,/:;=?@-._~0-9a-zA-Z"。

```
场景：对整个url进行编码
示例：
var url = "http://www.cnblogs.com/season-huang/some other thing";
url = encodeURI(url);
// 转义后："http://www.cnblogs.com/season-huang/some%20other%20thing";
```

### encodeURIComponent
    encodeURIComponent函数，它的作用是对 URL 中的参数进行编码，记住是对参数，而不是对整个 URL 进行编码。
    它不能转义的字符有："!'()*-._~0-9a-zA-Z"。
```
    场景：对 URL 中的参数进行编码
    示例：
    var param = "http://www.b.com?t=123&s=456"; // 要被编码的参数
    var url = "http://www.a.com?foo="+encodeURIComponent(param);
    // 转义后："http://www.a.com?foo=http%3A%2F%2Fwww.b.com%3Ft%3D123%26s%3D456"
```
