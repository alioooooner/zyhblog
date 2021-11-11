---
title: LeetCode-面试题
date: 2021-11-11
tags:
 - 面试题
categories:
 - 面经
---
# 简单

## 剑指 Offer 09. 用两个栈实现队列

> 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

### 解题思路

创建两个栈分别维护入栈和出栈的操作。stackI、stackO

1. 对于入栈操作，直接把数据推入到栈 stackI 中
2. 对于出栈操作
   1. 如果 stackO 里面有数据，则将 stackO 尾部数据推出
   2. 如果 stackO 里面没有数据，则将 stackI 里面的数据推出放进 stackI 中，最后检查 stackO 有没有数据，如果有数据则推出，如果没有则返回 -1。

```js
var CQueue = function() {
    this.stackInput = []
    this.stackOutput = []
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.stackInput.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if(this.stackOutput.length) {
        return this.stackOutput.pop()
    } else {
        while(this.stackInput.length) {
            this.stackOutput.push(this.stackInput.pop())
        }
        return this.stackOutput.length ? this.stackOutput.pop() : -1
    }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```



## 剑指 Offer 30. 包含min函数的栈

> 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。
>
>  
>
> 示例:
>
> MinStack minStack = new MinStack();
> minStack.push(-2);
> minStack.push(0);
> minStack.push(-3);
> minStack.min();   --> 返回 -3.
> minStack.pop();
> minStack.top();      --> 返回 0.
> minStack.min();   --> 返回 -2.

### 解题思路

利用两个栈来实现算法，一个主栈正常存储数据，一个辅助栈维护 min 数据。

1. push，主栈直接推入数据，辅助栈如果没有数据则直接推入，如果辅助栈有数据，若栈顶数据比推入的数据大，则直接推入到辅助栈中
2. min，返回辅助栈栈顶
3. top，返回主栈栈顶
4. pop，主栈直接退出数据x，如果x与辅助栈的栈顶数据y一样，则辅助栈也将推出数据y

```js
/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stackMain = []
    this.stackHelp = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stackMain.push(x)
    if(this.stackHelp.length == 0 || this.stackHelp[this.stackHelp.length - 1] >= x) this.stackHelp.push(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if(this.stackMain.pop() === this.stackHelp[this.stackHelp.length-1]) this.stackHelp.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stackMain[this.stackMain.length-1]
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return this.stackHelp[this.stackHelp.length-1]
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
```



# 中等

## 299 猜数字游戏

> 你在和朋友一起玩 猜数字（Bulls and Cows）游戏，该游戏规则如下：
>
> 写出一个秘密数字，并请朋友猜这个数字是多少。朋友每猜测一次，你就会给他一个包含下述信息的提示：
>
> 猜测数字中有多少位属于数字和确切位置都猜对了（称为 "Bulls", 公牛），
> 有多少位属于数字猜对了但是位置不对（称为 "Cows", 奶牛）。也就是说，这次猜测中有多少位非公牛数字可以通过重新排列转换成公牛数字。
> 给你一个秘密数字 secret 和朋友猜测的数字 guess ，请你返回对朋友这次猜测的提示。
>
> 提示的格式为 "xAyB" ，x 是公牛个数， y 是奶牛个数，A 表示公牛，B 表示奶牛。
>
> 请注意秘密数字和朋友猜测的数字都可能含有重复数字。

### 解题思路

公牛是值和位置一样的数字个数，奶牛是值一样但是位置不一样的数字个数。

先为密码和猜测的数字创建两个10元素的数组（存放数字0-9的个数），然后循环密码和猜测的数字串，如果数字、位置一样则bulls（公牛数）加一，如果数字一样、位置不一样，则密码和猜测的数组对于的元素加一，奶牛数量最后为遍历数组各个元素最小值的值。

```js
/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
var getHint = function(secret, guess) {
    let bulls = 0, cows = 0;
    const sNums = secret.split("")
    const gNums = guess.split("")
    const sCount = new Array(10).fill(0)
    const gCount = new Array(10).fill(0)
    for(let i = 0; i < sNums.length; i++) {
        if(sNums[i] === gNums[i]) bulls++;
        else {
            sCount[sNums[i]]++;
            gCount[gNums[i]]++;
        }
    }
    for(let i = 0; i < gCount.length; i++) {
        cows += Math.min(gCount[i], sCount[i])
    }
    return bulls + "A" + cows + "B";
};
```

