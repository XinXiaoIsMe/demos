// n秒内触发则重新计时，之前的计时器会被清空。从而保证两次回调函数的执行间隔必须大于n秒
function debounce (fn, time, triggerNow = true) {
  var timer = null

  return function () {
    var self = this
    var args = arguments

    if (timer) clearTimeout(timer)

    if (triggerNow) {
      var exec = !timer
      timer = setTimeout(function () {
        timer = null
      }, time)
      if (exec) fn.apply(self, args)
    } else {
      timer = setTimeout(function () {
        fn.apply(self, args)
      }, time)
    }
  }
}