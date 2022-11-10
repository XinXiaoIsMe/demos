import renderOptions from './renderOptions.js'

// 创建自定义渲染器
function createRenderer (options) {
  const {
    createElement,
    setElementText,
    patchProps,
    insert
  } = options // 将必要的操作通过参数传递，保证用户可以自定义

  function render (vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        unmount(container._vnode)
      }
    }
  
    container._vnode = vnode
  }

  function patch (oldVNode, newVNode, container) {
    if (!oldVNode) {
      // 直接挂载
      mountElement(newVNode, container)
    } else {
      // diff
    }
  }

  function mountElement (vnode, container) {
    const el = vnode.el = createElement(vnode.type)

    // 添加对应的属性
    for (const key in vnode.props) {
      patchProps(vnode.el, key, null, vnode.props[key])
    }

    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => patch(null, child, el))
    }

    insert(container, el)
  }
  
  // 卸载节点
  function unmount (vnode) {
    const parent = vnode.el.parentNode
    if (parent) parent.removeChild(vnode.el)
    /**
     * 注意不能直接使用 parent.innerHTML = '' 清除，原因有3个：
     * 1. 需要移除的可能是组件，因此还需要调用组件对应的生命周期钩子函数
     * 2. 需要移除注册在组件上的指令，并且调用指令对应的钩子函数
     * 3. 使用innerHTML移除无法移除注册在DOM上的事件
     */
  }

  return {
    render
  }
}

const { render } = createRenderer(renderOptions)

export {
  createRenderer,
  render
}
