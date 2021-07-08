import { Builder } from '../Builder';
import { Burger } from './burger/Burger';
import { Toggle } from './toggle/toggle';
import './header.scss';

export class Header extends Builder {
  private readonly burger: Burger;

  private readonly toggle: Toggle;

  constructor() {
    super('header');
    this.burger = new Burger();
    this.el.appendChild(this.burger.el);
    this.toggle = new Toggle();
    this.el.appendChild(this.toggle.el);

    this.Listener();
  }

  Listener() {
    this.el.addEventListener('click', (elem) => {
      // eslint-disable-next-line
      const btn__burger = this.el.querySelector('.burger__btn');
      const nav = this.el.querySelector('.nav');

      if (elem.target === btn__burger || (elem.target as HTMLElement).parentNode === btn__burger) {
        nav?.classList.toggle('nav__active');
      }
    });

    const toggle = this.el.querySelector('.checkbox');

    toggle?.addEventListener('change', () => {
      toggle.classList.toggle('playMode');
    });
  }
}
