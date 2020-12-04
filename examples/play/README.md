# scrollbar

### 使用手册

* native: Boolean,
* wrapStyle: string | Array,
* wrapClass: {},
* viewClass: {},
* viewStyle: {},
* noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
* tag

首先得补充一个知识点。
> 如果需要，内容将被剪裁以适合填充框。 浏览器显示滚动条，无论是否实际剪切了任何内容。 （这可以防止滚动条在内容更改时出现或消失。）打印机仍可能打印溢出的内容。--引自MDN。

**某个元素设置了`overflow: scroll`属性后，无论内部的元素嵌套多少层，通过用户滚动滚轮，它都会按照视口在内部元素堆叠的位置来显示。**这个例子具体可以看./index.html

饿了么团队设计这个组件的思想是，通过tempalte-slot传入显示的内容，再通过props传入绑定的样式。（其实就是控制el-scrollbar__view元素的高度）

那最后的效果就是，

最外层：el-scrollbar__wrap （自带overflow：scroll属性）
中间层：el-scrollbar__view （视口，style样式等需要使用props传入）
显示层：用户自定义

### 滚动条的显隐

这里就是利用了选择器的奥妙，当使用者悬浮到scrollbar这个元素上时，css解析器找到了这个元素并应用该样式。

```css
.el-scrollbar:active>.el-scrollbar__bar, .el-scrollbar:focus>.el-scrollbar__bar, .el-scrollbar:hover>.el-scrollbar__bar {
    opacity: 1;
    -webkit-transition: opacity 340ms ease-out;
    transition: opacity 340ms ease-out;
}
```

另外如何隐藏原生样式这里有几个不同的方法。

* webkit内核
* firefox scroll-width