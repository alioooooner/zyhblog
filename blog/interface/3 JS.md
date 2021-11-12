---
title: JS面试题
date: 2021-11-11
tags:
 - 面试题
categories:
 - 面经
---
# 一、数据类型

## 1. JavaScript 有哪些数据类型，它们的区别？

JavaScript 是一门**弱类型/动态**语言。它变量的类型是**在程序运行过程中自动被确定**，这就意味着一个变量可以保存不同类型的数据。

8种数据类型：

- 6 种**原始类型**，使用 typeof 运算符检查:
  - [undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/undefined)：`typeof instance === "undefined"`
  - [Boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean)：`typeof instance === "boolean"`
  - [Number](https://developer.mozilla.org/zh-CN/docs/Glossary/Number)：`typeof instance === "number"`
  - [String](https://developer.mozilla.org/zh-CN/docs/Glossary/String)：`typeof instance === "string`
  - [BigInt](https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt)：`typeof instance === "bigint"`
  - [Symbol](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol) ：`typeof instance === "symbol"`
- [null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null)：`typeof instance === "object"`。
- [Object](https://developer.mozilla.org/zh-CN/docs/Glossary/Object)：`typeof instance === "object"`。任何 constructed 对象实例的特殊非数据结构类型，也用做数据结构：new [Object](https://developer.mozilla.org/zh-CN/docs/Glossary/Object)，new [Array](https://developer.mozilla.org/zh-CN/docs/Glossary/array)，new Map，new Set，new WeakMap，new WeakSet，new Date，和几乎所有通过 new keyword 创建的东西。

记住 `typeof` 操作符的**唯一目的**就是检查数据类型，如果我们希望检查任何从 Object 派生出来的结构类型，使用 `typeof` 是不起作用的，因为总是会得到 `"object"`。检查 Object 种类的合适方式是使用 instanceof 关键字。但即使这样也存在误差。



- **引用类型：**Object、Function
- **基本数据类型：**undefined（未定义）、null（空对象）、boolean、number、string、bigint、symbol

为何将数据类型**划分**为基本数据类型和引用数据类型？这是因为它们在内存中的**存储方式是不一样**的。 

- **基本数据类型**：占用空间小、空间大小固定，因此直接存放在**栈**中；
- **引用类型**：占用空间大、空间大小不固定，如果频繁创建则会造成性能问题，所以将实体数据放在**堆**中，**栈**只记录该实体数据的起始地址。



## 2. 数据类型检测的方式有哪些

1. **typeof**

   1. 能够正确判断基本数据类型
   2. 不易判断引用类型，数据、null、对象都会被判断为 object

2. **instanceof**

   1. 该运行原理为 **右操作数的 prototype 是否出现在左操作数的原型链上**。
   2. `instanceof` **只能正确判断引用数据类型**，不能判断基本数据类型，这是和 typeof 的区别。

3. **Object.prototype.toString.call()**

   1. 使用 Object 对象的原型方法 toString 方法来判断数据类型

   2. > 同样是检测对象 obj 调用 toString 方法，obj.toString() 的结果和Object.prototype.toString.call(obj) 的结果不一样，这是为什么？
      > 因为 数组、函数等都作为 Object 的实例，都重写了 toString 方法，因此先调用了被重写的 toString 方法，而重写的方法返回的不是具体类型。

4. **`constructor`**

   1. 有两个作用，一是判断数据的类型，二是对象实例通过 `constrcutor` 对象访问它的构造函数。

   2. 需要注意，如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型了：

      ```js
      function Fn(){};
       
      Fn.prototype = new Array();
       
      var f = new Fn();
       
      console.log(f.constructor===Fn);    // false
      console.log(f.constructor===Array); // true
      ```

      

## 3. 判断数组的方式

1. Object.prototype.toString.call()
2. Array.isArray()
3. `arr.__proto__ === Array.prototype`
4. instanceof
5. Array.prototype.isPrototypeOf
6. constructor



## 4. null 和 undefined 的区别

首先，它们是 JS 的两种基本数据类型。

- **区别**：undefined 的含义是已声明但未定义（未赋值），null 的含义是空值，希望一个对象被人为的重置未空对象。
- undefined 在 js 中不是保留字，即可以使用 undefined 作为一个变量名，这是危险的做法。我们可以通过一些方法获取 undefined 值，如 void 0
- 当对这两种类型使用 typeof 进行判断时，Null 类型化会返回 “object”，这是一个历史遗留的问题。
- 当使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。



## 5. typeof null 的结果是什么，为什么？

**结果是 **“object”

第一版的JavaScript是用32位比特来存储值的，且是通过值的低1位或3位（也就是**类型标记**）来识别类型的。其中**引用类型（object）的类型标记为 000，而 null 的低三位也是 000，所以误判 null 为 object**。



## 6. instanceof 操作符的实现原理及实现

**作用：**判断该实例是否属于某种类型

**实现原理：**查看右操作数的 prototype 是否在左操作数的原型链上

**实现：**

```js
function myInstanceof(instance, obj) {
    while(true) {
        if(!instance) return false;
        if(instance === obj.prototype) return true;
        instance = Object.getPrototypeOf(instance)
    }
}
```



## 7. 为什么 0.1+0.2 !== 0.3，如何让其相等

计算机是通过二进制数的方式存储数据的，所以计算 0.1 + 0.2 的时候，实际上计算的是两个数的二进制的和。0.1 和 0.2 转换成二进制是一串无限循环的二进制数，所以 JS 会对该二进制数进行截取，最后的结果转换成十进制数字是 `0.30000000000000004`。

**解决方法：**`(n1 + n2).toFixed(2)` 结果是 “0.30”



## 8. 如何获取安全的 undefined 值

因为 undefined 不是一个保留字，所以可以当作变量来使用和赋值，这会影响 undefined 的正常判断。获取方法：void 0。



## 9. typeof NaN 的结果是什么

`typeof NaN`结果是“number”。

- NaN 表示“不是一个数字”，通常会在一个数字和其他运算过程中产生。
- NaN 和任何变量都不想等，包括 NaN 自己。
- 判断一个变量是不是 NaN 可以用 `isNaN()` 函数，ES6 中有更准确的方法 `Number.isNaN()`



## 10. isNaN 和 Number.isNaN 函数的区别

- 函数 isNaN 接收参数后，**会尝试将这个参数转换为数值**，任何不能被转换为数值的的值（非数字值）都会返回 true，会影响 NaN 的判断。
- 函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，**不会进行数据类型的转换**，这种方法对于 NaN 的判断更为准确。



## 11. == 操作符的强制类型转换规则

1. 如果类型相同，调用 `===` 操作符

2. 如果类型不同，尝试类型转换

   - 1. 查看是否是 `undefined` 和 `null` 比较

     - ✅ 返回 `true`
     - ⬇️ 如果不是继续下一条规则

   - 1. 是否在比较 `string` 和 `number`

     - ✅ 如果是，那么将 `string` 转为 `number` 并回到最初重新比较 ♻️
     - ⬇️ 如果不是继续下一条规则

   - 1. 查看我们比较的项中是否有 `boolean`

     - ✅ 如果有，那么将 `boolean` 转为 `number` 并回到最初重新比较 ♻️
     - ⬇️ 如果不是继续下一条规则

   - 1. 查看是否有一项是 `object`

     - ✅ 如果有，那么将 `object` 转为其原始值 `primitive` 并回到最初重新比较 ♻️
     - ❌ 如果还不是，只能返回 `false` 了

![image-20210824232932567](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210824232932567.png)



## 12. 获取对象原始值

> 我们需要知道转换类型的这个方法在 JS 源代码中是 `ToPrimitive` 这个方法，该方法有一个可选参数 `PreferredType`，这个参数的作用是指定期望类型；如果第一个参数对应的对象可以被转换为不止一种类型，那么后者可以作为一种暗示，表示该对象应该转换为那种类型

- 默认情况下（期望类型默认为 `number`）
  - 调用 `valueOf` 方法：
    - ✅ 如果返回的是原始值，那么就用这个
    - ⬇️ 如果返回的不是原始值，那么跳到下一步
  - 调用 `toString` 方法：
    - ✅ 如果返回的是原始值，那么就用这个
    - ❌ 否则报错?
- 如果期望类型为 `string`：
  - 调用 `toString` 方法：
    - ✅ 如果返回的是原始值，那么就用这个
    - ⬇️ 如果返回的不是原始值，那么跳到下一步
  - 调用 `valueOf` 方法：
    - ✅ 如果返回的是原始值，那么就用这个
    - ❌ 否则报错?
- 如果对象是 Date 类型（期望类型为 `string`）：
  - 调用 `toString` 方法：
    - ✅ 如果返回的是原始值，那么就用这个
    - ⬇️ 如果返回的不是原始值，那么跳到下一步
  - 调用 `valueOf` 方法：
    - ✅ 如果返回的是原始值，那么就用这个
    - ❌ 否则报错?

简单的说就是默认调用 `valueOf` 方法，然后是 `toString` 方法；如果对象是 `Date` 类型或对象的期望类型为 `string`，那么先调用 `toString` 方法

例子：

![image-20210824232735702](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210824232735702.png)

普通的对象，首先调用 valueOf 方法，返回的结果并非原始值，那么会调用 toString 方法

![image-20210824232748839](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210824232748839.png)

假设我们重写 valueOf 方法，valueOf 和 toString 同时返回 string 原始值。使用 == 操作符可以看出，对象还是优先使用了 valueOf 方法返回的值

数组同理，首先默认调用 valueOf 方法，如不是原始值，则调用 toString 方法

![image-20210824232900614](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210824232900614.png)

再看看 Date 类型，他的期望类型是 string 因此首先调用的是 toString 方法，该方法返回一个原始值，那么就是用这个原始值



## 13. 其他类型转 number

下面我们来看看转换成 number 类型的规则：

1. `undefined` ➡ `NaN`。 如果是 undefined 则直接转换成 NaN
2. `null` ➡`0` 。如果是 null 则转换成 0
3. `boolean` ➡`0/1` 。如果是 boolean 则转换成 0 或 1
4. `string` ➡ `0/NaN/(parse to number)` 。如果是 string 则转换成对应的 number，空字符串转换为 0，无法转换的则为 NaN
5. `object` 。 首先获取原始值然后再转为 number
6. `Symbol` 类型的值不能转换为数字，会报错。



## 14. 其他类型转 string

1. `undefined` ➡`'undefined'`。
2. `null` ➡ `'null'`。
3. `number` ➡`'number'`。Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。
4. `boolean` ➡ `'true'/'false'`
5. `object` ： 首先获取原始值，然后转为 string
6. `Symbol` 类型的值直接转换，但是只允许**显式强制类型转换**，使用隐式强制类型转换会产生错误。



## 15. 转为 boolean

❌下面这些在 JS 中都为 falsy 除此之外的都是 truthy

1. `undefined`  ➡falsy
2. `null` ➡ falsy
3. `0` ➡ falsy
4. `""` ➡ falsy
5. `NaN` ➡ falsy
6. `false` ➡ falsy



## 16. || 和 && 操作符的返回值

|| 和 && 两个操作符首先会对第一个操作数执行条件判断，如果不是布尔值就先强制转换为布尔类型，然后再执行条件判断。

- 对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。
- && 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果



## 17. Object.is() 与比较操作符“\===”、“\==”的区别

- `==`两边的操作数如果类型不同，会进行类型转换，再进行比较；
- `===`如果类型不同，则直接返回 false、如果相同则进行值比较； 
- Object.is 类似于 `===`，但是在三等于号的基础，它多处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。



## 18. 什么是 JavaScript 中的包装类型

**为了便于操作基本数据类型的值**，JavaScript 中的原始数据类型的值会在后台隐式地被包装为对象，从而引出了**基本包装类型（primitive wrapper type）**这个概念。

```javascript
var str = "hello world";
str.length;              // 11
str.toUpperCase();       // HELLO WORLD
```

我们看到的代码是上面的样子，其实后台会自动完成下列的处理：

- 执行到第二行时：
  - 创建 String 类型的一个实例；
  - 在实例上调用指定的**属性**；
  - 销毁这个实例；
- 执行到第三行时：
  - 创建 String 类型的一个实例；
  - 在实例上调用指定的**方法**；
  - 销毁这个实例；

**JavaScript也可以使用`Object`函数显式地将基本类型转换为包装类型：**

```js
var a = 'abc'
Object(a) // String {"abc"}
```

也可以使用`valueOf`方法将包装类型倒转成基本类型：

```js
var a = 'abc'
var b = Object(a)
var c = b.valueOf() // 'abc'
```



## 19. 引用类型与基本包装类型的区别

引用类型与基本包装类型的**主要区别就是对象的生存期。**

> 使用 `new` 操作符创建的引用类型的实例，在执行流离开当前作用域之前，会一直保存在**堆内存**中。而后台自动创建的基本包装类型的对象，则**只存在一行代码的执行瞬间，然后立即被销毁**。这意味着我们不能为基本类型的值添加属性和方法。



## 20.  JavaScript 中如何进行隐式类型转换？

首先要介绍`ToPrimitive`方法，这是 JavaScript 中每个值隐含的自带的方法，用来将值 （无论是基本类型值还是对象）转换为基本类型值。如果值为基本类型，则直接返回值本身；如果值为对象，其看起来大概是这样：

```js
/**
* @obj 需要转换的对象
* @type 期望的结果类型
*/
ToPrimitive(obj,type)
```

`type`的值为`number`或者`string`。

**（1）当`type`为`number`时规则如下：**

- 调用`obj`的`valueOf`方法，如果为原始值，则返回，否则下一步；
- 调用`obj`的`toString`方法，后续同上；
- 抛出`TypeError` 异常。

**（2）当`type`为`string`时规则如下：**

- 调用`obj`的`toString`方法，如果为原始值，则返回，否则下一步；
- 调用`obj`的`valueOf`方法，后续同上；
- 抛出`TypeError` 异常。

可以看出两者的主要区别在于调用`toString`和`valueOf`的先后顺序。默认情况下：

- 如果对象为 Date 对象，则`type`默认为`string`；
- 其他情况下，`type`默认为`number`。

总结上面的规则，对于 Date 以外的对象，转换为基本类型的大概规则可以概括为一个函数：

```js
var objToNumber = value => Number(value.valueOf().toString())
objToNumber([]) === 0
objToNumber({}) === NaN
```

而 JavaScript 中的隐式类型转换主要发生在`+、-、*、/`以及`==、>、<`这些运算符之间。而这些运算符只能操作基本类型值，所以在进行这些运算前的第一步就是将两边的值用`ToPrimitive`转换成基本类型，再进行操作。



以下是基本类型的值在不同操作符的情况下隐式转换的规则 （对于对象，其会被`ToPrimitive`转换成基本类型，所以最终还是要应用基本类型转换规则）：

1. +操作符`+`操作符的两边有至少一个`string`类型变量时，两边的变量都会被隐式转换为字符串；其他情况下两边的变量都会被转换为数字。

```js
1 + '23' // '123'
 1 + false // 1 
 1 + Symbol() // Uncaught TypeError: Cannot convert a Symbol value to a number
 '1' + false // '1false'
 false + true // 1
```

2. -、*、\操作符NaN也是一个数字

```js
1 * '23' // 23
 1 * false // 0
 1 / 'aa' // NaN
```

3. 对于**`==`**操作符

操作符两边的值都尽量转成`number`：

```js
3 == true // false, 3 转为number为3，true转为number为1
'0' == false //true, '0'转为number为0，false转为number为0
'0' == 0 // '0'转为number为0
```

4. 对于`<`和`>`比较符

如果两边都是字符串，则比较字母表顺序：

```js
'ca' < 'bd' // false
'a' < 'b' // true
```

其他情况下，转换为数字再比较：

```js
'12' < 13 // true
false > -1 // true
```

以上说的是基本类型的隐式转换，而对象会被`ToPrimitive`转换为基本类型再进行转换：

```js
var a = {}
a > 2 // false
```

其对比过程如下：

```js
a.valueOf() // {}, 上面提到过，ToPrimitive默认type为number，所以先valueOf，结果还是个对象，下一步
a.toString() // "[object Object]"，现在是一个字符串了
Number(a.toString()) // NaN，根据上面 < 和 > 操作符的规则，要转换成数字
NaN > 2 //false，得出比较结果
```

又比如：

```js
var a = {name:'Jack'}
var b = {age: 18}
a + b // "[object Object][object Object]"
```

运算过程如下：

```js
a.valueOf() // {}，上面提到过，ToPrimitive默认type为number，所以先valueOf，结果还是个对象，下一步
a.toString() // "[object Object]"
b.valueOf() // 同理
b.toString() // "[object Object]"
a + b // "[object Object][object Object]"
```



## 21. `+` 操作符什么时候用于字符串的拼接？

根据 ES5 规范，**如果某个操作数是字符串或者能够通过以下步骤转换为字符串的话，+ 将进行拼接操作**。如果其中一个操作数是对象（包括数组），则首先对其调用 ToPrimitive 抽象操作，该抽象操作再调用 [[DefaultValue]]，以数字作为上下文。如果不能转换为字符串，则会将其转换为数字类型来进行计算。

简单来说就是，如果 + 的其中一个操作数是字符串（或者通过以上步骤最终得到字符串），则执行字符串拼接，否则执行数字加法。

那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字。

**注意：**

为什么在不同环境 `{} + []` 下情况不同，有的是0，有的是“[object Object]"。因为有的环境把 {} 视为区块语句，而有的环境把 {} 视为字面量。



## 22. object.assign和扩展运算法是深拷贝还是浅拷贝，两者区别

扩展运算符：

```js
let outObj = {
  inObj: {a: 1, b: 2}
}
let newObj = {...outObj}
newObj.inObj.a = 2
console.log(outObj) // {inObj: {a: 2, b: 2}}
```

Object.assign():

```js
let outObj = {
  inObj: {a: 1, b: 2}
}
let newObj = Object.assign({}, outObj)
newObj.inObj.a = 2
console.log(outObj) // {inObj: {a: 2, b: 2}}
```



# 二、ES6

## 1. let const var 的区别

1. **作用域**，使用 var 声明的变量，其作用域为该语句所在的函数内；使用 let、const 声明的变量，其作用域为该语句所在的代码块内。
2. **变量提升**，var 声明的变量会变量提升，let、const 不会。
3. **给全局添加属性**，var 在全局作用域声明的变量会称为全局对象的属性。
4. **重复声明**，var 允许变量重复声明，后面的同名变量会覆盖前面的；let、const 不会。
5. **暂时性死区**，在 let、const 声明的变量语句前，该变量不可用；var 声明的变量可以。
6. **初始值设置**，var 和 let 在声明变量的时候可以不设置初始值，const 必须设置。
7. **指针指向**，var 和 let 声明的是变量，所存储的值可以修改；const 声明的是常量，存储的地址值不可以修改，但是地址值指向的具体数据可以修改。



## 2. const 对象的属性可以修改吗？

const保证的并不是变量的值不能改动，而是**变量指向的那个内存地址不能改动**。对于基本类型的数据（数值、字符串、布尔值），其值就保存在变量指向的那个内存地址，因此等同于常量。

但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的内存地址，保存的只是一个指针，**const只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了**。



## 3. 如果 new 一个箭头函数会怎么样？

箭头函数是ES6中的提出来的，它**没有prototype**，也**没有自己的this指向**，**更不可以使用arguments参数**，所以不能New一个箭头函数。



**在调用 new 的过程中会发生以上四件事情：**

1. 首先创建了一个新的空对象
2. 设置原型，将对象的原型设置为函数的 prototype 对象
3. 让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。



所以，上面的第二、三步，箭头函数都是没有办法执行的。



## 4. 箭头函数与普通函数的区别

1. **箭头函数比普通函数更加简洁**

   1. 如果没有参数，就直接写一个空括号即可

   2. 如果只有一个参数，可以省去参数的括号

   3. 如果有多个参数，用逗号分割

   4. 如果函数体的返回值只有一句，可以省略大括号如果函数体不需要返回值，且只有一句话，可以给这个语句前面加一个void关键字。最常见的就是调用一个函数

      ```js
      let fn = () => void doesNotReturn();
      ```

2. **箭头函数没有自己的 this**

   箭头函数不会创建自己的this， 所以它没有自己的this，它只会在自己作用域的上一层继承this。所以**箭头函数中this的指向在它在定义时已经确定了，之后不会改变。**

3. **箭头函数继承来的 this 永远不会改变**

   ```js
   var id = 'GLOBAL';
   var obj = {
     id: 'OBJ',
     a: function(){
       console.log(this.id);
     },
     b: () => {
       console.log(this.id);
     }
   };
   obj.a();    // 'OBJ'
   obj.b();    // 'GLOBAL'
   new obj.a()  // undefined
   new obj.b()  // Uncaught TypeError: obj.b is not a constructor
   ```

   对象obj的方法b是使用箭头函数定义的，这个函数中的this就永远指向它定义时所处的全局执行环境中的this，即便这个函数是作为对象obj的方法调用，this依旧指向Window对象。需要注意，定义对象的大括号`{}`是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中。

4. **call()、apply()、bind()等方法不能改变箭头函数中this的指向**

   ```js
   var id = 'Global';
   let fun1 = () => {
       console.log(this.id)
   };
   fun1();                     // 'Global'
   fun1.call({id: 'Obj'});     // 'Global'
   fun1.apply({id: 'Obj'});    // 'Global'
   fun1.bind({id: 'Obj'})();   // 'Global'
   ```

5. **箭头函数不能作为构造函数使用**

   构造函数在new的步骤在上面已经说过了，实际上第二步就是将函数中的this指向该对象。 但是由于箭头函数时没有自己的this的，且this指向外层的执行环境，且不能改变指向，所以不能当做构造函数使用。

6. **箭头函数没有自己的arguments**

   箭头函数没有自己的arguments对象。在箭头函数中访问arguments实际上获得的是它外层函数的arguments值。

7. **箭头函数没有prototype**

8. **箭头函数不能用作Generator函数，不能使用yeild关键字**



## 5. 箭头函数的 this 指向哪里？

箭头函数不同于传统JavaScript中的函数，**箭头函数并没有属于⾃⼰的this，它所谓的this是捕获其所在上下⽂的 this 值，作为⾃⼰的 this 值**，并且由于没有属于⾃⼰的this，所以是不会被new调⽤的，这个所谓的this也不会被改变。

可以⽤Babel理解⼀下箭头函数: 

```js
// ES6 
const obj = { 
  getArrow() { 
    return () => { 
      console.log(this === obj); 
    }; 
  } 
}
```

转化后：

```js
// ES5，由 Babel 转译
var obj = { 
   getArrow: function getArrow() { 
     var _this = this; 
     return function () { 
        console.log(_this === obj); 
     }; 
   } 
};
```



## 6. 扩展运算符的作用以及使用场景

**（1）对象扩展运算符**

对象的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中。

```js
let bar = { a: 1, b: 2 };
let baz = { ...bar }; // { a: 1, b: 2 }
```

上述方法实际上等价于:

```js
let bar = { a: 1, b: 2 };
let baz = Object.assign({}, bar); // { a: 1, b: 2 }
```

`Object.assign`方法用于对象的合并，将源对象`（source）`的所有可枚举属性，复制到目标对象`（target）`。`Object.assign`方法的第一个参数是目标对象，后面的参数都是源对象。(**如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性**)。



同样，如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

```js
let bar = {a: 1, b: 2};
let baz = {...bar, ...{a:2, b: 4}};  // {a: 2, b: 4}
```

利用上述特性就可以很方便的修改对象的部分属性。在`redux`中的`reducer`函数规定必须是**一个纯函数**，`reducer`中的`state`对象要求不能直接修改，可以通过扩展运算符把修改路径的对象都复制一遍，然后产生一个新的对象返回。



需要注意：**扩展运算符对对象实例的拷贝属于浅拷贝**。



**（2）数组扩展运算符**

数组的扩展运算符可以将一个数组转为用逗号分隔的参数序列，且每次只能展开一层数组。

```js
console.log(...[1, 2, 3])
// 1 2 3
console.log(...[1, [2, 3, 4], 5])
// 1 [2, 3, 4] 5
```

下面是数组的扩展运算符的应用：

- **将数组转换为参数序列**

```js
function add(x, y) {
  return x + y;
}
const numbers = [1, 2];
add(...numbers) // 3
```

- **复制数组**

```js
const arr1 = [1, 2];
const arr2 = [...arr1];
```

- **合并数组**

如果想在数组内合并数组，可以这样：

```js
const arr1 = ['two', 'three'];
const arr2 = ['one', ...arr1, 'four', 'five'];
// ["one", "two", "three", "four", "five"]
```

- **扩展运算符与解构赋值结合起来，用于生成数组**

```js
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
```

需要注意：**如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。**

```js
const [...rest, last] = [1, 2, 3, 4, 5];         // 报错
const [first, ...rest, last] = [1, 2, 3, 4, 5];  // 报错
```

- **将字符串转为真正的数组**

```js
[...'hello']    // [ "h", "e", "l", "l", "o" ]
```

- **任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组**

比较常见的应用是可以将某些数据结构转为数组：

```js
// arguments对象
function foo() {
  const args = [...arguments];
}
```

用于替换`es5`中的`Array.prototype.slice.call(arguments)`写法。

- **使用`Math`函数获取数组中特定的值**

```js
const numbers = [9, 4, 7, 1];
Math.min(...numbers); // 1
Math.max(...numbers); // 9
```



## 7. Proxy 可以实现什么功能？

在 Vue3.0 中通过 `Proxy` 来替换原本的 `Object.defineProperty` 来实现数据响应式。



Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。

```js
let p = new Proxy(target, handler)
```

`target` 代表需要添加代理的对象，`handler` 用来自定义对象中的操作，比如可以用来自定义 `set` 或者 `get` 函数。



下面来通过 `Proxy` 来实现一个数据响应式：

```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}
let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2
```

在上述代码中，通过自定义 `set` 和 `get` 函数的方式，在原本的逻辑中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出通知。



当然这是简单版的响应式实现，如果需要实现一个 Vue 中的响应式，需要在 `get` 中收集依赖，在 `set` 派发更新，之所以 Vue3.0 要使用 `Proxy` 替换原本的 API 原因在于 `Proxy` 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 `Proxy` 可以完美监听到任何方式的数据改变，唯一缺陷就是浏览器的兼容性不好。



## 8. 对对象与数组解构的理解

在解构数组时，以**元素的位置为匹配条件**来提取想要的数据的：

```js
const [a, b, c] = [1, 2, 3]
```

最终，a、b、c分别被赋予了数组第0、1、2个索引位的值：

<img src="https://gitee.com/dadadaxyx/my-images/raw/master/image-20210825145812072.png" alt="image-20210825145812072" style="zoom:33%;" />

数组里的0、1、2索引位的元素值，精准地被映射到了左侧的第0、1、2个变量里去，这就是数组解构的工作模式。还可以通过给左侧变量数组设置空占位的方式，实现对数组中某几个元素的精准提取：

```js
const [a,,c] = [1,2,3]
```

通过把中间位留空，可以顺利地把数组第一位和最后一位的值赋给 a、c 两个变量：

<img src="https://gitee.com/dadadaxyx/my-images/raw/master/image-20210825145832136.png" alt="image-20210825145832136" style="zoom:33%;" />

**2）对象的解构**

对象解构比数组结构稍微复杂一些，也更显强大。在**解构对象时，是以属性的名称为匹配条件**，来提取想要的数据的。现在定义一个对象：

```js
const stu = {
  name: 'Bob',
  age: 24
}
```

假如想要解构它的两个自有属性，可以这样：

```js
const { name, age } = stu
```

这样就得到了 name 和 age 两个和 stu 平级的变量：

<img src="https://gitee.com/dadadaxyx/my-images/raw/master/image-20210825145900756.png" alt="image-20210825145900756" style="zoom:33%;" />

注意，对象解构严格以属性名作为定位依据，所以就算调换了 name 和 age 的位置，结果也是一样的：

```js
const { age, name } = stu
```



## 9. 如何提取高度嵌套的对象里的指定属性？

有时会遇到一些嵌套程度非常深的对象：

```js
const school = {
   classes: {
      stu: {
         name: 'Bob',
         age: 24,
      }
   }
}
```

像此处的 name 这个变量，嵌套了四层，此时如果仍然尝试老方法来提取它：

```js
const { name } = school
```

显然是不奏效的，因为 school 这个对象本身是没有 name 这个属性的，name 位于 school 对象的“儿子的儿子”对象里面。要想把 name 提取出来，一种比较笨的方法是逐层解构：

```js
const { classes } = school
const { stu } = classes
const { name } = stu
name // 'Bob'
```

但是还有一种更标准的做法，可以用一行代码来解决这个问题：

```js
const { classes: { stu: { name } }} = school
       
console.log(name)  // 'Bob'
```

可以在解构出来的变量名右侧，通过**冒号+{目标属性名}**这种形式，进一步解构它，一直解构到拿到目标数据为止。



## 10. 对 rest 参数的理解

扩展运算符被用在函数形参上时，**它还可以把一个分离的参数序列整合成一个数组**：

```js
function mutiple(...args) {
  let result = 1;
  for (var val of args) {
    result *= val;
  }
  return result;
}
mutiple(1, 2, 3, 4) // 24
```

这里，传入 mutiple 的是四个分离的参数，但是如果在 mutiple 函数里尝试输出 args 的值，会发现它是一个数组：

```js
function mutiple(...args) {
  console.log(args)
}
mutiple(1, 2, 3, 4) // [1, 2, 3, 4]
```

这就是 … rest运算符的又一层威力了，它可以把函数的多个入参收敛进一个数组里。这一点**经常用于获取函数的多余参数，或者像上面这样处理函数参数个数不确定的情况。**



## 11. ES6中模板语法与字符串处理

ES6 提出了“模板语法”的概念。在 ES6 以前，拼接字符串是很麻烦的事情：

```js
var name = 'css'   
var career = 'coder' 
var hobby = ['coding', 'writing']
var finalString = 'my name is ' + name + ', I work as a ' + career + ', I love ' + hobby[0] + ' and ' + hobby[1]
```

仅仅几个变量，写了这么多加号，还要时刻小心里面的空格和标点符号有没有跟错地方。但是有了模板字符串，拼接难度直线下降：

```js
var name = 'css'   
var career = 'coder' 
var hobby = ['coding', 'writing']
var finalString = `my name is ${name}, I work as a ${career} I love ${hobby[0]} and ${hobby[1]}`
```

字符串不仅更容易拼了，也更易读了，代码整体的质量都变高了。这就是模板字符串的**第一个优势——允许用${}的方式嵌入变量**。但这还不是问题的关键，模板字符串的关键优势有两个：

- **在模板字符串中，空格、缩进、换行都会被保留**
- **模板字符串完全支持“运算”式的表达式，可以在${}里完成一些计算**



基于第一点，可以在模板字符串里无障碍地直接写 html 代码：

```js
let list = `
    <ul>
        <li>列表项1</li>
        <li>列表项2</li>
    </ul>
`;
console.log(message); // 正确输出，不存在报错
```

基于第二点，可以把一些简单的计算和调用丢进 ${} 来做：

```js
function add(a, b) {
  const finalString = `${a} + ${b} = ${a+b}`
  console.log(finalString)
}
add(1, 2) // 输出 '1 + 2 = 3'
```

除了模板语法外， ES6中还新增了一系列的字符串方法用于提升开发效率：

- **存在性判定**：在过去，当判断一个字符/字符串是否在某字符串中时，只能用 indexOf > -1 来做。现在 ES6 提供了三个方法：includes、startsWith、endsWith，它们都会返回一个布尔值来告诉你是否存在。

  - **includes**：判断字符串与子串的包含关系：

  ```js
  const son = 'haha' 
  const father = 'xixi haha hehe'
  father.includes(son) // true
  ```

  - **startsWith**：判断字符串是否以某个/某串字符开头：

  ```js
  const father = 'xixi haha hehe'
  father.startsWith('haha') // false
  father.startsWith('xixi') // true
  ```

  - **endsWith**：判断字符串是否以某个/某串字符结尾：

  ```js
  const father = 'xixi haha hehe'
    father.endsWith('hehe') // true
  ```

- **自动重复**：可以使用 repeat 方法来使同一个字符串输出多次（被连续复制多次）：

```js
const sourceCode = 'repeat for 3 times;'
const repeated = sourceCode.repeat(3) 
console.log(repeated) // repeat for 3 times;repeat for 3 times;repeat for 3 times;
```



# 三、 JavaScript 基础

## 1. new 操作符的实现原理

**new操作符的执行过程：**

（1）首先创建了一个新的空对象

（2）设置原型，将对象的原型设置为函数的 prototype 对象。

（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）

（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```js
function myNew(fn, ...args) {
    let obj = Object.create(fn.prototype)
    let res = fn.call(obj, ...args)
    if(res && (typeof res === 'object' || typeof res === 'function')) {
        return res
    }
    return obj
}
```



## 2. map和Object的区别

|          | Map                                                          | Object                                                       |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 意外的键 | Map默认情况不包含任何键，只包含显式插入的键。                | Object 有一个原型, 原型链上的键名有可能和自己在对象上的设置的键名产生冲突。 |
| 键的类型 | Map的键可以是任意值，包括函数、对象或任意基本类型。          | Object 的键必须是整数、 String 或是Symbol。                  |
| 键的顺序 | Map 中的 key 是有序的。因此，当迭代的时候， Map 对象以插入的顺序返回键值。 | Object 的键是无序的                                          |
| Size     | Map 的键值对个数可以轻易地通过size 属性获取                  | Object 的键值对个数只能手动计算                              |
| 迭代     | Map 是 iterable 的，所以可以直接被迭代。                     | 迭代Object需要以某种方式获取它的键然后才能迭代。             |
| 性能     | 在频繁增删键值对的场景下表现更好。                           | 在频繁添加和删除键值对的场景下未作出优化。                   |
| 同名碰撞 | Map 的键存的是内存的地址，只要地址不一样，就是两个不同的键，允许键同名 | 不允许                                                       |



## 3. map和weakMap的区别

**（1）Map**

**map本质上就是键值对的集合**，但是普通的Object中的键值对中的键只能是字符串。而ES6提供的Map数据结构类似于对象，**但是它的键不限制范围，可以是任意类型**，是一种更加完善的Hash结构。如果Map的键是一个原始数据类型，只要两个键严格相同，就视为是同一个键。



**实际上Map是一个数组，它的每一个数据也都是一个数组**，其形式如下：

```js
const map = [
     ["name","张三"],
     ["age",18],
]
```

Map数据结构有以下操作方法：

- **size**： `map.size` 返回Map结构的成员总数。
- **set(key,value)**：设置键名key对应的键值value，然后返回整个Map结构，如果key已经有值，则键值会被更新，否则就新生成该键。（因为返回的是当前Map对象，所以可以链式调用）
- **get(key)**：该方法读取key对应的键值，如果找不到key，返回undefined。
- **has(key)**：该方法返回一个布尔值，表示某个键是否在当前Map对象中。
- **delete(key)**：该方法删除某个键，返回true，如果删除失败，返回false。
- **clear()**：map.clear()清除所有成员，没有返回值。



Map结构原生提供是三个遍历器生成函数和一个遍历方法

- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。
- forEach()：遍历Map的所有成员。

```js
const map = new Map([
     ["foo",1],
     ["bar",2],
])
for(let key of map.keys()){
    console.log(key);  // foo bar
}
for(let value of map.values()){
     console.log(value); // 1 2
}
for(let items of map.entries()){
    console.log(items);  // ["foo",1]  ["bar",2]
}
map.forEach( (value,key,map) => {
     console.log(key,value); // foo 1    bar 2
})
```

**（2）WeakMap**

WeakMap 对象也是一组键值对的集合，其中的键是弱引用的。**其键必须是对象**，原始数据类型不能作为key值，而值可以是任意的。



该对象也有以下几种方法：

- **set(key,value)**：设置键名key对应的键值value，然后返回整个Map结构，如果key已经有值，则键值会被更新，否则就新生成该键。（因为返回的是当前Map对象，所以可以链式调用）
- **get(key)**：该方法读取key对应的键值，如果找不到key，返回undefined。
- **has(key)**：该方法返回一个布尔值，表示某个键是否在当前Map对象中。
- **delete(key)**：该方法删除某个键，返回true，如果删除失败，返回false。

其clear()方法已经被弃用，所以可以通过创建一个空的WeakMap并替换原对象来实现清除。



WeakMap的设计目的在于，有时想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这两个对象，就必须手动删除这个引用，否则垃圾回收机制就不会释放对象占用的内存。



而WeakMap的**键名所引用的对象都是弱引用**，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的**键名对象和所对应的键值对会自动消失，不用手动删除引用**。



**总结：**

- Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
- WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。



## 4. JavaScript 有哪些内置对象

全局的对象（`global objects`）或称标准内置对象，不要和 "全局对象（`global object`）" 混淆。这里说的全局的对象是说在
全局作用域里的对象。全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。

标准内置对象的分类

（1）值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法。

例如 `Infinity`、`NaN`、`undefined`、`null` 字面量

（2）函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。

例如 `eval()`、`parseFloat()`、`parseInt()` 等

（3）基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

例如 `Object`、`Function`、`Boolean`、`Symbol`、`Error` 等

（4）数字和日期对象，用来表示数字、日期和执行数学计算的对象。

例如 `Number`、`Math`、`Date`

（5）字符串，用来表示和操作字符串的对象。

例如 `String`、`RegExp`

（6）可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。例如 `Array`

（7）使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。

例如 `Map`、`Set`、`WeakMap`、`WeakSet`

（8）矢量集合，`SIMD` 矢量集合中的数据会被组织为一个数据序列。

例如 `SIMD` 等

（9）结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。

例如 `JSON` 等

（10）控制抽象对象

例如 `Promise`、`Generator` 等

（11）反射

例如 `Reflect`、`Proxy`

（12）国际化，为了支持多语言处理而加入 `ECMAScript` 的对象。

例如 `Intl`、`Intl.Collator` 等

（13）`WebAssembly`

（14）其他

例如 `arguments`



**回答：**

js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些全局值属性、函数和用来实例化其他对象的构造函数对象。

一般我们经常用到的如全局变量值 `NaN`、`undefined`，全局函数如 `parseInt()`、`parseFloat()` 用来实例化对象的构造函数如 `Date`、`Object` 等，还有提供数学计算的单体内置对象如 `Math` 对象。

**详细资料可以参考：**

- [《标准内置对象的分类》](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)
- [《JS 所有内置对象属性和方法汇总》](https://segmentfault.com/a/1190000011467723#articleHeader24)



## 5. 常用的正则表达式有哪些？

```js
// （1）匹配 16 进制颜色值
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;

// （2）匹配日期，如 yyyy-mm-dd 格式
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// （3）匹配 qq 号
var regex = /^[1-9][0-9]{4,10}$/g;

// （4）手机号码正则
var regex = /^1[34578]\d{9}$/g;

// （5）用户名正则
var regex = /^[a-zA-Z\$][a-zA-Z0-9_\$]{4,16}$/;
```



## 6. 对 JSON 的理解

**JSON 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。**



在项目开发中，使用 JSON 作为前后端数据交换的方式。在前端通过将一个符合 JSON 格式的数据结构序列化为 

JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。



因为 JSON 的语法是基于 js 的，因此很容易将 JSON 和 js 中的对象弄混，但是应该注意的是 JSON 和 js 中的对象不是一回事，JSON 中对象格式更加严格，比如说在 JSON 中属性值不能为函数，不能出现 NaN 这样的属性值等，因此大多数的 js 对象是不符合 JSON 对象的格式的。



在 js 中提供了两个函数来实现 js 数据结构和 JSON 格式的转换处理，

- JSON.stringify 函数，通过传入一个符合 JSON 格式的数据结构，将其转换为一个 JSON 字符串。如果传入的数据结构不符合 JSON 格式，那么在序列化的时候会对这些值进行对应的特殊处理，使其符合规范。在前端向后端发送数据时，可以调用这个函数将数据对象转化为 JSON 格式的字符串。
- JSON.parse() 函数，这个函数用来将 JSON 格式的字符串转换为一个 js 数据结构，如果传入的字符串不是标准的 JSON 格式的字符串的话，将会抛出错误。当从后端接收到 JSON 格式的字符串时，可以通过这个方法来将其解析为一个 js 数据结构，以此来进行数据的访问。



## 7. JavaScript 脚本延迟加载的方式有哪些？

js实现延迟加载的几种方法，js的延迟加载有助与提高页面的加载速度

JS延迟加载，也就是等页面加载完成之后再加载 JavaScript 文件。

一般有以下几种方式：

- **defer 属性：**给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
- **async 属性：**给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
- **动态创建 DOM 方式：**动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。
- **使用 setTimeout 延迟方法：**设置一个定时器来延迟加载js脚本文件
- **让 JS 最后加载：**将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。



## 8. JavaScript 类数组对象的定义

所谓类数组对象，就是指可以**通过索引属性访问元素**并且**拥有 length** 属性的对象。

一个简单的类数组对象是长这样的

```js
var arrLike = {
  0: 'name',
  1: 'age',
  2: 'job',
  length: 3
}
```

而它所对应的数组应该是这样子的

```js
var arr = ['name', 'age', 'job'];
```

我们说类数组对象与数组的性质相似，是因为类数组对象在**访问**、**赋值**、**获取长度**上的操作与数组是一致的。**常见的类数组对象**有 arguments 和 DOM 方法的返回结果。

**常见的类数组转换为数组的方法有这样几种：**

（1）通过 call 调用数组的 slice 方法来实现转换

```js
Array.prototype.slice.call(arrayLike);
```

（2）通过 call 调用数组的 splice 方法来实现转换

```js
Array.prototype.splice.call(arrayLike, 0);
```

（3）通过 apply 调用数组的 concat 方法来实现转换

```js
Array.prototype.concat.apply([], arrayLike);
```

（4）通过 Array.from 方法来实现转换

```js
Array.from(arrayLike);
```



## 9. 数组有哪些原生方法？

- 数组和字符串的转换方法：toString()、toLocalString()、join() 其中 join() 方法可以指定转换为字符串时的分隔符。
- 数组尾部操作的方法 pop() 和 push()，push 方法可以传入多个参数。
- 数组首部操作的方法 shift() 和 unshift() 重排序的方法 reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置。
- 数组连接的方法 concat() ，返回的是拼接好的数组，不影响原数组。
- 数组截取办法 slice()，用于截取数组中的一部分返回，不影响原数组。
- 数组插入方法 splice()，影响原数组查找特定项的索引的方法，indexOf() 和 lastIndexOf() 迭代方法 every()、some()、filter()、map() 和 forEach() 方法
- 数组归并方法 reduce() 和 reduceRight() 方法



## 10. Unicode、UTF-8、UTF-16、UTF-32的区别？

### （1）Unicode

在说`Unicode`之前需要先了解一下`ASCII`码：ASCII 码（`American Standard Code for Information Interchange`）称为美国标准信息交换码。

- 它是基于拉丁字母的一套电脑编码系统。
- 它定义了一个用于代表常见字符的字典。
- 它包含了"A-Z"(包含大小写)，数据"0-9" 以及一些常见的符号。
- 它是专门为英语而设计的，有128个编码，对其他语言无能为力

`ASCII`码可以表示的编码有限，要想表示其他语言的编码，还是要使用`Unicode`来表示，可以说`Unicode`是`ASCII` 的超集。



`Unicode`全称 `Unicode Translation Format`，又叫做统一码、万国码、单一码。`Unicode` 是为了解决传统的字符编码方案的局限而产生的，它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。



`Unicode`的实现方式（也就是编码方式）有很多种，常见的是**UTF-8**、**UTF-16**、**UTF-32**和**USC-2**。

### （2）UTF-8

`UTF-8`是使用最广泛的`Unicode`编码方式，它是一种可变长的编码方式，可以是1—4个字节不等，它可以完全兼容`ASCII`码的128个字符。



**注意：** `UTF-8` 是一种编码方式，`Unicode`是一个字符集合。



`UTF-8`的编码规则：

- 对于**单字节**的符号，字节的第一位为0，后面的7位为这个字符的`Unicode`编码，因此对于英文字母，它的`Unicode`编码和`ACSII`编码一样。
- 对于**n字节**的符号，第一个字节的前n位都是1，第n+1位设为0，后面字节的前两位一律设为10，剩下的没有提及的二进制位，全部为这个符号的`Unicode`码 。



来看一下具体的`Unicode`编号范围与对应的`UTF-8`二进制格式 ：

| 编码范围（编号对应的十进制数）  | 二进制格式                          |
| ------------------------------- | ----------------------------------- |
| 0x00—0x7F （0-127）             | 0xxxxxxx                            |
| 0x80—0x7FF （128-2047）         | 110xxxxx 10xxxxxx                   |
| 0x800—0xFFFF  （2048-65535）    | 1110xxxx 10xxxxxx 10xxxxxx          |
| 0x10000—0x10FFFF  （65536以上） | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx |

那该如何通过具体的`Unicode`编码，进行具体的`UTF-8`编码呢？**步骤如下：**

- 找到该`Unicode`编码的所在的编号范围，进而找到与之对应的二进制格式
- 将`Unicode`编码转换为二进制数（去掉最高位的0）
- 将二进制数从右往左一次填入二进制格式的`X`中，如果有`X`未填，就设为0



来看一个实际的例子：

“**马**” 字的`Unicode`编码是：`0x9A6C`，整数编号是`39532`

（1）首选确定了该字符在第三个范围内，它的格式是 `1110xxxx 10xxxxxx 10xxxxxx`

（2）39532对应的二进制数为`1001 1010 0110 1100`

（3）将二进制数填入X中，结果是：`11101001 10101001 10101100`

### （3）UTF-16

**1. 平面的概念**

在了解`UTF-16`之前，先看一下**平面**的概念：

`Unicode`编码中有很多很多的字符，它并不是一次性定义的，而是分区进行定义的，每个区存放**65536**（216）个字符，这称为一个**平面**，目前总共有17 个平面。



最前面的一个平面称为**基本平面**，它的码点从**0 — 2****16****-1**，写成16进制就是`U+0000 — U+FFFF`，那剩下的16个平面就是**辅助平面**，码点范围是 `U+10000—U+10FFFF`。

**2. UTF-16 概念：**

`UTF-16`也是`Unicode`编码集的一种编码形式，把`Unicode`字符集的抽象码位映射为16位长的整数（即码元）的序列，用于数据存储或传递。`Unicode`字符的码位需要1个或者2个16位长的码元来表示，因此`UTF-16`也是用变长字节表示的。

**3. UTF-16 编码规则：**

- 编号在 `U+0000—U+FFFF` 的字符（常用字符集），直接用两个字节表示。
- 编号在 `U+10000—U+10FFFF` 之间的字符，需要用四个字节表示。

**4. 编码识别**

那么问题来了，当遇到两个字节时，怎么知道是把它当做一个字符还是和后面的两个字节一起当做一个字符呢？



`UTF-16` 编码肯定也考虑到了这个问题，在基本平面内，从 `U+D800 — U+DFFF` 是一个空段，也就是说这个区间的码点不对应任何的字符，因此这些空段就可以用来映射辅助平面的字符。



辅助平面共有 **2****20** 个字符位，因此表示这些字符至少需要 20 个二进制位。`UTF-16` 将这 20 个二进制位分成两半，前 10 位映射在 `U+D800 — U+DBFF`，称为**高位**（H），后 10 位映射在 `U+DC00 — U+DFFF`，称为**低位**（L）。这就相当于，将一个辅助平面的字符拆成了两个基本平面的字符来表示。



因此，当遇到两个字节时，发现它的码点在 `U+D800 —U+DBFF`之间，就可以知道，它后面的两个字节的码点应该在 `U+DC00 — U+DFFF` 之间，这四个字节必须放在一起进行解读。

**5. 举例说明**

以 "**𡠀**" 字为例，它的 `Unicode` 码点为 `0x21800`，该码点超出了基本平面的范围，因此需要用四个字节来表示，步骤如下：

- 首先计算超出部分的结果：`0x21800 - 0x10000`
- 将上面的计算结果转为20位的二进制数，不足20位就在前面补0，结果为：`0001000110 0000000000`
- 将得到的两个10位二进制数分别对应到两个区间中
- `U+D800` 对应的二进制数为 `1101100000000000`， 将`0001000110`填充在它的后10 个二进制位，得到 `1101100001000110`，转成 16 进制数为 `0xD846`。同理，低位为 `0xDC00`，所以这个字的`UTF-16` 编码为 `0xD846 0xDC00`

### （4）UTF-32

`UTF-32` 就是字符所对应编号的整数二进制形式，每个字符占四个字节，这个是直接进行转换的。该编码方式占用的储存空间较多，所以使用较少。



比如“**马**” 字的Unicode编号是：`U+9A6C`，整数编号是`39532`，直接转化为二进制：`1001 1010 0110 1100`，这就是它的UTF-32编码。

### （5）总结

**Unicode、UTF-8、UTF-16、UTF-32有什么区别？**

- `Unicode` 是编码字符集（字符集），而`UTF-8`、`UTF-16`、`UTF-32`是字符集编码（编码规则）；
- `UTF-16` 使用变长码元序列的编码方式，相较于定长码元序列的`UTF-32`算法更复杂，甚至比同样是变长码元序列的`UTF-8`也更为复杂，因为其引入了独特的**代理对**这样的代理机制；
- `UTF-8`需要判断每个字节中的开头标志信息，所以如果某个字节在传送过程中出错了，就会导致后面的字节也会解析出错；而`UTF-16`不会判断开头标志，即使错也只会错一个字符，所以容错能力教强；
- 如果字符内容全部英文或英文与其他文字混合，但英文占绝大部分，那么用`UTF-8`就比`UTF-16`节省了很多空间；而如果字符内容全部是中文这样类似的字符或者混合字符中中文占绝大多数，那么`UTF-16`就占优势了，可以节省很多空间；



## 11. 常见的位运算符有哪些？其计算规则是什么？

现代计算机中数据都是以二进制的形式存储的，即0、1两种状态，计算机对二进制数据进行的运算加减乘除等都是叫位运算，即将符号位共同参与运算的运算。



常见的位运算有以下几种：

| 运算符 | 描述 | 运算规则                                                 |
| ------ | ---- | -------------------------------------------------------- |
| `&`    | 与   | 两个位都为1时，结果才为1                                 |
| `|`    | 或   | 两个位都为0时，结果才为0                                 |
| `^`    | 异或 | 两个位相同为0，相异为1                                   |
| `~`    | 取反 | 0变1，1变0                                               |
| `<<`   | 左移 | 各二进制位全部左移若干位，高位丢弃，低位补0              |
| `>>`   | 右移 | 各二进制位全部右移若干位，正数左补0，负数左补1，右边丢弃 |

### 1. 按位与运算符（&）

**定义：** 参加运算的两个数据**按二进制位**进行“与”运算。

**运算规则：**

```
0 & 0 = 0  
0 & 1 = 0  
1 & 0 = 0  
1 & 1 = 1
```

总结：两位同时为1，结果才为1，否则结果为0。

例如：3&5 即：

```
0000 0011 
   0000 0101 
 = 0000 0001
```

因此 3&5 的值为1。

注意：负数按补码形式参加按位与运算。

**用途：**

**（1）判断奇偶**

只要根据最未位是0还是1来决定，为0就是偶数，为1就是奇数。因此可以用`if ((i & 1) == 0)`代替`if (i % 2 == 0)`来判断a是不是偶数。

**（2）清零**

如果想将一个单元清零，即使其全部二进制位为0，只要与一个各位都为零的数值相与，结果为零。

### 2. 按位或运算符（|）

**定义：** 参加运算的两个对象按二进制位进行“或”运算。

**运算规则：**

```
0 | 0 = 0
0 | 1 = 1  
1 | 0 = 1  
1 | 1 = 1
```

总结：参加运算的两个对象只要有一个为1，其值为1。

例如：3|5即：

```
0000 0011
  0000 0101 
= 0000 0111
```

因此，3|5的值为7。

注意：负数按补码形式参加按位或运算。

### 3. 异或运算符（^）

**定义：** 参加运算的两个数据按二进制位进行“异或”运算。

**运算规则：**

```
0 ^ 0 = 0  
0 ^ 1 = 1  
1 ^ 0 = 1  
1 ^ 1 = 0
```

总结：参加运算的两个对象，如果两个相应位相同为0，相异为1。

例如：3|5即：

```
0000 0011
  0000 0101 
= 0000 0110
```

因此，3^5的值为6。

异或运算的性质:

- 交换律：`(a^b)^c == a^(b^c)`
- 结合律：`(a + b)^c == a^b + b^c`
- 对于任何数x，都有 `x^x=0，x^0=x`
- 自反性: `a^b^b=a^0=a`;

### 4. 取反运算符 (~)

**定义：** 参加运算的一个数据按二进制进行“取反”运算。

运算规则：

```
~ 1 = 0
~ 0 = 1
```

总结：对一个二进制数按位取反，即将0变1，1变0。

例如：~6 即：

```
0000 0110
= 1111 1001
```

在计算机中，正数用原码表示，负数使用补码存储，首先看最高位，最高位1表示负数，0表示正数。此计算机二进制码为负数，最高位为符号位。

当发现按位取反为负数时，就**直接取其补码**，变为十进制：

```
0000 0110
   = 1111 1001
反码：1000 0110
补码：1000 0111
```

因此，~6的值为-7。

### 5. 左移运算符（<<）

**定义：** 将一个运算对象的各二进制位全部左移若干位，左边的二进制位丢弃，右边补0。

设 a=1010 1110，a = a<< 2 将a的二进制位左移2位、右补0，即得a=1011 1000。

若左移时舍弃的高位不包含1，则每左移一位，相当于该数乘以2。

### 6. 右移运算符（>>）

**定义：** 将一个数的各二进制位全部右移若干位，正数左补0，负数左补1，右边丢弃。

例如：a=a>>2 将a的二进制位右移2位，左补0 或者 左补1得看被移数是正还是负。

操作数每右移一位，相当于该数除以2。

### 7. 原码、补码、反码

上面提到了补码、反码等知识，这里就补充一下。

计算机中的**有符号数**有三种表示方法，即原码、反码和补码。三种表示方法均有符号位和数值位两部分，符号位都是用0表示“正”，用1表示“负”，而数值位，三种表示方法各不相同。

**（1）原码**

原码就是一个数的二进制数。

例如：10的原码为0000 1010

**（2）反码**

- 正数的反码与原码相同，如：10 反码为 0000 1010
- 负数的反码为除符号位，按位取反，即0变1，1变0。

例如：-10

```
原码：1000 1010
反码：1111 0101
```

**（3）补码**

- 正数的补码与原码相同，如：10 补码为 0000 1010
- 负数的补码是原码除符号位外的所有位取反即0变1，1变0，然后加1，也就是反码加1。

例如：-10

```
原码：1000 1010
反码：1111 0101
补码：1111 0110
```



## 12. 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?

`arguments`是一个对象，它的属性是从 0 开始依次递增的数字，还有`callee`和`length`等属性，与数组相似；但是它却没有数组常见的方法属性，如`forEach`, `reduce`等，所以叫它们类数组。



要遍历类数组，有三个方法：

（1）将数组的方法应用到类数组上，这时候就可以使用`call`和`apply`方法，如：

```js
function foo(){ 
  Array.prototype.forEach.call(arguments, a => console.log(a))
}
```

（2）使用Array.from方法将类数组转化成数组：‌

```js
function foo(){ 
  const arrArgs = Array.from(arguments) 
  arrArgs.forEach(a => console.log(a))
}
```

（3）使用展开运算符将类数组转化成数组

```js
function foo(){ 
    const arrArgs = [...arguments] 
    arrArgs.forEach(a => console.log(a)) 
}
```



## 13. 什么是 DOM 和 BOM？

- DOM 指的是文档对象模型，它指的是把文档当做一个对象，这个对象主要定义了处理网页内容的方法和接口。
- BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 location 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对象的子对象。



## 14. escape、encodeURL、encodeURLComponent 的区别

1. escape()

   > 该函数现不提倡使用，但由历史原因，有很多地方仍在使用它。
   >
   > **作用：**它不能直接用于url编码，它的真正作用是返回一个字符的Unicode编码值。
   >
   > **对应的解码函数：**unescape()。
   >
   > **注意：**无论网页的原始编码是什么，一旦被js编码，就都变为unicode字符。其次，escape不对“+"编码。

2. encodeURL()

   > **它是js中真正用来对URL编码的函数。**
   >
   > 它着眼于对**整个URL**进行编码，因此除了常见的符号以外，对其他一些在网址中有特殊含义的符号“; / ? : @ & = + $ , #”，也不进行编码。编码后，它输出符号的utf-8形式，并且在**每个字节前加上%。**
   >
   > 它对应的解码函数是decodeURI()。
   >
   > 需要注意的是，它不对单引号'编码。

3. encodeURLComponent()

   > 它与encodeURL的**区别**是，它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码。
   >
   > 因此，“; / ? : @ & = + $ , #”，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码。至于具体的编码方法，两者是一样。
   >
   > 它对应的解码函数是decodeURIComponent()。

4. encodeURL 与 encodeURLComponent 的区别

   > 区别就是encodeURIComponent编码范围更广，适合给参数编码，encodeURI适合给URL本身（locaion.origin）编码,当然项目里一般都是用qs库去处理



## 15. 对 Ajax 的理解，实现一个 Ajax 请求

`AJAX`全称(Async Javascript and XML)

即异步的`JavaScript` 和`XML`，是**一种创建交互式网页应用的网页开发技术，可以在不重新加载整个网页的情况下，与服务器交换数据，并且更新部分网页**

`Ajax`的原理简单来说通过`XmlHttpRequest`对象来向服务器发异步请求，从服务器获得数据，然后用`JavaScript`来操作`DOM`而更新页面

**实现过程**

- 创建 `Ajax`的核心对象 `XMLHttpRequest`对象
- 通过 `XMLHttpRequest` 对象的 `open()` 方法与服务端建立连接
- 构建请求所需的数据内容，并通过`XMLHttpRequest` 对象的 `send()` 方法发送给服务器端
- 通过 `XMLHttpRequest` 对象提供的 `onreadystatechange` 事件监听服务器端你的通信状态
- 接受并处理服务端向客户端响应的数据结果
- 将处理结果更新到 `HTML`页面中
- **其中，readyState 各个状态如下**：
  - 0 - **未初始化**，还没有调用 send() 方法
  - 1 - **载入**，已调用 send() 方法，正在发送请求
  - 2 - **载入完成**，send() 方法执行完成，已经接收到全部响应内容
  - 3 - **交互**，正在解析响应内容
  - 4 - **完成**，响应内容解析完成，可以在客户端调用了

```js
function myAjax(method, url) {
    // 创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest()
    // 第三个参数布尔值，表示是否异步执行操作，默认为true，表开启异步
    xhr.open(method, url, true)
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr.status < 300) {
                console.log(xhr.responseText)
            } else if(xhr.status >= 400) {
                console.log("错误信息："+xhr.status)
            }
        }
    }
    xhr.send()
}
```

**使用 promise 封装 ajax**

```js
function myPromiseAjax(method = 'GET', url) {
    const p = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
    	xhr.open(method, url, true)
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response)
                } else if(xhr.status >= 400) {
                    reject(xhr.status)
                }
            }
        }
		xhr.send()
    })
    return p;
}
```



## 16. JavaScript 为什么要进行变量提升，它导致了什么问题？

### 前言：

用过的JavaScript的应该都知道，它有变量提升的机制，不过可能很少去考虑为什么会有变量提升的机制，现在就来看一下为什么要进行变量提升。

### 1. 什么是变量提升？

变量提升实际上很容易理解，就是说在任何位置所声明的变量或函数，都会自动“提”到最前面，就好像它们是在函数的开头声明的一样。

### 2. 为什么进行变量提升？

首先我们要知道，JS在拿到一个变量或者一个函数的时候，会有两步操作，即**解析和执行**。

- **在解析阶段**，JS会检查语法，并对函数进行预编译。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为undefined，函数先声明好可使用。在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出this、arguments和函数的参数。
  - 全局上下文：变量定义，函数声明
  - 函数上下文：变量定义，函数声明，this，arguments
- **在执行阶段**，就是按照代码的顺序依次执行。



那为什么会进行变量提升呢？主要有以下两个原因：

- 提高性能
- 容错性更好

#### （1）提高性能

在JS代码执行之前，会进行语法检查和预编译，并且这一操作只进行一次。这么做就是为了提高性能，如果没有这一步，那么每次执行代码前都必须重新解析一遍该变量（函数），而这是没有必要的，因为变量（函数）的代码并不会改变，解析一遍就够了。

在解析的过程中，还会为函数生成预编译代码。在预编译时，会统计声明了哪些变量、创建了哪些函数，并对函数的代码进行压缩，去除注释、不必要的空白等。这样做的好处就是每次执行函数时都可以直接为该函数分配栈空间（不需要再解析一遍去获取代码中声明了哪些变量，创建了哪些函数），并且因为代码压缩的原因，代码执行也更快了。

#### （2）容错性更好

变量提升可以在一定程度上提高JS的容错性，看下面的代码：

```js
a = 1;
var a;
console.log(a);
```

如果没有变量提升，这两行代码就会报错，但是因为有了变量提升，这段代码就可以正常执行。

虽然，我们在可以开发过程中，可以完全避免这样写，但是有时代码很复杂的时候。可能因为疏忽而先使用后定义了，这样也不会影响正常使用。由于变量提升的存在，而会正常运行。

#### 总结：

- **解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间**
- **声明提升还可以提高JS代码的容错性，使一些不规范的代码也可以正常执行**



### 3. 变量提升导致的问题

变量提升虽然有一些优点，但是他也会造成一定的问题，在ES6中提出了let、const来定义变量，它们就没有变量提升的机制。

下面来看一下变量提升可能会导致的问题：

```js
var tmp = new Date();

function fn(){
	console.log(tmp);
	if(false){
		var tmp = 'hello world';
	}
}

fn();  // undefined
```

在这个函数中，原本是要打印出外层的tmp变量，但是因为变量提升的问题，内层定义的tmp被提到函数内部的最顶部，相当于覆盖了外层的tmp，所以打印结果为undefined。

```js
var tmp = 'hello world';

for (var i = 0; i < tmp.length; i++) {
	console.log(tmp[i]);
}

console.log(i); // 11
```

由于遍历时定义的i会变量提升成为一个全局变量，在函数结束之后不会被销毁，所以打印出来11。


## 17. 什么是尾调用，使用尾调用有什么好处?

### 什么是尾调用

尾调用的概念非常简单，一句话就能说清楚，就是**指某个函数的最后一步是调用另一个函数**。

```javascript
function f(x){
  return g(x);
}
```

上面代码中，函数f的最后一步是调用函数g，这就叫尾调用。

以下两种情况，都不属于尾调用。

```javascript
// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}
```

上面代码中，情况一是调用函数g之后，还有别的操作，所以不属于尾调用，即使语义完全一样。情况二也属于调用后还有操作，即使写在一行内。

尾调用不一定出现在函数尾部，只要是最后一步操作即可。

```javascript
function f(x) {
  if (x > 0) {
    return m(x)
  }
  return n(x);
}
```

上面代码中，函数m和n都属于尾调用，因为它们都是函数f的最后一步操作。

### 尾调用优化

尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

我们知道，函数调用会在内存形成一个"调用记录"，又称"调用帧"（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用记录上方，还会形成一个B的调用记录。等到B运行结束，将结果返回到A，B的调用记录才会消失。如果函数B内部还调用函数C，那就还有一个C的调用记录栈，以此类推。所有的调用记录，就形成一个["调用栈"](https://zh.wikipedia.org/wiki/调用栈)（call stack）。

![image-20210825181914707](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210825181914707.png)

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用记录，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用记录，取代外层函数的调用记录就可以了。

```javascript
function f() {
  let m = 1;
  let n = 2;
  return g(m + n);
}
f();

// 等同于
function f() {
  return g(3);
}
f();

// 等同于
g(3);
```

上面代码中，如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除 f() 的调用记录，只保留 g(3) 的调用记录。

**这就叫做"尾调用优化"（Tail call optimization），即只保留内层函数的调用记录。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用记录只有一项，这将大大节省内存。**这就是"尾调用优化"的意义。

### 注意

**ES6的尾调用优化只在严格模式下开启，正常模式是无效的。**

这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

- `arguments`：返回调用时函数的参数。
- `func.caller`：返回调用当前函数的那个函数。

尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。



## 18. ES6 模块与 COMMONJS 模块有什么异同？

- 因为**CommonJS**的`require`语法是同步的，所以就导致了**CommonJS**模块规范只适合用在服务端，而ES6模块无论是在浏览器端还是服务端都是可以使用的，但是在服务端中，还需要遵循一些特殊的规则才能使用 ；

- **CommonJS** 模块输出的是一个值的拷贝，而**ES6 模块**输出的是值的引用；

  - CommonJS输出的是值的拷贝，换句话说就是，一旦输出了某个值，如果模块内部后续的变化，影响不了外部对这个值的使用。具体例子：

    ```javascript
    // lib.js
    var counter = 3;
    function incCounter() {
      counter++;
    }
    module.exports = {
      counter: counter,
      incCounter: incCounter,
    };
    ```

    然后我们在其它文件中使用这个模块：

    ```js
    var mod = require('./lib');
    console.log(mod.counter);  // 3
    mod.incCounter();
    console.log(mod.counter); // 3
    ```

    上面的例子充分说明了如果我们对外输出了`counter` 变量，就算后续调用模块内部的`incCounter` 方法去修改它的值，它的值依旧没有变化。

    ES6模块运行机制完全不一样，JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。等到脚本真正执行的时候，再根据这个只读引用，到被加载的那个模块里去取值。

    ```js
    // lib.js
    export let counter = 3;
    export function incCounter() {
      counter++;
    }
    
    // main.js
    import { counter, incCounter } from './lib';
    console.log(counter); // 3
    incCounter();
    console.log(counter); // 4
    ```

    上面代码说明，ES6 模块`import`的变量`counter`是可变的，完全反应其所在模块`lib.js`内部的变化。

- **CommonJS** 模块是运行时加载，而ES6 模块是编译时输出接口，使得对JS的模块进行静态分析成为了可能；

  - 我们知道CommonJS其实加载的是一个对象，这个对象只有在脚本运行时才会生成，而且只会生成一次，这个后面我们会具体解释。但是ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成，这样我们就可以使用各种工具对JS模块进行依赖分析，优化代码，而Webpack中的 `tree shaking` 和 `scope hoisting` 实际上就是依赖ES6模块化。

- 因为两个模块加载机制的不同，所以在对待循环加载的时候，它们会有不同的表现。**CommonJS**遇到循环依赖的时候，只会输出已经执行的部分，后续的输出或者变化，是不会影响已经输出的变量。而ES6模块相反，使用`import`加载一个变量，变量不会被缓存，真正取值的时候就能取到最终的值；

- 关于模块顶层的`this`指向问题，在**CommonJS**顶层，`this`指向当前模块；而在ES6模块中，`this`指向`undefined`；

- 关于两个模块互相引用的问题，在ES6模块当中，是支持加载**CommonJS**模块的。但是反过来，**CommonJS**并不能`require`ES6模块，在NodeJS中，两种模块方案是分开处理的。



## 19. 常见的 DOM 操作有哪些

### 1）DOM 节点的获取

DOM 节点的获取的API及使用：

```js
getElementById // 按照 id 查询
getElementsByTagName // 按照标签名查询
getElementsByClassName // 按照类名查询
querySelectorAll // 按照 css 选择器查询

// 按照 id 查询
var imooc = document.getElementById('imooc') // 查询到 id 为 imooc 的元素
// 按照标签名查询
var pList = document.getElementsByTagName('p')  // 查询到标签为 p 的集合
console.log(divList.length)
console.log(divList[0])
// 按照类名查询
var moocList = document.getElementsByClassName('mooc') // 查询到类名为 mooc 的集合
// 按照 css 选择器查询
var pList = document.querySelectorAll('.mooc') // 查询到类名为 mooc 的集合
```

### 2）DOM 节点的创建

**创建一个新节点，并把它添加到指定节点的后面。**已知的 HTML 结构如下：

```html
<html>
  <head>
    <title>DEMO</title>
  </head>
  <body>
    <div id="container"> 
      <h1 id="title">我是标题</h1>
    </div>   
  </body>
</html>
```

要求添加一个有内容的 span 节点到 id 为 title 的节点后面，做法就是：

```js
// 首先获取父节点
var container = document.getElementById('container')
// 创建新节点
var targetSpan = document.createElement('span')
// 设置 span 节点的内容
targetSpan.innerHTML = 'hello world'
// 把新创建的元素塞进父节点里去
container.appendChild(targetSpan)
```

### 3）DOM 节点的删除

**删除指定的 DOM 节点，**已知的 HTML 结构如下：

```html
<html>
  <head>
    <title>DEMO</title>
  </head>
  <body>
    <div id="container"> 
      <h1 id="title">我是标题</h1>
    </div>   
  </body>
</html>
```

需要删除 id 为 title 的元素，做法是：

```js
// 获取目标元素的父元素
var container = document.getElementById('container')
// 获取目标元素
var targetNode = document.getElementById('title')
// 删除目标元素
container.removeChild(targetNode)
```

或者通过子节点数组来完成删除：

```js
// 获取目标元素的父元素
var container = document.getElementById('container')
// 获取目标元素
var targetNode = container.childNodes[1]
// 删除目标元素
container.removeChild(targetNode)
```

### 4）修改 DOM 元素

修改 DOM 元素这个动作可以分很多维度，比如说移动 DOM 元素的位置，修改 DOM 元素的属性等。



**将指定的两个 DOM 元素交换位置，**已知的 HTML 结构如下：

```js
<html>
  <head>
    <title>DEMO</title>
  </head>
  <body>
    <div id="container"> 
      <h1 id="title">我是标题</h1>
      <p id="content">我是内容</p>
    </div>   
  </body>
</html>
```

现在需要调换 title 和 content 的位置，可以考虑 insertBefore 或者 appendChild：

```js
// 获取父元素
var container = document.getElementById('container')   
 
// 获取两个需要被交换的元素
var title = document.getElementById('title')
var content = document.getElementById('content')
// 交换两个元素，把 content 置于 title 前面
container.insertBefore(content, title)
```



## 20. use strict 是什么意思？使用它区别是什么？

use strict 是一种 ECMAscript5 添加的（严格模式）运行模式，这种模式使得 Javascript 在更严格的条件下运行。设立严格模式的目的如下：

- 消除 Javascript 语法的不合理、不严谨之处，减少怪异行为;
- 消除代码运行的不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 Javascript 做好铺垫。



区别：

- 禁止使用 with 语句。
- 禁止 this 关键字指向全局对象。
- 对象不能有重名的属性。



## 21. 如何判断一个对象是否属于某个类

1. 第一种方式，使用 **instanceof** 运算符来判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
2. 第二种方式，通过对象的 **constructor 属性**来判断，对象的 constructor 属性指向该对象的构造函数，但是这种方式不是很安全，因为 constructor 属性可以被改写。
3. 第三种方式，如果需要判断的是某个内置的引用类型的话，可以使用 **Object.prototype.toString()** 方法来打印对象的[[Class]] 属性来进行判断。



## 22. 强类型语言和弱类型语言的区别

强类型语言是一种强制类型定义的语言，即一旦某一个变量被定义类型，如果不经强制转换，那么它永远就是该数据类型。而弱类型语言是一种弱类型定义的语言，某一个变量被定义类型，该变量可以根据环境变化自动进行转换，不需要经过现行强制转换。

**区别：**

强类型语言和弱类型原因其判断的根本是是否会隐形进行语言类型转变。**强类型原因在速度上可能略逊于弱类型语言，但是强类型定义语带来的严谨性又避免了不必要的错误。**



**额外小知识：**

对于动态语言与静态语言的区分，其根本在**于判断是在运行期间还是在编译期间才确定数据类型。**

js 是动态语言。



## 23. 解释型语言和编译型语言的区别

**(1）解释型语言**

使用专门的解释器对源程序逐行解释成特定平台的机器码并立即执行。是代码在执行时才被解释器一行行动态翻译和执行，而不是在执行之前就完成翻译。解释型语言不需要事先编译，其直接将源代码解释成机器码并立即执行，所以只要某一平台提供了相应的解释器即可运行该程序。其特点总结如下

- 解释型语言每次运行都需要将源代码解释称机器码并执行，效率较低；
- 只要平台提供相应的解释器，就可以运行源代码，所以可以方便源程序移植；
- JavaScript、Python等属于解释型语言。

**（2）编译型语言**

使用专门的编译器，针对特定的平台，将高级语言源代码一次性的编译成可被该平台硬件执行的机器码，并包装成该平台所能识别的可执行性程序的格式。在编译型语言写的程序执行之前，需要一个专门的编译过程，把源代码编译成机器语言的文件，如exe格式的文件，以后要再运行时，直接使用编译结果即可，如直接运行exe文件。因为只需编译一次，以后运行时不需要编译，所以编译型语言执行效率高。其特点总结如下：

- 一次性的编译成平台相关的机器语言文件，运行时脱离开发环境，运行效率高；
- 与特定平台相关，一般无法移植到其他平台；
- C、C++等属于编译型语言。



**两者主要区别在于：**前者源程序编译后即可在该平台运行，后者是在运行期间才编译。所以前者运行速度快，后者跨平台性好。



## 24. for...in 和 for...of 的区别

for…of 是ES6新增的遍历方式，允许遍历一个含有iterator接口的数据结构（数组、对象等）并且返回各项的值，和ES3中的for…in的区别如下

- for…in 获取的是对象的键名，for…of 遍历获取的是对象的键值；
- for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；



**总结：**for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。



## 25. 如何使用 for...of 遍历对象

 `ES6` 中提供了 `for-of`，可以很方便的遍历数组和类数组，但是却不能遍历对象，这是为什么，与 `for-in` 仅仅相差一个单词，用途也是遍历，为什么却不能使用在对象上？

查资料后得知，原来 `ES6` 中引入了 `Iterator`，只有提供了 `Iterator` 接口的数据类型才可以使用 `for-of` 来循环遍历，而 `Array`、`Set`、`Map`、某些类数组如 `arguments` 等数据类型都默认提供了 `Iterator` 接口，所以它们可以使用 `for-of` 来进行遍历

那么原因清楚了，该怎么解决呢？能不能为对象已经其它的一些数据类型提供 `Iterator` 接口呢

答案是可以的，`ES6` 同时提供了 `Symbol.iterator` 属性，只要一个数据结构有这个属性，就会被视为有 `Iterator` 接口，接着就是如何实现这个接口了，如下就是一个最简实现：

```js
newObj[Symbol.iterator] = function* (){
    let keys = Object.keys( this )
        ;
    
    for(let i = 0, l = keys.length; i < l; i++){
        yield {
            key: keys[i]
            , value: this[keys[i]]
        };
    }
}

for(let {key, value} of newObj){
    console.log(key, value );
}
// 输出结果
// e 5
// f 6
```



## 26. ajax、axios、fetch 的区别

**（1）AJAX**

Ajax 即“AsynchronousJavascriptAndXML”（异步 JavaScript 和 XML），是**指一种创建交互式[网页](https://link.zhihu.com/?target=https%3A//baike.baidu.com/item/%E7%BD%91%E9%A1%B5)应用的网页开发技术。它是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术**。通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。其缺点如下：

- 本身是针对MVC编程，不符合前端MVVM的浪潮
- 基于原生XHR开发，XHR本身的架构不清晰
- 不符合关注分离（Separation of Concerns）的原则
- 配置和调用方式非常混乱，而且基于事件的异步模型不友好。



**（2）Fetch**

fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多。**fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象**。



fetch的优点：

- 语法简洁，更加语义化
- 基于标准 Promise 实现，支持 async/await
- 更加底层，提供的API丰富（request, response）
- 脱离了XHR，是ES规范里新的实现方式

fetch的缺点：

- fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
- fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
- fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
- fetch没有办法原生监测请求的进度，而XHR可以



**（3）Axios**

Axios 是一种基于Promise封装的HTTP客户端，其特点如下：

- 浏览器端发起XMLHttpRequests请求
- node端发起http请求
- 支持Promise API
- 监听请求和返回
- 对请求和返回进行转化
- 取消请求
- 自动转换json数据
- 客户端支持抵御CSRF攻击



## 27. 数组的遍历方法有哪些

| **方法**                  | **是否改变原数组** | **特点**                                                     |
| ------------------------- | ------------------ | ------------------------------------------------------------ |
| forEach()                 | 否                 | 数组方法，不改变原数组，没有返回值                           |
| map()                     | 否                 | 数组方法，不改变原数组，有返回值，可链式调用                 |
| filter()                  | 否                 | 数组方法，过滤数组，返回包含符合条件的元素的数组，可链式调用 |
| for...of                  | 否                 | for...of遍历具有Iterator迭代器的对象的属性，返回的是数组的元素、对象的属性值，不能遍历普通的obj对象，将异步循环变成同步循环 |
| every() 和 some()         | 否                 | 数组方法，some()只要有一个是true，便返回true；而every()只要有一个是false，便返回false. |
| find() 和 findIndex()     | 否                 | 数组方法，find()返回的是第一个符合条件的值；findIndex()返回的是第一个返回条件的值的索引值 |
| reduce() 和 reduceRight() | 否                 | 数组方法，reduce()对数组正序操作；reduceRight()对数组逆序操作 |

遍历方法的详细解释：[《细数JavaScript中那些遍历和循环》](https://cuggz.blog.csdn.net/article/details/107649549)



**keys，values，entries**

ES6 提供三个新的方法 —— entries()，keys()和values() —— 用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历

```js
for (let index of ['a', 'b'].keys()) {
console.log(index);
}
// 0
// 1
for (let elem of ['a', 'b'].values()) {
console.log(elem);
}
// 'a'
// 'b'
for (let [index, elem] of ['a', 'b'].entries()) {
console.log(index, elem);
}
// 0 "a"
// 1 "b"
```



## 28. forEach 和 map 方法有什么区别

这方法都是用来遍历数组的，两者区别如下：

- forEach() 方法会针对每一个元素执行提供的函数，对数据的操作会**改变原数组，该方法没有返回值**；
- map() 方法**不会改变原数组的值，返回一个新数组**，新数组中的值为原数组调用函数处理之后的值；



## 29. VO AO GO

### 底层渲染过程

1) 在浏览器中打开页面，浏览器引擎会渲染相关代码（包含JS代码），换句话说，会把代码自上而下执行。
2) 浏览器想要执行代码，会提供一个供代码执行的环境，我们把这个环境叫做`ECStack`（Execution Context Stack）执行环境栈 =》 栈内存 Stack （栈内存作用：供代码自上而下执行）。
3) 最开始执行的是全局代码，所以会形成一个`EC`（GLOBAL）全局上下文，在栈内存中执行全局的代码。
4) 在全局的执行上下文中有一个`VO`（GLOBAL）全局变量对象，可以把接下来定义的变量和对应的值储存到这里面。

> **名词解释：**
>
> ECStack (Execution Context Stack) 执行环境栈，栈内存；
>
> EC (Execution Context) 执行上下文；
>
> AO (Active Object) 私有对象/活动性对象/执行期上下文，就是我们常说的 **作用域**。AO可以理解为VO的一个实例，也就是VO的一个构造函数，然后VO(Context) === AO，所以VO提供的是一个函数中所有变量数据的模板；
>
> VO  (Variable Object) 变量对象：存储当前上下文中的变量；
>
> GO (Global Object) 全局对象 。



### 堆栈定义

堆（heap）（引用类型）：一般由程序员分配释放，若程序员不释放，程序结束时可能由操作系统释放。

栈（stack）（基本类型）：由编译器自动分配释放，存放函数的参数值，局部变量等。

> 所谓栈堆内存，其实就是计算机内存中分配出来的一块空间，用来执行和存储代码的。



### 栈内存和堆内存的区别

栈内存：用来执行代码，存基本类型值的

堆内存：用来存引用类型值的



### 执行过程

#### 前言

研究以下代码如何执行

```js
var x = [12, 23]
function fn(y) {
	y[0] = 100;
	y = [100];
	y[1] = 200
}
fn(x)
console.log(x)
```



#### 1. ECStack、GO、EC、VO、AO

浏览器会在计算机内存分配一块内存，专门用来供代码执行的 **栈内存**，称作 **执行环境栈（ECStack）**同时会创建一个 **全局对象（G0）**，将内置的属性方法（`isNaN`、`setInterval`、`setTimeout`......）存放到一块单独的堆内存空间，并且使用 **window** 指向全局对象

在执行代码前，还需要创建一个 **全局执行上下文（EC(G)）**，创建完成后，进入到栈内存中去执行（进栈）；在当前全局执行上下文中，因为会创建很多变量并且赋值，所以会创建一个 **变量对象VO（Variable Object）**来进行保存，在函数私有上下文中的变量对象叫做 **活动对象AO（Activation Object）**。每个执行上下文都有一个单独的变量对象。

总结不常见的名词：

- 执行环境栈 ECStack（Execution Context Stack）：专门用来供代码执行的栈内存
- 全局对象GO（Global Object）：存放内置的属性方法，window指向
- 全局执行上下文EC(G) （Execution Context(G)）：页面加载后进栈、销毁后出栈
- 变量对象VO（Variable Object）：存放当前执行上下文中创建的变量和值
- 活动对象AO（Activation Object）：函数私有上下文中的变量对象

![didi](https://gitee.com/dadadaxyx/my-images/raw/master/didi.gif)

#### 2. 全局代码执行

当一切准备就绪，就开始从上到下执行代码。执行前还会设计变量提升的问题，这里不展开

```js
var x = [12, 23]
```

js在解析这段代码时，会按照以下3个步骤

- 先创建一个值[12, 23]
- 再创建一个变量x
- 最后将变量与值关联

当创建的值是引用类型时，会在堆内存中开辟新的内存空间用来保存值，创建完成后，会将堆内存地址（通常是16进制）保存到栈内存中；如果创建的值是基本类型时，会直接保存到栈内存中

![didi1](https://gitee.com/dadadaxyx/my-images/raw/master/didi1.gif)

继续向下执行

```js
function fn(y) {
    y[0] = 100
    y = [100]
    y[1] = 200
}
```

函数也是属于引用类型，也需要开辟堆内存空间进行保存，不同于数组和对象保存的是键值对，JS会将函数体通过字符串包裹进行保存，同时也会保存函数相关的属性，例如 **函数名 name:fn、形参个数length:1**等。同时，更重要的是，创建函数的时候，就定义了 **函数的作用域**，也就是 **等于当前创建函数的执行上下文**。在这个例子中，函数fn的作用域就是全局执行上下文，标识为 `[[scope]]:EC(G)`

![ad310ce9d16f41dea92186d788703feb_tplv-k3u1fbpfcp-zoom-1](https://gitee.com/dadadaxyx/my-images/raw/master/ad310ce9d16f41dea92186d788703feb_tplv-k3u1fbpfcp-zoom-1.gif)

在函数创建好后，继续向下执行

```js
fn(x)
```

通过上面的动图了解到，fn和x都指向堆内存地址，所以，fn(x) 相当于 **AAAFFF000(AAAFFF111)**，在执行函数体代码之前，我们需要知道的是：

- **每次函数执行**，都会创建一个 **函数私有执行上下文**，创建完之后，需要进入到栈内存中去执行，此时，执行栈中的 **全局执行上下文就会被压入到栈底（压栈）**
- 同时，需要创建一个 **活动对象AO** 存放当前函数执行上下文中创建的变量和值等

![4ee58aabd027402f91c98c4ebc490c40_tplv-k3u1fbpfcp-zoom-1](https://gitee.com/dadadaxyx/my-images/raw/master/4ee58aabd027402f91c98c4ebc490c40_tplv-k3u1fbpfcp-zoom-1.gif)

再完成函数执行上下文入栈后，接下来会做以下几件事

1. **初始化作用域链scopeChain**：作用域链通常标记为 **<当前执行上下文，函数创建时的作用域>**，而作用域链是为了函数执行过程中，当活动对象不存在某个变量时，会沿着作用域链向上找到
2. **初始化this指向**：本例子中，this等于window
3. **初始化实参集合arguments**
4. **形参赋值** y = x = AAAFFF111
5. **执行函数体** 紧接着就是执行函数体内容，在执行完后，当前函数的执行上下文就会出栈，退出执行栈，而被压入栈底的全局执行上下文又被推到了栈顶，此时会继续执行全局上下文中的代码

![624fc0122f3040d5adbcd0e6913a620d_tplv-k3u1fbpfcp-zoom-1](https://gitee.com/dadadaxyx/my-images/raw/master/624fc0122f3040d5adbcd0e6913a620d_tplv-k3u1fbpfcp-zoom-1.gif)

至此，代码执行结束，最终输出的x是 [100, 23]



# 四、原型与原型链

## 1. 对原型、原型链的理解

**对象的原型**是它构造函数的`prototype`所指向的原型对象。

由对象的原型、以及该对象的原型的原型，以此类推，组成的关系链叫做**原型链**。

![image-20210825234828887](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210825234828887.png)

**总结：**

- 一切对象都是继承自`Object`对象，`Object` 对象直接继承根源对象`null`
- 一切的函数对象（包括 `Object` 对象），都是继承自 `Function` 对象
- `Object` 对象直接继承自 `Function` 对象
- `Function`对象的`__proto__`会指向自己的原型对象，最终还是继承自`Object`对象



## 2. 原型链的终点是什么？如何打印出原型链的终点？

由于 `Object `是构造函数，原型链终点是 `Object.prototype.__proto__`，而 `Object.prototype.__proto__=== null // true`，所以，**原型链的终点是`null`。**



## 3. 如何获得对象非原型链上的属性？

使用后`hasOwnProperty()`方法来判断属性是否属于原型链的属性：

```js
function iterate(obj){
   var res=[];
   for(var key in obj){
        if(obj.hasOwnProperty(key))
           res.push(key+': '+obj[key]);
   }
   return res;
} 
```



# 五、执行上下文/作用域链/闭包

## 1. 对闭包的理解

- **理解1：一个函数和对其周围状态（词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包。**
- **理解2：闭包是指有权访问另一个函数作用域中变量的函数。**



**使用场景：**

1. 创建私有变量

2. 延长变量的生命周期

   > 一般函数的词法环境在函数返回后就被销毁，但是**闭包会保存对创建时所在词法环境的引用**，即便创建时所在的执行上下文被销毁，但创建时所在词法环境依然存在，以达到延长变量的生命周期的目的

在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量。经典面试题：循环中使用闭包解决 var 定义函数的问题

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

首先因为 `setTimeout` 是个异步函数，所以会先把循环全部执行完毕，这时候 `i` 就是 6 了，所以会输出一堆 6。**解决办法有三种**：

- 第一种是使用闭包的方式

```js
for (var i = 1; i <= 5; i++) {
  ;(function(j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}
```

在上述代码中，首先使用了**立即执行函数**将 `i` 传入函数内部，这个时候值就被固定在了参数 `j` 上面不会改变，当下次执行 `timer` 这个闭包的时候，就可以使用外部函数的变量 `j`，从而达到目的。

- 第二种就是使用 `setTimeout` 的**第三个参数**，这个参数会被当成 `timer` 函数的参数传入。

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },
    i * 1000,
    i
  )
}
```

- 第三种就是使用 `let` 定义 `i` 了来解决问题了，这个也是最为推荐的方式

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```



## 2. 对作用域、作用域链的理解

### 作用域

**作用域，**即变量（变量作用域又称为上下文）和函数生效（能被访问）的区域或集合。**换句话说，作用域决定了代码区块中变量和其他资源的可见性。**

**作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。**

**作用域一般分为三类：**

1. **全局作用域**

   任何不在函数中或是大括号中声明的变量，都是在全局作用域下，全局作用域下声明的变量可以在程序的任意位置访问

2. **函数作用域**

   函数作用域也叫局部作用域，如果一个变量是在函数内部声明的它就在一个函数作用域下面。这些变量只能在函数内部访问，不能在函数以外去访问

3. **块级作用域**

   ES6引入了`let`和`const`关键字,和`var`关键字不同，在大括号中使用`let`和`const`声明的变量存在于块级作用域中。在大括号之外不能访问这些变量



###  词法作用域

词法作用域，又叫静态作用域，**变量被创建时就确定好了**，而非执行阶段确定的。

因为 JavaScript 采用的是**词法作用域**，函数的作用域在**函数定义**的时候就决定了。

而与词法作用域相对的是**动态作用域**，函数的作用域是在**函数调用**的时候才决定的。

```js
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();
```

假设JavaScript采用静态作用域，让我们分析下执行过程：

执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。

假设JavaScript采用动态作用域，让我们分析下执行过程：

执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。

前面我们已经说了，JavaScript采用的是静态作用域，所以这个例子的结果是 1。



### 作用域链

在当前作用域中查找所需变量，但是该作用域没有这个变量，那这个变量就是**自由变量**。如果在自己作用域找不到该变量就去父级作用域查找，依次向上级作用域查找，直到访问到window对象就被终止，这一层层的关系就是**作用域链**。

作用域链的作用是**保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，可以访问到外层环境的变量和函数。**

作用域链的本质上是一个指向变量对象的**指针列表**。变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前端始终都是当前执行上下文的变量对象。全局执行上下文的变量对象（也就是全局对象）始终是作用域链的最后一个对象。

当查找一个变量时，如果当前执行环境中没有找到，可以沿着作用域链向后查找。



## 3. 对执行上下文的理解

**1. 执行上下文类型**

1. **全局执行上下文**

   任何不在函数内部的都是全局执行上下文，它首先会创建一个全局的window对象，并且设置this的值等于这个全局对象，一个程序中只有一个全局执行上下文。

2. **函数执行上下文**

   当一个函数被调用时，就会为该函数创建一个新的执行上下文，函数的上下文可以有任意多个。

3. **eval 函数执行上下文**

   执行在eval函数中的代码会有属于他自己的执行上下文，不过eval函数不常使用，不做介绍。



**2. 执行上下文栈**

JavaScript 引擎创建了执行上下文栈来管理执行上下文。**可以把执行上下文栈认为是一个存储函数调用的栈结构，遵循先进后出的原则**。

**步骤：**

当JavaScript执行代码时，首先遇到全局代码，会创建一个全局执行上下文并且压入执行栈中，每当遇到一个函数调用，就会为该函数创建一个新的执行上下文并压入栈顶，引擎会执行位于执行上下文栈顶的函数，当函数执行完成之后，执行上下文从栈中弹出，继续执行下一个上下文。当所有的代码都执行完毕之后，从栈中弹出全局执行上下文。



**3. 执行上下文的生命周期**

执行上下文的生命周期包括三个阶段：**创建阶段→执行阶段→回收阶段**



**创建阶段**

当函数被调用，但未执行任何其内部代码之前，会做以下三件事：

- 创建变量对象：首先初始化函数的参数arguments，提升函数声明和变量声明。

  - 用当前函数的**参数列表**（`arguments`）初始化一个 “变量对象” 并将当前执行上下文与之关联 ，函数代码块中声明的 **变量** 和 **函数** 将作为属性添加到这个变量对象上。**在这一阶段，会进行变量和函数的初始化声明，变量统一定义为 `undefined` 需要等到赋值时才会有确值，而函数则会直接定义**。

    > 有没有发现这段加粗的描述非常熟悉？没错，这个操作就是  **变量声明提升**（变量和函数声明都会提升，但是函数提升更靠前）。

- 创建作用域链（Scope Chain）：在执行期上下文的创建阶段，作用域链是在变量对象之后创建的。作用域链本身包含变量对象。作用域链用于解析变量。当被要求解析变量时，JavaScript 始终从代码嵌套的最内层开始，如果最内层没有找到变量，就会跳转到上一层父作用域中查找，直到找到该变量。

- 确定this指向

在一段 JS 脚本执行之前，要先解析代码（所以说 JS 是解释执行的脚本语言），解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来。变量先暂时赋值为undefined，函数则先声明好可使用。这一步做完了，然后再开始正式执行程序。

另外，一个函数在执行之前，也会创建一个函数执行上下文环境，跟全局上下文差不多，不过 函数执行上下文中会多出this arguments和函数的参数。

**执行阶段**

执行变量赋值、代码执行

**回收阶段**

执行上下文出栈等待虚拟机回收执行上下文



**简单来说执行上下文就是指：**

在执行一点JS代码之前，需要先解析代码。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来（函数提升优先级比变量声明优先级高），变量先赋值为undefined，函数先声明好可使用。这一步执行完了，才开始正式的执行程序。



在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出this、arguments和函数的参数。

- 全局上下文：变量定义，函数声明
- 函数上下文：变量定义，函数声明，`this`，`arguments`



# 六、 this/call/apply/bind

## 1. 对 this 对象的理解

this 是执行上下文的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，this 的指向可以通过四种调用模式来判断：

1. **函数调用模式**，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。
2. **方法调用模式，**如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
3. **构造器调用模式，**如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
4. **apply、call 和 bind 调用模式，**这三个方法显示指定调用函数 this 的指向。其中 apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。**这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。**

这四种方式，使用构造器调用模式的优先级最高，然后是 apply、call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式。



## 2. call 和 apply 的区别

它们的作用一模一样，区别仅在于传入参数的形式的不同。

- apply 接受两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，apply 方法把这个集合中的元素作为参数传递给被调用的函数。
- call 传入的参数数量不固定，跟 apply 相同的是，第一个参数也是代表函数体内的 this 指向，从第二个参数开始往后，每个参数被依次传入函数。



## 3. call 和 bind 的区别

1. **返回值不同**，call 返回的是函数执行后的结果，bind 返回的是永久改变 this 指向的函数，而该函数有类似于柯里化的作用。
2. 调用绑定函数时作为 `this` 参数传递给目标函数的值。 如果使用`new`运算符构造绑定函数，则忽略第一个参数。



## 4. 实现 call、apply 以及 bind 函数

**call**

```js
Function.prototype.myCall = function (context = window, ...args) {
    const fn = Symbol() // 创建唯一的key值作为传入对象的方法名
    context[fn] = this // 将函数赋给传入对象作为它的属性
    const result = context[fn](...args) // 调用对象的方法
    delete context[fn] // 调用完毕删除属性
    return result // 返回结果
}
```

**apply**

```js
Function.prototype.myApply = function (context = window, args) {
    const fn = Symbol()
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}
```

**bind**

```js
Function.prototype.myBind = function (context = window, ...args) {
    // 创造唯一的key值  作为我们构造的context内部方法名
    let fn = Symbol();
    context[fn] = this;
    let _this = this;
    //  bind情况要复杂一点
    const result = function (...innerArgs) {
        // 第一种情况 :若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
        // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
        // this.__proto__ === result.prototype   //this instanceof result =>true
        // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
        if (this instanceof _this === true) {
            // 此时this指向指向result的实例  这时候不需要改变this指向
            this[fn] = _this;
            this[fn](...[...args, ...innerArgs]); //这里使用es6的方法让bind支持参数合并
            delete this[fn];
        } else {
            // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的context
            context[fn](...[...args, ...innerArgs]);
            delete context[fn];
        }
    };
    // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
    // 实现继承的方式: 使用Object.create
    result.prototype = Object.create(this.prototype);
    return result;
}
```

**用法如下**

```js
function Person(name, age) {
  console.log(name); //'我是参数传进来的name'
  console.log(age); //'我是参数传进来的age'
  console.log(this); //构造函数this指向实例对象
}
// 构造函数原型的方法
Person.prototype.say = function() {
  console.log(123);
}
let obj = {
  objName: '我是obj传进来的name',
  objAge: '我是obj传进来的age'
}
// 普通函数
function normalFun(name, age) {
  console.log(name);   //'我是参数传进来的name'
  console.log(age);   //'我是参数传进来的age'
  console.log(this); //普通函数this指向绑定bind的第一个参数 也就是例子中的obj
  console.log(this.objName); //'我是obj传进来的name'
  console.log(this.objAge); //'我是obj传进来的age'
}

//先测试作为构造函数调用
let bindFun = Person.myBind(obj, '我是参数传进来的name')
let a = new bindFun('我是参数传进来的age')
a.say() //123

//再测试作为普通函数调用
let bindFun = normalFun.myBind(obj, '我是参数传进来的name')
 bindFun('我是参数传进来的age')
```



# 七、异步编程

## 1. js 为什么要异步？

JavaScript 语言的执行环境是“单线程”，即代码得一句一句得按顺序依次执行，前面的代码会阻塞后面的代码。**好处：**实现起来比较简单，执行环境相对单纯；**坏处：只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。**如：浏览器无响应（假死），可能是因为某一段 js 代码长时间运行（如死循环），导致整个页面卡在这个地方，其他任务无法执行。**为了解决这个问题，js 语言将任务的执行模式分为两种：同步和异步**。



## 2. 异步编程的实现方式？

1. **回调函数**

   优点：简单、容易理解
   缺点：不利于维护，代码耦合高，多个异步操作下容易形成回调地狱。

2. **事件监听**

   优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数
   缺点：事件驱动型，流程不够清晰

3. **发布/订阅（观察者模式）**

   类似于事件监听，但是可以通过‘消息中心’，了解现在有多少发布者，多少订阅者

4. **Promise**

   优点：可以利用then方法，进行链式写法；可以书写错误时的回调函数；
   缺点：编写和理解，相对比较难

5. **Generation**

   优点：函数体内外的数据交换、错误处理机制
   缺点：流程管理不方便

6. **async/await**

   优点：内置执行器、更好的语义、更广的适用性、返回的是Promise、结构清晰。
   缺点：错误处理机制



## 3. setTimeout、Promise、Async/Await 的区别

**（1）setTimeout**

```js
console.log('script start') //1. 打印 script start
setTimeout(function(){
    console.log('settimeout')   // 4. 打印 settimeout
})  // 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数
console.log('script end')   //3. 打印 script start
// 输出顺序：script start->script end->settimeout
```

**（2）Promise**

Promise本身是**同步的立即执行函数**， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then/catch等，当主栈完成后，才会去调用resolve/reject中存放的方法执行，打印p的时候，是打印的返回结果，一个Promise实例。

```js
console.log('script start')
let promise1 = new Promise(function (resolve) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
```

当JS主线程执行到Promise对象时：

- promise1.then() 的回调就是一个 task
- promise1 是 resolved或rejected: 那这个 task 就会放入当前事件循环回合的 microtask queue
- promise1 是 pending: 这个 task 就会放入 事件循环的未来的某个(可能下一个)回合的 microtask queue 中
- setTimeout 的回调也是个 task ，它会被放入 macrotask queue 即使是 0ms 的情况

**（3）async/await**

```js
async function async1(){
   console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start');
async1();
console.log('script end')
// 输出顺序：script start->async1 start->async2->script end->async1 end
```

async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。



例如：

```js
async function func1() {
    return 1
}
console.log(func1())
```

![image-20210826221653750](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210826221653750.png)

func1的运行结果其实就是一个Promise对象。因此也可以使用then来处理后续逻辑。

```js
func1().then(res => {
    console.log(res);  // 30
})
```

await的含义为等待，也就是 async 函数需要等待await后的函数执行完成并且有了返回结果（Promise对象）之后，才能继续执行下面的代码。await通过返回一个Promise对象来实现同步的效果。



## 4. 对 Promise 的理解

Promise是异步编程的一种解决方案，它是一个对象，可以获取异步操作的消息，他的出现大大改善了异步编程的困境，**避免了地狱回调**，它比传统的解决方案回调函数和事件更合理和更强大。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

（1）Promise的实例有**三个状态**:

- Pending（进行中）
- Resolved（已完成）
- Rejected（已拒绝）

当把一件事情交给promise时，它的状态就是Pending，任务完成了状态就变成了Resolved、没有完成失败了就变成了Rejected。

（2）Promise的实例有**两个过程**：

- pending -> fulfilled : Resolved（已完成）
- pending -> rejected：Rejected（已拒绝）

**注意：一旦从进行状态变成为其他状态就永远不能更改状态了。**



**Promise的特点：**

- 对象的状态不受外界影响。promise对象代表一个异步操作，有三种状态，`pending`（进行中）、`fulfilled`（已成功）、`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态，这也是promise这个名字的由来——“**承诺**”；
- 一旦状态改变就不会再变，任何时候都可以得到这个结果。promise对象的状态改变，只有两种可能：从`pending`变为`fulfilled`，从`pending`变为`rejected`。这时就称为`resolved`（已定型）。如果改变已经发生了，你再对promise对象添加回调函数，也会立即得到这个结果。这与事件（event）完全不同，事件的特点是：如果你错过了它，再去监听是得不到结果的。



**Promise的缺点：**

- 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
- 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。



**总结：**

Promise 对象是异步编程的一种解决方案，最早由社区提出。Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。一个 Promise 实例有三种状态，分别是pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。实例的状态只能由 pending 转变 resolved 或者rejected 状态，并且状态一经改变，就凝固了，无法再被改变了。



状态的改变是通过 resolve() 和 reject() 函数来实现的，可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的末尾执行。



**注意：在构造 `Promise` 的时候，构造函数内部的代码是立即执行的**



## 5. Promise 的基本用法

### （1）创建Promise对象

Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。



Promise构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

**一般情况下都会使用`new Promise()`来创建promise对象，但是也可以使用`promise.resolve`和 `promise.reject`这两个方法：**

- **Promise.resolve**

`Promise.resolve(value)`的返回值也是一个promise对象，可以对返回值进行.then调用，代码如下：

```js
Promise.resolve(11).then(function(value){
  console.log(value); // 打印出11
});
```

`resolve(11)`代码中，会让promise对象进入确定(`resolve`状态)，并将参数`11`传递给后面的`then`所指定的`onFulfilled` 函数；



创建promise对象可以使用`new Promise`的形式创建对象，也可以使用`Promise.resolve(value)`的形式创建promise对象；

- **Promise.reject**

`Promise.reject` 也是`new Promise`的快捷形式，也创建一个promise对象。代码如下：

```js
Promise.reject(new Error(“我错了，请原谅俺！！”));
```

就是下面的代码new Promise的简单形式：

```js
new Promise(function(resolve,reject){
   reject(new Error("我错了，请原谅俺！！"));
});
```

下面是使用resolve方法和reject方法：

```js
function testPromise(ready) {
  return new Promise(function(resolve,reject){
    if(ready) {
      resolve("hello world");
    }else {
      reject("No thanks");
    }
  });
};
// 方法调用
testPromise(true).then(function(msg){
  console.log(msg);
},function(error){
  console.log(error);
});
```

上面的代码的含义是给`testPromise`方法传递一个参数，返回一个promise对象，如果为`true`的话，那么调用promise对象中的`resolve()`方法，并且把其中的参数传递给后面的`then`第一个函数内，因此打印出 “`hello world`”, 如果为`false`的话，会调用promise对象中的`reject()`方法，则会进入`then`的第二个函数内，会打印`No thanks`；

#### （2）Promise方法

Promise有五个常用的方法：then()、catch()、all()、race()、finally。下面就来看一下这些方法。

1. **then()**

当Promise执行的内容符合成功条件时，调用`resolve`函数，失败就调用`reject`函数。Promise创建完了，那该如何调用呢？

```js
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

`then`方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为`resolved`时调用，第二个回调函数是Promise对象的状态变为`rejected`时调用。其中第二个参数可以省略。

`then`方法返回的是一个新的Promise实例（不是原来那个Promise实例）。因此可以采用链式写法，即`then`方法后面再调用另一个then方法。



当要写有顺序的异步事件时，需要串行时，可以这样写：

```js
let promise = new Promise((resolve,reject)=>{
    ajax('first').success(function(res){
        resolve(res);
    })
})
promise.then(res=>{
    return new Promise((resovle,reject)=>{
        ajax('second').success(function(res){
            resolve(res)
        })
    })
}).then(res=>{
    return new Promise((resovle,reject)=>{
        ajax('second').success(function(res){
            resolve(res)
        })
    })
}).then(res=>{
    
})
```

那当要写的事件没有顺序或者关系时，还如何写呢？可以使用`all` 方法来解决。

**2. catch()**

Promise对象除了有then方法，还有一个catch方法，该方法相当于`then`方法的第二个参数，指向`reject`的回调函数。不过`catch`方法还有一个作用，就是在执行`resolve`回调函数时，如果出现错误，抛出异常，不会停止运行，而是进入`catch`方法中。

```js
p.then((data) => {
     console.log('resolved',data);
},(err) => {
     console.log('rejected',err);
     }
); 
p.then((data) => {
    console.log('resolved',data);
}).catch((err) => {
    console.log('rejected',err);
});
```

**3. all()**

`all`方法可以完成并行任务， 它接收一个数组，数组的每一项都是一个`promise`对象。当数组中所有的`promise`的状态都达到`resolved`的时候，`all`方法的状态就会变成`resolved`，如果有一个状态变成了`rejected`，那么`all`方法的状态就会变成`rejected`。

```js
javascript
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(1);
    },2000)
});
let promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(2);
    },1000)
});
let promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(3);
    },3000)
});
Promise.all([promise1,promise2,promise3]).then(res=>{
    console.log(res);
    //结果为：[1,2,3] 
})
```

调用`all`方法时的结果成功的时候是回调函数的参数也是一个数组，这个数组按顺序保存着每一个promise对象`resolve`执行时的值。

**（4）race()**

`race`方法和`all`一样，接受的参数是一个每项都是`promise`的数组，但是与`all`不同的是，当最先执行完的事件执行完之后，就直接返回该`promise`对象的值。如果第一个`promise`对象状态变成`resolved`，那自身的状态变成了`resolved`；反之第一个`promise`变成`rejected`，那自身状态就会变成`rejected`。

```js
let promise1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       reject(1);
    },2000)
});
let promise2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(2);
    },1000)
});
let promise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve(3);
    },3000)
});
Promise.race([promise1,promise2,promise3]).then(res=>{
    console.log(res);
    //结果：2
},rej=>{
    console.log(rej)};
)
```

那么`race`方法有什么实际作用呢？当要做一件事，超过多长时间就不做了，可以用这个方法来解决：

```js
Promise.race([promise1,timeOutPromise(5000)]).then(res=>{})
```

**5. finally()**

`finally`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

上面代码中，不管`promise`最后的状态，在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数。



下面是一个例子，服务器使用 Promise 处理请求，然后使用`finally`方法关掉服务器。

```js
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
```

`finally`方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。`finally`本质上是`then`方法的特例：

```js
promise
.finally(() => {
  // 语句
});
// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

上面代码中，如果不使用`finally`方法，同样的语句需要为成功和失败两种情况各写一次。有了`finally`方法，则只需要写一次。



## 6. 对 async/await 的理解

async/await其实是`Generator` 的语法糖，它能实现的效果都能用then链来实现，它是为优化then链而开发出来的。从字面上来看，async是“异步”的简写，await则为等待，所以很好理解async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。当然语法上强制规定await只能出现在asnyc函数中，先来看看async函数返回了什么： 

```js
async function testAsy(){
   return 'hello world';
}
let result = testAsy(); 
console.log(result)
```

![image-20210826230550033](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210826230550033.png)

所以，async 函数返回的是一个 Promise 对象。async 函数（包含函数语句、函数表达式、Lambda表达式）会返回一个 Promise 对象，如果在函数中 `return` 一个直接量，async 会把这个直接量通过 `Promise.resolve()` 封装成 Promise 对象。



async 函数返回的是一个 Promise 对象，所以在最外层不能用 await 获取其返回值的情况下，当然应该用原来的方式：`then()` 链来处理这个 Promise 对象，就像这样：

```js
async function testAsy(){
   return 'hello world'
}
let result = testAsy() 
console.log(result)
result.then(v=>{
    console.log(v)   // hello world
})
```

那如果 async 函数没有返回值，又该如何？很容易想到，它会返回 `Promise.resolve(undefined)`。



联想一下 Promise 的特点——无等待，所以在没有 `await` 的情况下执行 async 函数，它会立即执行，返回一个 Promise 对象，并且，绝不会阻塞后面的语句。这和普通返回 Promise 对象的函数并无二致。



**注意：**`Promise.resolve(x)` 可以看作是 `new Promise(resolve => resolve(x))` 的简写，可以用于快速封装字面量对象或其他对象，将其封装成 Promise 实例。



## 7. await 到底在等啥？

**await 在等待什么呢？**一般来说，都认为 await 是在等待一个 async 函数完成。不过按语法说明，await 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）。



因为 async 函数返回一个 Promise 对象，所以 await 可以用于等待一个 async 函数的返回值——这也可以说是 await 在等 async 函数，但要清楚，它等的实际是一个返回值。注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接量的。所以下面这个示例完全可以正确运行：

```js
function getSomething() {
    return "something";
}
async function testAsync() {
    return Promise.resolve("hello async");
}
async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}
test();
```

![image-20210826231603761](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210826231603761.png)

await 表达式的运算结果取决于它等的是什么。

- 如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。
- 如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。



来看一个例子：

```js
function testAsy(x){
   return new Promise(resolve=>{setTimeout(() => {
       resolve(x);
     }, 3000)
    }
   )
}
async function testAwt(){    
  let result =  await testAsy('hello world');
  console.log(result);    // 3秒钟之后出现hello world
  console.log('cuger')   // 3秒钟之后出现cuger
}
testAwt();
console.log('cug')  //立即输出cug
```

![image-20210826231657648](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210826231657648.png)

这就是 await 必须用在 async 函数中的原因。async 函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个 Promise 对象中异步执行。await暂停当前async的执行，所以'cug''最先输出，hello world'和‘cuger’是3秒钟后同时出现的。



## 8. async/await 的优势

单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了（很有意思，Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它）。



假设一个业务，分多个步骤完成，每个步骤都是异步的，而且依赖于上一个步骤的结果。仍然用 `setTimeout` 来模拟异步操作：

```js
/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}
function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}
function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}
function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}
```

现在用 Promise 方式来实现这三个步骤的处理：

```js
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}
doIt();
// c:\var\test>node --harmony_async_await .
// step1 with 300
// step2 with 500
// step3 with 700
// result is 900
// doIt: 1507.251ms
```

如果用 async/await 来实现呢，会是这样：

```js
async function doIt() {
    console.time("doIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result = await step3(time3);
    console.log(`result is ${result}`);
    console.timeEnd("doIt");
}
doIt();
```

结果和之前的 Promise 实现是一样的，但是这个代码看起来是不是清晰得多，几乎跟同步代码一样



## 9. async/await 对比 Promise 的优势

- 代码读起来更加同步，Promise虽然摆脱了回调地狱，但是then的链式调⽤也会带来额外的阅读负担 
- Promise传递中间值⾮常麻烦，⽽async/await⼏乎是同步的写法，⾮常优雅 
- 错误处理友好，async/await可以⽤成熟的try/catch，Promise的错误捕获⾮常冗余 
- 调试友好，Promise的调试很差，由于没有代码块，你不能在⼀个返回表达式的箭头函数中设置断点，如果你在⼀个.then代码块中使⽤调试器的步进(step-over)功能，调试器并不会进⼊后续的.then代码块，因为调试器只能跟踪同步代码的每⼀步。 



## 10. async/await 如何捕获异常

```js
async function fn(){
    try{
        let a = await Promise.reject('error')
    }catch(error){
        console.log(error)
    }
}
```



## 11. 并发与并行的区别？

<font color='orange'>**并发**</font>：指两个或多个事件在同一时间间隔内发生。这些事件<font color='orange'>宏观上是同时发生</font>的，但<font color='orange'>微观上是交替发生</font>的。与之容易混淆的是<font color='red'>**并行**</font>：并行指的是在同一个时刻同时发生。

> **并行**：你现在同时跟两个女朋友约会
> **并发**：你9:00-10:00跟女友A约会，10:00-11:00跟女友B约会



## 12. 什么是回调函数？回调函数有什么缺点？如何解决回调地狱问题？

以下代码就是一个回调函数的例子：

```js
ajax(url, () => {
    // 处理逻辑
})
```

回调函数有一个致命的**弱点，就是容易写出回调地狱**（Callback hell）。假设多个请求存在依赖性，可能会有如下代码：

```js
ajax(url, () => {
    // 处理逻辑
    ajax(url1, () => {
        // 处理逻辑
        ajax(url2, () => {
            // 处理逻辑
        })
    })
})
```

以上代码看起来不利于阅读和维护，当然，也可以把函数分开来写：

```js
function firstAjax() {
  ajax(url1, () => {
    // 处理逻辑
    secondAjax()
  })
}
function secondAjax() {
  ajax(url2, () => {
    // 处理逻辑
  })
}
ajax(url, () => {
  // 处理逻辑
  firstAjax()
})
```

以上的代码虽然看上去利于阅读了，但是还是没有解决根本问题。回调地狱的根本问题就是：

1. 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身
2. 嵌套函数一多，就很难处理错误



当然，回调函数还存在着别的几个缺点，比如不能使用 `try catch` 捕获错误，不能直接 `return`。



**解决：**

1. Generator
2. Promise
3. async 及 await



## 13. setTimeout、setInterval、requestAnimationFrame 各有什么特点？

与 setTimeout、setInterval 不同，requestAnimationFrame 不需要设置时间间隔，这有什么好处呢？

计时器一直是 JavaScript 动画的核心技术，而编写动画循环的核心是要知道延迟时间多长合适。一方面循环间隔必须足够短，这样才能让不同的动画效果显得平滑顺畅，另一方面循环间隔要足够的长，这样才能保证浏览器有能力渲染产生的变化。大多数电脑显示器的刷新频率是60Hz，大概相当于每秒重绘60次(16.7ms)。大多数浏览器都会对重绘操作加以限制，不会超出显示器的重绘频率。

而 setTimeout 和 setInterval 的缺点是他们都不够精确。它们内在的运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器 UI 线程队列中等待执行的时间，如果队列中已经加入了其他任务，那么动画的执行要等前面的任务结束之后才会执行。

requestAnimationFrame采用的是系统时间间隔，保证了最佳绘制效率。不会因间隔时间过短，造成过度绘制，增加开销；也不会因时间间隔太长，造成动画卡顿。它能够让各种网页动画有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。

**特点**

1. requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率。
2. 在隐藏或不可见的元素中，requsetAnimationFrame 将不会进行重绘或回流，这就意味着更少的 CPU、GPU 和内存使用量。
3. requestAnimationFrame 是浏览器专门提供的 api，在运行时浏览器会自动优化方法的调用，并且页面不是激活状态下，动画会暂停执行，有效节省 CPU 开销。



# 八、面向对象

## 1. 对象创建的方式有哪些？

1. 通过**字面量**方式创建

   ```js
   var person = {name:'dongjc', work:function() {console.log('write coding')}};
   
   var person = {} //创建空对象
   person.name = 'dudu'
   ```

2. 通过**构造函数**方式创建

   ```js
   var obj = new 函数名();
   ```

3. 通过 `Object` 方式创建

   ```js
   var person = new Object();
   person.name = "dongjc";
   person.age = 32;
   person.Introduce = function () {
           alert("My name is " + this.name + ".I'm " + this.age);
       };
   person.Introduce();
   ```

4. 使用**工厂模式**创建对象

   这种方式是使用一个函数来创建对象，减少重复代码，解决了前面三种方式的代码冗余的问题，但是方法不能共享的问题还是存在。

   ```js
   use strict';
   
   // 使用工厂模式创建对象
   // 定义一个工厂方法
   function createObject(name) {
       var o = new Object();
       o.name = name;
       o.sayName = function() {
           alert(this.name);
       };
       return o;
   }
   
   var o1 = createObject('zhang');
   var o2 = createObject('li');
   
   //缺点：调用的还是不同的方法
   //优点：解决了前面的代码重复的问题
   alert(o1.sayName === o2.sayName); //false
   ```

5. 通过**原型模式**创建对象

   ```js
   <script>
   	'use strict';
   
   	/*
   	 *  原型模式创建对象
   	 */
   	function Animal() {}
   
   	Animal.prototype.name = 'animal';
   	Animal.prototype.sayName = function() {
   		alert(this.name);
   	};
   
   	var a1 = new Animal();
   	var a2 = new Animal();
   
   	a1.sayName();
   
   	alert(a1.sayName === a2.sayName); //true
   	alert(Animal.prototype.constructor); //function Animal(){}
   	alert(Animal.prototype.constructor == Animal); //true
   </script>
   ```



## 2. 对象继承的方式有哪些？

**继承可以使得子类具有父类别的各种属性和方法**，而不需要再次编写相同的代码。

在子类继承父类的同时，子类可以重新定义某些属性，并重写某些方法，即覆盖父类的原有属性和方法，使其获得与父类不同的功能。

### 实现方式

#### 原型链继承

第一种是以原型链的方式来实现继承，但是这种实现方式存在的**缺点**是，在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱。还有就是在创建子类型的时候不能向超类型传递参数。

**实现本质**

重写子类构造函数的原型对象，使其原型对象指向超类的实例



```js
function SuperType() {
    this.property = true
    this.colors = ["red","green","blue"]
}
SuperType.prototype.getSuperValue = function() {
    return this.property
}
function SubType() {
    this.subProperty = false
}
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function() {
    return this.subProperty
}
let instance1 = new SubType()
let instance2 = new SubType()
instance1.colors.push("black")
console.log(instance2)
```

![image-20210827143014147](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210827143014147.png)



#### 借用构造函数继承

为了解决原型链继承中解决原型中包含引用类型值带来的问题，开发人员开始使用一种借用构造函数来实现继承，即在子类型构造函数中调用超类型构造函数。

**优点**

- 可以解决原型链中超类型中包含引用类型值带来的问题
- 可以向子类型构造函数中向超类型构造函数中传递参数

**缺点**

- 在超类型构造函数原型中定义的属性和方法对子类不可见
- 由于超类原型上的方法对子类不可见（在超类原型上的方法无法被实例继承），故方法都在构造函数中定义，则函数复用就无从谈起

代码如下：

```js
function SuperType(name) {
    this.name = name
    this.colors = ["green","blue","yellow"]
}
function SubType(name) {
    SuperType.call(this, name);
    this.age = 18
}
let instance = new SubType("dididi")
console.log(instance)
```

![image-20210120130645749](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210120130645749.png)



#### 组合继承

组合继承指的是将原型链和借用构造函数技术组合在一起，发挥二者之长的一种继承模式。组合继承思想是使用原型链实现对原型的属性和方法的继承，通过借用构造函数实现对实例属性的继承。

**优点**

- 避免了原型链继承和借用构造函数的缺陷，既能实现超类原型上方法和属性的继承，也能像超类构造函数中传参

**缺点**

- 会调用两次构造函数，一次是构造函数中，一次是原型对象赋值时

代码如下：

```js
function SuperType(name) {
    this.name = name
    this.colors = ["red", "green", "blue"]
}
SuperType.prototype.sayName = function() {
    console.log(this.name)
}
function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
}
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function() {
    console.log(this.age)
}
let instance = new SubType("instance", 18)
let instance1 = new SubType("instance1", 20)
instance.colors.push("black")
console.log(instance)
console.log(instance1)
```

![image-20210120141134782](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210120141134782.png)



#### 原型式继承

原型式继承是借助原型可以基于已有的对象创建新对象，同时还不必因为创建自定义类型。先创建一个临时性的构造函数，然后将传入的对象作为整个构造函数的原型，最后返回这个临时类型的一个新实例。从本质上来讲，对传入的对象做了一次浅复制。且必须有一个对象作为另一个对象的继承。代码如下：

**缺点**

- 包含引用类型值的属性始终都会共享相应的值

```js
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
```

es5通过新增`Object.create(参数1, 参数2)`方法规范了原型式继承；第一个参数的作用是用作新对象原型的对象，参数2是一个可为新对象定义额外属性的对象。例如：

```js
let person = {
    name: "dididi",
    friends: ["1","2","3"]
}
let anotherPerson = Object.create(person, {
    name: {
        value: "dadada"
    }
})
console.log(anotherPerson)
```

![image-20210120142615772](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210120142615772.png)



#### 寄生式继承

寄生式继承的思路是创建一个仅用于封装继承过程的函数，在函数内部增强对象，最后再返回对象。代码如下：

```js
function createAnother(original) {
    let clone = object(original) // 通过调用函数创建一个对象
    clone.sayHi = function() {	 // 以某种方式增强这个对象
        console.log("hi")
    }
    reeturn clone 				 // 返回这个对象
}
```



#### 寄生组合式继承

组合继承会调用两次超类型构造函数，一次是创建子类型原型的时候，一次是子类型构造函数内部，寄生组合式继承就是为了解决这一问题而出现的。

**优点**

- 集寄生式继承和组合继承优点于一体，是实现基于类型继承的最有效方式。
- 只调用了一次SuperType构造函数，避免了SubType.prototype上不必要也用不到的属性，因此可以说这个例子的效率更高。而且，原型链仍然保持不变。

代码如下：

```js
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
function inheritProrotype(SubType, SuperType) {
    let prototype = object(SuperType.prototype) // 创建对象
    prototype.constructor = SubType // 增强对象
    SubType.prototype = prototype // 指定对象
}
function SuperType(name) {
    this.name = name
    this.colors = ["green","yellow","blue"]
}
SuperType.prototype.sayName = function() {
    console.log(this.name)
}
function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
}
inheritProrotype(SubType, SuperType)
let instance = new SubType("dididi",18)
let instance1 = new SubType("bibibi",20)
console.log(instance)
console.log(instance1)
```

![image-20210120143726975](https://gitee.com/dadadaxyx/my-images/raw/master/image-20210120143726975.png)



# 九、垃圾回收与内存泄漏

## 1. 垃圾回收机制

### 垃圾回收的概念

**垃圾回收**：JavaScript 代码运行时，需要分配内存空间来储存变量和值。当变量不在参与运行时，就需要系统收回被占用的内存空间，这就是垃圾回收。

**回收机制**：

- Javascript 具有自动垃圾回收机制，会定期对那些不再使用的变量、对象所占用的内存进行释放，原理就是找到不再使用的变量，然后释放掉其占用的内存。
- JavaScript中存在两种变量：局部变量和全局变量。全局变量的生命周期会持续到页面卸载；而局部变量声明在函数中，它的生命周期从函数执行开始，直到函数执行结束，在这个过程中，局部变量会在堆或栈中存储它们的值，当函数执行结束后，这些局部变量不再被使用，它们所占有的空间就会被释放。
- 不过，当局部变量被外部函数使用时，其中一种情况就是闭包，在函数执行结束后，函数外部的变量依然指向函数内部的局部变量，此时局部变量依然在被使用，所以不会回收。



### V8 的垃圾回收机制

通常情况下，垃圾数据回收分为**手动回收**和**自动回收**两种策略。

**手动回收策略**，何时分配内存、何时销毁内存都是由代码控制的。 

**自动回收策略**，产生的垃圾数据是由垃圾回收器来释放的，并不需要手动通过代码来释放。

**JavaScript 中调用栈中的数据回收**

JavaScript 引擎会通过向下移动 ESP(记录当前执行状态的指针) 来销毁该函数保存在栈中的执行上下文。

**JavaScript 堆中的数据回收**

在 V8 中会把堆分为**新生代**和**老生代**两个区域，新生代中存放的是生存时间短的对象，老生代中存放的生存时间久的对象。

新生区通常只支持 1～8M 的容量，而老生区支持的容量就大很多了。对于这两块区域，V8 分别使用两个不同的垃圾回收器，以便更高效地实施垃圾回收。

- 副垃圾回收器，主要负责新生代的垃圾回收。
- 主垃圾回收器，主要负责老生代的垃圾回收。

不论什么类型的垃圾回收器，它们都有一套共同的执行流程。

1. 第一步是**标记**空间中活动对象和非活动对象。所谓活动对象就是还在使用的对象，非活动对象就是可以进行垃圾回收的对象。
2. 第二步是**回收**非活动对象所占据的内存。其实就是在所有的标记完成之后，统一清理内存中所有被标记为可回收的对象。
3. 第三步是做**内存整理**。一般来说，频繁回收对象后，内存中就会存在大量不连续空间，我们把这些不连续的内存空间称为**内存碎片**。当内存中出现了大量的内存碎片之后，如果需要分配较大连续内存的时候，就有可能出现内存不足的情况。所以最后一步需要**整理**这些内存碎片。(这步其实是可选的，因为有的垃圾回收器不会产生内存碎片)。

**新生代中垃圾回收**

新生代中用 **Scavenge 算法**来处理，把新生代空间对半划分为两个区域，<u>一半是对象区域，一半是空闲区域</u>。新加入的对象都会存放到对象区域( Form 空间)，当对象区域快被写满时，就需要执行一次垃圾清理操作。

在垃圾回收过程中，首先要对对象区域中的垃圾做标记；标记完成之后，就进入垃圾清理阶段，副垃圾回收器会把这些存活的对象复制到**空闲区域( To 空间)**中，同时它还会把这些对象有序地排列起来，所以这个复制过程，也就相当于完成了内存整理操作，复制后空闲区域就没有内存碎片了。

完成复制后，对象区域与空闲区域进行角色翻转，也就是原来的对象区域变成空闲区域，原来的空闲区域变成了对象区域。这样就完成了垃圾对象的回收操作，同时这种**角色翻转的操作还能让新生代中的这两块区域无限重复使用下去**。

为了执行效率，一般新生区的空间会被设置得比较小,也正是因为新生区的空间不大，所以很容易被存活的对象装满整个区域。为了解决这个问题，JavaScript 引擎采用了**对象晋升策略**，也就是经过两次垃圾回收依然还存活的对象，会被移动到老生区中。

**老生代中的垃圾回收**

老生代中用**标记 - 清除（Mark-Sweep）**的算法来处理。首先是标记过程阶段，标记阶段就是从一组根元素开始，递归遍历这组根元素(遍历调用栈)，在这个遍历过程中，能到达的元素称为**活动对象**,没有到达的元素就可以判断为**垃圾数据**然后在遍历过程中标记，标记完成后就进行清除过程。它和副垃圾回收器的垃圾清除过程完全不同，这个的清除过程是删除标记数据。

清除算法后，会产生大量不连续的内存碎片。而碎片过多会导致大对象无法分配到足够的连续内存，于是又产生了`标记 - 整理（Mark-Compact）`算法，这个标记过程仍然与`标记 - 清除算法`里的是一样的，但后续步骤不是直接对可回收对象进行清理，而是让所有存活的对象都向一端移动，然后直接清理掉端边界以外的内存，从而让存活对象占用连续的内存块。

**全停顿**

由于 JavaScript 是运行在主线程之上的，一旦执行垃圾回收算法，都需要将正在执行的 JavaScript 脚本暂停下来，待垃圾回收完毕后再恢复脚本执行。我们把这种行为叫做**全停顿**。

在 V8 新生代的垃圾回收中，因其空间较小，且存活对象较少，所以全停顿的影响不大，但老生代就不一样了。如果执行垃圾回收的过程中，占用主线程时间过久，主线程是不能做其他事情的。比如页面正在执行一个 JavaScript 动画，因为垃圾回收器在工作，就会导致这个动画在垃圾回收过程中无法执行，这将会造成页面的卡顿现象。

为了降低老生代的垃圾回收而造成的卡顿，V8 将标记过程分为一个个的子标记过程，同时让垃圾回收标记和 JavaScript 应用逻辑交替进行，直到标记阶段完成，我们把这个算法称为**增量标记（Incremental Marking）**算法.

使用增量标记算法，可以把一个完整的垃圾回收任务拆分为很多小的任务，这些小的任务执行时间比较短，可以穿插在其他的 JavaScript 任务中间执行，这样当执行上述动画效果时，就不会让用户因为垃圾回收任务而感受到页面的卡顿了。



### 减少垃圾回收

虽然浏览器可以进行垃圾自动回收，但是当代码比较复杂时，垃圾回收所带来的代价比较大，所以应该尽量减少垃圾回收。

- **对数组进行优化：**在清空一个数组时，最简单的方法就是给其赋值为[ ]，但是与此同时会创建一个新的空对象，**可以将数组的长度设置为0，以此来达到清空数组的目的**。
- **对`object`进行优化：**对象尽量复用，对于不再使用的对象，就将其设置为 null，尽快被回收。
- **对函数进行优化：**在循环中的函数表达式，如果可以复用，尽量放在函数的外面。



## 2. 哪些情况会导致内存泄漏

以下四种情况会造成内存的泄漏：

- **意外的全局变量：**由于使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留在内存中无法被回收。
- **被遗忘的计时器或回调函数：**设置了 setInterval 定时器，而忘记取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留在内存中，而无法被回收。
- **脱离 DOM 的引用：**获取一个 DOM 元素的引用，而后面这个元素被删除，由于一直保留了对这个元素的引用，所以它也无法被回收。
- **闭包：**不合理的使用闭包，从而导致某些变量一直被留在内存当中。