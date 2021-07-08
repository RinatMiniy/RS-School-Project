import { Builder } from '../Builder';
import { Card } from '../model/Card';
import cards from '../model/cards';
import './mainPage.scss';

export class MainPage extends Builder {
  constructor() {
    super('ul', 'main__page');

    this.RenderMainPage();
    this.Listener();
  }

  RenderMainPage() {
    for (let i = 0; i < cards[0].length; i++) {
      const imgPath = cards[i + 1][0] as {
        image:string,
      };
      const card = new Card(imgPath.image, cards[0][i] as string);
      this.el.appendChild(card.el);
    }
  }

  Listener() {
    this.el.addEventListener('click', (elem) => {
      console.log((elem.target as HTMLElement).parentNode);

      if (((elem.target as HTMLElement).parentNode as Element).classList.contains('card')) {
        console.log(((elem.target as HTMLElement).parentNode as HTMLElement).dataset.type);
        // eslint-disable-next-line
        location.hash = `${((elem.target as HTMLElement).parentNode as HTMLElement).dataset.type}`;
      }
    });
  }
}
