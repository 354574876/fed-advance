### 简答题
#### 1.执行结果，并解释为什么
```js
var a = [];
for (var i = 0; i < 10 ; i ++) {
    a[i] = function () {console.log(i)}
}
a[6]();
```
最终执行的结果是：10  
解析：for循环给数组a添加了10个匿名函数，函数打印i；在循环执行完成之后此时i变成了10，由于i作用域是全局的；所以此时执行数组内任意一项，执行的结果都会是10

#### 2.执行结果，并解释为什么
```js
var tem = 123;
if (true) {
    console.log(tem);
    let tem;
}
```
最终执行的结果是：抛出异常  
解析：let是一个块级作用域，所以程序执行的时候在if块内有找到tem的定义，但是又由于let是不可以变量提升的需要先定义后使用。所以此时代码执行会报错

#### 3. 结合ES6新语法，最简单的方式找出数组中的最小值
```js
var arr = [12, 34, 32, 89, 4]

Math.min(...arr) // 4
```

#### 4. 详细说明var,let,const三种声明变量方式之间的具体差别
var：作用域为函数体，其余都是全局变量、有变量提升、可以重复声明变量  
let 和 const：块级作用域、没有变量提升、不能重复声明  
let 区别鱼 const 的是 const 不可以更改（如果是引用类型，不可以修改该引用的指针）

### 5. 执行结果，并解释为什么
```js
var a = 10
var obj = {
    a: 20,
    fn () {
        setTimeout(() => {
            console.log(this.a)
        })
    }
}
obj.fn()
```
执行结果：20  
解析：因为箭头函数内部的this指向是有定义它的上下文决定的，此时也就是fn内部this指向，也就是指向a对象

### 6. 简述Symbol类型的用途
> Symbol作为es6新引进的一种原始数据类型，它表示独一无二  

由于它的独一无二性质，所以我们常常可以在以下场景使用：
1. 枚举值
2. 对象的私有属性
```js
const USER_TYPE_COMMON = Symbol('user')
const USER_TYPE_ADMIN = Symbol('admin')

// 私有属性
const salary = Symbol('salary')
const student = {
    name: 'hjj',
    age: 18,
    [salary]: '1000'
}
```

### 7.说说深浅拷贝
JS数据类型区分原始数据类型和引用数据类型，原始数据类型是直接存在栈里面的，而引用数据类型存的是一个指针，指向内存堆中的数据。所以我们在拷贝数据的时候会出现对引用数据的拷贝做区分，因为如果只是拷贝了引用数据的指针那么在修改新的数据时候会修改到原数据。
所以也引申出了深拷贝和浅拷贝  

深拷贝：对引用数据类型的拷贝不是拷贝引用，而是对象本身，创建一个和原对象一样结构的数据，不会对原数据有副作用  
浅拷贝：仅仅拷贝原数据的引用，新对象改变了，原数据也改变了

### 8. 谈谈JS异步编程，Event Loop是做什么的，什么是宏任务，什么是微任务
我们都知道JS执行环境属于单线程的，一次只能同步执行一个任务。但是我们浏览器中往往会有大量的http请求，如果此时仍然使用同步的方式去执行，页面会出现长时间的等待状态。为了解决这类问题，异步编程就可以发挥重要的作用  
常见的异步编程有：
* setTimeout/setInterval  
* ajax 请求
* 事件监听
* 发布/订阅
* Promise
* generator
* async/await

那JS又是如何执行这些任务的呢？就是通过事件循环的机制（Event Loop）实现的。JS将代码分为宏任务和微任务  
宏任务：每次代码执行栈里面执行的代码就是一个宏任务  
微任务：当前任务执行完成后立即执行的任务  
宏任务包括：
* script代码块
* setTimeout/setInterval
* I/O
* UI交互事件  

微任务包括：
* Promise.then
* process.nextTick

Event Loop 运行机制：
![事件机制](https://github.com/354574876/fed-advance/blob/master/img/event_loop.png)

### 9. 使用promise进行代码改进
```js
setTimeout(() => {
    var a = 'hello'
    setTimeout(() => {
        var b = 'lagou'
        setTimeout(() => {
            var c = 'I O U'
            console.log(a, b ,c)
        }, 10)
    }, 10)
}, 10)

// 改进
function defer (value, waite = 20) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(value), waite)
	})
}

defer('hello')
	.then((a) => {
		var b = 'lgou'
		return defer(a + b)
	})
	.then(b => {
		var c = 'I O V'
		console.log(b + c)
	})
```

### 10. TypeScript和JavaScript之间的关系
> TypeScript是JavaScript超集，由于JavaScript是一种弱类型的动态语言。然而在我们开发大的项目多人协同的时候又需要强类型静态的语言，以
规避语言层面上的问题，如果仅仅通过内部约定式的规范很难做到绝对的控制。所以衍生除了TypeScript


### 11. 谈谈TypeScript的优缺点
优点：可维护性和可读性加强，代码规范，避免语法层面上报错
缺点：不适合周期短项目，增加了工作量以及学习成本
