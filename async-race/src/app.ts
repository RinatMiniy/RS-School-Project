import { Garage } from './components/garage/garage';
import { Header } from './components/header/header';
import { Winners } from './components/winners/winners';
import { createCar } from './API';

export class App {
  readonly rootElement: HTMLElement;

  private readonly header : Header;

  readonly garage: Garage;

  readonly winners: Winners;

  constructor(el: HTMLElement) {
    this.rootElement = el;
    this.header = new Header();
    this.rootElement.appendChild(this.header.el);
    this.garage = new Garage();
    this.rootElement.appendChild(this.garage.el);
    this.winners = new Winners();
    this.location();
    this.AddCar();
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

  AddCar() {
    const submit = document.getElementById('SubmitNewCar') as HTMLInputElement;
    console.log(this, submit);

    submit.onclick = function () {
      const NameCar = (document.getElementById('NameCar') as HTMLInputElement).value;
      const ColorCar = (document.getElementById('ColorCar') as HTMLInputElement).value;
      createCar({
        name: NameCar,
        color: ColorCar,
      });
    };
  }
}
