import Element from './element.js'

function createElement (type, props, children) {
  return new Element(type, props, children)
}

function render (vDom, container) {
  const el = renderDOM(vDom)
  container.appendChild(el)
}

function renderDOM (vNode) {
  if (vNode instanceof Element) {
    const {
      type,
      props,
      children
    } = vNode
    const node = document.createElement(type)
    for (let key in props) {
      setAttr(node, key, props[key])
    }
    children.forEach(child => node.appendChild(renderDOM(child)))
    return node
  } else {
    return document.createTextNode(vNode)
  }
}

function setAttr (node, prop, value) {
  switch (prop) {
    case 'value':
      if (node.tagName.toLowerCase() === 'input' || node.tagName.toLowerCase() === 'textarea') {
        node.value = value
      }
      break
    case 'style':
      node.style.cssText = value
      break
    default:
      node.setAttribute(prop, value)
      break
  }
}

export {
  createElement,
  render,
  renderDOM,
  setAttr
}
