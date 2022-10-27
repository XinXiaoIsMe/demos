// 一个简易的css loader
function cssLoader (source) {
  const options = this.getOptions()
  const extract = !!options.extract
  return extract ? extractCss.call(this, source, options) : injectCss.call(this, source)
}

function extractCss (source, options) {
  const {
    commonPath = ''
  } = options
  const filename = this.resourcePath.slice(this.resourcePath.lastIndexOf('\/') + 1)
  const filePath = commonPath ? `${ commonPath }/${ filename }` : filename

  this.emitFile(filePath, source) // 创建一个文件

  return `module.exports = (function (doc) {
    if (!doc) return

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '${ filePath }'
    doc.head.appendChild(link)
  })(document)`
}

function injectCss (source) {
  return `module.exports = (function (doc) {
    if (!doc) return

    const style = document.createElement('style')
    style.innerHTML = ${ JSON.stringify(source) }
    doc.head.appendChild(style)
  })(document)`
}

module.exports = cssLoader
