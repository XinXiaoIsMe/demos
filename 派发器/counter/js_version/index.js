const template = `<button class="add-btn">+</button><span class="show-span">0</span><button class="minus-btn">-</button>`

class Counter {
  constructor (options) {
    this.container = this._getContainer(options.container)
    this.oWrapper = null
    this._init()
  }

  _init () {
    this._render()
    this._bindEvent()
  }

  _render () {
    this.oWrapper = document.createElement('div')
    this.oWrapper.className = 'counter'
    this.oWrapper.innerHTML = template
    this.container.appendChild(this.oWrapper)
  }

  _bindEvent () {
    const oAddBtn = this.oWrapper.querySelector('.add-btn')
    const oMinusBtn = this.oWrapper.querySelector('.minus-btn')
    const oSpan = this.oWrapper.querySelector('.show-span')

    oAddBtn.addEventListener('click', this._onAddCount.bind(this, oSpan), false)
    oMinusBtn.addEventListener('click', this._onMinusCount.bind(this, oSpan), false)
  }

  _onAddCount (oSpan) {
    const value = Number(oSpan.textContent)
    oSpan.textContent = value + 1
  }

  _onMinusCount (oSpan) {
    const value = Number(oSpan.textContent)
    oSpan.textContent = value - 1
  }

  _getContainer (container) {
    return container instanceof HTMLElement
      ? container
      : document.querySelector(container) || document.body
  }
}

export default Counter
