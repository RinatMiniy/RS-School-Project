import { Builder } from '../Builder';
import { Card } from '../model/Card';
import cards from '../model/cards';
import './game.scss';

export class Game extends Builder {
  constructor(type:string) {
    super('ul', 'game__page');
    this.RenderGame(type);
  }

  RenderGame(type:string) {
    const toggle = document.querySelector('.checkbox');

    if (toggle?.classList.contains('playMode')) {
      this.RenderPlayGame(type);
    } else {
      this.RenderTrainGame(type);
    }
  }

  RenderTrainGame(type:string) {
    const typeOfCards = (cards[0] as string[]).indexOf(type) + 1;
    for (let i = 0; i < cards[typeOfCards].length; i++) {
      const cardPath = cards[typeOfCards][i] as {
        image: string,
        word: string,
        audioSrc: string
      };

      const frontCard = new Card(cardPath.image, cardPath.word);
      const element = frontCard.el.querySelector('.card__description__container');

      if (element) {
        element.insertAdjacentHTML('beforeend', `
        <button class = "card__btn"></button>
        <audio class = "audio" src = '${cardPath.audioSrc}'></audio>
        `);
      }

      const cardPathBack = cards[typeOfCards][i] as {
        image: string,
        translation: string
      };

      const backCard = new Card(cardPathBack.image, cardPathBack.translation);
      frontCard.el.innerHTML = `
        <div class = "front">
          ${frontCard.el.innerHTML}
        </div>
        <div class = "back">
          ${backCard.el.innerHTML}
        </div>
      `;

      this.el.appendChild(frontCard.el);

      frontCard.el.addEventListener('click', (el) => {
        const btn = frontCard.el.querySelector('.card__btn');
        const audio:HTMLMediaElement | null = frontCard.el.querySelector('.audio');

        if (el.target === btn) {
          frontCard.el.classList.add('active');
          // eslint-disable-next-line
          function mouseleave() {
            frontCard.el.classList.remove('active');
            frontCard.el.removeEventListener('mouseleave', mouseleave);
          }

          frontCard.el.addEventListener('mouseleave', mouseleave);
        } else {
          this.playAudio(audio);
        }
      });
    }
  }

  RenderPlayGame(type:string) {
    const allSound = [];
    // eslint-disable-next-line
    const main__btn = document.createElement('button');

    main__btn.classList.add('main__btn');
    this.el.appendChild(main__btn);

    const typeOfCards = (cards[0] as string[]).indexOf(type) + 1;
    for (let i = 0; i < cards[typeOfCards].length; i++) {
      const cardPath = cards[typeOfCards][i] as {
        image: string,
        word: string,
        audioSrc: string
      };
      const card = new Card(cardPath.image, cardPath.word);

      card.cardDescription.remove();

      card.el.classList.add('play__game');
      this.el.classList.add('disable__game');

      this.el.appendChild(card.el);
      allSound.push(cardPath.audioSrc as string);
    }

    function StartGame() {
      main__btn.classList.add('btn__repeate');
      main__btn.removeEventListener('click', StartGame);
    }
    // eslint-disable-next-line
    main__btn.addEventListener('click', () => {
      main__btn.classList.add('btn__repeate');
      // eslint-disable-next-line
      this.StartGames;
      main__btn.removeEventListener('click', StartGame);
    });

    if (main__btn.classList.contains('btn__repeate')) {
      this.StartGames();
    }
  }

  StartGames() {
    // const main__btn = document.querySelector('.main__btn');
    // eslint-disable-next-line
    const main__el = document.querySelector('.disable__game');
    console.log('ds');
    if (main__el) {
      main__el.classList.remove('disable__game');
    }
  }

  playAudio(audio:HTMLMediaElement | null) {
    if (audio !== null) {
      audio.currentTime = 0;
      audio.play();
    }
  }
}
