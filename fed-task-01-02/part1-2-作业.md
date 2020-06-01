## 简单题
### 1. 描述引用计数的工作原理和优缺点
**解析：**
原理：代码在执行的时候会给对象添加一个引用计数器，每当被引用一次计数器就会+1；引用失效的话，计数器就会-1；当计数器为0的时候，垃圾回收就会进行代码回收；  
优点：能够及时回收，判断效率高  
缺点：时间开销大；循环引用无法计算导致不准确
### 2. 描述标记整理算法的工作流程
**解析：**
标记整理算法是标记清除算法的一种加强，工作流程：标记出所有的需要回收的对象，在标记完成之后回收所有被标记的对象，但是会清除掉碎片空间，比标记清除算法多花费时间在整理上
### 3. 描述V8中新生代存储区垃圾回收的流程
**解析：**
新生代存储区主要存储一些活动对象较短的对象。由于内存小，它是通过空间换时间来完成内存释放的；主要的流程为：
1. From区域分配内存给对象，当主线程执行完一次之后进行垃圾回收；将处于活跃状态的对象复制到To区间保存
2. 然后将From中没有活动的对象清除
3. 此时将From和To进行角色互换
4. 多次进行互换
5. 如果对象互换多次依旧存在，会认为是一个生命周期长的对象，在下一次进行垃圾回收的时候会晋升到老生代
### 4. 描述增量标记算法在何时使用以及工作原理
**解析：**
增量标记算法是会在程序执行整个过程中使用的，会和程序执行交替进行，程序执行完一段之后，遍历标记对象，然后程序继续执行，发现有代码继续标记，执行交替完成。


## 代码题
### 1. 基于下面代码完成下面的四个练习
```js
/数据
// horsepower 马力，dollar—value 价格， in_stock 库存
const cars = [
  { name: "Ferrari FF", horsepowers 660, dollar— value: 700000, in_stock: true },
  {
    name: "Spyker C12 Zagato",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false),
  {
    name: "Jaguar XKR-S",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false),
  {
    name: "Audi R8",
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false),
  { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: "Pagani Huayra", horsepower: 700, dollar_values 1300000, in_stock: false }
]
```
#### 练习1.使用函数组合 fp.flowRight()重新实现下面这个函数
题目：
```js
let isLastlnStock = function(cars) {
  // 获取最后一条数据
  let last_car = fp.last(cars) 
  // 获取最后一条数据的in_stock属性值 
  return fp.prop('in_stock', last_car)
}
isLastlnStock(cars) // false
```

**解析：**
```js
let isLastlnStock = fp.flowRight(fp.prop('in_stock') ,fp.last)
isLastlnStock(cars) // false
```

#### 练习2.使用fp.flowRight(),fp.prop() 和 fp.first()获取第一个car的name

**解析：**
```js
let getFristCarName = fp.flowRight(fp.prop('name'), fp.first)
getFristCarName(cars) // Ferrari FF
```

#### 练习3 使用帮助函数_average重构averageDollarValue.使 用函数组合的方式实现

**解析：**
```js
let _average = function(xs) { return fp.reduce(fp.add, 0, xs) / xs.length }

// 获取价格列表
let dollarValue = cars => fp.map(car => car.dollar_value, cars)

let averageDollarValue = _.flowRight(_average, dollarValue)
```

#### 练习4 使用 flowRight 写一个 sanitizeNames()函数，返回 一个下划线连接的小写字符串，把数组中的name转换为这种形式:例如 : sanitizeNames(["Hello World")) => ["hello_world"]

**解析：**
```js
// 获取name
//<--无须改动，井在 sanitizeNames中使用它
let _underscore = fp.replace(/\W+/g, '_')
let _getNames = cars => fp.map(car => car.name, cars)

let sanitizeNames = fp.flowRight(fp.map(_underscore),fp.map(fp.toLower), _getNames)
sanitizeNames(cars)
```

### 代码题2

#### 练习1:使用fp.add(x, y) 和 fp.map(f, x) 创建一个能让functor里的值增加的函数ex1
**解析：**
```js
let maybe = Maybe.of([5, 6, 11])
let add = arry => fp.map(x => fp.add(x, 1), arry)
let ex1 = maybe.map(x => add(x))
```

#### 练习2: 实现一个函数ex2，能够使用fp.first获取列表中的第一个元素

```js
let xs = Container.of(['do', 'ray' , 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = xs.map(x => fp.first(x))
```

#### 练习3: 实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母

**解析：**
```js
let safeProp = fp.curry(function { { return Maybe.of(o[x]) })
let user = { id: 2, name: "Albert" 
let ex3 = safeProp('name', user).map(x => fp.first(x))
```


#### 练习4: 使用Maybe重写ex4，不要有if语句
**解析：**
```js
let ex4 = n => Maybe.of(n).map(x => parseInt(x))
```