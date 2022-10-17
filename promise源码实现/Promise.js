const state = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

class MyPromise {
  constructor (executor) {
    this.state = state.PENDING
    this.value = undefined
    this.reason = undefined
    this.resolvedCbs = []
    this.rejectedCbs = []

    const resolve = (value) => {
      if (isPromise(value)) {
        value.then(resolve, reject)
        return
      }

      setTimeout(() => {
        if (this.state === state.PENDING) {
          this.state = state.FULFILLED
          this.value = value
          this.resolvedCbs.forEach(cb => cb())
        }
      })
    }

    const reject = (reason) => {
      setTimeout(() => {
        if (this.state === state.PENDING) {
          this.state = state.REJECTED
          this.reason = reason
          this.rejectedCbs.forEach(cb => cb())
        }
      })
    }
    
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : value => value
    onRejected = isFunction(onRejected) ? onRejected : reason => { throw reason }

    const p2 = new MyPromise((resolve, reject) => {
      if (this.state === state.FULFILLED) {
        setTimeout(() => {
          try {
            const ret = onFulfilled(this.value)
            resolvePromise(p2, ret, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.state === state.REJECTED) {
        setTimeout(() => {
          try {
            const ret = onRejected(this.reason)
            resolvePromise(p2, ret, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.state === state.PENDING) {
        this.resolvedCbs.push(() => {
          try {
            const ret = onFulfilled(this.value)
            resolvePromise(p2, ret, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        this.rejectedCbs.push(() => {
          try {
            const ret = onRejected(this.reason)
            resolvePromise(p2, ret, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return p2
  }

  catch (reject) {
    return this.then(null, reject)
  }

  finally (cb) {
    return this.then(
      value => MyPromise.resolve(isFunction(cb) && cb()).then(() => value),
      reason => MyPromise.resolve(isFunction(cb) && cb()).then(() => { throw reason })
    )
  }

  static resolve (value) {
    return new MyPromise((resolve) => resolve(value))
  }

  static reject (reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }

  static all (promises) {
    return new MyPromise((resolve, reject) => {
      const ret = []
      const doneArr = []
      const iterator = promises[Symbol.iterator]()
      let iteratorObj = iterator.next()

      const resolveResult = (value, i) => {
        ret[i] = value
        doneArr[i] = true

        if (doneArr.every(done => done)) {
          resolve(ret)
        }
      }

      for (let i = 0; !iteratorObj.done; i ++) {
        const { value } = iteratorObj
        iteratorObj = iterator.next()
        doneArr.push(false)
        if (isPromise(value)) {
          value.then(
            v => resolveResult(v, i),
            reject
          )
        } else {
          resolveResult(value, i)
        }
      }
    })
  }

  static race (promises) {
    return new MyPromise((resolve, reject) => {
      const iterator = promises[Symbol.iterator]()
      let iteratorObj = iterator.next()

      while (!iteratorObj.done) {
        const { value } = iteratorObj

        if (isPromise(value)) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }

        iteratorObj = iterator.next()
      }
    })
  }

  static allSettled (promises) {
    return new MyPromise(resolve => {
      const ret = []
      const doneArr = []
      const iterator = promises[Symbol.iterator]()
      let iteratorObj = iterator.next()

      const resolveResult = (status, value, i) => {
        doneArr[i] = true
        switch (status) {
          case state.FULFILLED:
            ret[i] = {
              status,
              value
            }
            break
          case state.REJECTED:
            ret[i] = {
              status,
              reason: value
            }
            break
          default:
            break
        }
        if (doneArr.every(done => done)) resolve(ret)
      }
  
      for (let i = 0; !iteratorObj.done; i ++) {
        const { value } = iteratorObj
        iteratorObj = iterator.next()
        doneArr.push(false)
        if (isPromise(value)) {
          value.then(
            v => resolveResult(state.FULFILLED, v, i),
            reason => resolveResult(state.REJECTED, reason, i)
          )
        } else {
          resolveResult(state.FULFILLED, value, i)
        }
      }
    })
  }

  static any (promises) {
    return new MyPromise((resolve, reject) => {
      let rejectedArr = []
      const iterator = promises[Symbol.iterator]()
      let iteratorObj = iterator.next()

      if (iteratorObj.done) reject('AggregateError: All promises were rejected')

      for (let i = 0; !iteratorObj.done; i ++) {
        const { value } = iteratorObj
        iteratorObj = iterator.next()
        rejectedArr.push(false)

        if (isPromise(value)) {
          value.then(resolve, () => {
            rejectedArr[i] = true

            if (rejectedArr.every(item => item)) reject('AggregateError: All promises were rejected')
          })
        } else {
          resolve(value)
        }
      }
    })
  }
}

function resolvePromise (p, ret, resolve, reject) {
  if (p === ret) {
    const e = new TypeError('Chaining cycle detected for promise #<MyPromise>')
    e.stack = ''
    return reject(e)
  }

  let called = false

  if (
    (
      typeof ret === 'object' && 
      ret !== null
    )
    ||
    isFunction(ret)
  ) {
    try {
      const then = ret.then
      if (isFunction(then)) {
        then.call(
          ret,
          value => {
            if (called) return
            called = true
            resolvePromise(p, value, resolve, reject)
          },
          reason => {
            if (called) return
            called = true
            reject(reason)
          }
        )
      } else {
        resolve(ret)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(ret)
  }
}

function isFunction (fn) {
  return typeof fn === 'function'
}

function isPromise (obj) {
  return (
    (
      typeof obj === 'object' && 
      obj !== null
    ) 
    ||
    isFunction(obj)
  ) && isFunction(obj.then)
}

MyPromise.defer = MyPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = MyPromise
