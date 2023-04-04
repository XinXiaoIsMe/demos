import type { ConditionData, ConditionItem, ConditionLogic, ConditionNode } from '../types'
import { Ref, reactive, ref } from 'vue'

export default class ConditionTree {
  public $data: ConditionNode
  public activeId: Ref

  constructor (data: ConditionData) {
    this.$data = this.wrap(data)
    this.activeId = ref(this.$data.id)
  }

  wrap (data: ConditionData, level = 0): ConditionNode {
    const id = Symbol(level)
    const store: ConditionNode = reactive({
      ...data,
      data,
      id,
      level
    })

    if (data.children) {
      store.childNodes = data.children.map(child => {
        const childNode = this.wrap(child, level + 1)
        childNode.parentNode = store
        return childNode
      })
    }

    return store
  }

  addNode (node: ConditionNode, newNode: ConditionNode) {
    newNode.parentNode = node
    if (node.childNodes) {
      node.childNodes.push(newNode)
      node.children!.push(newNode.data)
    } else {
      node.childNodes = [ newNode ]
      node.children = [ newNode.data ]
      node.data.children = node.children
    }
  }

  addCondition (node: ConditionNode, newCondition: ConditionItem) {
    node.conditions ? node.conditions.push(newCondition) : (node.conditions = [ newCondition ])
  }

  deleteNode (id: symbol) {
    const parentNode = this.findParent(id)
    if (parentNode) {
      const index = parentNode.childNodes!.findIndex(child => child.id === id)
      parentNode.childNodes!.splice(index, 1)
      parentNode.children!.splice(index, 1)
    }
  }

  deleteCondition(id: symbol, index: number) {
    const node = this.findNode(id)
    if (node) node.conditions!.splice(index, 1)
  }

  changeLogic (id: symbol, logic: ConditionLogic) {
    const node = this.findNode(id)
    if (node) node.data.logic = logic
  }

  findParent (id: symbol): ConditionNode | undefined {
    const node = this.findNode(id)
    return node?.parentNode
  }

  findNode (id: symbol): ConditionNode | undefined {
    let res: ConditionNode | undefined
    const _findNode = (node: ConditionNode, id: symbol) => {
      if (node.id === id) {
        res = node
        return
      }
      if (!node.childNodes) return
      const { childNodes } = node
      for (let i = 0; i < childNodes.length; i ++) {
        _findNode(childNodes[i], id)
      }
    }

    _findNode(this.$data, id)
    return res
  }

  setActiveId (id: symbol) {
    this.activeId.value = id
  }
}