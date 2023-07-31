import Event from './Event.js'

class Tab extends Event {
  constructor (data, options = {}) {
    super()
    this.data = data
    this.options = options
    this.container = options.container || document.body
    this.active = options.active || this.data[0]?.id
    this.$el = null

    this.init()
  }

  init () {
    this.render()
    this.bindEvent()
  }

  render () {
    const oTab = document.createElement('div')
    const oHead = this.renderTabHead()
    const oBody = this.renderTabBody()

    oTab.className = 'tab'
    oTab.appendChild(oHead)
    oTab.appendChild(oBody)
    this.container.appendChild(oTab)
    this.$el = oTab
  }

  renderTabHead () {
    const oHead = document.createElement('div')
    oHead.className = 'tab-hd'

    this.data.forEach(item => {
      const oHeadItem = document.createElement('div')
      oHeadItem.textContent = item.name
      oHeadItem.dataset.id = item.id
      oHeadItem.className = 'tab-hd__item'
      if (item.id === this.active) oHeadItem.className += ' active'
      oHead.appendChild(oHeadItem)
    })

    return oHead
  }

  renderTabBody () {
    const oBody = document.createElement('div')
    oBody.className = 'tab-bd'

    this.data.forEach(item => {
      const oBodyItem = document.createElement('div')
      oBodyItem.textContent = item.content
      oBodyItem.dataset.id = item.id
      oBodyItem.className = 'tab-bd__item'
      oBodyItem.style.display = 'none'
      if (item.id === this.active) oBodyItem.style.display = 'block'
      oBody.appendChild(oBodyItem)
    })

    return oBody
  }

  bindEvent () {
    this.$el.addEventListener('click', this.handleTabClick.bind(this))
  }

  handleTabClick (e) {
    const tar = e.target
    const className = tar.className

    if (className.includes('tab-hd__item')) {
      const id = tar.dataset.id
      const oHeadItems = this.$el.querySelectorAll('.tab-hd__item')
      const oBodyItems = this.$el.querySelectorAll('.tab-bd__item')
      oHeadItems.forEach(oHeadItem => {
        if (oHeadItem.dataset.id === id) {
          oHeadItem.classList.add('active')
        } else {
          oHeadItem.classList.remove('active')
        }
      })
      oBodyItems.forEach(oBodyItem => {
        oBodyItem.style.display = oBodyItem.dataset.id === id ? 'block' : 'none'
      })
      this.log('info', `点击了${ tar.textContent }`)
      this.emit('change', id)
    }
  }
}

export default Tab
