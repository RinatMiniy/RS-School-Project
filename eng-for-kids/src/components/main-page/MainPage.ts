import { Builder } from '../Builder';
import { Card } from '../model/Card';
import cards from '../model/cards'

export class MainPage extends Builder {

  constructor() {
    super('ul', 'main__page');

    this.RenderMainPage();
    this.Listner();
  }

  RenderMainPage() {
    for (let i = 0; i < cards[0].length; i++) {
      let imgPath = cards[i+1][0] as {
        image:string,
      };
      let card = new Card(imgPath.image, cards[0][i] as string);
      this.el.appendChild(card.el)
    }
  }

  Listner() {
    document.addEventListener('click', (elem) => {
      console.log((elem.target as Element).parentNode);
    })
  }
}
