import { Builder } from '../../Builder';
import './burger.scss';

export class Burger extends Builder {
  constructor() {
    super('div', 'burger');

    this.el.innerHTML = `
    <div class = "burger__btn">
      <div class = "burger__btn__elem"></div>
    </div>
    <ul class = "nav">
      <li class = "nav__item">Action (set A)</li>
      <li class = "nav__item">Action (set B)</li>
      <li class = "nav__item">Animal (set A)</li>
      <li class = "nav__item">Animal (set B)</li>
      <li class = "nav__item">Clothes</li>
      <li class = "nav__item">Emotions</li>
    </ul>
    `;
  }
}
