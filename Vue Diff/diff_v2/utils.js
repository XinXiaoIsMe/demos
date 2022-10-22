export function isType (arg, type) {
  return getType(arg) === type.toLowerCase()
}

const toString = Object.prototype.toString
function getType (arg) {
  return toString.call(arg).slice(8, -1).toLowerCase()
}

export function hasChildren (children) {
  return isType(children, 'array') && children.length > 0
}

export function isSameVnode (vnode1, vnode2) {
  return vnode1.tag === vnode2.tag && vnode1.key === vnode2.key
}

export function isUndef (arg) {
  return arg === undefined || arg === null
}

export function isDef (arg) {
  return arg !== null && arg !== undefined
}
