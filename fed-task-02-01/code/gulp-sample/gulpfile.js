const { series, parallel } = require('gulp')
const fs = require('fs')
const { Transform } = require('stream')


exports.default = () => {
  const read = fs.createReadStream('src/css/main.css')
  const write = fs.createWriteStream('src/css/main.min.css')
  // 文件转换流
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      // 核心转换过程实现
      const input = chunk.toString()
      const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
      callback(null, output)
    }
  })
  read
    .pipe(transform)
    .pipe(write)

  return read
}


// const task_1 = done => {
//   setTimeout(() => {
//     console.log('task_1 running')
//     done()
//   }, 1500)
// }
// const task_2 = done => {
//   setTimeout(() => {
//     console.log('task_2 running')
//     done()
//   }, 100)
// }

// const task_3 = done => {
//   setTimeout(() => {
//     console.log('task_3 running')
//     done()
//   }, 1400)
// }

// 串行任务，串行执行
// exports.foo = series(task_1, task_2, task_3)

// 并行任务，并行执行
// exports.foo = parallel(task_1, task_2, task_3)


/**
 * 异步方案
 */

 // 1. 回调函数
//  exports.callback = done => {
//    console.log('callback task ~~')
//    done()
//  }

//  exports.callback_error = done => {
//    console.log('callabck_error task')
//    done(new Error('task failed'))
//  }

//  // 2. Promise
//  exports.promise = () => {
//    return Promise.resolve()
//  }

//  exports.promise_error = () => {
//    return Promise.reject(new Error('task failed'))
//  }
// function deffer (time) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('haha')
//     }, time)
//   })
// }
//  // 2.1 async await
//  exports.async = async () => {
//    console.log('async task start', new Date().getTime())
//    await deffer(3000)
//    console.log('async task end', new Date().getTime())
//  }


//  // 3. stream模式
// exports.stream = done => {
//   const readStream = fs.createReadStream('package.json')
//   const writeStream = fs.createWriteStream('temp.text')
//   readStream.pipe(writeStream)
//   readStream.on('end', () => {
//     done()
//   })
// }

