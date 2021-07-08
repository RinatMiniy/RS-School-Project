import { Builder } from '../../Builder';
import './toggle.scss';

export class Toggle extends Builder {
  constructor() {
    super('div', 'toggle');
    this.el.innerHTML = `
    <div class="theme-switch-wrapper">
      <label class="theme-switch" for="checkbox">
      <input type="checkbox" id="checkbox" class = "checkbox" />
      <div class="slider round"></div>
      </label>
      <em>Enable Dark Mode!</em>
    </div>
    `;
  }
}
