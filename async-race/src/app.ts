import { Garage } from './components/garage/garage';
import { Header } from './components/header/header';
import { Winners } from './components/winners/winners';
import { APIServiceForWinners, SubscriberWin } from './ObserverForWinners';

export class App implements SubscriberWin {
  readonly rootElement: HTMLElement;

  private readonly header : Header;

  readonly garage: Garage;

  readonly winners: Winners;

  private readonly service: APIServiceForWinners;

  constructor(el: HTMLElement) {
    this.rootElement = el;
    this.header = new Header();
    this.winners = new Winners();
    this.service = new APIServiceForWinners(this);
    this.rootElement.appendChild(this.header.el);
    this.garage = new Garage(this.service);
    this.rootElement.appendChild(this.garage.el);
    this.rootElement.appendChild(this.winners.el);
    this.winners.el.style.display = 'none';
    this.location();
  }

  location() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash ? window.location.hash.slice(1) : '';
      if (hash === '/garage') {
        this.winners.el.style.display = 'none';
        this.garage.el.style.display = 'block';
      } else {
        this.winners.el.style.display = 'block';
        this.garage.el.style.display = 'none';
      }
    });
  }

  notifycreateWinner() {
    this.winners.RenderTable();
  }
}
