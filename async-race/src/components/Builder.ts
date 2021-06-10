export class Builder {
  readonly el: HTMLElement;

  constructor(tagName = 'div', className = '', content = '') {
    this.el = document.createElement(tagName);
    this.el.className = className;
    this.el.textContent = content;
  }
}
