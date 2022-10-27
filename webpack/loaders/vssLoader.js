// 实现一个loader处理后缀名为vss的文件，将其转化为css格式。vss支持css变量，以 %% 开头的为变量
module.exports = function (source) {
  const map = {}

  return source.replace(/(%%.+):\s*(.+);/g, function ($, name, value) {
    map[name] = value
    return ''
  }).replace(/%%.(?=[;\s])+/g, function (key) {
    return map[key]
  })
}
