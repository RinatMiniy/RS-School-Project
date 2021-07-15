import { Builder } from '../Builder';
import { MainPage } from '../main-page/MainPage';
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
    const allSound:{
      image: string,
      word: string,
      audioSrc: string
    }[] = [];
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
      allSound.push(cardPath);
      card.cardDescription.remove();

      card.el.classList.add('play__game');
      this.el.classList.add('disable__game');

      this.el.appendChild(card.el);
    }

    function eventListner() {
      main__btn.classList.add('btn__repeate');
      main__btn.removeEventListener('click', eventListner);
    }
    // eslint-disable-next-line
    main__btn.addEventListener('click', () => {
      main__btn.classList.add('btn__repeate');
      this.StartGame(allSound);
      main__btn.removeEventListener('click', eventListner);
    });
  }

  StartGame(allSound:{
    image: string,
    word: string,
    audioSrc: string
  }[]) {
    // eslint-disable-next-line
    const main__el = document.querySelector('.disable__game');
    const audioELem = document.createElement('audio');
    const i = 0;
    if (main__el) {
      main__el.classList.remove('disable__game');
    }

    allSound.sort(() => Math.random() - 0.5);

    audioELem.src = allSound[0].audioSrc;

    this.playAudio(audioELem);

    this.el.addEventListener('click', (event) => {
      const cardsInGame = document.querySelectorAll('.card');
      console.log(allSound.length);

      if (allSound.length === 0) {
        audioELem.src = 'audio/success.mp3';
        this.playAudio(audioELem);
      }

      if ((event.target as Node).parentNode?.parentNode === main__el) {
        if (((event.target as Node).parentNode as HTMLElement).dataset.type === allSound[0].word) {
          audioELem.src = 'audio/correct.mp3';
          this.playAudio(audioELem);
          allSound.shift();
          setTimeout(() => {
            if (allSound.length === 0) {
              this.el.innerHTML = `
              <img src = "img/lose.jpg">
              `;
              audioELem.src = 'audio/success.mp3';
              this.playAudio(audioELem);
              setTimeout(() => {
                const gameOver = new MainPage();
                // location.hash = ''
                this.el.parentNode?.appendChild(gameOver.el);
                this.el.remove();
              }, 4000);
            }
            audioELem.src = allSound[0].audioSrc;
            this.playAudio(audioELem);
          }, 1000);
        } else {
          audioELem.src = 'audio/error.mp3';
          this.playAudio(audioELem);
        }
      }
    });
  }

  playAudio(audio:HTMLMediaElement | null) {
    if (audio !== null) {
      audio.currentTime = 0;
      audio.play();
    }
  }
}
