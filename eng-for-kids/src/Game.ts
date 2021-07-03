import { Builder } from "./components/Builder";
import { Card } from "./components/model/Card";
import cards from "./components/model/cards";

export class Game extends Builder {
  constructor(type:string) {
    super('ul', 'game__page')
    this.RenderGame(type)
  }

  RenderGame (type:string) {
    let typeOfCards = (cards[0] as string[]).indexOf(type) + 1
    for (let i = 0; i < cards[typeOfCards].length; i++) {
      const cardPath = cards[typeOfCards][i] as {
        image:string,
        word:string
      };
      const card = new Card(cardPath.image, cardPath.word);
      this.el.appendChild(card.el);
    }
  }
}
