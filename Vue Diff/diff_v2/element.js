import { isType } from './utils.js'

export default class Element {
  $el = null

  constructor (tag, props, key, childrenOrText) {
    this.tag = tag
    this.props = props
    this.key = key
    if (isType(childrenOrText, 'array')) {
      this.children = childrenOrText
    } else {
      this.text = childrenOrText
    }
  }

  addEl (el) {
    this.$el = el
  }
}