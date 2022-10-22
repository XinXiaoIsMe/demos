import Element from './element.js'
import { isType } from './utils.js'

export function createElement (tag, props, key, children) {
  return new Element(tag, props, key, children)
}

export function render (vnode, container) {
  const el = renderDOM(vnode)
  container || (container = document.body)
  container.appendChild(el)
}

export function renderDOM (vnode) {
  const {
    tag,
    props,
    text,
    children
  } = vnode
  const dom = document.createElement(tag)

  vnode.addEl(dom)
  setAttrs(dom, props)
  if (text) {
    dom.textContent = text
  } else {
    children.forEach(child => {
      const node = isType(child, 'string') ? document.createTextNode(child) : renderDOM(child)
      dom.appendChild(node)
    })
  }

  return dom
}

function setAttrs (dom, props) {
  for (const key in props) {
    setAttr(dom, key, props[key])
  }
}

export function setAttr (dom, key, value) {
  switch (key) {
    case 'value':
      const tag = dom.tagName.toLowerCase()
      ;(tag === 'input' || tag === 'textarea')
        ? (dom.value = value)
        : dom.setAttribute(key, value)
      break
    default:
      dom.setAttribute(key, value)
      break
  }
}

