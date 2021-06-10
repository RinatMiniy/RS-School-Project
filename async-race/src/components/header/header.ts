import './header.scss';
import { Builder } from '../Builder';

export class Header extends Builder {
  constructor() {
    super('header', 'header');
    this.el.innerHTML = `
    <a href='#/garage'>to garage</a>
    <a href='#/winners'>to winners</a>
    `;
  }
}
