import { Builder } from '../Builder';
import './card.scss';

export class Card extends Builder {
  // readonly cardImg: HTMLElement;

  readonly cardDescription: HTMLElement;

  constructor(img:string, description:string) {
    super('li', 'card', description);
    // const cardImg = document.createElement('div');
    // cardImg.className = 'card__img__container';
    // this.cardImg = this.el.appendChild(cardImg);
    // this.cardImg.innerHTML = `
    // <img src = "${img}">
    // `;

    this.el.innerHTML = `
    <img class = "card__img" src = "${img}">
    `;

    const cardDescription = document.createElement('div');
    cardDescription.className = 'card__description__container';
    this.cardDescription = this.el.appendChild(cardDescription);
    this.cardDescription.innerHTML = description;
  }
}
