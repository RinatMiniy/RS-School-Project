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
      <li class = "nav__item">
        <a href = "">Main Page</a>
      </li>
      <li class = "nav__item">
        <a href = "#Action%20(set%20A)">Action(set A)</a>
      </li>
      <li class = "nav__item">
        <a href = "#Action%20(set%20B)">Action (set B)</a>
      </li>
      <li class = "nav__item">
        <a href = "#Animal%20(set%20A)">Animal (set A)</a>
      </li>
      <li class = "nav__item">
        <a href = "#Animal%20(set%20B)">Animal (set B)</a>
      </li>
      <li class = "nav__item">
        <a href = "#Clothes">Clothes</a>
      </li>
      <li class = "nav__item">
        <a href = "#Emotions">Emotions</a>
      </li>
    </ul>
    `;
  }
}
