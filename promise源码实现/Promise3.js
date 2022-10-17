const State = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

const isBrowser = typeof window === 'object'
const createMicrotask = ((isBrowser) => {
  if (isBrowser) {
    return function (cb) {
      let counter = 1
      const observer = new MutationObserver(() => cb())
      const textNode = document.createTextNode(String(counter))
      observer.observe(textNode, {
        characterData: true
      })
      counter = (counter + 1) % 2
      textNode.data = String(counter)
    }
  }
  
  return function (cb) {
    process.nextTick(cb)
  }
})(isBrowser)

class MyPromise {
  constructor (executor) {
    this.state = State.PENDING
    this.value = undefined
    this.reason = undefined
    this.fulfilledCbs = []
    this.rejectedCbs = []

    const resolve = value => {
      if (isPromise(value)) {
        value.then(resolve, reject)
        return
      }

      createMicrotask(() => {
        if (this.state === State.PENDING) {
          this.state = State.FULFILLED
          this.value = value
          this.fulfilledCbs.forEach(cb => cb())
        }
      })
    }

    const reject = reason => {
      createMicrotask(() => {
        if (this.state === State.PENDING) {
          this.state = State.REJECTED
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

    const p = new MyPromise((resolve, reject) => {
      if (this.state === State.FULFILLED) {
        createMicrotask(() => {
          try {
            const ret = onFulfilled(this.value)
            resolvePromise(p, ret, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.state === State.REJECTED) {
        createMicrotask(() => {
          try {
            const ret = onRejected(this.reason)
            resolvePromise(p, ret, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.state === State.PENDING) {
        this.fulfilledCbs.push(() => {
          try {
            const ret = onFulfilled(this.value)
            resolvePromise(p, ret, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        this.rejectedCbs.push(() => {
          try {
            const ret = onRejected(this.reason)
            resolvePromise(p, ret, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return p
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
    return new MyPromise(resolve => resolve(value))
  }

  static reject (reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }

  static all (promises) {
    return new MyPromise((resolve, reject) => {
      const doneArr = []
      const ret = []
      const iterator = promises[Symbol.iterator]()
      let iteratorObj = iterator.next()

      const resolveResult = (value, index) => {
        ret[index] = value
        doneArr[index] = true
        if (doneArr.every(done => done)) resolve(ret)
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
        iteratorObj = iterator.next()
        if (isPromise(value)) {
          value.then(resolve, reject)
        } else {
          resolve(value)
        }
      }
    })
  }
}

function resolvePromise (p, x, resolve, reject) {
  if (p === x) {
    const e = new TypeError('Chaining cycle detected for promise #<MyPromise>')
    e.stack = ''

    return reject(e)
  }

  let called = false

  if (
    (
      typeof x === 'object' &&
      x !== null
    )
    ||
    isFunction(x)
  ) {
    try {
      const then = x.then
      if (isFunction(then)) {
        then.call(
          x,
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
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

function isFunction (fn) {
  return typeof fn === 'function'
}

function isPromise (arg) {
  return (
    (
      typeof arg === 'object' &&
      arg !== null
    )
    ||
    isFunction(arg)
  ) && isFunction(arg.then)
}

// test code
if (!isBrowser) {
  MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {}
    dfd.promise = new MyPromise((resolve, reject) => {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
  }
  
  module.exports = MyPromise
}
