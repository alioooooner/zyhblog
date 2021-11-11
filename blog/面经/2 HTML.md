---
title: HTML面试题
date: 2021-11-11
tags:
 - 面试题
categories:
 - 面经
---
# 1. src 和 href 的区别

1. **引用资源类型的不同**
   1. src 表示对资源的引用；href 表示对超文本的引用。
2. **作用结果不同**
   1. src 会将下载来的资源替换当前的标签，嵌入到文档内
   2. href 会建立起当前文档和所指向网络资源的链接关系
3. **浏览器解析方式不同**
   1. 浏览器解析到 src 元素的时候，会暂停其他资源的处理和下载，直至将该资源加载、编译、执行完毕；当浏览器识别到 href 指向的文件时，会并行下载资源，不会停止对当前文档的处理。



# 2. link 和 @import 的区别

两者都是外部引用 CSS 的方式

1. **作用范围的区别**
   1. link 是 XHTML 标签，除了能够加载 CSS，还可以定义 RSS 等其他事务；而 @import 属于 CSS 范畴，只可以加载 CSS。
2. **加载顺序的区别**
   1. link 引用 CSS 时，在页面载入时同时加载；@import 需要页面完成加载以后再加载。
3. **兼容性的区别**
   1. link 是 XHTML 标签，无兼容问题；@import 则是在 CSS2.1 提出的，低版本浏览器不支持。
4. **使用 DOM 控制样式时的区别**
   1. link 支持使用 JavaScript 控制 DOM 改变样式；而 @import 不支持。



# 3. 对 HTML 语义化的理解

HTML 语义化就是依据内容的结构化，选择正确的标签。即**用正确的标签做正确的事情**。

它的**作用**：

1. 便于搜索引擎解析
2. 便于后续维护，代码好理解
3. 可访问性强（比如使用屏幕阅读器的用户）

常见的语义化标签：

```html
<header></header>  //头部

<nav></nav>  //导航栏

<section></section>  //区块（有语义化的div）

<main></main>  //主要区域

<article></article>  //主要内容

<aside></aside>  //侧边栏

<footer></footer>  //底部
```



# 4. Doctype 的作用

DOCTYPE（文档类型），向 HTML 文档添加`<!DOCTYPE>`声明，告知浏览器响应的文档类型。

`<!DOCTYPE>`声明必须位于 HTML 文档的第一行，在`<html>`之前。

`<!DOCTYPE>` 声明不是 HTML 标签；它是指示 web 浏览器关于页面使用哪个 HTML 版本进行编写的指令。



- **标准模式**：在该模式下，浏览器按照 **HTML 与 CSS 标准**（W3C）对文档进行解析和渲染。
- **怪异模式**：在该模式下，浏览器则按照**旧有的非标准**的实现方式对文档进行解析和渲染。
- 两个模式的**由来**，微软发布 IE5 时未遵循 W3C 标准，发布 IE6 时想可以正常展示 IE5 的页面，于是给 IE6 加入了“怪异模式”和“标准模式”两种渲染方式。



> ### HTML 4.01
>
> 在 HTML 4.01 中有三种  声明——Strict，Transitional， Frameset。
>
> 对于HTML 4.01，默认是“怪异模式”；对于新页面需要在页面顶部加以下指令（Strict）告诉浏览器使用“标准模式”。
>
> ```html
> <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
> ```
>
> ### HTML5
>
> 在HTML5规范里，对DOCTYPE声明做了简化，变成`<!DOCTYPE html>`告知浏览器当前页面使用的是HTML5规范，并且使用告诉浏览器使用“标准模式”。
>
> ```html
> <!DOCTYPE html>
> ```
>
> 对于**没有文档类型声明或者文档类型声明不正确**的文档，浏览器就会认为它是一个旧的HTML文档，就会使用怪异模式解析和渲染该文档



**HTML5 为什么只需要写 `<!DOCTYPE HTML>`，而不需要引入 DTD？**

> 答：HTML5只写 `<!DOCTYPE HTML>`，不需要引入DTD的原因是：HTML5不基于SGML



**DTD 是什么？**

> 答：DTD（ducoment type definition）文档类型定义，它定义 xml 或 html 文件中元素的属性和浏览器需要遵循的解析规则，它会影响浏览器的渲染模式。



# 5. script 标签中 async 和 defer 的区别

![image-20210822101429717](img/image-20210822101429717.jpg)

蓝色线代表网络读取，红色线代表执行时间，这俩都是针对脚本的；绿色线代表 HTML 解析。

1. async 和 defer 都是异步加载脚本的，不会阻塞 html 解析
2. **区别**
   1. async 是加载完脚本后立即执行，defer 是加载完脚本后等待 html 解析完毕，`DOMContentLoaded`事件触发之前执行脚本。
   2. 多个 async 的执行顺序是不可预知的，defer 的执行是按照顺序来的。



# 6. 常用的 meta 标签有哪些

**`<meta>` 元素可以定义文档的各种元数据，提供各种文档信息**，通俗点说就是可以理解为**提供了关于网站的各种信息**。

html 文档中可以包含**多个**`<meta>`元素，每个`<meta>`元素只能用于一种用途，如果想定义多个文档信息，则需要在head标签中添加多个 meta 元素。

| 元素          | meta                                                         |
| ------------- | ------------------------------------------------------------ |
| 父元素        | head                                                         |
| 属性          | **http-equiv、name、content、charset**                       |
| HTML5中的变化 | 1. charset 为 HTML5 中新增的，用来声明字符编码;<br />2. http-equiv 属性在 HTML4 中有很多值，在 HTML5 中只有 refresh、default-style、content-type 可用 |

1.  **charset**，h5 新增属性，用于声明字符编码

   ```html
   <meta charset='utf-8'> // h5
   <meta http-equiv="content-Type" content="text/html;charset=utf-8"> // 旧的 html
   // 以上两者效果一致
   ```

2. **name**，指定名/值对定义元数据

   name 属性与 content 属性结合使用，name 用来表示元数据的类型，表示当前`<meta>`标签的具体作用；content 属性用来提供值。

   ```html
   <meta name="参数" content="具体描述信息">
   
   <meta name="keywords" content="电商,物流">
   <meta name="author" content="张三">
   <meta name="description" content="网站描述...">
   ```

3. **http-equiv**，模拟 http 标头字段

   **http-equiv **属性与 **content** 属性结合使用， **http-equiv** 属性为指定所要模拟的标头字段的名称，**content **属性用来提供值。

   ```html
   <meta http-equiv="参数" content="具体的描述">
   
   <meta http-equiv="content-Type" content="text/html charset=UTF-8">
   <meta http-equiv="refresh" content="2;URL=http://www.baidu.com">//2秒后在当前页跳转到百度
   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> //指定IE和Chrome使用最新版本渲染当前页面
   <meta http-equiv="expires" content="Sunday 22 July 2016 16:30 GMT"> // 设定网页的到期时间，过期后网页必须到服务器上重新传输
   <meta http-equiv="cache-control" content="no-cache">// 指定所有缓存机制在整个请求/响应链中必须服从的指令
   ```

参考文档：

[HTML中的meta标签常用属性及其作用总结](https://segmentfault.com/a/1190000010342600)



# 7. img 的 srcset 属性的作用？

1. **img 标签的 srcset 属性可以用来处理页面在不同像素密度终端设备上对图片的选择性展示**。

2. **当浏览器下载图片的时候，它是不知道图片的真实尺寸的**。因为浏览器下载 html 页面不久后，就会继续请求 css、js、img 等资源，但是这些资源请求没有先后之分，所以浏览器并不知道页面的布局，对图片的尺寸也一无所知，**浏览器唯一知道的是视图尺寸**，但这并不足以给浏览器选择最佳的图片源。

3. sizes 作用就在于告诉浏览器**根据屏幕尺寸和像素密度的计算值**从 srcset 中选择最佳的图片源。

4. ```html
   <img src="../static/images/128.png"
        srcset="../static/images/128.png 350w,
                ../static/images/256.png 750w,
                ../static/images/512.png 900w,
                ../static/images/1024.png 1000w"
   
        sizes="(max-width: 320px) 100px,
               (max-width: 450px) 200px,
               (max-width: 700px) 300px,
               (max-width: 800px) 400px,
               (max-width: 900px) 500px,
               1024px">
   ```

   1. max-width 是媒体情况，括号后面的 px 值是长度单位的值。
   2. **sizes 如何起作用？**首先浏览器会读取 sizes，然后根据媒体情况来选择，如果匹配到某个值，就根据这个值的长度单位乘以屏幕像素密度，最终得出来的值再与 srcset 的宽度描述匹配来选择图片。



# 8. 行内元素有哪些？块级元素有哪些？空元素有哪些？

- 行内元素：`a b span img input select strong`
- 块级元素：`div ul li ol dl dt dd h1 h2 h3 h4 h5 h6 p`
- 空元素（没有内容的 HTML 元素）
  - 常见：`<br> <hr> <img> <input> <link> <meta>`
  - 少见：`<area>`、`<base>`、`<col>`、`<colgroup>`、`<command>`、`<embed>`、`<keygen>`、`<param>`、`<source>`、`<track>`、`<wbr>`。



# 9. 说一下 web worker

**web worker 的作用就是浏览器作为宿主环境给单线程的 JS 创造多线程运行环境**，允许主线程创建 worker 线程，分配任务给后者，主线程运行的同时 worker 线程也在运行，相互不干扰，在 worker 线程运行结束后把结果返回给主线程。这样做的好处是**主线程可以把计算密集型或高延迟的任务交给worker线程执行，这样主线程就会变得轻松，不会被阻塞或拖慢**。这并不意味着JS语言本身支持了多线程能力，而是浏览器作为宿主环境提供了JS一个多线程运行的环境。

不过因为worker一旦新建，就会一直运行，不会被主线程的活动打断，这样有利于随时响应主线程的通性，但是也会造成资源的浪费，所以不应过度使用，用完注意关闭。或者说：如果worker无实例引用，该worker空闲后立即会被关闭；如果worker实列引用不为0，该worker空闲也不会被关闭。



**限制**

worker线程的使用有一些注意点

1. **同源限制**
   worker线程执行的脚本文件必须和主线程的脚本文件同源，这是当然的了，总不能允许worker线程到别人电脑上到处读文件吧
2. **文件限制**
   为了安全，worker线程无法读取本地文件，它所加载的脚本必须来自网络，且需要与主线程的脚本同源
3. **DOM操作限制**
   worker线程在与主线程的window不同的另一个全局上下文中运行，其中无法读取主线程所在网页的DOM对象，也不能获取 `document`、`window`等对象，但是可以获取`navigator`、`location(只读)`、`XMLHttpRequest`、`setTimeout族`等浏览器API。
4. **通信限制**
   worker线程与主线程不在同一个上下文，不能直接通信，需要通过`postMessage`方法来通信。
5. **脚本限制**
   worker线程不能执行`alert`、`confirm`，但可以使用 `XMLHttpRequest` 对象发出ajax请求。



# 10. HTML5 的离线存储怎么使用，它的工作原理是什么

1. 离线存储是 在用户没有与因特网连接时，可以正常访问站点或应用；在用户连接因特网连接时，更新用户机器上的缓存文件。

2. **原理：HTML5 的离线存储是基于一个新建的 `.appacache` 文件的缓存机制（不是存储技术），通过这个文件上的解析清单离线存储资源**，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过离线存储的数据进行页面展示。

3. **如何使用**

   （1）创建一个和 html 同名的 manifest 文件，然后在页面头部加入 manifest 属性：

   ```html
   <html lang="en" manifest="index.manifest">
   ```

   （2）在 `cache.manifest` 文件中编写需要离线存储的资源：

   ```manifest
   CACHE MANIFEST
       #v0.11
       CACHE:
       js/app.js
       css/style.css
       NETWORK:
       resourse/logo.png
       FALLBACK:
       / /offline.html
   ```

   - **CACHE**: 表示需要离线存储的资源列表，由于包含 manifest 文件的页面将被自动离线存储，所以不需要把页面自身也列出来。
   - **NETWORK**: 表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些资源。不过，如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 CACHE 的优先级更高。
   - **FALLBACK**: 表示如果访问第一个资源失败，那么就使用第二个资源来替换他，比如上面这个文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问 offline.html 。

   （3）在离线状态时，操作 `window.applicationCache` 进行离线缓存的操作。

4. **注意事项：**

   1. 浏览器对缓存数据的容量限制可能不太一样（某些浏览器设置的限制是每个站点 5MB）。
   2. 如果 manifest 文件，或者内部列举的某一个文件不能正常下载，整个更新过程都将失败，浏览器继续全部使用老的缓存。
   3. 引用 manifest 的 html 必须与 manifest 文件同源，在同一个域下。
   4. FALLBACK 中的资源必须和 manifest 文件同源。
   5. 当一个资源被缓存后，该浏览器直接请求这个绝对路径也会访问缓存中的资源。
   6. 站点中的其他页面即使没有设置 manifest 属性，请求的资源如果在缓存中也从缓存中访问。
   7. 当 manifest 文件发生改变时，资源请求本身也会触发更新。



# 11. 浏览器是如何对 HTML5 的离线存储资源进行管理和加载？

- 在线的情况下，浏览器发现`html`头部有`manifest`属性，它会请求`manifest`文件，如果是第一次访问`app`，那么浏览器就会根据`manifest`文件的内容下载相应的资源并且进行离线存储。如果已经访问过`app`并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的`manifest`文件与旧的`manifest`文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。
- 离线的情况下，浏览器就直接使用离线存储的资源。



# 12. title 与 h1 的区别，b 与 strong 的区别，i 与 em 的区别？

- title属性没有明确意义只表示是个标题，H1则表示层次明确的标题，对页面信息的抓取也有很大的影响；
- strong是标明重点内容，有语气加强的含义，使用阅读设备阅读网络时：`<strong>`会重读，而`<B>`是展示强调内容。
- i内容展示为斜体，em表示强调的文本；



# 13. iframe 的优点和缺点

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。

**优点：**

1. iframe 能够原封不动地把嵌入的网页展现出来。
2. 如果有多个网页引用 iframe，那么你只需要修改 iframe 的内容，就可以实现调用的每一个页面内容的更改，方便快捷。
3. 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用 iframe 来嵌套，可以增加代码的可重用。
4. 如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由 iframe 来解决。

**缺点：**

1. 会产生很多页面，不容易管理。
2. iframe 框架结构有时会让人感到迷惑，如果框架个数多的话，可能会出现上下、左右滚动条，会分散访问者的注意力，用户体验度差。
3. 代码复杂，无法被一些搜索引擎索引到，这一点很关键，现在的搜索引擎爬虫还不能很好的处理 iframe 中的内容，所以使用 iframe会不利于搜索引擎优化。
4. 很多的移动设备（PDA 手机）无法完全显示框架，设备兼容性差。
5. iframe框架页面会增加服务器的http请求，对于大型网站是不可取的。
   分析了这么多，现在基本上都是用Ajax来代替iframe，所以iframe已经渐渐的退出了前端开发。



# 14. label 的作用是什么？如何使用？

**作用：**label 标签来定义表单控制间的关系，**当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上**。

**两种用法：**一种是 id 绑定，一种是嵌套

```xml
<label for="Name">Number:</label>

<input type=“text“name="Name" id="Name"/>

<label>Date:<input type="text" name="B"/></label>
```



# 15. 什么是文档的预解析（浏览器解析过程）

## 概念

**概念：**虽然在执行脚本的时构建 DOM 是不安全的，但是你仍然可以解析 HTML 来查看其他需要检索的资源。找到的文件会被添加到一个列表里并开始**在后台并行地下载**。当脚本执行完毕之后，这些文件很可能已经下载完成了。

**通俗地讲：就是提前下载 html 页面上声明了的脚本。**

下载是并行的，执行是先后的，以这种方式触发的下载请求称为“预测”，因为很可能脚本还会改变 html 结构，导致预测的浪费（即下载的脚本是无效的，并不会被执行），但这并不常见，所以预解析仍然可以带来很大的性能提升。

![image-20210824161905130](img/image-20210824161905130.png)

- 预加载的内容：
  - 脚本 `<script>`
  - 外部 CSS `<link>`
  - 来自 `<img>` 标签的图片
  - Firefox 预加载 video 元素 `poster` 属性
  - Chrome/Safari 预加载 `@import` 内联样式
- 预加载会受到浏览器并行下载文件的数量限制（HTTP 1.x），如 Chrome 浏览器最多只能并行下载6个文件。
- 预解析时，浏览器不会执行内联的 JS 代码块。
- 用 JS 加载不那么重要的内容来避免预解析，这里的意思是说，页面上某些不重要的脚本，相比于其他必需脚本来说，是应该 **迟下载，迟执行** 的，通过用 JS 动态加载它们，它们就不会一开始出现在 HTML 文档的 `<script>` 标签中，则浏览器的预解析不会处理它们（相对的就会更优先的解析必需脚本）



## 解析

首先我们需要了解浏览器正常的文档解析流程（Parsing）：

- 浏览器引擎的解析器会将 HTML 转换成 DOM（解析，DOM 的构建）

- 在解析 HTML 字符串的过程中，DOM 节点逐个被添加到树中

- 在 DOM 中，对象被关联在树中用户捕获标签之间的父子关系

- CSS 样式被映射到`CSSOM`上

  - CSS 规则会互相覆盖，所以浏览器引擎需要进行复杂计算，以确定 CSS 代码如何应用到 DOM

  - CSS 可能会阻塞解析：

    - 当解析器获取一个 `<script>` 标签时，DOM 将等待 JavaScript 执行完毕后继续构建；
    - 若有 CSS 样式表先于该标签，则该标签的 JavaScript 代码将等待 CSS 下载，解析，且 CSSOM 可以使用时，才会执行

  - CSS 会阻塞 DOM 的渲染：直到 DOM 和 CSSOM 准备好之前，浏览器什么都不会显示。

    - FOUC - Flash of Unstyled Content: 没有任何样式的页面突然变换成了有样式的。

      ![image-20210824162436361](img/image-20210824162436361.png)

推荐好文：

[更快构建DOM：预解析，异步，延迟，预加载](https://zhuanlan.zhihu.com/p/29992512)

[HTML - 预解析, async/defer 和 preload](https://afantasy.ninja/2018/01/13/speculative-parsing-async-defer-perload/)



# 16. CSS 如何阻塞文档解析

**css 是不会阻塞 DOM 解析，但是会阻塞页面渲染。**

如果不阻塞页面渲染的话，因为网络延迟等原因 css 较慢被浏览器接收，此时 DOM 已经解析完毕渲染到页面了，css 来到之后，浏览器又再一次渲染页面，这就需要渲染两次页面（即本来是绿色的突然就变成蓝色的），用户体验不佳，并且浪费渲染成本。**因此，css 自己不会阻塞文档解析，但是会阻塞页面渲染，以此来减少二次渲染，提高用户体验**。

------

**但是！！！**

如果将引入 css 的 `<link>` 标签和 `<script>` 脚本先后放在 `<head>` 里面，将会阻塞文档解析，直至 js 加载甚至执行完毕，而 js 又要等待 css 加载解析完毕。这就是 css 如何阻塞文档解析的方式。

👆 为什么会这样子呢？

答：如果脚本的内容是获取元素的样式，宽高等 CSS 控制属性，浏览器是需要计算的，也就是依赖于 CSS。浏览器也无法感知脚本内到底是什么，为避免样式获取，因而只好等前面所有的样式下载完后，再执行 js。

------

**浏览器遇到 `<script>` 脚本时，会先渲染页面，而渲染页面就需要先把脚本之前的 css 给解析完。**

由此可见，每次碰到`<script>`标签时，浏览器都会渲染一次页面。这是基于同样的理由，浏览器不知道脚本的内容，因而碰到脚本时，只好先渲染页面，确保脚本能获取到最新的`DOM`元素信息，尽管脚本可能不需要这些信息。 

## 小结

综上所述，我们得出这样的结论：

- `CSS` 不会阻塞 `DOM` 的解析，但会阻塞 `DOM` 渲染。
- `JS` 阻塞 `DOM` 解析，但浏览器会"偷看"`DOM`，预先下载相关资源。
- 浏览器遇到 `<script>`且没有`defer`或`async`属性的 标签时，会触发页面渲染，因而如果前面`CSS`资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本。

所以`<script>`最好放底部，`<link>`最好放头部，如果头部同时有`<script>`与`<link>`的情况下，最好将`<script>`放在`<link>`上面。

