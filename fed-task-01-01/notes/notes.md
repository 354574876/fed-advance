## ECMAScript 新特性
### 新增变量类型
两种变量类型都不会有变量提升，都是块级作用域
#### let
```js
for(var i = 0; i < 3 ; i++) {
    for(var i = 0; i < 3 ; i++) {
        console.log(i)
    }
}
// 执行结果 0，1，2
for(let i = 0; i < 3 ; i++) {
    for(let i = 0; i < 3 ; i++) {
        console.log(i)
    }
}
// 执行结果 0，1，2 0，1，2 0，1，2
```
#### const
> 定义常量，不可变值
```js
const name = 'jj'
const man = {
    amount: 20
}
name = 'hj' // 报错：Uncaught TypeError: Assignment to constant variable.
man.averageAge = 10 // 未改变引用的指针，不会报错
```

### 字符串新特性
#### 带标签的模版字符串
实际上是一个函数，会将模版字符串进行拆分；这样模版字符串功能更加强大，我们可以自定义里面的部分功能
```js
let person = function (strs, ...args) {
  console.log(strs) // ["name: ", ", age: ", "", raw: Array(3)]
  console.log(args) // ["hjj", 12]
}

let name ='hjj'
let age = 12
 
person`name: ${name}, age: ${age}`
```

#### 字符串扩展方法
1. String.raw()  模版字符串的标签函数
```js
String.raw`Hi\n${2+3}!`;
// 'Hi\n5!'，Hi 后面的字符不是换行符，\ 和 n 是两个不同的字符

// 正常情况下，你也许不需要将 String.raw() 当作函数调用。
// 但是为了模拟 `t${0}e${1}s${2}t` 你可以这样做:
String.raw({ raw: 'test' }, 0, 1, 2); // 't0e1s2t'
// 注意这个测试, 传入一个 string, 和一个类似数组的对象
// 下面这个函数和 `foo${2 + 3}bar${'Java' + 'Script'}baz` 是相等的.
String.raw({
  raw: ['foo', 'bar', 'baz'] 
}, 2 + 3, 'Java' + 'Script'); // 'foo5barJavaScriptbaz'
```

2. String.prototype.includes
```js
const str = 'hello jack, im, rose'
str.includes('jack') // true
```
3. String.prototype.startsWith
```js
const str = 'hello jack, im, rose'
str.startsWith('hello') // true
```
4. String.prototype.endsWith
```js
const str = 'hello jack, im, rose'
str.endsWith('rose') // true
```

### 函数
#### 函数参数默认值
```js
function Person (name, age , isMale) {
    this.name = name
    this.age = age
    // 写程序经常使用的方法，这个时候就会有问题（隐藏一些bug）
    // 等同于 if (isMale ==== undefined) this.man = true
    this.man = isMale || true 
}
// isMale 使用参数默认值
function Person (name, age , isMale = true) {
    this.name = name
    this.age = age
    this.man = isMale
}
```
#### 箭头函数
需要注意的点
* 函数体内的this指向，是定义时所在的对象，而不是使用时所在的对象
* 不可以当作构造函数
* 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

```js
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
let id = 21;
foo.call({ id: 42 });
// id: 42

// 不可以当作构造函数
let abc = () => ({})
abc.protoytpe === undefined // true
let abc = function () {}
console.log(abc.protoytpe) // {constructor: ƒ}
```
### 对象

#### Object.js 

