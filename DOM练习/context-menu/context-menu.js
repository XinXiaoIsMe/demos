export default class ContextMenu {
  constructor (options) {
    const {
      el,
      gap = 10,
      menus = []
    } = options;

    this.el = el ? ContextMenu.getElement(el) : window;
    this.gap = gap;
    this.menus = menus;
    this.init();
  }

  init () {
    this.initState();
    this.renderMenu();
    this.bindEvent();
  }

  initState () {
    this.handleContextMenu = this._handleContextMenu.bind(this);
    this.handleMenuClick = this._handleMenuClick.bind(this);
    this.handleWindowClick = this._handleWindowClick.bind(this);
  }

  renderMenu () {
    this.oMenu = document.createElement('div');
    this.oMenu.className = 'menu';
    this.menus.forEach(menu => {
      const oMenuItem = document.createElement('div');
      oMenuItem.textContent = menu.label;
      oMenuItem.dataset.id = menu.id;
      oMenuItem.dataset.role = 'menu-item';
      oMenuItem.className = 'menu-item';
      this.oMenu.appendChild(oMenuItem);
    });
    document.body.appendChild(this.oMenu);
    this.oMenuHeight = this.oMenu.offsetHeight;
    this.oMenuWidth = this.oMenu.offsetWidth;
    this.oMenu.classList.add('hidden');
  }

  bindEvent () {
    this.el.addEventListener('contextmenu', this.handleContextMenu, false);
    this.oMenu.addEventListener('click', this.handleMenuClick, false);
    window.addEventListener('click', this.handleWindowClick, false);
  }

  toggleMenu (show) {
    if (show) this.oMenu.classList.remove('hidden');
    else this.oMenu.classList.add('hidden');
  }

  _handleContextMenu (e) {
    e.preventDefault();
    const { clientX, clientY } = e;
    // 判断边界
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    if (clientY + this.oMenuHeight + this.gap > windowHeight) {
      this.oMenu.style.top = clientY - this.gap - this.oMenuHeight + 'px';
    } else {
      this.oMenu.style.top = clientY + 'px';
    }

    if (clientX + this.oMenuWidth > windowWidth) {
      this.oMenu.style.left = clientX - this.oMenuWidth + 'px';
    } else {
      this.oMenu.style.left = clientX + this.gap + 'px';
    }
    this.toggleMenu(true);
  }

  _handleMenuClick (e) {
    const { target } = e;
    if (target.dataset.role === 'menu-item') this.toggleMenu(false);
  }

  _handleWindowClick (e) {
    const { target } = e;
    if (!this.oMenu.contains(target)) this.toggleMenu(false);
  }

  static getElement (el) {
    if (el instanceof HTMLElement) return el;
    if (typeof el === 'string') return document.querySelector(el);
    throw new TypeError('please pass a valid element or selector.');
  }
}