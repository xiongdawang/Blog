## flexbox典型使用场景

### 为什么选择flexbox

在浏览器完美支持的环境中，你选择使用flexbox的原因是你希望把一堆元素不是放在这个方向就是那个方向。 因为在放置元素过程中，你想控制元素在那个方向的维度，或者控制他们彼此之间的间距。

### 导航

导航的一个常见特征，就是使用水平条的样式去呈现一系列元素。这一模式看起来很简单，但是在 flexbox 出现之前却是很难实现的。 它成为一个最简单的 flexbox 示例，可以被看成是 flexbox 理想的使用场景。
```javascript
nav ul {
  display: flex;
  justify-content: space-between;
}
<nav>
    <ul>
        <li><a href="#">Page 1</a></li>
        <li><a href="#">Page 2</a></li>
        <li><a href="#">Page 3 is longer</a></li>
        <li><a href="#">Page 4</a></li>
    </ul>
</nav>
```

### Split navigation

在主轴上对齐项目的另一种方法是使用自动边距。这将启用导航栏的设计模式，其中一组项目左对齐而另一组右对齐。
```javascript
nav ul {
  display: flex;
  margin: 0 -10px;
}
nav li {
    margin: 0 10px;
}
.push-right {
  margin-left: auto;
}
<nav>
    <ul>
        <li><a href="#">Page 1</a></li>
        <li><a href="#">Page 2</a></li>
        <li><a href="#">Page 3 is longer</a></li>
        <li class="push-right"><a href="#">Page 4</a></li>
    </ul>
</nav>
```

### Center item

在开发flexbox之前，开发人员会开玩笑说网页设计中最难的问题是垂直居中。现在，使用flexbox中的对齐属性可以直接进行此操作。
```javascript
.box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.box div {
  width: 100px;
  height: 100px;
}
<div class="box">
    <div></div>
</div>
```

### 卡片布局推低页脚

无论您使用flexbox还是CSS Grid来布局卡组件列表，这些布局方法仅适用于flex或网格组件的直接子项。这意味着如果您有可变数量的内容，卡将拉伸到网格区域或弹性容器的高度。内部的任何内容都使用常规的块布局，这意味着在内容较少的卡上，页脚将上升到内容的底部而不是粘在卡的底部。
```javascript
.card {
    display: flex;
    flex-direction: column;
}

.card .content {
    flex: 1 1 auto;
}
<div class="cards">
    <div class="card">
        <div class="content">
            <p>This card doesn't have much content.</p>
        </div>
        <footer>Card footer</footer>
    </div>
    <div class="card">
        <div class="content">
            <p>This card has a lot more content which means that it defines the height of the container the cards are in. I've laid the cards out using grid layout, so the cards themselves will stretch to the same height.</p>
        </div>
        <footer>Card footer</footer>
    </div>
</div>
```

### Media objects

媒体对象是网页设计中的常见模式 - 此模式在一侧具有图像或其他元素，在右侧具有文本。理想情况下，媒体对象应该能够翻转 - 从左到右移动图像。
```javascript
.media {
    display: flex;
    align-items: flex-start;
}
.media .content {
    flex: 1;
    padding: 10px;
}
<div class="media">
    <div class="image"><img src="https://placehold.it/60x60" alt="placeholder"></div>
    <div class="content">This is the content of my media object. Items directly inside the flex container will be aligned to flex-start.</div>
</div>
```

```javascript
.media {
    display: flex;
    align-items: flex-start;
}
.media.flipped {
    flex-direction: row-reverse;
}
.media .content {
    flex: 1;
    padding: 10px;
}
<div class="media flipped">
    <div class="image"><img src="https://placehold.it/60x60" alt="placeholder"></div>
    <div class="content">This is the content of my media object. Items directly inside the flex container will be aligned to flex-start.</div>
</div>      
```

### Form controls

Flexbox在样式表单控件方面特别有用。表单有很多标记和许多小元素，我们通常希望彼此对齐。一种常见的模式是将`<input>`元素与a配对`<button>`，可能用于搜索表单，或者只是希望访问者输入电子邮件地址。
```javascript
.wrapper {
    display: flex;
}
.wrapper input[type="text"] {
    flex: 1 1 auto;
}
<form class="example">
    <div class="wrapper"><input type="text" id="text"><input type="submit" value="Send"></div>
</form>
```

```javascript
.wrapper {
  display: flex;

}
.wrapper input[type="text"] {
    flex: 1 1 auto;
  }
<form class="example">
        <div class="wrapper"><label for="text">Label</label><input type="text" id="text"><input type="submit" value="Send"></div>
</form>
```

### 参考
[flexbox典型使用场景](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/%E5%85%B8%E5%9E%8B_%E7%94%A8%E4%BE%8B_%E7%9A%84_Flexbox)
