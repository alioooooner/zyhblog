---
title: CSS面试题
date: 2021-11-11
tags:
 - 面试题
categories:
 - 面经
---
# 一、CSS 基础

## 1. CSS 选择器及其优先级

| **选择器**     | **格式**            | **优先级权重** |
| -------------- | ------------------- | -------------- |
| id选择器       | #id                 | 100            |
| 类选择器       | .classname          | 10             |
| 属性选择器     | a[ref=“eee”]        | 10             |
| 伪类选择器     | li:last-child       | 10             |
| 标签选择器     | div                 | 1              |
| 伪元素选择器   | li:after，li:before | 1              |
| 相邻兄弟选择器 | h1+p                | 0              |
| 子选择器       | ul>li               | 0              |
| 后代选择器     | li a                | 0              |
| 通配符选择器   | *                   | 0              |

选择器的 **优先级**：

1. 10000：!important
2. 01000：内联样式
3. 00100：id 选择器
4. 00010：类、伪类、属性选择器
5. 00001：标签、伪元素选择器
6. 00000：通配选择器、后代选择器、兄弟选择器



可以看到内联样式（通过元素中 style 属性定义的样式）的优先级大于任何选择器；而给属性值加上 `!important` 又可以把优先级提至最高，就是因为它的优先级最高，所以需要谨慎使用它，以下有些使用**注意事项**：

- 一定要优先考虑使用样式规则的优先级来解决问题而不是 !important；
- 只有在需要覆盖全站或外部 CSS 的特定页面中使用 !important；
- 永远不要在你的插件中使用 !important；
- 永远不要在全站范围的 CSS 代码中使用 !important；
- 样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。



## 2. CSS 中可继承与不可继承属性有哪些

**一、无继承性的属性**

1. **display：**规定元素应该生成的框的类型
2. **文本属性：**
   1. vertical-align：垂直文本对齐
   2. text-decoration：规定添加到文本的装饰
   3. text-shadow：文本阴影效果
   4. white-space：空白符的处理
   5. unicode-bidi： 设置文本的方向
3. **盒子模型的属性：**width、height、margin、padding、border
4. **背景属性：**background、background-color、background-image、background-repeat、background-position、background-attachment
5. **定位属性：**float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
6. **生成内容属性**：content、counter-reset、counter-increment
7. **轮廓样式属性**：outline-style、outline-width、outline-color、outline
8. **页面样式属性**：size、page-break-before、page-break-after
9. **声音样式属性**：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during



**二、有继承性的属性**

1. **字体系列属性**
   1. font-family：字体系列
   2. font-weight：字体的粗细
   3. font-size：字体的大小
   4. font-style：字体的风格
   5. font-variant：设置小型大写字母的字体显示文本，这意味着所有的小写字母均会被转换为大写，但是所有使用小型大写字体的字母与其余文本相比，其字体尺寸更小。
   6. font-stretch：对当前的 font-family 进行伸缩变形。所有主流浏览器都不支持。
   7. font-size-adjust：为某个元素规定一个 aspect 值，这样就可以保持首选字体的 x-height。
2. **文本系列属性**
   1. text-indent：文本缩进
   2. text-align：文本水平对齐
   3. line-height：行高
   4. word-spacing：单词之间的间距
   5. letter-spacing：中文或者字母之间的间距
   6. text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
   7. direction：规定文本的书写方向
   8. color：文本颜色
3. **元素可见性**
   1. visibility：控制元素显示隐藏
4. **列表布局属性**
   1. list-style：列表风格，包括list-style-type、list-style-image、list-style-position
5. **光标属性**
   1. cursor：光标显示为何种形态
6. **页面样式属性：**page、page-break-inside、windows、orphans
7. **声音样式属性：**speak、speak-punctuation、speak-numeral、speak-header、speech-rate、volume、voice-family、pitch、pitch-range、stress、richness、、azimuth、elevation
8. **表格布局属性：**caption-side、border-collapse、border-spacing、empty-cells、table-layout
9. **生成内容属性：**quotes



**三、所有元素可以继承的属性**

1. 元素可见性：visibility
2. 光标属性：cursor

 

**四、内联元素可以继承的属性**

1. 字体系列属性
2. 除text-indent、text-align之外的文本系列属性

 

**五、块级元素可以继承的属性**

1. text-indent、text-align



## 3. display 的属性值及其作用

| **属性值**   | **作用**                                                     |
| ------------ | ------------------------------------------------------------ |
| none         | <span style="color:green; font-weight:bold">元素不显示</span>，并且会从文档流中移除。 |
| block        | <span style="color:green; font-weight:bold">块类型</span>。默认宽度为父元素宽度，可设置宽高，换行显示。 |
| inline       | <span style="color:green; font-weight:bold">行内元素类型</span>。默认宽度为内容宽度，不可设置宽高，同行显示。 |
| inline-block | 默认宽度为内容宽度，可以设置宽高，同行显示。                 |
| list-item    | 像块类型元素一样显示，并添加样式列表标记。                   |
| table        | 此元素会作为块级表格来显示。                                 |
| inherit      | 规定应该从父元素继承display属性的值。                        |
| flex         | 开启弹性布局，将元素设置为容器                               |



## 4. display 的 block、inline 和 inline-block 的区别

- block：独占一行，默认继承父元素的宽度；多个块级元素从上到下进行排列；可以设置 with、height、margin 和 padding
- inline：不会独占一行，宽度随着内容而变化；多个 inline 元素将按照从左到右的顺序在一行里排列显示，如果一行显示不下，则自动换行；inline 元素设置 with、height 无效，可以设置水平 margin，垂直 margin 无效，可以设置 padding；
- inline-block：不会独占一行，可以设置 with、height、margin 和 padding



## 5. 隐藏元素的方法有哪些

1. **opacity**：透明度，设置值为0可以隐藏元素，但依旧占据位置并且可响应绑定事件

2. **visibility**：可见度，设置值为 hidden 可以隐藏元素，但依旧占据位置，不可响应绑定事件

3. **display**：设置值为 none 可以隐藏元素，不占据位置也不响应绑定事件

4. **position**：设置值为 absolute，top 和 left 设置为负值脱离页面，不占据位置也不响应绑定事件

   1. ```CSS
      .hidd{
          position: absolute;
          top:-10000px;
          left: -10000px;
      }
      ```

      

5. **clip-path**：使用元素裁剪来隐藏元素，占据位置但不响应绑定事件

   1. ```CSS
      .clip{
          clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px);
      }
      ```

      

6. **position 和 clip 配合**：可以隐藏元素，不占据位置页不下响应事件

   1. ```CSS
      .poclip{
          position: absolute;
          clip:rect(0px,0px,0px,0px);
      }
      ```

7. **transform: scale(0,0)**：将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。



## 6. link 和 @import 的区别

link 和 @import 都能导入一个样式文件，区别如下：

1. link 是 HTML 标签，除了能导入 CSS 外，还能导入别的资源，比如图片、脚本和字体等；而 @import 是 CSS 的语法，只能用来导入 CSS；
2. link 导入的样式会在页面加载时同时加载，@import 导入的样式需要等待页面加载完成后再加载；
3. link 没有兼容性问题，@import 不兼容 ie5 以下；
4. link 可以通过 JS 操作 DOM 动态引入样式表改变样式，而 @import 不行。

##  7. transition 和 animation 的区别

1. transition **只有两个状态**：开始状态和结束状态，但 animation 可能是**多个状态**，有帧的概念
2. transition 需要**借助别的方式来触发**，比如 CSS 的状态选择器（如 `:hover`）或借助 JavaScript 来触发；animation 可以**自动触发**。



## 8. display:none 与 visibility:hidden 的区别

从结果上看，它们两个的作用都是隐藏 HTML 元素，但也有明显的区别：

1. display:none 让隐藏的元素**不占据空间**；visibility:hidden 让隐藏的元素**占据空间**。
2. display 要显示元素的话会**触发回流，进行渲染**；visibility 要显示元素的话会**进行重绘，不进行渲染**。
3. display **不是继承属性**，其子元素也会跟着消失；visibility **是继承属性**。



## 9. 伪元素和伪类的区别和作用？

- **伪类**用于当已有的元素**处于某种状态时，为其添加对应的样式**，这个状态是根据用户行为而动态变化的。比如说当用户悬停在指定的元素时，我们可以通过`:hover`来描述这个元素的状态。
- **伪元素**用于**创建一些不在文档树中的元素，并为其添加样式**。它们允许我们为元素的某些部分设置样式。比如说，我们可以通过`::before`来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。



## 10. 对 requestAnimationframe 的理解

### 实现一个动画有哪些方式？

- JavaScript：setTimeout 和 setInterval
- CSS3：transition 和 animation
- HTML：canvas 和 SVG
- requestAnimationFrame API



### requestAnimationFrame 是什么？

**HTML5 提供一个专门用于请求动画的API**，那就是   requestAnimationFrame，顾名思义就是**请求动画帧**。

MDN对该方法的描述：

> window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。



### 怎么用？

**语法：** `window.requestAnimationFrame(callback);`  其中，callback是**下一次重绘之前更新动画帧所调用的函数**(即上面所说的回调函数)。该回调函数会被传入DOMHighResTimeStamp参数，它表示requestAnimationFrame() 开始去执行回调函数的时刻。该方法属于**宏任务**，所以会在执行完微任务之后再去执行。



若要它一直执行，那就要在回调函数中再次调用 requestAnimation 即可。

```js
function test() {
	console.log('dududu')
    requestAnimationFrame(test)
}
requestAnimationFrame(test)
```



**取消动画：**使用cancelAnimationFrame()来取消执行动画，该方法接收一个参数——requestAnimationFrame默认返回的id，只需要传入这个id就可以取消动画了。



### 执行频率

requestAnimationFrame 函数不用手动设置间隔时间，而是根据浏览器屏幕刷新次数自动调整，也就是说浏览器屏幕刷新多少次，它就执行多少次。

一般说法是一秒60次，所以说它的间隔时间是 16.7 ms。



### 优点

- **CPU节能**：使用SetInterval 实现的动画，当页面被隐藏或最小化时，SetInterval 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而RequestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统走的RequestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。
- **函数节流**：在高频率事件( resize, scroll 等)中，为了防止在一个刷新间隔内发生多次函数执行，RequestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销，一个刷新间隔内函数执行多次时没有意义的，因为多数显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。
- **减少DOM操作**：requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。

**setTimeout执行动画的缺点**：它通过设定间隔时间来不断改变图像位置，达到动画效果。但是容易出现卡顿、抖动的现象；原因是：

- settimeout任务被放入异步队列，只有当主线程任务执行完后才会执行队列中的任务，因此实际执行时间总是比设定时间要晚；
- settimeout的固定时间间隔不一定与屏幕刷新间隔时间相同，会引起丢帧。



### requestAnimationFrame 为什么不会掉帧

#### 什么是掉帧

在浏览器刷新时间间隔里，内存执行了两次动画，而浏览器只有刷新页面才能看到效果，导致用户本来该看到的两帧画面，丢了一帧，画面就会显得不流畅，甚至造成一定程度的卡顿，这就是掉帧。



#### raf 为什么不会掉帧？

因为 raf 是根据浏览器的刷新频率自动调节，在浏览器下次重绘之前调用这个函数，因此每次刷新时间里只会执行一次动画。



## 11. 对盒模型的理解

CSS3 中盒模型有以下两种：标准盒子模型、IE 盒子模型。

盒模型都是由四个部分组成的，分别是 margin、padding、padding 和 content。

标准盒模型和 IE 盒模型的区别在于设置 width 和 height 时，所对应的范围不同：

- 标准盒模型的 width 和 height 属性的范围只包含了 content
- IE 盒模型的 width 和 height 属性的范围包含了 border、padding 和 content

可以通过修改元素的 box-sizing 属性来改变元素的盒模型：

- `box-sizing:content-box`表示标准盒模型（默认值）
- `box-sizing:border-box`表示 IE 盒模型（怪异盒模型）



## 12. 为什么有时候用translate来改变位置而不是定位？

translate 是 transform 属性的⼀个值。改变transform或opacity**不会触发浏览器重新布局（reflow）或重绘（repaint）**，只会触发复合（compositions）。⽽**改变绝对定位会触发重新布局，进⽽触发重绘和复合**。transform使浏览器为元素创建⼀个 GPU 图层，但改变绝对定位会使⽤到 CPU。 因此**translate()更高效**，可以缩短平滑动画的绘制时间。 ⽽**translate改变位置时，元素依然会占据其原始空间，绝对定位就不会发⽣这种情况**。



## 13. li 与 li 之间有看不见的空白间隔是什么原因引起的？如何解决？

li 是块级元素，该状态是不会有空白间隔。
空白间隔是因为把 li 元素设置为行内元素，此时两个`<li>`元素之间就会出现8px左右的空白间隙。
**原因：**浏览器默认把 inline 元素间的空白字符（空格换行tab）渲染成一个空格，所以就有了空白间隙。

**解决方案：**

1. 将`<li>`设置 float:left。不足：有些容器不能设置浮动，如左右切换的焦点图等
2. 将`<li>`元素写成一排（在 html 代码中）。不足：代码不美观
3. 给 ul 设置样式：`ul {fonst-size:0px}`。不足：将 ul 中的其他文字设置不见了，但不兼容 Safari 浏览器
4. 完美解决的方法：`ul {letter-spacing:-5px} li {letter-spacing:normal}`



## 14. CSS3 中有哪些新特性

1. 新增各种 CSS 选择器（ `:not(.input): ` 所有 class 不是 “input” 的节点）
2. 圆角（border-radius）
3. 多列布局（multi-column layout）
4. 阴影和反射 （Shadoweflect）
5. 文字特效 （text-shadow）
6. 文字渲染 （Text-decoration）
7. 线性渐变 （gradient）
8. 旋转 （transform）
9. 增加了旋转,缩放,定位,倾斜,动画,多背景



## 15. 替换元素的概念及计算规则

**概念：**通过修改某个属性值呈现的内容就可以被替换的元素称为“替换元素”。

替换元素除了内容可替换，还有其他特性：

1. **内容的外观不受页面上的 CSS 影响**，即样式表现在 CSS 作用域之外。
2. **有自己的尺寸，**大部分替换元素在没有明确设定尺寸的情况下有自己默认的尺寸。
3. **在很多 CSS 属性上有自己的一套表现规则，**比较具有代表性的就是vertical-align属性，对于替换元素和非替换元素，vertical-align属性值的解释是不一样的。比方说vertical-align的默认值的baseline，很简单的属性值，基线之意，被定义为字符x的下边缘，而替换元素的基线却被硬生生定义成了元素的下边缘。
4. **所有的替换元素都是内联水平元素：**也就是替换元素和替换元素、替换元素和文字都是可以在一行显示的。但是，替换元素默认的display值却是不一样的，有的是inline，有的是inline-block。



**替换元素尺寸的计算规则：**

从内而外分为三类：

1. **固有尺寸：** 指的是替换内容原本的尺寸。例如，图片、视频作为一个独立文件存在的时候，都是有着自己的宽度和高度的。
2. **HTML尺寸：** 只能通过HTML原生属性改变，这些HTML原生属性包括的width和height属性、的size属性。
3. **CSS尺寸：** 特指可以通过CSS的width和height或者max-width/min-width和max-height/min-height设置的尺寸，对应盒尺寸中的content box。



这三层结构的**计算规则**具体如下：

（1）如果没有CSS尺寸和HTML尺寸，则使用固有尺寸作为最终的宽高。

（2）如果没有CSS尺寸，则使用HTML尺寸作为最终的宽高。

（3）如果有CSS尺寸，则最终尺寸由CSS属性决定。

（4）如果“固有尺寸”含有固有的宽高比例，同时仅设置了宽度或仅设置了高度，则元素依然按照固有的宽高比例显示。

（5）如果上面的条件都不符合，则最终宽度表现为300像素，高度为150像素。

（6）内联替换元素和块级替换元素使用上面同一套尺寸计算规则。



## 16. 常见的图片格式以及使用场景

1. **jpg：**有损压缩格式。靠损失图片本身质量来减小图片的体积，适用于颜色丰富的图像（像素点组成的，像素点越多越清晰）
2. **gif：**无损无压缩格式。靠损失图片的色彩数量来减小图片的体积，支持透明，支持动画，适用于颜色数量较少的图像;
3. **png：**无损压缩格式。损失图片的色彩数量来减小图片的体积，支持透明，不支持动画，是fireworks的 源文件格式，适用于颜色数量较少的图像;
4. **svg：**可缩放矢量图形。svg 图像在放大或改变尺寸的情况下其图形质量不会有所损失，无损的矢量图。SVG是矢量图意味着SVG图片由直线和曲线以及绘制它们的方法组成。当放大SVG图片时，看到的还是线和曲线，而不会出现像素点。SVG图片在放大时，不会失真，所以它适合用来绘制Logo、Icon等。
5. **WebP：**是谷歌开发的一种新图片格式，WebP是同时支持有损和无损压缩的、使用直接色的点阵图。从名字就可以看出来它是为Web而生的，什么叫为Web而生呢？就是说相同质量的图片，WebP具有更小的文件体积。现在网站上充满了大量的图片，如果能够降低每一个图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量，进而降低访问延迟，提升访问体验。目前只有Chrome浏览器和Opera浏览器支持WebP格式，兼容性不太好。
   - 在无损压缩的情况下，相同质量的WebP图片，文件大小要比PNG小26%；
   - 在有损压缩的情况下，具有相同图片精度的WebP图片，文件大小要比JPEG小25%~34%；
   - WebP图片格式支持图片透明度，一个无损压缩的WebP图片，如果要支持透明度只需要22%的格外文件大小。
6. **BMP**，是无损的、既支持索引色也支持直接色的点阵图。这种图片格式几乎没有对数据进行压缩，所以BMP格式的图片通常是较大的文件。



## 17. 对 CSSSprites 的理解

**概念：**雪碧图也叫CSS精灵， 是⼀CSS图像合成技术，开发⼈员往往将⼩图标合并在⼀起之后的图⽚称作雪碧图，然后利用CSS的 background-image，background-repeat，background-position属性的组合进行背景定位。

**优点：**

1. 利用`CSS Sprites`能很好地减少网页的http请求，从而大大提高了页面的性能，这是`CSS Sprites`最大的优点；
2. `CSS Sprites`能减少图片的字节，把3张图片合并成1张图片的字节总是小于这3张图片的字节总和。

**缺点：**

1. CSS Sprite维护成本较⾼，如果⻚⾯背景有少许改动，⼀般就要改这张合并的图⽚
2. 加载速度优势在http2开启后荡然⽆存，HTTP2多路复⽤，多张图⽚也可以重复利⽤⼀个连接通道搞定



## 18. 什么是物理像素、逻辑像素和像素密度，为什么在移动端开发时需要用到 @3x，@2x 这种图片？

以 iPhone XS 为例，当写 CSS 代码时，针对于单位 px，其宽度为 414px & 896px，也就是说当赋予一个 **DIV元素宽度为 414px**，这个 DIV 就会填满手机的宽度；

而如果有一把尺子来实际测量这部手机的，实际为 **1242*2688 物理像素**；经过计算可知，1242/414=3，也就是说，在单边上，**一个逻辑像素=3个物理像素**，就说这个屏幕的**像素密度为 3**，也就是常说的 **3 倍屏**。

对于图片来说，为了保证其不失真，1 个图片像素至少要对应一个物理像素，假如原始图片是 500300 像素，那么在 3 倍屏上就要放一个 1500900 像素的图片才能保证 1 个物理像素至少对应一个图片像素，才能不失真。

当然，也可以针对所有屏幕，都只提供最高清图片。虽然低密度屏幕用不到那么多图片像素，而且会因为下载多余的像素造成带宽浪费和下载延迟，但从结果上说能保证图片在所有屏幕上都不会失真。

还可以使用 CSS 媒体查询来**判断不同的像素密度，从而选择不同的图片**:

```css
my-image { background: (low.png); }
@media only screen and (min-device-pixel-ratio: 1.5) {
  #my-image { background: (high.png); }
}
```



## 19. margin 和 padding 的使用场景

- 需要在border外侧添加空白，且空白处不需要背景（色）时，使用 margin；
- 需要在border内测添加空白，且空白处需要背景（色）时，使用 padding。



## 20. 对 line-height 的理解以及其赋值方式

1. **概念**
   1. line-height 指一行文本的高度，包含了字间距，实际上是下一行基线到上一行基线的距离；
   2. 如果一个标签没有定义 height 属性，那么其最终表现的高度由 line-height 决定；
   3. 把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中。
2. **赋值方式**
   1. 若父元素样式中的line-height是整数数值，那么子元素直接继承该line-height值
   2. 若父元素样式中的line-height是小数数值，那么子元素将会用该小数数值 * 子元素的font-size作为行高
   3. 若父元素样式中的line-height是百分数，那么子元素将会用该百分数*父元素的font-size让子元素继承



## 21. CSS 优化和提高性能的方法有哪些？

1. **加载性能**
   1. css 压缩：将写好的 css 进行打包压缩，可以减小文件体积
   2. css 单一样式：如只需要设置下边框，只需设置`margin-bottom`即可
   3. 减少使用 @import，建议使用 link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载
   4. 合并 css 文件，减少下载次数
2. **选择器性能**
   1. css 选择符是从右往左进行匹配的，当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等；
   2. 如果选择拥有 id 选择器作为其关键选择器，则不要为规则增加标签。过滤无关规则，这样样式系统就不会浪费时间去匹配它们了
   3. 避免使用通配规则，如*{}计算次数惊人，只对需要用到的元素进行选择。
   4. 尽量少的去对标签进行选择，而是用class
   5. 尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。

   6. 了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。
3. **渲染性能**
   1. 慎重使用高性能属性：浮动、定位
   2. 尽量减少页面重排、重绘
   3. 去除空规则：｛｝。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少css文档体积
   4. 属性值为0时，不加单位
   5. 属性值为浮动小数0.**，可以省略小数点之前的0
   6. 标准化各种浏览器前缀：带浏览器前缀的在前。标准属性在后
   7. 不使用@import前缀，它会影响css的加载速度
   8. 选择器优化嵌套，尽量避免层级过深
   9. css雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用
   10. 正确使用display的属性，由于display的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能
   11. 不滥用web字体。对于中文网站来说WebFonts可能很陌生，国外却很流行。web fonts通常体积庞大，而且一些浏览器在下载web fonts时会阻塞页面渲染损伤性能
4. **可维护性、健壮性**
   1. 将具有相同属性的样式抽离出来，整合并通过class在页面中进行使用，提高css的可维护性
   2. 样式与内容分离，将 css 代码定义到外部 css 中。



## 22. css 预处理器 / 后处理器是什么？为什么要使用它们？

**预处理器，**如：`less`，`sass`，`stylus`，用来预编译`sass`或者`less`，增加了`css`代码的复用性。层级，`mixin`， 变量，循环， 函数等对编写以及开发UI组件都极为方便。



**后处理器，** 如： `postCss`，通常是在完成的样式表中根据`css`规范处理`css`，让其更加有效。目前最常做的是给`css`属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。



`css`预处理器为`css`增加一些编程特性，无需考虑浏览器的兼容问题，可以在`CSS`中使用变量，简单的逻辑程序，函数等在编程语言中的一些基本的性能，可以让`css`更加的简洁，增加适应性以及可读性，可维护性等。



其它`css`预处理器语言：`Sass（Scss）`, `Less`, `Stylus`, `Turbine`, `Swithch css`, `CSS Cacheer`, `DT Css`。



**使用原因：**

- 结构清晰， 便于扩展
- 可以很方便的屏蔽浏览器私有语法的差异
- 可以轻松实现多重继承
- 完美的兼容了`CSS`代码，可以应用到老项目中

**缺点**

- 嵌套，增加选择器权重
- 与 html 结构耦合



## 23. ::before 和 :after 的双冒号和单冒号有什么区别

- 单冒号用于 CSS3 伪类，双冒号用于 CSS3 伪元素
- 用于区分伪类和伪元素



## 24. display:inline-block 什么时候会显示间隙？

1. 解决 html 代码元素之间的空白符，消除标签之间的空格（tab，space等）

2. 为父元素中设置 font-size:0，在子元素上重置正确的 font-size

3. 为 `inline-block` 元素添加样式 `float:left`，但是会有高度塌陷问题

4. 设置子元素 `margin` 值负数，有些浏览器可能会有元素重叠问题

   ```css
   .parent .child+.child {
       margin-left: -2px;
   }
   ```

5. 设置父元素 `display:table` 和 `word-spacing`

   ```css
   .parent {
       display: table;
       word-spacing: -1em;
   }
   ```



## 25. 单行、多行文本溢出隐藏

**单行文本溢出**

```css
overflow: hidden;			/* 溢出隐藏 */
text-overflow: ellipsis;	/* 溢出用省略号显示 */
white-space: nowrap;		/* 规定段落中的文本不进行换行 */
```

**多行文本溢出**

```css
overflow: hidden;			// 溢出隐藏
text-overflow: ellipsis;	// 溢出用省略号显示
display: -webkit-box;		// 作为弹性伸缩盒子模型显示
-webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式，从上到下垂直排列
-webkit-line-clamp: 3;		// 显示的行数
```

**注意：**由于上面的三个属性都是 CSS3 的属性，没有浏览器可以兼容，所以要在前面加一个 `-webkit-` 来兼容一部分浏览器。



## 26. sass、less 是什么？为什么要使用他们？

<u>他们都是 CSS 预处理器，是 CSS 上的一种抽象层。</u>他们是一种特殊的语法/语言编译成 CSS。 例如 Less 是一种动态样式语言，将 CSS 赋予了动态语言的特性，如变量，继承，运算， 函数，LESS 既可以在客户端上运行 (支持 IE 6+, Webkit, Firefox)，也可以在服务端运行 (借助 Node.js)。 



**为什么要使用它们？** 

- 结构清晰，便于扩展。 可以方便地屏蔽浏览器私有语法差异。封装对浏览器语法差异的重复处理， 减少无意义的机械劳动。 
- 可以轻松实现多重继承。 完全兼容 CSS 代码，可以方便地应用到老项目中。LESS 只是在 CSS 语法上做了扩展，所以老的 CSS 代码也可以与 LESS 代码一同编译。



## 27. 对媒体查询的理解？

**简述概念**

媒体查询由一个可选的媒体类型和零个或多个使用媒体功能的限制了样式表范围的表达式组成，例如宽度、高度和颜色。

媒体查询，添加自 css3，允许内容的呈现针对一个特定范围的输出设备而进行裁剪，而不必改变内容本身，非常适合 web 网页应对不同型号的设备而做出对应的响应适配。

**如何使用**

媒体查询包含一个可选的媒体类型和，满足 css3 规范的条件下，包含零个或多个表达式，这些表达式描述了媒体特征，最终会被解析会 true 后 false。

如果媒体查询中指定的媒体类型匹配展示文档所使用的设备类型，并且所有的表达式的值都是 true，那么该媒体查询的结果为 true，那么媒体查询内的样式将会生效。

```html
<!-- link元素中的CSS媒体查询 --> 
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" /> 
<!-- 样式表中的CSS媒体查询 --> 
<style> 
@media (max-width: 600px) { 
  .facet_sidebar { 
    display: none; 
  } 
}
</style>
```

**简单来说**，使用 @media 查询，可以**针对不同媒体类型定义不同的样式**。@media 可以针对不同的屏幕尺寸设置不同的样式，特别是需要设置设计**响应式**的页面，@media 是非常有用的。当重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。



## 28. 如何判断元素是否到达可视区域

以图片显示为例：

1. `window.innerHeight` 是浏览器可视区的高度；
2. `document.body.scrollTop` || `document.documentElement.scrollTop` 是浏览器滚动过的距离；
3. `img.offsetTop` 是元素顶部距离文档顶部的高度（包括滚动条的距离）
4. 内容达到显示区域的判断：`img.offsetTop < window.innerHeight + document.body.scrollTop;`



### 预加载和懒加载

#### 懒加载

**懒加载**：懒加载也叫延迟加载，指的是在**长网页**中延迟加载图像，是一种很好优化网页性能的方式。

**为什么要用懒加载**：

- 很多页面，内容很丰富，页面很长，图片很多，如果不使用懒加载来优化的话，等待页面全部加载完毕，是比较耗时的。

**懒加载原理：**

先将页面上的图片的 src 属性设为空字符串，而图片的真实路径设置在 data-src 属性中，监听页面滚动 scroll 事件，在 scroll 事件回调中，判断我们的懒加载的图片是否进行可视区域，如果图片在可视区内则将图片的 src 属性设置为 data-src 的值，这样就可以实现懒加载。

**懒加载优点：**

页面加载速度快、可以减轻服务器的压力、节约流量、用户体验好

#### 预加载

**预加载**：将所有所需要的资源提前请求加载到本地，这样后面在需要用到的时候就直接从缓存取资源。

**为什么要用预加载**：在网页全部加载之前， 对一些主要内容进行加载，以提供给用户更好的体验，减少等待的时间。否则，如果一个页面的内容过于庞大，没有使用预加载技术的页面就会长时间展示为一片空白，直到所有内容加载完毕。

**图片预加载方案：**

js Image 对象

```js
const preloadImg = (url) => {
    const img = new Image();
    if(images.complete) {
        //图片已经加载过了，可以使用图片
        //do something here
    }
    else {
        img.onload = function() {
        //图片首次加载完成，可以使用图片
        //do something here
        };
    }
    img.src = url;
}
```



#### 懒加载和预加载对比

两者都是提高页面性能有效方法，两者主要区别是一个是提前加载，一个是迟缓甚至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。



## 29. z-index 属性在什么情况下会失效

通常 z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方或者下方出现。z-index 值越大就越是在上层。<u>z-index 元素的 position **属性**需要时 relative，absolute 或者 fixed</u>。



**z-index 属性在下列情况下会失效：** 

1. 父元素 position 为 relative 时，子元素的 z-index 失效。
   **解决**：父元素 position 改为 absolute 或 static。
2. 元素没有设置 position 属性为非 static 属性。
   **解决**：设置该元素 position 属性为 relative，absolute 或是 fixed 中的一种。
3. 元素在设置 z-index 的同时还设置了 float 浮动。
   **解决**：float 去除，改为 display:inline-block。



## 30. css3 中的 transform 有哪些属性

**概念**

Transform字面意思就是变形，改变的意思，该元素应用于2D和3D转换，该属性允许我们元素进行旋转、缩放、移动和倾斜。在css3中transform主要包括以下几种：

> **旋转rotate**、**扭曲skew**、**缩放scale**和**移动translate**以及**矩阵变形matrix**。



**好文推荐：**

[CSS 中 transform属性的使用及理解](https://segmentfault.com/a/1190000022850066)



## 31. 文档流

在 CSS 世界（布局）里面，会把内容从左到右、从上到下的顺序进行排列显示，这就是 CSS 中的流式布局，又叫文档流。文档流就像水一样，能够自适应所在的容器，他有以下特性：

- 块级元素默认会占满整行，所以多个块级盒子之间是从上到下排列的。
- 内联元素默认会在一行里一列一列的排列，当一行放不下的时候，会自动切换到下一行继续按照列排布。



### 如何脱离文档流？

脱离文档流指节点脱离正常文档流之后，在正常文档流中的其他节点将忽略该节点并填补其原先空间。文档一旦脱流，计算其父节点高度时不会将其高度纳入，脱流节点不占据空间。有两种方式可以让元素脱离文档流：浮动和定位。

- 使用浮动（**float**）会将元素脱离文档流，移动到容器左/右侧边界或者是另一个浮动元素旁边，该浮动元素之前占用的空间将被别的元素填补，另外浮动之后所占用的区域不会和别的元素之间发生重叠；
- 使用**绝对定位**（position:absolute;）或者**固定定位**（position：fixed）也会使得元素脱离文档流，且空出来的位置将自动被后续节点填补。



## 32. RAF 和 RIC 是什么

### 页面流畅与 FPS

页面是一帧一帧绘制出来的，当每秒绘制的帧数（FPS）达到 60 时，页面是流畅的，小于这个值时，用户会感觉到卡顿。

1s 60帧，所以每一帧分到的时间是 1000/60 ≈ 16 ms。所以我们书写代码时力求不让一帧的工作量超过 16ms。



### Frame

那么浏览器每一帧都需要完成哪些工作？

![image-20211024110846782](images/image-20211024110846782.png)

通过上图可看到，一帧内需要完成如下六个步骤的任务：

- 处理用户的交互
- JS 解析执行
- 帧开始。窗口尺寸变更，页面滚去等的处理
- requestAnimationFrame(rAF)
- 布局
- 绘制



### requestIdleCallback

上面六个步骤完成后没超过 16 ms，说明时间有富余，此时就会执行 `requestIdleCallback` 里注册的任务。

![image-20211024130422491](images/image-20211024130422491.png)

从上图也可看出，和 **`requestAnimationFrame` 每一帧必定会执行，`requestIdleCallback` 是捡浏览器空闲来执行任务。**

如此一来，假如浏览器一直处于非常忙碌的状态，`requestIdleCallback` 注册的任务有可能永远不会执行。此时可通过设置 `timeout` （见下面 API 介绍）来保证执行。



### 小结

**requestAnimationFrame：**告诉浏览器下次重回之前执行传入的回调函数，它根据浏览器屏幕刷新次数来自动调整。

**requestIdleCallback：**会在浏览器空闲时间执行回调，也就是允许开发人员在主事件循环中执行低优先级任务，而不影响一些延迟关键事件。



# 二、页面布局

## 1. 常见的 CSS 布局单位

常用的布局单位包括像素（px），百分比（%），em，rem，vm/vh

### 像素 px

**屏幕分辨率**是指在屏幕的横纵方向上的像素点数量，比如分辨率 1920×1080 意味着水平方向含有 1920 个像素数，垂直方向含有 1080 个像素数。

像素 px 是页面布局的基础，一个像素表示终端（电脑、手机、平板等）屏幕所能显示的最小的区域，像素分为**两种类型**，css 像素和物理像素：

- **css 像素**：为 web 开发者提供，在 css 中使用的一个抽象单位；
- **物理像素**：只与设备的硬件密度有关，任何设备的物理像素都是固定的。



### 百分比 %

当浏览器的宽度或者高度发生变化时，通过百分比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果。一般认为子元素的百分比相对于直接父元素。



### em 和 rem

em 和 rem 相对于 px 更具灵活性，它们都是**相对长度单位**，它们之间的区别：**em 相对于父元素**，**rem 相对于根元素**。

- **em：**文本相对长度单位。相对于当前对象内文本的字体尺寸。如果当前行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸（默认16px）。（相对父元素的字体大小倍数）
- **rem：**rem 是 css3 新增的一个相对单位，相对于根元素（html 元素）的 font-size 的倍数。作用：利用 rem 可以实现简单的响应式布局，可以利用 html 元素中字体的大小与屏幕间的比值来设置 font-size 的值，以此实现当屏幕分辨率变化让元素也随之变化。



### vm/vh

vm/vh 是与视图窗口有关的单位，vw 表示相对于视图窗口的宽度，vh 表示相对于视图窗口高度，除了 vw 和 vh 外，还有 vmin 和 vmax 两个相关的单位。

- vw：相对于视图的宽度，视窗宽度是 100 vw；
- vh：相对于视图的高度，视窗高度是 100 vh；
- vmin：vw 和 vh 中的较小值；
- vmax：vw 和 vh 中的较大值。



**vw/vh** 和百分比很类似，两者的区别：

- 百分比（%）：大部分相对于祖先元素，也有相对于自身的情况比如（border-radius、translate 等）
- vw/vm：相对于视窗的尺寸



## 2. px、em、rem 的区别及使用场景

**三者的区别：**

- px是固定的像素，一旦设置了就无法因为适应页面大小而改变。
- em和rem相对于px更具有灵活性，他们是相对长度单位，其长度不是固定的，更适用于响应式布局。
- em是相对于其父元素来设置字体大小，这样就会存在一个问题，进行任何元素设置，都有可能需要知道他父元素的大小。而rem是相对于根元素，这样就意味着，只需要在根元素确定一个参考值。



**使用场景：**

- 对于只需要适配少部分移动设备，且分辨率对页面影响不大的，使用 px 即可。
- 对于需要适配各种移动设备，使用 rem，例如需要适配 iphone 和 ipad 等分辨率差别比较挺大的设备。



## 3. 两栏布局的实现

**方法一：float + overflow（BFC 原理）**

![image-20211023211955915](images/image-20211023211955915.png)



**方法二：float + margin**

![image-20211023212020396](images/image-20211023212020396.png)



**方法三：flex**

![image-20211023212047368](images/image-20211023212047368.png)



**方法四：grid**

![image-20211023212103591](images/image-20211023212103591.png)



## 4. 三栏布局

### 如何实现圣杯布局和双飞翼布局

#### 圣杯布局和双飞翼布局的目的

- 三栏布局，中间一栏最先加载和渲染（内容最重要）
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于PC网页



#### 圣杯布局和双飞翼布局的技术总结

- 使用 float 布局
- 两侧使用 margin 负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，一个用 padding(圣杯布局) 一个用 margin(双飞翼布局)
- 双飞翼布局比圣杯布局简单易懂



#### 代码实现

**圣杯布局**

![image-20210809145404758](images/image-20210809145404758.png)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>圣杯布局</title>
    <style type="text/css">
        body {
            min-width: 550px;
        }
        #header {
            text-align: center;
            background-color: #f1f1f1;
        }

        #container {
            padding-left: 200px;
            padding-right: 150px;
        }
        #container .column {
            float: left;
        }

        #center {
            background-color: #ccc;
            width: 100%;
        }
        #left {
            position: relative;
            background-color: yellow;
            width: 200px;
            margin-left: -100%;
            right: 200px;
        }
        #right {
            background-color: red;
            width: 150px;
            margin-right: -150px;
        }

        #footer {
            text-align: center;
            background-color: #f1f1f1;
        }

        /* 手写 clearfix */
        .clearfix:after {
            content: '';
            display: table;
            clear: both;
        }
    </style>
</head>
<body>
    <div id="header">this is header</div>
    <div id="container" class="clearfix">
        <div id="center" class="column">this is center</div>
        <div id="left" class="column">this is left</div>
        <div id="right" class="column">this is right</div>
    </div>
    <div id="footer">this is footer</div>
</body>
</html>
```



**双飞翼布局**

![image-20210809151810413](images/image-20210809151810413.png)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>双飞翼布局</title>
    <style type="text/css">
        body {
            min-width: 550px;
        }
        .col {
            float: left;
        }

        #main {
            width: 100%;
            height: 200px;
            background-color: #ccc;
        }
        #main-wrap {
            margin: 0 190px 0 190px;
        }

        #left {
            width: 190px;
            height: 200px;
            background-color: #0000FF;
            margin-left: -100%;
        }
        #right {
            width: 190px;
            height: 200px;
            background-color: #FF0000;
            margin-left: -190px;
        }
    </style>
</head>
<body>
    <div id="main" class="col">
        <div id="main-wrap">
            this is main
        </div>
    </div>
    <div id="left" class="col">
        this is left
    </div>
    <div id="right" class="col">
        this is right
    </div>
</body>
</html>
```



## 5. 水平垂直居中的实现

- 水平居中
  - inline 元素：text-align:center;
  - block 元素：margin:auto;
  - absolute 元素：left:50% + margin-left 负值
- 垂直居中
  - inline 元素：line-height 的值等于 height 值
  - absolute 元素：top:50% + margin-top:负值
  - absolute 元素：transfrom(-50%,-50%)
  - absolute 元素：top, left, bottom, right = 0 + margin: auto;
    - 既考虑浏览器的兼容性，又考虑元素是未知的



## 6. 如何根据设计稿进行移动端适配？

移动端适配主要有两个维度：

- **适配不同像素密度，** 针对不同的像素密度，使用 CSS 媒体查询，选择不同精度的图片，以保证图片不会失真；
- **适配不同屏幕大小，** 由于不同的屏幕有着不同的逻辑像素大小，所以如果直接使用 px 作为开发单位，会使得开发的页面在某一款手机上可以准确显示，但是在另一款手机上就会失真。为了适配不同屏幕的大小，应按照比例来还原设计稿的内容。

为了能让页面的尺寸自适应，可以使用 rem，em，vw，vh 等相对单位。



## 7. 对 flex 布局的理解及其使用场景

### 概念

`Flexible Box` 简称 `flex`，意为”弹性布局”，可以简便、完整、响应式地实现各种页面布局

采用Flex布局的元素，称为`flex`容器`container`

它的所有子元素自动成为容器成员，称为`flex`项目`item`

注意，设为Flex布局以后，**子元素的float、clear和vertical-align属性将失效**。

容器中默认存在两条轴，主轴和交叉轴，呈90度关系。项目默认沿主轴排列，通过`flex-direction`来决定主轴的方向。每根轴都有起点和终点，这对于元素的对齐非常重要。



### 属性

关于`flex`常用的属性，我们可以划分为容器属性和容器成员属性

容器属性有：

- **flex-direction**，决定主轴的方向(即项目的排列方向)
  - row（默认值）：主轴为水平方向，起点在左端
  - row-reverse：主轴为水平方向，起点在右端
  - column：主轴为垂直方向，起点在上沿。
  - column-reverse：主轴为垂直方向，起点在下沿
  - ![image-20210910211206987](images/image-20210910211206987.png)
- **flex-wrap**，弹性元素永远沿主轴排列，那么如果主轴排不下，通过`flex-wrap`决定容器内项目是否可换行
  - nowrap（默认值）：不换行
  - wrap：换行，第一行在上方
  - wrap-reverse：换行，第一行在下方
  - 默认情况是不换行，但这里也不会任由元素直接溢出容器，会涉及到元素的弹性伸缩
- **flex-flow**，是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`
- **justify-content**，定义了项目在主轴上的对齐方式
  - flex-start（默认值）：左对齐
  - flex-end：右对齐
  - center：居中
  - space-between：两端对齐，项目之间的间隔都相等
  - space-around：两个项目两侧间隔相等
  - <img src="images/image-20210910211709828.png" alt="image-20210910211709828" style="zoom:50%;" />
- **align-items**，定义项目在交叉轴上如何对齐
  - flex-start：交叉轴的起点对齐
  - flex-end：交叉轴的终点对齐
  - center：交叉轴的中点对齐
  - baseline: 项目的第一行文字的基线对齐
  - stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度
- **align-content**，定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
  - flex-start：与交叉轴的起点对齐
  - flex-end：与交叉轴的终点对齐
  - center：与交叉轴的中点对齐
  - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
  - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
  - stretch（默认值）：轴线占满整个交叉轴
  - <img src="img/image-20210910211920251.png" alt="image-20210910211920251" style="zoom:50%;" />



**容器成员属性如下：**

- **order**，定义项目的排列顺序。数值越小，排列越靠前，默认为0

- **flex-grow**，上面讲到当容器设为`flex-wrap: nowrap;`不换行的时候，容器宽度有不够分的情况，弹性元素会根据`flex-grow`来决定定义项目的放大比例（容器宽度>元素总宽度时如何伸展）默认为`0`，即如果存在剩余空间，也不放大

  - 如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）
    ![image-20210910212307091](images/image-20210910212307091.png)
  - 如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍
    ![image-20210910212319402](images/image-20210910212319402.png)
  - 弹性容器的宽度正好等于元素宽度总和，无多余宽度，此时无论`flex-grow`是什么值都不会生效

- **flex-shrink**，定义了项目的缩小比例（容器宽度<元素总宽度时如何收缩），默认为1，即如果空间不足，该项目将缩小。
  如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。
  如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。
  ![image-20210910212423240](images/image-20210910212423240.png)
  在容器宽度有剩余时，`flex-shrink`也是不会生效的

- **flex-basis**，设置的是元素在主轴上的初始尺寸，所谓的初始尺寸就是元素在`flex-grow`和`flex-shrink`生效前的尺寸。

  浏览器根据这个属性，计算主轴是否有多余空间，默认值为`auto`，即项目的本来大小，如设置了`width`则元素尺寸由`width/height`决定（主轴方向），没有设置则由内容决定。当设置为0的是，会根据内容撑开

  它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间

- **flex**，`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`，也是比较难懂的一个复合属性。

  > 一些属性有：
  >
  > - flex: 1 = flex: 1 1 0%
  > - flex: 2 = flex: 2 1 0%
  > - flex: auto = flex: 1 1 auto
  > - flex: none = flex: 0 0 auto，常用于固定尺寸不伸缩
  >
  > `flex:1` 和 `flex:auto` 的区别，可以归结于`flex-basis:0`和`flex-basis:auto`的区别
  >
  > 当设置为0时（绝对弹性元素），此时相当于告诉`flex-grow`和`flex-shrink`在伸缩的时候不需要考虑我的尺寸
  >
  > 当设置为`auto`时（相对弹性元素），此时则需要在伸缩时将元素尺寸纳入考虑
  >
  > 注意：建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值
  >
  > 最后项目的宽度为 flex-grow + flex-basis，其中 flex-basis:auto 为 100px。

- **align-self**，允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性

  默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

  <img src="images/image-20210910212627056.png" alt="image-20210910212627056" style="zoom:50%;" />



### 小结

flex 布局是 CSS3 新增的一种布局方式，可以通过将一个元素的 display 属性值设置为 flex 从而使它成为一个 flex 容器，它的所有子元素都会成为它的项目。

一个**容器**默认有两条轴：一个是水平的主轴，一个是与主轴垂直的交叉轴。可以使用 flex-direction 来指定主轴的方向。可以使用 justify-content 来指定元素在主轴上的排列方式，使用 align-items 来指定元素在交叉轴上的排列方式。还可以使用 flex-wrap 来规定当一行排列不下时的换行方式。

对于**容器中的项目**，可以使用 order 属性来指定项目的排列顺序，还可以使用f lex-grow 来指定当排列空间有剩余的时候，项目的放大比例，还可以使用 flex-shrink 来指定当排列空间不足时，项目的缩小比例。



## 8. 响应式设计的概念及基本原理

响应式网站设计`（Responsive Web design`）是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。



**关于原理**： 基本原理是通过**媒体查询`（@media）`查询检测不同的设备屏幕尺寸做处理**。

**关于兼容**： 页面头部必须有mate声明的`viewport`。

```
<meta name="’viewport’" content="”width=device-width," initial-scale="1." maximum-scale="1,user-scalable=no”"/>
```



# 三、定位与浮动

## 1. 为什么需要清除浮动？清除浮动的方式

**浮动的定义：** 非IE浏览器下，容器不设高度且子元素浮动时，容器高度不能被内容撑开。 此时，内容会溢出到容器外面而影响布局。这种现象被称为浮动（溢出）。



**浮动的工作原理：**

- 浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）
- 浮动元素碰到包含它的边框或者其他浮动元素的边框停留



浮动元素可以左右移动，直到遇到另一个浮动元素或者遇到它外边缘的包含框。浮动框不属于文档流中的普通流，当元素浮动之后，不会影响块级元素的布局，只会影响内联元素布局。此时文档流中的普通流就会表现得该浮动框不存在一样的布局模式。当包含框的高度小于浮动框的时候，此时就会出现“高度塌陷”。



**浮动元素引起的问题**

- 父元素的高度无法被撑开，影响与父元素同级的元素
- 与浮动元素同级的非浮动元素会跟随其后
- 若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构



**清除浮动的方式如下：**

- 给父级 div 定义 `height` 属性
- 最后一个浮动元素之后添加一个空的 div 标签，并添加 `clear:both` 样式
- 包含浮动元素的父级标签添加 `overflow:hidden` 或者 `overflow:auto`
- 使用 `::after` 伪元素。由于IE6-7不支持 `::after`，使用 `zoom:1` 触发 `hasLayout`

```css
.clearfix::after{
    content: "";
    display: block; 
    height: 0;
    clear: both;
}
.clearfix{
    *zoom: 1;
}
```

这种写法的**核心原理**就是通过 ::after 伪元素为在父元素的最后一个子元素后面生成一个内容为空的块级元素，然后通过 clear 将这个伪元素移动到所有它之前的浮动元素的后面，画个图来理解一下。

![image-20211023211328067](images/image-20211023211328067.png)



## 2. 使用 clear 属性清除浮动的原理？

使用 clear 属性清除浮动，其语法如下：

```css
clear: none | left | right | both
```

如果单看字面意思，clear:left 是“清除左浮动”，clear:right 是“清除右浮动”，实际上，这种解释是有问题的，因为浮动一直还在，并没有清除。

官方对 clear 属性解释：“**元素盒子的边不能和前面的浮动元素相邻**”，对元素设置 clear 属性是为了<u>**避免**浮动元素对该元素的影响</u>，而不是清除掉浮动。

还需要注意 clear 属性指的是元素盒子的边不能和前面的浮动元素相邻，注意这里“**前面的**”3个字，也就是 clear 属性对**“后面的”**浮动元素是不闻不问的。考虑到 float 属性要么是 left，要么是 right，不可能同时存在，同时由于 clear 属性对“后面的”浮动元素不闻不问，因此，当 clear:left 有效的时候，clear:right 必定无效，也就是此时 clear:left 等同于设置 clear:both；同样地，clear:right 如果有效也是等同于设置 clear:both。由此可见，clear:left 和 clear:right 这两个声明就没有任何使用的价值，至少在 CSS 世界中是如此，直接使用 clear:both 吧。

**一般使用伪元素的方式清除浮动：**

```css
.clear::after{
  content:'';
  display: block; 
  clear:both;
}
```

**clear 属性只有块级元素才有效的**，而 `::after` 等伪元素默认都是内联水平，这就是借助伪元素清除浮动影响时需要设置 `display` 属性值的原因。



## 3. 对 BFC 的理解，如何创建 BFC

先来看两个相关的**概念**：

- **Box**:Box 是 CSS 布局的对象和基本单位，<u>⼀个页面是由很多个 Box 组成的</u>，这个 Box 就是我们所说的盒模型。 
- **Formatting context**：上下⽂格式化，它是页面中的⼀块渲染区域，并且有⼀套渲染规则，它决定了其⼦元素将如何定位，以及和其他元素的关系和相互作⽤。 



### BFC

块级格式化上下文，它是一个独立的渲染区域，只有块级盒子参与，它规定了内部的块级盒子如何布局，并且与这个区域外部毫不相干。

![image-20211023170045265](images/image-20211023170045265.png)



**BFC 渲染规则**

- 内部的盒子会在垂直方向，一个接一个地放置；
- 盒子垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻盒子的 margin 会发生重叠；
- 每个元素的 margin 的左边，与包含块 border 的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此；
- BFC 的区域不会与 float 盒子重叠；
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算 BFC 的高度时，浮动元素也参与计算。



**创建BFC的条件：**

- 根元素：html
- 非溢出的可见元素：overflow 不为 visible
- 设置浮动：float 属性不为 none
- 设置定位：position 为 absolute 或 fixed
- 定义成块级的非块级元素：display: inline-block/table-cell/table-caption/flex/inline-flex/grid/inline-grid；



**BFC的应用场景：**

- **解决margin的重叠问题**：由于BFC是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个BFC，就解决了 margin 重叠的问题。
- **解决高度塌陷的问题**：在对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为0。解决这个问题，只需要把父元素变成一个 BFC。常用的办法是给父元素设置`overflow:hidden`。
- **创建自适应两栏布局**：可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。

```html
.left{
     width: 100px;
     height: 200px;
     background: red;
     float: left;
 }
 .right{
     height: 300px;
     background: blue;
     overflow: hidden;
 }
 
<div class="left"></div>
<div class="right"></div>
```

左侧设置`float:left`，右侧设置`overflow: hidden`。这样右边就触发了BFC，BFC 的区域不会与浮动元素发生重叠，所以两侧就不会发生重叠，实现了自适应两栏布局。



## 4. 什么是 margin 重叠问题？如何解决？

**问题描述：**

两个块级元素的上外边距和下外边距可能会合并（折叠）为一个外边距，其大小会<u>取其中外边距值大的那个</u>，这种行为就是外边距折叠。需要注意的是，**浮动的元素和绝对定位**这种脱离文档流的元素的外边距不会折叠。重叠只会出现在**垂直方向**。



**计算原则：**

折叠合并后外边距的计算原则如下：

- 如果两者都是正数，那么就去最大者
- 如果是一正一负，就会正值减去负值的绝对值
- 两个都是负值时，用0减去两个中绝对值大的那个



**解决办法：**

对于折叠的情况，主要有两种：**兄弟之间重叠**和**父子之间重叠**

（1）兄弟之间重叠

- 底部元素变为行内盒子：`display: inline-block`
- 底部元素设置浮动：`float`
- 底部元素的position的值为`absolute/fixed`

（2）父子之间重叠

- 父元素加入：`overflow: hidden`
- 父元素添加透明边框：`border:1px solid transparent`
- 子元素变为行内盒子：`display: inline-block`
- 子元素加入浮动属性或定位



## 5. 层叠上下文

### 层叠上下文

层叠上下文是 HTML 中一个三位的概念，除了 x、y 轴，众 HTML 元素依据自己定义的属性优先级在 Z 轴上按照一定的顺序排开，就是层叠上下文要描述的东西。

一个元素含有层叠上下文（也就是说它是层叠上下文元素），我们可以理解为这个元素在 z 轴上就离观察者更近。



### 层叠等级

1. 在同一个层叠上下文中，它描述定义的是该层叠上下文中的层叠上下文元素在`Z轴`上的上下顺序。
2. 在其他普通元素中，它描述定义的是这些普通元素在`Z轴`上的上下顺序。

**结论：**

1. 普通元素的层叠等级优先由其所在的层叠上下文决定。
2. 层叠等级的比较只有在当前层叠上下文元素中才有意义。不同层叠上下文中比较层叠等级是没有意义的。



### 如何产生“层叠上下文”

其实，层叠上下文也基本上是有一些特定的CSS属性创建的，一般有3种方法：

HTML 中的根元素`<html></html>`本身就具有层叠上下文，称为“根层叠上下文”。
普通元素设置 position 属性为非 static 值并设置 z-index 属性为具体数值，产生层叠上下文。
CSS3 中的新属性也可以产生层叠上下文。



### 层叠顺序

层叠顺序，英文称作 stacking order，表示元素发生层叠时有着特定的垂直显示顺序。下面是盒模型的层叠规则：

![image-20210910225208629](images/image-20210910225208629.png)

对于上图，由上到下分别是：

（1）背景和边框：建立当前层叠上下文元素的背景和边框。

（2）负的z-index：当前层叠上下文中，z-index属性值为负的元素。

（3）块级盒：文档流内非行内级非定位后代元素。

（4）浮动盒：非定位浮动元素。

（5）行内盒：文档流内行内级非定位后代元素。

（6）z-index:0：层叠级数为0的定位元素。

（7）正z-index：z-index属性值为正的定位元素。



**注意:** 当定位元素 z-index:auto，生成盒在当前层叠上下文中的层级为 0，不会建立新的层叠上下文，除非是根元素。



### 如何比较两个元素的层叠等级？

- 在同一个层叠上下文中，比较两个元素就是按照上图的介绍的层叠顺序进行比较。
- 如果不在同一个层叠上下文中的时候，那就需要比较两个元素分别所处的层叠上下文的等级。
- 如果两个元素都在同一个层叠上下文，且层叠顺序相同，则在 HTML 中定义越后面的层叠等级越高



## 6. position 的属性有哪些，区别是什么

position有以下属性值：

| 属性值   | 概述                                                         |
| -------- | ------------------------------------------------------------ |
| absolute | 生成绝对定位的元素，相对于static定位以外的一个父元素进行定位。元素的位置通过left、top、right、bottom属性进行规定。 |
| relative | 生成相对定位的元素，相对于其原来的位置进行定位。元素的位置通过left、top、right、bottom属性进行规定。 |
| fixed    | 生成绝对定位的元素，指定元素相对于屏幕视⼝（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，⽐如回到顶部的按钮⼀般都是⽤此定位⽅式。 |
| static   | 默认值，没有定位，元素出现在正常的文档流中，会忽略 top, bottom, left, right 或者 z-index 声明，块级元素从上往下纵向排布，⾏级元素从左向右排列。 |
| inherit  | 规定从父元素继承position属性的值                             |
| sticky   | 粘性定位，该定位基于用户滚动的位置。 它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。 |

前面三者的定位方式如下：

- **relative：**元素的定位永远是相对于元素自身位置的，和其他元素没关系，也不会影响其他元素。

  ![image-20210910225446664](images/image-20210910225446664.png)

- **fixed：**元素的定位是相对于 window （或者 iframe）边界的，和其他元素没有关系。但是它具有破坏性，会导致其他元素位置的变化。

  ![image-20210910225500666](images/image-20210910225500666.png)

- **absolute：**元素的定位相对于前两者要复杂许多。如果为 absolute 设置了 top、left，浏览器会根据什么去确定它的纵向和横向的偏移量呢？答案是浏览器会递归查找该元素的所有父元素，如果找到一个设置了`position:relative/absolute/fixed`的元素，就以该元素为基准定位，如果没找到，就以浏览器边界定位。

  ![image-20210910225513066](images/image-20210910225513066.png)

  ![image-20210910225525205](images/image-20210910225525205.png)



## 7. display、float、position 的关系

（1）首先判断display属性是否为none，如果为none，则position和float属性的值不影响元素最后的表现。



（2）然后判断position的值是否为absolute或者fixed，如果是，则float属性失效，并且display的值应该被设置为table或者block，具体转换需要看初始转换值。



（3）如果position的值不为absolute或者fixed，则判断float属性的值是否为none，如果不是，则display的值则按上面的规则转换。注意，如果position的值为relative并且float属性的值存在，则relative相对于浮动后的最终位置定位。



（4）如果float的值为none，则判断元素是否为根元素，如果是根元素则display属性按照上面的规则转换，如果不是，则保持指定的display属性值不变。



总的来说，可以把它看作是一个类似优先级的机制，"position:absolute"和"position:fixed"优先级最高，有它存在的时候，浮动不起作用，'display'的值也需要调整；其次，元素的'float'特性的值不是"none"的时候或者它是根元素的时候，调整'display'的值；最后，非根元素，并且非浮动元素，并且非绝对定位的元素，'display'特性值同设置值。



## 8. absolute 与 fixed 共同点与不同点

**共同点：**

- 改变行内元素的呈现方式，将display置为inline-block  
- 使元素脱离普通文档流，不再占据文档物理空间
- 覆盖非定位文档元素



**不同点：**

- abuselute与fixed的根元素不同，abuselute的根元素可以设置，fixed根元素是浏览器。
- 在有滚动条的页面中，absolute会跟着父元素进行移动，fixed固定在页面的具体位置。



## 9. 对 sticky 定位的理解

sticky 英文字面意思是粘贴，所以可以把它称之为粘性定位。语法：**position: sticky;** 基于用户的滚动位置来定位。



粘性定位的元素是依赖于用户的滚动，在 **position:relative** 与 **position:fixed** 定位之间切换。它的行为就像 **position:relative;** 而当页面滚动超出目标区域时，它的表现就像 **position:fixed;**，它会固定在目标位置。元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。



# 四、性能

## 1. 如何开启硬件加速GPU

### 1. GPU是什么，作用是什么

GPU 是图形处理器，它帮助 CPU 从图形处理的任务解放出来，让 CPU 可以执行更多其他的系统任务，这样可以大大提高计算机的整体性能。



### 2. 硬件加速是什么

就是将浏览器的渲染过程交给 GPU 处理，而不是使用自带的比较慢的渲染器。这样就可以使得 animation 和 transition 更加顺畅。

我们可以在浏览器中用 CSS 开启硬件加速，使 GPU 发挥功能，从而提升性能。



### 3. 硬件加速原理

浏览器接收到页面文档后，会将文档中的标记语言解析为DOM树。DOM树和CSS结合后形成浏览器构建页面的渲染树。渲染树中包含大量的渲染元素，每个渲染元素会被分到一个图层中，每个图层又会被加载到GPU形成渲染纹理，而图层在GPU中transform是不会触发repaint的，最终这些使用transform的图层都会由独立的合成器进程进行处理

CSS transform会创建了一个新的复合图层，可以被GPU直接用来执行transform操作。

**浏览器什么时候会创建一个独立的符合图层呢？**

- 3D 或者 CSS transform
- `video` 和 `canvas` 标签
- css filters
- 元素覆盖时，比如使用了 z-index 属性

**为什么硬件加速会使页面流畅**

因为 transform 属性不会触发浏览器的 repaint（重绘），而绝对定位 absolute 中的 left 和 top 则会一直触发 repaint（重绘）。

**为什么 transform 没有触发 repaint 呢**

简而言之，transform 动画 GPU 控制，支持硬件加载，并不需要软件方面的渲染。

**并不是所有的 CSS 属性都能触发 GPU 的硬件加速，事实上只有少数的属性可以，比如 transform、opacity、filter。**



### 4. 如何用 CSS 开启硬件加速

使用“欺骗“浏览器来开启硬件加速。浏览器在处理下面的 css 的时候，会使用 GPU 渲染。

- transform（当 3D 变化的样式出现时会使用 GPU 加速）
- opacity
- filter
- will-change

> 采用 transform: translateZ(0)
> 采用 transform: translate3d(0, 0, 0)
> 使用 CSS 的 will-change属性。 will-change 可以设置为opacity、transform、top、left、bottom、right。

注意！层爆炸，由于某些原因可能导致产生大量不在预期内的合成层，虽然有浏览器的层压缩机制，但是也有很多无法进行压缩的情况，这就可能出现层爆炸的现象（简单理解就是，很多不需要提升为合成层的元素因为某些不当操作成为了合成层）。解决层爆炸的问题，最佳方案是打破 overlap 的条件，也就是说让其他元素不要和合成层元素重叠。简单直接的方式：使用 3D 硬件加速提升动画性能时，最好给元素增加一个 z-index 属性，人为干扰合成的排序，可以有效减少创建不必要的合成层，提升渲染性能，移动端优化效果尤为明显。

