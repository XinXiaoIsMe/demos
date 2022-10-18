class Alert {
  private _isRender: boolean = false
  private _isShow: boolean = false
  private _oAlert: HTMLDivElement | null = null
  private _onResolve: (value: unknown) => void = () => {}
  private _onReject: (value: unknown) => void = () => {}

  constructor (private msg: string | undefined = '您确定要修改吗？') {
    this._init()
  }

  public show (): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (!this._isShow) {
        this._isShow = true
        this._oAlert!.style.display = 'block'
      }
      this._onResolve = resolve
      this._onReject = reject
    })
  }

  public isRender (): boolean {
    return this._isRender
  }

  public destroy () {
    if (!this._isRender) return

    this._oAlert?.remove()
    this._oAlert = null
    this._isRender = false
    this._isShow = false
  }

  private _hidden (role: string) {
    if (!this._isShow) return

    this._isShow = false
    this._oAlert!.style.display = 'none'
    if (role === 'confirm') this._onResolve('confirm')
    else if (role === 'cancel') this._onReject('cancel')
  }

  private _init () {
    if (this._isRender) return

    this._render()
    this._bindEvent()
    this._isRender = true
  }

  private _render () {
    const template = this._createTemplate()
    document.body.innerHTML += template
  }

  private _createTemplate (): string {
    return `
    <div class="x-alert" style="display: none">
      <p class="x-alert__tips">${ this.msg }</p>
      <p class="x-alert__btns">
        <button class="x-alert__confirm" role="confirm">确定</button>
        <button class="x-alert__cancel" role="cancel">取消</button>
      </p>
    </div>
    `
  }

  private _bindEvent () {
    this._oAlert = document.body.querySelector('.x-alert')
    if (this._oAlert) {
      this._oAlert.addEventListener('click', this._handleBtnClick.bind(this))
    }
  }

  private _handleBtnClick (e: Event) {
    const tar = e.target as HTMLElement
    const role = tar.getAttribute('role')

    if (role === 'confirm' || role === 'cancel') this._hidden(role)
  }
}

export default Alert
