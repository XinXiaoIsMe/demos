const renderOptions = {
  createElement (tag) {
    return document.createElement(tag)
  },
  setElementText (el, text) {
    el.textContent = text
  },
  insert (container, el, anchor = null) {
    container.insertBefore(el, anchor)
  },
  patchProps (el, key, prevValue, nextValue) {
    if (key === 'class') { // 对class做特殊处理
      const className = normalizeClass(nextValue) // 统一class的值为字符串
      el.className = className // 使用这种方式设置比使用setAttribute效率高
    } else if (key === 'style') {
      const style = normalizeStyle(nextValue)
      for (const key in style) {
        el.style[key] = style[key]
      }
    } else if (/^on/.test(key)) { // 处理事件
      const eventName = key.slice(2).toLowerCase()
      // if (prevValue) el.removeEventListener(eventName, prevValue)
      // if (nextValue) el.addEventListener(eventName, nextValue)
      // 上面先移除所有事件再添加新的事件的方式效率不高，可通过在el上保存事件处理函数的方式做优化
      const invokers = el._vei || (el._vei = {}) // vei => vue event invoker
      const invoker = invokers[eventName]
      if (nextValue) {
        if (!invoker) { // 如果旧的vnode没有对应事件，则添加一个包装后的事件回调
          invoker = el._vei[eventName] = e => {
            if (Array.isArray(invoker.value)) {
              invoker.value.forEach(fn => fn(e))
            } else {
              invoker.value(e)
            }
          }
          el.addEventListener(eventName, invoker)
          invoker.value = nextValue
        } else {
          invoker.value = nextValue
        }
      } else if (invoker) { // 如果新的事件回调函数为空，旧的不为空则直接移除事件
        el.removeEventListener(eventName, invoker)
      }
    } else if (shouldSetAsProps(el, key, nextValue)) {
      // 对disabled之类的值为boolean类型的做特殊处理，需要考虑以下情况：
      // 当用户在模版上添加 disabled 的时候，会被编译解析成 { disabled: '' }，
      // 此时如果直接设置，空字符串会被浏览器解析成false，从而与用户意图相反
      // 所以遇到这种情况直接设置成true
      const type = typeof el[key]
      if (type === 'boolean' && nextValue === '') {
        el[key] = true
      } else {
        el[key] = nextValue
      }
    } else {
      el.setAttribute(key, nextValue)
    }
  }
}

function shouldSetAsProps (el, key, nextValue) {
  // 由于 input标签 的form属性是只读的，因此只能通过setAttribute设置
  if (key === 'form' && el.tagName.toLowerCase() === 'input') return false

  return key in el
}

function normalizeClass (className) {
  const transformObjToStr = obj => {
    let ret = ''
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key]) {
        ret += key + ' '
      }
    }
    return ret.trim()
  }

  if (Array.isArray(className)) {
    return className
      .map(_class => typeof _class === 'object' ? transformObjToStr(_class) : _class)
      .join(' ')
      .trim()
  } else if (typeof className === 'object') {
    return transformObjToStr(className)
  } else {
    return className
  }
}

function normalizeStyle (style) {
  const ret = {}
  if (typeof style === 'string') {
    style.split(';').forEach(styleStr => {
      const [key, value] = styleStr.split(':').map(item => item.trim())
      ret[key] = value
    })
  } else if (typeof style === 'object') {
    for (const key in style) {
      if (style.hasOwnProperty(key)) {
        ret[formatStyleKey(key)] = style[key]
      }
    }
  }
  return ret
}

function formatStyleKey (key) {
  return key.replace(/[A-Z]/g, k => '-' + k.toLowerCase())
}

export default renderOptions
