import { Builder } from '../../Builder';

export class SetupCar extends Builder {
  constructor() {
    super('div', 'SetupCar');
    this.el.innerHTML = `
    <form>
      <input type = 'text' id="NameCar">
      <input type = 'color' id="ColorCar">
      <input type = 'button' id="SubmitNewCar">
    </form>
    `;
  }
}
