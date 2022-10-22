import { hasChildren, isUndef, isDef, isSameVnode, isType } from './utils.js'
import { renderDOM, setAttr } from './vdom.js'

export default function patch (newVnode, oldVnode) {
  // 如果是同一个vnode（key和tag相同）就进行diff
  if (isSameVnode(newVnode, oldVnode)) patchVnode(newVnode, oldVnode)
  // 否则直接生成新的节点进行替换
  else replaceNode(newVnode, oldVnode)

  return newVnode
}

function patchVnode (newVnode, oldVnode) {
  newVnode.$el = oldVnode.$el
  if (newVnode === oldVnode) return newVnode
  
  const {
    children: newVnodeChildren,
    props: newProps
  } = newVnode
  const {
    children: oldVnodeChildren,
    props: oldProps,
    $el
  } = oldVnode
  const hasNewVnodeChildren = hasChildren(newVnodeChildren)
  const hasOldVnodeChildren = hasChildren(oldVnodeChildren)

  patchAttrs($el, oldProps, newProps)

  if (hasNewVnodeChildren && hasOldVnodeChildren) {
    patchChildren(newVnodeChildren, oldVnodeChildren, $el)
  } else if (hasOldVnodeChildren) { // 新的vnode没有children，老的有则对应真实DOM去除children
    $el.innerHTML = ''
  } else if (hasNewVnodeChildren) { // 新的vnode有children，老的没有则对应真实DOM添加children
    $el.innerHTML = ''
    const fragment = document.createDocumentFragment()
    for (const child of newVnodeChildren) {
      fragment.appendChild(renderDOM(child))
    }
    $el.appendChild(fragment)
  }
}

function patchChildren (newChildren, oldChildren, parentNode) {
  /**
   * 设置4个指针分别指向新旧vnode数组的前后两端，分别取名为新前，新后，旧前，旧后
   * newStartIdx             newEndIdx
   *     ↓                      ↓
   * [vnode1, vnode2, vnode3, vnode4]
   * 
   * oldStartIdx             oldEndIdx
   *     ↓                      ↓
   * [vnode1, vnode2, vnode3, vnode4]
   * 比对规则(依次比较)：
   * 1. 比较新前和旧前
   * 2. 比较新后和旧后
   * 3. 比较新后和旧前: 如果相同，则说明原先的节点对应DOM节点需要移到末尾，注意这里指旧后节点的后面
   * 4. 比较新前和旧后: 如果相同，则说明原先的节点对应DOM节点需要移到开头，注意这里指旧前节点的前面
   * 5. 循环查找对应节点: 查找oldStartIdx和oldEndIdx之间的节点中是否有等于当前节点(newStartVnode)的，如果有则将其对应DOM节点移到开头，注意这里指旧前节点的前面
   * 
   * 注：每次经历一次上述循环都会有一个节点的位置被确定。
   * 循环结束后，如果旧vnode数组被遍历完，但是新vnode数组没有遍历完，则说明需要新增节点。如果旧vnode数组没有遍历完，新vnode数组遍历完，则说明需要删除节点。
   */
  let newStartIdx = 0
  let newStartVnode = newChildren[newStartIdx]
  let newEndIdx = newChildren.length - 1
  let newEndVnode = newChildren[newEndIdx]
  let oldStartIdx = 0
  let oldStartVnode = oldChildren[oldStartIdx]
  let oldEndIdx = oldChildren.length - 1
  let oldEndVnode = oldChildren[oldEndIdx]
  let oldKeyToIdx

  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if (isUndef(newStartVnode)) {
      newStartVnode = newChildren[++ newStartIdx]
    } else if (isUndef(newEndVnode)) {
      newEndVnode = newChildren[-- newEndIdx]
    } else if (isUndef(oldStartVnode)) {
      oldStartVnode = oldChildren[++ oldStartIdx]
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldChildren[++ oldStartIdx]
    } else if (isSameVnode(newStartVnode, oldStartVnode)) { // 起始
      console.log('1. 比较新前和旧前')
      patchVnode(newStartVnode, oldStartVnode)
      newStartVnode = newChildren[++ newStartIdx]
      oldStartVnode = oldChildren[++ oldStartIdx]
    } else if (isSameVnode(newEndVnode, oldEndVnode)) {
      console.log('2. 比较新后和旧后')
      patchVnode(newEndVnode, oldEndVnode)
      newEndVnode = newChildren[-- newEndIdx]
      oldEndVnode = oldChildren[-- oldEndIdx]
    } else if (isSameVnode(newEndVnode, oldStartVnode)) {
      console.log('3. 比较新后和旧前')
      patchVnode(newEndVnode, oldStartVnode)
      parentNode.insertBefore(oldStartVnode.$el, oldEndVnode.$el.nextSibling)
      oldChildren[oldStartIdx] = undefined
      newEndVnode = newChildren[-- newEndIdx]
      oldStartVnode = oldChildren[++ oldStartIdx]
    } else if (isSameVnode(newStartVnode, oldEndVnode)) {
      console.log('4. 比较新前和旧后')
      patchVnode(newStartVnode, oldEndVnode)
      parentNode.insertBefore(oldEndVnode.$el, oldStartVnode.$el)
      oldChildren[oldEndIdx] = undefined
      newStartVnode = newChildren[++ newStartIdx]
      oldEndVnode = oldChildren[-- oldEndIdx]
    } else {
      console.log('5. 循环查找对应节点')
      if (!oldKeyToIdx) { // 生成一个map { key: index }
        oldKeyToIdx = createKeyToOldIdx(oldStartIdx, oldEndIdx, oldChildren)
      }
      let idx = oldKeyToIdx[newStartVnode.key]
      if (isDef(idx)) {
        parentNode.insertBefore(oldChildren[idx].$el, oldStartVnode.$el)
        oldChildren[idx] = undefined
      } else {
        parentNode.insertBefore(renderDOM(newStartVnode), oldStartVnode.$el)
      }
      newStartVnode = newChildren[newStartIdx ++]
    }
  }

  if (oldStartIdx <= oldEndIdx) { // 需要删除节点
    removeDOMs(oldStartIdx, oldEndIdx, oldChildren, parentNode)
  } else if (newStartIdx <= newEndIdx) { // 需要新增节点
    addDOMs(newStartIdx, newEndIdx, newChildren, parentNode, oldChildren[oldStartIdx].$el)
  }
}

function removeDOMs (startIdx, endIdx, vnodes, parentNode) {
  for (let i = startIdx; i <= endIdx; i ++) {
    const vnode = vnodes[i]
    parentNode.removeChild(vnode.$el)
  }
}

function addDOMs (startIdx, endIdx, vnodes, parentNode, flag) {
  for (let i = startIdx; i <= endIdx; i ++) {
    const el = renderDOM(vnodes[i])
    parentNode.insertBefore(el, flag)
  }
}

function createKeyToOldIdx (startIdx, endIdx, vnodes) {
  const map = {}
  for (let i = startIdx; i <= endIdx; i ++) {
    const vnode = vnodes[i]
    const key = vnode?.key
    if (key) map[key] = i
  }
  return map
}

function replaceNode (newVnode, oldVnode) {
  const el = renderDOM(newVnode)
  const oldEl = oldVnode.$el
  const parentNode = oldEl.parentNode

  parentNode.replaceChild(el, oldEl)
}

function patchAttrs (el, oldAttrs, newAttrs) {
  for (const key in newAttrs) {
    if (oldAttrs.hasOwnProperty(key) && oldAttrs[key] === newAttrs[key]) {
      continue
    } else {
      setAttr(el, key, newAttrs[key])
    }
  }
}
