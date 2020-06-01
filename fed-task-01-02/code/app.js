const fp = require('lodash/fp')
const _ = require('lodash')


// support.js 
class Container {
  static of (value) {
    return new Container(value)
  }
  constructor (value) {
		this._value = value
	}
	map (fn) {
		return Container.of(fn(this._value))
	}
}
class Maybe {
  static of (x) {
       return new Maybe(x)
  }
  isNothing () {
		return this._value === null || this._value === undefined
  }
  constructor (x) {
  	this._value = x
  }
	map(fn) {
    console.log(this._value)
		return this.isNothing() ? this : Maybe.of(fn(this._value))
	}
}

let maybe = Maybe.of([5, 6, 11])
let add = arry => fp.map(x => fp.add(x, 1), arry)
let ex1 = maybe.map(x => add(x))
console.log(ex1)

let xs = Container.of(['do', 'ray' , 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = xs.map(x => fp.first(x))
console.log(ex2)


let safeProp = fp.curry(function (x, o) { return Maybe.of(o[x]) })
let user = { id: 2, name: "Albert" }
//...你需要实现的位S
let ex3 = safeProp('name', user).map(x => fp.first(x))
console.log(ex3)

let ex4 = n => Maybe.of(n).map(x => parseInt(x))

console.log(ex4())
