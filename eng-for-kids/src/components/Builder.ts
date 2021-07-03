export class Builder {
  readonly el: HTMLElement;

  constructor(tagName = 'div', className = '', descr = '') {
    this.el = document.createElement(tagName);
    this.el.className = className;

    if (descr) {
      this.el.dataset.type = descr;
    }
  }
}
