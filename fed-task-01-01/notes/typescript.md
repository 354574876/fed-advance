## TypeScript
> JavaScript超集，由于JavaScript是一种弱类型的动态语言。然而在我们开发大的项目多人协同的时候又需要强类型静态的语言，以
规避语言层面上的问题，如果仅仅通过内部约定式的规范很难做到绝对的控制。

* 弱类型：仅仅只有var，可以定义各种类型的数据
* 动态语言：变量类型不是在定义的时候决定的，而是在执行到的时候决定的；可以动态改变类型

### Flow
数据类型：
```flow js
// 1. 原始类型
const a: string = 'name'
const b: number = 1 // NaN Infinity
const c: boolean = true // false
const d: null = null
const f: void = undefined
const g: symbol = Symbol
const h: any = 'any' // 任意类型is ok

// 2. 有结构类型
// 2.1 数组类型
const arr1: Array<number> = [1, 2, 3]
const arr2: number[] = [1, 2, 3]
const arr3: [string, number] = ['name', 2] // 元组：固定长度
// 2.2 对象类型
const obj1: {name: string, age: number} = {name: 'hjj', age: 18}
const obj2: {name?: string, age: number, [string]: number} = {age: 22}
// 2.3 函数类型
function fnc(a: number, b: string): void {
  return a + b
}

// 3 特殊类型
const a: 'foo' = 'foo' // 只能是foo，其它报错
const type: 'error' | 'warning' | 'success' = 'success' // 只能是前面三种类型
const stringOrNumber = string | number // 自定义类型
const b: stringOrNumber = c
const obj: ?number = 3 // 可以是 null 或者是 undefined

// 4 Mixed Any 任意类型
// 4.1 Mixed 强类型
function passMixed (value: mixed) {
 return value *= value
}
passMixed('name') // 会报错
// 4.2 Any 弱类型
function passAny (value: any) {
 return value *= value
}
passMixed('name') // 不会报错
```
