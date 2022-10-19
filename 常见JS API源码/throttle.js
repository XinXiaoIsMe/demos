// n秒内只执行一次
function throttle (fn, delay) {
  var beginTime = new Date().getTime()
  var timer = null

  return function () {
    var curTime = new Date().getTime()
    var self = this
    var arg = arguments

    if (timer) clearTimeout(timer)

    if (curTime - beginTime >= delay) {
      fn.apply(self, arg)
      beginTime = curTime
    } else {
      timer = setTimeout(function () {
        fn.apply(self, arg)
      }, delay)
    }
  }
}