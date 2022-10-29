const A = require('./moduleA')
const B = require('./moduleB')

console.log(A, B)

/**
 * 循环引用：nodejs中，碰到循环引用的部分，只会输出已经处理过的部分：
 * 上述代码执行过程：
 * 1. 引入moduleA，module.exports上添加变量test为a，执行到第3行代码时，引入moduleB
 * 2. 在moduleB模块中，module.exports上添加变量test为b，执行到第3行代码时引入moduleA，此时只会输出moduleA已经被处理过的部分，也就是说不再处理moduleA剩余的部分，直接返回{ test: 'a' }
 * 3. 打印: moduleA: a
 * 4. 将module.exports上的test重新赋值为bb，此时moduleA中moduleB的引入完成，得到 { test: 'bb' }
 * 5. 打印：moduleB: bb
 * 6. 将module.exports上的test重新赋值为aa，此时moduleA的导出为{ test: 'aa' }
 * 6. 此时main.js中moduleA的引入完成。由于nodejs中引入的模块会缓存，不会重复引入，所以引入moduleB时直接从缓存读取不再执行moduleB中代码，此时A的值为{ test: 'aa' }，B的值为{ test: 'bb' }
 * 7. 打印A，B
 */
