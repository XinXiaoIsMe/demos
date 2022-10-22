import {
  REPLACE,
  REMOVE,
  TEXT,
  ATTR
} from './patchTypes.js'
import { renderDOM, setAttr } from './vdom.js'

const patches = []
let idx = 0 // 用于记录深度优先遍历的节点id
let nodeId = 0

function domDiff (oldVNode, newVNode, container) {
  const patchMap = {}
  patchNode(oldVNode, newVNode).forEach(node => patchMap[node.index] = node)
  nodeDiff(container, nodeId, patchMap)
}

function nodeDiff (node, id, patchMap) {
  const patch = patchMap[id]

  console.log([id, node, node.tagName, node.innerHTML])

  if (patch) {
    const {
      type,
      value
    } = patch

    switch (type) {
      case REMOVE:
        node.remove()
        break
      case REPLACE:
        console.log(renderDOM(value), 'dom', node.parentNode, node)
        node.parentNode.replaceChild(renderDOM(value), node)
        break
      case ATTR:
        for (const key in value) {
          const propValue = value[key]
          if (propValue) setAttr(node, key, propValue)
          else node.removeAttribute(key)
        }
        break
      case TEXT:
        const textNode = document.createTextNode(value)
        node.parentNode.replaceChild(textNode, node)
        break
    }
  }

  for (let i = 0, childNodes = node.childNodes, len = childNodes.length; i < len; i ++) {
    const childNode = childNodes[i]
    nodeDiff(childNode, ++ nodeId, patchMap)
  }
}

function patchNode (oldVNode, newVNode, index = 0) {
  if (!newVNode) {
    patches.push({
      type: REMOVE,
      value: oldVNode,
      index
    })
    idx += oldVNode.children.length // 注意这里移除操作为了保证idx和nodeId一致，需要把移除的节点的children长度也算上
  } else if (
      typeof oldVNode === 'string' && 
      typeof newVNode === 'string' &&
      newVNode !== oldVNode
    ) {
    patches.push({
      type: TEXT,
      value: newVNode,
      index
    })
  } else if (oldVNode.type === newVNode.type) {
    const attrPatches = patchAttrs(oldVNode.props, newVNode.props)
    if (Object.keys(attrPatches).length) {
      patches.push({
        type: ATTR,
        value: attrPatches,
        index
      })
    }

    patchChildren(oldVNode.children, newVNode.children)
  } else if (oldVNode.type !== newVNode.type) {
    patches.push({
      type: REPLACE,
      value: newVNode,
      index
    })
  }

  return patches
}

function patchAttrs (oldAttrs, newAttrs) {
  const attrs = {}
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      attrs[key] = newAttrs[key]
    }
  }

  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      attrs[key] = newAttrs[key]
    }
  }

  return attrs
}

function patchChildren (oldChildren, newChildren) {
  if (newChildren.length > oldChildren.length) {
    newChildren.forEach((child, i) => patchNode(oldChildren[i], child, ++ idx))
  } else {
    oldChildren.forEach((child, i) => patchNode(child, newChildren[i], ++ idx))
  }
}

export default domDiff
