import { Header } from './components/header/Header';
import { MainPage } from './components/main-page/MainPage';
import { Game } from './Game';

export class App {
  private readonly rootElement: HTMLElement;

  private readonly header: Header;

  private readonly mainPage: MainPage;

  private game: Game | undefined;

  constructor(el: HTMLElement) {
    this.rootElement = el;
    this.header = new Header();
    this.rootElement.appendChild(this.header.el);
    this.mainPage = new MainPage();
    this.rootElement.appendChild(this.mainPage.el);
    this.location()
  }

  location() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash ? window.location.hash.slice(1).replace(/%20/gi, ' ') : '';
      this.rootElement.removeChild(this.rootElement.lastChild as Node)
      this.game = new Game(hash)
      this.rootElement.appendChild(this.game.el)
    })
  }

}


