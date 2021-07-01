export class Builder {
  readonly el: HTMLElement;

  constructor(tagName = 'div', className = '') {
    this.el = document.createElement(tagName);
    this.el.className = className;
  }
}
