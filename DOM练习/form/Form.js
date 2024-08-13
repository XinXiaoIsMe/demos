class Form {
  constructor (options, el, formData = {}) {
    this.options = options;
    this.el = el;
    this.formData = this.proxyFormData(formData);

    this.init();
  }

  init () {
    this.render();
  }

  proxyFormData (data) {
    return new Proxy(data, {
      get (target, key) {
        return Reflect.get(target, key);
      },
      set (target, key, value) {
        return Reflect.set(target, key, value);
      }
    });
  }

  render () {
    const oForm = document.createElement('form');
    oForm.className = 'form';
    this.options.forEach(option => {
      const node = this.createNode(option);
      oForm.appendChild(node);
    });
    this.el.appendChild(oForm);
  }

  createNode (option) {
    const { tagName, prop, label } = option;
    const oFormItem = document.createElement('div');
    const oLabel = this.createLabel(prop, label);
    oFormItem.className = 'form-item';

    let node;
    switch (tagName) {
      case 'input':
        node = this.createInput(option);
        break;
      case 'textarea':
        node = this.createTextArea(option);
        break;
      case 'table':
        node = this.createTable(option);
        break;
      case 'select':
        node = this.createSelect(option);
        break;
      default:
        node = this.createDiv(option);
        break;
    }

    oFormItem.appendChild(oLabel);
    oFormItem.appendChild(node);
    return oFormItem;
  }

  createLabel (id, text) {
    const oLabel = document.createElement('label');
    oLabel.className = 'form-label';
    oLabel.textContent = `${ text }: `;
    oLabel.setAttribute('for', id);
    return oLabel;
  }

  createInput ({ 
    type = 'text',
    options = [],
    prop
  }) {
    if (type === 'radio') return this.createRadio(prop, options);

    if (type === 'checkbox') return this.createCheckbox(prop, options);

    const node = document.createElement('input');
    node.setAttribute('type', type);
    node.id = prop;
    node.value = this.formData[prop] ?? '';
    return node;
  }

  createRadio (prop, options) {
    const frag = document.createDocumentFragment();
    const value = this.formData[prop];

    options.forEach(({
      label,
      value: _value
    }) => {
      const node = document.createElement('input');
      node.setAttribute('type', 'radio');
      node.id = prop;
      node.setAttribute('name', prop);
      node.setAttribute('value', _value);
      (value === _value) && (node.setAttribute('checked', 'checked'));

      const oSpan = document.createElement('span');
      oSpan.textContent = label;

      frag.appendChild(oSpan);
      frag.appendChild(node);
    });

    return frag;
  }

  createCheckbox (prop, options) {
    const frag = document.createDocumentFragment();
    const value = this.formData[prop] || []

    options.forEach(({
      label,
      value: _value
    }) => {
      const node = document.createElement('input');
      node.setAttribute('type', 'checkbox');
      node.id = prop;
      node.setAttribute('name', prop);
      node.setAttribute('value', _value);
      value.includes(_value) && node.setAttribute('checked', 'checked');

      const oSpan = document.createElement('span');
      oSpan.textContent = label;

      frag.appendChild(oSpan);
      frag.appendChild(node);
    });

    return frag;
  }

  createTextArea ({ prop }) {
    const node = document.createElement('textarea');
    node.id = prop;
    return node;
  }

  createTable () {

  }

  createSelect ({
    prop,
    options = [],
    multiple = false
  }) {
    const node = document.createElement('select');
    node.id = prop;
    multiple && node.setAttribute('multiple', 'multiple');

    options.forEach(({ value, label }) => {
      const optionNode = document.createElement('option');
      optionNode.value = value;
      optionNode.textContent = label;
      (this.formData[prop] === value) && (optionNode.setAttribute('selected', 'selected'));
      node.appendChild(optionNode);
    });

    return node;
  }

  createDiv ({
    text = ''
  }) {
    const node = document.createElement('div');
    node.textContent = text;
    return node;
  }

  static create (options, el, formData = {}) {
    return new Form(options, el, formData);
  }
}