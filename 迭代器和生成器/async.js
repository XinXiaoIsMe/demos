function * asyncFn (a) {
  console.log('arg: ', a)
  const v = yield Promise.resolve(3)
  const v2 = yield Promise.reject(v + 4)
  const v3 = yield Promise.resolve(v2 + 5)
  return v3
}

function Co (asyncFn) {
  return (...args) => {
    const self = this

    return new Promise((resolve, reject) => {
      const iter = asyncFn.apply(self, args)

      const factory = (type) => {
        return data => {
          try {
            const { value, done } = iter[type](data)
            if (!done) {
              Promise.resolve(value).then(_next, _throw) // 注意这里不能写成 Promise.resolve(value).then(_next, reject) 因为需要使用 throw 函数终止迭代器
            } else {
              resolve(value)
            }
          } catch (e) {
            reject(e)
          }
        }
      }
  
      const _next = factory('next')
      const _throw = factory('throw')
  
      const next = () => {
        _next()
      }
  
      next()
    })
  }
}

// const co = _asyncToGenerator(asyncFn)()
const co = Co(asyncFn)('start')
co.then(
  v => console.log('v', v),
  reason => console.log('reason', reason)
)


// 大佬的代码
function _asyncToGenerator(fn) {
  return function (...args) {
    const self = this
    // 将返回值promise化
    return new Promise(function (resolve, reject) {
      // 获取迭代器实例
      const gen = fn.apply(self, args)
      // 执行下一步
      function _next(...nextArgs) {
        // 把自己放进去
        asyncGeneratorStep(
          gen,
          resolve,
          reject,
          _next,
          _throw,
          'next',
          ...nextArgs
        )
      }
      // 抛出异常
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }
      // 启动迭代器
      _next()
    })
  }
}

function asyncGeneratorStep(
  gen,
  resolve,
  reject,
  _next,
  _throw,
  key,
  // 只有一个参数，同时需要满足 next 和 throw，所以直接 any 就好了
  arg
) {
  try {
    // yield 后的值是返回出来的，我们现在需要将其放在定义的值前面
    const { value, done } = gen[key](arg)
    if (done) {
      // 迭代器完成
      resolve(value)
    } else {
      // -- 这行代码就是精髓 --
      // 将所有值promise化
      // 比如 yield 1
      // const a = Promise.resolve(1) a 是一个 promise
      // const b = Promise.resolve(a) b 是一个 promise
      // 可以做到统一 promise 输出
      // 当 promise 执行完之后再执行下一步
      // 递归调用 next 函数，直到 done === true
      // _next是从上面传入到下面的
      Promise.resolve(value).then(_next, _throw)
    }
  } catch (error) {
    reject(error)
  }
}

