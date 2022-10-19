// 实现async await
function $async (gen) {
  return function (...args) {
    const _self = this

    return new Promise((resolve, reject) => {
      const iter = gen.apply(_self, args)
  
      const factory = (type) => {
        return function (data) {
          try {
            const { value, done } = iter[type](data)
            if (!done) {
              Promise.resolve(value).then(_next, _throw)
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
  
      _next()
    })
  }
}

// test
// function * gen (n) {
//   const ret1 = yield Promise.resolve(1)
//   const ret2 = yield Promise.resolve(ret1 + 1)
//   const ret3 = yield Promise.resolve(ret2 + 1)

//   return ret3 * n
// }

// const _gen = $async(gen)
// const ret = _gen(10)
// console.log('ret', ret)
// ret.then(
//   value => console.log('value', value),
//   reason => console.log('reason', reason)
// )
