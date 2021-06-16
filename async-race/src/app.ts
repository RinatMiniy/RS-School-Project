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
    this.location();
  }

  location() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash ? window.location.hash.slice(1) : '';
      if (hash === '/garage') {
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.header.el);
        this.rootElement.appendChild(this.garage.el);
      } else {
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(this.header.el);
        this.rootElement.appendChild(this.winners.el);
      }
    });
  }

  notifycreateWinner(el:any) {
    console.log('RABOTAET', this, el);
  }
}
