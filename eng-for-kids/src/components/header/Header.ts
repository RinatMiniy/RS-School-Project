import { Builder } from '../Builder';
import { Burger } from './burger/Burger';

export class Header extends Builder {

  private readonly burger: Burger;

  constructor() {
    super('header');
    this.burger = new Burger()
    this.el.appendChild(this.burger.el)
  }
}
