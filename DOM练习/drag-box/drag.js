export default class Drag {
  constructor (options) {
    const {
      el,
      dragArea,
      container = document.documentElement
    } = options;

    this.el = Drag.getElement(el);
    this.dragArea = dragArea ? Drag.getElement(dragArea) : this.el;
    this.container = Drag.getElement(container) || document.body;
    this.init();
  }

  init () {
    this.initState();
    this.bindEvent();
  }

  initState () {
    this.handleMouseDown = this._handleMouseDown.bind(this);
    this.handleMouseMove = this._handleMouseMove.bind(this);
    this.handleMouseUp = this._handleMouseUp.bind(this);
  }

  bindEvent () {
    this.dragArea.addEventListener('mousedown', this.handleMouseDown, false);
  }

  _handleMouseDown (e) {
    window.addEventListener('mousemove', this.handleMouseMove, false);
    window.addEventListener('mouseup', this.handleMouseUp, false);

    const [ containerOffsetX, containerOffsetY ] = Drag.getElementOffset(this.container);
    this.containerOffsetX = containerOffsetX;
    this.containerOffsetY = containerOffsetY;
    this.containerBorderWidth = Drag.getBorderWidth(this.container);

    const [ elOffsetX, elOffsetY ] = Drag.getElementOffset(this.el);
    this.x = e.clientX - elOffsetX;
    this.y = e.clientY - elOffsetY;
  }

  _handleMouseMove (e) {
    const minLeft = 0;
    const minTop = 0;
    const maxLeft = this.container.offsetWidth - this.containerBorderWidth.left - this.containerBorderWidth.right - this.el.offsetWidth;
    const maxTop = this.container.offsetHeight - this.containerBorderWidth.top - this.containerBorderWidth.bottom - this.el.offsetHeight;
    const left = Drag.clamp(e.clientX - this.x - this.containerOffsetX - this.containerBorderWidth.left, minLeft, maxLeft);
    const top = Drag.clamp(e.clientY - this.y - this.containerOffsetY - this.containerBorderWidth.top, minTop, maxTop);
    this.el.style.left = left + 'px';
    this.el.style.top = top + 'px';
  }

  _handleMouseUp () {
    window.removeEventListener('mousemove', this.handleMouseMove, false);
    window.removeEventListener('mouseup', this.handleMouseUp, false);
  }

  static getElement (el) {
    if (el instanceof HTMLElement) return el;
    if (typeof el === 'string') return document.querySelector(el);
    throw new TypeError('please pass a valid element or selector.');
  }

  static clamp (value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
  }

  static getElementOffset (el) {
    let offsetX = 0;
    let offsetY = 0;
    let temp = el
    while (temp) {
      offsetX += temp.offsetLeft;
      offsetY += temp.offsetTop;
      temp = temp.offsetParent;
    }
    return [
      offsetX,
      offsetY
    ];
  }

  static getDomStyle (el, prop) {
    const domStyle = window.getComputedStyle(el);
    return prop ? domStyle[prop] : domStyle;
  }

  static getBorderWidth (el) {
    const domStyle = this.getDomStyle(el);

    return {
      top: parseFloat(domStyle.borderTopWidth) || 0,
      bottom: parseFloat(domStyle.borderBottomWidth) || 0,
      left: parseFloat(domStyle.borderLeftWidth) || 0,
      right: parseFloat(domStyle.borderRightWidth) || 0
    }
  }
}