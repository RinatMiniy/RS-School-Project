import { Builder } from '../Builder';

export class Winners extends Builder {
  constructor() {
    super('div', 'track');
    this.el.innerHTML = `
    <div>WINNERS</div>
    `;
  }
}
