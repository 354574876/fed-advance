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
和 === 差别

```js
NaN === NaN // false
+0 === -0 // true

Object.is(NaN, NaN) // true
Object.is(+0, -0) // true

// 手动实现Object.is 方法
Object.prototype.is = Object.is || function (left, right) {
    if (left === right) {
        // 针对 +0 和 -0 情况
        return 1 / left !== 0 || 1 / right !== 0 || 1 / left !== 1 / right
    } else {
        // 针对 NaN 情况
        return left !== left && right !== right
    }   
}
```


#### Proxy 对比 defineProperty
1. defineProperty 对数组变化无法监听，而Proxy可以直接监听数据的变化
2. defineProperty 必须要遍历数据的每一个属性进行劫持，甚至递归循环；而Proxy可以直接监听对象，而非属性

Proxy的handler常用方法
1. getPrototypeOf() 在读取代理对象的原型时触发该操作，比如在执行 Object.getPrototypeOf(proxy) 时。
2. setPrototypeOf() 在设置代理对象的原型时触发该操作，比如在执行 Object.setPrototypeOf(proxy, null) 时。
3. isExtensible() 在判断一个代理对象是否是可扩展时触发该操作，比如在执行 Object.isExtensible(proxy) 时。
4. preventExtensible() 在判断一个代理对象是否是可扩展时触发该操作，比如在执行 Object.isExtensible(proxy) 时。
5. getOwnPropertyDescriptor() 在获取代理对象某个属性的属性描述时触发该操作，比如在执行 Object.getOwnPropertyDescriptor(proxy, "foo") 时。
6. defineProperty() 在定义代理对象某个属性时的属性描述时触发该操作，比如在执行 Object.defineProperty(proxy, "foo", {}) 时。
7. has() 在判断代理对象是否拥有某个属性时触发该操作，比如在执行 "foo" in proxy 时。
8. get() 在读取代理对象的某个属性时触发该操作，比如在执行 proxy.foo 时。
9. set() 在给代理对象的某个属性赋值时触发该操作，比如在执行 proxy.foo = 1 时。
10. deleteProperty() 在删除代理对象的某个属性时触发该操作，即使用 delete 运算符，比如在执行 delete proxy.foo 时。 
11. ownKeys() Object.getOwnPropertyNames 和Object.getOwnPropertySymbols 的陷阱。
12. apply() 函数调用操作的陷阱。  
13. construct() new 运算符的陷阱。

#### Reflect
> 与大多数全局对象不同，Reflect不是一个构造函数。你不能将其与一个new运算符一起使用，或者将Reflect对象作为一个函数来调用。Reflect的所有属性和方法都是静态的（就像Math对象）。
Reflect对象和上面Proxy对象方法一样，设计的目的有以下几个：
1. 统一编码方式，很多方法在Object部署，未来可能只在Reflect部署
2. 让Object操作变成函数行为，例如：name in obj 和 delete obj.name 等，Reflect.has(Object, 'assign')，Reflect.deleteProperty(Object, 'name')
```js
const user = {
    name: 'hjj',
    say (age = 18) {
        console.log('my name is:' + this.name, age)
    }
}
function Human (age) {
    this.name = 'man'
    this.age = age
    console.log()
}
function Animal (kind) {
    this.kind = kind
    this.type = 'dog'
}
 
// 1. Reflect.apply(target, thisArgument, argumentsList)
Reflect.apply(user.say, user, [27])

// 2. Reflect.construct(target, argumentsList[, newTarget])
// 返回值：以target（如果newTarget存在，则为newTarget）函数为构造函数，argumentList为其初始化参数的对象实例。
const pig = Reflect.construct(Human, ['pig'], Animal)

// 3. Reflect.defineProperty(target, propertyKey, attributes)
// 判断Object.defineProperty是否成功
if (Reflect.defineProperty(target, property, attributes)) {
  // 成功
} else {
  // 失败
}

// 4. Reflect.deleteProperty 允许你删除一个对象上的属性。返回一个 Boolean 值表示该属性是否被成功删除。它几乎与非严格的 delete operator 相同。
const obj = { x: 1, y: 2 };
Reflect.deleteProperty(obj, "x"); // true
obj; // { y: 2 }

// 5. Reflect.get
Reflect.get(obj, "x") // 1

// 6. Reflect.set
Reflect.get(obj, "z", 3) // { x: 1, y: 2, z: 3 }

// 7. Reflect.has

// 8. Reflect.getOwnPropertyDescriptor(target, propertyKey)
//    如果在对象中存在，则返回给定的属性的属性描述符。否则返回 undefined。

// 9. Reflect.getPrototypeOf(target)
//    给定对象的原型。如果给定对象没有继承的属性，则返回 null。

// 10. Reflect.isExtensible(target)
//     判断一个对象是否可扩展 （即是否能够添加新的属性）。与它 Object.isExtensible() 方法相似
// Sealed objects are by definition non-extensible. 
const sealed = Object.seal({}); 
Reflect.isExtensible(sealed); // === false 

// Frozen objects are also by definition non-extensible. 
const frozen = Object.freeze({}); 
Reflect.isExtensible(frozen); // === false

// 11. Reflect.isExtensible(target)
//     返回一个 Boolean 值表明该对象是否可扩展。

// 12. Reflect.ownKeys(target)
//     方法返回一个由目标对象自身的属性键组成的数组。它的返回值等同于Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
const sym = Symbol.for("comet");
const sym2 = Symbol.for("meteor");
const fixObj = {[sym]: 0, "str": 0, "773": 0, "0": 0,
           [sym2]: 0, "-1": 0, "8": 0, "second str": 0};
Reflect.ownKeys(fixObj);
// [ "0", "8", "773", "str", "-1", "second str", Symbol(comet), Symbol(meteor) ]

// 13. Reflect.setPrototypeOf(target, prototype)
//     它可设置对象的原型（即内部的 [[Prototype]] 属性）为另一个对象或 null，如果操作成功返回 true，否则返回 false。
```
